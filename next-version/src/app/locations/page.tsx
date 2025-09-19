"use client";
import { useState, useRef } from 'react';
import Header from '../../components/site/Header';
import Footer from '../../components/site/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { useFocusTrap } from '../../hooks/useFocusTrap';

const locations = [
  { id:1, city:'Mumbai - Colaba', address:'123 Luxury Avenue, Colaba, Mumbai 400001', phone:'+91 98765 43210' },
  { id:2, city:'Mumbai - Bandra', address:'55 Ocean View Rd, Bandra West, Mumbai 400050', phone:'+91 98765 98765' },
  { id:3, city:'Pune - Koregaon Park', address:'77 Palm Grove, Koregaon Park, Pune 411001', phone:'+91 91234 56789' },
];

export default function LocationsPage(){
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement|null>(null);
  useFocusTrap(open, panelRef, ()=>setOpen(false));
  return (
    <>
      <Header />
      <main className="pt-24 pb-32">
        <section className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-12">Locations & Franchise</h1>
          <div className="grid md:grid-cols-3 gap-8">
            {locations.map(l => (
              <div key={l.id} className="rounded-2xl border p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
                <h2 className="text-xl font-semibold mb-2">{l.city}</h2>
                <p className="text-sm text-neutral-600 mb-4 leading-relaxed">{l.address}</p>
                <p className="text-sm font-medium">{l.phone}</p>
                <button className="mt-4 text-xs font-semibold px-3 py-1.5 rounded bg-black text-white">Get Directions</button>
              </div>
            ))}
          </div>
          <div className="mt-20 text-center">
            <h2 className="text-3xl font-bold mb-4">Want to join the B21 family?</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto mb-8">Partner with a trusted luxury salon brand. We provide training, marketing support and an established operating playbook to accelerate your success.</p>
            <button onClick={()=>setOpen(true)} className="px-8 py-4 rounded-full bg-accent font-semibold text-black text-sm shadow hover:shadow-lg transition-shadow">Become a Franchise Partner</button>
          </div>
        </section>
      </main>
      <Footer />
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} role="dialog" aria-modal="true" aria-label="Franchise Inquiry Form">
            <motion.div ref={panelRef} initial={{x:'100%'}} animate={{x:0}} exit={{x:'100%'}} transition={{type:'spring', damping:22, stiffness:180}} className="ml-auto w-full max-w-2xl h-full bg-white flex flex-col">
              <div className="p-8 border-b flex items-center justify-between">
                <h3 className="text-2xl font-bold">Franchise Inquiry</h3>
                <button onClick={()=>setOpen(false)} className="text-sm px-3 py-1 rounded border">Close</button>
              </div>
              <form className="flex-1 overflow-y-auto p-8 space-y-6 text-sm" onSubmit={(e)=>{e.preventDefault(); setOpen(false);}}>
                <div className="grid md:grid-cols-2 gap-6">
                  <Field label="Full Name" name="fullName" />
                  <Field label="Email Address" name="email" type="email" />
                  <Field label="Phone Number" name="phone" />
                  <Field label="City" name="city" />
                  <Field label="State" name="state" />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-2 uppercase tracking-wide">Your Message</label>
                  <textarea required rows={5} className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/30 resize-none" name="message" placeholder="Tell us about your goals & experience" />
                </div>
                <div className="pt-4">
                  <button type="submit" className="px-6 py-3 rounded bg-black text-white font-semibold text-xs tracking-wide">Submit Inquiry</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Field({ label, name, type='text' }: { label: string; name: string; type?: string }){
  return (
    <div>
      <label className="block text-xs font-semibold mb-2 uppercase tracking-wide" htmlFor={name}>{label}</label>
      <input required id={name} name={name} type={type} className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/30" />
    </div>
  );
}
