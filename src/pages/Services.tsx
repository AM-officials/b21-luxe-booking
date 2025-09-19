import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Services from '@/components/Services';
import PricingSection from '@/components/PricingSection';
import FAQSection from '@/components/FAQSection';

export default function ServicesPage(){
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        <Services />
        <PricingSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
