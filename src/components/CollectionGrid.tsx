import React from 'react';
import { motion } from 'framer-motion';
import { useProducts } from '../hooks/useProducts';
import { ProductCard } from './ProductCard';
import type { Product } from '../types';

const PRODUCTS_PAGE_HASH = '#/products';

interface CollectionGridProps {
  onProductSelect: (product: Product) => void;
  /** When set, show only this many products and a "View more" button. Omit to show all. */
  limit?: number;
  /** When true (e.g. on Products page), no dark strip; section uses page background for clear separation from nav. */
  standalone?: boolean;
}

export const CollectionGrid: React.FC<CollectionGridProps> = ({ onProductSelect, limit, standalone }) => {
  const products = useProducts();
  const list = limit != null ? products.slice(0, limit) : products;
  const showViewMore = limit != null && products.length > limit;

  return (
    <section
      id="collection"
      className={`relative w-full min-w-0 overflow-x-hidden ${standalone ? 'bg-[#fbf5ee] py-2 sm:py-3 md:py-4' : 'bg-[#1a1512] py-[0.585rem] sm:py-[0.78rem] md:py-[0.975rem]'}`}
    >
      <div className="w-full min-w-0 px-3 sm:px-4 md:px-5">
        <div className={`bg-[#fbf5ee] rounded-xl md:rounded-2xl pb-10 sm:pb-14 md:pb-20 lg:pb-24 px-4 sm:px-6 md:px-8 ${standalone ? 'pt-6 sm:pt-8 md:pt-10' : 'pt-12 sm:pt-16 md:pt-20 lg:pt-24'}`}>
          <div className="text-center mb-8 sm:mb-12 md:mb-16 pt-2 overflow-visible">
            <motion.span
              className="block text-[#8B4513] text-[10px] md:text-xs tracking-[0.3em] uppercase mb-2 md:mb-3 font-medium"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -50px 0px" }}
            >
              The Complete Collection
            </motion.span>
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif text-[#2A1A12] leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -50px 0px" }}
              transition={{ delay: 0.08 }}
            >
              Choose Your <span className="italic text-[#8B4513]">Ritual</span>
            </motion.h2>
          </div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-6">
            {list.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} onSelect={onProductSelect} />
            ))}
          </div>

          {showViewMore && (
            <motion.div
              className="text-center mt-8 sm:mt-10 md:mt-12"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <a
                href={PRODUCTS_PAGE_HASH}
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-3.5 bg-[#2A1A12] text-[#FFF8E9] rounded-full text-sm font-medium hover:bg-[#3d2818] transition-colors"
              >
                View more
              </a>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
