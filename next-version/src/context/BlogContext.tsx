"use client";
import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { nanoid } from '../lib/nanoid';

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string; // base64 or object URL
  createdAt: string;
  updatedAt: string;
  featured?: boolean;
};

type BlogContextValue = {
  posts: BlogPost[];
  create: (data: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt' | 'slug'> & { slug?: string }) => BlogPost;
  update: (id: string, patch: Partial<BlogPost>) => void;
  remove: (id: string) => void;
  getBySlug: (slug: string) => BlogPost | undefined;
};

const STORAGE_KEY = 'b21.blog.posts.v1';

const BlogContext = createContext<BlogContextValue | undefined>(undefined);

export function BlogProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<BlogPost[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw) as BlogPost[];
    } catch {}
    return [];
  });

  const persist = (next: BlogPost[]) => {
    setPosts(next);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
  };

  const create: BlogContextValue['create'] = (data) => {
    const now = new Date().toISOString();
    const baseSlug = (data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')) || nanoid(6);
    let slug = baseSlug;
    let inc = 1;
    while (posts.some(p => p.slug === slug)) {
      slug = `${baseSlug}-${inc++}`;
    }
    const post: BlogPost = { id: nanoid(10), slug, createdAt: now, updatedAt: now, ...data };
    const next = [post, ...posts];
    persist(next);
    return post;
  };

  const update: BlogContextValue['update'] = (id, patch) => {
    persist(posts.map(p => p.id === id ? { ...p, ...patch, updatedAt: new Date().toISOString() } : p));
  };
  const remove: BlogContextValue['remove'] = (id) => {
    persist(posts.filter(p => p.id !== id));
  };
  const getBySlug = useCallback((slug: string) => posts.find(p => p.slug === slug), [posts]);

  // lazy migrate sample seed if empty
  useEffect(() => {
    if (posts.length === 0) {
      persist([
        {
          id: nanoid(10),
            title: 'Welcome to B21 Luxury Blog',
            slug: 'welcome-to-b21-luxury-blog',
            excerpt: 'Discover trends, rituals, and pro tips for hair, skin & spa wellness.',
            content: '# Welcome to B21\n\nThis is a placeholder article. Use the admin to add more rich content with **Markdown** support.',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            featured: true,
        }
      ]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <BlogContext.Provider value={{ posts, create, update, remove, getBySlug }}>{children}</BlogContext.Provider>;
}

export function useBlog(){
  const ctx = useContext(BlogContext);
  if(!ctx) throw new Error('useBlog must be used within BlogProvider');
  return ctx;
}
