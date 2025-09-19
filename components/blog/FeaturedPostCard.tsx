import React from 'react';
import Image from '@/shims/next-image';
import Link from '@/shims/next-link';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Post } from '@/lib/types';

interface FeaturedPostCardProps {
  post: Post;
}

export default function FeaturedPostCard({ post }: FeaturedPostCardProps) {
  const publishedDate = new Date(post.publishedDate);
  const formattedDate = new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(publishedDate);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl group"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={post.featuredImage}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority
          sizes="100vw"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-8 lg:p-12">
        <div className="max-w-3xl">
          {/* Category Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block mb-4"
          >
            <span className="bg-accent text-black px-3 py-1 rounded-full text-sm font-medium uppercase tracking-wide">
              Featured • {post.category}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight"
          >
            {post.title}
          </motion.h1>

          {/* Excerpt */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-body text-lg text-white/90 mb-6 leading-relaxed max-w-2xl"
          >
            {post.excerpt}
          </motion.p>

          {/* Meta Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center gap-6 text-white/80 text-sm mb-6"
          >
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              <span className="font-body">{post.author}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              <time dateTime={post.publishedDate} className="font-body">
                {formattedDate}
              </time>
            </div>
          </motion.div>

          {/* Read More Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link
              href={`/blog/${post.slug}`}
              className="inline-flex items-center px-6 py-3 bg-accent text-black font-body font-medium rounded-md hover:bg-accent/90 transition-all duration-300 group/button"
              aria-label={`Read full article: ${post.title}`}
            >
              Read Full Article
              <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover/button:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 rounded-2xl ring-2 ring-transparent group-hover:ring-accent/50 transition-all duration-300" />
    </motion.article>
  );
}