import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { PACKS, getPack, BUNDLE } from '@/lib/packs'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return PACKS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const pack = getPack(slug)
  if (!pack) return {}

  return {
    title: `${pack.name} — ${pack.tagline}`,
    description: pack.description,
    keywords: pack.keywords,
    alternates: { canonical: `/packs/${slug}` },
    openGraph: {
      title: pack.name,
      description: pack.description,
      images: [{ url: pack.ogImage, width: 1200, height: 1200 }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: pack.name,
      description: pack.description,
      images: [pack.ogImage],
    },
  }
}

export default async function PackPage({ params }: Props) {
  const { slug } = await params
  const pack = getPack(slug)
  if (!pack) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: pack.name,
    description: pack.description,
    keywords: pack.keywords.join(', '),
    image: pack.ogImage,
    brand: { '@type': 'Brand', name: 'Mirre Snelting' },
    offers: {
      '@type': 'Offer',
      price: pack.price,
      priceCurrency: pack.currency,
      availability: 'https://schema.org/InStock',
      url: pack.gumroadUrl,
      seller: { '@type': 'Person', name: 'Mirre Snelting' },
    },
  }

  const otherPacks = PACKS.filter((p) => p.slug !== pack.slug)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen dot-grid">
        {/* Nav */}
        <nav className="border-b border-white/8 px-6 py-4 flex items-center justify-between max-w-6xl mx-auto">
          <Link href="/" className="font-mono font-bold text-white text-sm tracking-tight hover:text-white/70 transition-colors">
            ← LOTTIE PACKS
          </Link>
          <a
            href={pack.gumroadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono bg-white text-black font-bold px-4 py-1.5 rounded-full hover:bg-white/90 transition-all"
          >
            Buy {pack.currency === 'USD' ? '$' : '€'}{pack.price}
          </a>
        </nav>

        <main className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-start">

            {/* Left — video */}
            <div className="sticky top-8">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-black/50 border border-white/10 scanline">
                <video
                  src={pack.previewVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex gap-2 mt-3">
                {pack.formats.map((f) => (
                  <span key={f} className="text-[10px] font-mono border border-white/10 text-white/40 px-2.5 py-1 rounded-full">
                    {f}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — details */}
            <div>
              <p className="text-xs font-mono text-white/30 uppercase tracking-widest mb-3">
                {pack.animationCount} animations
              </p>
              <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
                {pack.name}
              </h1>
              <p className="text-white/50 text-base leading-relaxed mb-8">
                {pack.description}
              </p>

              {/* Buy CTA */}
              <a
                href={pack.gumroadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between w-full bg-white text-black font-bold px-6 py-4 rounded-2xl hover:bg-white/90 transition-colors mb-3"
              >
                <span>Buy this pack</span>
                <span className="text-lg">{pack.currency === 'USD' ? '$' : '€'}{pack.price}</span>
              </a>
              <a
                href={BUNDLE.gumroadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between w-full border border-white/10 text-white/60 hover:text-white hover:border-white/20 px-6 py-3.5 rounded-2xl transition-all text-sm mb-10"
              >
                <span>Get all 4 packs (bundle)</span>
                <span>${BUNDLE.price} — save $27</span>
              </a>

              {/* Animations list */}
              <div className="mb-8">
                <h2 className="text-xs font-mono text-white/30 uppercase tracking-widest mb-4">
                  Included
                </h2>
                <ul className="space-y-2">
                  {pack.animations.map((anim, i) => (
                    <li key={anim} className="flex items-center gap-3 text-sm text-white/70">
                      <span className="font-mono text-white/20 text-xs w-5">{String(i + 1).padStart(2, '0')}</span>
                      <span className="w-px h-3 bg-white/10" />
                      {anim}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Use cases */}
              <div className="mb-8">
                <h2 className="text-xs font-mono text-white/30 uppercase tracking-widest mb-4">
                  Use cases
                </h2>
                <ul className="space-y-1.5">
                  {pack.useCases.map((u) => (
                    <li key={u} className="text-sm text-white/50 flex items-center gap-2">
                      <span className="text-white/20">·</span> {u}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech details */}
              <div className="border border-white/8 rounded-xl p-5 bg-white/[0.02] text-xs font-mono space-y-2">
                {[
                  ['Format', 'Lottie JSON v5.7'],
                  ['Canvas', '512 × 512 px'],
                  ['Framerate', '60 fps'],
                  ['Background', 'Transparent'],
                  ['License', 'Commercial (unlimited projects)'],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span className="text-white/30">{k}</span>
                    <span className="text-white/60">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Other packs */}
          <section className="mt-24">
            <h2 className="text-xs font-mono text-white/30 uppercase tracking-widest mb-8">
              More packs
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {otherPacks.map((p) => (
                <Link
                  key={p.slug}
                  href={`/packs/${p.slug}`}
                  className="group border border-white/8 rounded-xl p-4 hover:border-white/20 hover:bg-white/[0.03] transition-all"
                >
                  <p className="text-xs text-white/30 font-mono mb-1">{p.animationCount} animations</p>
                  <p className="text-sm font-bold text-white group-hover:text-white/80">{p.name}</p>
                  <p className="text-xs text-white/40 mt-1">{p.currency === 'USD' ? '$' : '€'}{p.price}</p>
                </Link>
              ))}
            </div>
          </section>
        </main>

        <footer className="border-t border-white/8 px-6 py-8 max-w-6xl mx-auto flex items-center justify-between text-xs text-white/20 font-mono">
          <span>© {new Date().getFullYear()} Mirre Snelting</span>
          <Link href="/" className="hover:text-white/40 transition-colors">All packs →</Link>
        </footer>
      </div>
    </>
  )
}
