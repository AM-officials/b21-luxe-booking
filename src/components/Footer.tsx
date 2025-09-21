import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram } from 'lucide-react';
import { useWhatsappConfig } from '@/lib/whatsapp';

const Footer = () => {
  const { url: whatsappUrl } = useWhatsappConfig("Hello B21! I'd like to get in touch.");

  return (
    <footer className="bg-luxury-black text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="font-heading text-3xl font-bold mb-4 text-accent">B21</h3>
            <p className="text-white/80 mb-6 leading-relaxed">
              Experience luxury and redefine beauty at B21. Your personal escape to elegance 
              and style in the heart of the city.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/b21india/?hl=en" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors" aria-label="Instagram">
                <Instagram size={18} />
              </a>
            </div>
          </motion.div>

          {/* Services Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold text-lg mb-6">Our Services</h4>
            <ul className="space-y-3">
              <li><RouterLink to="/#services" className="text-white/80 hover:text-accent transition-colors">Hair Styling</RouterLink></li>
              <li><RouterLink to="/#services" className="text-white/80 hover:text-accent transition-colors">Skin Care</RouterLink></li>
              <li><RouterLink to="/#services" className="text-white/80 hover:text-accent transition-colors">Nail Art</RouterLink></li>
              <li><RouterLink to="/#services" className="text-white/80 hover:text-accent transition-colors">Bridal Packages</RouterLink></li>
              <li><RouterLink to="/#services" className="text-white/80 hover:text-accent transition-colors">Makeup Services</RouterLink></li>
            </ul>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><RouterLink to="/#about" className="text-white/80 hover:text-accent transition-colors">About Us</RouterLink></li>
              <li><RouterLink to="/#gallery" className="text-white/80 hover:text-accent transition-colors">Gallery</RouterLink></li>
              <li><RouterLink to="/blog" className="text-white/80 hover:text-accent transition-colors">Blog</RouterLink></li>
              <li><a href="#" className="text-white/80 hover:text-accent transition-colors">Gift Cards</a></li>
              <li><a href="#" className="text-white/80 hover:text-accent transition-colors">Privacy Policy</a></li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold text-lg mb-6">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin size={18} className="text-accent mt-1 flex-shrink-0" />
                <div className="text-white/80">
                  <p>Opposite BMC Bhawani Mall Exitgate, Saheed Nagar</p>
                  <p>Bhubaneswar, Odisha 751007</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-accent flex-shrink-0" />
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-accent transition-colors">80930 81930</a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-accent flex-shrink-0" />
                <a href="mailto:hello@b21salon.com" className="text-white/80 hover:text-accent transition-colors">
                  hello@b21salon.com
                </a>
              </div>
              <div>
                <a href="https://share.google/QOWqE1CFrYfvC28co" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-accent transition-colors">
                  <MapPin size={16} /> Get Directions
                </a>
              </div>
              <div className="text-xs text-white/60">Opens 10:30 am Sun</div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-white/10 mt-12 pt-8 text-center"
        >
          <p className="text-white/60">
            © 2024 B21 Luxury Salon. All rights reserved. | Designed with ❤️ for beauty lovers
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;