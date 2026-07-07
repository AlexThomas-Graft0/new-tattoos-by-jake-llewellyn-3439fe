'use client';

import * as React from 'react';
import { motion, type Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export function Footer() {
  const handleScrollToTop = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const element = document.getElementById('hero-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative z-10 bg-[#121212] text-[#F5F5F3] border-t border-[#C5A880]/20 font-sans antialiased overflow-hidden">
      {/* Decorative background subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-[#C5A880]/30 to-transparent" />
      
      {/* 1. Large Conversion Callout Area */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12 md:pt-24 md:pb-16 border-b border-[#1C1C1E]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="font-mono text-xs tracking-[0.2em] text-[#C5A880] uppercase block">
              COLLABORATIVE BODY ART
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-light leading-tight">
              Ready to design something <br className="hidden md:inline" />
              <span className="italic text-[#C5A880]">unique</span> for your skin?
            </h2>
            <p className="text-[#F5F5F3]/70 text-sm md:text-base max-w-xl font-light leading-relaxed">
              Whether you want to claim an original pre-drawn flash piece or build a custom heirloom composition from scratch, let's collaborate to bring it to life.
            </p>
          </div>
          
          <div className="lg:col-span-5 flex flex-col sm:flex-row gap-4 lg:justify-end">
            <a
              href="#inquiry-form"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#C5A880] text-[#121212] font-medium text-sm tracking-wide uppercase transition-colors duration-300 hover:bg-[#b0936d] focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:ring-offset-2 focus:ring-offset-[#121212] active:scale-[0.98]"
            >
              Inquire About Custom
            </a>
            <a
              href="#flash-showcase"
              className="inline-flex items-center justify-center px-8 py-4 border border-[#F5F5F3]/20 text-[#F5F5F3] font-medium text-sm tracking-wide uppercase transition-all duration-300 hover:bg-[#F5F5F3]/5 hover:border-[#F5F5F3]/40 focus:outline-none focus:ring-2 focus:ring-[#F5F5F3]/40 active:scale-[0.98]"
            >
              Browse Available Flash
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Directory Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="max-w-7xl mx-auto px-6 py-16 md:py-24"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Column 1: Brand & Live Status Indicator */}
          <motion.div variants={itemVariants} className="lg:col-span-4 space-y-6">
            <div className="space-y-3">
              <span className="font-serif text-2xl tracking-wider font-light text-[#F5F5F3]">
                Jake Llewellyn
              </span>
              <p className="text-xs font-mono tracking-widest text-[#C5A880]/80 uppercase">
                Illustrative &amp; Blackwork Tattooing
              </p>
            </div>

            {/* Status Card */}
            <div className="bg-[#1C1C1E] p-5 border border-[#C5A880]/10 rounded-sm space-y-3 max-w-sm">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#889E81] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#889E81]"></span>
                </span>
                <span className="text-xs font-mono font-medium text-[#889E81] uppercase tracking-wider">
                  Currently booking for next month
                </span>
              </div>
              <p className="text-xs text-[#F5F5F3]/60 leading-relaxed font-light">
                Prioritizing large-scale botanical compositions, illustrative blackwork, and fine-line animal portraits.
              </p>
            </div>
          </motion.div>

          {/* Column 2: Navigation Links */}
          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-4">
            <h3 className="font-mono text-xs tracking-widest text-[#C5A880] uppercase">
              Explore
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                { label: 'Portfolio', href: '#portfolio-gallery' },
                { label: 'Available Flash', href: '#flash-showcase' },
                { label: 'Booking & Policies', href: '#booking-policies' },
                { label: 'About Artist', href: '#about-artist' },
                { label: 'Aftercare & FAQs', href: '#aftercare-faqs' },
              ].map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-[#F5F5F3]/70 hover:text-[#C5A880] transition-colors duration-200 font-light focus:outline-none focus:text-[#C5A880]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Safe Space Guarantee & Studio Info */}
          <motion.div variants={itemVariants} className="lg:col-span-3 space-y-4">
            <h3 className="font-mono text-xs tracking-widest text-[#C5A880] uppercase">
              Studio Environment
            </h3>
            <p className="text-sm text-[#F5F5F3]/70 font-light leading-relaxed">
              My practice is a guaranteed safe space for all body types, skin tones, ages, and gender identities. I operate a quiet, private studio space built around focus, comfort, and direct one-on-one collaboration.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#F5F5F3]/40 font-mono">
              <svg className="w-4 h-4 text-[#889E81]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
              </svg>
              <span>100% Single-Use Sterile Supplies</span>
            </div>
          </motion.div>

          {/* Column 4: Contact & Expectations */}
          <motion.div variants={itemVariants} className="lg:col-span-3 space-y-4">
            <h3 className="font-mono text-xs tracking-widest text-[#C5A880] uppercase">
              Inquiries &amp; Contact
            </h3>
            <div className="space-y-3 text-sm">
              <p className="text-[#F5F5F3]/70 font-light leading-relaxed">
                Have a question or need to follow up on a submission? Reach out directly via email:
              </p>
              <a 
                href="mailto:jake@llewellyntattoo.com"
                className="inline-flex items-center gap-2 text-sm text-[#C5A880] hover:underline focus:outline-none focus:text-[#b0936d] font-mono break-all"
              >
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0l-7.5-4.615a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                jake@llewellyntattoo.com
              </a>
              <div className="pt-2 border-t border-[#1C1C1E] text-xs text-[#F5F5F3]/50 font-light leading-relaxed">
                <span className="text-[#C5A880] font-medium block mb-1">Response Guarantee:</span>
                I review all submissions personally and respond within 5 business days.
              </div>
            </div>
          </motion.div>

        </div>
      </motion.div>

      {/* 3. Bottom Legal & Back to Top */}
      <div className="bg-[#0B0B0B] py-8 border-t border-[#1C1C1E]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 text-xs text-[#F5F5F3]/40 font-mono text-center md:text-left">
            <span>© 2025 Jake Llewellyn. All rights reserved.</span>
            <span className="hidden md:inline text-[#1C1C1E]">•</span>
            <span>Private Studio • Portland, OR</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={handleScrollToTop}
              className="group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#F5F5F3]/50 hover:text-[#C5A880] transition-colors duration-200 focus:outline-none"
              aria-label="Back to top"
            >
              <span>Back to top</span>
              <svg 
                className="w-4 h-4 transform group-hover:-translate-y-0.5 transition-transform duration-200" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}