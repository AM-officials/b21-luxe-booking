export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  publishedDate: string; // ISO 8601
  featuredImage: string; // '/images/blog/post-1.jpg'
  content: string; // Markdown
  status?: 'draft' | 'published';
}

export interface PostCreateDTO extends Omit<Post, 'status'> {
  status: 'draft' | 'published';
}

export interface PostUpdateDTO extends Partial<PostCreateDTO> {
  slug: string;
}
