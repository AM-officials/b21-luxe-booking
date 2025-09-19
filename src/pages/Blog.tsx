import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { posts as seedPosts } from '../../data/posts';
import FeaturedPostCard from '../../components/blog/FeaturedPostCard';
import PostListGrid from '../../components/blog/PostListGrid';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { fetchPosts } from '@/lib/supabaseApi';

export default function BlogPage() {
  const { data: dbPosts, isLoading, isError } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });
  const published = useMemo(() => {
    const src = !isError && dbPosts && dbPosts.length ? dbPosts : seedPosts;
    return src.filter(p => (p.status ?? 'published') === 'published');
  }, [dbPosts, isError]);
  const featured = published[0];
  const grid = published.slice(1);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              Beauty & Style Insights
            </h1>
            <p className="font-body text-lg text-muted-foreground">
              Discover the latest trends, expert tips, and insider secrets from B21's team of beauty professionals
            </p>
          </div>
        </section>

  {!isLoading && featured && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <FeaturedPostCard post={featured as any} />
            </div>
          </section>
        )}

  {!isLoading && grid.length > 0 && (
          <section className="py-16 bg-muted/20">
            <div className="container mx-auto px-4">
              <h2 className="font-heading text-3xl font-bold text-center text-foreground mb-12">
                Latest Posts
              </h2>
              <PostListGrid posts={grid as any} />
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
