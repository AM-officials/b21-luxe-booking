"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type User = { role: 'admin' } | null;
type AuthContextValue = {
  user: User;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
};

const ADMIN_PASSWORD = 'admin123'; // TODO: move to env for production
const TOKEN_KEY = 'b21.auth.token.v1';

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token === 'admin') setUser({ role: 'admin' });
    } catch {}
    setLoading(false);
  }, []);

  async function login(password: string): Promise<boolean> {
    // simulate async
    await new Promise(r => setTimeout(r, 300));
    if (password === ADMIN_PASSWORD) {
      setUser({ role: 'admin' });
      try { localStorage.setItem(TOKEN_KEY, 'admin'); } catch {}
      return true;
    }
    return false;
  }
  function logout() {
    setUser(null);
    try { localStorage.removeItem(TOKEN_KEY); } catch {}
  }

  return <AuthContext.Provider value={{ user, login, logout, loading }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
