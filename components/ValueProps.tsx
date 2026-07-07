'use client';

import React from 'react';
import { motion, type Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 18,
    },
  },
};

export function ValueProps() {
  return (
    <section
      id="value-props"
      className="relative overflow-hidden bg-[#121212] py-24 sm:py-32 text-[#F5F5F3]"
      aria-labelledby="value-props-heading"
    >
      {/* Draftsman Geometry Background */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#C5A880" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          <circle cx="50%" cy="50%" r="350" fill="none" stroke="#C5A880" strokeWidth="1.5" strokeDasharray="5 5" />
          <circle cx="50%" cy="50%" r="500" fill="none" stroke="#C5A880" strokeWidth="1" />
          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#C5A880" strokeWidth="1" strokeDasharray="10 10" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-20">
          <span className="font-mono text-xs font-semibold tracking-widest text-[#C5A880] uppercase block mb-4">
            DESIGN PHILOSOPHY & STANDARDS
          </span>
          <h2
            id="value-props-heading"
            className="font-serif text-4xl sm:text-5xl font-normal tracking-tight text-[#F5F5F3] mb-6"
          >
            Collaborative body art designed to wear forever.
          </h2>
          <div className="h-[1px] w-24 bg-[#C5A880] mx-auto mb-6" />
          <p className="font-sans text-base sm:text-lg text-[#F5F5F3]/80 leading-relaxed max-w-2xl mx-auto">
            A tattoo experience focused on comfort, rigorous safety standards, and anatomical harmony. 
            Every line is applied with direct intention to complement your skin and natural movement.
          </p>
        </div>

        {/* 3-Column Value Matrix */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 gap-y-12 sm:gap-y-16 lg:grid-cols-3 lg:gap-x-12 mb-28"
        >
          {/* Column 1: Safe & Inclusive */}
          <motion.div
            variants={itemVariants}
            className="group relative flex flex-col justify-between bg-[#1C1C1E] p-8 rounded-2xl border border-white/[0.04] transition-all duration-300 hover:border-[#C5A880]/30 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          >
            <div>
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-[#C5A880]/10 text-[#C5A880] group-hover:scale-110 transition-transform duration-300">
                {/* Delicate leaf / open hands SVG */}
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9s2.015-9 4.5-9m0 0a9.015 9.015 0 010 18" />
                </svg>
              </div>
              <span className="font-mono text-xs font-medium text-[#C5A880] uppercase tracking-wider block mb-1">
                A Welcoming & Safe Space
              </span>
              <h3 className="font-serif text-2xl font-normal text-[#F5F5F3] mb-4">
                Safe & Inclusive
              </h3>
              <p className="font-sans text-sm text-[#F5F5F3]/75 leading-relaxed">
                Your safety, comfort, and physical boundaries are non-negotiable. I offer a quiet, low-stress studio environment where your voice is always heard, respected, and prioritized.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-white/[0.04] flex items-center gap-2 text-xs font-mono text-[#889E81]">
              <span className="h-2 w-2 rounded-full bg-[#889E81] animate-pulse" />
              <span>100% Sterile & Private Studio</span>
            </div>
          </motion.div>

          {/* Column 2: Anatomical Flow */}
          <motion.div
            variants={itemVariants}
            className="group relative flex flex-col justify-between bg-[#1C1C1E] p-8 rounded-2xl border border-white/[0.04] transition-all duration-300 hover:border-[#C5A880]/30 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          >
            <div>
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-[#C5A880]/10 text-[#C5A880] group-hover:scale-110 transition-transform duration-300">
                {/* Fine-line ink pen SVG */}
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
              </div>
              <span className="font-mono text-xs font-medium text-[#C5A880] uppercase tracking-wider block mb-1">
                Custom Tailored Design
              </span>
              <h3 className="font-serif text-2xl font-normal text-[#F5F5F3] mb-4">
                Anatomical Flow
              </h3>
              <p className="font-sans text-sm text-[#F5F5F3]/75 leading-relaxed">
                Tattoos should complement the body, not fight it. Every custom piece is specifically designed and drawn to wrap and flow naturally with your muscles, contours, and physical movement.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-white/[0.04] flex items-center gap-2 text-xs font-mono text-[#C5A880]">
              <span>Drawing designed for dynamic flow</span>
            </div>
          </motion.div>

          {/* Column 3: No Hidden Policies */}
          <motion.div
            variants={itemVariants}
            className="group relative flex flex-col justify-between bg-[#1C1C1E] p-8 rounded-2xl border border-white/[0.04] transition-all duration-300 hover:border-[#C5A880]/30 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          >
            <div>
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-[#C5A880]/10 text-[#C5A880] group-hover:scale-110 transition-transform duration-300">
                {/* Clean geometric ruler SVG */}
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="font-mono text-xs font-medium text-[#C5A880] uppercase tracking-wider block mb-1">
                Professional & Transparent
              </span>
              <h3 className="font-serif text-2xl font-normal text-[#F5F5F3] mb-4">
                No Hidden Policies
              </h3>
              <p className="font-sans text-sm text-[#F5F5F3]/75 leading-relaxed">
                I don't believe in gatekeeping. From straightforward flat rates on flash art to clear deposit policies, you’ll always know exactly what to expect before we begin our session.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-white/[0.04] flex items-center gap-2 text-xs font-mono text-[#F5F5F3]/60">
              <span>Flat pricing & hourly clarity</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Editorial Split Screen Callout: Custom vs Flash */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Left Column: Custom Projects */}
          <div className="relative group overflow-hidden rounded-3xl bg-[#1C1C1E] border border-white/[0.04] flex flex-col justify-between min-h-[460px] p-8 sm:p-12 transition-all duration-500 hover:border-[#C5A880]/30">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0 transition-transform duration-700 ease-out group-hover:scale-105">
              <img
                src="https://images.unsplash.com/photo-1598136490941-30d885368a9a?q=80&w=1200&auto=format&fit=crop"
                alt="Detailed professional blackwork tattoo sketch setup"
                className="w-full h-full object-cover object-center opacity-20 filter grayscale contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1E] via-[#1C1C1E]/90 to-transparent" />
            </div>

            <div className="relative z-10">
              <span className="font-mono text-xs font-semibold tracking-wider text-[#C5A880] uppercase block mb-3">
                ONE-OF-A-KIND HEIRLOOM
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-normal text-[#F5F5F3] mb-4">
                Bring Your Vision to Life
              </h3>
              <p className="font-sans text-sm sm:text-base text-[#F5F5F3]/80 leading-relaxed max-w-md">
                Have a specific concept, story, or layout in mind? Let's build it from scratch. We'll collaborate closely on references, size, and placement to create a one-of-a-kind heirloom piece.
              </p>
            </div>

            <div className="relative z-10 mt-12">
              <a
                href="#inquiry-form"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-lg bg-[#C5A880] text-[#121212] font-sans font-semibold text-sm tracking-wide transition-all duration-300 hover:bg-[#F5F5F3] hover:shadow-[0_4px_20px_rgba(197,168,128,0.25)] focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:ring-offset-2 focus:ring-offset-[#121212]"
              >
                Start a Custom Inquiry
              </a>
            </div>
          </div>

          {/* Right Column: Available Flash */}
          <div className="relative group overflow-hidden rounded-3xl bg-[#1C1C1E] border border-white/[0.04] flex flex-col justify-between min-h-[460px] p-8 sm:p-12 transition-all duration-500 hover:border-[#C5A880]/30">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0 transition-transform duration-700 ease-out group-hover:scale-105">
              <img
                src="https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?q=80&w=1200&auto=format&fit=crop"
                alt="Original black and white ink line drawings on drafting table"
                className="w-full h-full object-cover object-center opacity-20 filter grayscale contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1E] via-[#1C1C1E]/90 to-transparent" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-xs font-semibold tracking-wider text-[#C5A880] uppercase">
                  READY TO INK
                </span>
                <span className="inline-flex items-center rounded-full bg-[#889E81]/10 px-2 py-0.5 text-[10px] font-mono font-medium text-[#889E81]">
                  ● BOOKING FASTER
                </span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl font-normal text-[#F5F5F3] mb-4">
                Pre-Drawn Original Designs
              </h3>
              <p className="font-sans text-sm sm:text-base text-[#F5F5F3]/80 leading-relaxed max-w-md">
                Skip the design phase and claim a pre-drawn, ready-to-ink piece from my personal collection. These designs are highly detailed, have a faster booking turnaround, and are priced as a flat fee.
              </p>
            </div>

            <div className="relative z-10 mt-12">
              <a
                href="#flash-showcase"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-lg border border-[#F5F5F3] text-[#F5F5F3] font-sans font-semibold text-sm tracking-wide transition-all duration-300 hover:bg-[#F5F5F3] hover:text-[#121212] focus:outline-none focus:ring-2 focus:ring-[#F5F5F3] focus:ring-offset-2 focus:ring-offset-[#121212]"
              >
                Browse Available Flash
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}