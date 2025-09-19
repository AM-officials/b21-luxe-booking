"use client";
import { useState } from 'react';
import Header from '../components/site/Header';
import Footer from '../components/site/Footer';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function LoginPage(){
  const { login, user } = useAuth();
  const router = useRouter();
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');
  async function handleSubmit(e: React.FormEvent){
    e.preventDefault();
    setError('');
    const ok = await login(pw);
    if(ok){
      router.push('/admin');
    } else setError('Invalid password');
  }
  if(user){
    router.push('/admin');
    return null;
  }
  return (
    <>
      <Header />
      <main className="pt-24 pb-32 max-w-sm mx-auto px-6">
        <h1 className="text-3xl font-bold mb-8">Admin Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium mb-2">Password</label>
            <input type="password" value={pw} onChange={e=>setPw(e.target.value)} className="w-full border rounded px-3 py-2 text-sm" />
          </div>
          {error && <p className="text-xs text-red-600">{error}</p>}
          <button className="w-full bg-black text-white rounded py-2 text-sm font-medium">Login</button>
        </form>
      </main>
      <Footer />
    </>
  );
}
