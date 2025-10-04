import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Use optimized versions generated into public/images/optimized when available
const menImg = '/images/optimized/men-pricing.jpg';
const womenImg = '/images/optimized/women-pricing.jpg';

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
  { service: 'Nano Plastia Hair Treatment', price: 'Rs.3777' },
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
  { service: 'Nano Plastia Hair Treatment', price: 'Rs.3777' },
  { service: 'Waxing', price: 'Rs.1250' },
  { service: 'Makeup', price: 'Rs.150' },
  { service: 'Bridal Makeup', price: 'Rs.9000' },
  { service: 'Bridal Package', price: 'Rs.9000' },
];

// Skin Services (formerly Common/Unisex) displayed in both cards
const skinServices: PriceItem[] = [
  { service: 'Cleanup', price: 'Rs.600' },
  { service: 'Facial', price: 'Rs.1250' },
  { service: 'Skin Treatment', price: 'Rs.3800' },
  { service: 'Detan', price: 'Rs.450' },
  { service: 'Manicure / Pedicure', price: 'Rs.600' },
  { service: 'Body Polishing', price: 'Rs.2700' },
];

// On mobile keep overflow hidden to avoid horizontal scroll from decorative image
const cardBase = 'relative rounded-[36px] sm:rounded-[40px] overflow-hidden sm:overflow-visible bg-[#eef0e4] shadow-lg p-6 sm:p-8 flex flex-col justify-between cursor-pointer min-h-[230px] sm:min-h-[260px] max-w-full';

function PricingCard({ title, img, items, open, onToggle }: { title: string; img: string; items: PriceItem[]; open: boolean; onToggle: ()=>void; }) {
  return (
    <motion.div layout onClick={onToggle} className={cardBase + ' group'} initial={false}>
      {/* Header Row */}
      <div className="flex items-start justify-between sm:pr-44 md:pr-48">
        <h3 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-neutral-900 drop-shadow-md leading-none">
          {title}
        </h3>
        <div className="mt-1 sm:mt-2 px-4 sm:px-5 py-1.5 sm:py-2 border-2 border-black rounded-full text-[11px] sm:text-sm font-semibold bg-white shadow group-hover:shadow-md transition whitespace-nowrap">SHOP NOW</div>
      </div>

      {/* Mobile Image (full width inside flow, ignore card padding) */}
      <div className="sm:hidden mt-4 rounded-2xl overflow-hidden -mx-2 px-2">
        <img
          src={img}
          alt={title}
          loading="lazy"
          className="w-full h-56 object-cover object-center"
        />
      </div>

      {/* Desktop / larger screens decorative image (slightly larger to cover card) */}
      <img
        src={img}
        alt={title}
        loading="lazy"
        decoding="async"
        className="hidden sm:block absolute right-2 md:right-4 bottom-0 h-[300px] md:h-[360px] w-auto object-contain pointer-events-none select-none drop-shadow-xl translate-y-8 group-hover:translate-y-4 transition-transform duration-500"
      />

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-6 sm:mt-8 bg-white/70 backdrop-blur rounded-3xl border border-black/5 p-5 sm:p-6 -mx-1 sm:-mx-2"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Primary services list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 sm:gap-y-4 text-xs sm:text-sm">
              {items.map(it => (
                <div key={it.service} className="flex justify-between pr-4">
                  <span className="font-medium tracking-wide mr-4 flex-1 pr-3">{it.service}</span>
                  <span className="tabular-nums font-semibold text-right">{it.price}</span>
                </div>
              ))}
            </div>

            {/* Skin Services separation */}
            <div className="my-5 sm:my-6 flex items-center gap-3">
              <div className="h-px bg-black/10 flex-1" />
              <span className="text-[10px] sm:text-xs tracking-widest font-semibold text-black/70 uppercase">Skin Services</span>
              <div className="h-px bg-black/10 flex-1" />
            </div>

            {/* Skin services list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 sm:gap-y-4 text-xs sm:text-sm">
              {skinServices.map(it => (
                <div key={it.service} className="flex justify-between pr-4">
                  <span className="font-medium tracking-wide mr-4 flex-1 pr-3">{it.service}</span>
                  <span className="tabular-nums font-semibold text-right">{it.price}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 sm:mt-6 text-center">
              <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white text-[10px] sm:text-xs tracking-widest hover:bg-neutral-800 transition">
                Close
              </button>
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
          <PricingCard title="MEN" img={menImg} items={menServices} open={openCard==='men'} onToggle={()=>setOpenCard(openCard==='men'?null:'men')} />
          <PricingCard title="WOMEN" img={womenImg} items={womenServices} open={openCard==='women'} onToggle={()=>setOpenCard(openCard==='women'?null:'women')} />
        </div>
      </div>
    </section>
  );
}
