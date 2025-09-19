import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, X, Volume2, VolumeX } from 'lucide-react';
import { videos } from '@/lib/videoConfig';

const VideoGallery = () => {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  // Use generated teasers/posters and original mp4s for now
  const videoData = videos.map((v, i) => ({
    id: i + 1,
    thumbnail: v.poster,
    title: v.title,
    stylist: 'B21 Studio',
    preview: v.teaser,
    full: v.full,
    whatsappMessage: `Hi B21! I'm interested in ${v.title}.`
  }));

  const whatsappNumber = "919876543210"; // Replace with actual number

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
          <div className="relative w-full h-full max-w-4xl max-h-screen p-4">
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

            {/* Video Container */}
            <div className="relative w-full h-full flex flex-col">
              <div className="flex-1 flex items-center justify-center mb-4">
                <div className="relative w-full max-w-2xl aspect-[9/16] bg-black rounded-lg overflow-hidden">
                  <video
                    ref={fullVideoRef}
                    src={selectedVideoData.full}
                    className="absolute inset-0 w-full h-full object-cover"
                    playsInline
                    autoPlay
                    loop
                    muted={isMuted}
                    controls={false}
                  />
                </div>
              </div>

              {/* Bottom Card */}
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-black/70 backdrop-blur-md rounded-2xl p-6"
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
                    <h3 className="text-white text-xl font-semibold mb-1">{selectedVideoData.title}</h3>
                    <p className="text-white/70 text-sm">Tap sound icon to {isMuted ? 'unmute' : 'mute'}</p>
                  </div>
                </div>

                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(selectedVideoData.whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full btn-luxury flex items-center justify-center space-x-2"
                >
                  <span>Book This Service</span>
                  <div className="w-5 h-5 bg-accent-foreground/20 rounded flex items-center justify-center">
                    <span className="text-xs">🎁</span>
                  </div>
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