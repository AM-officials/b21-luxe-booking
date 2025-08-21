import React from 'react';
import PostCard from './PostCard';
import { Post } from '@/lib/types';

interface PostListGridProps {
  posts: Post[];
}

export default function PostListGrid({ posts }: PostListGridProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="font-body text-muted-foreground text-lg">
          No posts found. Check back soon for new content!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post, index) => (
        <PostCard 
          key={post.slug} 
          post={post} 
          index={index}
        />
      ))}
    </div>
  );
}