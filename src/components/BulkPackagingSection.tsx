import React from "react";
import { motion } from "framer-motion";
import containersImg from "../assets/containers.png";
import bag20Img from "../assets/20kg bag.png";
import bag25Img from "../assets/25kg bag.png";
import bagProductImg from "../assets/bag-image.png";

const SPECS = [
  {
    title: "Spray Dried Instant Coffee",
    items: [
      { label: "20 FT Container", chips: ["320 Cartons", "16 tons"] },
      { label: "40 FT Container", chips: ["740 Cartons", "18.5 tons"] },
    ],
  },
  {
    title: "Agglomerated Instant Coffee",
    items: [
      { label: "20 FT Container", chips: ["320 Cartons", "16 tons"] },
    ],
  },
];

const STATS = [
  { num: "740", label: "Max Cartons" },
  { num: "18.5", unit: "t", label: "Max Load" },
  { num: "3", label: "Variants" },
];

const BoxIcon = () => (
  <svg viewBox="0 0 13 13" fill="none" className="w-[13px] h-[13px]">
    <rect x="1" y="3" width="11" height="8" rx="1.5" stroke="#8B4513" strokeWidth="1.1" />
    <path d="M4 3V2a1 1 0 011-1h3a1 1 0 011 1v1" stroke="#8B4513" strokeWidth="1.1" />
  </svg>
);

const LargeBoxIcon = () => (
  <svg viewBox="0 0 13 13" fill="none" className="w-[13px] h-[13px]">
    <rect x="0.5" y="3" width="12" height="8" rx="1.5" stroke="#8B4513" strokeWidth="1.1" />
    <rect x="2" y="1.5" width="9" height="1.5" rx="0.5" stroke="#8B4513" strokeWidth="0.9" />
  </svg>
);

