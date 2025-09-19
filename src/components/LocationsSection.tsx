import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FranchiseForm from './FranchiseForm';

const locations = [
  { city: 'New York', address: '758 5th Avenue, NY 10057', phone: '+1-800-356-8933' },
  { city: 'Los Angeles', address: '1024 Sunset Blvd, CA 90028', phone: '+1-800-356-8933' },
  { city: 'Chicago', address: '220 Michigan Ave, IL 60601', phone: '+1-800-356-8933' },
  { city: 'Miami', address: '44 Ocean Dr, FL 33139', phone: '+1-800-356-8933' },
];

export default function LocationsSection(){
  const [open,setOpen]=useState(false);
  return (
    <section id="locations" className="py-20 sm:py-24 bg-[#f6f7ed]">
      <div className="container mx-auto px-4">
        {/* Hours + Primary Location Card */}
        <div className="max-w-3xl bg-[#e9e7de] rounded-3xl p-6 sm:p-10 mb-16 mx-auto shadow-sm">
          <div className="grid sm:grid-cols-2 gap-8">
            <div>
              <h3 className="font-heading text-xl tracking-wide mb-4">HOURS</h3>
              <ul className="space-y-2 text-sm font-medium">
                <li className="flex justify-between"><span>Monday - Friday</span><span>8:00AM - 7:00PM</span></li>
                <li className="flex justify-between"><span>Saturday</span><span>8:00AM - 5:00PM</span></li>
                <li className="flex justify-between"><span>Sunday</span><span>8:00AM - 3:00PM</span></li>
              </ul>
            </div>
            <div>
              <h3 className="font-heading text-xl tracking-wide mb-4">LOCATION</h3>
              <p className="text-sm leading-relaxed">+1-800-356-8933<br/>booking@domain.com<br/>In the heart of NYC:<br/>758 5th Avenue, New York, NY 10057</p>
              <button className="mt-6 px-6 py-3 rounded-md bg-black text-white text-xs tracking-widest hover:bg-neutral-800">Book an appointment</button>
            </div>
          </div>
        </div>

        {/* Other Locations */}
        <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-8 text-center">Other Locations</h2>
        <div className="overflow-x-auto -mx-4 px-4 pb-4 sm:pb-0">
          <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-5 min-w-max sm:min-w-0">
            {locations.map(l => (
              <div key={l.city} className="flex-shrink-0 w-64 sm:w-auto p-6 rounded-3xl bg-white shadow-sm border border-black/5 hover:shadow-lg transition">
                <h3 className="font-semibold tracking-wide mb-2">{l.city}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{l.address}</p>
                <p className="mt-3 text-xs font-medium">{l.phone}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Franchise CTA */}
        <div className="mt-16 max-w-4xl mx-auto text-center bg-white/80 backdrop-blur rounded-3xl p-10 border border-black/5 shadow-sm">
          <h3 className="font-heading text-2xl sm:text-3xl font-bold mb-4">Franchise Opportunities</h3>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-2xl mx-auto mb-6">Grow with us as we expand. If you share our passion for elevated beauty experiences, register your interest and our team will connect with you.</p>
            <button onClick={()=>setOpen(true)} className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-black text-white text-xs tracking-widest hover:bg-neutral-800">I'M INTERESTED</button>
        </div>
      </div>

      {/* Franchise Modal */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={()=>setOpen(false)}>
            <motion.div initial={{y:40,opacity:0}} animate={{y:0,opacity:1}} exit={{y:40,opacity:0}} className="relative max-w-2xl w-full bg-background rounded-3xl p-6 sm:p-8" onClick={(e)=>e.stopPropagation()}>
              <button onClick={()=>setOpen(false)} className="absolute top-4 right-4 text-[10px] tracking-widest text-neutral-500 hover:text-neutral-900">CLOSE</button>
              <h3 className="text-2xl font-heading font-bold mb-6">Franchise Interest Form</h3>
              <FranchiseForm onClose={()=>setOpen(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
