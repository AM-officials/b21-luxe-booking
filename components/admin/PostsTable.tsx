import React from 'react';
import { Edit2, Trash2, Eye, Calendar, User } from 'lucide-react';
import { Post } from '@/lib/types';

interface PostsTableProps {
  posts: Post[];
  onEdit: (post: Post) => void;
  onDelete: (slug: string) => void;
}

export default function PostsTable({ posts, onEdit, onDelete }: PostsTableProps) {
  if (posts.length === 0) {
    return (
      <div className="bg-background rounded-lg border border-border p-8 text-center">
        <p className="font-body text-muted-foreground">No posts found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="bg-background rounded-lg border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-4 font-body font-medium text-foreground">Title</th>
              <th className="text-left p-4 font-body font-medium text-foreground">Author</th>
              <th className="text-left p-4 font-body font-medium text-foreground">Category</th>
              <th className="text-left p-4 font-body font-medium text-foreground">Date</th>
              <th className="text-left p-4 font-body font-medium text-foreground">Status</th>
              <th className="text-left p-4 font-body font-medium text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <tr key={post.slug} className={index % 2 === 0 ? 'bg-background' : 'bg-muted/20'}>
                <td className="p-4">
                  <div>
                    <h3 className="font-body font-medium text-foreground line-clamp-2">{post.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">{post.excerpt}</p>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="font-body text-foreground">{post.author}</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className="bg-accent/10 text-accent px-2 py-1 rounded-full text-xs font-medium">
                    {post.category}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="font-body text-foreground text-sm">
                      {new Date(post.publishedDate).toLocaleDateString('en-IN')}
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    post.status === 'published' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {post.status || 'published'}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <a
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                      title="View post"
                    >
                      <Eye className="h-4 w-4" />
                    </a>
                    <button
                      onClick={() => onEdit(post)}
                      className="p-2 text-muted-foreground hover:text-accent transition-colors"
                      title="Edit post"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDelete(post.slug)}
                      className="p-2 text-muted-foreground hover:text-red-600 transition-colors"
                      title="Delete post"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}