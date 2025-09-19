import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TipsPage(){
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 container mx-auto px-4 py-16 max-w-3xl">
        <h1 className="font-heading text-4xl font-bold mb-8">Beauty Tips</h1>
        <p className="text-muted-foreground leading-relaxed mb-6">Curated expert guidance is coming soon. Meanwhile browse our latest blog posts for inspiration.</p>
        <ul className="list-disc pl-6 space-y-3 text-sm">
          <li>Healthy scalp routines for stronger hair</li>
          <li>Seasonal skin care adjustments</li>
          <li>Color maintenance best practices</li>
        </ul>
      </main>
      <Footer />
    </div>
  );
}
