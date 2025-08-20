import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Gift } from 'lucide-react';

const BookingPopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show popup after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const whatsappNumber = "919876543210"; // Replace with actual number
  const whatsappMessage = "Hi B21! I'm interested in your 20% off last-minute booking offer.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  const closePopup = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
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
            className="relative bg-background rounded-2xl shadow-luxury max-w-md w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 z-10 w-8 h-8 bg-muted rounded-full flex items-center justify-center hover:bg-muted/80 transition-colors"
            >
              <X size={16} />
            </button>

            {/* Header */}
            <div className="bg-gradient-gold p-6 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Gift size={32} className="text-background" />
              </motion.div>
              
              <h3 className="text-2xl font-heading font-bold text-background mb-2">
                Special Offer!
              </h3>
              <p className="text-background/90 font-semibold">
                20% OFF Last-Minute Bookings
              </p>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-center justify-center space-x-2 mb-4 text-muted-foreground">
                <Clock size={16} />
                <span className="text-sm">Valid for today only</span>
              </div>

              <p className="text-center text-foreground mb-6 leading-relaxed">
                Book your appointment today and enjoy 20% off our premium services. 
                Perfect for last-minute touch-ups or treating yourself!
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