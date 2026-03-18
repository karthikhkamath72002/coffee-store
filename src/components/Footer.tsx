import React from 'react';
import { motion } from 'framer-motion';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1a1512] py-3 sm:py-4 md:py-5">
      <div className="w-full min-w-0 px-3 sm:px-4 md:px-5">
        <div className="bg-[#fbf5ee] rounded-xl md:rounded-2xl py-8 sm:py-10 md:py-14 lg:py-16 px-4 sm:px-5 md:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6 mb-8 sm:mb-10 md:mb-12">
              <div className="text-center sm:text-left">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-serif text-[#2A1A12] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Farfalle <span className="italic text-[#8B4513]">Coffee</span>
                </h2>
                <p className="text-[#5D3A1A]/45 text-xs md:text-sm">Crafted with passion since 2018</p>
              </div>

              <div className="flex items-center gap-2 sm:gap-2.5">
                {[{ letter: 'I', name: 'Instagram' }, { letter: 'T', name: 'Twitter' }, { letter: 'F', name: 'Facebook' }].map((social, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    className="w-10 h-10 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-[#2A1A12]/5 text-[#5D3A1A] text-xs font-medium hover:bg-[#2A1A12] hover:text-[#FFF8E9] transition-colors touch-manipulation"
                    whileHover={{ scale: 1.08 }}
                    title={social.name}
                  >
                    {social.letter}
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="h-px bg-[#2A1A12]/10 mb-6 md:mb-8" />

            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-3 text-[10px] sm:text-xs text-[#5D3A1A]/45 text-center sm:text-left">
              <p>© {new Date().getFullYear()} Farfalle Coffee. All rights reserved.</p>
              <div className="flex flex-wrap justify-center gap-4 sm:gap-5">
                <a href="#" className="hover:text-[#2A1A12] transition-colors">Privacy</a>
                <a href="#" className="hover:text-[#2A1A12] transition-colors">Terms</a>
                <a href="#" className="hover:text-[#2A1A12] transition-colors">Contact</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
