'use client';

import { motion, type Variants } from 'framer-motion';

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
      stiffness: 60,
      damping: 15,
    },
  },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export function AboutArtist() {
  return (
    <section
      id="about-artist"
      className="relative bg-[#121212] text-[#F5F5F3] py-24 md:py-32 overflow-hidden selection:bg-[#C5A880] selection:text-[#121212]"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A880] opacity-[0.02] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#889E81] opacity-[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className="text-center max-w-3xl mx-auto mb-16 md:mb-24"
        >
          <motion.span
            variants={itemVariants}
            className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-mono font-semibold"
          >
            Behind The Needle
          </motion.span>
          <motion.h2
            variants={itemVariants}
            className="mt-3 text-4xl md:text-5xl lg:text-6xl font-serif font-light leading-tight tracking-tight"
          >
            Meet Jake Llewellyn
          </motion.h2>
          <motion.div
            variants={itemVariants}
            className="mt-6 w-16 h-[1px] bg-[#C5A880]/40 mx-auto"
          />
          <motion.p
            variants={itemVariants}
            className="mt-6 text-lg md:text-xl text-[#F5F5F3]/70 font-light font-serif italic leading-relaxed"
          >
            Behind the ink: A dedication to draftsmanship, safety, and a premium tattooing experience.
          </motion.p>
        </motion.div>

        {/* Profile Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center mb-24 md:mb-32">
          {/* Left Column: Portrait */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={imageVariants}
            className="lg:col-span-5 xl:col-span-5 relative group"
          >
            <div className="absolute inset-0 border border-[#C5A880]/20 translate-x-4 translate-y-4 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2 pointer-events-none rounded-sm" />
            <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-[#1C1C1E] border border-white/5">
              <img
                src="https://images.unsplash.com/photo-1605497746444-ac9dbd3d4401?q=80&w=1200&auto=format&fit=crop"
                alt="Portrait of tattoo artist Jake Llewellyn working in a clean studio"
                className="w-full h-full object-cover filter grayscale contrast-115 transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/80 via-transparent to-transparent opacity-60" />
            </div>
            
            {/* Signature Floating Detail */}
            <div className="absolute -bottom-6 -right-4 bg-[#1C1C1E] border border-[#C5A880]/30 py-3 px-6 shadow-2xl rounded-sm backdrop-blur-sm hidden sm:block">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#C5A880] font-mono">ESTABLISHED</p>
              <p className="text-sm font-serif text-[#F5F5F3] font-semibold mt-0.5">Portland, Oregon</p>
            </div>
          </motion.div>

          {/* Right Column: Narrative */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
            className="lg:col-span-7 xl:col-span-7 flex flex-col justify-center space-y-6 md:space-y-8"
          >
            <motion.h3
              variants={itemVariants}
              className="text-2xl md:text-3xl font-serif text-[#C5A880] font-light"
            >
              The Philosophy of Permanent Craft
            </motion.h3>

            <motion.div
              variants={itemVariants}
              className="space-y-6 text-[#F5F5F3]/80 font-sans font-light leading-relaxed text-base md:text-lg"
            >
              <p>
                I have always believed that tattoos are more than decoration—they are a collaborative ritual that helps us inhabit our bodies more deeply.
              </p>
              <p>
                My journey into tattooing began with a deep love for classic pen-and-ink illustrations, botanical etchings, and printmaking techniques. I transitioned those traditional art disciplines onto the skin, focusing on clean line-art, intricate dotwork, and deep illustrative blackwork.
              </p>
              <p>
                As a solo artist, I’ve intentionally structured my practice to step away from the loud, intimidating atmosphere of traditional street shops. Instead, I operate a private, quiet space built around focus, comfort, and one-on-one collaboration.
              </p>
              <p className="text-[#F5F5F3] font-medium">
                When you sit in my chair, you are getting my complete, undivided attention. No rushed designs, no distractions. Just high-quality, custom craft meant to last a lifetime.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-4">
              <a
                href="#inquiry-form"
                className="inline-flex items-center text-xs uppercase tracking-[0.2em] font-mono font-medium text-[#C5A880] hover:text-[#F5F5F3] transition-colors duration-300 group"
              >
                Inquire About a Custom Design
                <svg
                  className="ml-2 w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Core Values Section */}
        <div className="border-t border-white/5 pt-20 md:pt-28">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
            className="text-center max-w-xl mx-auto mb-16"
          >
            <motion.span
              variants={itemVariants}
              className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-mono font-semibold"
            >
              How I Work
            </motion.span>
            <motion.h3
              variants={itemVariants}
              className="mt-2 text-2xl md:text-3xl font-serif font-light"
            >
              My Core Studio Values
            </motion.h3>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
          >
            {/* Value 1 */}
            <motion.div
              variants={itemVariants}
              className="group bg-[#1C1C1E] border border-white/5 p-8 lg:p-10 rounded-sm hover:border-[#C5A880]/30 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-sm bg-[#121212] border border-[#C5A880]/20 flex items-center justify-center text-[#C5A880] mb-8 group-hover:border-[#C5A880]/50 transition-colors">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.2"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </div>
                <h4 className="text-lg font-serif font-normal text-[#C5A880] mb-4">
                  Respecting the Craft
                </h4>
                <p className="text-sm md:text-base text-[#F5F5F3]/70 font-light leading-relaxed">
                  I will never copy another tattoo artist’s work. Every design I apply is hand-drawn by me, tailored to you, and completely original. If you bring reference images, we will use them as inspiration to create something completely unique.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-white/5 text-[10px] tracking-widest font-mono text-white/25">
                VALUE 01
              </div>
            </motion.div>

            {/* Value 2 */}
            <motion.div
              variants={itemVariants}
              className="group bg-[#1C1C1E] border border-white/5 p-8 lg:p-10 rounded-sm hover:border-[#C5A880]/30 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-sm bg-[#121212] border border-[#C5A880]/20 flex items-center justify-center text-[#C5A880] mb-8 group-hover:border-[#C5A880]/50 transition-colors">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.2"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h4 className="text-lg font-serif font-normal text-[#C5A880] mb-4">
                  Cleanliness Without Compromise
                </h4>
                <p className="text-sm md:text-base text-[#F5F5F3]/70 font-light leading-relaxed">
                  Your health is paramount. I utilize 100% single-use, sterile, disposable needles and grips. My private studio exceeds all local health department standards, and I use only vegan-friendly, industry-standard inks and premium medical supplies.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-white/5 text-[10px] tracking-widest font-mono text-white/25">
                VALUE 02
              </div>
            </motion.div>

            {/* Value 3 */}
            <motion.div
              variants={itemVariants}
              className="group bg-[#1C1C1E] border border-white/5 p-8 lg:p-10 rounded-sm hover:border-[#C5A880]/30 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-sm bg-[#121212] border border-[#C5A880]/20 flex items-center justify-center text-[#C5A880] mb-8 group-hover:border-[#C5A880]/50 transition-colors">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.2"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <h4 className="text-lg font-serif font-normal text-[#C5A880] mb-4">
                  Clear Expectations
                </h4>
                <p className="text-sm md:text-base text-[#F5F5F3]/70 font-light leading-relaxed">
                  No secrets, no surprise fees, and no gatekeeping. From your initial form submission to the final aftercare step, I am here to guide you with direct, honest, and warm communication.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-white/5 text-[10px] tracking-widest font-mono text-white/25">
                VALUE 03
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}