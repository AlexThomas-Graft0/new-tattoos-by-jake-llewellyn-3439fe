'use client';

import React, { useState } from 'react';
import { motion, type Variants } from 'framer-motion';

// Premium Unsplash images matching the dark, elegant, fine-line tattoo aesthetic
const HERO_BG_IMAGE = 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=1400';
const STUDIO_DETAIL_IMAGE = 'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?auto=format&fit=crop&q=80&w=1000';

interface FocusArea {
  id: string;
  title: string;
  description: string;
  exampleImg: string;
}

const PRIORITIZED_AREAS: FocusArea[] = [
  {
    id: 'botanical',
    title: 'Botanical Compositions',
    description: 'Detailed ferns, wild roses, and eucalyptus wrapping naturally around your contours.',
    exampleImg: 'https://images.unsplash.com/photo-1560717789-0ac7c58ac90a?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'blackwork',
    title: 'Illustrative Blackwork',
    description: 'High-contrast ink designs featuring rich textures, stippling, and bold dark shapes.',
    exampleImg: 'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'fineline',
    title: 'Fine-Line Animals',
    description: 'Delicate, single-needle portraits capturing animal anatomy and majestic posture.',
    exampleImg: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&q=80&w=600',
  },
];

export function HeroSection() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFocusTab, setActiveFocusTab] = useState<string>('botanical');

  // Animation variants with correct Typescript annotations
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
        stiffness: 75,
        damping: 15,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 40 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 60,
        damping: 18,
        delay: 0.4,
      },
    },
  };

  return (
    <section
      id="hero-section"
      className="relative min-h-screen bg-[#121212] text-[#F5F5F3] font-sans overflow-hidden flex flex-col justify-between"
    >
      {/* Background visual texture */}
      <div className="absolute inset-0 opacity-15 pointer-events-none mix-blend-overlay bg-cover bg-center" style={{ backgroundImage: `url(${HERO_BG_IMAGE})` }} />
      <div className="absolute inset-0 bg-gradient-to-b from-[#121212]/95 via-[#121212]/80 to-[#121212] pointer-events-none" />

      {/* Global Navigation Bar */}
      <header className="relative z-50 w-full border-b border-[#F5F5F3]/10 bg-[#121212]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero-section"
            className="font-serif text-2xl tracking-wide text-[#F5F5F3] hover:text-[#C5A880] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] rounded"
          >
            Jake Llewellyn
          </a>

          {/* Nav Links (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium tracking-wide">
            <a href="#portfolio-gallery" className="text-[#F5F5F3]/80 hover:text-[#C5A880] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C5A880]">Portfolio</a>
            <a href="#flash-showcase" className="text-[#F5F5F3]/80 hover:text-[#C5A880] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C5A880]">Available Flash</a>
            <a href="#booking-policies" className="text-[#F5F5F3]/80 hover:text-[#C5A880] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C5A880]">Booking & Policies</a>
            <a href="#about-artist" className="text-[#F5F5F3]/80 hover:text-[#C5A880] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C5A880]">About</a>
            <a href="#aftercare-faqs" className="text-[#F5F5F3]/80 hover:text-[#C5A880] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C5A880]">FAQ</a>
          </nav>

          {/* Status Indicator & CTA (Desktop) */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="flex items-center space-x-2 bg-[#889E81] text-[#121212] text-xs font-semibold px-3 py-1.5 rounded-full tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-[#121212] animate-pulse" />
              <span>Currently booking for next month</span>
            </div>
            <a
              href="#inquiry-form"
              className="border border-[#C5A880] text-[#F5F5F3] hover:bg-[#C5A880] hover:text-[#121212] transition-all duration-300 px-5 py-2 text-sm font-medium tracking-wider rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]"
            >
              Book a Session
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] rounded"
            aria-label="Toggle Menu"
          >
            <span className={`w-6 h-0.5 bg-[#F5F5F3] transition-transform duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-6 h-0.5 bg-[#F5F5F3] transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`w-6 h-0.5 bg-[#F5F5F3] transition-transform duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-0 w-full bg-[#1C1C1E] border-b border-[#F5F5F3]/10 py-6 px-6 flex flex-col space-y-4 lg:hidden z-40 shadow-xl"
          >
            <div className="inline-flex items-center space-x-2 bg-[#889E81] text-[#121212] text-xs font-bold px-3 py-1.5 rounded-full tracking-wider uppercase self-start mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#121212] animate-pulse" />
              <span>Currently booking for next month</span>
            </div>
            <a
              href="#portfolio-gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg text-[#F5F5F3] hover:text-[#C5A880] py-1 border-b border-[#F5F5F3]/5"
            >
              Portfolio
            </a>
            <a
              href="#flash-showcase"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg text-[#F5F5F3] hover:text-[#C5A880] py-1 border-b border-[#F5F5F3]/5"
            >
              Available Flash
            </a>
            <a
              href="#booking-policies"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg text-[#F5F5F3] hover:text-[#C5A880] py-1 border-b border-[#F5F5F3]/5"
            >
              Booking & Policies
            </a>
            <a
              href="#about-artist"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg text-[#F5F5F3] hover:text-[#C5A880] py-1 border-b border-[#F5F5F3]/5"
            >
              About
            </a>
            <a
              href="#aftercare-faqs"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg text-[#F5F5F3] hover:text-[#C5A880] py-1 border-b border-[#F5F5F3]/5"
            >
              FAQ
            </a>
            <a
              href="#inquiry-form"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-[#C5A880] text-[#121212] text-center py-3 font-semibold rounded tracking-wider mt-4"
            >
              Book a Session
            </a>
          </motion.div>
        )}
      </header>

      {/* Main Hero Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center flex-grow">
        
        {/* Left Column: Copy & CTAs */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col justify-center space-y-8"
        >
          {/* Over-Headline */}
          <motion.div variants={itemVariants} className="space-y-2">
            <span className="text-[#C5A880] text-xs lg:text-sm font-bold tracking-[0.25em] uppercase block">
              CUSTOM ILLUSTRATIVE & BLACKWORK TATTOOING
            </span>
            <div className="w-12 h-[2px] bg-[#C5A880]" />
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#F5F5F3] leading-[1.15] tracking-tight font-medium"
          >
            Collaborative body art designed to wear forever.
          </motion.h1>

          {/* Sub-headline / Body Copy */}
          <motion.p
            variants={itemVariants}
            className="text-[#F5F5F3]/80 font-sans text-base lg:text-lg leading-relaxed max-w-2xl"
          >
            Welcome to a tattoo experience focused on comfort, clear communication, and custom line art. 
            I collaborate with you to create striking illustrative blackwork tailored to your body&apos;s natural contours. 
            Whether this is your first tattoo or your fiftieth, your comfort and autonomy are my highest priorities.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4"
          >
            <a
              href="#inquiry-form"
              className="bg-[#C5A880] text-[#121212] hover:bg-[#b0936b] text-center px-8 py-4 text-sm font-bold tracking-wider uppercase rounded shadow-lg transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#121212] focus-visible:ring-[#C5A880]"
            >
              Inquire About a Custom Piece
            </a>
            <a
              href="#flash-showcase"
              className="border border-[#F5F5F3]/40 text-[#F5F5F3] hover:border-[#F5F5F3] hover:bg-[#F5F5F3]/5 text-center px-8 py-4 text-sm font-bold tracking-wider uppercase rounded transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#121212] focus-visible:ring-[#F5F5F3]"
            >
              Browse Available Flash
            </a>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-4 pt-8 border-t border-[#F5F5F3]/10 max-w-xl"
          >
            <div className="space-y-1">
              <span className="block text-[#C5A880] font-serif text-lg lg:text-xl font-bold">100%</span>
              <span className="block text-[#F5F5F3]/60 text-xs uppercase tracking-wider">Single-Use Vegan Materials</span>
            </div>
            <div className="space-y-1">
              <span className="block text-[#C5A880] font-serif text-lg lg:text-xl font-bold">Private</span>
              <span className="block text-[#F5F5F3]/60 text-xs uppercase tracking-wider">Quiet Studio Space</span>
            </div>
            <div className="space-y-1">
              <span className="block text-[#C5A880] font-serif text-lg lg:text-xl font-bold">Custom</span>
              <span className="block text-[#F5F5F3]/60 text-xs uppercase tracking-wider">Anatomical Design Flow</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: Interactive Booking Status Card Over a Studio Image Background */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-5 relative w-full flex justify-center lg:justify-end"
        >
          {/* Framed Image Element behind the card */}
          <div className="absolute inset-0 -m-4 lg:-m-6 bg-gradient-to-tr from-[#C5A880]/10 to-transparent rounded-xl pointer-events-none" />
          
          {/* Main Card Container */}
          <div className="relative w-full max-w-md bg-[#1C1C1E] border border-[#F5F5F3]/10 rounded-xl overflow-hidden shadow-2xl transition-all duration-500 hover:border-[#C5A880]/40 group">
            {/* Top illustrative image header */}
            <div className="h-44 w-full relative overflow-hidden">
              <img
                src={STUDIO_DETAIL_IMAGE}
                alt="Jake Llewellyn tattooing client in clean private studio"
                className="w-full h-full object-cover filter grayscale contrast-125 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1E] via-[#1C1C1E]/40 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="bg-[#121212]/90 text-[#C5A880] text-[10px] font-bold tracking-[0.2em] uppercase px-2.5 py-1 rounded border border-[#C5A880]/30">
                  EST. 2018
                </span>
              </div>
            </div>

            {/* Card Content Area */}
            <div className="p-6 lg:p-8 space-y-6">
              {/* Header */}
              <div className="space-y-2">
                <span className="text-[#F5F5F3]/50 text-xs uppercase tracking-widest font-semibold block">
                  Current Booking Status
                </span>
                <div className="flex items-center space-x-2 text-[#889E81]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#889E81] animate-ping absolute" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#889E81]" />
                  <span className="text-xs font-bold tracking-wider uppercase pl-2">
                    Accepting New Project Inquiries
                  </span>
                </div>
              </div>

              {/* Focus Area Copy */}
              <p className="text-[#F5F5F3]/80 text-sm leading-relaxed">
                Right now, I am prioritizing large-scale illustrative blackwork, botanical compositions, and fine-line animal portraits. If you have a concept that fits this focus, I would love to bring it to life.
              </p>

              {/* Interactive Focus Explorer Segment */}
              <div className="bg-[#121212] rounded-lg p-4 border border-[#F5F5F3]/5 space-y-3">
                <span className="text-[11px] uppercase tracking-wider text-[#C5A880] font-bold block">
                  Explore My Priority Focus Areas:
                </span>
                <div className="flex space-x-1.5 border-b border-[#F5F5F3]/10 pb-2">
                  {PRIORITIZED_AREAS.map((area) => (
                    <button
                      key={area.id}
                      onClick={() => setActiveFocusTab(area.id)}
                      className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C5A880] ${
                        activeFocusTab === area.id
                          ? 'bg-[#C5A880] text-[#121212] font-bold'
                          : 'bg-transparent text-[#F5F5F3]/60 hover:text-[#F5F5F3]'
                      }`}
                    >
                      {area.id.toUpperCase()}
                    </button>
                  ))}
                </div>
                {/* Dynamically displaying selected active tab detail to make card interactive */}
                <div className="min-h-[60px] flex items-start space-x-3 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0 bg-neutral-800 border border-[#F5F5F3]/10">
                    <img
                      src={PRIORITIZED_AREAS.find((a) => a.id === activeFocusTab)?.exampleImg}
                      alt="Style reference"
                      className="w-full h-full object-cover filter grayscale"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-[#F5F5F3]">
                      {PRIORITIZED_AREAS.find((a) => a.id === activeFocusTab)?.title}
                    </h4>
                    <p className="text-[11px] text-[#F5F5F3]/60 mt-1 leading-normal">
                      {PRIORITIZED_AREAS.find((a) => a.id === activeFocusTab)?.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Response Time and Footer */}
              <div className="pt-4 border-t border-[#F5F5F3]/5 flex items-center justify-between text-xs text-[#F5F5F3]/50">
                <span>Response Time:</span>
                <span className="font-medium text-[#F5F5F3]">Within 5 business days</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Subtle Anchor Scroll Indicator */}
      <div className="relative z-10 w-full flex justify-center pb-8 pt-4">
        <a
          href="#value-props"
          className="flex flex-col items-center space-y-2 text-[#F5F5F3]/40 hover:text-[#C5A880] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] rounded px-3 py-1"
          aria-label="Scroll down to value propositions"
        >
          <span className="text-[10px] tracking-[0.2em] uppercase">Scroll to Explore</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            className="w-1 h-3 rounded-full bg-[#C5A880]"
          />
        </a>
      </div>
    </section>
  );
}