import React from 'react';
import { useWhatsappConfig } from '@/lib/whatsapp';
import { Instagram } from 'lucide-react';
import b21Img from '/public/images/locations/b21.jpg';
import b21HairBeautySpaImg from '/public/images/locations/b21_hair_beauty_spa.png';
import b21SalonImg from '/public/images/locations/b21_salon.jpg';
import b21LadiesSalonImg from '/public/images/locations/b21_ladies_salon.jpg';

type Franchise = {
  name: string;
  ig: string;
  number: string;
  locationUrl: string;
  address: string;
  hours: string;
  image?: string; // now using actual images
  note?: string;
};

const locations: Franchise[] = [
  {
    name: 'B21',
    ig: 'https://www.instagram.com/b21india/?hl=en',
    number: '80930 81930',
    locationUrl: 'https://share.google/QOWqE1CFrYfvC28co',
    address: 'Opposite BMC Bhawani Mall Exitgate, Saheed Nagar, Bhubaneswar, Odisha 751007',
    hours: '10:30 AM – 8:30 PM',
    image: b21Img,
  },
  {
    name: 'B21 Hair Beauty Spa',
    ig: 'https://www.instagram.com/b21india/?hl=en',
    number: '90900 34567',
    locationUrl: 'https://share.google/te5Fdz3Uftt5dW4lK',
    address: 'Located in: Subham Market Complex\nIndustrial Area, Kharvela Nagar, Bhubaneswar, Odisha 751001',
    hours: '10:30 AM – 8:30 PM',
    image: b21HairBeautySpaImg,
  },
  {
    name: 'B21 Salon',
    ig: 'https://www.instagram.com/b21jaydevvihar/?hl=en',
    number: '081178 40978',
    locationUrl: 'https://share.google/vbTRtK4jLdRkBZoNd',
    address: '4762 Biju, Plot no - 369, Biju Pattnaik College Rd, Jayadev Vihar, Bhubaneswar, Odisha 751015',
    hours: '10:30 AM – 8:30 PM',
    image: b21SalonImg,
  },
  {
    name: 'B21 Ladies Salon',
    ig: 'https://www.instagram.com/b21bhadrak/?hl=en',
    number: '90904 49700',
    locationUrl: 'https://share.google/vN2l0DjDiW2abnolU',
    address: 'Plot No 1232/2802/4027, Bypass Chapulia Road, Bhadrak, Odisha 756101',
    hours: '10:30 AM – 8:30 PM',
    image: b21LadiesSalonImg,
  },
];

export default function LocationsSection(){
  const { url: waUrl } = useWhatsappConfig("Hello B21! I'd like to book an appointment.", 'locations-book');
  return (
    <section id="locations" className="py-20 sm:py-24 bg-[#f6f7ed]">
      <div className="container mx-auto px-4">
        {/* Hours + Primary Location Card */}
        <div className="max-w-3xl bg-[#e9e7de] rounded-3xl p-6 sm:p-10 mb-16 mx-auto shadow-sm">
          <div className="grid sm:grid-cols-2 gap-8">
            <div>
              <h3 className="font-heading text-xl tracking-wide mb-4">HOURS</h3>
              <div className="space-y-2 text-sm font-medium">
                <div className="flex justify-between"><span>Monday – Sunday</span><span>10:30 AM – 8:30 PM</span></div>
                <div className="text-xs text-neutral-600">Same timing for all locations</div>
              </div>
            </div>
            <div>
              <h3 className="font-heading text-xl tracking-wide mb-4">LOCATION</h3>
              <p className="text-sm leading-relaxed">Call/WhatsApp for bookings<br/>Open daily 10:30 AM – 8:30 PM</p>
              <div className="mt-4 text-xs text-neutral-700 space-y-1">
                <div><span className="font-semibold">B21:</span> Opposite BMC Bhawani Mall Exitgate, Saheed Nagar, Bhubaneswar, Odisha 751007</div>
                <div><span className="font-semibold">B21 Hair Beauty Spa:</span> Subham Market Complex, Industrial Area, Kharvela Nagar, Bhubaneswar, Odisha 751001</div>
              </div>
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
                {/* 3:2 image */}
                <div className="relative w-full" style={{ aspectRatio: '3 / 2' }}>
                  {l.image ? (
                    <img
                      src={l.image}
                      alt={l.name}
                      loading="lazy"
                      decoding="async"
                      onError={(e)=>{
                        const el = e.currentTarget as HTMLImageElement;
                        if (el.src.endsWith('/placeholder.svg')) return;
                        el.src = '/placeholder.svg';
                      }}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-neutral-200 flex items-center justify-center text-neutral-500 text-xs">Image</div>
                  )}
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

        {/* Franchise CTA -> Redirect to WhatsApp (hardcoded 80930-81930) */}
        <div className="mt-16 max-w-4xl mx-auto text-center bg-white/80 backdrop-blur rounded-3xl p-10 border border-black/5 shadow-sm">
          <h3 className="font-heading text-2xl sm:text-3xl font-bold mb-4">Franchise Opportunities</h3>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-2xl mx-auto mb-6">Grow with us as we expand. For franchisee enquiries, reach out to us directly on WhatsApp.</p>
          <a href={`https://wa.me/918093081930?text=${encodeURIComponent('Hi, I want to enquire about B21 franchise.')}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-black text-white text-xs tracking-widest hover:bg-neutral-800">Franchisee Enquiry on WhatsApp</a>
        </div>
      </div>

      {/* Franchise Modal removed per new flow: WhatsApp redirect */}
    </section>
  );
}
