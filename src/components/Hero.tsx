import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import heroImage from '@/assets/hero-salon.jpg';
import { useWhatsappConfig } from '@/lib/whatsapp';

const Hero = () => {
  const { url: whatsappUrl } = useWhatsappConfig("Hello B21! I'd like to book an appointment.");

  // List of hero images located under public/images/hero
  const heroImages = useMemo(() => ([
    // Prefer optimized images if present
    '/images/optimized/DSC05018.jpg',
    '/images/optimized/DSC05021.jpg',
    '/images/optimized/DSC05028.jpg',
    '/images/optimized/DSC05036.jpg',
    '/images/optimized/DSC05047.jpg',
    '/images/optimized/DSC05069.jpg',
  ]), []);

  // In case any of the above images are missing, swap to a local fallback
  const fallbackHero = (heroImage as unknown as string);

  // Preload images to avoid flash
  useEffect(() => {
    heroImages.forEach(src => { const img = new Image(); img.src = src; });
  }, [heroImages]);

  // Auto-advance background
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const SLIDE_MS = 6000; // 6 seconds per slide
  useEffect(() => {
    const id = setInterval(() => setIndex(i => {
      setPrevIndex(i);
      return (i + 1) % heroImages.length;
    }), SLIDE_MS);
    return () => clearInterval(id);
  }, [heroImages.length]);

  return (
  <section id="about" className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Slideshow */}
      <div className="absolute inset-0">
        {/* Previous image fades OUT while current fades IN to ensure no blank flash */}
        {prevIndex !== null && (
          <motion.img
            key={`prev-${prevIndex}`}
            src={heroImages[prevIndex] ?? fallbackHero}
            alt="Previous hero slide"
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 1.0 }}
            onError={(e) => {
              if (e.currentTarget.src !== fallbackHero) e.currentTarget.src = fallbackHero;
            }}
            decoding="async"
            fetchPriority="low"
            aria-hidden
          />
        )}

        {/* Current image fades IN */}
        <motion.img
          key={`curr-${index}`}
          src={heroImages[index] ?? fallbackHero}
          alt="B21 Luxe Salon ambience"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.0 }}
          onError={(e) => {
            if (e.currentTarget.src !== fallbackHero) e.currentTarget.src = fallbackHero;
          }}
          decoding="async"
          fetchPriority="high"
        />
        {/* Darken overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/45" />
        {/* Optional decorative overlay if defined globally */}
        <div className="absolute inset-0 video-overlay pointer-events-none"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-heading-xl mb-6 drop-shadow-lg"
        >
          Experience Luxury.
          <br />
          <span className="text-accent">Redefine Beauty.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-xl md:text-2xl mb-8 font-light leading-relaxed drop-shadow-md"
        >
          Your personal escape to elegance and style in the heart of the city.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-luxury text-base md:text-xl px-6 md:px-12 py-3 md:py-6 inline-block hover:scale-105 transition-transform duration-300"
          >
            Book an Appointment
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white/70 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;