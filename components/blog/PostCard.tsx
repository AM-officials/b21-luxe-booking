import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Post } from '@/lib/types';

interface PostCardProps {
  post: Post;
  index?: number;
}

export default function PostCard({ post, index = 0 }: PostCardProps) {
  const publishedDate = new Date(post.publishedDate);
  const formattedDate = new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(publishedDate);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.03 }}
      className="bg-background rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={post.featuredImage}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-accent text-black px-2 py-1 rounded-full text-xs font-medium uppercase tracking-wide">
            {post.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Meta Information */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
          <div className="flex items-center">
            <User className="h-3 w-3 mr-1" />
            <span className="font-body">{post.author}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            <time dateTime={post.publishedDate} className="font-body">
              {formattedDate}
            </time>
          </div>
        </div>

        {/* Title */}
        <h2 className="font-heading text-xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-accent transition-colors duration-300">
          <Link
            href={`/blog/${post.slug}`}
            className="hover:underline decoration-accent decoration-2 underline-offset-2"
            aria-label={`Read article: ${post.title}`}
          >
            {post.title}
          </Link>
        </h2>

        {/* Excerpt */}
        <p className="font-body text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Read More Link */}
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center text-accent hover:text-accent/80 font-body font-medium text-sm transition-colors duration-300 group/link"
          aria-label={`Read more about ${post.title}`}
        >
          Read More
          <ArrowRight className="h-3 w-3 ml-2 transition-transform group-hover/link:translate-x-1" />
        </Link>
      </div>

      {/* Hover Border Effect */}
      <div className="absolute inset-0 rounded-xl ring-2 ring-transparent group-hover:ring-accent/30 transition-all duration-300 pointer-events-none" />
    </motion.article>
  );
}