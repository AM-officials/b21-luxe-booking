"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const nav = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/locations', label: 'Locations' },
  { href: '/faq', label: 'FAQ' },
  { href: '/blog', label: 'Blog' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/70 backdrop-blur border-b border-black/5">
      <div className="mx-auto max-w-7xl px-6 flex h-16 items-center justify-between">
        <Link href="/" className="relative w-24 h-10">
          <Image src="/logo-black.png" alt="B21" fill style={{ objectFit:'contain' }} priority />
        </Link>
        <nav className="hidden md:flex gap-8 text-sm font-medium">
          {nav.map(i => <Link key={i.href} href={i.href} className="hover:text-accent transition-colors">{i.label}</Link>)}
        </nav>
        <button onClick={()=>setOpen(o=>!o)} className="md:hidden text-sm px-3 py-1 border rounded">Menu</button>
      </div>
      {open && (
        <div className="md:hidden bg-white border-t p-4 flex flex-col gap-4">
          {nav.map(i => <Link key={i.href} href={i.href} onClick={()=>setOpen(false)}>{i.label}</Link>)}
        </div>
      )}
    </header>
  );
}
