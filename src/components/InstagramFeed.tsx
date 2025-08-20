import { motion } from 'framer-motion';
import { Instagram, ExternalLink } from 'lucide-react';
import hairStylingImage from '@/assets/hair-styling.jpg';
import skinCareImage from '@/assets/skin-care.jpg';
import nailArtImage from '@/assets/nail-art.jpg';

const InstagramFeed = () => {
  // Placeholder Instagram posts - replace with actual Instagram API data
  const instagramPosts = [
    { id: 1, image: hairStylingImage, caption: 'Gorgeous balayage transformation ✨' },
    { id: 2, image: skinCareImage, caption: 'Glowing skin is always in 💫' },
    { id: 3, image: nailArtImage, caption: 'Nail art perfection 💅' },
    { id: 4, image: hairStylingImage, caption: 'Hair goals achieved! 🔥' },
    { id: 5, image: skinCareImage, caption: 'Self-care Sunday vibes ✨' },
    { id: 6, image: nailArtImage, caption: 'Intricate designs that wow! 🎨' },
    { id: 7, image: hairStylingImage, caption: 'Color transformation magic ✨' },
    { id: 8, image: skinCareImage, caption: 'Radiant skin journey 🌟' }
  ];

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

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {instagramPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group cursor-pointer aspect-square rounded-lg overflow-hidden"
            >
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white text-center p-4">
                  <Instagram size={24} className="mx-auto mb-2" />
                  <p className="text-sm font-medium">{post.caption}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Follow Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <a
            href="https://instagram.com/b21salon" // Replace with actual Instagram profile
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-luxury inline-flex items-center space-x-2"
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