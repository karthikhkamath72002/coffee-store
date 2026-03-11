import React from 'react';
import { motion } from 'framer-motion';
import { products } from '../constants';
import { Navigation } from './Navigation';

const LIFESTYLE_IMAGES = [
  'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&q=80',
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80',
];

interface ProductDetailPageProps {
  productId: string;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ productId }) => {
  const id = parseInt(productId, 10);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#fbf5ee] flex items-center justify-center" style={{ fontFamily: "'Inter', sans-serif" }}>
        <div className="text-center">
          <p className="text-[#5D3A1A] mb-4">Product not found.</p>
          <a href="#/products" className="text-[#8B4513] font-medium hover:underline">Back to collection</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full min-w-0 bg-[#fbf5ee]" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Navigation />
      <div className="pt-[72px] sm:pt-[80px] md:pt-[88px]" />

      <div className="px-3 sm:px-4 md:px-6 lg:px-8 pb-12 md:pb-16">
        <a
          href="#/products"
          className="inline-flex items-center gap-2 text-sm text-[#5D3A1A] hover:text-[#2A1A12] mb-6 md:mb-8 font-medium"
        >
          ← Back to collection
        </a>

        <motion.div
          className="max-w-6xl mx-auto bg-[#fbf5ee] rounded-2xl md:rounded-3xl shadow-xl border border-[#2A1A12]/10 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left: images */}
            <div className="p-4 sm:p-6 md:p-8 lg:p-10 order-2 lg:order-1">
              <div className="aspect-square rounded-xl overflow-hidden bg-[#2A1A12]/5 mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {LIFESTYLE_IMAGES.map((src, i) => (
                  <div key={i} className="aspect-square rounded-xl overflow-hidden bg-[#2A1A12]/5">
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>

            {/* Right: details + purchase */}
            <div className="p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col justify-center order-1 lg:order-2">
              <span
                className="block text-[#8B4513] text-[10px] md:text-xs tracking-[0.2em] uppercase mb-2 font-medium"
              >
                The Farfalle Collection
              </span>
              <h1
                className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#2A1A12] mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {product.name}
              </h1>
              <p className="text-sm text-[#5D3A1A] mb-6">
                {product.blend.replace(/, /g, ' • ')}
              </p>
              <p className="text-[#5D3A1A]/90 leading-relaxed mb-8 max-w-lg">
                {product.description}
              </p>

              <p className="text-sm font-medium text-[#2A1A12] mb-3">Buy on</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <motion.a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex justify-center items-center w-full sm:flex-1 py-3 bg-[#FF9900] text-white rounded-full font-semibold shadow-md"
                >
                  Buy on Amazon
                </motion.a>
                <motion.a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex justify-center items-center w-full sm:flex-1 py-3 bg-[#2874F0] text-white rounded-full font-semibold shadow-md"
                >
                  Buy on Flipkart
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
