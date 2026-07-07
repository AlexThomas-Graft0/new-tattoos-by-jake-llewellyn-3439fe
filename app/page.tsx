import { Suspense } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ValueProps } from "@/components/ValueProps";
import { PortfolioGallery } from "@/components/PortfolioGallery";
import { FlashShowcase } from "@/components/FlashShowcase";
import { BookingPolicies } from "@/components/BookingPolicies";
import { InquiryForm } from "@/components/InquiryForm";
import { AboutArtist } from "@/components/AboutArtist";
import { AftercareFaqs } from "@/components/AftercareFaqs";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "{\"@context\":\"https://schema.org\",\"@type\":\"LocalBusiness\",\"name\":\"New Tattoos by Jake Llewellyn\",\"description\":\"New Tattoos by Jake Llewellyn\",\"url\":\"https://new-tattoos-by-jake-llewellyn-3439fe.duckbyte.co\"}" }} />
      <Navbar />
      <section id="hero-section" className="scroll-mt-20">
        <Suspense fallback={<div className="min-h-[30vh]" />}>
          <HeroSection />
        </Suspense>
      </section>
      <section id="value-props" className="scroll-mt-20">
        <Suspense fallback={<div className="min-h-[30vh]" />}>
          <ValueProps />
        </Suspense>
      </section>
      <section id="portfolio-gallery" className="scroll-mt-20">
        <Suspense fallback={<div className="min-h-[30vh]" />}>
          <PortfolioGallery />
        </Suspense>
      </section>
      <section id="flash-showcase" className="scroll-mt-20">
        <Suspense fallback={<div className="min-h-[30vh]" />}>
          <FlashShowcase />
        </Suspense>
      </section>
      <section id="booking-policies" className="scroll-mt-20">
        <Suspense fallback={<div className="min-h-[30vh]" />}>
          <BookingPolicies />
        </Suspense>
      </section>
      <section id="inquiry-form" className="scroll-mt-20">
        <Suspense fallback={<div className="min-h-[30vh]" />}>
          <InquiryForm />
        </Suspense>
      </section>
      <section id="about-artist" className="scroll-mt-20">
        <Suspense fallback={<div className="min-h-[30vh]" />}>
          <AboutArtist />
        </Suspense>
      </section>
      <section id="aftercare-faqs" className="scroll-mt-20">
        <Suspense fallback={<div className="min-h-[30vh]" />}>
          <AftercareFaqs />
        </Suspense>
      </section>
      <Footer />
    </main>
  );
}
