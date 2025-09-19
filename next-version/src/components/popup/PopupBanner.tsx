"use client";
import { usePopupBanner } from '../../context/PopupContext';
import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function PopupBanner() {
  const { config, dismissed, dismiss, readyToShow } = usePopupBanner();
  const show = config.enabled && readyToShow && !dismissed;
  const containerRef = useRef<HTMLDivElement | null>(null);

  // focus management & escape close
  useEffect(() => {
    if(!show) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const el = containerRef.current;
    const focusable = el?.querySelectorAll<HTMLElement>(
      'a[href],button:not([disabled]),textarea,input[type="text"],input[type="file"],input[type="checkbox"],input[type="radio"],select'
    );
    focusable && focusable[0]?.focus();
    function onKey(e: KeyboardEvent){
      if(e.key==='Escape'){ e.preventDefault(); dismiss(); }
      if(e.key==='Tab' && focusable && focusable.length>0){
        const first = focusable[0];
        const last = focusable[focusable.length-1];
        if(e.shiftKey && document.activeElement===first){ e.preventDefault(); last.focus(); }
        else if(!e.shiftKey && document.activeElement===last){ e.preventDefault(); first.focus(); }
      }
    }
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('keydown', onKey); previouslyFocused?.focus(); };
  }, [show, dismiss]);
  return (
    <AnimatePresence>
      {show && (
    <motion.div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 backdrop-blur-sm" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} role="dialog" aria-modal="true" aria-labelledby="popup-headline" aria-describedby="popup-body">
          <motion.div
            initial={{ y: 40, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 160, damping: 18 } }}
            exit={{ y: 20, opacity: 0, scale: 0.95 }}
      className="relative w-[min(92%,900px)] bg-white rounded-2xl shadow-2xl overflow-hidden grid md:grid-cols-2"
      ref={containerRef}
          >
            <div className="relative h-56 md:h-full bg-gradient-to-br from-neutral-900 to-neutral-700 text-white flex items-center justify-center">
              {config.imageUrl ? (
                <Image src={config.imageUrl} alt="Banner" fill style={{ objectFit: 'cover' }} />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-xs tracking-widest opacity-40">B21</div>
              )}
              <div className="absolute inset-0 bg-black/40" />
              <div className="relative z-10 p-4 text-center md:hidden">
                <h2 className="text-xl font-semibold tracking-tight">{config.headline}</h2>
              </div>
            </div>
            <div className="p-8 md:p-10 flex flex-col">
              <button onClick={dismiss} className="absolute top-3 right-3 text-xs px-2 py-1 rounded bg-black text-white/80 hover:text-white">Close</button>
              <h2 id="popup-headline" className="hidden md:block text-3xl font-bold mb-4 tracking-tight bg-gradient-to-r from-black to-neutral-500 bg-clip-text text-transparent">{config.headline}</h2>
              <p id="popup-body" className="text-sm leading-relaxed text-neutral-600 mb-6 flex-1">{config.offerText}</p>
              <div className="flex gap-4 items-center flex-wrap">
                <Link href={config.buttonLink} onClick={dismiss} className="inline-flex items-center gap-2 rounded-full bg-black text-white px-6 py-3 text-sm font-medium hover:bg-neutral-800 transition-colors">
                  {config.buttonText}
                </Link>
                <button onClick={dismiss} className="text-xs tracking-wide text-neutral-500 hover:text-neutral-800">Maybe later</button>
              </div>
              <div className="mt-6 pt-4 border-t text-[10px] uppercase tracking-widest text-neutral-400">Powered by Popup CMS (preview)</div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
