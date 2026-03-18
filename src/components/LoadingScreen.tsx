import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const MIN_DISPLAY_MS = 1200;

function preloadImages(urls: string[], onOneLoaded?: () => void): Promise<void> {
  if (urls.length === 0) return Promise.resolve();
  return Promise.all(
    urls.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => {
            onOneLoaded?.();
            resolve();
          };
          img.onerror = () => {
            onOneLoaded?.();
            resolve();
          };
          img.src = src;
        })
    )
  ).then(() => {});
}

export interface LoadingScreenProps {
  onComplete: () => void;
  /** Image URLs to preload in the background while the splash is shown. Progress bar reflects load progress. */
  assetsToPreload?: string[];
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete, assetsToPreload = [] }) => {
  const [progress, setProgress] = useState(0);
  const [loadedCount, setLoadedCount] = useState(0);
  const totalCount = assetsToPreload.length || 1;
  const allLoadedRef = useRef(false);
  const completedRef = useRef(false);

  useEffect(() => {
    if (assetsToPreload.length === 0) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(onComplete, 300);
            return 100;
          }
          return prev + 2;
        });
      }, 30);
      return () => clearInterval(interval);
    }

    const start = Date.now();
    let cancelled = false;

    preloadImages(assetsToPreload, () => {
      if (cancelled) return;
      setLoadedCount((n) => Math.min(n + 1, totalCount));
    }).then(() => {
      if (cancelled) return;
      allLoadedRef.current = true;
      setLoadedCount(totalCount);
    });

    const interval = setInterval(() => {
      if (cancelled || completedRef.current) return;
      const elapsed = Date.now() - start;
      if (elapsed >= MIN_DISPLAY_MS && allLoadedRef.current) {
        completedRef.current = true;
        clearInterval(interval);
        setProgress(100);
        setTimeout(onComplete, 300);
      }
    }, 80);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [assetsToPreload, onComplete, totalCount]);

  useEffect(() => {
    if (assetsToPreload.length === 0) return;
    const pct = totalCount ? Math.round((loadedCount / totalCount) * 100) : 0;
    setProgress((prev) => Math.max(prev, Math.min(pct, 98)));
  }, [loadedCount, totalCount, assetsToPreload.length]);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-[#2A1A12] flex flex-col items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="relative w-20 h-20 sm:w-24 sm:h-24 mb-6 sm:mb-8"
        animate={{ rotate: [0, 3, -3, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          <motion.path
            d="M20 30 C18 45, 22 75, 30 85 C38 92, 62 92, 70 85 C78 75, 82 45, 80 30"
            stroke="#D4A574"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
          <motion.ellipse
            cx="50"
            cy="30"
            rx="30"
            ry="8"
            stroke="#D4A574"
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <motion.path
            d="M80 40 C95 42, 95 65, 80 67"
            stroke="#D4A574"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          />
          {[0, 1, 2].map((i) => (
            <motion.path
              key={i}
              d={`M${38 + i * 12} 22 C${42 + i * 12} 12, ${34 + i * 12} 8, ${38 + i * 12} -2`}
              stroke="#FDFBF7"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: [0, 0.6, 0], y: [5, -8, -20] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1.2 + i * 0.3, ease: "easeOut" }}
            />
          ))}
        </svg>
      </motion.div>

      <motion.h1
        className="text-2xl sm:text-3xl md:text-4xl text-[#FDFBF7] mb-4 sm:mb-6 leading-[0.95]"
        style={{ fontFamily: "'Playfair Display', serif" }}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <span style={{ fontFamily: "'Playfair Display', serif" }}>Farfalle</span>{' '}
        <span className="italic text-[#D4A574]" style={{ fontFamily: "'Playfair Display', serif" }}>Coffee</span>
      </motion.h1>

      <div className="w-40 h-1 bg-[#FDFBF7]/15 rounded-full overflow-hidden">
        <motion.div className="h-full bg-[#D4A574] rounded-full" style={{ width: `${progress}%` }} transition={{ duration: 0.1 }} />
      </div>

      <motion.p
        className="mt-3 text-[#FDFBF7]/40 text-xs tracking-wider"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Brewing your experience...
      </motion.p>
    </motion.div>
  );
};
