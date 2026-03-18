import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Product } from './types';
import {
  Navigation,
  Hero,
  AboutUsSection,
  CollectionGrid,
  BulkPackagingSection,
  ContactSection,
  Footer,
  LoadingScreen,
  ProductsPage,
  ProductDetailPage,
} from './components';
import heroCoffeeImage from './assets/coffe-hero-image.png';
import logoFarfalle from './assets/logo-farfalle.png';
import { getProducts, refreshProductsFromGithub } from './lib/productStore';

const getPreloadImages = (products: Product[]) => [
  heroCoffeeImage,
  logoFarfalle,
  ...products.flatMap((p) => [p.image, p.lifestyleImage1, p.lifestyleImage2].filter(Boolean) as string[]),
];

const PRODUCTS_HASH = '#/products';
const PRODUCT_HASH_PREFIX = '#/product/';

type Route = 'home' | 'products' | { page: 'product'; id: string };

const getRoute = (): Route => {
  const hash = window.location.hash;
  const pathname = window.location.pathname.replace(/\/$/, '') || '/';
  if (hash === PRODUCTS_HASH || pathname === '/products') return 'products';
  if (hash.startsWith(PRODUCT_HASH_PREFIX)) {
    const id = hash.slice(PRODUCT_HASH_PREFIX.length).split('/')[0] || '';
    if (id) return { page: 'product', id };
  }
  return 'home';
};

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [route, setRoute] = useState<Route>(getRoute);
  const [preloadProducts, setPreloadProducts] = useState<Product[]>(getProducts());


  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const scrollMargin = 88;
    const top = el.getBoundingClientRect().top + window.scrollY - scrollMargin;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  useEffect(() => {
    const syncRoute = () => {
      const newRoute = getRoute();
      setRoute(newRoute);
      const hash = window.location.hash;
      if (hash === PRODUCTS_HASH) {
        const delay = newRoute === 'products' ? 0 : 300;
        setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), delay);
      } else if (hash === '#/about') {
        const delay = newRoute === 'home' ? 200 : 500;
        setTimeout(() => scrollToId('our-story'), delay);
      } else if (hash === '#contact') {
        const delay = newRoute === 'home' ? 200 : 500;
        setTimeout(() => scrollToId('contact'), delay);
      }
    };
    syncRoute();
    window.addEventListener('hashchange', syncRoute);
    window.addEventListener('popstate', syncRoute);
    return () => {
      window.removeEventListener('hashchange', syncRoute);
      window.removeEventListener('popstate', syncRoute);
    };
  }, []);

  useEffect(() => {
    // Load latest products from GitHub config so all visitors see updates.
    refreshProductsFromGithub()
      .then(() => setPreloadProducts(getProducts()))
      .catch(() => {
        // If GitHub fetch fails, fall back to cached/default products.
      });
  }, []);

  useEffect(() => {
    if (isLoading) return;
    const hash = window.location.hash;
    if (route === 'products' && hash === PRODUCTS_HASH) {
      const t = setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 200);
      return () => clearTimeout(t);
    }
    if (route === 'home' && hash === '#/about') {
      const t = setTimeout(() => scrollToId('our-story'), 250);
      return () => clearTimeout(t);
    }
    if (route === 'home' && hash === '#contact') {
      const t = setTimeout(() => scrollToId('contact'), 250);
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
        #our-story, #contact, #collection { scroll-margin-top: 5.5rem; }
        html, body { overflow-x: hidden; width: 100%; max-width: 100vw; box-sizing: border-box; }
        *, *::before, *::after { box-sizing: border-box; }
      `}</style>

      <AnimatePresence>
        {isLoading && (
          <LoadingScreen
            assetsToPreload={getPreloadImages(preloadProducts)}
            onComplete={() => setIsLoading(false)}
          />
        )}
      </AnimatePresence>

      {!isLoading && (
        <>
          <Navigation />
          <motion.div className="w-full min-w-0 overflow-x-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            {route === 'products' ? (
              <ProductsPage onProductSelect={handleProductClick} />
            ) : route !== 'home' && typeof route === 'object' && route.page === 'product' ? (
              <ProductDetailPage productId={route.id} />
            ) : (
              <>
                <div className="w-full min-w-0 bg-[#1a1512] pb-3 sm:pb-4 md:pb-5">
                  <Hero />
                </div>
                <AboutUsSection />
                <CollectionGrid onProductSelect={handleProductClick} limit={3} />
                <BulkPackagingSection />
                <ContactSection />
                <Footer />
              </>
            )}
          </motion.div>
        </>
      )}
    </div>
  );
};

export default App;
