'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

interface FlashItem {
  id: string;
  title: string;
  status: 'available' | 'reserved';
  size: string;
  price: number;
  placements: string[];
  imageAlt: string;
  imageUrl: string;
  description: string;
}

const flashDesigns: FlashItem[] = [
  {
    id: 'FLASH-01',
    title: "The Scholar's Key",
    status: 'available',
    size: 'Approx. 5" to 6" height',
    price: 350,
    placements: ['Forearm', 'Calf', 'Back of the arm'],
    imageAlt: "Blackwork illustration of an ornate, stylized key woven with crawling ivy.",
    imageUrl: "https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=800&q=80",
    description: "An elegant, deeply detailed key entwined with trailing ivy leaves. Designed to wrap slightly around curved anatomy."
  },
  {
    id: 'FLASH-02',
    title: "Wildflower Crescent",
    status: 'available',
    size: 'Approx. 4" x 4"',
    price: 280,
    placements: ['Shoulder blade', 'Ribs', 'Ankle'],
    imageAlt: "Fine line illustration of a crescent moon cradling detailed wildflower blossoms.",
    imageUrl: "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=800&q=80",
    description: "A delicate composition balancing geometric celestial curves with organic, fragile wildflower silhouettes."
  },
  {
    id: 'FLASH-03',
    title: "Sacred Scarab",
    status: 'reserved',
    size: 'Approx. 5" x 5"',
    price: 400,
    placements: ['Sternum', 'Thigh', 'Upper arm'],
    imageAlt: "Detailed stippled blackwork beetle with geometric wings expanded.",
    imageUrl: "https://images.unsplash.com/photo-1576016770956-debb63d900ee?auto=format&fit=crop&w=800&q=80",
    description: "A striking symmetrical stippled piece featuring geometric accent lines and heavy contrast work."
  },
  {
    id: 'FLASH-04',
    title: "Timberline Wolf",
    status: 'available',
    size: 'Approx. 7" height',
    price: 550,
    placements: ['Outer bicep', 'Shin', 'Thigh'],
    imageAlt: "Bold illustrative blackwork of a howling wolf head framed by stylized pine trees.",
    imageUrl: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80",
    description: "A powerful, high-contrast illustrative piece capturing raw forest energy with fine-line botanical framing."
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 15
    }
  }
};

const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 18
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 15,
    transition: {
      duration: 0.2
    }
  }
};

