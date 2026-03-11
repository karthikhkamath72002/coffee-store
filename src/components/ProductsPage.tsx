import React from 'react';
import { Navigation } from './Navigation';
import { CollectionGrid } from './CollectionGrid';
import type { Product } from '../types';

interface ProductsPageProps {
  onProductSelect: (product: Product) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({ onProductSelect }) => {
  return (
    <div className="min-h-screen w-full min-w-0 bg-[#fbf5ee]" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Navigation />
      <div className="pt-[72px] sm:pt-[80px] md:pt-[88px]" />
      <CollectionGrid onProductSelect={onProductSelect} />
    </div>
  );
};
