"use client";
import { useState } from 'react';
// Using relative imports here to avoid any workspace root tsconfig alias conflicts
import Header from '../../components/site/Header';
import Footer from '../../components/site/Footer';
import { AnimatePresence, motion } from 'framer-motion';

const faqs = [
  { q: 'What are the benefits of saffron for skin?', a: 'Saffron helps brighten skin, reduce dullness, and improve overall skin tone.' },
  { q: 'What ingredients help in removing tan effectively?', a: 'Actives like Vitamin C, Niacinamide, and gentle exfoliants (AHAs) help reduce tan with consistent use.' },
  { q: 'Is it okay to use nourishing hair masks weekly?', a: 'Yes—weekly use supports moisture balance and reduces breakage for most hair types.' },
  { q: 'How long does a keratin treatment last?', a: 'Typically 3–5 months with sulfate-free aftercare products and reduced heat styling.' },
];

export default function FAQPage(){
  const [open, setOpen] = useState<number|null>(0);
  return (
    <>
      <Header />
      <main className="pt-24 pb-32">
        <section className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-12">Frequently Asked Questions</h1>
          <ul className="divide-y">
            {faqs.map((f,i)=>(
              <li key={i} className="py-6">
                <button onClick={()=>setOpen(o=>o===i?null:i)} className="flex w-full items-center justify-between text-left group">
                  <span className="font-semibold tracking-wide pr-8 group-hover:text-accent transition-colors">{String(i+1).padStart(2,'0')}. {f.q}</span>
                  <span className="text-xs font-semibold border rounded px-2 py-1 group-hover:bg-black group-hover:text-white transition-colors">{open===i?'-':'+'}</span>
                </button>
                <AnimatePresence initial={false}>
                  {open===i && (
                    <motion.div key="content" initial={{height:0, opacity:0}} animate={{height:'auto', opacity:1}} exit={{height:0, opacity:0}} transition={{duration:0.35}} className="overflow-hidden">
                      <p className="text-sm text-neutral-600 mt-4 leading-relaxed pr-10">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
