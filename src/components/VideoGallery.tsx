import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, X, Volume2, VolumeX } from 'lucide-react';
import { videos } from '@/lib/videoConfig';
import { useWhatsappConfig, buildWhatsAppUrl } from '@/lib/whatsapp';

const VideoGallery = () => {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  // Use generated teasers/posters and original mp4s for now
  const videoData = videos.map((v, i) => ({
    id: i + 1,
    thumbnail: v.poster,
    title: v.title,
    stylist: 'B21 Salon',
    preview: v.teaser,
    full: v.full,
    whatsappMessage: `Hi B21! I'm interested in ${v.title}.`
  }));

  const { number: whatsappNumber } = useWhatsappConfig();

  const openVideoModal = (videoId: number) => {
    setSelectedVideo(videoId);
    document.body.style.overflow = 'hidden';
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
    document.body.style.overflow = 'auto';
  };

  const selectedVideoData = videoData.find(video => video.id === selectedVideo);
  const fullVideoRef = useRef<HTMLVideoElement | null>(null);
  const previewRefs = useRef<HTMLVideoElement[]>([]);

  // Sync mute state to full screen video
  useEffect(()=>{
    if(fullVideoRef.current) fullVideoRef.current.muted = isMuted;
  },[isMuted, selectedVideo]);

  // Pause offscreen preview videos for performance
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((ent) => {
        const el = ent.target as HTMLVideoElement;
        if (ent.isIntersecting) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      });
    }, { threshold: 0.25 });
    previewRefs.current.forEach(v => v && io.observe(v));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <section id="gallery" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-heading-lg mb-6">Watch Our Work</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See our artistry in action through these transformation stories
            </p>
          </motion.div>

          {/* Horizontal Scrolling Carousel */}
          <div className="overflow-x-auto pb-4">
            <div className="flex space-x-6 min-w-max">
              {videoData.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="flex-shrink-0 w-80 cursor-pointer"
                  onClick={() => openVideoModal(video.id)}
                >
                  {/* Video Preview (Autoplay muted) */}
                  <div className="relative mb-4 group rounded-2xl overflow-hidden h-96">
                    <video
                      ref={(el)=>{ if(el) previewRefs.current[index] = el; }}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      src={video.preview}
                      playsInline
                      muted
                      loop
                      autoPlay
                      preload="metadata"
                      poster={video.thumbnail}
                      onError={(e)=>{ // fallback poster if video fails
                        const vid = e.currentTarget;
                        vid.style.display='none';
                        const img = document.createElement('img');
                        img.src = video.thumbnail as any;
                        img.className='w-full h-full object-cover';
                        vid.parentElement?.appendChild(img);
                      }}
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <motion.div whileHover={{ scale: 1.1 }} className="w-16 h-16 bg-accent rounded-full flex items-center justify-center shadow-gold">
                        <Play size={24} className="text-accent-foreground ml-1" fill="currentColor" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Service Info */}
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{video.title}</h3>
                      <p className="text-sm text-muted-foreground">{video.stylist}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Video Popup Modal */}
      {selectedVideo && selectedVideoData && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={closeVideoModal}
        >
          <div className="relative w-full h-full max-h-screen p-4 md:p-0 md:max-w-none">
            {/* Close Button */}
            <button
              onClick={closeVideoModal}
              className="absolute top-6 right-6 z-10 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              <X size={24} />
            </button>

            {/* Mute/Unmute Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMuted(!isMuted);
              }}
              className="absolute top-6 left-6 z-10 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>

            {/* Video Container and CTA */}
            <div className="relative w-full h-full flex flex-col">
              <div className="flex-1 flex items-center justify-center px-0 md:px-0">
                <div className="relative w-full md:w-auto max-w-full md:max-w-none bg-black md:bg-transparent rounded-lg md:rounded-none overflow-hidden md:overflow-visible flex items-center justify-center">
                  <video
                    ref={fullVideoRef}
                    src={selectedVideoData.full}
                    className="w-full h-full object-contain md:h-[94vh] md:max-h-[94vh] md:w-auto md:max-w-[96vw]"
                    playsInline
                    autoPlay
                    loop
                    muted={isMuted}
                    controls={false}
                  />

                  {/* Floating CTA button on desktop only */}
                  <a
                    href={buildWhatsAppUrl(whatsappNumber, selectedVideoData.whatsappMessage, 'video-inquiry')}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e)=>e.stopPropagation()}
                    className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 hover:bg-white text-black text-xs font-semibold absolute bottom-4 right-4 shadow-lg"
                    aria-label="Book This Service"
                  >
                    <span>Book</span>
                  </a>
                </div>
              </div>

              {/* Keep the full-width bottom card for mobile only */}
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="md:hidden bg-black/70 backdrop-blur-md rounded-t-2xl p-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden">
                    <img
                      src={selectedVideoData.thumbnail}
                      alt={selectedVideoData.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white text-lg font-semibold mb-1">{selectedVideoData.title}</h3>
                    <p className="text-white/70 text-xs">Tap sound icon to {isMuted ? 'unmute' : 'mute'}</p>
                  </div>
                </div>

                <a
                  href={buildWhatsAppUrl(whatsappNumber, selectedVideoData.whatsappMessage, 'video-inquiry')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full btn-luxury flex items-center justify-center"
                >
                  Book This Service
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default VideoGallery;