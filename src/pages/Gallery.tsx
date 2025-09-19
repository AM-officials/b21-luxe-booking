import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VideoGallery from '@/components/VideoGallery';

export default function GalleryPage(){
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        <VideoGallery />
      </main>
      <Footer />
    </div>
  );
}
