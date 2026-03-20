import React from 'react';
import { motion } from 'framer-motion';
import { HOME_BG } from '../constants';
import heroCoffeeImage from '../assets/coffe-hero-image.png';

export const Hero: React.FC = () => {
  return (
    <section
      className="
        relative w-full min-h-screen
        border-x-[1.2rem] border-t-[1.2rem] border-b-[1.2rem]
        border-black
        rounded-[40px]
        overflow-hidden
        flex flex-col lg:block
        pt-32 lg:pt-0
      "
      style={{ backgroundColor: HOME_BG }}
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[#F5EFE9] -z-10" />

      {/* DOTS */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(139,69,19,0.35) 1px, transparent 1.5px)',
          backgroundSize: '24px 24px',
          opacity: 0.5,
        }}
        animate={{ x: 0, y: 0 }}
        transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
      />

      {/* ================= MOBILE / TABLET ================= */}
      <div className="lg:hidden z-20 px-5 flex flex-col items-center text-center">
        <span className="block text-[#8B4513] text-[11px] tracking-[0.4em] uppercase mb-4">
          FARFALLE COFFEE
        </span>

        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(56px, 14vw, 96px)',
            lineHeight: '1.05',
            color: '#2A1A12',
          }}
        >
          <span className="block">Ignite</span>
          <span className="italic text-[#8B4513] block">Your</span>
          <span className="block">Mind.</span>
        </h2>

        <p className="mt-4 text-[#5D3A1A] text-base">
          Three generations. One obsession.
        </p>

        <img
          src={heroCoffeeImage}
          alt="Farfalle Coffee"
          className="mt-6 w-full max-w-[420px] mx-auto object-contain"
        />
      </div>

      {/* ================= DESKTOP ================= */}
      <div className="hidden lg:flex items-center w-full h-screen">
        <div className="relative w-[1500px] h-[600px] mx-auto">

          {/* TEXT */}
          <div className="absolute left-[100px] top-0 w-[580px] flex flex-col justify-center h-full">
            <p className="text-[12px] tracking-[0.42em] text-[#8B4513] mb-6">
              FARFALLE COFFEE
            </p>

            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '132px',
                lineHeight: '0.92',
                letterSpacing: '-1px',
                color: '#2A1A12',
              }}
            >
              <span className="block">Ignite</span>
              <span className="block italic text-[#8B4513]">Your</span>
              <span className="block">Mind.</span>
            </h1>

            <p className="mt-[30px] text-[#5D3A1A] text-[19px]">
              Three generations. One obsession.
            </p>
          </div>

          {/* IMAGE */}
          <img
            src={heroCoffeeImage}
            alt="Farfalle Coffee"
            className="
              absolute
              right-[10px]
              top-0
              bottom-0
              w-[1120px]
              left-[350px]
              object-contain
            "
          />
        </div>
      </div>
    </section>
  );
};