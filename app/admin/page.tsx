'use client';

import React, { useState, useEffect } from 'react';
import { Search, Plus, Filter } from 'lucide-react';
import { posts as initialPosts } from '@/data/posts';
import { Post } from '@/lib/types';
import PostsTable from '@/components/admin/PostsTable';
import PostEditorForm from '@/components/admin/PostEditorForm';
import Modal from '@/components/ui/Modal';
import { useToast, ToastContainer } from '@/components/ui/Toast';

type UIState = 'idle' | 'creating' | 'editing' | 'confirm-delete';

interface DeleteState {
  slug: string;
  title: string;
}

export default function AdminPage() {
  // State management
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [uiState, setUIState] = useState<UIState>('idle');
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [deleteState, setDeleteState] = useState<DeleteState | null>(null);
  
  // Filters and search
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  
  // Toast notifications
  const { toasts, removeToast, success, error } = useToast();

  // Get unique categories for filter dropdown
  const categories = Array.from(new Set(posts.map(post => post.category)));

  // Filter posts based on search and filters
  const filteredPosts = posts.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === '' || post.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Auto-save to localStorage (simulating persistence)
  useEffect(() => {
    localStorage.setItem('b21-blog-posts', JSON.stringify(posts));
  }, [posts]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('b21-blog-posts');
    if (saved) {
      try {
        setPosts(JSON.parse(saved));
      } catch (error) {
        console.error('Failed to load saved posts:', error);
      }
    }
  }, []);

  // Handlers
  const handleCreatePost = () => {
    setEditingPost(null);
    setUIState('creating');
  };

  const handleEditPost = (post: Post) => {
    setEditingPost(post);
    setUIState('editing');
  };

  const handleDeletePost = (slug: string) => {
    const post = posts.find(p => p.slug === slug);
    if (post) {
      setDeleteState({ slug, title: post.title });
      setUIState('confirm-delete');
    }
  };

  const confirmDelete = () => {
    if (deleteState) {
      setPosts(current => current.filter(p => p.slug !== deleteState.slug));
      success(`Post "${deleteState.title}" has been deleted.`);
      setDeleteState(null);
      setUIState('idle');
    }
  };

  const handleSavePost = (postData: Post) => {
    try {
      if (uiState === 'creating') {
        // Check if slug already exists
        if (posts.some(p => p.slug === postData.slug)) {
          error('A post with this slug already exists. Please choose a different slug.');
          return;
        }
        
        setPosts(current => [postData, ...current]);
        success(`Post "${postData.title}" has been created successfully.`);
      } else if (uiState === 'editing' && editingPost) {
        setPosts(current => 
          current.map(p => p.slug === editingPost.slug ? postData : p)
        );
        success(`Post "${postData.title}" has been updated successfully.`);
      }
      
      setUIState('idle');
      setEditingPost(null);
    } catch (err) {
      error('Failed to save post. Please try again.');
    }
  };

  const handleCancel = () => {
    setUIState('idle');
    setEditingPost(null);
    setDeleteState(null);
  };

  // Generate slug from title
  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
              Manage Blog Posts
            </h1>
            <p className="font-body text-muted-foreground">
              Create, edit, and manage your blog content
            </p>
          </div>
          <button
            onClick={handleCreatePost}
            className="mt-4 md:mt-0 inline-flex items-center px-6 py-3 bg-accent text-black font-body font-medium rounded-md hover:bg-accent/90 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Post
          </button>
        </div>

        {/* Filters and Search */}
        <div className="bg-muted/30 rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent appearance-none"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'all' | 'published' | 'draft')}
              className="px-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>

            {/* Results Count */}
            <div className="flex items-center text-sm text-muted-foreground">
              {filteredPosts.length} of {posts.length} posts
            </div>
          </div>
        </div>

        {/* Posts Table */}
        <PostsTable
          posts={filteredPosts}
          onEdit={handleEditPost}
          onDelete={handleDeletePost}
        />

        {/* Create/Edit Modal */}
        <Modal
          isOpen={uiState === 'creating' || uiState === 'editing'}
          onClose={handleCancel}
          title={uiState === 'creating' ? 'Create New Post' : 'Edit Post'}
          size="xl"
        >
          <PostEditorForm
            initial={editingPost || undefined}
            onSave={handleSavePost}
            onCancel={handleCancel}
            generateSlug={generateSlug}
          />
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={uiState === 'confirm-delete'}
          onClose={handleCancel}
          title="Confirm Delete"
          size="sm"
        >
          {deleteState && (
            <div className="text-center">
              <p className="font-body text-foreground mb-6">
                Are you sure you want to delete the post <strong>"{deleteState.title}"</strong>?
                This action cannot be undone.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 border border-border rounded-md text-foreground hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Delete Post
                </button>
              </div>
            </div>
          )}
        </Modal>

        {/* TODO: Backend Integration Points */}
        {/*
          When integrating with a real backend:
          
          1. Replace useState with SWR or React Query:
             const { data: posts, mutate } = useSWR('/api/posts', fetcher);
          
          2. Update handlers to make API calls:
             const handleSavePost = async (postData: Post) => {
               if (uiState === 'creating') {
                 await fetch('/api/admin/posts', {
                   method: 'POST',
                   headers: { 'Content-Type': 'application/json' },
                   body: JSON.stringify(postData),
                 });
               } else {
                 await fetch(`/api/admin/posts/${editingPost.slug}`, {
                   method: 'PUT',
                   headers: { 'Content-Type': 'application/json' },
                   body: JSON.stringify(postData),
                 });
               }
               mutate(); // Refresh data
             };
          
          3. Add optimistic updates for better UX:
             mutate([...posts, postData], false);
             
          4. Add proper error handling and loading states
          
          5. Implement server-side pagination and search:
             const { data } = useSWR(
               `/api/posts?page=${page}&search=${searchTerm}&category=${categoryFilter}`,
               fetcher
             );
        */}
      </div>

      {/* Toast Container */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}