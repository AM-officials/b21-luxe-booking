import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FranchiseForm from './FranchiseForm';
import { useWhatsappConfig } from '@/lib/whatsapp';
import { Instagram } from 'lucide-react';

type Franchise = {
  name: string;
  ig: string;
  number: string;
  locationUrl: string;
  address: string;
  hours: string;
  image?: string; // placeholder to be filled later
  note?: string;
};

const locations: Franchise[] = [
  {
    name: 'B21',
    ig: 'https://www.instagram.com/b21india/?hl=en',
    number: '80930 81930',
    locationUrl: 'https://share.google/QOWqE1CFrYfvC28co',
    address: 'Opposite BMC Bhawani Mall Exitgate, Saheed Nagar, Bhubaneswar, Odisha 751007',
    hours: 'Opens 10:30 am Sun',
  },
  {
    name: 'B21 Hair Beauty Spa',
    ig: 'https://www.instagram.com/b21india/?hl=en',
    number: '90900 34567',
    locationUrl: 'https://share.google/te5Fdz3Uftt5dW4lK',
    address: 'Located in: Subham Market Complex\nIndustrial Area, Kharvela Nagar, Bhubaneswar, Odisha 751001',
    hours: 'Opens 10:30 am Sun',
  },
  {
    name: 'B21 Salon',
    ig: 'https://www.instagram.com/b21jaydevvihar/?hl=en',
    number: '081178 40978',
    locationUrl: 'https://share.google/vbTRtK4jLdRkBZoNd',
    address: '4762 Biju, Plot no - 369, Biju Pattnaik College Rd, Jayadev Vihar, Bhubaneswar, Odisha 751015',
    hours: 'Opens 10:30 am Sun',
  },
  {
    name: 'B21 Ladies Salon',
    ig: 'https://www.instagram.com/b21bhadrak/?hl=en',
    number: '90904 49700',
    locationUrl: 'https://share.google/vN2l0DjDiW2abnolU',
    address: 'Plot No 1232/2802/4027, Bypass Chapulia Road, Bhadrak, Odisha 756101',
    hours: 'Opens 10:30 am Sun',
  },
];

export default function LocationsSection(){
  const [open,setOpen]=useState(false);
  const { url: waUrl } = useWhatsappConfig("Hello B21! I'd like to book an appointment.");
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
              <p className="text-sm leading-relaxed">Call/WhatsApp for bookings<br/>Opens 10:30AM Daily</p>
              <a href={waUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block px-6 py-3 rounded-md bg-black text-white text-xs tracking-widest hover:bg-neutral-800">Book an appointment</a>
            </div>
          </div>
        </div>

        {/* Other Locations */}
  <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-8 text-center">Our Locations</h2>
        <div className="overflow-x-auto -mx-4 px-4 pb-4 sm:pb-0">
          <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-5 min-w-max sm:min-w-0">
            {locations.map((l) => (
              <div key={l.name} className="flex-shrink-0 w-72 sm:w-auto p-0 rounded-3xl bg-white shadow-sm border border-black/5 hover:shadow-lg transition overflow-hidden">
                {/* Image placeholder */}
                <div className="h-36 bg-neutral-200 flex items-center justify-center text-neutral-500 text-xs">
                  Image placeholder
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between gap-3 mb-1">
                    <h3 className="font-semibold tracking-wide">{l.name}</h3>
                    <a href={l.ig} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-700" aria-label="Instagram">
                      <Instagram size={18} />
                    </a>
                  </div>
                  <p className="text-sm text-neutral-600 whitespace-pre-line leading-relaxed">{l.address}</p>
                  <p className="mt-2 text-xs font-medium">{l.hours}</p>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <a href={`tel:${l.number.replace(/\s/g, '')}`} className="px-3 py-2 rounded-md bg-black text-white text-[11px] tracking-widest text-center">Call Us</a>
                    <a href={l.locationUrl} target="_blank" rel="noopener noreferrer" className="px-3 py-2 rounded-md border text-[11px] tracking-widest text-center">Get directions</a>
                  </div>
                </div>
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
