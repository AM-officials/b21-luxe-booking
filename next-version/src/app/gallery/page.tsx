import ReelGrid from '../../components/gallery/ReelGrid';
import Header from '../../components/site/Header';
import Footer from '../../components/site/Footer';

export default function GalleryPage(){
  return (
    <>
      <Header />
      <main className="pt-20">
        <section className="py-20 max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-10">Gallery</h1>
          <ReelGrid />
        </section>
      </main>
      <Footer />
    </>
  );
}
