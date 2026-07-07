'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

// --- Types & Interfaces ---
interface HealingStage {
  id: string;
  title: string;
  timeframe: string;
  icon: React.ReactNode;
  content: string[];
}

interface FaqItem {
  id: string;
  category: 'preparation' | 'pain' | 'longevity';
  question: string;
  answer: string;
}

// --- Icons (SVG Inline Components for bulletproof builds) ---
const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21L8.188 15.904L3 15L8.188 14.096L9 9L9.813 14.096L15 15L9.813 15.904Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.071 4.929a10 10 0 00-14.142 0M19.071 4.929a10 10 0 010 14.142M4.929 4.929a10 10 0 000 14.142" />
  </svg>
);

const DropletIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 13.5a2.25 2.25 0 002.25-2.25c0-1.11-.45-2.12-1.17-2.83" />
  </svg>
);

const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
  </svg>
);

const AlertIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
  </svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

// --- Framer Motion Animation Settings ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 15 }
  }
};

const accordionVariants: Variants = {
  collapsed: { opacity: 0, height: 0, overflow: 'hidden' },
  expanded: { opacity: 1, height: 'auto', overflow: 'visible', transition: { height: { duration: 0.3 }, opacity: { duration: 0.2, delay: 0.05 } } }
};

export function AftercareFaqs() {
  // State for Accordions & FAQ Filter
  const [activeFaqCategory, setActiveFaqCategory] = useState<'preparation' | 'pain' | 'longevity'>('preparation');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(null);
  const [activeStageId, setActiveStageId] = useState<string>('stage-1');

  // --- Healing Guide Data ---
  const healingStages: HealingStage[] = [
    {
      id: 'stage-1',
      title: 'The Protective Wrap',
      timeframe: 'The First 24 Hours',
      icon: <ShieldIcon />,
      content: [
        'Keep the protective adhesive bandage (Saniderm/second skin) on your tattoo for 24 hours.',
        'It is completely normal for blood, plasma, and ink to pool beneath the bandage. It might look messy, but this fluid is actually helping your skin heal.',
        'If the bandage leaks fluid or peels back to expose the tattoo, remove it immediately and wash the area gently.'
      ]
    },
    {
      id: 'stage-2',
      title: 'The Washing & Moisturizing Phase',
      timeframe: 'Days 2 through 14',
      icon: <DropletIcon />,
      content: [
        'Wash: Gently wash the tattoo twice a day using warm water and a mild, fragrance-free liquid soap (like Dr. Bronner\'s Baby Mild or Cetaphil). Use your clean hands only—do not use washcloths, loofahs, or sponges.',
        'Dry: Pat the area dry using a clean, fresh paper towel. Do not rub.',
        'Moisturize: Apply a very thin layer of fragrance-free, water-based lotion (like Lubriderm or Aveeno) twice a day. Do not use heavy ointments like Vaseline or Aquaphor, as they block oxygen and can trap bacteria.'
      ]
    },
    {
      id: 'stage-3',
      title: 'The Flaking Phase',
      timeframe: 'Days 14+',
      icon: <SparklesIcon />,
      content: [
        'As your tattoo heals, it will begin to peel and flake, much like a mild sunburn. It may also get very itchy.',
        'Do not scratch, pick, or peel the flaking skin. Doing so can pull the ink out of the deeper layers of skin and ruin the details of your tattoo. Let the dead skin flake off naturally.'
      ]
    },
    {
      id: 'stage-4',
      title: 'What to Avoid',
      timeframe: 'The First 3 Weeks',
      icon: <AlertIcon />,
      content: [
        'No Submerging: Avoid baths, hot tubs, swimming pools, lakes, and oceans. Showering is perfectly fine.',
        'No Direct Sun: Keep the healing tattoo out of direct sunlight. Once it is completely healed (after 4 weeks), always apply SPF 30 or higher sunscreen to protect the crispness of the lines.',
        'No Tight Clothing: Avoid wearing tight, abrasive clothing directly over the fresh tattoo.'
      ]
    }
  ];

  // --- FAQ Data ---
  const faqItems: FaqItem[] = [
    {
      id: 'prep-1',
      category: 'preparation',
      question: 'How should I prepare for my tattoo session?',
      answer: 'Get a solid 8 hours of sleep the night before your appointment. Eat a hearty, balanced meal 1-2 hours before arriving, and stay hydrated. Do not drink alcohol or consume blood-thinning medications (like aspirin) 24 hours before your session. Wear comfortable clothing that allows easy, relaxed access to the area we are tattooing.'
    },
    {
      id: 'prep-2',
      category: 'preparation',
      question: 'Can I bring a friend with me to my appointment?',
      answer: 'Because my studio is a quiet, focused, and intimate space, I ask that you limit your guests to one person. Please let me know in advance if you plan to bring someone along so I can prepare the seating area.'
    },
    {
      id: 'pain-1',
      category: 'pain',
      question: 'Does it hurt? What can I do to manage the discomfort?',
      answer: 'Tattooing does involve some discomfort, but it is highly manageable. Most clients describe it as a warm, scratchy sensation. Breathing steadily, staying hydrated, and staying relaxed helps immensely. We can take breaks whenever you need to stretch or drink water.'
    },
    {
      id: 'pain-2',
      category: 'pain',
      question: 'Can I use numbing cream before my session?',
      answer: 'Please contact me before applying any numbing cream. Many over-the-counter creams can negatively affect the texture of your skin, making it difficult to ink, and can sometimes cause the tattoo to heal poorly. If we agree to use it, it must be applied correctly under my guidance.'
    },
    {
      id: 'long-1',
      category: 'longevity',
      question: 'Do you offer touch-ups?',
      answer: 'Yes! I offer one free touch-up session within the first year of your tattoo if it is needed. Touch-ups are only free if you have carefully followed my aftercare instructions during the initial healing process. (Please note: Touch-ups on hands and feet are subject to a small materials fee due to the natural wear and tear of those areas).'
    },
    {
      id: 'long-2',
      category: 'longevity',
      question: 'How will my illustrative line-art age over time?',
      answer: 'All tattoos age and soften over time as skin cells naturally regenerate. To keep your lines crisp and prevent fading, always protect your healed tattoo with a high-quality sunscreen whenever you are outdoors.'
    }
  ];

  const filteredFaqs = faqItems.filter(item => item.category === activeFaqCategory);

  const toggleFaq = (id: string) => {
    setExpandedFaqId(prev => (prev === id ? null : id));
  };

  return (
    <section 
      id="aftercare-faqs" 
      className="relative bg-[#121212] text-[#F5F5F3] py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Decorative Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-5 mix-blend-overlay">
        <img 
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=1600" 
          alt="Dark Ink Texture Background" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#121212] via-transparent to-[#121212] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- Header Section --- */}
        <div className="text-center md:text-left mb-16 max-w-3xl">
          <span className="text-xs font-mono tracking-[0.2em] text-[#C5A880] uppercase block mb-3">
            Preserve Your Art
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-light tracking-tight text-[#F5F5F3] mb-6">
            Aftercare Instructions & FAQs
          </h2>
          <p className="text-base sm:text-lg text-neutral-400 font-sans leading-relaxed">
            How your tattoo heals is just as important as how it is applied. Follow this step-by-step healing guide and find answers to common questions about your upcoming session.
          </p>
        </div>

        {/* --- Two Column Layout: Healing Guide vs. FAQs --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
          
          {/* LEFT: Healing Guide Step-by-Step */}
          <div className="lg:col-span-6 bg-[#1C1C1E] rounded-2xl border border-neutral-800/60 p-6 sm:p-8 lg:p-10 shadow-2xl">
            <div className="flex items-center space-x-3 mb-8">
              <span className="p-2 rounded-lg bg-neutral-900 text-[#C5A880] border border-neutral-800">
                <SparklesIcon />
              </span>
              <h3 className="text-xl sm:text-2xl font-serif text-[#F5F5F3]">The Healing Guide</h3>
            </div>

            {/* Stepper Header Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8">
              {healingStages.map((stage, idx) => (
                <button
                  key={stage.id}
                  onClick={() => setActiveStageId(stage.id)}
                  className={`relative p-3 rounded-xl border text-left transition-all duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C5A880] ${
                    activeStageId === stage.id
                      ? 'bg-neutral-900 border-[#C5A880] text-[#F5F5F3]'
                      : 'bg-neutral-900/50 border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-neutral-300'
                  }`}
                  aria-label={`View stage ${idx + 1}: ${stage.title}`}
                >
                  <span className="block text-[10px] font-mono uppercase tracking-wider text-[#C5A880] mb-1">
                    Stage 0{idx + 1}
                  </span>
                  <span className="block text-xs font-semibold truncate">
                    {stage.id === 'stage-4' ? 'Avoid' : stage.timeframe.split(' ')[1] === 'First' ? '24 Hours' : stage.timeframe}
                  </span>
                </button>
              ))}
            </div>

            {/* Stepper Content Display */}
            <AnimatePresence mode="wait">
              {healingStages.map((stage) => {
                if (stage.id !== activeStageId) return null;
                return (
                  <motion.div
                    key={stage.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between border-b border-neutral-800/80 pb-4">
                      <div>
                        <h4 className="text-lg font-serif text-[#C5A880] font-medium">{stage.title}</h4>
                        <p className="text-xs font-mono text-neutral-400 mt-1 uppercase tracking-widest">{stage.timeframe}</p>
                      </div>
                      <span className="text-neutral-500">
                        {stage.icon}
                      </span>
                    </div>

                    <ul className="space-y-4">
                      {stage.content.map((paragraph, index) => (
                        <li key={index} className="flex items-start space-x-3 text-sm sm:text-base text-neutral-300 leading-relaxed">
                          <span className="text-[#C5A880] mt-1.5 flex-shrink-0">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </span>
                          <span>{paragraph}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* RIGHT: Frequently Asked Questions */}
          <div className="lg:col-span-6 bg-[#1C1C1E] rounded-2xl border border-neutral-800/60 p-6 sm:p-8 lg:p-10 shadow-2xl">
            <div className="flex items-center space-x-3 mb-8">
              <span className="p-2 rounded-lg bg-neutral-900 text-[#C5A880] border border-neutral-800">
                <CalendarIcon />
              </span>
              <h3 className="text-xl sm:text-2xl font-serif text-[#F5F5F3]">Common Questions</h3>
            </div>

            {/* Category Switcher Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-neutral-800/80 pb-4 mb-6">
              {[
                { id: 'preparation', label: 'Prep & Planning' },
                { id: 'pain', label: 'Pain & Comfort' },
                { id: 'longevity', label: 'Touch-Ups & Aging' }
              ].map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setActiveFaqCategory(category.id as any);
                    setExpandedFaqId(null);
                  }}
                  className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C5A880] ${
                    activeFaqCategory === category.id
                      ? 'bg-[#C5A880] text-[#121212] font-semibold'
                      : 'text-neutral-400 hover:text-[#F5F5F3] hover:bg-neutral-900'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* FAQ Accordion List */}
            <motion.div 
              layout 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {filteredFaqs.map((faq) => {
                const isExpanded = expandedFaqId === faq.id;
                return (
                  <motion.div
                    key={faq.id}
                    variants={itemVariants}
                    className="border-b border-neutral-800 last:border-0 pb-4"
                  >
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full flex justify-between items-center text-left py-3 group focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C5A880] rounded"
                      aria-expanded={isExpanded}
                    >
                      <span className="text-sm sm:text-base font-serif font-medium text-[#F5F5F3] group-hover:text-[#C5A880] transition-colors duration-200 pr-4">
                        {faq.question}
                      </span>
                      <span className={`transform transition-transform duration-300 text-neutral-400 group-hover:text-[#C5A880] flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`}>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          key="content"
                          initial="collapsed"
                          animate="expanded"
                          exit="collapsed"
                          variants={accordionVariants}
                        >
                          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed pt-2 pb-4">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

        </div>

        {/* --- Bottom Conversion / Sticky Footer Banner --- */}
        <div className="relative rounded-2xl overflow-hidden border border-[#C5A880]/30 bg-[#1C1C1E] p-8 md:p-12 shadow-2xl">
          {/* Subtle Graphic Element */}
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#C5A880]/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl text-center md:text-left">
              <h3 className="text-2xl sm:text-3xl font-serif text-[#F5F5F3] tracking-tight mb-3">
                Ready to start your next tattoo project?
              </h3>
              <p className="text-sm text-neutral-400 font-sans leading-relaxed">
                Whether you have a fully formed custom concept or want to claim a pre-drawn flash piece, let’s design something unique for your skin.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <a
                href="#inquiry-form"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-[#C5A880] text-neutral-950 font-sans font-semibold text-sm tracking-wide transition-all duration-300 hover:bg-[#b0936e] active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#C5A880]/50"
              >
                Inquire Now
              </a>
              <a
                href="#flash-showcase"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl border border-neutral-700 hover:border-[#F5F5F3] text-[#F5F5F3] font-sans font-semibold text-sm tracking-wide transition-all duration-300 hover:bg-[#F5F5F3] hover:text-[#121212] active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#F5F5F3]/30"
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