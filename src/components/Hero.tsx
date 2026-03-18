import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HOME_BG } from '../constants';
import heroCoffeeImage from '../assets/coffe-hero-image.png';

const ROLL_INTERVAL_MS = 3500;

export const Hero: React.FC = () => {
  const [showMind, setShowMind] = useState(false);

  useEffect(() => {
    const t = window.setInterval(() => setShowMind((prev) => !prev), ROLL_INTERVAL_MS);
    return () => window.clearInterval(t);
  }, []);

  return (
    <section
      className="
        relative w-full min-h-screen flex flex-col lg:flex-row
        border-x-[12px] border-b-[12px] border-black border-t-0
        rounded-b-[40px] rounded-t-none
        overflow-hidden
      "
      style={{ backgroundColor: HOME_BG }}
    >
      {/* BACKGROUND FIX (prevents bottom strip) */}
      <div className="absolute inset-0 bg-[#F5EFE9] -z-10" />

      {/* Animated dots */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(139,69,19,0.38) 1.1px, transparent 1.4px)',
          backgroundSize: '24px 24px',
          opacity: 0.55,
        }}
        initial={{ x: 0, y: 0 }}
        animate={{ x: [0, 14, 0], y: [0, -10, 0] }}
        transition={{ duration: 140, repeat: Infinity, ease: 'linear' }}
      />

      {/* LEFT TEXT */}
      <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-start px-4 sm:px-6 md:px-8 lg:pl-28 xl:pl-44 relative z-10">
        <div className="max-w-xl w-full text-center lg:text-left">
          <span className="block text-[#8B4513] text-[12px] sm:text-[13px] tracking-[0.38em] uppercase mb-4 sm:mb-6">
            FARFALLE COFFEE
          </span>

          <h2
            className="text-[58px] min-[380px]:text-[68px] sm:text-[76px] md:text-[92px] lg:text-[120px] xl:text-[152px] leading-[0.95] text-[#2A1A12]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            <span className="block">Ignite</span>
            <span className="italic text-[#8B4513] block">Your</span>

            <span
              className="block overflow-hidden relative"
              style={{ height: '1.05em' }}
            >
              <motion.span
                className="absolute inset-x-0 top-0 block"
                animate={{ y: showMind ? '-100%' : 0 }}
                transition={{ duration: 0.5 }}
              >
                Mind.
              </motion.span>

              <motion.span
                className="absolute inset-x-0 top-0 block"
                animate={{ y: showMind ? 0 : '100%' }}
                transition={{ duration: 0.5 }}
              >
                Day.
              </motion.span>
            </span>
          </h2>

          <p className="mt-8 text-[#5D3A1A] text-base sm:text-lg md:text-xl tracking-wider">
            Three generations. One obsession.
          </p>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 lg:px-12 py-6 relative z-10">
        <img
          src={heroCoffeeImage}
          alt="Farfalle Coffee"
          className="object-contain w-full max-w-[520px]"
          style={{ maxHeight: '90vh' }}
        />
      </div>
    </section>
  );
};