'use client';

import React, { useState, useRef, type ChangeEvent } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

// Mock available flash data matching copy
const AVAILABLE_FLASH = [
  { id: 'FK-350', title: "The Scholar's Key", price: '$350', size: '5" to 6" height' },
  { id: 'WC-280', title: 'Wildflower Crescent', price: '$280', size: '4" x 4"' },
  { id: 'TW-550', title: 'Timberline Wolf', price: '$550', size: '7" height' },
];

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  pronouns: string;
  inquiryType: 'custom' | 'flash' | '';
  flashDesignId: string;
  concept: string;
  placement: string;
  estimatedSize: string;
  preferredDays: string[];
  termsAccepted: boolean;
}

const initialFormData: FormData = {
  fullName: '',
  email: '',
  phone: '',
  pronouns: '',
  inquiryType: '',
  flashDesignId: '',
  concept: '',
  placement: '',
  estimatedSize: '',
  preferredDays: [],
  termsAccepted: false,
};

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const stepVariants: Variants = {
  initial: { opacity: 0, x: 15 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    x: -15,
    transition: { duration: 0.3, ease: 'easeIn' },
  },
};

export function InquiryForm() {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; url: string; size: string }[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (day: string) => {
    setFormData((prev) => {
      const isSelected = prev.preferredDays.includes(day);
      const updatedDays = isSelected
        ? prev.preferredDays.filter((d) => d !== day)
        : [...prev.preferredDays, day];
      return { ...prev, preferredDays: updatedDays };
    });
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const newFiles = filesArray.map((file) => ({
        name: file.name,
        url: URL.createObjectURL(file),
        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
      }));
      setUploadedFiles((prev) => [...prev, ...newFiles].slice(0, 5));
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleNextStep = () => {
    if (validateStep()) {
      setStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const handlePrevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const validateStep = (): boolean => {
    if (step === 1) {
      return formData.fullName.trim() !== '' && formData.email.trim() !== '' && formData.phone.trim() !== '';
    }
    if (step === 2) {
      if (!formData.inquiryType) return false;
      if (formData.inquiryType === 'flash' && !formData.flashDesignId) return false;
      return formData.concept.trim() !== '';
    }
    if (step === 3) {
      return formData.placement.trim() !== '' && formData.estimatedSize.trim() !== '' && formData.preferredDays.length > 0;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.termsAccepted) return;

    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setStep(5);
    }, 1500);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <section
      id="inquiry-form"
      className="relative min-h-screen bg-[#121212] py-24 px-4 sm:px-6 lg:px-8 overflow-hidden font-sans text-[#F5F5F3]"
    >
      {/* Background Decorative Accents */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10">
        <div className="absolute top-10 left-10 w-96 h-96 bg-[#C5A880] rounded-full filter blur-[120px]" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#889E81] rounded-full filter blur-[120px]" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header Block */}
        <div className="text-center mb-16">
          <span className="text-[#C5A880] text-xs font-semibold tracking-[0.25em] uppercase block mb-3">
            Digital Consultation
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-light text-[#F5F5F3] tracking-tight mb-4">
            Submit a Booking Request
          </h2>
          <p className="max-w-2xl mx-auto text-[#F5F5F3]/70 text-sm md:text-base leading-relaxed">
            Please fill out this form as accurately as possible. The details you provide here help me understand your
            vision, estimate the price, and prepare your design.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Instructions / Status Card */}
          <div className="lg:col-span-4 space-y-6">
            {/* Live Status Badge */}
            <div className="bg-[#1C1C1E] border border-[#C5A880]/20 rounded-xl p-6 shadow-xl">
              <div className="flex items-center space-x-3 mb-4">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#889E81] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#889E81]"></span>
                </span>
                <span className="text-[#889E81] text-xs font-semibold tracking-wider uppercase">
                  Accepting New Project Inquiries
                </span>
              </div>
              <h4 className="text-[#F5F5F3] font-serif text-lg mb-2">Current Booking Focus</h4>
              <p className="text-[#F5F5F3]/70 text-xs md:text-sm leading-relaxed mb-4">
                Right now, I am prioritizing large-scale illustrative blackwork, botanical compositions, and fine-line
                animal portraits.
              </p>
              <div className="text-xs text-[#C5A880] border-t border-[#F5F5F3]/10 pt-4 flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Average response time: 5 business days</span>
              </div>
            </div>

            {/* Step Progress Tracker */}
            {!isSubmitted && (
              <div className="bg-[#1C1C1E] border border-[#F5F5F3]/5 rounded-xl p-6 shadow-xl hidden md:block">
                <h4 className="text-[#F5F5F3] text-xs font-semibold uppercase tracking-wider mb-6 text-[#C5A880]">
                  Your Journey
                </h4>
                <div className="space-y-6">
                  {[
                    { num: 1, name: 'Contact Info', desc: 'Who we are talking to' },
                    { num: 2, name: 'Concept & Design', desc: 'Your creative vision' },
                    { num: 3, name: 'Placement & Dates', desc: 'Where, how big, and when' },
                    { num: 4, name: 'Review & Submit', desc: 'Confirm your details' },
                  ].map((s) => (
                    <div key={s.num} className="flex items-start space-x-4">
                      <div
                        className={`flex items-center justify-center w-8 h-8 rounded-full border text-xs font-mono transition-all duration-300 ${
                          step === s.num
                            ? 'bg-[#C5A880] text-[#121212] border-[#C5A880]'
                            : step > s.num
                            ? 'bg-[#889E81]/20 text-[#889E81] border-[#889E81]'
                            : 'bg-transparent text-[#F5F5F3]/40 border-[#F5F5F3]/10'
                        }`}
                      >
                        {step > s.num ? '✓' : s.num}
                      </div>
                      <div>
                        <p
                          className={`text-sm font-medium transition-colors ${
                            step === s.num ? 'text-[#F5F5F3]' : 'text-[#F5F5F3]/50'
                          }`}
                        >
                          {s.name}
                        </p>
                        <p className="text-xs text-[#F5F5F3]/30">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Interactive Multi-step Form Card */}
          <div className="lg:col-span-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="bg-[#1C1C1E] border border-[#F5F5F3]/5 rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Top Progress bar */}
              {!isSubmitted && (
                <div className="h-1.5 w-full bg-[#121212] relative">
                  <div
                    className="h-full bg-[#C5A880] transition-all duration-500 ease-out"
                    style={{ width: `${(step / 4) * 100}%` }}
                  />
                </div>
              )}

              <form onSubmit={handleSubmit} className="p-8 sm:p-10">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      variants={stepVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-2xl font-serif text-[#C5A880] mb-2">Step 1: Contact Information</h3>
                        <p className="text-sm text-[#F5F5F3]/60">
                          Let&apos;s start with the basics so I know how to reach you.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-[#F5F5F3]/80 mb-2">
                            Full Name <span className="text-[#C5A880]">*</span>
                          </label>
                          <input
                            type="text"
                            name="fullName"
                            required
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="e.g., Sarah Jenkins"
                            className="w-full bg-[#121212] border border-[#F5F5F3]/10 rounded-lg px-4 py-3 text-[#F5F5F3] placeholder-[#F5F5F3]/30 focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] transition-all text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-[#F5F5F3]/80 mb-2">
                            Email Address <span className="text-[#C5A880]">*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="e.g., sarah@example.com"
                            className="w-full bg-[#121212] border border-[#F5F5F3]/10 rounded-lg px-4 py-3 text-[#F5F5F3] placeholder-[#F5F5F3]/30 focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] transition-all text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-[#F5F5F3]/80 mb-2">
                            Phone Number <span className="text-[#C5A880]">*</span>
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="e.g., (555) 000-0000"
                            className="w-full bg-[#121212] border border-[#F5F5F3]/10 rounded-lg px-4 py-3 text-[#F5F5F3] placeholder-[#F5F5F3]/30 focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] transition-all text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-[#F5F5F3]/80 mb-2">
                            Preferred Pronouns (Optional)
                          </label>
                          <input
                            type="text"
                            name="pronouns"
                            value={formData.pronouns}
                            onChange={handleInputChange}
                            placeholder="e.g., she/her, they/them"
                            className="w-full bg-[#121212] border border-[#F5F5F3]/10 rounded-lg px-4 py-3 text-[#F5F5F3] placeholder-[#F5F5F3]/30 focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] transition-all text-sm"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      variants={stepVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-2xl font-serif text-[#C5A880] mb-2">Step 2: Project Type & Concept</h3>
                        <p className="text-sm text-[#F5F5F3]/60">
                          Are we bringing a custom design to life or locking down one of my pre-drawn pieces?
                        </p>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-[#F5F5F3]/80 mb-2">
                            Inquiry Type <span className="text-[#C5A880]">*</span>
                          </label>
                          <select
                            name="inquiryType"
                            required
                            value={formData.inquiryType}
                            onChange={handleInputChange}
                            className="w-full bg-[#121212] border border-[#F5F5F3]/10 rounded-lg px-4 py-3 text-[#F5F5F3] focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] transition-all text-sm"
                          >
                            <option value="">Select an option...</option>
                            <option value="custom">Custom Illustrative Project</option>
                            <option value="flash">Available Flash Design</option>
                          </select>
                        </div>

                        {formData.inquiryType === 'flash' && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-4 bg-[#C5A880]/5 border border-[#C5A880]/20 rounded-lg"
                          >
                            <label className="block text-xs font-semibold uppercase tracking-wider text-[#C5A880] mb-2">
                              Selected Flash Design ID <span className="text-[#C5A880]">*</span>
                            </label>
                            <select
                              name="flashDesignId"
                              required={formData.inquiryType === 'flash'}
                              value={formData.flashDesignId}
                              onChange={handleInputChange}
                              className="w-full bg-[#121212] border border-[#C5A880]/30 rounded-lg px-4 py-3 text-[#F5F5F3] focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] transition-all text-sm"
                            >
                              <option value="">Select a Flash Design...</option>
                              {AVAILABLE_FLASH.map((flash) => (
                                <option key={flash.id} value={flash.id}>
                                  {flash.title} - {flash.price} ({flash.size})
                                </option>
                              ))}
                            </select>
                          </motion.div>
                        )}

                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-[#F5F5F3]/80 mb-1">
                            Describe Your Design Concept <span className="text-[#C5A880]">*</span>
                          </label>
                          <span className="block text-xs text-[#F5F5F3]/40 mb-3 leading-relaxed">
                            For custom pieces, describe the main elements, mood, and style details you&apos;d love to see.
                            If booking flash, note if you&apos;d like any minor scale adjustments.
                          </span>
                          <textarea
                            name="concept"
                            required
                            rows={5}
                            value={formData.concept}
                            onChange={handleInputChange}
                            placeholder="e.g., I would love a botanical composition featuring a sprig of lavender woven with a small branch of eucalyptus..."
                            className="w-full bg-[#121212] border border-[#F5F5F3]/10 rounded-lg px-4 py-3 text-[#F5F5F3] placeholder-[#F5F5F3]/30 focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] transition-all text-sm leading-relaxed"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      variants={stepVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-2xl font-serif text-[#C5A880] mb-2">Step 3: Size, Placement & Availability</h3>
                        <p className="text-sm text-[#F5F5F3]/60">
                          These parameters help me optimize the design flow for your body structures.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-[#F5F5F3]/80 mb-1">
                            Placement on Your Body <span className="text-[#C5A880]">*</span>
                          </label>
                          <span className="block text-xs text-[#F5F5F3]/40 mb-2">
                            Be specific (e.g., outer right forearm, upper left thigh).
                          </span>
                          <input
                            type="text"
                            name="placement"
                            required
                            value={formData.placement}
                            onChange={handleInputChange}
                            placeholder="e.g., Upper right forearm, inner side"
                            className="w-full bg-[#121212] border border-[#F5F5F3]/10 rounded-lg px-4 py-3 text-[#F5F5F3] placeholder-[#F5F5F3]/30 focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] transition-all text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-[#F5F5F3]/80 mb-1">
                            Estimated Size in Inches <span className="text-[#C5A880]">*</span>
                          </label>
                          <span className="block text-xs text-[#F5F5F3]/40 mb-2">
                            Give your best width and height estimate.
                          </span>
                          <input
                            type="text"
                            name="estimatedSize"
                            required
                            value={formData.estimatedSize}
                            onChange={handleInputChange}
                            placeholder="e.g., 4 inches wide by 6 inches tall"
                            className="w-full bg-[#121212] border border-[#F5F5F3]/10 rounded-lg px-4 py-3 text-[#F5F5F3] placeholder-[#F5F5F3]/30 focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] transition-all text-sm"
                          />
                        </div>
                      </div>

                      {/* File Upload Section */}
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#F5F5F3]/80 mb-1">
                          Reference Photos & Placement Area
                        </label>
                        <span className="block text-xs text-[#F5F5F3]/40 mb-3 leading-relaxed">
                          Please upload 1-2 reference photos showing the style you like, and 1 clear photo of the body area
                          where the tattoo will go (ideally taken in a mirror or by a friend so the skin is relaxed).
                        </span>

                        <div
                          onClick={triggerFileInput}
                          className="border-2 border-dashed border-[#F5F5F3]/10 hover:border-[#C5A880]/50 rounded-xl p-8 text-center cursor-pointer bg-[#121212]/50 hover:bg-[#121212] transition-all group"
                        >
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileUpload}
                            multiple
                            accept="image/png, image/jpeg"
                            className="hidden"
                          />
                          <svg
                            className="w-8 h-8 mx-auto text-[#F5F5F3]/30 group-hover:text-[#C5A880] mb-3 transition-colors"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span className="text-[#C5A880] text-sm font-medium block">
                            Choose Files to Upload
                          </span>
                          <span className="text-xs text-[#F5F5F3]/40 block mt-1">
                            Up to 5 files, Max 5MB each (.png, .jpg, .jpeg)
                          </span>
                        </div>

                        {/* File Previews */}
                        {uploadedFiles.length > 0 && (
                          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-4">
                            {uploadedFiles.map((file, idx) => (
                              <div
                                key={idx}
                                className="relative bg-[#121212] border border-[#F5F5F3]/10 rounded-lg p-2 group overflow-hidden"
                              >
                                <img
                                  src={file.url}
                                  alt={file.name}
                                  className="w-full h-16 object-cover rounded-md mb-1"
                                />
                                <div className="text-[10px] text-[#F5F5F3]/80 truncate">{file.name}</div>
                                <div className="text-[9px] text-[#F5F5F3]/40">{file.size}</div>
                                <button
                                  type="button"
                                  onClick={() => removeFile(idx)}
                                  className="absolute top-1 right-1 bg-red-950/80 hover:bg-red-900 text-red-300 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Availability Checkboxes */}
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#F5F5F3]/80 mb-2">
                          Preferred Weekdays for Sessions <span className="text-[#C5A880]">*</span>
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                          {['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => {
                            const isChecked = formData.preferredDays.includes(day);
                            return (
                              <button
                                type="button"
                                key={day}
                                onClick={() => handleCheckboxChange(day)}
                                className={`px-3 py-3 rounded-lg border text-xs font-medium transition-all text-center ${
                                  isChecked
                                    ? 'bg-[#C5A880]/15 text-[#C5A880] border-[#C5A880]'
                                    : 'bg-[#121212] text-[#F5F5F3]/60 border-[#F5F5F3]/10 hover:border-[#F5F5F3]/20'
                                }`}
                              >
                                {day}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 4 && (
                    <motion.div
                      key="step4"
                      variants={stepVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-2xl font-serif text-[#C5A880] mb-2">Step 4: Terms Review & Confirmation</h3>
                        <p className="text-sm text-[#F5F5F3]/60">
                          Please review your information before final submission.
                        </p>
                      </div>

                      {/* Structured Summary Area */}
                      <div className="bg-[#121212] rounded-xl p-6 border border-[#F5F5F3]/5 space-y-4 text-sm">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-[#F5F5F3]/5">
                          <div>
                            <span className="text-[#F5F5F3]/40 text-xs block uppercase">Full Name</span>
                            <span className="text-[#F5F5F3] font-medium">{formData.fullName}</span>
                          </div>
                          <div>
                            <span className="text-[#F5F5F3]/40 text-xs block uppercase">Email</span>
                            <span className="text-[#F5F5F3] font-medium">{formData.email}</span>
                          </div>
                          <div>
                            <span className="text-[#F5F5F3]/40 text-xs block uppercase">Phone</span>
                            <span className="text-[#F5F5F3] font-medium">{formData.phone}</span>
                          </div>
                          <div>
                            <span className="text-[#F5F5F3]/40 text-xs block uppercase">Inquiry Type</span>
                            <span className="text-[#F5F5F3] font-medium capitalize">
                              {formData.inquiryType === 'custom' ? 'Custom Illustrative Project' : 'Available Flash Design'}
                            </span>
                          </div>
                        </div>

                        {formData.inquiryType === 'flash' && (
                          <div className="pb-4 border-b border-[#F5F5F3]/5">
                            <span className="text-[#C5A880] text-xs block uppercase">Selected Flash ID</span>
                            <span className="text-[#F5F5F3] font-medium">
                              {AVAILABLE_FLASH.find((f) => f.id === formData.flashDesignId)?.title || formData.flashDesignId}
                            </span>
                          </div>
                        )}

                        <div className="pb-4 border-b border-[#F5F5F3]/5">
                          <span className="text-[#F5F5F3]/40 text-xs block uppercase">Concept Details</span>
                          <p className="text-[#F5F5F3]/80 leading-relaxed whitespace-pre-wrap text-xs mt-1">
                            {formData.concept}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-[#F5F5F3]/5">
                          <div>
                            <span className="text-[#F5F5F3]/40 text-xs block uppercase">Body Placement</span>
                            <span className="text-[#F5F5F3] font-medium">{formData.placement}</span>
                          </div>
                          <div>
                            <span className="text-[#F5F5F3]/40 text-xs block uppercase">Estimated Size</span>
                            <span className="text-[#F5F5F3] font-medium">{formData.estimatedSize}</span>
                          </div>
                        </div>

                        <div>
                          <span className="text-[#F5F5F3]/40 text-xs block uppercase">Preferred Weekdays</span>
                          <span className="text-[#F5F5F3] font-medium">{formData.preferredDays.join(', ')}</span>
                        </div>
                      </div>

                      {/* Required Acknowledgment Checkbox */}
                      <label className="flex items-start space-x-3 cursor-pointer group mt-6">
                        <input
                          type="checkbox"
                          required
                          name="termsAccepted"
                          checked={formData.termsAccepted}
                          onChange={(e) => setFormData((prev) => ({ ...prev, termsAccepted: e.target.checked }))}
                          className="mt-1 w-4 h-4 text-[#C5A880] bg-[#121212] border-[#F5F5F3]/20 rounded focus:ring-0 focus:ring-offset-0"
                        />
                        <span className="text-xs text-[#F5F5F3]/70 leading-relaxed group-hover:text-[#F5F5F3]">
                          I understand that deposits are non-refundable, and that submitting this form does not guarantee
                          an immediate booking. I have read and agree to the{' '}
                          <a href="#booking-policies" className="text-[#C5A880] underline hover:text-[#C5A880]/80">
                            studio policies
                          </a>
                          .
                        </span>
                      </label>
                    </motion.div>
                  )}

                  {step === 5 && (
                    <motion.div
                      key="step5"
                      variants={stepVariants}
                      initial="initial"
                      animate="animate"
                      className="text-center py-12 space-y-6"
                    >
                      <div className="w-16 h-16 bg-[#889E81]/10 text-[#889E81] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#889E81]/20">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>

                      <h3 className="text-3xl font-serif text-[#C5A880]">Thank you for your inquiry!</h3>
                      <p className="text-sm text-[#F5F5F3]/80 max-w-md mx-auto">
                        Your request has been securely delivered directly to my inbox.
                      </p>

                      <div className="bg-[#121212] p-6 rounded-xl border border-[#F5F5F3]/5 text-left max-w-lg mx-auto space-y-4 text-xs md:text-sm leading-relaxed">
                        <h4 className="font-serif text-[#C5A880] text-base">Next Steps & Expectations</h4>
                        <ul className="space-y-3 text-[#F5F5F3]/70">
                          <li className="flex items-start space-x-2">
                            <span className="text-[#C5A880] mt-0.5">•</span>
                            <span>
                              <strong>Review Timeline:</strong> I look over new inquiries every Monday and Tuesday. You can
                              expect an email response from me within 5 business days.
                            </span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-[#C5A880] mt-0.5">•</span>
                            <span>
                              <strong>What to look for:</strong> Keep an eye out for an email from{' '}
                              <span className="text-[#C5A880]">jake@llewellyntattoo.com</span> with your initial quote and
                              private calendar booking link.
                            </span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-[#C5A880] mt-0.5">•</span>
                            <span>
                              <strong>Check your spam:</strong> Sometimes my replies end up in spam folders. If you
                              don&apos;t hear from me in a week, please check there first.
                            </span>
                          </li>
                        </ul>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setFormData(initialFormData);
                          setUploadedFiles([]);
                          setIsSubmitted(false);
                          setStep(1);
                        }}
                        className="mt-6 px-6 py-3 border border-[#C5A880]/30 text-[#C5A880] hover:bg-[#C5A880]/10 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all"
                      >
                        Submit Another Inquiry
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation Buttons */}
                {!isSubmitted && (
                  <div className="flex items-center justify-between mt-12 pt-6 border-t border-[#F5F5F3]/5">
                    {step > 1 ? (
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#F5F5F3]/60 hover:text-[#F5F5F3] transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span>Back</span>
                      </button>
                    ) : (
                      <div />
                    )}

                    {step < 4 ? (
                      <button
                        type="button"
                        onClick={handleNextStep}
                        disabled={!validateStep()}
                        className="flex items-center space-x-2 px-6 py-3 bg-[#C5A880] disabled:bg-[#C5A880]/30 disabled:cursor-not-allowed hover:bg-[#b0936e] text-[#121212] rounded-lg text-xs font-semibold uppercase tracking-wider transition-all"
                      >
                        <span>Next Step</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting || !formData.termsAccepted}
                        className="flex items-center space-x-2 px-8 py-4 bg-[#C5A880] disabled:bg-[#C5A880]/30 disabled:cursor-not-allowed hover:bg-[#b0936e] text-[#121212] rounded-lg text-sm font-semibold uppercase tracking-wider transition-all shadow-lg shadow-[#C5A880]/10"
                      >
                        <span>{isSubmitting ? 'Submitting...' : 'Submit Booking Inquiry'}</span>
                      </button>
                    )}
                  </div>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}