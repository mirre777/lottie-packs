const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const OUT_ROOT = path.join(process.env.HOME, 'Desktop', 'animation-packs');

const PACKS = [
  {
    slug: 'audio-video-ui',
    title: 'Audio & Video UI',
    subtitle: '5 Lottie Animations',
    bg: 'linear-gradient(135deg, #0C1222 0%, #0E2233 100%)',
    accent: '#06B6D4',
    titleColor: '#FFFFFF',
    subtitleColor: '#67E8F9',
    files: ['01-equalizer', '02-mic-pulse', '03-play-pause', '04-music-wave', '05-volume-indicator'],
  },
  {
    slug: 'micro-interactions',
    title: 'Micro-interactions',
    subtitle: '5 Lottie Animations',
    bg: 'linear-gradient(135deg, #09090B 0%, #1C1917 100%)',
    accent: '#4F46E5',
    titleColor: '#FFFFFF',
    subtitleColor: '#A5B4FC',
    files: ['01-settings-gear', '02-search-zoom', '03-hamburger-x', '04-download-arrow', '05-notification-bell'],
  },
  {
    slug: 'advanced-loaders',
    title: 'Advanced Loaders',
    subtitle: '5 Lottie Animations',
    bg: 'linear-gradient(135deg, #0A0A0F 0%, #1A0A1F 100%)',
    accent: '#F43F5E',
    titleColor: '#FFFFFF',
    subtitleColor: '#FDA4AF',
    files: ['01-pie-chart-loader', '02-grid-pulse', '03-color-ring', '04-orbit-loader', '05-morphing-square'],
  },
];

function thumbnailHTML(pack) {
  const packDir = path.join(OUT_ROOT, pack.slug);
  const svgs = pack.files.slice(0, 4).map((name) => {
    try { return fs.readFileSync(path.join(packDir, `${name}.svg`), 'utf8'); }
    catch { return `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"></svg>`; }
  });

  const cardBg = 'rgba(255,255,255,0.06)';
  const cardBorder = 'rgba(255,255,255,0.10)';

  return `<!doctype html><html><head><meta charset="utf-8"/>
<style>
  *{box-sizing:border-box;}
  html,body{margin:0;padding:0;width:1200px;height:1200px;font-family:-apple-system,system-ui,'Inter',sans-serif;}
  .stage{width:1200px;height:1200px;background:${pack.bg};padding:80px;display:flex;flex-direction:column;justify-content:space-between;}
  .badge{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.1);color:#fff;padding:10px 18px;border-radius:999px;font-size:18px;font-weight:600;letter-spacing:.02em;width:fit-content;border:1px solid rgba(255,255,255,0.15);}
  .title{font-size:96px;font-weight:800;line-height:1;color:${pack.titleColor};letter-spacing:-.02em;margin-top:8px;}
  .subtitle{font-size:34px;color:${pack.subtitleColor};font-weight:500;margin-top:8px;}
  .grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;}
  .cell{width:100%;aspect-ratio:1;background:${cardBg};border:1px solid ${cardBorder};border-radius:32px;display:flex;align-items:center;justify-content:center;overflow:hidden;}
  .cell svg{width:80%;height:80%;}
  .footer{display:flex;justify-content:space-between;align-items:center;color:${pack.titleColor};opacity:.5;font-size:22px;font-weight:500;}
</style></head>
<body><div class="stage">
  <div>
    <div class="badge">★★★★★ &nbsp; LOTTIE PACK</div>
    <div class="title">${pack.title}</div>
    <div class="subtitle">${pack.subtitle}</div>
  </div>
  <div class="grid">${svgs.map(s => `<div class="cell">${s}</div>`).join('')}</div>
  <div class="footer"><span>JSON · SVG · MP4</span><span>Commercial License</span></div>
</div></body></html>`;
}

async function main() {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  for (const pack of PACKS) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 1200, deviceScaleFactor: 1 });
    await page.setContent(thumbnailHTML(pack), { waitUntil: 'load' });
    await new Promise(r => setTimeout(r, 200));
    const out = path.join(OUT_ROOT, `thumbnail-${pack.slug}.png`);
    await page.screenshot({ path: out, type: 'png', clip: { x:0, y:0, width:1200, height:1200 } });
    // also copy into pack dir
    fs.copyFileSync(out, path.join(OUT_ROOT, pack.slug, '_thumbnail.png'));
    console.log(`✓ ${pack.slug}`);
    await page.close();
  }
  await browser.close();
}

main().catch(e => { console.error(e); process.exit(1); });
