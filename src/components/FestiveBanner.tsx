import { motion } from 'framer-motion';

const FestiveBanner = () => {
  const whatsappNumber = "919876543210"; // Replace with actual number
  const whatsappMessage = "Hi B21! I'm interested in your Festive Glow offers.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section className="relative py-20 bg-accent overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 
            className="font-heading text-6xl md:text-8xl lg:text-9xl font-bold text-background mb-8"
            style={{ 
              textShadow: '4px 4px 8px rgba(0, 0, 0, 0.3)',
              letterSpacing: '0.05em'
            }}
          >
            FESTIVE GLOW
          </h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl text-background/90 mb-8 max-w-2xl mx-auto font-medium"
          >
            Celebrate the season with our exclusive festive beauty packages
          </motion.p>

          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-dark inline-flex items-center text-lg px-12 py-4"
          >
            VIEW OFFERS
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default FestiveBanner;