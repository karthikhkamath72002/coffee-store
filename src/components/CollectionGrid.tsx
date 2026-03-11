import React from 'react';
import { motion } from 'framer-motion';
import { products } from '../constants';
import { ProductCard } from './ProductCard';
import type { Product } from '../types';

const PRODUCTS_PAGE_HASH = '#/products';

interface CollectionGridProps {
  onProductSelect: (product: Product) => void;
  /** When set, show only this many products and a "View more" button. Omit to show all. */
  limit?: number;
}

export const CollectionGrid: React.FC<CollectionGridProps> = ({ onProductSelect, limit }) => {
  const list = limit != null ? products.slice(0, limit) : products;
  const showViewMore = limit != null && products.length > limit;

  return (
    <section className="relative w-full min-w-0 bg-[#1a1512] py-3 sm:py-4 md:py-5 overflow-hidden">
      <div className="px-3 sm:px-4 md:px-5">
        <div className="bg-[#fbf5ee] rounded-xl md:rounded-2xl py-10 sm:py-14 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <motion.span
              className="block text-[#8B4513] text-[10px] md:text-xs tracking-[0.3em] uppercase mb-2 md:mb-3 font-medium"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              The Complete Collection
            </motion.span>
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif text-[#2A1A12]"
              style={{ fontFamily: "'Playfair Display', serif" }}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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