export const BulkPackagingSection: React.FC = () => {
  return (
    <section
      id="bulk-packaging"
      className="relative w-full min-w-0 bg-[#1a1512] py-3 sm:py-4 md:py-5 overflow-hidden"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div className="w-full min-w-0 px-3 sm:px-4 md:px-5">
        <div className="bg-[#fbf5ee] rounded-xl md:rounded-2xl border border-[#2A1A12]/10 overflow-hidden">
          <div className="max-w-6xl mx-auto py-10 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8">

            {/* HEADER */}
            <div className="flex items-start justify-between flex-wrap gap-4 sm:gap-6 mb-8 sm:mb-10">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="block w-4 h-px bg-[#8B4513]" />
                  <span className="text-[10px] sm:text-xs font-medium tracking-[0.18em] uppercase text-[#8B4513]">
                    Farfalle Coffee
                  </span>
                </div>
                <h2
                  className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#2A1A12] leading-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Bulk Packaging{" "}
                  <em className="font-normal italic text-[#8B4513]">&amp; Load Ability</em>
                </h2>
              </div>
              <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#2A1A12] text-[#fbf5ee] rounded-full text-xs tracking-wide whitespace-nowrap self-start">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4A574] flex-shrink-0" />
                Instant &amp; Decaf Coffee
              </span>
            </div>

            {/* DIVIDER */}
            <div
              className="h-px mb-8 sm:mb-10"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(139,69,19,0.25), transparent)",
              }}
            />

            {/* MAIN GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12">

              {/* ── LEFT ── */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
                className="flex flex-col gap-6 sm:gap-8"
              >
                {SPECS.map((block, i) => (
                  <div key={i}>
                    <p className="text-sm font-medium text-[#2A1A12] mb-2">
                      {block.title}
                    </p>
                    <div className="flex flex-col gap-[6px]">
                      {block.items.map((item, j) => (
                        <div
                          key={j}
                          className="flex items-center gap-3 px-3 py-3 bg-white rounded-xl border border-[#2A1A12]/10 hover:border-[#8B4513]/30 transition-colors"
                        >
                          <div className="w-7 h-7 rounded-lg bg-[#2A1A12] flex items-center justify-center flex-shrink-0">
                            {i === 0 && j === 1 ? <LargeBoxIcon /> : <BoxIcon />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-[#5D3A1A] font-medium">{item.label}</p>
                            <div className="flex gap-1.5 mt-1 flex-wrap">
                              {item.chips.map((chip, k) => (
                                <span
                                  key={k}
                                  className="text-[10px] font-medium text-[#8B4513] bg-[#D4A574]/15 px-2 py-0.5 rounded-md"
                                >
                                  {chip}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Containers image — taller, image fills it fully */}
                <div className="pt-6 border-t border-[#2A1A12]/10">
                  <p className="text-[10px] font-medium tracking-[0.16em] uppercase text-[#8B4513]/70 mb-3">
                    Shipping Containers
                  </p>
                  <div className="h-[220px] sm:h-[240px] bg-[#f0e8dc] rounded-xl border border-[#2A1A12]/10 flex items-center justify-center overflow-hidden">
                    <img
                      src={containersImg}
                      alt="Shipping containers"
                      className="w-[90%] h-[90%] object-contain drop-shadow-lg"
                      style={{ filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.18))" }}
                    />
                  </div>
                </div>
              </motion.div>

              {/* ── RIGHT ── */}
              <motion.div
                className="flex flex-col gap-6 sm:gap-8"
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
              >
                {/* Packaging cards — taller with much bigger images */}
                <div>
                  <p className="text-[10px] font-medium tracking-[0.16em] uppercase text-[#8B4513]/70 mb-3">
                    Packaging Options
                  </p>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {[
                      { img: bag20Img, name: "20 kg", sub: "Kraft Bag", alt: "20kg bag" },
                      { img: bag25Img, name: "25 / 30 kg", sub: "Kraft Bag", alt: "25kg bag" },
                    ].map((pack, i) => (
                      <div
                        key={i}
                        className="relative bg-white rounded-xl border border-[#2A1A12]/10 px-3 pt-7 pb-6 text-center hover:border-[#8B4513]/30 hover:-translate-y-0.5 transition-all duration-200 overflow-hidden group cursor-default"
                      >
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#8B4513] to-[#D4A574] opacity-0 group-hover:opacity-100 transition-opacity" />
                        {/* Image area — generous height */}
                        <div className="h-[170px] sm:h-[180px] md:h-[200px] flex items-center justify-center mb-4">
                          <img
                            src={pack.img}
                            alt={pack.alt}
                            className="w-[90%] h-full object-contain group-hover:scale-105 transition-transform duration-300"
                            style={{ filter: "drop-shadow(0 6px 14px rgba(0,0,0,0.15))" }}
                          />
                        </div>
                        <p
                          className="text-base font-semibold text-[#2A1A12]"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          {pack.name}
                        </p>
                        <p className="text-[10px] text-[#8B4513] uppercase tracking-[0.08em] mt-1">
                          {pack.sub}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pallet cards — taller with bigger images */}
                <div>
                  <p className="text-[10px] font-medium tracking-[0.16em] uppercase text-[#8B4513]/70 mb-3">
                    Bulk Pallets
                  </p>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {[
                      { img: bagProductImg, name: "Standard Pallet" },
                      { img: bagProductImg, name: "Euro Pallet" },
                    ].map((pallet, i) => (
                      <div
                        key={i}
                        className="bg-white rounded-xl border border-[#2A1A12]/10 px-3 pt-5 pb-4 text-center hover:border-[#8B4513]/20 hover:-translate-y-0.5 transition-all duration-200 cursor-default"
                      >
                        {/* Image area — generous height */}
                        <div className="h-[120px] sm:h-[130px] flex items-center justify-center mb-3">
                          <img
                            src={pallet.img}
                            alt={pallet.name}
                            className="w-[85%] h-full object-contain"
                            style={{ filter: "drop-shadow(0 6px 14px rgba(0,0,0,0.13))" }}
                          />
                        </div>
                        <p className="text-xs text-[#5D3A1A] font-medium">{pallet.name}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stats strip */}
                <div
                  className="grid grid-cols-3 rounded-[12px] overflow-hidden"
                  style={{ gap: "1px", background: "rgba(43,26,18,0.12)" }}
                >
                  {STATS.map((s, i) => (
                    <div
                      key={i}
                      className="bg-white py-5 px-2 text-center hover:bg-[#fbf5ee] transition-colors"
                    >
                      <p
                        className="text-xl font-semibold text-[#2A1A12] leading-none"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {s.num}
                        {s.unit && (
                          <span className="text-sm text-[#8B4513]">{s.unit}</span>
                        )}
                      </p>
                      <p className="text-[10px] text-[#8B4513] tracking-[0.08em] uppercase mt-1.5 leading-tight">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};