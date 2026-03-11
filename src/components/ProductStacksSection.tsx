import React from "react";
import vlinderImage from "../assets/vlinder.jpeg";

const GRIND_OPTIONS = [
  "TURKISH",
  "ESPRESSO",
  "FINE",
  "AUTO DRIP",
  "DRIP",
  "FRENCH PRESS",
  "PERCOLATOR",
  "COARSE",
];

const FOOTER_TEXT =
  "FARFALLA OFFERS EXCLUSIVE CUSTOMISED BLENDS FOR CAFES AND HOTELS";

const STACKS = [
  {
    id: "vlinder",
    name: "VLINDER",
    badgeSubtext: "100% ARABICA WITH PEPPERY",
    description:
      "HANDPICKED FROM THE HILLS OF CHIKMAGALUR, VLINDER COFFEE IS FARFALLE'S PREMIUM 100% ARABICA BLEND WITH PEPPERY BEANS.",
    flavor:
      "THIS SPECIALTY PEPPERY ARABICA PROMISES A RICH, SMOOTH COFFEE WITH BERRY AND CHOCOLATE NOTES.",
    size: "1KG",
    roast: ["MEDIUM", "DARK"],
    process: "WASHED",
    roastPreference: ["LIGHT", "MEDIUM", "DARK"],
    defaultRoast: "MEDIUM",
    image: vlinderImage,
  },
  {
    id: "fluture",
    name: "FLUTURE",
    badgeSubtext: "50% ARABICA 50% ROBUSTA",
    description:
      "CAREFULLY SOURCED FOR THE DISCERNING PALATE, FLUTURE, FARFALLE COFFEE'S MASTERFUL BLEND OF 50% ARABICA AND 50% ROBUSTA BEANS, PROMISING A RICH, STRONG COFFEE WITH NOTES OF NUTS & DARK CHOCOLATE.",
    flavor: "",
    size: "1KG",
    roast: ["MEDIUM", "DARK"],
    process: "WASHED",
    roastPreference: ["LIGHT", "MEDIUM", "DARK"],
    defaultRoast: "MEDIUM",
    image: vlinderImage,
  },
  {
    id: "borboleta",
    name: "BORBOLETA",
    badgeSubtext: "100% ROBUSTA",
    description:
      "CAREFULLY SELECTED FROM THE HILLS OF CHIKMAGALUR, BORBOLETA COFFEE IS FARFALLE'S PREMIUM 100% ROBUSTA COFFEE, OFFERING A BOLD, INTENSE, FULL-BODIED COFFEE WITH RICH AND CHOCOLATEY NOTES.",
    flavor: "",
    size: "1KG",
    roast: ["MEDIUM", "DARK"],
    process: "WASHED",
    roastPreference: ["LIGHT", "MEDIUM", "DARK"],
    defaultRoast: "DARK",
    image: vlinderImage,
  },
];

function ProductBlock({ stack }: { stack: (typeof STACKS)[0] }) {
  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row bg-[#fbf5ee]">
      {/* Left: copy + specs + options */}
      <div className="flex-1 px-6 md:px-10 lg:px-14 py-10 md:py-14 lg:py-20 flex flex-col justify-center">
        <div className="max-w-xl">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <span
                className="text-[#2A1A12] font-serif text-lg"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Farfalle COFFEE
              </span>
            </div>
            <div className="px-4 py-2 rounded-lg border-2 border-[#8B4513] bg-[#2A1A12]/5 text-center">
              <div className="text-[10px] text-[#8B4513] tracking-widest uppercase">
                PREMIUM QUALITY
              </div>
              <div
                className="text-xl md:text-2xl font-serif text-[#2A1A12]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {stack.name}
              </div>
              <div className="text-[10px] text-[#5D3A1A] tracking-wide mt-0.5">
                {stack.badgeSubtext}
              </div>
            </div>
          </div>

          <p className="text-[#2A1A12] text-sm md:text-base leading-relaxed mb-4 uppercase tracking-wide">
            {stack.description}
          </p>
          {stack.flavor && (
            <p className="text-[#5D3A1A] text-sm leading-relaxed mb-6">
              {stack.flavor}
            </p>
          )}

          <div className="space-y-2 text-sm text-[#2A1A12] mb-6">
            <p>
              <span className="font-semibold">SIZE:</span> {stack.size}
            </p>
            <p className="flex items-center gap-2">
              <span className="font-semibold">ROAST:</span>
              {stack.roast.map((r) => (
                <span key={r} className="px-2 py-0.5 rounded bg-[#E8DFD5]">
                  {r}
                </span>
              ))}
            </p>
            <p>
              <span className="font-semibold">PROCESS:</span> {stack.process}
            </p>
          </div>

          <div className="border-t border-[#E8DFD5] pt-6">
            <h4 className="text-[#2A1A12] font-semibold text-sm uppercase tracking-wider mb-3">
              CUSTOM ROAST AND GRINDING
            </h4>
            <p className="text-[#5D3A1A] text-xs leading-relaxed mb-4">
              • WE JUST LOVE TO PAMPER OUR CUSTOMERS.
              <br />
              • WE HAVE CUSTOMIZED ROASTING FOR OUR ESTEEMED CUSTOMERS. JUST
              LET KNOW WHAT TYPE OF ROAST YOU PREFER:
            </p>
            <div className="flex flex-wrap gap-3 mb-2">
              {stack.roastPreference.map((r) => (
                <span
                  key={r}
                  className={`text-xs px-3 py-1.5 rounded border ${
                    r === stack.defaultRoast
                      ? "border-[#8B4513] bg-[#8B4513]/10 text-[#2A1A12]"
                      : "border-[#E8DFD5] text-[#5D3A1A]"
                  }`}
                >
                  {r}
                </span>
              ))}
            </div>
            <p className="text-[#5D3A1A] text-xs mt-4 mb-2">
              WE CAN ALSO GRIND IT ACCORDING TO YOUR REQUIREMENT WE DO:
            </p>
            <div className="flex flex-wrap gap-2">
              {GRIND_OPTIONS.map((g) => (
                <span
                  key={g}
                  className="text-[10px] px-2 py-1 rounded bg-[#E8DFD5]/60 text-[#2A1A12]"
                >
                  {g}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right: product image */}
      <div className="w-full lg:w-[45%] flex-shrink-0 flex items-center justify-center p-6 lg:p-10 bg-[#fbf5ee]">
        <div className="relative w-full max-w-md aspect-[3/4] rounded-xl overflow-hidden shadow-xl">
          <img
            src={stack.image}
            alt={stack.name}
            className="w-full h-full object-contain object-center"
          />
        </div>
      </div>
    </div>
  );
}

export const ProductStacksSection: React.FC = () => {
  return (
    <section className="relative w-full min-w-0 overflow-hidden bg-[#1a1512]">
      {STACKS.map((stack) => (
        <ProductBlock key={stack.id} stack={stack} />
      ))}
      <div className="py-6 px-6 bg-[#fbf5ee] border-t border-[#E8DFD5]">
        <p className="text-center text-[#5D3A1A] text-xs md:text-sm tracking-widest uppercase">
          {FOOTER_TEXT}
        </p>
      </div>
    </section>
  );
};
