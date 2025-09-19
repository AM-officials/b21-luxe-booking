import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQ { q: string; a: string; }
const faqs: FAQ[] = [
  { q: 'What are the benefits of saffron for skin?', a: 'Saffron helps brighten skin, reduce dullness, and improve overall skin tone.' },
  { q: 'What ingredients help in removing tan effectively?', a: 'Ingredients like saffron, turmeric, licorice and vitamin C derived botanicals help remove tan and restore glow.' },
  { q: 'Is it okay to use tan reduction soap daily?', a: 'Yes, when formulated gently; always moisturize afterwards and use sunscreen.' },
  { q: 'Do you offer bridal packages?', a: 'Yes – custom curated hair, skin & nail packages. Contact us for a consultation.' },
];

export default function FAQSection(){
  const [open, setOpen] = useState<number|null>(0);
  return (
    <section className="py-24 bg-[#f6e4d9]" id="faq">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-10 tracking-tight">Frequently Asked Questions</h2>
        <div className="divide-y divide-black/10 border-y border-black/10">
          {faqs.map((f,i)=>(
            <div key={f.q} className="py-6">
              <button className="flex items-start w-full text-left gap-6" onClick={()=>setOpen(open===i?null:i)}>
                <span className="text-sm md:text-base font-bold tracking-wide w-8 shrink-0">{(i+1).toString().padStart(2,'0')}.</span>
                <span className="flex-1 font-semibold leading-snug pr-6">{f.q}</span>
                <span className="mt-1 text-xl font-bold">{open===i?'–':'+'}</span>
              </button>
              <AnimatePresence initial={false}> {open===i && (
                <motion.p initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} transition={{duration:0.35}} className="pl-14 pr-10 pt-1 text-sm md:text-base text-neutral-700 leading-relaxed">
                  {f.a}
                </motion.p>
              )}</AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
