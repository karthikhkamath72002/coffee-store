import { useState, useEffect } from 'react';
import { getProducts, PRODUCTS_UPDATED_EVENT } from '../lib/productStore';
import type { Product } from '../types';

/**
 * Returns the current product list (from admin-uploaded CSV in localStorage, or default).
 * Updates when an admin uploads a new CSV (same tab).
 */
export function useProducts(): Product[] {
  const [products, setProducts] = useState<Product[]>(getProducts);

  useEffect(() => {
    const onUpdate = () => setProducts(getProducts());
    window.addEventListener(PRODUCTS_UPDATED_EVENT, onUpdate);
    return () => window.removeEventListener(PRODUCTS_UPDATED_EVENT, onUpdate);
  }, []);

  return products;
}
