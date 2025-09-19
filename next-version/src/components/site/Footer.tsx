import Image from 'next/image';
import Link from 'next/link';

export default function Footer(){
  return (
    <footer className="bg-black text-white mt-32">
      <div className="max-w-7xl mx-auto px-6 py-16 grid gap-10 md:grid-cols-4">
        <div>
          <div className="relative w-32 h-14 mb-4">
            <Image src="/logo-white.png" alt="B21" fill style={{ objectFit:'contain' }} />
          </div>
          <p className="text-sm text-white/60">Elevating Hair | Beauty | Spa experiences.</p>
        </div>
        <div>
          <h3 className="font-semibold mb-3">Explore</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/gallery">Gallery</Link></li>
            <li><Link href="/locations">Locations</Link></li>
            <li><Link href="/faq">FAQ</Link></li>
            <li><Link href="/blog">Blog</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-3">Contact</h3>
          <p className="text-sm space-y-1">
            <span className="block">+91 98765 43210</span>
            <span className="block">hello@b21salon.com</span>
          </p>
        </div>
        <div className="text-sm">
          <h3 className="font-semibold mb-3">Follow</h3>
          <p>Instagram • Facebook • Twitter</p>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-white/50">© {new Date().getFullYear()} B21. All rights reserved.</div>
    </footer>
  );
}
