"use client";
import { ReactNode } from 'react';
import { PopupProvider } from '../context/PopupContext';
import { AuthProvider } from '../context/AuthContext';
import { BlogProvider } from '../context/BlogContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MotionConfig } from 'framer-motion';

const queryClient = new QueryClient();

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <MotionConfig reducedMotion="user">
        <AuthProvider>
          <BlogProvider>
            <PopupProvider>
              {children}
            </PopupProvider>
          </BlogProvider>
        </AuthProvider>
      </MotionConfig>
    </QueryClientProvider>
  );
}


