import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Product } from './types';
import {
  Navigation,
  Hero,
  AboutUsSection,
  CollectionGrid,
  Footer,
  LoadingScreen,
  ProductsPage,
  ProductDetailPage,
} from './components';

const PRODUCTS_HASH = '#/products';
const PRODUCT_HASH_PREFIX = '#/product/';

type Route = 'home' | 'products' | { page: 'product'; id: string };

const getRoute = (): Route => {
  const hash = window.location.hash;
  if (hash === PRODUCTS_HASH) return 'products';
  if (hash.startsWith(PRODUCT_HASH_PREFIX)) {
    const id = hash.slice(PRODUCT_HASH_PREFIX.length).split('/')[0] || '';
    if (id) return { page: 'product', id };
  }
  return 'home';
};

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [route, setRoute] = useState<Route>(getRoute);

  useEffect(() => {
    const scrollToOurStory = () => {
      document.getElementById('our-story')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    const onHashChange = () => {
      const newRoute = getRoute();
      setRoute(newRoute);
      if (window.location.hash === '#/about') {
        const delay = newRoute === 'home' ? 150 : 450;
        setTimeout(scrollToOurStory, delay);
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    if (isLoading) return;
    if (route === 'home' && window.location.hash === '#/about') {
      const t = setTimeout(() => {
        document.getElementById('our-story')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
      return () => clearTimeout(t);
    }
  }, [route, isLoading]);

  const handleProductClick = (product: Product) => {
    window.location.hash = `#/product/${product.id}`;
  };

  return (
    <div className="min-h-screen w-full min-w-0 bg-[#fbf5ee] overflow-x-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600;700&display=swap');

        html { scroll-behavior: smooth; }
        * { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #fbf5ee; }
        ::-webkit-scrollbar-thumb { background: #5D3A1A; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #8B4513; }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        #our-story { scroll-margin-top: 5.5rem; }
        html, body { overflow-x: hidden; width: 100%; max-width: 100vw; box-sizing: border-box; }
        *, *::before, *::after { box-sizing: border-box; }
      `}</style>

      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <motion.div className="w-full min-w-0 overflow-x-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          {route === 'products' ? (
            <ProductsPage onProductSelect={handleProductClick} />
          ) : route !== 'home' && typeof route === 'object' && route.page === 'product' ? (
            <ProductDetailPage productId={route.id} />
          ) : (
            <>
              <Navigation />
              <div style={{ height: '100vh' }} />
              <Hero />
              <AboutUsSection />
              <CollectionGrid onProductSelect={handleProductClick} limit={3} />
              <Footer />
            </>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default App;
