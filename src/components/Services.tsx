import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import hairStylingImage from '@/assets/hair-styling.jpg';
import skinCareImage from '@/assets/skin-care.jpg';
import nailArtImage from '@/assets/nail-art.jpg';

const Services = () => {
  const services = [
    {
      title: 'Hair Styling',
      description: 'Transform your look with our expert hair styling services, from cuts to colors.',
      image: hairStylingImage,
      price: '₹2,999',
      whatsappMessage: 'Hi B21! I\'m interested in your Hair Styling services.'
    },
    {
      title: 'Skin Care',
      description: 'Rejuvenate your skin with our premium facial treatments and skincare routines.',
      image: skinCareImage,
      price: '₹3,999',
      whatsappMessage: 'Hi B21! I\'d like to book a Skin Care treatment.'
    },
    {
      title: 'Nail Art',
      description: 'Express yourself with our creative nail art designs and manicure services.',
      image: nailArtImage,
      price: '₹1,999',
      whatsappMessage: 'Hi B21! I\'m interested in your Nail Art services.'
    }
  ];

  const whatsappNumber = "919876543210"; // Replace with actual number

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-heading-lg mb-6">Our Premium Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our range of luxury beauty services designed to enhance your natural radiance
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="card-luxury card-hover group cursor-pointer"
            >
              <div className="overflow-hidden rounded-t-2xl">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-heading-md mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm text-muted-foreground">Starts from</span>
                    <div className="text-2xl font-bold text-accent">{service.price}</div>
                  </div>
                  
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(service.whatsappMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline-luxury flex items-center space-x-2 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300"
                  >
                    <span>Book Now</span>
                    <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;