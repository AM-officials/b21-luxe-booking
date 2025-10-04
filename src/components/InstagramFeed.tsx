import { motion } from 'framer-motion';
import { Instagram, ExternalLink } from 'lucide-react';

const InstagramFeed = () => {
  /* Temporarily using Elfsight widget - original Instagram posts only */
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-heading-lg mb-6">Follow Our Journey</h2>
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Instagram size={24} className="text-accent" />
            <span className="text-xl font-semibold">@B21Salon</span>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay updated with our latest transformations and behind-the-scenes moments
          </p>
        </motion.div>

        {/* Elfsight Instagram Feed Widget */}
        <div className="elfsight-app-978604bd-05b6-475f-ab08-7a3c8d551d66" data-elfsight-app-lazy></div>

        {/* Follow Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <a
            href="https://www.instagram.com/b21india/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-md text-white font-medium shadow-md hover:shadow-lg transition-shadow bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400"
          >
            <Instagram size={20} />
            <span>Follow Us</span>
            <ExternalLink size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default InstagramFeed;