import React, { useState, useEffect } from 'react';
import { Save, X, Upload } from 'lucide-react';
import { Post } from '@/lib/types';

interface PostEditorFormProps {
  initial?: Post;
  onSave: (post: Post) => void;
  onCancel: () => void;
  generateSlug: (title: string) => string;
}

export default function PostEditorForm({ initial, onSave, onCancel, generateSlug }: PostEditorFormProps) {
  const [formData, setFormData] = useState<Post>({
    slug: '',
    title: '',
    excerpt: '',
    category: '',
    author: '',
    publishedDate: new Date().toISOString().slice(0, 16),
    featuredImage: '',
    content: '',
    status: 'draft',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isGeneratingSlug, setIsGeneratingSlug] = useState(true);

  useEffect(() => {
    if (initial) {
      setFormData(initial);
      setIsGeneratingSlug(false);
    }
  }, [initial]);

  const handleChange = (field: keyof Post, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Auto-generate slug from title
    if (field === 'title' && isGeneratingSlug) {
      setFormData(prev => ({ ...prev, slug: generateSlug(value) }));
    }
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.slug.trim()) newErrors.slug = 'Slug is required';
    if (!formData.excerpt.trim()) newErrors.excerpt = 'Excerpt is required';
    if (!formData.category.trim()) newErrors.category = 'Category is required';
    if (!formData.author.trim()) newErrors.author = 'Author is required';
    if (!formData.featuredImage.trim()) newErrors.featuredImage = 'Featured image is required';
    if (!formData.content.trim()) newErrors.content = 'Content is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSave(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Title *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md bg-background text-foreground ${
              errors.title ? 'border-red-500' : 'border-border'
            }`}
            placeholder="Enter post title"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Slug *
          </label>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) => {
              handleChange('slug', e.target.value);
              setIsGeneratingSlug(false);
            }}
            className={`w-full px-3 py-2 border rounded-md bg-background text-foreground ${
              errors.slug ? 'border-red-500' : 'border-border'
            }`}
            placeholder="post-url-slug"
          />
          {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Excerpt *
        </label>
        <textarea
          value={formData.excerpt}
          onChange={(e) => handleChange('excerpt', e.target.value)}
          rows={3}
          className={`w-full px-3 py-2 border rounded-md bg-background text-foreground ${
            errors.excerpt ? 'border-red-500' : 'border-border'
          }`}
          placeholder="Brief description of the post"
        />
        {errors.excerpt && <p className="text-red-500 text-sm mt-1">{errors.excerpt}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Category *
          </label>
          <input
            type="text"
            value={formData.category}
            onChange={(e) => handleChange('category', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md bg-background text-foreground ${
              errors.category ? 'border-red-500' : 'border-border'
            }`}
            placeholder="Hair Styling"
          />
          {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Author *
          </label>
          <input
            type="text"
            value={formData.author}
            onChange={(e) => handleChange('author', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md bg-background text-foreground ${
              errors.author ? 'border-red-500' : 'border-border'
            }`}
            placeholder="Author Name"
          />
          {errors.author && <p className="text-red-500 text-sm mt-1">{errors.author}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Published Date *
          </label>
          <input
            type="datetime-local"
            value={formData.publishedDate.slice(0, 16)}
            onChange={(e) => handleChange('publishedDate', e.target.value + ':00Z')}
            className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Featured Image URL *
        </label>
        <div className="flex gap-2">
          <input
            type="url"
            value={formData.featuredImage}
            onChange={(e) => handleChange('featuredImage', e.target.value)}
            className={`flex-1 px-3 py-2 border rounded-md bg-background text-foreground ${
              errors.featuredImage ? 'border-red-500' : 'border-border'
            }`}
            placeholder="https://example.com/image.jpg"
          />
          <button
            type="button"
            className="px-4 py-2 border border-border rounded-md text-muted-foreground hover:text-foreground transition-colors"
            title="Upload image (TODO: implement)"
          >
            <Upload className="h-4 w-4" />
          </button>
        </div>
        {errors.featuredImage && <p className="text-red-500 text-sm mt-1">{errors.featuredImage}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Content (Markdown) *
        </label>
        <textarea
          value={formData.content}
          onChange={(e) => handleChange('content', e.target.value)}
          rows={12}
          className={`w-full px-3 py-2 border rounded-md bg-background text-foreground font-mono text-sm ${
            errors.content ? 'border-red-500' : 'border-border'
          }`}
          placeholder="Write your post content in Markdown format..."
        />
        {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Status
        </label>
        <select
          value={formData.status}
          onChange={(e) => handleChange('status', e.target.value)}
          className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      <div className="flex justify-end gap-4 pt-4 border-t border-border">
        <button
          type="button"
          onClick={onCancel}
          className="flex items-center px-4 py-2 border border-border rounded-md text-foreground hover:bg-muted transition-colors"
        >
          <X className="h-4 w-4 mr-2" />
          Cancel
        </button>
        <button
          type="submit"
          className="flex items-center px-6 py-2 bg-accent text-black rounded-md hover:bg-accent/90 transition-colors"
        >
          <Save className="h-4 w-4 mr-2" />
          Save Post
        </button>
      </div>
    </form>
  );
}