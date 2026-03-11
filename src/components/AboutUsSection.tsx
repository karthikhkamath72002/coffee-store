import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const AboutUsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  const generations = [
    {
      number: "01",
      title: "The Foundation",
      era: "First Generation",
      description: "Family-owned coffee estates dedicated to cultivating specialized, premium coffee beans with care and integrity.",
      icon: (
        <svg viewBox="0 0 60 60" fill="none" className="w-full h-full">
          <circle cx="30" cy="30" r="28" stroke="currentColor" strokeWidth="1.5" />
          <path d="M30 15 L30 45 M20 25 L30 15 L40 25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="30" cy="42" r="3" fill="currentColor" />
        </svg>
      )
    },
    {
      number: "02",
      title: "The Cultivation",
      era: "Second Generation",
      description: "Estate-grown excellence supplied to markets worldwide, building reputation through uncompromising quality.",
      icon: (
        <svg viewBox="0 0 60 60" fill="none" className="w-full h-full">
          <circle cx="30" cy="30" r="28" stroke="currentColor" strokeWidth="1.5" />
          <path d="M30 18 C20 22, 18 35, 30 42 C42 35, 40 22, 30 18" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <path d="M30 18 L30 42" stroke="currentColor" strokeWidth="1.5" />
          <path d="M25 28 Q30 32 35 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    },
    {
      number: "03",
      title: "The Evolution",
      era: "Third Generation",
      description: "Transforming heritage into a contemporary coffee brand focused on premium distribution and café experiences.",
      icon: (
        <svg viewBox="0 0 60 60" fill="none" className="w-full h-full">
          <circle cx="30" cy="30" r="28" stroke="currentColor" strokeWidth="1.5" />
          <path d="M22 38 L30 20 L38 38" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M25 32 L35 32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="30" cy="42" r="2" fill="currentColor" />
        </svg>
      )
    }
  ];

  const values = [
    { title: "Authenticity", description: "Staying true to our roots and heritage" },
    { title: "Consistency", description: "Delivering excellence in every cup" },
    { title: "Quiet Luxury", description: "Crafted to be enjoyed across generations" }
  ];

  return (
    <section id="our-story" ref={sectionRef} className="relative w-full min-w-0 bg-[#1a1512] py-3 sm:py-4 md:py-5 overflow-hidden">
      <div className="w-full min-w-0 px-3 sm:px-4 md:px-5">
        <div className="bg-[#fbf5ee] rounded-xl md:rounded-2xl overflow-hidden w-full min-w-0">
          
          {/* Hero Section */}
          <div className="relative min-h-screen flex items-center overflow-hidden">
            <motion.div className="absolute inset-0 z-0" style={{ y: parallaxY }}>
              <motion.img
                src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1600&q=80"
                alt="Coffee Estate"
                className="w-full h-[120%] object-cover"
                style={{ scale: imageScale }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#fbf5ee] via-[#fbf5ee]/95 to-[#fbf5ee]/70" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#fbf5ee] via-transparent to-[#fbf5ee]/50" />
            </motion.div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-16 sm:py-20 md:py-24 lg:py-32">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 md:gap-16 lg:gap-24 items-center">
                <div className="text-center lg:text-left">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="flex items-center justify-center lg:justify-start gap-4 mb-8"
                  >
                    <div className="h-px w-12 bg-[#8B4513]" />
                    <span className="text-[#8B4513] text-xs md:text-sm tracking-[0.3em] uppercase font-medium">Our Story</span>
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-[#2A1A12] leading-[1.05] mb-4 sm:mb-6"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    A Legacy in<br /><span className="italic text-[#8B4513]">Every Sip</span>
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-sm sm:text-base md:text-lg lg:text-xl text-[#5D3A1A]/70 leading-relaxed mb-6 sm:mb-8 max-w-xl font-light mx-auto lg:mx-0"
                  >
                    Farfalle Coffee began as a legacy rooted in family-owned coffee estates, where generations dedicated themselves to cultivating specialized, premium coffee beans.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="flex flex-wrap justify-center lg:justify-start gap-8 sm:gap-12 md:gap-16"
                  >
                    {[
                      { value: "3", label: "Generations" },
                      { value: "50+", label: "Years of Legacy" },
                      { value: "∞", label: "Passion" }
                    ].map((stat, i) => (
                      <div key={i} className="text-center">
                        <div className="text-4xl md:text-5xl font-serif text-[#2A1A12] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                          {stat.value}
                        </div>
                        <div className="text-xs text-[#5D3A1A]/50 tracking-wider uppercase">{stat.label}</div>
                      </div>
                    ))}
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 1, delay: 0.4 }}
                  className="relative hidden md:block max-w-[85%] lg:max-w-md mx-auto"
                >
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&q=80"
                      alt="Coffee Heritage"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2A1A12]/40 to-transparent" />
                    
                    <motion.div
                      className="absolute -bottom-6 -left-6 bg-[#fbf5ee] rounded-xl p-6 shadow-2xl"
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <div className="text-xs text-[#8B4513] tracking-[0.2em] uppercase mb-1">Est.</div>
                      <div className="text-3xl font-serif text-[#2A1A12]" style={{ fontFamily: "'Playfair Display', serif" }}>2018</div>
                    </motion.div>
                  </div>

                  <div className="absolute -top-8 -right-8 w-32 h-32 border border-[#D4A574]/30 rounded-full" />
                  <div className="absolute -bottom-4 -right-4 w-20 h-20 border border-[#D4A574]/20 rounded-full" />
                </motion.div>
              </div>
            </div>

            <motion.div
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="flex flex-col items-center gap-2">
                <span className="text-[10px] text-[#5D3A1A]/40 tracking-widest uppercase">Scroll</span>
                <div className="w-px h-8 bg-gradient-to-b from-[#5D3A1A]/40 to-transparent" />
              </div>
            </motion.div>
          </div>

          {/* Generations Timeline */}
          <div className="relative py-16 sm:py-20 md:py-24 lg:py-32 xl:py-40 bg-[#fbf5ee]">
            <div className="absolute inset-0 opacity-[0.02]" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #2A1A12 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }} />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-28"
              >
                <span className="text-[#8B4513] text-[10px] sm:text-xs tracking-[0.3em] uppercase font-medium">Three Generations</span>
                <h3 className="mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-[#2A1A12]" style={{ fontFamily: "'Playfair Display', serif" }}>
                  The Journey of <span className="italic text-[#8B4513]">Excellence</span>
                </h3>
              </motion.div>

              <div className="relative">
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#D4A574]/30 to-transparent hidden lg:block" />

                {generations.map((gen, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, delay: index * 0.15 }}
                    className={`relative flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-16 mb-12 sm:mb-16 lg:mb-32 last:mb-0 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                  >
                    <div className={`flex-1 ${index % 2 === 1 ? 'lg:text-right' : ''}`}>
                      <motion.div
                        className="relative bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 lg:p-10 shadow-xl border border-[#E8DFD5]/50"
                        whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(42, 26, 18, 0.15)" }}
                        transition={{ duration: 0.3 }}
                      >
                        <div 
                          className={`absolute -top-4 sm:-top-6 ${index % 2 === 1 ? 'lg:right-8 left-6 sm:left-8 lg:left-auto' : 'left-6 sm:left-8'} text-6xl sm:text-7xl md:text-8xl font-serif text-[#D4A574]/10 leading-none select-none`}
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          {gen.number}
                        </div>

                        <div className={`relative flex items-start gap-4 sm:gap-6 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                          <div className="flex-shrink-0 w-11 h-11 sm:w-14 sm:h-14 text-[#8B4513]">{gen.icon}</div>
                          <div className={index % 2 === 1 ? 'lg:text-right' : ''}>
                            <span className="text-[10px] sm:text-xs text-[#8B4513] tracking-[0.2em] uppercase font-medium">{gen.era}</span>
                            <h4 className="mt-1.5 sm:mt-2 text-xl sm:text-2xl md:text-3xl font-serif text-[#2A1A12] mb-3 sm:mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                              {gen.title}
                            </h4>
                            <p className="text-[#5D3A1A]/70 leading-relaxed">{gen.description}</p>
                          </div>
                        </div>

                        <div className={`absolute bottom-0 ${index % 2 === 1 ? 'left-0 rounded-br-2xl rounded-tl-2xl' : 'right-0 rounded-bl-2xl rounded-tr-2xl'} w-16 h-16 bg-gradient-to-br from-[#D4A574]/10 to-transparent`} />
                      </motion.div>
                    </div>

                    <div className="relative z-10 hidden lg:flex items-center justify-center">
                      <motion.div
                        className="w-5 h-5 rounded-full bg-[#D4A574] shadow-lg"
                        whileInView={{ scale: [0, 1.2, 1] }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
                      />
                      <div className="absolute w-10 h-10 rounded-full border border-[#D4A574]/30 animate-ping" style={{ animationDuration: '3s' }} />
                    </div>

                    <div className="flex-1 hidden lg:block" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Quote Section */}
          <div className="relative py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] md:w-[800px] md:h-[800px] rounded-full border border-[#D4A574]/5" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] sm:w-[400px] sm:h-[400px] md:w-[600px] md:h-[600px] rounded-full border border-[#D4A574]/10" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] sm:w-[280px] sm:h-[280px] md:w-[400px] md:h-[400px] rounded-full border border-[#D4A574]/15" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative max-w-4xl mx-auto px-4 sm:px-6 md:px-12 text-center"
            >
              <div className="text-[6rem] sm:text-[10rem] md:text-[12rem] lg:text-[16rem] font-serif text-[#D4A574]/10 leading-none absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none" style={{ fontFamily: "'Playfair Display', serif" }}>
                "
              </div>
              
              <blockquote className="relative z-10">
                <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-serif text-[#2A1A12] leading-relaxed mb-6 sm:mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
                  What started as estate-grown excellence supplied to the market has now evolved into a 
                  <span className="italic text-[#8B4513]"> refined global vision</span>.
                </p>
                <footer className="flex items-center justify-center gap-4">
                  <div className="h-px w-12 bg-[#D4A574]" />
                  <span className="text-sm text-[#5D3A1A]/60 tracking-wider uppercase">Farfalle Coffee</span>
                  <div className="h-px w-12 bg-[#D4A574]" />
                </footer>
              </blockquote>
            </motion.div>
          </div>

      

          {/* Values Section */}
          <div className="relative py-16 sm:py-20 md:py-24 lg:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-10 sm:mb-14 md:mb-20"
              >
                <span className="text-[#8B4513] text-[10px] sm:text-xs tracking-[0.3em] uppercase font-medium">What We Stand For</span>
                <h3 className="mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-[#2A1A12]" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Our <span className="italic text-[#8B4513]">Values</span>
                </h3>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
                {values.map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="text-center group"
                  >
                    <motion.div
                      className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 sm:mb-8"
                      whileHover={{ scale: 1.05, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="absolute inset-0 rounded-full border-2 border-[#D4A574]/30 group-hover:border-[#D4A574] transition-colors" />
                      <div className="absolute inset-2 rounded-full border border-[#D4A574]/20" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-4xl font-serif text-[#8B4513]" style={{ fontFamily: "'Playfair Display', serif" }}>
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                    </motion.div>

                    <h4 className="text-xl sm:text-2xl font-serif text-[#2A1A12] mb-2 sm:mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {value.title}
                    </h4>
                    <p className="text-[#5D3A1A]/70 leading-relaxed">{value.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Closing Statement */}
          <div className="relative py-14 sm:py-20 md:py-24 lg:py-28 bg-gradient-to-b from-[#fbf5ee] to-[#fbf5ee]">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12 text-center"
            >
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#D4A574]" />
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-[#8B4513]">
                  <ellipse cx="20" cy="20" rx="18" ry="12" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M20 8 Q12 20 20 32" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#D4A574]" />
              </div>

              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-serif text-[#2A1A12] leading-relaxed" style={{ fontFamily: "'Playfair Display', serif" }}>
                Blending generational knowledge with modern craftsmanship, Farfalle Coffee represents 
                <span className="italic text-[#8B4513]"> authenticity, consistency, and quiet luxury</span>—crafted to be enjoyed across borders and generations.
              </p>

              <motion.div
                className="mt-12 inline-flex items-center gap-3 text-[#8B4513]"
                whileHover={{ gap: '16px' }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-sm tracking-[0.2em] uppercase font-medium">Discover Our Collection</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export { AboutUsSection };
