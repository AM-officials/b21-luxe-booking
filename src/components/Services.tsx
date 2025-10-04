import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useWhatsappConfig, buildWhatsAppUrl } from '@/lib/whatsapp';
import bridalImg from '/public/images/services/bridal.jpg';
import botoxImg from '/public/images/services/botox.jpeg';
import straighteningImg from '/public/images/services/straightning.jpeg';
import haircolorImg from '/public/images/services/haircolor.jpeg';

const Services = () => {
  const services = [
    {
      title: 'Bridal',
      description: 'Premium bridal looks by our experts tailored to your special day.',
      image: bridalImg,
      price: '₹5,999',
      priceSuffix: 'onwards',
      whatsappMessage: 'Hi B21! I\'m interested in Bridal services.'
    },
    {
      title: 'Botox',
      description: 'Revitalize your hair with our professional Botox hair treatment.',
      image: botoxImg,
      price: '₹3,999',
      priceSuffix: 'onwards',
      whatsappMessage: 'Hi B21! I want to know more about Hair Botox.'
    },
    {
      title: 'Straightening',
      description: 'Get smooth, sleek hair with our advanced straightening services.',
      image: straighteningImg,
      price: '₹3,777',
      priceSuffix: 'onwards',
      whatsappMessage: 'Hi B21! I\'m interested in Hair Straightening.'
    },
    {
      title: 'Hair Colour',
      description: 'Express your style with vibrant shades and expert coloring.',
      image: haircolorImg,
      price: '₹300',
      priceSuffix: 'per streak',
      whatsappMessage: 'Hi B21! I want to enquire about Hair Colouring.'
    }
  ];

  const { number: whatsappNumber } = useWhatsappConfig();

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

        {/* Horizontal carousel-like scroll on mobile, grid on larger screens */}
        <div className="flex gap-6 overflow-x-auto pb-2 -mx-4 px-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-8 md:overflow-visible md:mx-0 md:px-0">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="card-luxury card-hover group cursor-pointer flex-shrink-0 w-72 md:w-auto relative"
            >
              <div className="overflow-hidden rounded-t-2xl">
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    const el = e.currentTarget as HTMLImageElement;
                    if (el.src.endsWith('/placeholder.svg')) return;
                    el.src = '/placeholder.svg';
                  }}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              
              <div className="p-6 pb-8">
                <h3 className="text-heading-md mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="flex items-baseline justify-start">
                  <div className="flex items-end gap-2">
                    <div className="text-3xl font-extrabold text-accent">{service.price}</div>
                    {service.priceSuffix && (
                      <span className="text-xs text-muted-foreground mb-1">{service.priceSuffix}</span>
                    )}
                  </div>
                </div>

                {/* Floating circular CTA */}
                <a
                  href={buildWhatsAppUrl(whatsappNumber, service.whatsappMessage, 'service-inquiry')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute -bottom-6 right-5 w-20 h-20 rounded-full bg-accent text-black shadow-xl flex flex-col items-center justify-center gap-0.5 hover:brightness-95 transition"
                >
                  <span className="text-[10px] font-bold tracking-widest">BOOK</span>
                  <span className="text-[10px] font-bold tracking-widest">NOW</span>
                  <ArrowRight size={14} className="mt-0.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;