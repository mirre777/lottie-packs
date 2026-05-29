export interface AnimationItem {
  name: string
  file: string // filename without extension, in /previews/
}

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
  animations: AnimationItem[]
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
    animations: [
      { name: 'Bounce', file: '01-bounce-dots' },
      { name: 'Wave', file: '02-wave-dots' },
      { name: 'Pulse', file: '03-pulse-dots' },
      { name: 'Elastic', file: '04-elastic-dots' },
      { name: 'Fade chain', file: '05-fade-dots' },
    ],
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
    animations: [
      { name: 'Currency spinner', file: '01-currency-spinner' },
      { name: 'Success check', file: '02-success-check' },
      { name: 'Fund transfer', file: '03-transfer-coin' },
      { name: 'Security shield', file: '04-security-shield' },
      { name: 'Bar chart growth', file: '05-bar-chart-growth' },
    ],
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
    animations: [
      { name: 'Empty inbox', file: '01-empty-inbox' },
      { name: 'No results', file: '02-no-results' },
      { name: 'Cloud upload', file: '03-upload-cloud' },
      { name: 'No notifications', file: '04-no-notifications' },
      { name: 'Error / broken', file: '05-error-state' },
    ],
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
    animations: [
      { name: 'Facebook', file: '01-fb-glass-loader' },
      { name: 'Instagram', file: '02-ig-glass-loader' },
      { name: 'YouTube', file: '03-yt-glass-loader' },
      { name: 'X / Twitter', file: '04-tw-glass-loader' },
      { name: 'TikTok', file: '05-tk-glass-loader' },
    ],
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
