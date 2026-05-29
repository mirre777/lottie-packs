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

          {/* Header row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-xs font-mono text-white/30 uppercase tracking-widest mb-3">
                {pack.animationCount} animations · JSON · SVG · MP4
              </p>
              <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
                {pack.name}
              </h1>
              <p className="text-white/50 text-base leading-relaxed mt-4 max-w-xl">
                {pack.description}
              </p>
            </div>

            {/* Buy block */}
            <div className="shrink-0 flex flex-col gap-2 md:items-end">
              <a
                href={pack.gumroadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-4 bg-white text-black font-bold px-7 py-4 rounded-full hover:bg-white/90 transition-colors whitespace-nowrap"
              >
                Buy this pack
                <span className="text-base">{pack.currency === 'USD' ? '$' : '€'}{pack.price}</span>
              </a>
              <a
                href={BUNDLE.gumroadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-white/30 hover:text-white/60 transition-colors text-center"
              >
                Or get all 4 packs for ${BUNDLE.price} →
              </a>
            </div>
          </div>

          {/* Animation grid — all 5 visible */}
          <section className="mb-16">
            <h2 className="text-xs font-mono text-white/30 uppercase tracking-widest mb-6">
              All animations
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {pack.animations.map((anim, i) => (
                <div key={anim.file} className="group flex flex-col">
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-black/60 border border-white/8 group-hover:border-white/20 transition-colors scanline">
                    <video
                      src={`/previews/${anim.file}.mp4`}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute top-2 left-2 bg-black/60 text-white/40 text-[10px] font-mono px-1.5 py-0.5 rounded">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                  </div>
                  <p className="text-xs text-white/50 font-mono mt-2 px-0.5">{anim.name}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Details row */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Use cases */}
            <div className="border border-white/8 rounded-2xl p-6 bg-white/[0.02]">
              <h2 className="text-xs font-mono text-white/30 uppercase tracking-widest mb-5">
                Use cases
              </h2>
              <ul className="space-y-3">
                {pack.useCases.map((u) => (
                  <li key={u} className="text-sm text-white/60 flex items-start gap-3">
                    <span className="text-white/20 mt-0.5">→</span> {u}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech specs */}
            <div className="border border-white/8 rounded-2xl p-6 bg-white/[0.02]">
              <h2 className="text-xs font-mono text-white/30 uppercase tracking-widest mb-5">
                Specs
              </h2>
              <dl className="space-y-3 text-sm font-mono">
                {[
                  ['Format', 'Lottie JSON v5.7'],
                  ['Canvas', '512 × 512 px'],
                  ['Framerate', '60 fps'],
                  ['Background', 'Transparent'],
                  ['Also includes', 'SVG snapshot · MP4 preview'],
                  ['License', 'Commercial, unlimited projects'],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4">
                    <dt className="text-white/30">{k}</dt>
                    <dd className="text-white/60 text-right">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Second buy CTA */}
          <div className="border border-white/10 rounded-2xl p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 bg-white/[0.02] mb-20">
            <div>
              <p className="text-white/40 text-sm mb-1">Ready to use?</p>
              <p className="text-white font-bold text-xl">
                {pack.name} — {pack.currency === 'USD' ? '$' : '€'}{pack.price}
              </p>
              <p className="text-white/30 text-xs font-mono mt-1">JSON · SVG · MP4 · Commercial license</p>
            </div>
            <div className="flex flex-col gap-2 shrink-0">
              <a
                href={pack.gumroadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black font-bold px-8 py-3.5 rounded-full hover:bg-white/90 transition-colors text-sm"
              >
                Buy on Gumroad →
              </a>
              <a
                href={BUNDLE.gumroadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/10 text-white/50 hover:text-white hover:border-white/20 px-8 py-3 rounded-full transition-all text-xs text-center font-mono"
              >
                All 4 packs — ${BUNDLE.price}
              </a>
            </div>
          </div>

          {/* Other packs */}
          <section>
            <h2 className="text-xs font-mono text-white/30 uppercase tracking-widest mb-6">
              More packs
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {otherPacks.map((p) => (
                <Link
                  key={p.slug}
                  href={`/packs/${p.slug}`}
                  className="group border border-white/8 rounded-xl overflow-hidden hover:border-white/20 transition-all"
                >
                  {/* Mini video preview */}
                  <div className="aspect-video bg-black overflow-hidden">
                    <video
                      src={p.previewVideo}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-white/30 font-mono mb-1">{p.animationCount} animations</p>
                    <p className="text-sm font-bold text-white group-hover:text-white/80">{p.name}</p>
                    <p className="text-xs text-white/40 mt-1">{p.currency === 'USD' ? '$' : '€'}{p.price}</p>
                  </div>
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
