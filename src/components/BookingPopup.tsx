import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Gift } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchPopupConfig } from '@/lib/supabaseApi';
import bannerFallback from '@/assets/hero-salon.jpg';
import { useWhatsappConfig } from '@/lib/whatsapp';

const BookingPopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  const { data: cfg } = useQuery({
    queryKey: ['popup_config'],
    queryFn: fetchPopupConfig,
    retry: false, // avoid noisy DNS retry loops in local/offline
    staleTime: 5 * 60 * 1000,
  });

  // Centralized WhatsApp URL built from CMS config with source tracking
  const { url: whatsappUrl } = useWhatsappConfig(undefined, 'offer-popup');

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

  // WhatsApp number/message handled by useWhatsappConfig()

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
              className="relative bg-background rounded-2xl shadow-luxury w-full max-w-sm sm:max-w-md md:max-w-xl lg:max-w-2xl max-h-[90vh] overflow-auto mx-2 outline-none focus:outline-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background removed to prevent dual banner conflicts */}
            {/* Close Button */}
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 z-10 w-8 h-8 bg-muted rounded-full flex items-center justify-center hover:bg-muted/80 transition-colors"
            >
              <X size={16} />
            </button>

            {/* Header with Banner Image */}
            <div className="relative overflow-hidden">
              {/* Banner Image Section - consistent 4:5 aspect ratio on all devices */}
              <div className="relative overflow-hidden bg-gradient-gold aspect-[4/5]">
                <img
                  src={(cfg as any)?.banner_image || (bannerFallback as unknown as string)}
                  alt="Special Offer Banner"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = bannerFallback as unknown as string;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              </div>
              
              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3"
                >
                  <Gift size={24} className="text-white" />
                </motion.div>
                
                <h3 className="text-xl font-heading font-bold text-white mb-1 drop-shadow-lg">
                  {cfg?.title ?? 'Special Offer!'}
                </h3>
                <p className="text-white/90 font-semibold text-sm drop-shadow">
                  {cfg?.subtitle ?? '20% OFF Last-Minute Bookings'}
                </p>
              </div>
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
                  {(cfg as any)?.action_button_text ?? 'Book Now & Save 20%'}
                </a>
                
                <button
                  onClick={closePopup}
                  className="w-full text-center text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  Maybe later
                </button>
              </div>
            </div>

            {/* Decorative Elements removed per design request */}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookingPopup;