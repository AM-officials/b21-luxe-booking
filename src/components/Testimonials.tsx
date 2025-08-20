import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Priya Sharma',
      rating: 5,
      text: 'Absolutely stunning transformation! The team at B21 made me feel like a queen. Their attention to detail and luxurious atmosphere is unmatched.',
      service: 'Hair Styling'
    },
    {
      id: 2,
      name: 'Ananya Gupta',
      rating: 5,
      text: 'The best facial experience I\'ve ever had. My skin is glowing and I feel so refreshed. B21 truly understands luxury beauty.',
      service: 'Skin Care'
    },
    {
      id: 3,
      name: 'Kavya Reddy',
      rating: 5,
      text: 'The nail art was incredible! Such intricate designs and the quality is amazing. I always get compliments on my nails from B21.',
      service: 'Nail Art'
    },
    {
      id: 4,
      name: 'Riya Patel',
      rating: 5,
      text: 'B21 is my go-to salon for all special occasions. They never disappoint and always exceed my expectations. Truly a luxury experience.',
      service: 'Complete Makeover'
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-gradient-luxury text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-heading-lg mb-6">What Our Clients Say</h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Discover why our clients choose B21 for their beauty transformations
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Card */}
          <div className="relative h-80 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="text-center px-8">
                  {/* Stars */}
                  <div className="flex justify-center mb-6">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star
                        key={i}
                        size={24}
                        className="text-accent fill-current mx-1"
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-xl md:text-2xl mb-8 font-light leading-relaxed">
                    "{testimonials[currentIndex].text}"
                  </blockquote>

                  {/* Client Info */}
                  <div>
                    <div className="font-semibold text-lg mb-1">
                      {testimonials[currentIndex].name}
                    </div>
                    <div className="text-accent text-sm uppercase tracking-wider">
                      {testimonials[currentIndex].service}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Dots */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-accent' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;