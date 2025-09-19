"use client";
import Header from '../components/site/Header';
import Footer from '../components/site/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { useBlog } from '../../context/BlogContext';

export default function BlogIndex(){
  const { posts } = useBlog();
  return (
    <>
      <Header />
      <main className="pt-24 pb-32 max-w-5xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-12">Journal</h1>
        <div className="grid sm:grid-cols-2 gap-10">
          {posts.map(p => (
            <Link href={`/blog/${p.slug}`} key={p.id} className="group border rounded-xl overflow-hidden flex flex-col bg-white hover:shadow-lg transition-shadow">
              <div className="relative h-48 bg-neutral-100">
                {p.featuredImage ? (
                  <Image src={p.featuredImage} alt={p.title} fill style={{objectFit:'cover'}} />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-xs text-neutral-400">NO IMAGE</div>
                )}
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h2 className="font-semibold text-lg mb-2 group-hover:text-accent transition-colors">{p.title}</h2>
                <p className="text-xs text-neutral-500 mb-3">{new Date(p.createdAt).toLocaleDateString()}</p>
                <p className="text-sm text-neutral-600 line-clamp-3 flex-1">{p.excerpt}</p>
                <span className="mt-4 text-xs font-medium tracking-wide text-accent">READ MORE →</span>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
