export type Product = 'Glühwein rot' | 'Glühwein weiss' | 'Glühwein mit Schuss' | 'Kakao'

export type PaymentMethod = 'cash-only' | 'credit-card' | 'both'

export type ProductPrices = Partial<Record<Product, number>>

export interface MarketStall {
  id: string
  name: string
  coordinates: [number, number]
  vegan: boolean
  payment: PaymentMethod
  prices: ProductPrices
}

export interface Filters {
  vegan: boolean | null
  payment: PaymentMethod | null
  products: Product[]
  minPrice: number | null
  maxPrice: number | null
}
