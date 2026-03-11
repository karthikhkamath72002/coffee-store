import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { HOME_BG } from "../constants";
import heroCoffeeImage from "../assets/coffe-hero-image.png";

const SCROLL_SPEED_DESKTOP = 0.0006;
const SCROLL_SPEED_MOBILE = 0.0012;
const MAX_PROGRESS = 1.4;

const ROLL_INTERVAL_MS = 3500;

export const Hero: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [showMind, setShowMind] = useState(false);
  const progressRef = useRef(0);
  const imageRef = useRef<HTMLImageElement>(null);
  const outlineRef = useRef<HTMLHeadingElement>(null);
  const rafRef = useRef<number | null>(null);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const isTablet = typeof window !== "undefined" && window.innerWidth >= 768 && window.innerWidth < 1024;
  const heroVisible = progress < MAX_PROGRESS;
  const text1Opacity = 1 - Math.min(progress * 2, 1);
  const text2Opacity = Math.max((progress - 0.45) * 2, 0);
  const imageScale = 1 + progress * 0.05;

  // Recompute clip-path on every frame so it tracks the image perfectly
  const syncClipPath = useCallback(() => {
    if (!imageRef.current || !outlineRef.current) return;

    const imgRect = imageRef.current.getBoundingClientRect();
    const txtRect = outlineRef.current.getBoundingClientRect();

    // Pixels from each edge of the outline container to the image boundary
    const top    = Math.max(0, imgRect.top    - txtRect.top);
    const right  = Math.max(0, txtRect.right  - imgRect.right);
    const bottom = Math.max(0, txtRect.bottom - imgRect.bottom);
    const left   = Math.max(0, imgRect.left   - txtRect.left);

    outlineRef.current.style.clipPath =
      `inset(${top}px ${right}px ${bottom}px ${left}px)`;
  }, []);

  // Run sync every rAF while hero is visible
  useEffect(() => {
    const loop = () => {
      syncClipPath();
      rafRef.current = requestAnimationFrame(loop);
    };
    if (heroVisible) {
      rafRef.current = requestAnimationFrame(loop);
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [heroVisible, syncClipPath]);

  const updateProgress = useCallback((delta: number) => {
    const speed = isMobile ? SCROLL_SPEED_MOBILE : SCROLL_SPEED_DESKTOP;
    let next = progressRef.current + delta * speed;
    next = Math.max(0, Math.min(MAX_PROGRESS, next));
    progressRef.current = next;
    setProgress(next);

    if (next >= MAX_PROGRESS) {
      setTimeout(() => {
        window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
      }, 520);
    }
  }, [isMobile]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const atTop = window.scrollY <= 2;
      if (progressRef.current >= MAX_PROGRESS && e.deltaY > 0) return;
      if (progressRef.current <= 0 && e.deltaY < 0) return;
      if (progressRef.current < MAX_PROGRESS || atTop) {
        e.preventDefault();
        updateProgress(e.deltaY);
      }
    };

    let touchStart = 0;
    const handleTouchStart = (e: TouchEvent) => { touchStart = e.touches[0].clientY; };
    const handleTouchMove = (e: TouchEvent) => {
      const current = e.touches[0].clientY;
      const delta = touchStart - current;
      touchStart = current;
      const atTop = window.scrollY <= 2;
      if (progressRef.current >= MAX_PROGRESS && delta > 0) return;
      if (progressRef.current <= 0 && delta < 0) return;
      if (progressRef.current < MAX_PROGRESS || atTop) {
        e.preventDefault();
        updateProgress(delta * 2);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [updateProgress]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY <= 5 && progressRef.current === MAX_PROGRESS) {
        progressRef.current = MAX_PROGRESS - 0.01;
        setProgress(MAX_PROGRESS - 0.01);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (progress < MAX_PROGRESS) window.scrollTo({ top: 0 });
  }, [progress]);

  // Roll "Mind." / "Day." at interval
  useEffect(() => {
    const t = setInterval(() => setShowMind((prev) => !prev), ROLL_INTERVAL_MS);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      className="fixed inset-0 z-30 flex flex-col lg:flex-row"
      style={{
        backgroundColor: HOME_BG,
        opacity: heroVisible ? 1 : 0,
        pointerEvents: heroVisible ? "auto" : "none",
        transition: "opacity 0.5s ease",
      }}
    >
      {/* ── LEFT TEXT ── (mobile: center; desktop: left) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-start px-4 sm:px-6 md:px-8 lg:pl-28 xl:pl-44 relative z-30 pt-20 sm:pt-24 lg:pt-0">

        {/* Text 1 — "Ignite Your Mind / Day" (brought down a bit on mobile) */}
        <div
          style={{ opacity: text1Opacity, transition: "opacity 0.4s ease" }}
          className="max-w-xl w-full text-center lg:text-left mx-auto lg:mx-0"
        >
          <span className="block text-[#8B4513] text-[12px] sm:text-[13px] tracking-[0.38em] uppercase mb-4 sm:mb-6">
            FARFALLE COFFEE
          </span>
          <h2
            className="text-[58px] min-[380px]:text-[68px] sm:text-[76px] md:text-[92px] lg:text-[120px] xl:text-[152px] leading-[0.95] text-[#2A1A12]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            <span className="block">Ignite</span>
            <span className="italic text-[#8B4513] block">Your</span>
            <span className="block overflow-hidden leading-[0.95] relative" style={{ height: "1.05em" }}>
              <motion.span
                className="absolute inset-x-0 top-0 block"
                animate={{ y: showMind ? "-100%" : 0 }}
                transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
              >
                Mind.
              </motion.span>
              <motion.span
                className="absolute inset-x-0 top-0 block"
                animate={{ y: showMind ? 0 : "100%" }}
                transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
              >
                Day.
              </motion.span>
            </span>
          </h2>
        </div>

        {/* Text 2 — "Uncompromising Purity" with intersection outline — centered on mobile only; lowered on mobile so "Since 2018" isn't cut */}
        <div
          style={{
            opacity: text2Opacity,
            position: "absolute",
            zIndex: 50,
            width: isMobile ? "100%" : "100vw",
            left: isMobile ? "50%" : "-10%",
            top: isMobile ? "56%" : "50%",
            transform: isMobile ? "translate(-50%, -50%)" : "translateY(-50%)",
            transition: "opacity 0.4s ease",
            paddingLeft: isMobile ? 0 : "calc(10% + 11rem)",
            paddingRight: isMobile ? 0 : undefined,
          }}
          className={`pointer-events-none px-4 lg:px-0 ${isMobile ? "text-center max-w-xl mx-auto" : ""}`}
        >
          <span className="block text-[#8B4513] text-[12px] sm:text-[13px] tracking-[0.38em] uppercase mb-4 sm:mb-6">
            Since 2018
          </span>

          {/* Stack: base solid text + clipped outline layer */}
          <div className="relative">

            {/* Layer 1 — solid dark: Uncompromising smaller, Purity. bigger */}
            <h2
              className="text-[48px] min-[380px]:text-[56px] sm:text-[64px] md:text-[80px] lg:text-[110px] xl:text-[140px] leading-[0.95] text-[#2A1A12]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              <span className="block text-[0.78em] leading-[0.95]">Uncompromising</span>
              <span className="italic block text-[1.42em] leading-[0.95]">Purity.</span>
            </h2>

            {/* Layer 2 — outline text, clipped to ONLY the image bounding box via rAF */}
            {!isMobile && (
              <h2
                ref={outlineRef}
                className="absolute top-0 left-0 text-[120px] xl:text-[140px] leading-[0.95] pointer-events-none select-none"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: HOME_BG,
                  WebkitTextStroke: "1.5px #1a0f0a",
                  clipPath: "inset(0 100% 0 0)",
                }}
              >
                <span className="block text-[0.78em] leading-[0.95]">Uncompromising</span>
                <span className="italic block text-[1.42em] leading-[0.95]">Purity.</span>
              </h2>
            )}
          </div>

          <p className="mt-8 sm:mt-10 text-[#5D3A1A] text-base sm:text-lg md:text-xl tracking-wider">
            Three generations. One obsession.
          </p>
        </div>

        {/* Scroll hint — desktop only (left column); on mobile it appears below the image */}
        <div className="hidden lg:flex absolute bottom-4 sm:bottom-6 md:bottom-10 left-28 xl:left-44 opacity-60">
          <p className="text-[#5D3A1A]/50 text-sm tracking-wider flex items-center gap-2">
            <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
              ↓
            </motion.span>
            Scroll to explore
          </p>
        </div>
      </div>

      {/* ── RIGHT IMAGE ── (smaller, more padding so it never gets cut or hugs the edge) */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center pl-3 pr-6 sm:pl-6 sm:pr-8 md:pl-8 md:pr-10 lg:pl-10 lg:pr-16 xl:pr-20 pt-8 lg:pt-14 pb-6 sm:pb-8 lg:pb-0 relative z-10">
        <img
          ref={imageRef}
          src={heroCoffeeImage}
          alt="Farfalle Coffee — Vlinder blend"
          className="object-contain w-full max-w-[300px] min-[380px]:max-w-[350px] sm:max-w-[400px] md:max-w-[460px] lg:max-w-[96%]"
          style={{
            maxHeight: isMobile ? "min(78vh, 480px)" : isTablet ? "min(74vh, 460px)" : "min(82vh, 640px)",
            transform: `scale(${imageScale * (isMobile ? 1.06 : isTablet ? 1.1 : 1.22)})`,
            transition: "transform 0.45s ease-out",
          }}
        />
        {/* Scroll hint — mobile/tablet only: below the image */}
        <div className="lg:hidden flex flex-col items-center justify-center pt-4 pb-2 opacity-60">
          <p className="text-[#5D3A1A]/50 text-xs sm:text-sm tracking-wider flex items-center gap-2">
            <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
              ↓
            </motion.span>
            Scroll to explore
          </p>
        </div>
      </div>
    </div>
  );
};