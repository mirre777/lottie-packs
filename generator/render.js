const fs = require('fs');
const path = require('path');
const { execSync, spawnSync } = require('child_process');
const puppeteer = require('puppeteer');

const PACKS = [
  require('./packs/07-ecommerce'),
];

const OUT_ROOT = path.join(process.env.HOME, 'Desktop', 'animation-packs');
const WORK = '/tmp/anim-gen/build';
// Render at 2× the JSON canvas — lottie-web scales SVG to fit the container,
// giving 4× more pixel density. Output MP4 at this size for crisp Retina previews.
const SCALE = 2;

function mkdirp(p) { fs.mkdirSync(p, { recursive: true }); }

const htmlTemplate = (lottieJSON, w, h) => `<!doctype html>
<html><head><meta charset="utf-8"/><style>
  html,body{margin:0;padding:0;background:transparent;width:${w}px;height:${h}px;overflow:hidden;}
  #anim{width:${w}px;height:${h}px;}
</style>
<script src="https://cdn.jsdelivr.net/npm/lottie-web@5.12.2/build/player/lottie.min.js"></script>
</head>
<body>
<div id="anim"></div>
<script>
  const data = ${JSON.stringify(lottieJSON)};
  window.anim = lottie.loadAnimation({
    container: document.getElementById('anim'),
    renderer: 'svg',
    loop: true,
    autoplay: false,
    animationData: data,
  });
  window.anim.addEventListener('DOMLoaded', () => { window.__ready = true; });
</script>
</body></html>`;

async function renderOne(browser, anim, packDir) {
  const json = anim.build();
  const W = json.w, H = json.h, fr = json.fr;
  const RW = W * SCALE, RH = H * SCALE; // render size (1024×1024 for 512 JSON)
  const totalFrames = json.op - json.ip;

  // Write Lottie JSON (stays at original W×H — vector, infinitely scalable)
  fs.writeFileSync(path.join(packDir, `${anim.name}.json`), JSON.stringify(json, null, 2));

  const page = await browser.newPage();
  // Viewport = render size; deviceScaleFactor 1 (we handle scaling via container)
  await page.setViewport({ width: RW, height: RH, deviceScaleFactor: 1 });
  // Template renders the animation at RW×RH — lottie-web stretches SVG to fill
  await page.setContent(htmlTemplate(json, RW, RH), { waitUntil: 'load' });
  await page.waitForFunction('window.__ready === true', { timeout: 10_000 });

  // SVG snapshot at mid-frame
  await page.evaluate((f) => window.anim.goToAndStop(f, true), Math.floor(totalFrames / 2));
  await new Promise(r => setTimeout(r, 120));
  const svgMarkup = await page.evaluate(() => {
    const svg = document.querySelector('#anim svg');
    if (!svg) return null;
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    return svg.outerHTML;
  });
  fs.writeFileSync(path.join(packDir, `${anim.name}.svg`),
    svgMarkup || `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"></svg>`);

  // Capture frames at RW×RH
  const frameDir = path.join(WORK, anim.name);
  mkdirp(frameDir);
  for (let i = 0; i < totalFrames; i++) {
    await page.evaluate((f) => window.anim.goToAndStop(f, true), i);
    await new Promise(r => setTimeout(r, 16));
    const buf = await page.screenshot({ type: 'png', omitBackground: false,
      clip: { x: 0, y: 0, width: RW, height: RH } });
    fs.writeFileSync(path.join(frameDir, `f${String(i).padStart(4,'0')}.png`), buf);
  }
  await page.close();

  // ffmpeg: output at RW×RH (1024×1024) — high quality, Retina-ready
  const mp4Path = path.join(packDir, `${anim.name}.mp4`);
  const ff = spawnSync('ffmpeg', [
    '-y',
    '-framerate', String(fr),
    '-i', path.join(frameDir, 'f%04d.png'),
    '-c:v', 'libx264',
    '-crf', '14',
    '-preset', 'slow',
    '-pix_fmt', 'yuv420p',
    '-vf', `scale=${RW}:${RH}:flags=lanczos`,
    '-movflags', '+faststart',
    mp4Path,
  ], { stdio: ['ignore', 'pipe', 'pipe'] });
  if (ff.status !== 0) console.error('ffmpeg failed:', ff.stderr.toString().slice(-300));

  fs.rmSync(frameDir, { recursive: true, force: true });
}

async function main() {
  mkdirp(WORK);
  mkdirp(OUT_ROOT);
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  for (const pack of PACKS) {
    const packDir = path.join(OUT_ROOT, pack.pack);
    mkdirp(packDir);
    console.log(`\n[${pack.pack}] → 1024×1024 MP4`);
    for (const anim of pack.animations) {
      process.stdout.write(`  · ${anim.name} ... `);
      try { await renderOne(browser, anim, packDir); console.log('ok'); }
      catch (e) { console.log('FAIL:', e.message); }
    }
    execSync(`cd "${OUT_ROOT}" && zip -qr "${pack.pack}.zip" "${pack.pack}"`);
  }

  await browser.close();
  console.log(`\n✓ Done → ${OUT_ROOT}`);
}

main().catch(e => { console.error(e); process.exit(1); });
