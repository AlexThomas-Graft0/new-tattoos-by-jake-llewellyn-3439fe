'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

interface PortfolioItem {
  id: string;
  category: 'Botanical & Floral' | 'Illustrative Blackwork' | 'Fine Line & Detail' | 'Large Scale & Ornamental';
  title: string;
  placement: string;
  technique: string;
  image: string;
  alt: string;
}

const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'item-1',
    category: 'Botanical & Floral',
    title: 'Fern & Wild Rose Sleeve',
    placement: 'Inner Forearm',
    technique: 'Fine Line & Dotwork',
    image: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80&w=800',
    alt: 'Fine line botanical sleeve tattoo featuring detailed ferns and wild roses wrapping a forearm.',
  },
  {
    id: 'item-2',
    category: 'Illustrative Blackwork',
    title: 'The Gilded Skull',
    placement: 'Upper Thigh',
    technique: 'Illustrative Blackwork',
    image: 'https://images.unsplash.com/photo-1501472312651-726afd116ff1?auto=format&fit=crop&q=80&w=800',
    alt: 'Large blackwork tattoo of a detailed skull with floral elements wrapping the upper thigh.',
  },
  {
    id: 'item-3',
    category: 'Fine Line & Detail',
    title: 'Lunar Cecropia Moth',
    placement: 'Upper Back',
    technique: 'Fine Line & Ornamental',
    image: 'https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?auto=format&fit=crop&q=80&w=800',
    alt: 'Delicate ornamental moth tattoo with geometric stippling on the upper back.',
  },
  {
    id: 'item-4',
    category: 'Botanical & Floral',
    title: 'Serpentine Peony',
    placement: 'Calf Placement',
    technique: 'Illustrative Blackwork',
    image: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&q=80&w=800',
    alt: 'Black ink snake weaving through peony blossoms on a client\'s calf.',
  },
  {
    id: 'item-5',
    category: 'Large Scale & Ornamental',
    title: 'Sacred Geometry Collar',
    placement: 'Collarbone & Chest',
    technique: 'Ornamental',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
    alt: 'Symmetrical ornamental chest piece stretching toward the shoulders with heavy blackwork accents.',
  },
  {
    id: 'item-6',
    category: 'Fine Line & Detail',
    title: 'Celestial Paths',
    placement: 'Inner Wrist',
    technique: 'Fine Line',
    image: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&q=80&w=800',
    alt: 'Minimalist astronomical diagram with delicate celestial alignments on an inner wrist.',
  },
];

const CATEGORIES = [
  'All Works',
  'Botanical & Floral',
  'Illustrative Blackwork',
  'Fine Line & Detail',
  'Large Scale & Ornamental',
] as const;

