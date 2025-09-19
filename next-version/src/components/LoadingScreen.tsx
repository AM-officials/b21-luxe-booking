"use client";
import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Image from 'next/image';

export default function LoadingScreen() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => {
      setDone(true);
      // signal globally that initial app load animation is complete
      try { window.dispatchEvent(new Event('appLoaded')); } catch {}
    }, 2200);
    return () => clearTimeout(t);
  }, []);
  const prefersReduced = useReducedMotion();
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6 } }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0.7 }}
            animate={prefersReduced ? { opacity: 1 } : { scale: [0.9, 1.04, 0.96, 1], opacity: 1 }}
            transition={prefersReduced ? { duration: 0.8 } : { duration: 1.8, repeat: Infinity, repeatType: 'reverse' }}
            className="relative w-48 h-48 select-none"
          >
            <Image src="/logo-white.png" alt="B21" fill priority style={{ objectFit: 'contain' }} />
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ background: 'radial-gradient(circle at 30% 30%,rgba(255,255,255,0.35),transparent 60%)' }}
              initial={{ opacity: 0 }}
              animate={prefersReduced ? { opacity: 0.4 } : { opacity: [0.2, 0.6, 0.2] }}
              transition={prefersReduced ? { duration: 1.2 } : { duration: 2.4, repeat: Infinity }}
            />
            {!prefersReduced && (
              <motion.div
                className="absolute -inset-8 pointer-events-none"
                initial={{ rotate:45 }}
                aria-hidden="true"
              >
                <motion.div
                  className="absolute top-0 left-0 h-full w-32 bg-gradient-to-r from-transparent via-white/25 to-transparent blur-2xl"
                  animate={{ x: ['-20%','140%'] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                />
              </motion.div>
            )}
          </motion.div>
          <button onClick={()=>{ setDone(true); try { window.dispatchEvent(new Event('appLoaded')); } catch {} }} className="absolute bottom-6 text-[10px] tracking-widest text-white/40 hover:text-white/80 focus:outline-none focus:ring-2 focus:ring-white/30 rounded px-3 py-1">Skip</button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
