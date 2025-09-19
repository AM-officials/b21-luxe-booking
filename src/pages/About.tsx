import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LocationsSection from '@/components/LocationsSection';

export default function AboutPage(){
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        <section className="py-24 container mx-auto px-4 max-w-4xl">
          <h1 className="font-heading text-5xl font-bold mb-8">About B21</h1>
          <p className="text-lg leading-relaxed text-muted-foreground mb-6">We blend artistry with elevated care; every service is a crafted moment of luxury designed around you. Our talented collective pursues continual education and innovation to bring global techniques to your local chair.</p>
          <p className="text-muted-foreground leading-relaxed">From hair sculpting and corrective color to advanced skin therapies and signature nail finishes, our studios are immersive spaces that celebrate personal expression. We are growing thoughtfully across cities while preserving an intimate, high-touch experience.</p>
        </section>
        <LocationsSection />
      </main>
      <Footer />
    </div>
  );
}
