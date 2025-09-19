import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Gift } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchPopupConfig } from '@/lib/supabaseApi';
import bannerFallback from '@/assets/hero-salon.jpg';

const BookingPopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  const { data: cfg } = useQuery({
    queryKey: ['popup_config'],
    queryFn: fetchPopupConfig,
    retry: false, // avoid noisy DNS retry loops in local/offline
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    // Start timer only after loading screen finished (appLoaded event)
    const start = () => {
      const delay = cfg?.delay_ms ?? 3000;
      const enabled = cfg?.enabled ?? true;
      if (!enabled) return;
      const timer = setTimeout(() => setIsVisible(true), delay);
      return () => clearTimeout(timer);
    };
    let cleanup: (()=>void)|undefined;
    if ((window as any).__appLoadedAlready) {
      cleanup = start();
    } else {
      const listener = () => { (window as any).__appLoadedAlready = true; cleanup = start(); };
      window.addEventListener('appLoaded', listener, { once: true });
      return () => { window.removeEventListener('appLoaded', listener); cleanup && cleanup(); };
    }
    return cleanup;
  }, [cfg]);

  const whatsappNumber = cfg?.whatsapp_number || "919876543210"; // default
  const whatsappMessage = cfg?.whatsapp_message || "Hi B21! I'm interested in your 20% off last-minute booking offer.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  const closePopup = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
  {isVisible && (cfg?.enabled ?? true) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={closePopup}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative bg-background rounded-2xl shadow-luxury w-full max-w-sm sm:max-w-md overflow-hidden mx-2"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Banner image background (light) */}
            <div
              className="absolute inset-0 opacity-20 -z-0"
              style={{
                backgroundImage: `url(${(cfg as any)?.banner_image || (bannerFallback as unknown as string)})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
              aria-hidden="true"
            />
            {/* Close Button */}
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 z-10 w-8 h-8 bg-muted rounded-full flex items-center justify-center hover:bg-muted/80 transition-colors"
            >
              <X size={16} />
            </button>

            {/* Header */}
            <div className="bg-gradient-gold/95 backdrop-blur p-5 sm:p-6 text-center relative">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Gift size={32} className="text-background" />
              </motion.div>
              
              <h3 className="text-2xl font-heading font-bold text-background mb-2">
                {cfg?.title ?? 'Special Offer!'}
              </h3>
              <p className="text-background/90 font-semibold">
                {cfg?.subtitle ?? '20% OFF Last-Minute Bookings'}
              </p>
            </div>

            {/* Content */}
            <div className="p-5 sm:p-6">
              <div className="flex items-center justify-center space-x-2 mb-4 text-muted-foreground">
                <Clock size={16} />
                <span className="text-sm">{cfg?.validity_text ?? 'Valid for today only'}</span>
              </div>

              <p className="text-center text-foreground mb-6 leading-relaxed">
                {cfg?.body_text ?? 'Book your appointment today and enjoy 20% off our premium services. Perfect for last-minute touch-ups or treating yourself!'}
              </p>

              <div className="space-y-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-luxury w-full text-center block"
                  onClick={closePopup}
                >
                  Book Now & Save 20%
                </a>
                
                <button
                  onClick={closePopup}
                  className="w-full text-center text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  Maybe later
                </button>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-gold"></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookingPopup;