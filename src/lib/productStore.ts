import type { Product } from '../types';
import { products as defaultProducts } from '../constants';

const STORAGE_KEY = 'farfalle_products';
export const PRODUCTS_UPDATED_EVENT = 'farfalle_products_updated';

/**
 * Parse a single CSV row respecting double-quoted fields (commas inside quotes are preserved).
 */
function parseCsvRow(line: string): string[] {
  const out: string[] = [];
  let i = 0;
  while (i < line.length) {
    if (line[i] === '"') {
      i += 1;
      let cell = '';
      while (i < line.length) {
        if (line[i] === '"') {
          i += 1;
          if (line[i] === '"') {
            cell += '"';
            i += 1;
          } else break;
        } else {
          cell += line[i];
          i += 1;
        }
      }
      out.push(cell);
    } else {
      let cell = '';
      while (i < line.length && line[i] !== ',') {
        cell += line[i];
        i += 1;
      }
      out.push(cell.trim());
      if (i < line.length) i += 1;
    }
  }
  return out;
}

/**
 * Parse CSV string into Product[]. Expected header: id,name,blend,description,image,accentColor
 * Image column: URL or path (e.g. /products/name.png or https://...).
 */
export function parseProductsCsv(csv: string): Product[] {
  const lines = csv.trim().split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) return [];
  const header = parseCsvRow(lines[0].trim());
  const idIdx = header.findIndex((h) => h.toLowerCase() === 'id');
  const nameIdx = header.findIndex((h) => h.toLowerCase() === 'name');
  const blendIdx = header.findIndex((h) => h.toLowerCase() === 'blend');
  const descIdx = header.findIndex((h) => h.toLowerCase() === 'description');
  const imageIdx = header.findIndex((h) => h.toLowerCase() === 'image');
  const accentIdx = header.findIndex((h) => h.toLowerCase() === 'accentcolor');
  if ([idIdx, nameIdx, blendIdx, descIdx, imageIdx, accentIdx].some((i) => i === -1)) {
    throw new Error('CSV must have columns: id, name, blend, description, image, accentColor');
  }
  const products: Product[] = [];
  for (let r = 1; r < lines.length; r++) {
    const row = parseCsvRow(lines[r]);
    const id = parseInt(row[idIdx] ?? '', 10);
    if (Number.isNaN(id)) continue;
    products.push({
      id,
      name: (row[nameIdx] ?? '').trim() || `Product ${id}`,
      blend: (row[blendIdx] ?? '').trim(),
      description: (row[descIdx] ?? '').trim(),
      image: (row[imageIdx] ?? '').trim() || '',
      accentColor: (row[accentIdx] ?? '').trim() || '#5D3A1A',
    });
  }
  return products;
}

/**
 * Read products from localStorage. If none or invalid, return default from constants.
 */
export function getProducts(): Product[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProducts;
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed) || parsed.length === 0) return defaultProducts;
    const ok = parsed.every(
      (p: unknown) =>
        p != null &&
        typeof p === 'object' &&
        typeof (p as Product).id === 'number' &&
        typeof (p as Product).name === 'string' &&
        typeof (p as Product).image === 'string'
    );
    if (!ok) return defaultProducts;
    return parsed as Product[];
  } catch {
    return defaultProducts;
  }
}

/**
 * Save products to localStorage and notify listeners (e.g. useProducts).
 */
export function setProducts(products: Product[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  window.dispatchEvent(new CustomEvent(PRODUCTS_UPDATED_EVENT));
}

/**
 * Parse CSV and save to localStorage. Throws on parse error.
 */
export function setProductsFromCsv(csv: string): void {
  const products = parseProductsCsv(csv);
  if (products.length === 0) throw new Error('CSV produced no valid products.');
  setProducts(products);
}
