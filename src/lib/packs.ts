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
    slug: 'ai-thinking',
    name: 'AI Thinking States',
    tagline: '5 Lottie animations for AI-powered apps',
    description:
      'Pulsing dots, neural pulse rings, generative stream bars, brain waves, and scanning eyes — every animation pattern you need when your app is thinking, generating, or processing.',
    price: 24,
    currency: 'USD',
    gumroadUrl: 'https://mirresnelting.gumroad.com/l/qapvq',
    previewVideo: '/previews/ai-thinking.mp4',
    ogImage: '/og/ai-thinking.png',
    color: 'from-purple-950 to-violet-950',
    accentHex: '#A855F7',
    animationCount: 5,
    animations: [
      { name: 'AI thinking dots', file: '01-ai-thinking-dots' },
      { name: 'Neural pulse', file: '02-neural-pulse' },
      { name: 'Generating stream', file: '03-generating-stream' },
      { name: 'Brain wave', file: '04-brain-wave' },
      { name: 'Scanning eye', file: '05-scanning-eye' },
    ],
    keywords: ['ai loading animation', 'lottie ai state', 'generating animation', 'neural network animation', 'llm loading lottie'],
    useCases: ['AI chat "thinking" states', 'LLM generating responses', 'AI image processing', 'Copilot / autocomplete indicators'],
    formats: ['Lottie JSON', 'SVG snapshot', 'MP4 preview'],
  },
  {
    slug: 'onboarding-steps',
    name: 'Onboarding Steps',
    tagline: '5 Lottie animations for onboarding flows',
    description:
      'Progress rings, step reveals, check sequences, feature highlights, and welcome waves — everything you need to guide users through your first-run experience.',
    price: 24,
    currency: 'USD',
    gumroadUrl: 'https://mirresnelting.gumroad.com/l/qapvq',
    previewVideo: '/previews/onboarding-steps.mp4',
    ogImage: '/og/onboarding-steps.png',
    color: 'from-blue-950 to-indigo-950',
    accentHex: '#3B82F6',
    animationCount: 5,
    animations: [
      { name: 'Progress ring', file: '01-progress-ring' },
      { name: 'Step reveal', file: '02-step-reveal' },
      { name: 'Check sequence', file: '03-check-sequence' },
      { name: 'Feature highlight', file: '04-feature-highlight' },
      { name: 'Welcome wave', file: '05-welcome-wave' },
    ],
    keywords: ['onboarding animation lottie', 'progress ring lottie', 'step animation', 'welcome animation', 'mobile onboarding lottie'],
    useCases: ['App first-run onboarding', 'Setup wizard steps', 'Feature tour highlights', 'Progress indicators'],
    formats: ['Lottie JSON', 'SVG snapshot', 'MP4 preview'],
  },
  {
    slug: 'ecommerce-actions',
    name: 'E-commerce Actions',
    tagline: '5 Lottie animations for online stores',
    description:
      'Add to cart, wishlist heart, order confirmed, delivery truck, and star rating — the key action moments in every e-commerce and marketplace app.',
    price: 24,
    currency: 'USD',
    gumroadUrl: 'https://mirresnelting.gumroad.com/l/qapvq',
    previewVideo: '/previews/ecommerce-actions.mp4',
    ogImage: '/og/ecommerce-actions.png',
    color: 'from-orange-950 to-red-950',
    accentHex: '#F97316',
    animationCount: 5,
    animations: [
      { name: 'Add to cart', file: '01-add-to-cart' },
      { name: 'Wishlist heart', file: '02-wishlist-heart' },
      { name: 'Order confirmed', file: '03-order-confirmed' },
      { name: 'Delivery truck', file: '04-delivery-truck' },
      { name: 'Star rating', file: '05-star-rating' },
    ],
    keywords: ['add to cart animation lottie', 'ecommerce lottie', 'order confirmed animation', 'delivery animation lottie', 'wishlist animation'],
    useCases: ['Cart micro-interactions', 'Order confirmation screens', 'Wishlist toggles', 'Delivery tracking'],
    formats: ['Lottie JSON', 'SVG snapshot', 'MP4 preview'],
  },
  {
    slug: 'weather',
    name: 'Weather',
    tagline: '5 Lottie weather animations',
    description:
      'Sunrise, rain, snowfall, lightning, and wind gusts — a complete set of animated weather conditions for weather apps, travel tools, and outdoor dashboards.',
    price: 19,
    currency: 'USD',
    gumroadUrl: 'https://mirresnelting.gumroad.com/l/qapvq',
    previewVideo: '/previews/weather.mp4',
    ogImage: '/og/weather.png',
    color: 'from-sky-950 to-cyan-950',
    accentHex: '#0EA5E9',
    animationCount: 5,
    animations: [
      { name: 'Sunrise', file: '01-sunrise' },
      { name: 'Rain', file: '02-rain' },
      { name: 'Snowfall', file: '03-snowfall' },
      { name: 'Lightning', file: '04-lightning' },
      { name: 'Wind', file: '05-wind' },
    ],
    keywords: ['weather animation lottie', 'rain animation lottie', 'sun animation lottie', 'weather icon animated', 'snowfall lottie'],
    useCases: ['Weather apps', 'Travel & outdoor apps', 'Dashboard widgets', 'Home screen complications'],
    formats: ['Lottie JSON', 'SVG snapshot', 'MP4 preview'],
  },
  {
    slug: 'dark-mode-toggle',
    name: 'Dark Mode Toggle',
    tagline: '5 Lottie dark/light mode animations',
    description:
      'Sun-to-moon morph, toggle switch, star field, eye blink, and colour shift — five polished ways to animate the moment your app switches between light and dark.',
    price: 19,
    currency: 'USD',
    gumroadUrl: 'https://mirresnelting.gumroad.com/l/qapvq',
    previewVideo: '/previews/dark-mode-toggle.mp4',
    ogImage: '/og/dark-mode-toggle.png',
    color: 'from-indigo-950 to-slate-950',
    accentHex: '#6366F1',
    animationCount: 5,
    animations: [
      { name: 'Sun moon morph', file: '01-sun-moon-morph' },
      { name: 'Toggle switch', file: '02-toggle-switch' },
      { name: 'Star field', file: '03-star-field' },
      { name: 'Eye blink', file: '04-eye-blink' },
      { name: 'Color shift', file: '05-color-shift' },
    ],
    keywords: ['dark mode toggle animation', 'lottie dark mode', 'sun moon animation lottie', 'theme toggle animation', 'night mode animation'],
    useCases: ['Theme toggle buttons', 'Settings screens', 'Splash screen transitions', 'Day/night mode switches'],
    formats: ['Lottie JSON', 'SVG snapshot', 'MP4 preview'],
  },
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
  {
    slug: 'audio-video-ui',
    name: 'Audio & Video UI',
    tagline: '5 Lottie animations for media players & audio apps',
    description:
      'Equalizer bars, mic pulse rings, play/pause toggle, music waveform, and volume indicator — every animation pattern a media or audio app needs, all in a dark-mode–friendly cyan/purple palette.',
    price: 19,
    currency: 'USD',
    gumroadUrl: 'https://mirresnelting.gumroad.com/l/qapvq',
    previewVideo: '/previews/audio-video-ui.mp4',
    ogImage: '/og/audio-video-ui.png',
    color: 'from-slate-950 to-cyan-950',
    accentHex: '#06B6D4',
    animationCount: 5,
    animations: [
      { name: 'Equalizer bars',    file: '01-equalizer' },
      { name: 'Mic pulse',         file: '02-mic-pulse' },
      { name: 'Play / pause',      file: '03-play-pause' },
      { name: 'Music waveform',    file: '04-music-wave' },
      { name: 'Volume indicator',  file: '05-volume-indicator' },
    ],
    keywords: ['equalizer animation lottie', 'audio player animation', 'music app lottie', 'play pause lottie', 'waveform animation'],
    useCases: ['Music & podcast players', 'Audio recording apps', 'Video editors', 'Media control UIs'],
    formats: ['Lottie JSON', 'SVG snapshot', 'MP4 preview'],
  },
  {
    slug: 'micro-interactions',
    name: 'Micro-interactions',
    tagline: '5 Lottie UI feedback animations',
    description:
      'Settings gear spin, search zoom, hamburger-to-X toggle, download arrow, and notification bell — the click-feedback animations every web and mobile app needs, designed in a minimal dark style.',
    price: 24,
    currency: 'USD',
    gumroadUrl: 'https://mirresnelting.gumroad.com/l/qapvq',
    previewVideo: '/previews/micro-interactions.mp4',
    ogImage: '/og/micro-interactions.png',
    color: 'from-zinc-950 to-indigo-950',
    accentHex: '#4F46E5',
    animationCount: 5,
    animations: [
      { name: 'Settings gear',      file: '01-settings-gear' },
      { name: 'Search & zoom',      file: '02-search-zoom' },
      { name: 'Hamburger → X',      file: '03-hamburger-x' },
      { name: 'Download arrow',     file: '04-download-arrow' },
      { name: 'Notification bell',  file: '05-notification-bell' },
    ],
    keywords: ['micro interaction lottie', 'ui feedback animation', 'hamburger menu animation lottie', 'settings icon animation', 'notification animation lottie'],
    useCases: ['Nav menu toggles', 'Button icon feedback', 'Toolbar icons', 'Mobile app interactions'],
    formats: ['Lottie JSON', 'SVG snapshot', 'MP4 preview'],
  },
  {
    slug: 'advanced-loaders',
    name: 'Advanced Loaders',
    tagline: '5 multi-color Lottie loading animations',
    description:
      'Pie chart arc, grid pulse, multi-ring spinner, orbit loader, and morphing square — five visually distinct loaders in a vibrant coral/mint/lavender palette built to stand out from generic spinners.',
    price: 19,
    currency: 'USD',
    gumroadUrl: 'https://mirresnelting.gumroad.com/l/qapvq',
    previewVideo: '/previews/advanced-loaders.mp4',
    ogImage: '/og/advanced-loaders.png',
    color: 'from-black to-rose-950',
    accentHex: '#F43F5E',
    animationCount: 5,
    animations: [
      { name: 'Pie chart loader',  file: '01-pie-chart-loader' },
      { name: 'Grid pulse',        file: '02-grid-pulse' },
      { name: 'Color ring',        file: '03-color-ring' },
      { name: 'Orbit loader',      file: '04-orbit-loader' },
      { name: 'Morphing square',   file: '05-morphing-square' },
    ],
    keywords: ['advanced loader lottie', 'pie chart animation lottie', 'grid loader animation', 'orbit spinner lottie', 'multi color loader'],
    useCases: ['Dashboard loading states', 'Data fetch indicators', 'App splash screens', 'Progress visualizations'],
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
