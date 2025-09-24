import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import PricingSection from '@/components/PricingSection';
import FAQSection from '@/components/FAQSection';
import LocationsSection from '@/components/LocationsSection';
import SectionSeparator from '@/components/SectionSeparator';
import FestiveBanner from '@/components/FestiveBanner';
import VideoGallery from '@/components/VideoGallery';
import JourneySection from '@/components/JourneySection';
import Testimonials from '@/components/Testimonials';
import InstagramFeed from '@/components/InstagramFeed';
import Footer from '@/components/Footer';
import BookingPopup from '@/components/BookingPopup';
// import ReviewsSection from '@/components/ReviewsSection';

const Index = () => {
  const location = useLocation();
  useEffect(() => {
    // Smooth scroll reveal animation
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, observerOptions);

    // Observe all elements with reveal-up class
    const revealElements = document.querySelectorAll('.reveal-up');
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  useEffect(() => {
    // On route change, if there's a hash, scroll to that section smoothly
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 0);
      }
    } else {
      // If no hash and we're on home, scroll to top on navigation
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
  <Hero />
  <SectionSeparator />
  <Services />
  <PricingSection />
  <SectionSeparator style="curve" />
  <FestiveBanner />
  <VideoGallery />
  <JourneySection />
  {/* <ReviewsSection /> */}
  <SectionSeparator style="angle" />
  <Testimonials />
  <InstagramFeed />
  <LocationsSection />
  <FAQSection />
      </main>
      <Footer />
      <BookingPopup />
    </div>
  );
};

export default Index;
