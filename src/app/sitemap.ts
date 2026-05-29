import type { MetadataRoute } from 'next'
import { PACKS } from '@/lib/packs'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://lottie-packs.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const packRoutes = PACKS.map((pack) => ({
    url: `${SITE_URL}/packs/${pack.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    ...packRoutes,
  ]
}
