'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

interface NavItem {
  label: string;
  href: string;
  sectionId: string;
}

const navItems: NavItem[] = [
  { label: 'Portfolio', href: '#portfolio-gallery', sectionId: 'portfolio-gallery' },
  { label: 'Available Flash', href: '#flash-showcase', sectionId: 'flash-showcase' },
  { label: 'Booking & Policies', href: '#booking-policies', sectionId: 'booking-policies' },
  { label: 'About', href: '#about-artist', sectionId: 'about-artist' },
  { label: 'FAQ', href: '#aftercare-faqs', sectionId: 'aftercare-faqs' }
];

const navVariants: Variants = {
  hidden: { y: -30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 15,
      mass: 1
    }
  }
};

const mobileMenuVariants: Variants = {
  closed: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.25,
      ease: [0.32, 0, 0.67, 0]
    }
  },
  open: {
    opacity: 1,
    height: 'auto',
    transition: {
      duration: 0.35,
      ease: [0.33, 1, 0.68, 1]
    }
  }
};

const linkVariants: Variants = {
  closed: { x: -10, opacity: 0 },
  open: (i: number) => ({
    x: 0,
    opacity: 1,
    transition: {
      delay: i * 0.05,
      type: 'spring',
      stiffness: 100,
      damping: 15
    }
  })
};

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Handle transparent to blurred background transition on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Monitor visible sections to set active state in Navbar
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -50% 0px',
      threshold: 0.1
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    navItems.forEach((item) => {
      const element = document.getElementById(item.sectionId);
      if (element) observer.observe(element);
    });

    // Also observe hero-section to clear active state when at top
    const heroElement = document.getElementById('hero-section');
    if (heroElement) observer.observe(heroElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      const offset = 80; // Offset for fixed navbar height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-sans border-b ${
        scrolled
          ? 'bg-[#121212]/95 backdrop-blur-md border-[#C5A880]/15 py-3 shadow-lg shadow-black/40'
          : 'bg-[#121212]/0 border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo Brand Block */}
          <div className="flex-shrink-0">
            <a
              href="#hero-section"
              onClick={(e) => handleLinkClick(e, '#hero-section')}
              className="group flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] rounded px-1"
              aria-label="Jake Llewellyn - Home"
            >
              <span className="font-serif text-xl sm:text-2xl font-normal tracking-wide text-[#F5F5F3] group-hover:text-[#C5A880] transition-colors duration-300">
                Jake Llewellyn
              </span>
              <span className="text-[9px] tracking-[0.25em] uppercase text-[#C5A880] font-medium leading-none mt-1">
                Illustrative & Blackwork
              </span>
            </a>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = activeSection === item.sectionId;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className={`relative text-xs uppercase tracking-[0.15em] font-medium py-2 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] rounded px-1.5 ${
                    isActive ? 'text-[#C5A880]' : 'text-[#F5F5F3]/70 hover:text-[#F5F5F3]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-1.5 right-1.5 h-[1.5px] bg-[#C5A880]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Accessories (Booking Status & CTA) */}
          <div className="hidden md:flex items-center gap-6">
            {/* Status Indicator Badge */}
            <div className="flex items-center gap-2 bg-[#889E81] text-[#121212] px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-wider uppercase select-none shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#121212] opacity-40"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#121212]"></span>
              </span>
              <span>Currently booking for next month</span>
            </div>

            {/* Primary Action Button */}
            <a
              href="#inquiry-form"
              onClick={(e) => handleLinkClick(e, '#inquiry-form')}
              className="border border-[#C5A880] text-[#F5F5F3] hover:bg-[#C5A880] hover:text-[#121212] transition-all duration-300 px-5 py-2.5 text-xs uppercase tracking-[0.15em] font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880] focus-visible:ring-offset-2 focus-visible:ring-offset-[#121212]"
            >
              Book a Session
            </a>
          </div>

          {/* Mobile Menu Trigger & Status Indicator Combined */}
          <div className="flex items-center gap-3 md:gap-4 lg:hidden">
            {/* Minimal Mobile Status Indicator (Just the green dot on very small screens) */}
            <div className="flex items-center gap-1.5 bg-[#889E81]/15 border border-[#889E81]/30 text-[#889E81] px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-[#889E81] animate-pulse"></span>
              <span className="hidden xs:inline">Booking Open</span>
            </div>

            {/* Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex flex-col items-center justify-center w-10 h-10 border border-[#F5F5F3]/10 hover:border-[#C5A880]/40 rounded-none bg-[#1C1C1E]/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              <div className="w-5 h-4 flex flex-col justify-between relative">
                <span
                  className={`w-full h-[1.5px] bg-[#F5F5F3] transition-all duration-300 origin-left ${
                    mobileMenuOpen ? 'rotate-45 translate-x-[3px] -translate-y-[1px]' : ''
                  }`}
                />
                <span
                  className={`w-full h-[1.5px] bg-[#F5F5F3] transition-all duration-200 ${
                    mobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`w-full h-[1.5px] bg-[#F5F5F3] transition-all duration-300 origin-left ${
                    mobileMenuOpen ? '-rotate-45 translate-x-[3px] translate-y-[2px]' : ''
                  }`}
                />
              </div>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className="lg:hidden w-full overflow-hidden bg-[#1C1C1E] border-t border-[#F5F5F3]/5 mt-3"
          >
            <div className="px-4 py-6 space-y-6 max-w-7xl mx-auto">
              {/* Navigation Links */}
              <nav className="flex flex-col space-y-4">
                {navItems.map((item, i) => {
                  const isActive = activeSection === item.sectionId;
                  return (
                    <motion.a
                      custom={i}
                      variants={linkVariants}
                      key={item.label}
                      href={item.href}
                      onClick={(e) => handleLinkClick(e, item.href)}
                      className={`text-sm uppercase tracking-[0.2em] font-medium py-1.5 border-l-2 pl-3 transition-colors ${
                        isActive
                          ? 'border-[#C5A880] text-[#C5A880]'
                          : 'border-transparent text-[#F5F5F3]/70 hover:text-[#F5F5F3] hover:border-[#F5F5F3]/20'
                      }`}
                    >
                      {item.label}
                    </motion.a>
                  );
                })}
              </nav>

              {/* Status and Action Buttons */}
              <motion.div
                custom={navItems.length}
                variants={linkVariants}
                className="pt-6 border-t border-[#F5F5F3]/5 flex flex-col gap-4"
              >
                <div className="flex items-center gap-2.5 bg-[#889E81] text-[#121212] px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase w-fit">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#121212] opacity-40"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#121212]"></span>
                  </span>
                  <span>Currently booking for next month</span>
                </div>

                <a
                  href="#inquiry-form"
                  onClick={(e) => handleLinkClick(e, '#inquiry-form')}
                  className="w-full text-center border border-[#C5A880] text-[#F5F5F3] hover:bg-[#C5A880] hover:text-[#121212] transition-all duration-300 py-3 text-xs uppercase tracking-[0.2em] font-semibold block"
                >
                  Book a Session
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}