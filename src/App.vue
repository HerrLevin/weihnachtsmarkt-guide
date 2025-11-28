<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import maplibregl, { type MapLayerMouseEvent } from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import FilterPanel from '@/components/FilterPanel.vue'
import { marketStalls } from '@/data/markets'
import type { Filters, MarketStall, Product } from '@/types/Market'

const mapContainer = ref<HTMLElement | null>(null)
let map: maplibregl.Map | undefined

const filters = ref<Filters>({
  vegan: null,
  payment: null,
  products: [],
  minPrice: null,
  maxPrice: null,
})

const filteredStalls = computed(() => {
  return marketStalls.filter((stall) => {
    if (filters.value.vegan !== null && stall.vegan !== filters.value.vegan) {
      return false
    }
    if (filters.value.payment !== null && stall.payment !== filters.value.payment) {
      return false
    }

    const selectedProducts = filters.value.products
    const stallProducts = Object.keys(stall.prices) as Product[]

    if (selectedProducts.length > 0) {
      const hasSelectedProduct = selectedProducts.some((p) => stallProducts.includes(p))
      if (!hasSelectedProduct) return false

      const relevantPrices = selectedProducts
        .filter((p) => stall.prices[p] !== undefined)
        .map((p) => stall.prices[p]!)

      if (relevantPrices.length > 0) {
        if (
          filters.value.minPrice !== null &&
          relevantPrices.every((price) => price < filters.value.minPrice!)
        ) {
          return false
        }
        if (
          filters.value.maxPrice !== null &&
          relevantPrices.every((price) => price > filters.value.maxPrice!)
        ) {
          return false
        }
      }
    } else if (filters.value.minPrice !== null || filters.value.maxPrice !== null) {
      const allPrices = Object.values(stall.prices)
      if (
        filters.value.minPrice !== null &&
        allPrices.every((price) => price < filters.value.minPrice!)
      ) {
        return false
      }
      if (
        filters.value.maxPrice !== null &&
        allPrices.every((price) => price > filters.value.maxPrice!)
      ) {
        return false
      }
    }

    return true
  })
})

function formatPrices(prices: Record<string, number>): string {
  return Object.entries(prices)
    .map(([product, price]) => `${product}: €${price.toFixed(2)}`)
    .join(', ')
}

function stallsToGeoJSON(stalls: MarketStall[]): GeoJSON.FeatureCollection {
  return {
    type: 'FeatureCollection',
    features: stalls.map((stall) => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: stall.coordinates,
      },
      properties: {
        id: stall.id,
        name: stall.name,
        vegan: stall.vegan,
        payment: stall.payment,
        prices: formatPrices(stall.prices),
      },
    })),
  }
}

function onFilterChange(newFilters: Filters) {
  filters.value = newFilters
}

watch(filteredStalls, (stalls) => {
  if (!map) return
  const source = map.getSource('stalls') as maplibregl.GeoJSONSource | undefined
  if (source) {
    source.setData(stallsToGeoJSON(stalls))
  }
})

onMounted(() => {
  if (!mapContainer.value) return

  map = new maplibregl.Map({
    container: mapContainer.value,
    style: {
      version: 8,
      sources: {
        osm: {
          type: 'raster',
          tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
          tileSize: 256,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        },
      },
      layers: [
        {
          id: 'osm',
          type: 'raster',
          source: 'osm',
        },
      ],
    },
    center: [8.398733407798233, 49.00868278281362],
    zoom: 16,
  })

  map.on('load', () => {
    if (!map) return

    map.addSource('stalls', {
      type: 'geojson',
      data: stallsToGeoJSON(filteredStalls.value),
    })

    map.addLayer({
      id: 'stalls-layer',
      type: 'circle',
      source: 'stalls',
      paint: {
        'circle-radius': 10,
        'circle-color': '#c41e3a',
        'circle-stroke-width': 2,
        'circle-stroke-color': '#ffffff',
      },
    })

    map.on('click', 'stalls-layer', (e: MapLayerMouseEvent) => {
      const feature = e.features?.[0]
      if (!map || !feature) return
      const coordinates = (feature.geometry as GeoJSON.Point).coordinates.slice() as [
        number,
        number,
      ]
      const props = feature.properties

      new maplibregl.Popup()
        .setLngLat(coordinates)
        .setHTML(
          `<strong>${props?.name}</strong><br/>
           Vegan: ${props?.vegan ? 'Yes' : 'No'}<br/>
           Payment: ${props?.payment}<br/>
           ${props?.prices}`,
        )
        .addTo(map)
    })

    map.on('mouseenter', 'stalls-layer', () => {
      if (map) map.getCanvas().style.cursor = 'pointer'
    })

    map.on('mouseleave', 'stalls-layer', () => {
      if (map) map.getCanvas().style.cursor = ''
    })
  })
})
</script>

<template>
  <div ref="mapContainer" class="map"></div>
  <FilterPanel @filter="onFilterChange" />
</template>

<style scoped>
.map {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
