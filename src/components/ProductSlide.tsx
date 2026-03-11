import React from 'react';
import { motion, useTransform, type MotionValue } from 'framer-motion';
import type { Product } from '../types';

interface ProductSlideProps {
  product: Product;
  index: number;
  totalSlides: number;
  scrollProgress: MotionValue<number>;
}

export const ProductSlide: React.FC<ProductSlideProps> = ({ product, index, totalSlides, scrollProgress }) => {
  const segmentSize = 1 / totalSlides;
  const slideStart = index * segmentSize;
  const slideEnd = (index + 1) * segmentSize;

  const y = useTransform(
    scrollProgress,
    [Math.max(0, slideStart - segmentSize * 0.3), slideStart, slideEnd - segmentSize * 0.2, slideEnd],
    ['100%', '0%', '0%', '-100%']
  );

  const opacity = useTransform(
    scrollProgress,
    [Math.max(0, slideStart - segmentSize * 0.2), slideStart, slideEnd - segmentSize * 0.3, slideEnd],
    [0, 1, 1, 0]
  );

  return (
    <motion.div
      className="absolute inset-3 md:inset-5 rounded-xl md:rounded-2xl overflow-hidden"
      style={{ y, opacity, zIndex: totalSlides - index }}
    >
      <div className="w-full h-full flex bg-[#1E1410] rounded-xl md:rounded-2xl overflow-hidden">
        <div className="w-1/2 h-full relative overflow-hidden">
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            initial={{ scale: 1.15 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#1E1410]/90" />
          <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8">
            <span className="text-[8rem] sm:text-[10rem] md:text-[14rem] lg:text-[18rem] font-serif text-white/[0.03] leading-none select-none" style={{ fontFamily: "'Playfair Display', serif" }}>
              0{index + 1}
            </span>
          </div>
        </div>

        <div className="w-1/2 h-full flex flex-col justify-center px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 relative">
          <motion.span
            className="inline-block self-start px-3 py-1.5 md:px-4 md:py-2 bg-[#D4A574]/15 text-[#D4A574] text-[10px] md:text-xs font-medium tracking-wider rounded-full mb-4 md:mb-6"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            {product.blend}
          </motion.span>

          <motion.h2
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-[#FDFBF7] mb-4 md:mb-6 tracking-tight leading-[0.95]"
            style={{ fontFamily: "'Playfair Display', serif" }}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {product.name}
          </motion.h2>

          <motion.p
            className="text-sm sm:text-base md:text-lg lg:text-xl text-[#FDFBF7]/60 leading-relaxed max-w-sm md:max-w-md mb-6 md:mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {product.description}
          </motion.p>

          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="h-px w-8 md:w-12 bg-gradient-to-r from-[#D4A574] to-transparent" />
            <span className="text-[#D4A574]/70 text-[10px] md:text-xs tracking-[0.2em] uppercase">Premium Selection</span>
          </motion.div>

          <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 opacity-15">
            <svg width="50" height="75" viewBox="0 0 50 75" fill="none">
              <ellipse cx="25" cy="37.5" rx="23" ry="35" fill="#D4A574" />
              <path d="M25 6 Q18 37.5 25 69" stroke="#1E1410" strokeWidth="2" fill="none" />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
