import { Post } from './types';
import { posts as seedPosts } from '../../data/posts';

const STORAGE_KEY = 'b21-blog-posts';

function load(): Post[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
    // Seed from data on first run (only published by default)
    const initial = seedPosts.filter(p => (p.status ?? 'published') === 'published');
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    return initial as Post[];
  } catch {
    return [];
  }
}

function save(all: Post[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

export function getPosts(): Post[] {
  return load().sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
}

export function getPostBySlug(slug: string): Post | undefined {
  return load().find(p => p.slug === slug);
}

export function upsertPost(post: Post) {
  const all = load();
  const idx = all.findIndex(p => p.slug === post.slug);
  if (idx >= 0) all[idx] = post; else all.unshift(post);
  save(all);
}

export function deletePost(slug: string) {
  const all = load().filter(p => p.slug !== slug);
  save(all);
}

export function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}
