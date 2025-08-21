import { Metadata } from 'next';
import { posts } from '@/data/posts';
import FeaturedPostCard from '@/components/blog/FeaturedPostCard';
import PostListGrid from '@/components/blog/PostListGrid';

export async function generateMetadata(): Promise<Metadata> {
  const featuredPost = posts.find(post => post.status === 'published') || posts[0];
  
  return {
    title: 'Blog | B21',
    description: 'Beauty, style and salon insights from B21 — the latest trends, tutorials, and expert tips.',
    openGraph: {
      title: 'Beauty & Style Blog | B21',
      description: 'Beauty, style and salon insights from B21 — the latest trends, tutorials, and expert tips.',
      images: [
        {
          url: featuredPost.featuredImage,
          width: 1280,
          height: 720,
          alt: featuredPost.title,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Beauty & Style Blog | B21',
      description: 'Beauty, style and salon insights from B21 — the latest trends, tutorials, and expert tips.',
      images: [featuredPost.featuredImage],
    },
  };
}

export default function BlogPage() {
  // Filter published posts only
  const publishedPosts = posts.filter(post => post.status === 'published');
  
  // Get featured post (first published post)
  const featuredPost = publishedPosts[0];
  
  // Get remaining posts for the grid
  const gridPosts = publishedPosts.slice(1);

  return (
    <div className="min-h-screen bg-background">
      {/* SEO structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: 'B21 Beauty Blog',
            description: 'Beauty, style and salon insights from B21 — the latest trends, tutorials, and expert tips.',
            url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://b21salon.com'}/blog`,
            publisher: {
              '@type': 'Organization',
              name: 'B21',
              logo: {
                '@type': 'ImageObject',
                url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://b21salon.com'}/logo.png`,
              },
            },
            blogPost: publishedPosts.map(post => ({
              '@type': 'BlogPosting',
              headline: post.title,
              description: post.excerpt,
              author: {
                '@type': 'Person',
                name: post.author,
              },
              datePublished: post.publishedDate,
              image: post.featuredImage,
              url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://b21salon.com'}/blog/${post.slug}`,
            })),
          }),
        }}
      />

      <main className="pt-20">
        {/* Header Section */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Beauty & Style Insights
              </h1>
              <p className="font-body text-lg text-muted-foreground">
                Discover the latest trends, expert tips, and insider secrets from B21's team of beauty professionals
              </p>
            </div>
          </div>
        </section>

        {/* Featured Post */}
        {featuredPost && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <FeaturedPostCard post={featuredPost} />
            </div>
          </section>
        )}

        {/* Posts Grid */}
        {gridPosts.length > 0 && (
          <section className="py-16 bg-muted/20">
            <div className="container mx-auto px-4">
              <h2 className="font-heading text-3xl font-bold text-center text-foreground mb-12">
                Latest Posts
              </h2>
              <PostListGrid posts={gridPosts} />
              
              {/* TODO: Add pagination when backend is integrated */}
              {/* 
              Example pagination implementation:
              <div className="mt-12 flex justify-center">
                <nav aria-label="Blog pagination">
                  <div className="flex items-center space-x-2">
                    <button disabled className="px-3 py-2 text-sm font-medium text-muted-foreground">
                      Previous
                    </button>
                    <span className="px-3 py-2 text-sm font-medium bg-accent text-black rounded-md">
                      1
                    </span>
                    <button className="px-3 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-md">
                      2
                    </button>
                    <button className="px-3 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-md">
                      Next
                    </button>
                  </div>
                </nav>
              </div>
              */}
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16 bg-primary text-secondary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-heading text-3xl font-bold mb-4">
              Ready to Transform Your Look?
            </h2>
            <p className="font-body text-lg mb-8 text-secondary/80">
              Book an appointment with our expert stylists and experience the B21 difference
            </p>
            <a
              href="https://wa.me/919876543210?text=Hello%20B21!%20I'd%20like%20to%20book%20an%20appointment."
              className="inline-flex items-center px-8 py-3 bg-accent text-black font-body font-medium rounded-md hover:bg-accent/90 transition-colors"
            >
              Book Now
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}