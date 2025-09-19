export default function HomeLanding(){
  return (
    <main className="pt-20">
      <section className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200 text-center px-6">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Experience the B21 Transformation</h1>
          <p className="text-lg text-neutral-600 mb-8">Premium hair, beauty & spa services backed by innovation and luxury hospitality.</p>
          <div className="flex flex-wrap gap-4 justify-center text-sm font-medium">
            <a href="/services" className="px-6 py-3 rounded bg-black text-white hover:bg-accent hover:text-black transition-colors">View Services</a>
            <a href="/gallery" className="px-6 py-3 rounded border border-black/20 hover:border-black">Gallery</a>
          </div>
        </div>
      </section>
    </main>
  );
}
