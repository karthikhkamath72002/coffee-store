import React from 'react';
import { motion } from 'framer-motion';
import { useProducts } from '../hooks/useProducts';
import amazonImg from '../assets/amazon.png';
import flipkartImg from '../assets/flipkart.png';

interface ProductDetailPageProps {
  productId: string;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ productId }) => {
  const products = useProducts();
  const id = parseInt(productId, 10);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#fbf5ee] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#5D3A1A] mb-4">Product not found.</p>
          <a href="#/products" className="text-[#8B4513] font-medium hover:underline">
            Back to collection
          </a>
        </div>
      </div>
    );
  }

  const goToCollection = () => {
    window.location.hash = "#/products";
  };

  // Ensure PDP does not depend on external image URLs.
  // If admin hasn't uploaded lifestyle images, we fall back to the main product image.
  const lifestyle1 = product.lifestyleImage1 || product.image;
  const lifestyle2 = product.lifestyleImage2 || product.image;
  const roast = product.roast || 'Medium';
  const process = product.process || 'Washed';
  const size = product.size || '1 KG';

  return (
    <div className="min-h-screen bg-[#fbf5ee]" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Spacer for fixed navbar */}
      <div className="h-[72px] sm:h-[80px] md:h-[88px]" aria-hidden />

      {/* Back button: below navbar, above product card */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 pt-4 pb-2">
        <button
          type="button"
          onClick={goToCollection}
          className="inline-flex items-center gap-2 text-sm text-[#5D3A1A] font-medium hover:text-[#2A1A12] transition-colors bg-transparent border-0 cursor-pointer"
        >
          <span aria-hidden>←</span>
          <span>Back to collection</span>
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 pb-16">
        {/* Product Card */}
        <motion.div
          className="mt-2 bg-[#fbf5ee] rounded-3xl shadow-xl overflow-hidden border border-[#2A1A12]/10"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="grid lg:grid-cols-2">

            {/* LEFT SIDE — IMAGES */}
            <div className="p-6 md:p-10">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-md">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  loading="eager"
                  decoding="async"
                  onError={() => {
                    // eslint-disable-next-line no-console
                    console.error('PDP main image failed:', product.id, product.image);
                  }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                {[lifestyle1, lifestyle2].map((img, i) => (
                  <div key={i} className="rounded-xl overflow-hidden">
                    <img
                      src={img}
                      className="object-cover w-full h-full"
                      loading="eager"
                      decoding="async"
                      onError={() => {
                        // eslint-disable-next-line no-console
                        console.error('PDP lifestyle image failed:', product.id, img);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT SIDE — DETAILS */}
            <div className="p-6 md:p-10 flex flex-col justify-start">

              <p className="uppercase tracking-[0.3em] text-xs text-[#8B4513] mb-3">
                Farfalle Collection
              </p>

              <h1
                className="text-4xl md:text-5xl font-serif text-[#2A1A12]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {product.name}
              </h1>

              <p className="mt-2 text-[#8B4513] text-sm tracking-wide">
                {product.blend.replace(/, /g, " • ")}
              </p>

              <div className="w-16 h-[2px] bg-[#8B4513] mt-4 mb-6" />

              <p className="text-[#5D3A1A] leading-relaxed max-w-lg">
                {product.description}
              </p>

              {/* PRODUCT ATTRIBUTES */}
              <div className="grid grid-cols-3 gap-4 mt-8">

                <div className="bg-[#f3ece4] rounded-xl p-4 text-center">
                  <p className="text-xs text-[#8B4513] uppercase">Roast</p>
                  <p className="font-semibold text-[#2A1A12]">{roast}</p>
                </div>

                <div className="bg-[#f3ece4] rounded-xl p-4 text-center">
                  <p className="text-xs text-[#8B4513] uppercase">Process</p>
                  <p className="font-semibold text-[#2A1A12]">{process}</p>
                </div>

                <div className="bg-[#f3ece4] rounded-xl p-4 text-center">
                  <p className="text-xs text-[#8B4513] uppercase">Size</p>
                  <p className="font-semibold text-[#2A1A12]">{size}</p>
                </div>

              </div>

              {/* BUY SECTION */}
              <div className="mt-10">

                <p className="text-xs uppercase tracking-[0.25em] text-[#8B4513] mb-4">
                  Available On
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  {/* AMAZON */}
                  <motion.a
                    href={product.amazonLink || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center justify-between p-4 bg-white rounded-xl border border-[#2A1A12]/10 shadow-sm hover:shadow-md transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#FF9900] flex items-center justify-center">
                        <img
                          src={amazonImg}
                          alt="Amazon"
                            className="w-7 h-7 object-contain"
                        />
                      </div>

                      <div>
                        <p className="font-semibold text-[#2A1A12]">
                          Amazon
                        </p>
                      </div>
                    </div>

                    <span className="text-[#8B4513] font-medium text-sm">
                      Buy →
                    </span>
                  </motion.a>

                  {/* FLIPKART */}
                  <motion.a
                    href={product.flipkartLink || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center justify-between p-4 bg-white rounded-xl border border-[#2A1A12]/10 shadow-sm hover:shadow-md transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#2874F0] flex items-center justify-center">
                        <img
                          src={flipkartImg}
                          alt="Flipkart"
                            className="w-7 h-7 object-contain"
                        />
                      </div>

                      <div>
                        <p className="font-semibold text-[#2A1A12]">
                          Flipkart
                        </p>
                       
                      </div>
                    </div>

                    <span className="text-[#8B4513] font-medium text-sm">
                      Buy →
                    </span>
                  </motion.a>

                </div>

              </div>

            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};