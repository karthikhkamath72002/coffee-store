import type { Product } from '../types';
import { products as defaultProducts } from '../constants';

const STORAGE_KEY = 'farfalle_products';
const STORAGE_META_KEY = `${STORAGE_KEY}_meta`;
export const PRODUCTS_UPDATED_EVENT = 'farfalle_products_updated';
// Keep it effectively "always fresh" so GitHub edits reflect immediately.
const DEFAULT_TTL_MS = 0; // no client-side TTL gating

const PRODUCTS_JSON_URL =
  (import.meta as ImportMeta & { env: Record<string, string | undefined> }).env?.VITE_PRODUCTS_JSON_URL ||
  'https://raw.githubusercontent.com/karthikhkamath72002/coffee-store/main/public/products.json';

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
 * Parse CSV string into Product[].
 *
 * Required columns:
 * - id,name,blend,description,image,accentColor
 *
 * Optional columns (PDP config):
 * - lifestyleImage1,lifestyleImage2
 * - roast,process,size
 * - amazonLink,flipkartLink
 *
 * Image columns: URL or path (e.g. /products/name.png or https://...).
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

  if ([idIdx, nameIdx, blendIdx, descIdx, imageIdx].some((i) => i === -1)) {
    throw new Error(
      'CSV must have columns: id, name, blend, description, image' +
        (accentIdx === -1 ? ', (optional) accentColor' : ', accentColor')
    );
  }

  const lifestyle1Idx = header.findIndex((h) => h.toLowerCase() === 'lifestyleimage1');
  const lifestyle2Idx = header.findIndex((h) => h.toLowerCase() === 'lifestyleimage2');
  const roastIdx = header.findIndex((h) => h.toLowerCase() === 'roast');
  const processIdx = header.findIndex((h) => h.toLowerCase() === 'process');
  const sizeIdx = header.findIndex((h) => h.toLowerCase() === 'size');
  const amazonLinkIdx = header.findIndex((h) => h.toLowerCase() === 'amazonlink');
  const flipkartLinkIdx = header.findIndex((h) => h.toLowerCase() === 'flipkartlink');
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
      lifestyleImage1: lifestyle1Idx !== -1 ? (row[lifestyle1Idx] ?? '').trim() : undefined,
      lifestyleImage2: lifestyle2Idx !== -1 ? (row[lifestyle2Idx] ?? '').trim() : undefined,
      roast: roastIdx !== -1 ? (row[roastIdx] ?? '').trim() : undefined,
      process: processIdx !== -1 ? (row[processIdx] ?? '').trim() : undefined,
      size: sizeIdx !== -1 ? (row[sizeIdx] ?? '').trim() : undefined,
      amazonLink: amazonLinkIdx !== -1 ? (row[amazonLinkIdx] ?? '').trim() : undefined,
      flipkartLink: flipkartLinkIdx !== -1 ? (row[flipkartLinkIdx] ?? '').trim() : undefined,
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

    const overlayById = new Map<number, Product>((parsed as Product[]).map((p) => [p.id, p]));

    const sanitizeImage = (image: string, fallback: string): string => {
      const v = String(image ?? '').trim();
      if (!v) return fallback;
      return v;
    };

    const sanitizeLifestyle = (image: string | undefined): string | undefined => {
      const v = String(image ?? '').trim();
      if (!v) return undefined;
      return v;
    };

    const defaultIds = new Set(defaultProducts.map((p) => p.id));
    const defaultFallbackImage = defaultProducts[0]?.image || '';

    // 1) Merge defaults with any saved overrides.
    const mergedDefaults = defaultProducts.map((d) => {
      const p = overlayById.get(d.id);
      if (!p) return d;

      return {
        ...d,
        ...p,
        name: (p.name?.trim() ? p.name : d.name) as string,
        blend: (p.blend?.trim() ? p.blend : d.blend) as string,
        description: (p.description?.trim() ? p.description : d.description) as string,
        accentColor: (p.accentColor?.trim() ? p.accentColor : d.accentColor) as string,
        image: sanitizeImage(p.image, d.image || defaultFallbackImage),
        lifestyleImage1: sanitizeLifestyle(p.lifestyleImage1),
        lifestyleImage2: sanitizeLifestyle(p.lifestyleImage2),
      };
    });

    // 2) Append any extra products admins added (ids not present in defaults).
    const extras = (parsed as Product[])
      .filter((p) => !defaultIds.has(p.id))
      .map((p) => {
        const fallbackAccent = p.accentColor || '#5D3A1A';
        return {
          ...p,
          name: p.name?.trim() ? p.name : `Product ${p.id}`,
          blend: p.blend?.trim() ? p.blend : '',
          description: p.description?.trim() ? p.description : '',
          accentColor: p.accentColor?.trim() ? p.accentColor : fallbackAccent,
          image: sanitizeImage(p.image, defaultFallbackImage),
          lifestyleImage1: sanitizeLifestyle(p.lifestyleImage1),
          lifestyleImage2: sanitizeLifestyle(p.lifestyleImage2),
        };
      });

    return [...mergedDefaults, ...extras];
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

function getLastFetched(): number | null {
  try {
    const raw = localStorage.getItem(STORAGE_META_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { lastFetched?: number };
    if (typeof parsed.lastFetched !== 'number') return null;
    return parsed.lastFetched;
  } catch {
    return null;
  }
}

function setLastFetched(ts: number): void {
  localStorage.setItem(STORAGE_META_KEY, JSON.stringify({ lastFetched: ts }));
}

/**
 * Fetch products config from a GitHub-hosted JSON file.
 *
 * Admin workflow (free): edit `products.json` in the GitHub repo and commit.
 * The website will refetch automatically (cached for ~5 minutes).
 */
export async function refreshProductsFromGithub(options?: { force?: boolean; ttlMs?: number }): Promise<void> {
  const force = options?.force ?? false;
  const ttlMs = options?.ttlMs ?? DEFAULT_TTL_MS;

  if (!PRODUCTS_JSON_URL) return;

  if (!force) {
    const lastFetched = getLastFetched();
    if (typeof lastFetched === 'number' && Date.now() - lastFetched < ttlMs) return;
  }

  const res = await fetch(PRODUCTS_JSON_URL, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Failed to fetch products.json (${res.status}).`);

  const data = (await res.json()) as unknown;
  if (!Array.isArray(data)) throw new Error('products.json must be an array.');

  const normalized: Product[] = data.map((p: any) => {
    const id = typeof p?.id === 'number' ? p.id : parseInt(String(p?.id ?? ''), 10);
    return {
      id: Number.isFinite(id) ? id : 0,
      name: typeof p?.name === 'string' ? p.name : '',
      blend: typeof p?.blend === 'string' ? p.blend : '',
      description: typeof p?.description === 'string' ? p.description : '',
      image: typeof p?.image === 'string' ? p.image : '',
      accentColor: typeof p?.accentColor === 'string' ? p.accentColor : '#5D3A1A',
      lifestyleImage1: typeof p?.lifestyleImage1 === 'string' ? p.lifestyleImage1 : undefined,
      lifestyleImage2: typeof p?.lifestyleImage2 === 'string' ? p.lifestyleImage2 : undefined,
      roast: typeof p?.roast === 'string' ? p.roast : undefined,
      process: typeof p?.process === 'string' ? p.process : undefined,
      size: typeof p?.size === 'string' ? p.size : undefined,
      amazonLink: typeof p?.amazonLink === 'string' ? p.amazonLink : undefined,
      flipkartLink: typeof p?.flipkartLink === 'string' ? p.flipkartLink : undefined,
    };
  });

  // Filter out invalid items early so getProducts() doesn't revert to defaults.
  const valid = normalized.filter((p) => Number.isFinite(p.id) && p.id > 0 && p.name.trim().length > 0 && typeof p.image === 'string');

  setLastFetched(Date.now());
  setProducts(valid);
}
