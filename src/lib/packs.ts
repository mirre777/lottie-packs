export interface Pack {
  slug: string
  name: string
  tagline: string
  description: string
  price: number
  currency: string
  gumroadUrl: string
  previewVideo: string
  ogImage: string
  color: string
  accentHex: string
  animationCount: number
  animations: string[]
  keywords: string[]
  useCases: string[]
  formats: string[]
}

export const PACKS: Pack[] = [
  {
    slug: 'loading-dots',
    name: 'Loading Dots',
    tagline: '5 Lottie loaders for modern UI',
    description:
      'A pack of 5 seamlessly looping loading animations — bounce, wave, pulse, elastic, and fade. Drop-in ready for React, React Native, Vue, or any Lottie-compatible player.',
    price: 19,
    currency: 'USD',
    gumroadUrl: 'https://mirresnelting.gumroad.com/l/qapvq',
    previewVideo: '/previews/loading-dots.mp4',
    ogImage: '/og/loading-dots.png',
    color: 'from-indigo-950 to-violet-950',
    accentHex: '#6366F1',
    animationCount: 5,
    animations: ['Bounce', 'Wave', 'Pulse', 'Elastic', 'Fade chain'],
    keywords: [
      'lottie loading animation',
      'loading dots lottie',
      'react native loader',
      'lottie spinner',
      'animated loading indicator',
      'ui loader animation',
    ],
    useCases: ['Button loading states', 'Page transitions', 'Skeleton loaders', 'Onboarding wait screens'],
    formats: ['Lottie JSON', 'SVG snapshot', 'MP4 preview'],
  },
  {
    slug: 'fintech-ui',
    name: 'Fintech UI Kit',
    tagline: '5 Lottie animations for finance & banking apps',
    description:
      'Production-ready animations for transaction confirmations, security flows, and dashboard moments. Currency spinners, success checks, fund transfers, security shields, and growth charts.',
    price: 24,
    currency: 'EUR',
    gumroadUrl: 'https://mirresnelting.gumroad.com/l/ocynee',
    previewVideo: '/previews/fintech-ui.mp4',
    ogImage: '/og/fintech-ui.png',
    color: 'from-slate-950 to-emerald-950',
    accentHex: '#10B981',
    animationCount: 5,
    animations: ['Currency spinner', 'Success check', 'Fund transfer', 'Security shield', 'Bar chart growth'],
    keywords: [
      'fintech lottie animation',
      'payment success animation',
      'banking app animation',
      'lottie fintech ui',
      'transaction animation',
      'crypto app animation',
    ],
    useCases: ['Payment success modals', 'KYC onboarding flows', 'Dashboard hero animations', 'Transaction status indicators'],
    formats: ['Lottie JSON', 'SVG snapshot', 'MP4 preview'],
  },
  {
    slug: 'saas-empty-states',
    name: 'SaaS Empty States',
    tagline: '5 Lottie animations for empty screens',
    description:
      'Turn the dead-ends in your product into moments of personality. Empty inboxes, no-results searches, upload zones, silent notification centers, and error pages — all animated.',
    price: 24,
    currency: 'EUR',
    gumroadUrl: 'https://mirresnelting.gumroad.com/l/wwaygd',
    previewVideo: '/previews/saas-empty-states.mp4',
    ogImage: '/og/saas-empty-states.png',
    color: 'from-violet-950 to-pink-950',
    accentHex: '#EC4899',
    animationCount: 5,
    animations: ['Empty inbox', 'No results', 'Cloud upload', 'No notifications', 'Error / broken'],
    keywords: [
      'saas empty state animation',
      'lottie empty state',
      'no results animation',
      'empty inbox animation',
      'upload animation lottie',
      'error state animation',
    ],
    useCases: ['Empty activity feeds', 'Search no-results screens', 'File upload drop zones', 'Notification center', '500 error pages'],
    formats: ['Lottie JSON', 'SVG snapshot', 'MP4 preview'],
  },
  {
    slug: 'glass-social-loaders',
    name: 'Glass Social Loaders',
    tagline: '5 glass-morphism loaders for social platforms',
    description:
      'Frosted glass loading cards themed for the major social platforms. Facebook, Instagram, YouTube, X (Twitter), and TikTok — perfect for social dashboards and OAuth connection flows.',
    price: 19,
    currency: 'EUR',
    gumroadUrl: 'https://mirresnelting.gumroad.com/l/yzvpb',
    previewVideo: '/previews/glass-social-loaders.mp4',
    ogImage: '/og/glass-social-loaders.png',
    color: 'from-blue-950 to-pink-950',
    accentHex: '#F472B6',
    animationCount: 5,
    animations: ['Facebook loader', 'Instagram loader', 'YouTube loader', 'X / Twitter loader', 'TikTok loader'],
    keywords: [
      'glass morphism animation',
      'social media loader lottie',
      'instagram lottie animation',
      'facebook loader animation',
      'tiktok loading animation',
      'glassmorphism ui animation',
    ],
    useCases: ['Social media dashboards', 'OAuth connection screens', 'Creator tools', 'Social analytics apps'],
    formats: ['Lottie JSON', 'SVG snapshot', 'MP4 preview'],
  },
]

export const BUNDLE = {
  name: 'The Complete Pack',
  tagline: '20 Lottie animations — all 4 packs bundled',
  price: 59,
  currency: 'USD',
  gumroadUrl: 'https://mirresnelting.gumroad.com/l/qapvq', // update when bundle listed
  ogImage: '/og/bundle.png',
}

export function getPack(slug: string): Pack | undefined {
  return PACKS.find((p) => p.slug === slug)
}
