import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logoFarfalle from '../assets/logo-farfalle.png';

const NAV_LINKS: { label: string; href: string }[] = [
  { label: 'Home', href: '#' },
  { label: 'Products', href: '#/products' },
  { label: 'About Us', href: '#/about' },
  { label: 'Contact', href: '#contact' },
];

export const Navigation: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-40 w-full min-w-0 px-3 sm:px-4 md:px-8 lg:px-12 pt-7 sm:pt-8 md:pt-9"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div
        className={`max-w-[100vw] rounded-full sm:rounded-full px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 flex items-center justify-between transition-all duration-300 ${scrolled ? 'bg-white/70 backdrop-blur-xl shadow-lg border border-white/40' : 'bg-[#fbf5ee]/90 backdrop-blur-sm'}`}
      >
        <a href="#" className="flex items-center flex-shrink-0" onClick={() => setMenuOpen(false)}>
          <img
            src={logoFarfalle}
            alt="Farfalle Coffee"
            className="h-9 sm:h-10 md:h-12 lg:h-14 w-auto object-contain"
          />
        </a>

        <div className="hidden lg:flex items-center gap-6 xl:gap-8 flex-shrink-0">
          {NAV_LINKS.map((item) => (
            <a key={item.label} href={item.href} className="text-sm text-[#5D3A1A] hover:text-[#2A1A12] transition-colors font-medium whitespace-nowrap">{item.label}</a>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <motion.a
            href="#/products"
            className="px-3 sm:px-4 md:px-5 py-2 bg-[#2A1A12] text-[#FFF8E9] rounded-full text-xs md:text-sm font-medium flex-shrink-0 min-h-[40px] min-w-[44px] flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Shop Now
          </motion.a>

          <motion.button
            aria-label="Toggle menu"
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full text-[#2A1A12] hover:bg-[#2A1A12]/10 transition-colors flex-shrink-0"
            onClick={() => setMenuOpen((o) => !o)}
            whileTap={{ scale: 0.95 }}
          >
            {menuOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            )}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0 top-[76px] sm:top-[80px] z-30 bg-[#2A1A12]/20 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              className="fixed left-3 right-3 top-[72px] sm:top-[76px] z-40 lg:hidden bg-[#fbf5ee] rounded-2xl shadow-2xl border border-[#2A1A12]/10 overflow-hidden"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <div className="py-2">
                {NAV_LINKS.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="block px-5 py-3.5 text-[#2A1A12] font-medium hover:bg-[#2A1A12]/5 active:bg-[#2A1A12]/10 transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                <div className="border-t border-[#2A1A12]/10 my-2" />
                <div className="px-5 pb-4">
                  <motion.a
                    href="#/products"
                    className="block w-full py-3 text-center bg-[#2A1A12] text-[#FFF8E9] rounded-full text-sm font-medium"
                    onClick={() => setMenuOpen(false)}
                  >
                    Shop Now
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
