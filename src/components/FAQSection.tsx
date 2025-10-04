import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQ { q: string; a: string; }
const faqs: FAQ[] = [
  { q: 'What services does B21 Salon offer?', a: 'B21 Salon provides complete ladies’ hair, beauty and bridal services at our outlets in Bhubaneswar and Bhadrak. From haircuts, hair colour, facials and skin care to bridal makeup, party makeup, manicure, pedicure and hair spa treatments, we’re your one-stop destination for luxury salon services.' },
  { q: 'Do you offer bridal makeup packages at B21 Salon?', a: 'Yes. B21 Salon specialises in bridal makeup and pre-bridal packages. Our expert artists create personalised looks for engagement, reception and wedding day using premium, long-lasting products.' },
  { q: 'Are your hair & skin products safe for Indian hair and skin?', a: 'Absolutely. We use only certified, dermatologist-approved hair and skin products at all of our salons. This ensures every facial, hair spa or beauty treatment is safe, gentle and effective.' },
  { q: 'Do you provide hair treatments for damaged or coloured hair?', a: 'Yes. At our Bhubaneswar and Bhadrak salons, we offer professional hair spa and repair treatments to restore shine, smoothness and strength to damaged or coloured hair. Our stylists will also guide you with a customised hair care routine.' },
  { q: 'Can I book an appointment online at B21 Salon?', a: 'Yes. You can easily book your appointment online through our website or by calling. Select your service, stylist and time slot for a seamless salon experience.' },
  { q: 'Do you have special offers or seasonal discounts?', a: 'We frequently launch exclusive offers on bridal makeup, facials, hair spa and party makeup at our outlets. Check our website or social media pages for the latest deals.' },
  { q: 'How often should I get a facial or hair spa at B21 Salon?', a: 'For best results, we recommend a facial every 4–6 weeks and a hair spa every 2–4 weeks depending on your skin and hair condition. Our Salon experts will guide you with a personalised plan.' },
  { q: 'Do you follow hygiene and safety protocols?', a: 'Yes. At B21 Salon Bhubaneswar & B21 Salon Bhadrak, your safety is our priority. We maintain strict sanitisation, hygiene and single-use product policies for every client.' },
  { q: 'Do you offer party or casual makeup too?', a: 'Yes. Along with bridal looks, we also provide party makeup, casual day makeup and event styling at both our Bhubaneswar and Bhadrak salons to make you look your best for every occasion.' },
  { q: 'Where can I find a B21 Salon near me?', a: 'You can visit B21 Salon in Bhubaneswar or B21 Salon in Bhadrak. Use our website location section to find the nearest salon and book your appointment instantly.' },
];

export default function FAQSection(){
  const [open, setOpen] = useState<number|null>(0);
  return (
  <section className="py-24 bg-[#f6f7ed]" id="faq">
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
