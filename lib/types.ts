export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  publishedDate: string; // ISO 8601
  featuredImage: string; // '/images/blog/post-1.jpg'
  content: string; // Markdown (preferred) or HTML
  status?: 'draft' | 'published';
}

export interface PostCreateDTO {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  author: string;
  publishedDate: string;
  featuredImage: string;
  content: string;
  status: 'draft' | 'published';
}

export interface PostUpdateDTO extends Partial<PostCreateDTO> {
  slug: string;
}