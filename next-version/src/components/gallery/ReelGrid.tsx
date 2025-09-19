"use client";
import { useState, useEffect, useRef } from 'react';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { motion, AnimatePresence } from 'framer-motion';

// Placeholder Reel data: replace with real Instagram reel URLs
const reels = [
  { id: 'r1', url: 'https://www.instagram.com/reel/XXXXXXXXXXX/', thumb: '/media/reel-1.jpg' },
  { id: 'r2', url: 'https://www.instagram.com/reel/YYYYYYYYYYY/', thumb: '/media/reel-2.jpg' },
  { id: 'r3', url: 'https://www.instagram.com/reel/ZZZZZZZZZZZ/', thumb: '/media/reel-3.jpg' },
];

export default function ReelGrid(){
  const [active, setActive] = useState<string|null>(null);
  const modalRef = useRef<HTMLDivElement|null>(null);
  useFocusTrap(!!active, modalRef, ()=>setActive(null));
  // inject Instagram embed script when modal opens first time
  useEffect(() => {
    if(!active) return;
    if(document.querySelector('script#ig-embed')) return;
    const s = document.createElement('script');
    s.id = 'ig-embed';
    s.async = true;
    s.src = 'https://www.instagram.com/embed.js';
    document.body.appendChild(s);
  }, [active]);
  return (
    <div>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {reels.map(r => (
          <button key={r.id} onClick={()=>setActive(r.id)} className="group relative overflow-hidden rounded-xl aspect-[9/16] bg-neutral-200">
            <img src={r.thumb} alt="Reel thumbnail" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-sm tracking-wide transition-opacity">VIEW</div>
          </button>
        ))}
      </div>
      <AnimatePresence>
        {active && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} aria-modal="true" role="dialog" aria-label="Instagram Reel" >
            <motion.div initial={{scale:0.9}} animate={{scale:1}} exit={{scale:0.9}} className="bg-white rounded-xl w-full max-w-sm overflow-hidden shadow-xl" ref={modalRef}>
              <div className="relative">
                <blockquote className="instagram-media" data-instgrm-permalink={reels.find(r=>r.id===active)?.url} data-instgrm-version="14" style={{ background:'#fff', border:0, margin:0, padding:0 }}>
                  <div className="p-6 text-center text-xs text-neutral-400">Loading Reel...</div>
                </blockquote>
              </div>
              <button onClick={()=>setActive(null)} className="w-full py-3 text-sm font-medium hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-black/40">Close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