export function FlashShowcase() {
  const [filter, setFilter] = useState<'all' | 'available' | 'reserved'>('all');
  const [selectedFlash, setSelectedFlash] = useState<FlashItem | null>(null);
  const [claimToast, setClaimToast] = useState<string | null>(null);

  const filteredDesigns = flashDesigns.filter((design) => {
    if (filter === 'all') return true;
    return design.status === filter;
  });

  const handleClaim = (design: FlashItem) => {
    if (design.status === 'reserved') return;
    
    setClaimToast(design.title);
    setSelectedFlash(null);
    
    // Auto scroll to inquiry form after visual feedback
    setTimeout(() => {
      setClaimToast(null);
      const target = document.getElementById('inquiry-form');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        // Optional custom event dispatch for form populating
        const event = new CustomEvent('selectFlashDesign', { detail: design.title });
        window.dispatchEvent(event);
      }
    }, 2000);
  };

  return (
    <section 
      id="flash-showcase" 
      className="relative min-h-screen bg-[#121212] py-24 px-4 sm:px-6 lg:px-8 overflow-hidden font-sans text-[#F5F5F3]"
    >
      {/* Background Subtle Textures */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(197,168,128,0.05),transparent_45%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(18,18,18,0.8),rgba(28,28,30,0.4))] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-semibold mb-3 block">
            Original Pre-Drawn Art
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal text-[#F5F5F3] leading-tight tracking-tight mb-6">
            Available Flash Designs
          </h2>
          <div className="h-[1px] w-24 bg-[#C5A880]/40 mx-auto mb-6" />
          <p className="text-base md:text-lg text-[#F5F5F3]/70 font-light leading-relaxed">
            Flash designs are pre-drawn, original illustrations created by me. They are tattooed exactly as shown—usually only once—making them a quick, cost-effective way to collect original art.
          </p>
        </div>

        {/* Flash Educational Callout Box */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mb-20 bg-[#1C1C1E] border border-[#C5A880]/30 rounded-lg p-6 md:p-8 shadow-2xl relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A880]/5 rounded-full blur-2xl pointer-events-none group-hover:bg-[#C5A880]/10 transition-colors duration-500" />
          
          <h3 className="text-lg md:text-xl font-serif text-[#C5A880] mb-6 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#C5A880] animate-pulse" />
            Why book a pre-drawn flash design?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold tracking-wider uppercase text-[#F5F5F3]">
                Faster Turnaround
              </h4>
              <p className="text-sm text-[#F5F5F3]/60 leading-relaxed">
                Skip the consultation and design draft process. You can often get on the schedule weeks sooner.
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-semibold tracking-wider uppercase text-[#F5F5F3]">
                Flat-Rate Pricing
              </h4>
              <p className="text-sm text-[#F5F5F3]/60 leading-relaxed">
                The price listed is exactly what you pay for the design. No hourly math, no surprises.
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-semibold tracking-wider uppercase text-[#F5F5F3]">
                Pure Expression
              </h4>
              <p className="text-sm text-[#F5F5F3]/60 leading-relaxed">
                These designs are a direct reflection of my personal artistic interests and style experiments.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Filter Controls */}
        <div className="flex justify-center items-center gap-2 mb-12">
          {(['all', 'available', 'reserved'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-widest uppercase transition-all duration-300 border ${
                filter === status
                  ? 'bg-[#C5A880] text-[#121212] border-[#C5A880] shadow-lg shadow-[#C5A880]/10'
                  : 'bg-transparent text-[#F5F5F3]/70 border-[#F5F5F3]/10 hover:border-[#C5A880]/40 hover:text-[#F5F5F3]'
              }`}
            >
              {status === 'all' ? 'All Works' : status}
            </button>
          ))}
        </div>

        {/* Flash Grid Showcase */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredDesigns.map((design) => {
              const isAvailable = design.status === 'available';
              return (
                <motion.div
                  layout
                  variants={itemVariants}
                  key={design.id}
                  className="group relative flex flex-col justify-between bg-[#1C1C1E] border border-[#F5F5F3]/5 rounded-lg overflow-hidden hover:border-[#C5A880]/30 transition-all duration-300 shadow-xl"
                >
                  {/* Image Container with Aspect Ratio */}
                  <div className="relative aspect-[4/5] overflow-hidden bg-black/40">
                    <img 
                      src={design.imageUrl} 
                      alt={design.imageAlt}
                      className="w-full h-full object-cover grayscale contrast-125 transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0 group-hover:contrast-100"
                    />
                    
                    {/* Status Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${
                        isAvailable 
                          ? 'bg-[#889E81]/10 text-[#889E81] border border-[#889E81]/20' 
                          : 'bg-[#444446]/60 text-[#F5F5F3]/60 border border-transparent'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${isAvailable ? 'bg-[#889E81]' : 'bg-[#444446]'}`} />
                        {design.status}
                      </span>
                    </div>

                    {/* Price Tag Overlay */}
                    <div className="absolute bottom-4 right-4 z-10">
                      <span className="bg-[#121212]/90 backdrop-blur-md text-[#C5A880] px-3 py-1.5 rounded border border-[#C5A880]/20 text-xs font-mono font-bold">
                        ${design.price} Flat Rate
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between gap-6">
                    <div className="space-y-2">
                      <h3 className="text-lg font-serif font-medium text-[#F5F5F3] tracking-wide group-hover:text-[#C5A880] transition-colors duration-300">
                        {design.title}
                      </h3>
                      <p className="text-xs text-[#F5F5F3]/50 font-mono">
                        Size: {design.size}
                      </p>
                      <p className="text-xs text-[#F5F5F3]/60 line-clamp-2">
                        {design.description}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2">
                      {isAvailable ? (
                        <button
                          onClick={() => handleClaim(design)}
                          className="w-full bg-[#C5A880] hover:bg-[#b0936b] text-[#121212] py-2.5 px-4 rounded font-semibold text-xs tracking-wider uppercase transition-colors duration-300"
                        >
                          Claim This Design
                        </button>
                      ) : (
                        <button
                          disabled
                          className="w-full bg-[#444446]/40 text-[#F5F5F3]/30 py-2.5 px-4 rounded font-semibold text-xs tracking-wider uppercase cursor-not-allowed border border-white/5 relative group/disabled"
                        >
                          Design Reserved
                          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 hidden group-hover/disabled:block bg-[#121212] text-[#F5F5F3]/80 text-[10px] p-2 rounded border border-[#F5F5F3]/10 normal-case tracking-normal">
                            This piece has been claimed by another collector. Browse other available works.
                          </span>
                        </button>
                      )}
                      
                      <button
                        onClick={() => setSelectedFlash(design)}
                        className="w-full bg-transparent hover:bg-white/5 text-[#F5F5F3]/80 hover:text-[#F5F5F3] py-2 px-4 rounded text-xs tracking-wider uppercase transition-all duration-300 border border-transparent hover:border-white/10"
                      >
                        View Specifications
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Banner */}
        <div className="mt-20 text-center">
          <p className="text-sm text-[#F5F5F3]/60 mb-4">
            Have a custom idea instead of a pre-drawn flash piece?
          </p>
          <a
            href="#inquiry-form"
            className="inline-flex items-center gap-2 text-sm text-[#C5A880] font-semibold tracking-wider uppercase hover:text-[#F5F5F3] transition-colors duration-300 group"
          >
            Start a Custom Inquiry
            <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300">→</span>
          </a>
        </div>
      </div>

      {/* Detail Drawer Modal */}
      <AnimatePresence>
        {selectedFlash && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedFlash(null)}
              className="absolute inset-0 bg-[#121212]/90 backdrop-blur-sm"
            />
            
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative bg-[#1C1C1E] border border-[#C5A880]/30 rounded-xl max-w-2xl w-full overflow-hidden shadow-2xl z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedFlash(null)}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-[#121212]/60 hover:bg-[#C5A880] text-[#F5F5F3] hover:text-[#121212] flex items-center justify-center transition-all duration-300"
                aria-label="Close modal"
              >
                ✕
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative h-64 md:h-full min-h-[300px] bg-black">
                  <img 
                    src={selectedFlash.imageUrl} 
                    alt={selectedFlash.imageAlt}
                    className="w-full h-full object-cover grayscale contrast-125"
                  />
                  {/* Status Badge inside modal */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${
                      selectedFlash.status === 'available'
                        ? 'bg-[#889E81]/10 text-[#889E81] border border-[#889E81]/20' 
                        : 'bg-[#444446]/60 text-[#F5F5F3]/60 border border-transparent'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${selectedFlash.status === 'available' ? 'bg-[#889E81]' : 'bg-[#444446]'}`} />
                      {selectedFlash.status}
                    </span>
                  </div>
                </div>

                <div className="p-8 flex flex-col justify-between gap-8">
                  <div className="space-y-4">
                    <span className="text-[10px] font-mono text-[#C5A880] tracking-widest uppercase">
                      ID: {selectedFlash.id}
                    </span>
                    <h3 className="text-2xl font-serif text-[#F5F5F3] leading-tight">
                      {selectedFlash.title}
                    </h3>
                    
                    <p className="text-sm text-[#F5F5F3]/70 leading-relaxed font-light">
                      {selectedFlash.description}
                    </p>

                    <div className="h-[1px] bg-white/5" />

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-[#F5F5F3]/40">Dimensions:</span>
                        <span className="text-[#F5F5F3] font-mono">{selectedFlash.size}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-[#F5F5F3]/40">Rate:</span>
                        <span className="text-[#C5A880] font-semibold font-mono">${selectedFlash.price} Flat Rate</span>
                      </div>
                      <div className="flex flex-col gap-1 pt-2">
                        <span className="text-xs text-[#F5F5F3]/40">Recommended Placements:</span>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {selectedFlash.placements.map((placement, idx) => (
                            <span key={idx} className="text-[10px] bg-[#121212] px-2.5 py-1 rounded border border-white/5 text-[#F5F5F3]/80">
                              {placement}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    {selectedFlash.status === 'available' ? (
                      <button
                        onClick={() => handleClaim(selectedFlash)}
                        className="w-full bg-[#C5A880] hover:bg-[#b0936b] text-[#121212] py-3 rounded font-semibold text-xs tracking-wider uppercase transition-colors duration-300"
                      >
                        Claim Design & Book Session
                      </button>
                    ) : (
                      <button
                        disabled
                        className="w-full bg-[#444446]/40 text-[#F5F5F3]/30 py-3 rounded font-semibold text-xs tracking-wider uppercase cursor-not-allowed border border-white/5"
                      >
                        This Design is Reserved
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Claim Status Toast Notification */}
      <AnimatePresence>
        {claimToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-8 right-8 z-50 bg-[#1C1C1E] border border-[#889E81] text-[#F5F5F3] px-6 py-4 rounded-lg shadow-2xl flex items-center gap-4 max-w-md"
          >
            <div className="w-8 h-8 rounded-full bg-[#889E81]/20 flex items-center justify-center text-[#889E81]">
              ✓
            </div>
            <div>
              <p className="font-serif text-sm font-medium">"{claimToast}" Selected</p>
              <p className="text-xs text-[#F5F5F3]/60">Redirecting you to the booking inquiry form...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}