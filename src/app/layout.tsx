import type { Metadata } from 'next'
import './globals.css'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://lottie-packs.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Lottie Animation Packs — Production-Ready UI Motion',
    template: '%s | Lottie Animation Packs',
  },
  description:
    '20 production-ready Lottie animations across 4 themed packs: loading dots, fintech UI, SaaS empty states, and glass morphism social loaders. JSON + SVG + MP4. Commercial license.',
  keywords: [
    'lottie animation',
    'lottie json',
    'ui animation',
    'motion design',
    'react animation',
    'react native animation',
    'fintech animation',
    'saas empty state',
    'loading animation',
    'glass morphism',
  ],
  authors: [{ name: 'Mirre Snelting' }],
  creator: 'Mirre Snelting',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Lottie Animation Packs',
    title: 'Lottie Animation Packs — Production-Ready UI Motion',
    description:
      '20 production-ready Lottie animations: loading dots, fintech UI, SaaS empty states, glass social loaders.',
    images: [{ url: '/og/bundle.png', width: 1200, height: 1200, alt: 'Lottie Animation Packs' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lottie Animation Packs',
    description: '20 production-ready Lottie animations for modern UI.',
    images: ['/og/bundle.png'],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
