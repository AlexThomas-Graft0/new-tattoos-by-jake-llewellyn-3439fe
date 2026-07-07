'use client';

import React, { useState } from 'react';
import { motion, type Variants } from 'framer-motion';

interface Step {
  number: string;
  title: string;
  desc: string;
}

const steps: Step[] = [
  {
    number: "01",
    title: "The Inquiry Form",
    desc: "Submit a detailed request through our online form. You'll share your concept, desired size, body placement, and reference photos. This ensures we are aligned before we talk details."
  },
  {
    number: "02",
    title: "Review & Quote",
    desc: "I review all inquiries once a week. If your project fits my style, I’ll reach out via email with an estimated price range, time commitment, and a private booking link to choose your appointment."
  },
  {
    number: "03",
    title: "Deposit & Booking",
    desc: "To secure your date, a non-refundable deposit of $100 is required. This deposit goes directly toward the final cost of your tattoo on the day of your session."
  },
  {
    number: "04",
    title: "Design & Revision",
    desc: "For custom pieces, I will show you your custom design draft at the start of your appointment. We can make small adjustments together during our setup time to ensure it fits perfectly."
  },
  {
    number: "05",
    title: "The Session",
    desc: "We’ll meet at our clean, professional, and quiet studio space. We work at your pace, take breaks whenever you need, and focus completely on your comfort and peace of mind."
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 60, damping: 15 }
  }
};

