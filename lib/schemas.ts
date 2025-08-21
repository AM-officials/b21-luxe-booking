import { z } from 'zod';

// Zod schemas for future backend validation
export const PostCreateSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  slug: z.string()
    .min(1, 'Slug is required')
    .regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens')
    .max(100, 'Slug too long'),
  excerpt: z.string().min(1, 'Excerpt is required').max(500, 'Excerpt too long'),
  category: z.string().min(1, 'Category is required'),
  author: z.string().min(1, 'Author is required'),
  publishedDate: z.string().datetime('Invalid date format'),
  featuredImage: z.string().url('Invalid image URL'),
  content: z.string().min(1, 'Content is required'),
  status: z.enum(['draft', 'published']).default('draft'),
});

export const PostUpdateSchema = PostCreateSchema.partial().extend({
  slug: z.string().min(1, 'Slug is required'), // slug is required for updates
});

export type PostCreateDTO = z.infer<typeof PostCreateSchema>;
export type PostUpdateDTO = z.infer<typeof PostUpdateSchema>;

// Example API contract schemas for future backend integration
export const PostListResponseSchema = z.object({
  posts: z.array(PostCreateSchema.extend({ 
    id: z.string(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  })),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
});

export const PostResponseSchema = PostCreateSchema.extend({
  id: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});