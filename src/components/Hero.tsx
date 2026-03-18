import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HOME_BG } from '../constants';
import heroCoffeeImage from '../assets/coffe-hero-image.png';

const ROLL_INTERVAL_MS = 3500;

export const Hero: React.FC = () => {
  const [showMind, setShowMind] = useState(false);

  // Roll "Mind." / "Day." at a fixed interval.
  useEffect(() => {
    const t = window.setInterval(() => setShowMind((prev) => !prev), ROLL_INTERVAL_MS);
    return () => window.clearInterval(t);
  }, []);

  return (
    <section
      className="relative w-full min-h-screen flex flex-col lg:flex-row"
      style={{ backgroundColor: HOME_BG }}
      aria-label="Farfalle Coffee hero"
    >
      {/* Subtle normal animated dots (Home only), not tied to cursor position */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(139,69,19,0.38) 1.1px, transparent 1.4px)',
          backgroundSize: '24px 24px',
          opacity: 0.55,
          filter: 'none',
        }}
        initial={{ x: 0, y: 0 }}
        animate={{ x: [0, 14, 0], y: [0, -10, 0] }}
        transition={{ duration: 140, repeat: Infinity, ease: 'linear' }}
      />

      {/* LEFT TEXT */}
      <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-start px-4 sm:px-6 md:px-8 lg:pl-28 xl:pl-44 pt-20 sm:pt-24 lg:pt-0 relative z-10">
        <div className="max-w-xl w-full text-center lg:text-left mx-auto lg:mx-0">
          <span className="block text-[#8B4513] text-[12px] sm:text-[13px] tracking-[0.38em] uppercase mb-4 sm:mb-6">
            FARFALLE COFFEE
          </span>

          <h2
            className="text-[58px] min-[380px]:text-[68px] sm:text-[76px] md:text-[92px] lg:text-[120px] xl:text-[152px] leading-[0.95] text-[#2A1A12]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            <span className="block">Ignite</span>
            <span className="italic text-[#8B4513] block">Your</span>
            <span className="block overflow-hidden leading-[0.95] relative" style={{ height: '1.05em' }}>
              <motion.span
                className="absolute inset-x-0 top-0 block"
                style={{ color: '#2A1A12' }}
                animate={{ y: showMind ? '-100%' : 0 }}
                transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
              >
                Mind.
              </motion.span>
              <motion.span
                className="absolute inset-x-0 top-0 block"
                style={{ color: '#2A1A12' }}
                animate={{ y: showMind ? 0 : '100%' }}
                transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
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
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center pl-3 pr-6 sm:pl-6 sm:pr-8 md:pl-8 md:pr-10 lg:pl-10 lg:pr-16 xl:pr-20 pt-8 lg:pt-14 pb-6 sm:pb-8 lg:pb-0 relative z-10">
        <img
          src={heroCoffeeImage}
          alt="Farfalle Coffee"
          fetchPriority="high"
          loading="eager"
          decoding="async"
          className="object-contain w-full max-w-[330px] min-[380px]:max-w-[390px] sm:max-w-[440px] md:max-w-[520px] lg:max-w-[96%]"
          style={{
            maxHeight: 'min(92vh, 760px)',
          }}
        />
      </div>
    </section>
  );
};