const pulseVariants: Variants = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export function BookingPolicies() {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section 
      id="booking-policies" 
      className="relative bg-[#121212] py-24 lg:py-32 text-[#F5F5F3] overflow-hidden font-sans select-none"
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(197,168,128,0.05),transparent_45%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(136,158,129,0.03),transparent_40%)] pointer-events-none" />
      
      {/* Subtle fine-line geometric pattern */}
      <div className="absolute top-1/4 right-10 w-72 h-72 border border-[#C5A880]/10 rounded-full pointer-events-none hidden lg:block" />
      <div className="absolute top-1/4 right-10 w-48 h-48 border border-[#C5A880]/5 rounded-full pointer-events-none hidden lg:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* SECTION HEADER */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-20 lg:mb-28"
        >
          <span className="text-[#C5A880] text-xs font-mono tracking-[0.25em] uppercase block mb-3">
            Your Journey & Standards
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-[#F5F5F3] tracking-tight mb-6">
            Booking Process & Studio Policies
          </h2>
          <div className="w-12 h-[1px] bg-[#C5A880] mx-auto mb-6" />
          <p className="text-base md:text-lg text-[#F5F5F3]/70 font-light leading-relaxed">
            Clear boundaries make for a beautiful experience. Please read through my booking guidelines, pricing structure, and studio standards before submitting your inquiry.
          </p>
        </motion.div>

        {/* STEP-BY-STEP PROCESS */}
        <div className="mb-24 lg:mb-36">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 border-b border-[#F5F5F3]/10 pb-6">
            <div>
              <h3 className="text-2xl font-serif font-medium text-[#F5F5F3]">
                Collaborative Client Path
              </h3>
              <p className="text-[#F5F5F3]/50 text-sm mt-1">From initial spark to healed canvas</p>
            </div>
            {/* Step indicators */}
            <div className="flex gap-2 mt-4 md:mt-0 font-mono text-xs">
              {steps.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`w-8 h-8 rounded-full border transition-all duration-300 flex items-center justify-center ${
                    activeStep === idx 
                      ? 'bg-[#C5A880] border-[#C5A880] text-[#121212]' 
                      : 'border-[#F5F5F3]/20 text-[#F5F5F3]/60 hover:border-[#C5A880]/50'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Interactive Steps Visualizer */}
            <div className="lg:col-span-5 space-y-3">
              {steps.map((step, idx) => (
                <div
                  key={step.number}
                  onClick={() => setActiveStep(idx)}
                  className={`p-6 rounded-lg transition-all duration-300 cursor-pointer border ${
                    activeStep === idx
                      ? 'bg-[#1C1C1E] border-[#C5A880] shadow-xl shadow-black/30'
                      : 'bg-transparent border-transparent hover:bg-[#1C1C1E]/40'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`font-mono text-sm tracking-wider ${activeStep === idx ? 'text-[#C5A880]' : 'text-[#F5F5F3]/30'}`}>
                      {step.number}
                    </span>
                    <h4 className={`text-lg font-serif transition-colors ${activeStep === idx ? 'text-[#F5F5F3]' : 'text-[#F5F5F3]/60'}`}>
                      {step.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>

            {/* Step Detail Display */}
            <div className="lg:col-span-7 bg-[#1C1C1E] p-8 md:p-12 rounded-xl border border-[#F5F5F3]/10 relative overflow-hidden min-h-[320px] flex flex-col justify-between">
              <div className="absolute top-0 right-0 p-8 text-8xl font-serif font-black text-[#F5F5F3]/5 select-none pointer-events-none">
                {steps[activeStep].number}
              </div>
              
              <div>
                <span className="text-[#C5A880] font-mono text-xs tracking-widest uppercase block mb-2">
                  Step {steps[activeStep].number} Details
                </span>
                <h4 className="text-2xl md:text-3xl font-serif font-light text-[#F5F5F3] mb-6">
                  {steps[activeStep].title}
                </h4>
                <p className="text-[#F5F5F3]/80 leading-relaxed text-base md:text-lg font-light">
                  {steps[activeStep].desc}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-[#F5F5F3]/10 flex items-center justify-between">
                <span className="text-xs text-[#F5F5F3]/40 font-mono">
                  {activeStep + 1} of {steps.length}
                </span>
                <div className="flex gap-4">
                  <button 
                    disabled={activeStep === 0}
                    onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
                    className="text-xs font-mono uppercase tracking-wider text-[#F5F5F3]/60 hover:text-[#C5A880] disabled:opacity-30 disabled:hover:text-[#F5F5F3]/60 transition-colors"
                  >
                    &larr; Prev
                  </button>
                  <button 
                    disabled={activeStep === steps.length - 1}
                    onClick={() => setActiveStep(prev => Math.min(steps.length - 1, prev + 1))}
                    className="text-xs font-mono uppercase tracking-wider text-[#C5A880] hover:text-[#F5F5F3] disabled:opacity-30 disabled:hover:text-[#C5A880] transition-colors"
                  >
                    Next &rarr;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PRICING & DEPOSIT POLICY (Cream background with dark text) */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="bg-[#F5F5F3] text-[#121212] rounded-2xl overflow-hidden shadow-2xl mb-24 lg:mb-32 grid grid-cols-1 lg:grid-cols-12"
        >
          {/* Left Column: Hourly & Flat */}
          <div className="p-8 md:p-12 lg:p-16 lg:col-span-6 border-b lg:border-b-0 lg:border-r border-[#121212]/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#C5A880]" />
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#121212]/60">Rates & Fees</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-serif font-light tracking-tight mb-8">
                Hourly & Flat Rates
              </h3>
              
              <ul className="space-y-8">
                <li className="border-b border-[#121212]/10 pb-4">
                  <div className="flex justify-between items-baseline mb-2">
                    <h4 className="font-serif text-lg font-medium">Custom Work</h4>
                    <span className="font-mono text-lg text-[#C5A880] font-semibold">$150 / hr</span>
                  </div>
                  <p className="text-sm text-[#121212]/70 font-light">
                    Minimum charge of 1 hour. Time is calculated from skin contact to completion.
                  </p>
                </li>
                <li className="border-b border-[#121212]/10 pb-4">
                  <div className="flex justify-between items-baseline mb-2">
                    <h4 className="font-serif text-lg font-medium">Flash Designs</h4>
                    <span className="font-mono text-lg text-[#C5A880] font-semibold">Flat Rate</span>
                  </div>
                  <p className="text-sm text-[#121212]/70 font-light">
                    Priced individually (ranging from $200 - $600 depending on size and complexity).
                  </p>
                </li>
                <li>
                  <div className="flex justify-between items-baseline mb-2">
                    <h4 className="font-serif text-lg font-medium">No Hidden Fees</h4>
                    <span className="font-mono text-xs uppercase tracking-widest bg-[#121212]/10 text-[#121212] px-2 py-1 rounded">Guaranteed</span>
                  </div>
                  <p className="text-sm text-[#121212]/70 font-light">
                    The price we agree on before we start is the price you pay. All setup and cleanup costs are integrated.
                  </p>
                </li>
              </ul>
            </div>
            
            <div className="mt-12 pt-6 border-t border-[#121212]/10">
              <p className="text-xs text-[#121212]/50 font-mono">
                * Note: Consultations and initial sketches are always free.
              </p>
            </div>
          </div>

          {/* Right Column: Deposits */}
          <div className="p-8 md:p-12 lg:p-16 lg:col-span-6 flex flex-col justify-between bg-[#F1F1EE]">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#121212]/40" />
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#121212]/60">Securing Your Date</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-serif font-light tracking-tight mb-8">
                Deposit Guidelines
              </h3>

              <div className="space-y-8">
                <div className="bg-[#121212]/5 p-6 rounded-lg border border-[#121212]/5">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#121212]/50 block mb-1">Required Amount</span>
                  <div className="text-3xl font-serif font-bold text-[#121212] mb-2">$100</div>
                  <p className="text-sm text-[#121212]/70 font-light">
                    For all appointments. This deposit goes directly toward the final cost of your tattoo on the day of your session.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-4 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C5A880] mt-2 shrink-0" />
                    <div>
                      <h4 className="font-serif font-medium text-base text-[#121212]">Non-Refundable</h4>
                      <p className="text-sm text-[#121212]/70 font-light">
                        Deposure secure your calendar slot and pay for design time. They are non-refundable.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C5A880] mt-2 shrink-0" />
                    <div>
                      <h4 className="font-serif font-medium text-base text-[#121212]">Rescheduling Policy</h4>
                      <p className="text-sm text-[#121212]/70 font-light">
                        You may reschedule your appointment up to 48 hours in advance without losing your deposit. Cancellations or rescheduling inside of the 48-hour window will forfeit your deposit, and a new deposit will be required to book again.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-6 border-t border-[#121212]/10">
              <span className="text-xs text-[#121212]/60 font-mono flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#889E81]" /> All transactions processed securely.
              </span>
            </div>
          </div>
        </motion.div>

        {/* STUDIO BOUNDARIES & INCLUSIVITY STANDARDS */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="bg-[#1C1C1E] rounded-xl border border-[#F5F5F3]/10 p-8 md:p-12 lg:p-16 mb-24 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle_at_center,rgba(136,158,129,0.06),transparent_60%)] pointer-events-none" />
          
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <motion.span 
                variants={pulseVariants}
                animate="animate"
                className="w-2.5 h-2.5 rounded-full bg-[#889E81]" 
              />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#889E81]">
                Safe Studio Guarantee
              </span>
            </div>
            
            <h3 className="text-3xl md:text-4xl font-serif font-light text-[#F5F5F3] mb-6">
              Our Safe Studio Guarantee
            </h3>
            
            <p className="text-[#F5F5F3]/80 font-light text-base md:text-lg leading-relaxed mb-12">
              My practice is a guaranteed safe space for all body types, skin tones, ages, and gender identities. I prioritize bodily autonomy and comfort above all else:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-[#F5F5F3]/10">
            <motion.div variants={itemVariants} className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#889E81]/10 flex items-center justify-center text-[#889E81] mb-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h4 className="font-serif text-lg text-[#F5F5F3]">Color Swatches</h4>
              <p className="text-sm text-[#F5F5F3]/60 font-light leading-relaxed">
                If you are unsure how specific ink tones will look on your skin, I offer free, small color/line test swatches to see how they heal.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#889E81]/10 flex items-center justify-center text-[#889E81] mb-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              <h4 className="font-serif text-lg text-[#F5F5F3]">Stencils & Placement</h4>
              <p className="text-sm text-[#F5F5F3]/60 font-light leading-relaxed">
                We will place and adjust your stencil as many times as it takes for you to feel entirely confident. You have the right to change your mind.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#889E81]/10 flex items-center justify-center text-[#889E81] mb-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                </svg>
              </div>
              <h4 className="font-serif text-lg text-[#F5F5F3]">Quiet Sessions</h4>
              <p className="text-sm text-[#F5F5F3]/60 font-light leading-relaxed">
                If you prefer a quiet, low-interaction session to help manage anxiety or sensory needs, simply let me know. There is never any pressure to make small talk.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* BOTTOM ACTION BAR */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#1C1C1E] border border-[#C5A880]/30 rounded-xl p-8 md:p-12 text-center max-w-4xl mx-auto relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(197,168,128,0.08),transparent_70%)] pointer-events-none" />
          
          <h4 className="text-xl md:text-2xl font-serif text-[#F5F5F3] mb-4">
            Ready to collaborate?
          </h4>
          <p className="text-sm md:text-base text-[#F5F5F3]/70 font-light max-w-xl mx-auto mb-8">
            Ensure you have read and agreed to the policies above before continuing to the inquiry form.
          </p>
          
          <motion.a 
            href="#inquiry-form"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block bg-[#C5A880] text-[#121212] font-mono text-xs uppercase tracking-[0.2em] font-semibold px-8 py-4 rounded-md shadow-lg shadow-[#C5A880]/10 hover:bg-[#c5a880]/90 transition-colors duration-300"
          >
            Proceed to Booking Inquiry Form
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}