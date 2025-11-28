export type ProductName =
  | 'Glühwein rot'
  | 'Glühwein weiss'
  | 'Glühwein mit Schuss'
  | 'Hot Aperol'
  | 'Kakao'
  | 'Kinderpunsch'
  | 'Flammlachs'
  | 'Andere'
  | 'Langos'
  | 'Langos Spezial'
  | 'Crepes Nutella'
  | 'Crepes Schinken Käse'

export type PaymentMethod = 'cash-only' | 'credit-card' | 'both'

export type VeganPossibilities = 'Ja' | 'Nein' | 'Nicht sicher' | 'keine Daten' | 'Möglich'

export interface Product {
  name: ProductName
  alias?: string
  price: number
  description?: string
  vegan: VeganPossibilities
}

export interface MarketStall {
  id: string
  name: string
  desription?: string
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
