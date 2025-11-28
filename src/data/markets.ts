import type { MarketStall } from '@/types/Market'

export const marketStalls: MarketStall[] = [
  {
    id: '1',
    name: "Willy's Alte Schänke",
    coordinates: [8.398733407798233, 49.00868278281362],
    payment: 'both',
    products: [
      { name: 'Glühwein rot', price: 4.5, vegan: 'Nein' },
      { name: 'Glühwein weiss', price: 4.5, vegan: 'Nein' },
      { name: 'Glühwein mit Schuss', price: 6, vegan: 'Nein' },
      { name: 'Kakao', price: 4, vegan: 'Nein' },
      { name: 'Kinderpunsch', price: 4, vegan: 'Ja' },
    ],
  },
]
