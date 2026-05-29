'use client'

import Link from 'next/link'
import { Pack } from '@/lib/packs'

export default function PackCard({ pack }: { pack: Pack }) {
  return (
    <Link
      href={`/packs/${pack.slug}`}
      className="group block border border-white/10 rounded-2xl overflow-hidden bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300"
    >
      {/* Video preview */}
      <div className="relative aspect-square bg-black overflow-hidden scanline">
        <video
          src={pack.previewVideo}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-contain"
        />
        {/* price badge */}
        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur border border-white/10 text-white text-xs font-bold px-2.5 py-1 rounded-full">
          {pack.currency === 'USD' ? '$' : '€'}{pack.price}
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs text-white/40 uppercase tracking-widest mb-1">
              {pack.animationCount} animations
            </p>
            <h2 className="text-lg font-bold text-white group-hover:text-white/90 leading-tight">
              {pack.name}
            </h2>
            <p className="text-sm text-white/50 mt-1 leading-relaxed">
              {pack.tagline}
            </p>
          </div>
          <span className="shrink-0 mt-1 text-white/30 group-hover:text-white/60 transition-colors text-lg">→</span>
        </div>

        {/* Format pills */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {pack.formats.map((f: string) => (
            <span key={f} className="text-[10px] font-mono border border-white/10 text-white/40 px-2 py-0.5 rounded-full">
              {f}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
