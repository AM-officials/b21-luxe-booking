import { useMemo } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { posts as seedPosts } from '../../data/posts';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { markdownToHtml } from '@/lib/markdown';
import { fetchPostBySlug } from '@/lib/supabaseApi';

export default function BlogPostPage() {
  const { slug } = useParams();
  const { data: dbPost } = useQuery({
    queryKey: ['post', slug],
    queryFn: () => fetchPostBySlug(slug || ''),
    enabled: !!slug,
  });
  const post = useMemo(() => dbPost ?? seedPosts.find(p => p.slug === slug), [dbPost, slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 container mx-auto px-4">
          <p className="text-muted-foreground">Post not found. <RouterLink to="/blog" className="text-accent">Go back</RouterLink></p>
        </main>
        <Footer />
      </div>
    );
  }

  const html = markdownToHtml(post.content);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        <section className="py-10">
          <div className="container mx-auto px-4 max-w-3xl">
            <h1 className="font-heading text-4xl font-bold mb-4">{post.title}</h1>
            <p className="text-muted-foreground mb-8">{post.excerpt}</p>
            <img src={post.featuredImage} alt={post.title} className="w-full rounded-lg mb-8" />
            <article className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
