import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { saveFranchiseLead } from '@/lib/supabaseApi';

export default function FranchiseForm({ onClose }: { onClose: ()=>void }) {
  const [loading,setLoading]=useState(false);
  const [sent,setSent]=useState(false);
  const [form,setForm]=useState({ name:'', email:'', phone:'', city:'', message:'' });
  const change = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => setForm(f=>({...f,[e.target.name]:e.target.value}));
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try { await saveFranchiseLead(form); setSent(true); }
    catch { /* ignore */ }
    finally { setLoading(false);} }
  return (
    <div className="max-w-lg w-full mx-auto">
      {sent ? (
        <div className="text-center space-y-4 py-10">
          <h3 className="text-2xl font-heading font-bold">Thank you!</h3>
          <p className="text-muted-foreground">Our team will reach out shortly.</p>
          <button onClick={onClose} className="btn-luxury">Close</button>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs tracking-wide font-semibold">Name</label>
              <input name="name" value={form.name} onChange={change} required className="mt-1 w-full border rounded-md px-3 py-2 bg-white/70" />
            </div>
            <div>
              <label className="text-xs tracking-wide font-semibold">Email</label>
              <input type="email" name="email" value={form.email} onChange={change} required className="mt-1 w-full border rounded-md px-3 py-2 bg-white/70" />
            </div>
            <div>
              <label className="text-xs tracking-wide font-semibold">Phone</label>
              <input name="phone" value={form.phone} onChange={change} required className="mt-1 w-full border rounded-md px-3 py-2 bg-white/70" />
            </div>
            <div>
              <label className="text-xs tracking-wide font-semibold">City</label>
              <input name="city" value={form.city} onChange={change} required className="mt-1 w-full border rounded-md px-3 py-2 bg-white/70" />
            </div>
          </div>
          <div>
            <label className="text-xs tracking-wide font-semibold">Message</label>
            <textarea name="message" value={form.message} onChange={change} rows={4} className="mt-1 w-full border rounded-md px-3 py-2 bg-white/70" />
          </div>
          <motion.button whileTap={{scale:0.97}} disabled={loading} className="btn-luxury w-full disabled:opacity-60">{loading? 'Submitting...' : 'Submit Interest'}</motion.button>
        </form>
      )}
    </div>
  );
}
