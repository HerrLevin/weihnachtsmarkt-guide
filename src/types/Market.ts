export type ProductName =
  | 'Glühwein rot'
  | 'Glühwein weiss'
  | 'Glühwein mit Schuss'
  | 'Kakao'
  | 'Kinderpunsch'

export type PaymentMethod = 'cash-only' | 'credit-card' | 'both'

export type VeganPossibilities = 'Ja' | 'Nein' | 'Nicht sicher' | 'keine Daten'

export interface Product {
  name: ProductName
  price: number
  description?: string
  vegan: VeganPossibilities
}

export interface MarketStall {
  id: string
  name: string
  coordinates: [number, number]
  payment: PaymentMethod
  products: Product[]
}

export interface Filters {
  vegan: VeganPossibilities | null
  payment: PaymentMethod | null
  products: ProductName[]
  minPrice: number | null
  maxPrice: number | null
}
