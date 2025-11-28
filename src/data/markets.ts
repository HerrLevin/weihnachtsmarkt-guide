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
  {
    id: '2',
    name: 'Flammlachs',
    coordinates: [8.398558191750908, 49.008700821880666],
    payment: 'cash-only',
    products: [
      { name: 'Flammlachs', price: 9, vegan: 'Nein' },
      { name: 'Andere', alias: 'Rosmarinkartoffeln', price: 0, vegan: 'Ja' },
    ],
  },
  {
    id: '3',
    name: 'Fächerfritten',
    coordinates: [8.398768424455255, 49.00887890078667],
    payment: 'cash-only',
    products: [
      { name: 'Andere', alias: 'Hausfritten', price: 4, vegan: 'Ja' },
      { name: 'Andere', alias: 'Süsse Fritten – Süsskartoffeln', price: 7, vegan: 'Ja' },
      { name: 'Andere', alias: 'Curly Fries', price: 6, vegan: 'Ja' },
      { name: 'Andere', alias: 'Chili sin Carne (sauce)', price: 2, vegan: 'Ja' },
      { name: 'Andere', alias: 'Cuacamole (sauce)', price: 3, vegan: 'Ja' },
    ],
  },
  {
    id: '4',
    name: 'Alte Bank',
    coordinates: [8.398855236838216, 49.00884285659561],
    payment: 'cash-only',
    products: [
      { name: 'Hot Aperol', price: 6.5, vegan: 'Nein' },
      { name: 'Glühwein weiss', price: 4.5, vegan: 'Nein' },
      { name: 'Glühwein rot', price: 4.5, vegan: 'Nein' },
      { name: 'Glühwein mit Schuss', price: 5.5, vegan: 'Nein' },
      { name: 'Kinderpunsch', price: 4.5, vegan: 'Nein' },
    ],
  },
  {
    id: '5',
    name: 'Pizza & Flammkuchen',
    coordinates: [8.398897346693218, 49.008830296253564],
    payment: 'cash-only',
    products: [
      { name: 'Andere', alias: 'Pizza Margherita', price: 5, vegan: 'Nein' },
      { name: 'Andere', alias: 'Pizza Salami', price: 6, vegan: 'Nein' },
      {
        name: 'Andere',
        alias: 'Pizza Vegan (Tomatensoße, Paprika, Oliven, Champignons)',
        price: 6,
        vegan: 'Ja',
      },
      { name: 'Andere', alias: 'Flammkuchen', price: 6, vegan: 'Nein' },
    ],
  },
  {
    id: '6',
    name: 'Churros',
    coordinates: [8.39887516108709, 49.00874534043831],
    payment: 'cash-only',
    desription: 'Churros hier sind vegan. Vegane Toppings sind vorhanden.',
    products: [
      { name: 'Andere', alias: '6 Churros mit Zucker & Zimt', price: 6, vegan: 'Ja' },
      { name: 'Andere', alias: '12 Churros mit Zucker & Zimt', price: 11, vegan: 'Ja' },
      { name: 'Andere', alias: '12 Churros mit Schokolade & Topping', price: 13, vegan: 'Ja' },
    ],
  },
  {
    id: '7',
    name: 'Krusig',
    coordinates: [8.39882371026701, 49.00867762116491],
    payment: 'cash-only',
    products: [
      {
        name: 'Andere',
        alias: 'Pasta Classic (Zwiebeln, Knoblauch, Öl, Sahne, Gewürze)',
        price: 9,
        vegan: 'Nein',
      },
      {
        name: 'Andere',
        alias: 'Pasta Tomatensoße (Zwiebeln, Knoblauch, Oliven, Tomaten, Gewürze)',
        price: 9,
        vegan: 'Möglich',
      },
      { name: 'Andere', alias: 'Germknödel', price: 7.5, vegan: 'Möglich' },
    ],
  },
  {
    id: '8',
    name: 'Langosseria',
    coordinates: [8.39900697043305, 49.008678123850615],
    payment: 'both',
    desription:
      'Langos-Teig vegan. Vegane Toppings sind vorhanden. (Paprikasauce, apfelmuss, Zimt zucker, Tomate Rucola, Erdbeermarmelade)',
    products: [
      { name: 'Langos', price: 0, vegan: 'Ja' },
      { name: 'Langos Spezial', price: 8, vegan: 'Nein' },
    ],
  },
  {
    id: '9',
    name: 'Der Grill',
    coordinates: [8.398980915645183, 49.00864695881074],
    payment: 'both',
    products: [{ name: 'Andere', alias: 'Pommes', price: 0, vegan: 'Ja' }],
  },
  {
    id: '10',
    name: '',
    coordinates: [8.39868169620226, 49.00857446326981],
    payment: 'both',
    products: [
      { name: 'Crepes Nutella', price: 5, vegan: 'Nein' },
      { name: 'Crepes Schinken Käse', price: 6, vegan: 'Nein' },
    ],
  },
]
