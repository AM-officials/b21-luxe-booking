import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import { posts } from '@/data/posts';
import { markdownToHtml, markdownToPlainText } from '@/lib/markdown';

interface BlogPostPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = posts.find(p => p.slug === params.slug && p.status === 'published');
  
  if (!post) {
    return {
      title: 'Post Not Found | B21',
    };
  }

  const plainTextContent = markdownToPlainText(post.content);
  
  return {
    title: `${post.title} | B21 Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [
        {
          url: post.featuredImage,
          width: 1280,
          height: 720,
          alt: post.title,
        },
      ],
      type: 'article',
      publishedTime: post.publishedDate,
      authors: [post.author],
      section: post.category,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.featuredImage],
    },
  };
}

export async function generateStaticParams() {
  const publishedPosts = posts.filter(post => post.status === 'published');
  return publishedPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = posts.find(p => p.slug === params.slug && p.status === 'published');

  if (!post) {
    notFound();
  }

  const htmlContent = markdownToHtml(post.content);
  const publishedDate = new Date(post.publishedDate);
  const formattedDate = new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(publishedDate);

  // Get related posts (same category, excluding current post)
  const relatedPosts = posts
    .filter(p => 
      p.status === 'published' && 
      p.category === post.category && 
      p.slug !== post.slug
    )
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      {/* SEO structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.excerpt,
            image: post.featuredImage,
            author: {
              '@type': 'Person',
              name: post.author,
            },
            publisher: {
              '@type': 'Organization',
              name: 'B21',
              logo: {
                '@type': 'ImageObject',
                url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://b21salon.com'}/logo.png`,
              },
            },
            datePublished: post.publishedDate,
            dateModified: post.publishedDate, // TODO: Add updatedDate field when backend is ready
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://b21salon.com'}/blog/${post.slug}`,
            },
            articleSection: post.category,
          }),
        }}
      />

      <main className="pt-20">
        {/* Skip to content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-accent text-black px-4 py-2 rounded-md font-medium"
        >
          Skip to main content
        </a>

        {/* Back Navigation */}
        <section className="bg-muted/30 py-8">
          <div className="container mx-auto px-4">
            <Link
              href="/blog"
              className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors group"
            >
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              <span className="font-body">Back to Blog</span>
            </Link>
          </div>
        </section>

        {/* Hero Image */}
        <section className="relative h-64 md:h-96 lg:h-[500px] overflow-hidden">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/20" />
        </section>

        {/* Article Content */}
        <article id="main-content" className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              {/* Article Header */}
              <header className="mb-8">
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <Tag className="h-4 w-4 mr-1" />
                    <span className="bg-accent/10 text-accent px-2 py-1 rounded-full text-xs font-medium uppercase tracking-wide">
                      {post.category}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <time dateTime={post.publishedDate}>{formattedDate}</time>
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    <span>{post.author}</span>
                  </div>
                </div>
                
                <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  {post.title}
                </h1>
                
                <p className="font-body text-lg text-muted-foreground leading-relaxed">
                  {post.excerpt}
                </p>
              </header>

              {/* Article Body */}
              <div 
                className="prose prose-lg dark:prose-invert max-w-none
                  prose-headings:font-heading prose-headings:text-foreground
                  prose-p:font-body prose-p:text-foreground prose-p:leading-relaxed
                  prose-a:text-accent prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-foreground prose-strong:font-semibold
                  prose-code:bg-muted prose-code:text-foreground prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                  prose-pre:bg-muted prose-pre:border
                  prose-blockquote:border-l-accent prose-blockquote:text-muted-foreground
                  prose-ul:text-foreground prose-ol:text-foreground
                  prose-li:text-foreground
                  prose-img:rounded-lg prose-img:shadow-md"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />

              {/* Article Footer / CTA */}
              <footer className="mt-12 pt-8 border-t border-border">
                <div className="bg-muted/50 rounded-lg p-6 text-center">
                  <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                    Ready to Try These Tips?
                  </h3>
                  <p className="font-body text-muted-foreground mb-4">
                    Book an appointment with our expert team and bring your beauty goals to life.
                  </p>
                  <a
                    href="https://wa.me/919876543210?text=Hello%20B21!%20I'd%20like%20to%20book%20an%20appointment."
                    className="inline-flex items-center px-6 py-3 bg-accent text-black font-body font-medium rounded-md hover:bg-accent/90 transition-colors"
                  >
                    Book an Appointment
                  </a>
                </div>
              </footer>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-16 bg-muted/20">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-center text-foreground mb-12">
                  You Might Also Like
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {relatedPosts.map((relatedPost) => (
                    <article key={relatedPost.slug} className="bg-background rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative h-48">
                        <Image
                          src={relatedPost.featuredImage}
                          alt={relatedPost.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                      <div className="p-6">
                        <div className="text-xs text-accent font-medium uppercase tracking-wide mb-2">
                          {relatedPost.category}
                        </div>
                        <h3 className="font-heading text-lg font-bold text-foreground mb-2 line-clamp-2">
                          {relatedPost.title}
                        </h3>
                        <p className="font-body text-muted-foreground text-sm line-clamp-3 mb-4">
                          {relatedPost.excerpt}
                        </p>
                        <Link
                          href={`/blog/${relatedPost.slug}`}
                          className="font-body text-accent hover:text-accent/80 font-medium text-sm transition-colors"
                        >
                          Read More →
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}