export function PortfolioGallery() {
  const [activeFilter, setActiveFilter] = useState<string>('All Works');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const filteredItems = PORTFOLIO_ITEMS.filter((item) => {
    if (activeFilter === 'All Works') return true;
    return item.category === activeFilter;
  });

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedItem(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedItem(null);
  }, []);

  // Framer Motion Variants explicitly typed
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.2 },
    },
  };

  const modalVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', duration: 0.4 },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.2 },
    },
  };

  return (
    <section
      id="portfolio-gallery"
      className="relative py-24 bg-[#121212] text-[#F5F5F3] overflow-hidden selection:bg-[#C5A880]/30 selection:text-[#F5F5F3]"
      aria-labelledby="portfolio-heading"
    >
      {/* Decorative Background Accents */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C5A880]/30 to-transparent" />
      <div className="absolute top-1/4 -left-64 w-96 h-96 bg-[#C5A880]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-[#C5A880]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] block mb-3 font-medium">
            Curated Visual Archive
          </span>
          <h2
            id="portfolio-heading"
            className="text-4xl md:text-5xl font-serif font-normal text-[#F5F5F3] tracking-tight mb-6 leading-tight"
          >
            Completed Works
          </h2>
          <p className="text-base md:text-lg text-[#F5F5F3]/70 font-sans leading-relaxed">
            Explore a curated selection of healed and fresh tattoos. All pieces are custom-designed, hand-drawn,
            and applied with meticulous care to ensure clean aging over time.
          </p>
        </div>

        {/* Category Filter Bar */}
        <div className="mb-12 overflow-x-auto scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex space-x-2 border-b border-[#F5F5F3]/10 pb-4 min-w-max">
            {CATEGORIES.map((category) => {
              const isActive = activeFilter === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-4 py-2 text-sm font-sans font-medium transition-all duration-300 relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] focus-visible:ring-offset-2 focus-visible:ring-offset-[#121212] ${
                    isActive ? 'text-[#C5A880]' : 'text-[#F5F5F3]/60 hover:text-[#F5F5F3]'
                  }`}
                  aria-pressed={isActive}
                >
                  {category}
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterUnderline"
                      className="absolute bottom-[-17px] left-0 right-0 h-[2px] bg-[#C5A880]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Portfolio Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 min-h-[400px]"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="group relative cursor-pointer aspect-[3/4] overflow-hidden rounded bg-[#1C1C1E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]"
                onClick={() => setSelectedItem(item)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedItem(item);
                  }
                }}
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-focus:scale-105"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/40 to-transparent opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 md:p-8" />

                {/* Static / Hover details container */}
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 flex flex-col justify-end transform translate-y-2 group-hover:translate-y-0 group-focus:translate-y-0 transition-transform duration-300">
                  <div className="opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300">
                    <span className="text-xs uppercase tracking-wider text-[#C5A880] font-semibold mb-2 block">
                      {item.placement}
                    </span>
                    <h3 className="text-xl md:text-2xl font-serif text-[#F5F5F3] font-normal leading-tight mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#F5F5F3]/70 font-sans">
                      {item.technique}
                    </p>
                  </div>
                </div>

                {/* Subtle bottom tag visible when not hovered */}
                <div className="absolute top-4 left-4 bg-[#121212]/80 backdrop-blur-md px-3 py-1 rounded text-[11px] uppercase tracking-widest text-[#F5F5F3]/80 group-hover:opacity-0 transition-opacity duration-300">
                  {item.category}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* In-Gallery Conversion Callout */}
        <div className="mt-20 border border-[#C5A880]/20 bg-[#1C1C1E] rounded-lg p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5A880]/5 rounded-full blur-[80px] pointer-events-none" />
          <div className="relative z-10 max-w-4xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <h3 className="text-2xl md:text-3xl font-serif text-[#F5F5F3] mb-3">
                Like what you see?
              </h3>
              <p className="text-[#F5F5F3]/70 font-sans text-sm md:text-base leading-relaxed">
                Let’s design something unique for your skin. If my style aligns with your creative vision, let’s start discussing your placement and concept.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full md:w-auto shrink-0">
              <a
                href="#inquiry-form"
                className="inline-flex justify-center items-center px-6 py-3 bg-[#C5A880] text-[#121212] font-sans font-medium text-sm rounded shadow hover:bg-[#b0936b] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1C1C1E]"
              >
                Inquire About a Custom Piece
              </a>
              <a
                href="#booking-policies"
                className="inline-flex justify-center items-center px-4 py-3 text-sm font-sans font-medium text-[#C5A880] hover:text-[#b0936b] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] rounded"
              >
                Read My Booking Policies
                <svg
                  className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#121212]/95 backdrop-blur-md"
            onClick={handleCloseModal}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative max-w-4xl w-full bg-[#1C1C1E] rounded-lg overflow-hidden border border-[#C5A880]/20 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 z-10 bg-[#121212]/80 hover:bg-[#C5A880] text-[#F5F5F3] hover:text-[#121212] p-2 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]"
                aria-label="Close modal"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12">
                {/* Modal Image */}
                <div className="md:col-span-7 aspect-[3/4] md:aspect-auto md:h-[70vh]">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.alt}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Modal Info */}
                <div className="md:col-span-5 p-8 flex flex-col justify-between bg-[#1C1C1E]">
                  <div>
                    <span className="text-xs uppercase tracking-[0.2em] text-[#C5A880] font-semibold block mb-4">
                      {selectedItem.category}
                    </span>
                    <h3 className="text-3xl font-serif text-[#F5F5F3] font-normal tracking-tight mb-4 leading-tight">
                      {selectedItem.title}
                    </h3>

                    <div className="space-y-4 my-6 border-y border-[#F5F5F3]/10 py-6">
                      <div>
                        <h4 className="text-xs uppercase tracking-wider text-[#F5F5F3]/40 mb-1">Placement</h4>
                        <p className="text-sm text-[#F5F5F3] font-sans font-medium">{selectedItem.placement}</p>
                      </div>
                      <div>
                        <h4 className="text-xs uppercase tracking-wider text-[#F5F5F3]/40 mb-1">Technique</h4>
                        <p className="text-sm text-[#F5F5F3] font-sans font-medium">{selectedItem.technique}</p>
                      </div>
                    </div>

                    <p className="text-xs text-[#F5F5F3]/60 italic font-sans leading-relaxed">
                      All tattoos represent fully customized collaborations designed specifically for the client's body contours.
                    </p>
                  </div>

                  <div className="mt-8 flex flex-col gap-3">
                    <a
                      href="#inquiry-form"
                      onClick={handleCloseModal}
                      className="w-full inline-flex justify-center items-center px-5 py-3 bg-[#C5A880] text-[#121212] font-sans font-medium text-sm rounded hover:bg-[#b0936b] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]"
                    >
                      Inquire About Similar Work
                    </a>
                    <button
                      onClick={handleCloseModal}
                      className="w-full inline-flex justify-center items-center px-5 py-3 bg-transparent text-[#F5F5F3]/80 hover:text-[#F5F5F3] font-sans text-sm rounded border border-[#F5F5F3]/20 hover:border-[#F5F5F3]/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]"
                    >
                      Back to Gallery
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}