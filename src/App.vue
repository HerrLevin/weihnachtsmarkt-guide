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
    if (filters.value.payment !== null && stall.payment !== filters.value.payment) {
      return false
    }

    const selectedProductNames = filters.value.products
    const stallProductNames = stall.products.map((p) => p.name)

    let relevantProducts = stall.products
    if (selectedProductNames.length > 0) {
      const hasSelectedProduct = selectedProductNames.some((name) =>
        stallProductNames.includes(name),
      )
      if (!hasSelectedProduct) return false
      relevantProducts = stall.products.filter((p) => selectedProductNames.includes(p.name))
    }

    if (filters.value.vegan !== null) {
      const hasMatchingVeganProduct = relevantProducts.some((p) => p.vegan === filters.value.vegan)
      if (!hasMatchingVeganProduct) return false
    }

    const relevantPrices = relevantProducts.map((p) => p.price)
    if (filters.value.minPrice !== null || filters.value.maxPrice !== null) {
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

    return true
  })
})

function formatProductName(product: Product): string {
  let name = product.name.toString()
  if (product.name === 'Andere' && product.alias) {
    name = product.alias
  }
  const vegan = product.vegan === 'Ja' ? ' (vegan)' : ''
  return `${name}${vegan}: €${product.price.toFixed(2)}`
}

function formatProducts(products: Product[]): string {
  return products.map((p) => formatProductName(p)).join('<br/>')
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
        payment: stall.payment,
        products: formatProducts(stall.products),
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
           Payment: ${props?.payment}<br/>
           ${props?.products}`,
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
