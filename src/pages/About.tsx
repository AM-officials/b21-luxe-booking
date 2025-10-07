import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LocationsSection from '@/components/LocationsSection';
import JourneySection from '@/components/JourneySection';

export default function AboutPage(){
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        <section className="py-16 sm:py-20 md:py-24 container mx-auto px-4 max-w-5xl">
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 sm:mb-10 md:mb-12 leading-tight">
            About B21 India – Best Unisex Salon & Spa in Bhubaneswar
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-base sm:text-lg leading-relaxed text-muted-foreground mb-8">
              Welcome to <strong>B21 India</strong>, the best unisex salon and spa in Bhubaneswar, where luxury meets perfection. Located in the heart of Saheed Nagar, near BMC Bhawani Mall, we offer a complete range of hair, beauty, skin, and spa services designed to make you look and feel your best.
            </p>
            <JourneySection />
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mt-12 mb-6">Our Story</h2>
            <p className="text-base sm:text-lg leading-relaxed text-muted-foreground mb-6">
              Established in <strong>2014</strong>, B21 India has become one of the most trusted and top-rated salons in Odisha, known for its blend of modern style, premium products, and expert professionals.
            </p>
            <p className="text-base sm:text-lg leading-relaxed text-muted-foreground mb-8">
              Founded by <strong>Mr. Satish Patra</strong>, B21 was created with one vision — to bring world-class beauty and grooming experiences to Bhubaneswar at affordable prices.
            </p>

            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mt-12 mb-6">Why Choose B21 Salon</h2>
            <p className="text-base sm:text-lg leading-relaxed text-muted-foreground mb-6">
              At B21, we believe beauty is more than appearance — it's confidence, comfort, and care.
            </p>
            <p className="text-base sm:text-lg leading-relaxed text-muted-foreground mb-4">Our salon offers:</p>
            <ul className="space-y-3 mb-8 text-muted-foreground">
              <li className="flex items-start">
                <span className="text-accent mr-3 mt-1">•</span>
                <span>Professional hair styling, haircuts, and treatments using international techniques and premium brands.</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-3 mt-1">•</span>
                <span>Bridal and party makeup services by expert makeup artists in Bhubaneswar.</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-3 mt-1">•</span>
                <span>Advanced facial and skincare treatments customized for every skin type.</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-3 mt-1">•</span>
                <span>Body spa and massage therapies for relaxation and wellness.</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-3 mt-1">•</span>
                <span>Men's grooming, beard shaping, and hairstyling by trained stylists.</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-3 mt-1">•</span>
                <span>Pedicure, manicure, and body polishing with top hygiene standards.</span>
              </li>
            </ul>
            <p className="text-base sm:text-lg leading-relaxed text-muted-foreground mb-8">
              Each service is performed with precision and care by our team of professional stylists, beauticians, and therapists, ensuring every visit to B21 becomes a truly memorable experience.
            </p>

            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mt-12 mb-6">Our USP – Redefining Salon Experience in Bhubaneswar</h2>
            <p className="text-base sm:text-lg leading-relaxed text-muted-foreground mb-6">
              What makes B21 India unique is our commitment to personalized care, premium quality, and hygiene. We use only globally trusted brands for all hair, skin, and spa services.
            </p>
            <p className="text-base sm:text-lg leading-relaxed text-muted-foreground mb-6">
              From bridal makeup packages to hair smoothing, keratin, botox, and color treatments, every service is handled with perfection and professionalism.
            </p>
            <p className="text-base sm:text-lg leading-relaxed text-muted-foreground mb-8">
              Our luxurious ambiance, customer-first approach, and continuous innovation have made us one of the best-rated salons in Bhubaneswar.
              Whether it's your wedding look, monthly grooming, or a relaxing spa day, B21 India is your go-to destination for beauty, style, and self-care.
            </p>

            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mt-12 mb-6">Our Mission</h2>
            <p className="text-base sm:text-lg leading-relaxed text-muted-foreground mb-6">
              To redefine beauty standards in Odisha by offering affordable luxury salon services that blend global trends with Indian elegance.
            </p>
            <p className="text-base sm:text-lg leading-relaxed text-muted-foreground mb-8">
              We aim to make every client feel pampered, confident, and refreshed after every visit.
            </p>

            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mt-12 mb-6">Visit Us Today</h2>
            <p className="text-base sm:text-lg leading-relaxed text-muted-foreground mb-6">
              If you're searching for the <strong>best salon in Bhubaneswar</strong>, <strong>unisex salon near me</strong>, or <strong>top bridal makeup artist in Odisha</strong>, B21 India is the name you can trust.
            </p>
            <p className="text-base sm:text-lg leading-relaxed text-muted-foreground mb-12">
              Experience the art of transformation and let our experts help you discover your most beautiful self.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
