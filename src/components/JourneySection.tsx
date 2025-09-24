import React from 'react';

export default function JourneySection(){
  return (
    <section id="our-journey" className="py-12 sm:py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6">Our Journey</h2>
        <div className="rounded-3xl overflow-hidden shadow-lg">
          {/* Mobile image */}
          <img
            src="/images/journey/journey_mobile.svg"
            alt="Our Journey"
            className="block sm:hidden w-full h-auto"
            loading="lazy"
          />
          {/* Desktop image */}
          <img
            src="/images/journey/journey_desktop.svg"
            alt="Our Journey"
            className="hidden sm:block w-full h-auto"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
