import React, { useRef } from 'react';
import { useScroll } from 'framer-motion';
import { products } from '../constants';
import { ProductSlide } from './ProductSlide';

export const FullPageShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const showcaseProducts = products.slice(0, 3);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} className="relative w-full min-w-0 overflow-hidden" style={{ height: `${showcaseProducts.length * 100}vh` }}>
      <div className="sticky top-0 h-screen w-full min-w-0 max-w-[100vw] bg-[#1a1512] p-3 md:p-5 overflow-hidden">
        {showcaseProducts.map((product, index) => (
          <ProductSlide
            key={product.id}
            product={product}
            index={index}
            totalSlides={showcaseProducts.length}
            scrollProgress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
};
