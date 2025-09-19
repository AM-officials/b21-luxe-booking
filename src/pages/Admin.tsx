import { useEffect, useMemo, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PostsTable from '../../components/admin/PostsTable';
import PostEditorForm from '../../components/admin/PostEditorForm';
import OffersForm from '@/components/admin/OffersForm';
import Modal from '../../components/ui/Modal';
import { useToast, ToastContainer } from '../../components/ui/Toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Post } from '@/lib/types';
import { posts as seedPosts } from '../../data/posts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchPosts, upsertPost, deletePost as deletePostDb } from '@/lib/supabaseApi';

type UIState = 'idle' | 'creating' | 'editing' | 'confirm-delete';

export default function AdminPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toasts, removeToast, success, error } = useToast();

  const qc = useQueryClient();
  const { data: dbPosts, isLoading } = useQuery({ queryKey: ['posts'], queryFn: fetchPosts });
  const [uiState, setUIState] = useState<UIState>('idle');
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [deleteSlug, setDeleteSlug] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) navigate('/login');
  }, [isAuthenticated, navigate]);

  const filtered = useMemo(() => (dbPosts && dbPosts.length ? dbPosts : seedPosts), [dbPosts]);

  const handleCreate = () => { setEditingPost(null); setUIState('creating'); };
  const handleEdit = (p: Post) => { setEditingPost(p); setUIState('editing'); };
  const handleDelete = (slug: string) => { setDeleteSlug(slug); setUIState('confirm-delete'); };

  const deleteMutation = useMutation({
    mutationFn: (slug: string) => deletePostDb(slug),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['posts'] });
      success('Post deleted');
      setDeleteSlug(null);
      setUIState('idle');
    },
    onError: () => error('Failed to delete post'),
  });
  const confirmDelete = () => { if (deleteSlug) deleteMutation.mutate(deleteSlug); };

  const generateSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();

  const upsertMutation = useMutation({
    mutationFn: upsertPost,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['posts'] });
      success(uiState === 'creating' ? 'Post created' : 'Post updated');
      setUIState('idle');
      setEditingPost(null);
    },
    onError: () => error('Failed to save post'),
  });
  const savePost = (post: Post) => upsertMutation.mutate(post);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-heading text-3xl font-bold">Manage Blog Posts</h1>
            <p className="text-muted-foreground">Create, edit and manage your content</p>
          </div>
          <button onClick={handleCreate} className="px-5 py-3 bg-accent text-black rounded-md">Add New Post</button>
        </div>

  <PostsTable posts={filtered as any} onEdit={handleEdit} onDelete={handleDelete} />

        <div className="mt-12">
          <h2 className="font-heading text-2xl font-bold mb-4">Site Settings</h2>
          <OffersForm />
        </div>

        <Modal isOpen={uiState === 'creating' || uiState === 'editing'} onClose={() => setUIState('idle')} title={uiState === 'creating' ? 'Create Post' : 'Edit Post'} size="xl">
          <PostEditorForm initial={editingPost ?? undefined} onSave={savePost} onCancel={() => setUIState('idle')} generateSlug={generateSlug} />
        </Modal>

        <Modal isOpen={uiState === 'confirm-delete'} onClose={() => setUIState('idle')} title="Confirm Delete" size="sm">
          <div className="text-center">
            <p>Are you sure you want to delete this post?</p>
            <div className="mt-6 flex justify-center gap-4">
              <button className="px-4 py-2 border rounded-md" onClick={() => setUIState('idle')}>Cancel</button>
              <button className="px-4 py-2 bg-red-600 text-white rounded-md" onClick={confirmDelete}>Delete</button>
            </div>
          </div>
        </Modal>
      </main>
      <Footer />
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}
