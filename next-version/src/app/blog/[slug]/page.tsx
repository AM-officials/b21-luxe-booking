"use client";
import Header from '../../components/site/Header';
import Footer from '../../components/site/Footer';
import { useBlog } from '../../../context/BlogContext';
import { useParams, notFound } from 'next/navigation';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function BlogPostPage(){
  const params = useParams();
  const slug = Array.isArray(params?.slug)? params.slug[0] : (params?.slug as string);
  const { getBySlug } = useBlog();
  const post = getBySlug(slug);
  if(!post){
    // mimic notFound fallback
    return (
      <>
        <Header />
        <main className="pt-24 pb-32 max-w-3xl mx-auto px-6">
          <p className="text-sm">Post not found.</p>
        </main>
        <Footer />
      </>
    );
  }
  const html = useMemo(()=>{
    try { return DOMPurify.sanitize(marked.parse(post.content) as string); } catch { return '<p>Error rendering content.</p>'; }
  }, [post.content]);
  return (
    <>
      <Header />
      <main className="pt-24 pb-32">
        <article className="max-w-3xl mx-auto px-6">
          <header className="mb-10">
            <p className="text-xs tracking-wide text-neutral-500 mb-3">{new Date(post.createdAt).toLocaleDateString()}</p>
            <h1 className="text-4xl font-bold tracking-tight mb-6">{post.title}</h1>
            {post.featuredImage && (
              <div className="relative h-64 w-full rounded-xl overflow-hidden mb-8">
                <Image src={post.featuredImage} alt={post.title} fill style={{objectFit:'cover'}} />
              </div>
            )}
          </header>
          <div className="prose prose-neutral max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
          <div className="mt-12 pt-8 border-t flex justify-between text-xs">
            <Link href="/blog" className="underline">← Back to Blog</Link>
            <span>Share • Copy Link</span>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
