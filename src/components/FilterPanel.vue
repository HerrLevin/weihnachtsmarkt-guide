<script setup lang="ts">
import { reactive, watch } from 'vue'
import type { Filters, PaymentMethod, ProductName, VeganPossibilities } from '@/types/Market'

const emit = defineEmits<{
  filter: [filters: Filters]
}>()

const filters = reactive<Filters>({
  vegan: null,
  payment: null,
  products: [],
  minPrice: null,
  maxPrice: null,
})

const products: ProductName[] = [
  'Glühwein rot',
  'Glühwein weiss',
  'Glühwein mit Schuss',
  'Kakao',
  'Kinderpunsch',
]
const paymentOptions: { value: PaymentMethod; label: string }[] = [
  { value: 'cash-only', label: 'Cash Only' },
  { value: 'credit-card', label: 'Credit Card' },
  { value: 'both', label: 'Both' },
]
const veganOptions: VeganPossibilities[] = ['Ja', 'Nein', 'Nicht sicher', 'keine Daten']

function toggleProduct(product: ProductName) {
  const index = filters.products.indexOf(product)
  if (index === -1) {
    filters.products.push(product)
  } else {
    filters.products.splice(index, 1)
  }
  emitFilters()
}

function setVegan(value: VeganPossibilities) {
  filters.vegan = filters.vegan === value ? null : value
  emitFilters()
}

function setPayment(value: PaymentMethod | null) {
  filters.payment = filters.payment === value ? null : value
  emitFilters()
}

function emitFilters() {
  emit('filter', { ...filters, products: [...filters.products] })
}

function resetFilters() {
  filters.vegan = null
  filters.payment = null
  filters.products = []
  filters.minPrice = null
  filters.maxPrice = null
  emitFilters()
}

watch(
  () => [filters.minPrice, filters.maxPrice],
  () => emitFilters(),
)
</script>

<template>
  <div class="filter-panel">
    <div class="filter-header">
      <h3>Filters</h3>
      <button class="reset-btn" @click="resetFilters">Reset</button>
    </div>

    <div class="filter-section">
      <label>Vegan</label>
      <div class="button-group">
        <button
          v-for="opt in veganOptions"
          :key="opt"
          :class="{ active: filters.vegan === opt }"
          @click="setVegan(opt)"
        >
          {{ opt }}
        </button>
      </div>
    </div>

    <div class="filter-section">
      <label>Payment</label>
      <div class="button-group">
        <button
          v-for="opt in paymentOptions"
          :key="opt.value"
          :class="{ active: filters.payment === opt.value }"
          @click="setPayment(opt.value)"
        >
          {{ opt.label }}
        </button>
      </div>
    </div>

    <div class="filter-section">
      <label>Products</label>
      <div class="button-group products">
        <button
          v-for="product in products"
          :key="product"
          :class="{ active: filters.products.includes(product) }"
          @click="toggleProduct(product)"
        >
          {{ product }}
        </button>
      </div>
    </div>

    <div class="filter-section">
      <label>Price Range (€)</label>
      <div class="price-inputs">
        <input
          v-model.number="filters.minPrice"
          type="number"
          placeholder="Min"
          min="0"
          step="0.5"
        />
        <span>–</span>
        <input
          v-model.number="filters.maxPrice"
          type="number"
          placeholder="Max"
          min="0"
          step="0.5"
        />
      </div>
      <span class="hint">Filters by prices of selected products</span>
    </div>
  </div>
</template>

<style scoped>
.filter-panel {
  position: absolute;
  top: 10px;
  left: 10px;
  background: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  max-width: 280px;
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.filter-header h3 {
  margin: 0;
  font-size: 16px;
}

.reset-btn {
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  font-size: 12px;
}

.reset-btn:hover {
  color: #333;
}

.filter-section {
  margin-bottom: 12px;
}

.filter-section label {
  display: block;
  font-size: 12px;
  font-weight: 600;
  color: #555;
  margin-bottom: 6px;
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.button-group.products {
  flex-wrap: wrap;
}

.button-group button {
  padding: 6px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.2s;
}

.button-group button:hover {
  border-color: #999;
}

.button-group button.active {
  background: #2d7a4f;
  border-color: #2d7a4f;
  color: white;
}

.price-inputs {
  display: flex;
  align-items: center;
  gap: 8px;
}

.price-inputs input {
  width: 70px;
  padding: 6px 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 12px;
}

.price-inputs input:focus {
  outline: none;
  border-color: #2d7a4f;
}

.hint {
  display: block;
  font-size: 10px;
  color: #888;
  margin-top: 4px;
}
</style>
