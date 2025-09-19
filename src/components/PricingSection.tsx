import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import menImg from '../../Men pricing.png';
import womenImg from '../../Women pricing.png';

interface PriceItem { service: string; price: string; }

const menServices: PriceItem[] = [
  { service: 'Haircut / Blow Dry', price: '$30' },
  { service: 'Ombre/Balayage', price: '$30' },
  { service: 'Color Change', price: '$70' },
  { service: 'Full Highlight + Root', price: '$130' },
  { service: 'Haircolor Half Highlight', price: '$30' },
];
const womenServices: PriceItem[] = [
  { service: 'Layered Cut + Style', price: '$40' },
  { service: 'Global Color', price: '$80' },
  { service: 'Spa Treatment', price: '$50' },
  { service: 'Keratin Treatment', price: '$120' },
  { service: 'Bridal Styling (trial)', price: '$150' },
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

      {/* Mobile Image (full width inside flow) */}
      <div className="sm:hidden mt-4 rounded-2xl overflow-hidden -mx-2 px-2">
        <img
          src={img}
          alt={title}
          loading="lazy"
          className="w-full h-auto object-cover object-center"
        />
      </div>

      {/* Desktop / larger screens decorative image */}
      <img
        src={img}
        alt={title}
        loading="lazy"
        className="hidden sm:block absolute right-2 md:right-4 bottom-0 h-[250px] md:h-[300px] w-auto object-contain pointer-events-none select-none drop-shadow-xl translate-y-10 group-hover:translate-y-6 transition-transform duration-500"
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 sm:gap-y-4 text-xs sm:text-sm">
              {items.map(it => (
                <div key={it.service} className="flex justify-between pr-4">
                  <span className="font-medium tracking-wide mr-4 flex-1 pr-3">{it.service}</span>
                  <span className="tabular-nums font-semibold text-right">{it.price}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 sm:mt-6 text-center">
              <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white text-[10px] sm:text-xs tracking-widest hover:bg-neutral-800 transition">
                View all services & pricing
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
          <p className="uppercase tracking-wider text-[11px] sm:text-xs mb-3">Our Pricing</p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold leading-tight max-w-3xl">We've got your beauty needs covered</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8 sm:gap-10">
          <PricingCard title="MEN" img={menImg} items={menServices} open={openCard==='men'} onToggle={()=>setOpenCard(openCard==='men'?null:'men')} />
          <PricingCard title="WOMEN" img={womenImg} items={womenServices} open={openCard==='women'} onToggle={()=>setOpenCard(openCard==='women'?null:'women')} />
        </div>
      </div>
    </section>
  );
}
