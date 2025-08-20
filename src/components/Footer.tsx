import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  const whatsappNumber = "919876543210"; // Replace with actual number
  const whatsappMessage = "Hello B21! I'd like to get in touch.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

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
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors">
                <Twitter size={18} />
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
              <li><a href="#services" className="text-white/80 hover:text-accent transition-colors">Hair Styling</a></li>
              <li><a href="#services" className="text-white/80 hover:text-accent transition-colors">Skin Care</a></li>
              <li><a href="#services" className="text-white/80 hover:text-accent transition-colors">Nail Art</a></li>
              <li><a href="#services" className="text-white/80 hover:text-accent transition-colors">Bridal Packages</a></li>
              <li><a href="#services" className="text-white/80 hover:text-accent transition-colors">Makeup Services</a></li>
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
              <li><a href="#" className="text-white/80 hover:text-accent transition-colors">About Us</a></li>
              <li><a href="#gallery" className="text-white/80 hover:text-accent transition-colors">Gallery</a></li>
              <li><a href="#" className="text-white/80 hover:text-accent transition-colors">Beauty Tips</a></li>
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
                  <p>123 Luxury Avenue</p>
                  <p>Fashion District, Mumbai 400001</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-accent flex-shrink-0" />
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-accent transition-colors">
                  +91 98765 43210
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-accent flex-shrink-0" />
                <a href="mailto:hello@b21salon.com" className="text-white/80 hover:text-accent transition-colors">
                  hello@b21salon.com
                </a>
              </div>
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