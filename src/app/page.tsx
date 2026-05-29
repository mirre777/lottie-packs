import type { Metadata } from 'next'
import Link from 'next/link'
import { PACKS, BUNDLE } from '@/lib/packs'
import PackCard from '@/components/PackCard'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Lottie Animation Packs',
  description: '20 production-ready Lottie animations across 4 themed packs.',
  numberOfItems: PACKS.length,
  itemListElement: PACKS.map((pack, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Product',
      name: pack.name,
      description: pack.description,
      url: `/packs/${pack.slug}`,
      offers: {
        '@type': 'Offer',
        price: pack.price,
        priceCurrency: pack.currency,
        availability: 'https://schema.org/InStock',
        url: pack.gumroadUrl,
      },
    },
  })),
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen dot-grid">
        {/* Nav */}
        <nav className="border-b border-white/8 px-6 py-4 flex items-center justify-between max-w-6xl mx-auto">
          <span className="font-mono font-bold text-white text-sm tracking-tight">
            LOTTIE PACKS
          </span>
          <a
            href={BUNDLE.gumroadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono border border-white/20 text-white/70 hover:text-white hover:border-white/40 px-3 py-1.5 rounded-full transition-all"
          >
            Bundle ${BUNDLE.price} →
          </a>
        </nav>

        <main className="max-w-6xl mx-auto px-6 py-20">
          {/* Hero */}
          <header className="mb-20">
            <div className="inline-flex items-center gap-2 border border-white/10 bg-white/5 text-white/60 text-xs font-mono px-3 py-1.5 rounded-full mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              20 animations · 4 packs · Commercial license
            </div>

            <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tight text-white mb-6">
              Production-ready<br />
              <span className="text-white/30">Lottie animations.</span>
            </h1>

            <p className="text-lg text-white/50 max-w-xl leading-relaxed mb-10">
              Stop spending $300+ per animation. Drop-in Lottie JSON for loading states,
              fintech flows, empty screens, and social dashboards.
              Ships with SVG &amp; MP4 previews.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href={BUNDLE.gumroadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-black text-sm font-bold px-6 py-3 rounded-full hover:bg-white/90 transition-colors"
              >
                Get all 20 — ${BUNDLE.price}
              </a>
              <a
                href="#packs"
                className="inline-flex items-center gap-2 border border-white/20 text-white/70 text-sm font-mono px-6 py-3 rounded-full hover:border-white/40 hover:text-white transition-all"
              >
                Browse packs ↓
              </a>
            </div>
          </header>

          {/* Stats bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px border border-white/8 rounded-2xl overflow-hidden mb-20 bg-white/8">
            {[
              { value: '20', label: 'Animations' },
              { value: '60fps', label: 'Framerate' },
              { value: '3', label: 'Formats' },
              { value: '∞', label: 'Projects' },
            ].map(({ value, label }) => (
              <div key={label} className="bg-black px-6 py-5">
                <div className="text-2xl font-black text-white">{value}</div>
                <div className="text-xs text-white/40 font-mono mt-1">{label}</div>
              </div>
            ))}
          </div>

          {/* Packs grid */}
          <section id="packs">
            <h2 className="text-xs font-mono text-white/30 uppercase tracking-widest mb-8">
              Packs
            </h2>
            <div className="grid md:grid-cols-2 gap-5">
              {PACKS.map((pack) => (
                <PackCard key={pack.slug} pack={pack} />
              ))}
            </div>
          </section>

          {/* Bundle CTA */}
          <section className="mt-16 border border-white/10 rounded-2xl p-8 md:p-12 bg-white/[0.02] flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <p className="text-xs font-mono text-white/30 uppercase tracking-widest mb-2">Bundle deal</p>
              <h2 className="text-3xl font-black text-white leading-tight mb-2">
                All 4 packs.<br />
                <span className="text-white/40">Save $27.</span>
              </h2>
              <p className="text-white/50 text-sm">20 animations · 60 files · Commercial license</p>
            </div>
            <a
              href={BUNDLE.gumroadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 bg-white text-black font-bold px-8 py-4 rounded-full hover:bg-white/90 transition-colors text-sm"
            >
              Get the bundle — ${BUNDLE.price}
            </a>
          </section>

          {/* SEO copy (screen-reader visible, low visual weight) */}
          <section className="mt-20 pt-12 border-t border-white/8">
            <h2 className="text-sm font-mono text-white/20 mb-4">About these animations</h2>
            <div className="text-xs text-white/20 leading-loose max-w-3xl space-y-2">
              <p>
                Every pack ships as Lottie JSON — the open animation format used by LottieFiles,
                lottie-react, lottie-react-native, dotlottie, and Rive. Drop the .json file into
                your React, React Native, Vue, or Svelte project in minutes.
              </p>
              <p>
                Built for indie developers, SaaS product teams, and mobile app studios who need
                polished motion without the After Effects pipeline. Each animation is hand-tuned
                at 60fps with clean keyframe timing and commercial licensing.
              </p>
            </div>
          </section>
        </main>

        <footer className="border-t border-white/8 px-6 py-8 max-w-6xl mx-auto flex items-center justify-between text-xs text-white/20 font-mono">
          <span>© {new Date().getFullYear()} Mirre Snelting</span>
          <span>Built with Next.js · Deployed on Vercel</span>
        </footer>
      </div>
    </>
  )
}
