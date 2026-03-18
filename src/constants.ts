import type { Product } from './types';

import flutureImg from './assets/fluture.png';
import papillionImg from './assets/papillion.png';
import borboletaImg from './assets/borboleta.png';
import titaleeImg from './assets/titalee.png';
import vlinderImg from './assets/vlinder.png';
import classicImg from './assets/classic.png';
import filterCoffeeImg from './assets/filter_coffee.png';
import filterCoffee2Img from './assets/filter_coffee_2.png';
import tramSipImg from './assets/tram_sip.png';
import farashaImg from './assets/farasha.png';

export const HOME_BG = '#fbf5ee';

export const products: Product[] = [
  {
    id: 1,
    name: "FLUTURE",
    blend: "50% Arabica, 50% Robusta",
    description: "A strong and rich coffee blend with notes of nuts and dark chocolate. Carefully sourced beans delivering a bold and aromatic cup.",
    image: flutureImg,
    accentColor: "#8B4513"
  },
  {
    id: 2,
    name: "BORBOLETA",
    blend: "100% Robusta",
    description: "A bold and intense full-bodied coffee with rich chocolatey notes. Carefully selected from the hills of Chikmagalur.",
    image: borboletaImg,
    accentColor: "#5D3A1A"
  },
  {
    id: 3,
    name: "IRAM SIP",
    blend: "70% Arabica, 30% Robusta",
    description: "A robust aromatic coffee with nutty undertones, crafted from carefully balanced Arabica and Robusta beans.",
    image: tramSipImg,
    accentColor: "#1E3A8A"
  },
  {
    id: 4,
    name: "PAPILLION",
    blend: "100% Arabica",
    description: "A rich and smooth specialty Arabica coffee with delicate floral and nutty notes sourced from premium organic estates.",
    image: papillionImg,
    accentColor: "#D4A574"
  },
  {
    id: 5,
    name: "TITALEE",
    blend: "80% Arabica, 20% Robusta",
    description: "A bold balanced coffee with hints of chocolate and spice from the rich soils of Chikmagalur.",
    image: titaleeImg,
    accentColor: "#A0522D"
  },
  {
    id: 6,
    name: "FARASHA",
    blend: "35% Arabica, 65% Robusta",
    description: "A full-bodied strong coffee with earthy and spicy undertones made from carefully selected beans.",
    image: farashaImg,
    accentColor: "#C59A2D"
  },
  {
    id: 7,
    name: "VLINDER",
    blend: "100% Arabica with Peppery Beans",
    description: "A rich and smooth specialty coffee delivering berry and chocolate notes with a peppery twist.",
    image: vlinderImg,
    accentColor: "#556B2F"
  },
  {
    id: 8,
    name: "CLASSIC",
    blend: "Instant Agglomerated Coffee",
    description: "Premium instant coffee offering superior taste and aroma with quick solubility for a rich cup in seconds.",
    image: classicImg,
    accentColor: "#B91C1C"
  },
  {
    id: 9,
    name: "FILTER COFFEE",
    blend: "80% Coffee, 20% Chicory",
    description: "Authentic South Indian filter coffee with rich aroma and creamy froth made from carefully roasted beans and chicory.",
    image: filterCoffeeImg,
    accentColor: "#6B4423"
  },
  {
    id: 10,
    name: "FILTER COFFEE DECOCTION",
    blend: "100% Arabica Decoction",
    description: "Classic ready-to-use coffee decoction from Coorg, Karnataka. Simply mix with milk and sugar for traditional filter coffee.",
    image: filterCoffee2Img,
    accentColor: "#4A2C1A"
  }
];