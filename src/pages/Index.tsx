import { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import FestiveBanner from '@/components/FestiveBanner';
import VideoGallery from '@/components/VideoGallery';
import Testimonials from '@/components/Testimonials';
import InstagramFeed from '@/components/InstagramFeed';
import Footer from '@/components/Footer';
import BookingPopup from '@/components/BookingPopup';

const Index = () => {
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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Services />
        <FestiveBanner />
        <VideoGallery />
        <Testimonials />
        <InstagramFeed />
      </main>
      <Footer />
      <BookingPopup />
    </div>
  );
};

export default Index;
