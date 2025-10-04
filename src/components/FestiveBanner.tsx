import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { useWhatsappConfig } from '@/lib/whatsapp';
import { fetchFestiveBannerConfig } from '@/lib/supabaseApi';

const FestiveBanner = () => {
  const { data: cfg } = useQuery({
    queryKey: ['festive_banner'],
    queryFn: fetchFestiveBannerConfig,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  const { url: whatsappUrl } = useWhatsappConfig(
    (cfg as any)?.whatsapp_message ?? "Hi B21! I'm interested in your Festive Glow offers.",
    'festive-banner'
  );

  // Don't render if disabled in CMS
  if ((cfg as any)?.enabled === false) return null;

  const bannerImgUrl = (cfg as any)?.banner_image ?? '/images/pop-up-banner.jpg';
  const title = (cfg as any)?.title ?? 'FESTIVE GLOW';
  const subtitle = (cfg as any)?.subtitle ?? 'Celebrate the season with our exclusive festive beauty packages';
  const buttonText = (cfg as any)?.button_text ?? 'VIEW OFFERS';

  return (
    <section className="relative py-20 md:py-28 overflow-hidden" aria-labelledby="festive-heading">
      {/* Banner Background Image */}
      <div className="absolute inset-0">
        <img
          src={bannerImgUrl}
          alt="Festive seasonal offer banner"
          className="w-full h-full object-cover object-center"
          loading="lazy"
        />
        {/* Overlay gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/10" />
        <div className="absolute inset-0 opacity-20 mix-blend-overlay" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.25'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
        >
          <h2
            id="festive-heading"
            className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white mb-8 tracking-tight"
            style={{ textShadow: '0 4px 24px rgba(0,0,0,0.45)' }}
          >
            {title}
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg sm:text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto font-medium"
          >
            {subtitle}
          </motion.p>
          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-dark inline-flex items-center text-base sm:text-lg px-10 sm:px-12 py-4 shadow-lg shadow-black/30"
          >
            {buttonText}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default FestiveBanner;