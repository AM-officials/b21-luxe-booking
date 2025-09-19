import Header from '../components/site/Header';
import Footer from '../components/site/Footer';
import HomeLanding from '../components/home/HomeLanding';
import SectionSeparator from '../components/SectionSeparator';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <Header />
      <HomeLanding />
  <SectionSeparator style="wave" className="text-neutral-200" />
      <section className="py-24 bg-neutral-900 text-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Curated Luxury Services</h2>
            <p className="text-sm leading-relaxed text-white/70 mb-8">From precision cuts to clinical-grade facials and immersive spa therapies, each service is crafted to elevate personal well-being.</p>
            <Link href="/services" className="inline-flex items-center gap-2 text-sm font-medium bg-white text-black px-6 py-3 rounded-full hover:bg-accent">Explore Services →</Link>
          </div>
          <ul className="grid grid-cols-2 gap-6 text-xs font-medium tracking-wide">
            <li className="aspect-square rounded-xl bg-gradient-to-br from-neutral-800 to-neutral-700 p-4 flex items-end">Hair Rituals</li>
            <li className="aspect-square rounded-xl bg-gradient-to-br from-neutral-800 to-neutral-700 p-4 flex items-end">Skin Therapies</li>
            <li className="aspect-square rounded-xl bg-gradient-to-br from-neutral-800 to-neutral-700 p-4 flex items-end">Spa & Wellness</li>
            <li className="aspect-square rounded-xl bg-gradient-to-br from-neutral-800 to-neutral-700 p-4 flex items-end">Nail Artistry</li>
          </ul>
        </div>
      </section>
  <SectionSeparator style="curve" className="text-neutral-900" />
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Visual Stories & Transformations</h2>
            <p className="text-sm leading-relaxed text-neutral-600 mb-8">Browse our gallery of reels and looks created by senior artists—updated with seasonal trends & editorial work.</p>
            <Link href="/gallery" className="inline-flex items-center gap-2 text-sm font-medium bg-black text-white px-6 py-3 rounded-full hover:bg-black/80">View Gallery →</Link>
          </div>
          <div className="order-1 md:order-2 grid grid-cols-3 gap-4">
            {Array.from({length:6}).map((_,i)=>(
              <div key={i} className="aspect-square rounded-lg bg-neutral-100 flex items-center justify-center text-[10px] text-neutral-400">Reel {i+1}</div>
            ))}
          </div>
        </div>
      </section>
  <SectionSeparator style="angle" className="text-white" />
      <section className="py-24 bg-neutral-950 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Latest Insights</h2>
              <p className="text-sm text-white/60 max-w-md">Education-driven content on ritual design, product science, and seasonal care—crafted by our expert team.</p>
            </div>
            <Link href="/blog" className="text-xs font-medium tracking-wide border border-white/20 hover:border-white rounded-full px-5 py-2">All Articles</Link>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-xs">
            {['Scalp Health Guide','Monsoon Hair Reset','Glow Facial Science'].map(t => (
              <div key={t} className="group p-6 rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-800 border border-white/5 hover:border-white/15 transition-colors">
                <p className="font-semibold mb-3 text-sm group-hover:text-accent transition-colors">{t}</p>
                <p className="text-white/50 leading-relaxed mb-4">Brief teaser copy describing the core value of the article. Learn actionable techniques.</p>
                <span className="text-[10px] tracking-widest font-medium text-accent">READ →</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
