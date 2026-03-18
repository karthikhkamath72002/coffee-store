import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ModalProps } from "../types";
import amazonImg from '../assets/amazon.png';
import flipkartImg from '../assets/flipkart.png';

export const PurchaseModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  product
}) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && product && (
        <>
          {/* overlay */}
          <motion.div
            className="fixed inset-0 z-50 bg-[#2A1A12]/70 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div className="bg-[#fbf5ee] rounded-3xl shadow-2xl max-w-md w-full p-8 relative">

              {/* close */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-[#2A1A12]/10"
              >
                ✕
              </button>

              {/* product */}
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-xl"
                />

                <div>
                  <h3
                    className="text-xl font-serif text-[#2A1A12]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {product.name}
                  </h3>

                  <p className="text-xs text-[#5D3A1A]/60">
                    {product.blend}
                  </p>
                </div>
              </div>

              <p className="text-center text-[#5D3A1A]/70 text-sm mb-6">
                Choose your preferred platform
              </p>

              {/* buttons */}
              <div className="space-y-3">

                <motion.a
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  href={product.amazonLink || '#'}
                  className="flex justify-center items-center w-full py-3 bg-[#FF9900] text-white rounded-full font-semibold shadow-md gap-2"
                >
                  <img
                    src={amazonImg}
                    alt="Amazon"
                    className="w-6 h-6 object-contain"
                  />
                  Buy on Amazon
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  href={product.flipkartLink || '#'}
                  className="flex justify-center items-center w-full py-3 bg-[#2874F0] text-white rounded-full font-semibold shadow-md gap-2"
                >
                  <img
                    src={flipkartImg}
                    alt="Flipkart"
                    className="w-6 h-6 object-contain"
                  />
                  Buy on Flipkart
                </motion.a>
              </div>

              {/* footer */}
              <div className="flex justify-center gap-6 mt-6 pt-4 border-t border-[#2A1A12]/10 text-xs text-[#5D3A1A]/50">
                <span>Secure Purchase</span>
                <span>Premium Quality</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};