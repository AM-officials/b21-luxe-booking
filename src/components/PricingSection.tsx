import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import menImg from '../../Men pricing.png';
import womenImg from '../../Women pricing.png';

interface PriceItem { service: string; price: string; }

const menServices: PriceItem[] = [
  { service: 'Haircut / Wash', price: 'Rs.300' },
  { service: 'Beard Trim', price: 'Rs.200' },
  { service: 'Hair Highlights', price: 'Rs.160' },
  { service: 'Hair Color', price: 'Rs.1000' },
  { service: 'Head Oil Massage', price: 'Rs.400' },
  { service: 'Hair Treatment', price: 'Rs.950' },
  { service: 'Straightening / Smoothening', price: 'Rs.2900' },
  { service: 'Keratin', price: 'Rs.1900' },
  { service: 'Groom Makeup', price: 'Rs.2100' },
  { service: 'Groom Package', price: 'Rs.5000' },
];
const womenServices: PriceItem[] = [
  { service: 'Haircut', price: 'Rs.600' },
  { service: 'Threading', price: 'Rs.60' },
  { service: 'Hair Highlights', price: 'Rs.300' },
  { service: 'Root Touch-up', price: 'Rs.1300' },
  { service: 'Global Hair Color', price: 'Rs.2200' },
  { service: 'Fashion Hair Color', price: 'Rs.2600' },
  { service: 'Head Oil Massage', price: 'Rs.750' },
  { service: 'Hair Spa', price: 'Rs.1100' },
  { service: 'Hair Treatment', price: 'Rs.2000' },
  { service: 'Scalp Treatment', price: 'Rs.1600' },
  { service: 'Straightening / Smoothening', price: 'Rs.3777' },
  { service: 'Keratin', price: 'Rs.3777' },
  { service: 'Hair Botox', price: 'Rs.3999' },
  { service: 'Waxing', price: 'Rs.1250' },
  { service: 'Makeup', price: 'Rs.150' },
  { service: 'Bridal Makeup', price: 'Rs.9000' },
  { service: 'Bridal Package', price: 'Rs.9000' },
];

// Common (Unisex) services displayed in both cards for clarity
const commonServices: PriceItem[] = [
  { service: 'Cleanup', price: 'Rs.600' },
  { service: 'Facial', price: 'Rs.1250' },
  { service: 'Skin Treatment', price: 'Rs.3800' },
  { service: 'Detan', price: 'Rs.450' },
  { service: 'Manicure / Pedicure', price: 'Rs.600' },
  { service: 'Body Polishing', price: 'Rs.2700' },
];

type CardProps = { title: string; img: string; items: PriceItem[]; open: boolean; onOpen: ()=>void; onShrink: ()=>void };

// Build a pill card with image on left/right and text on the opposite side
function PricingCard({ title, img, items, open, onOpen, onShrink }: CardProps) {
  return (
    <motion.div
      layout
      onClick={onOpen}
      initial={false}
      className="group cursor-pointer bg-[#eef0e4] rounded-[28px] sm:rounded-[36px] shadow-lg overflow-hidden"
    >
      {/* Top: image banner area only (PNG fully visible) */}
      <div className="relative w-full">
        <div className="w-full h-[220px] sm:h-[260px] md:h-[300px]">
          <img src={img} alt={title} className="w-full h-full object-contain" />
        </div>
      </div>

      {/* Expandable content */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35 }}
            className="px-5 sm:px-6 pb-6 sm:pb-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mt-4 sm:mt-6 bg-white/70 backdrop-blur rounded-3xl border border-black/5 p-5 sm:p-6">
              {/* Primary services list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 sm:gap-y-4 text-xs sm:text-sm">
                {items.map(it => (
                  <div key={it.service} className="flex justify-between pr-4">
                    <span className="font-medium tracking-wide mr-4 flex-1 pr-3">{it.service}</span>
                    <span className="tabular-nums font-semibold text-right">{it.price}</span>
                  </div>
                ))}
              </div>

              {/* Common (Unisex) separation */}
              <div className="my-5 sm:my-6 flex items-center gap-3">
                <div className="h-px bg-black/10 flex-1" />
                <span className="text-[10px] sm:text-xs tracking-widest font-semibold text-black/70 uppercase">Common (Unisex)</span>
                <div className="h-px bg-black/10 flex-1" />
              </div>

              {/* Common services list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 sm:gap-y-4 text-xs sm:text-sm">
                {commonServices.map(it => (
                  <div key={it.service} className="flex justify-between pr-4">
                    <span className="font-medium tracking-wide mr-4 flex-1 pr-3">{it.service}</span>
                    <span className="tabular-nums font-semibold text-right">{it.price}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 sm:mt-6 text-center">
                <button onClick={onShrink} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white text-[10px] sm:text-xs tracking-widest hover:bg-neutral-800 transition">
                  SHRINK
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function PricingSection(){
  const [openCard, setOpenCard] = useState<'men'|'women'|null>(null);
  return (
    <section className="py-20 sm:py-24 bg-background" id="pricing">
      <div className="container mx-auto px-4">
        <div className="mb-10 sm:mb-14">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">Our Pricing</h2>
          <p className="mt-2 text-base sm:text-lg text-muted-foreground max-w-3xl">We've got your beauty needs covered</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 sm:gap-10">
          <PricingCard
            title="MEN"
            img={menImg}
            items={menServices}
            open={openCard==='men'}
            onOpen={()=>setOpenCard('men')}
            onShrink={()=>setOpenCard(null)}
          />
          <PricingCard
            title="WOMEN"
            img={womenImg}
            items={womenServices}
            open={openCard==='women'}
            onOpen={()=>setOpenCard('women')}
            onShrink={()=>setOpenCard(null)}
          />
        </div>
      </div>
    </section>
  );
}
