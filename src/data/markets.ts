import type { MarketStall } from '@/types/Market'

export const marketStalls: MarketStall[] = [
  {
    id: '1',
    name: "Willy's alte Schänke",
    coordinates: [8.398733407798233, 49.00868278281362],
    vegan: true,
    payment: 'both',
    prices: {
      'Glühwein rot': 4.5,
      'Glühwein weiss': 4.5,
      'Glühwein mit Schuss': 6,
      Kakao: 4,
    },
  },
]
