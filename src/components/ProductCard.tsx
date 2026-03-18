import React from "react";
import { motion } from "framer-motion";
import type { Product } from "../types";

interface ProductCardProps {
  product: Product;
  index: number;
  onSelect: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  index,
  onSelect
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="group relative"
    >
      {/* glow effect */}
      <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-[#C98B43] to-[#E7B276] opacity-0 blur-xl group-hover:opacity-30 transition duration-500" />

      <motion.div
        whileHover={{ y: -10 }}
        className="
        relative
        bg-[#fbf5ee]
        rounded-xl
        border-2
        border-[#6b3e21]/100
        shadow-lg
        p-7
        flex
        flex-col
        items-center
        text-center
        transition-all
        duration-300
        group-hover:shadow-2xl
      "
      >
        {/* image - full image visible, no cropping */}
        <div className="min-h-[180px] h-[200px] w-full mb-6 rounded-2xl overflow-hidden bg-[#fbf5ee] flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            loading="eager"
            decoding="async"
            onError={() => {
              console.error('PLP image failed:', product.id, product.image);
            }}
            className="w-full h-full object-contain rounded-2xl scale-[1.03] group-hover:scale-[1.08] transition-transform duration-500"
          />
        </div>

        {/* name */}
        <h3
          className="text-2xl font-serif text-[#2A1A12] mb-2"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {product.name}
        </h3>

        {/* blend */}
        <p className="text-xs tracking-wide text-[#6A4A3A] mb-3">
          {product.blend}
        </p>

        {/* description */}
        <p className="text-sm text-[#5D3A1A]/70 leading-relaxed mb-6">
          {product.description ||
            "A masterfully crafted coffee delivering rich aroma and smooth flavor notes."}
        </p>

        {/* button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => onSelect(product)}
          className="
          px-6
          py-2.5
          bg-[#2A1A12]
          text-white
          rounded-full
          text-sm
          tracking-wide
          shadow-md
          hover:bg-[#4A2E1C]
          transition
        "
        >
          View details
        </motion.button>
      </motion.div>
    </motion.div>
  );
};