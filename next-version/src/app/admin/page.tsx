"use client";
import Header from '../components/site/Header';
import Footer from '../components/site/Footer';
import { useAuth } from '../../context/AuthContext';
import { usePopupBanner } from '../../context/PopupContext';
import { useBlog } from '../../context/BlogContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminPage(){
  const { user, logout } = useAuth();
  const router = useRouter();
  const { config, update: updatePopup } = usePopupBanner();
  const { posts, create, update, remove } = useBlog();
  const [editingId, setEditingId] = useState<string | null>(null);
  const editing = posts.find(p => p.id === editingId) || null;
  const [draft, setDraft] = useState({ title:'', excerpt:'', content:'', featuredImage:'' });

  useEffect(()=>{
    if(!user) router.push('/login');
  }, [user, router]);
  if(!user) return null;

  function resetDraft(){ setDraft({ title:'', excerpt:'', content:'', featuredImage:'' }); setEditingId(null); }

  function handleSubmit(e: React.FormEvent){
    e.preventDefault();
    if(editing){
      update(editing.id, { ...editing, ...draft });
    } else {
      create({ title: draft.title, excerpt: draft.excerpt, content: draft.content, featuredImage: draft.featuredImage });
    }
    resetDraft();
  }

  function loadEdit(id: string){
    const p = posts.find(p=>p.id===id); if(!p) return; setEditingId(id); setDraft({ title:p.title, excerpt:p.excerpt, content:p.content, featuredImage:p.featuredImage||'' });
  }
  function handleImage(file: File){
    const reader = new FileReader();
    reader.onload = () => { setDraft(d=>({...d, featuredImage: reader.result as string })); };
    reader.readAsDataURL(file);
  }

  return (
    <>
      <Header />
      <main className="pt-24 pb-40 max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center mb-14">
          <h1 className="text-4xl font-bold tracking-tight">Admin Dashboard</h1>
          <button onClick={logout} className="text-xs px-3 py-2 border rounded">Logout</button>
        </div>
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Popup Banner Management */}
          <section className="space-y-6">
            <h2 className="text-xl font-semibold tracking-tight">Manage Popup Banner</h2>
            <form className="space-y-4 text-sm" onSubmit={(e)=>e.preventDefault()}>
              <label className="flex items-center gap-3 text-xs font-medium"><input type="checkbox" checked={config.enabled} onChange={e=>updatePopup({ enabled: e.target.checked })} /> Enabled</label>
              <div>
                <p className="text-xs font-medium mb-1">Headline</p>
                <input className="w-full border rounded px-3 py-2" value={config.headline} onChange={e=>updatePopup({ headline:e.target.value })} />
              </div>
              <div>
                <p className="text-xs font-medium mb-1">Offer Text</p>
                <textarea className="w-full border rounded px-3 py-2 min-h-[90px]" value={config.offerText} onChange={e=>updatePopup({ offerText:e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium mb-1">Button Text</p>
                  <input className="w-full border rounded px-3 py-2" value={config.buttonText} onChange={e=>updatePopup({ buttonText:e.target.value })} />
                </div>
                <div>
                  <p className="text-xs font-medium mb-1">Button Link</p>
                  <input className="w-full border rounded px-3 py-2" value={config.buttonLink} onChange={e=>updatePopup({ buttonLink:e.target.value })} />
                </div>
              </div>
              <div>
                <p className="text-xs font-medium mb-1">Image URL (or paste base64)</p>
                <input className="w-full border rounded px-3 py-2" value={config.imageUrl||''} onChange={e=>updatePopup({ imageUrl:e.target.value })} />
              </div>
              <div>
                <p className="text-xs font-medium mb-1">Delay (ms)</p>
                <input type="number" className="w-full border rounded px-3 py-2" value={config.delayMs} onChange={e=>updatePopup({ delayMs: Number(e.target.value)||0 })} />
              </div>
              <p className="text-[10px] text-neutral-500">Changes save automatically (local only for now).</p>
            </form>
          </section>

          {/* Blog Post Editor */}
          <section className="space-y-6">
            <h2 className="text-xl font-semibold tracking-tight">{editing ? 'Edit Post' : 'Create Post'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              <div>
                <p className="text-xs font-medium mb-1">Title</p>
                <input className="w-full border rounded px-3 py-2" value={draft.title} onChange={e=>setDraft(d=>({...d, title:e.target.value}))} required />
              </div>
              <div>
                <p className="text-xs font-medium mb-1">Excerpt</p>
                <textarea className="w-full border rounded px-3 py-2 min-h-[70px]" value={draft.excerpt} onChange={e=>setDraft(d=>({...d, excerpt:e.target.value}))} required />
              </div>
              <div>
                <p className="text-xs font-medium mb-1">Content (Markdown)</p>
                <textarea className="w-full border rounded px-3 py-2 min-h-[180px] font-mono text-xs" value={draft.content} onChange={e=>setDraft(d=>({...d, content:e.target.value}))} required />
              </div>
              <div>
                <p className="text-xs font-medium mb-1">Featured Image</p>
                <input type="file" accept="image/*" onChange={e=>{ const file = e.target.files?.[0]; if(file) handleImage(file); }} />
                {draft.featuredImage && <img src={draft.featuredImage} alt="preview" className="mt-3 rounded border w-full max-h-40 object-cover" />}
              </div>
              <div className="flex gap-4">
                <button className="bg-black text-white px-5 py-2 rounded text-xs font-medium" type="submit">{editing? 'Save Changes' : 'Publish Post'}</button>
                {editing && <button type="button" onClick={resetDraft} className="text-xs underline">Cancel</button>}
              </div>
            </form>
            <div className="pt-6 border-t">
              <h3 className="text-sm font-semibold mb-4">Posts</h3>
              <ul className="space-y-3 text-xs">
                {posts.map(p => (
                  <li key={p.id} className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <p className="font-medium">{p.title}</p>
                      <p className="text-[10px] text-neutral-500">/{p.slug}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={()=>loadEdit(p.id)} className="px-2 py-1 border rounded">Edit</button>
                      <button onClick={()=>remove(p.id)} className="px-2 py-1 border rounded text-red-600">Del</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
