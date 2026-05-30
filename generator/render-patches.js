const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const puppeteer = require('puppeteer');

// Items to render: { folder, name, build }
const patches = require('./packs/99-patches');

// Plus specific fixed animations from surviving pack sources
const audioVideo = require('./packs/10-audio-video');
const micro = require('./packs/11-micro-interactions');
const pick = (pack, names) => pack.animations
  .filter(a => names.includes(a.name))
  .map(a => ({ folder: pack.pack, name: a.name, build: a.build }));

const ONLY = process.env.ONLY ? process.env.ONLY.split(',') : null;
let ITEMS = [
  ...patches,
  ...pick(audioVideo, ['03-play-pause', '05-volume-indicator']),
  ...pick(micro, ['01-settings-gear', '04-download-arrow']),
];
if (ONLY) ITEMS = ITEMS.filter(it => ONLY.includes(it.name));

const OUT_ROOT = path.join(process.env.HOME, 'Desktop', 'animation-packs');
const WORK = '/tmp/anim-gen/build';
const SCALE = 2;
const mkdirp = (p) => fs.mkdirSync(p, { recursive: true });

const htmlTemplate = (j, w, h) => `<!doctype html><html><head><meta charset="utf-8"/>
<style>html,body{margin:0;padding:0;background:transparent;width:${w}px;height:${h}px;overflow:hidden;}#anim{width:${w}px;height:${h}px;}</style>
<script src="https://cdn.jsdelivr.net/npm/lottie-web@5.12.2/build/player/lottie.min.js"></script></head>
<body><div id="anim"></div><script>
const data=${JSON.stringify(j)};
window.anim=lottie.loadAnimation({container:document.getElementById('anim'),renderer:'svg',loop:true,autoplay:false,animationData:data});
window.anim.addEventListener('DOMLoaded',()=>{window.__ready=true;});
</script></body></html>`;

async function renderItem(browser, item) {
  const json = item.build();
  const W = json.w, H = json.h, fr = json.fr;
  const RW = W * SCALE, RH = H * SCALE;
  const totalFrames = json.op - json.ip;
  const packDir = path.join(OUT_ROOT, item.folder);
  mkdirp(packDir);

  fs.writeFileSync(path.join(packDir, `${item.name}.json`), JSON.stringify(json, null, 2));

  const page = await browser.newPage();
  await page.setViewport({ width: RW, height: RH, deviceScaleFactor: 1 });
  await page.setContent(htmlTemplate(json, RW, RH), { waitUntil: 'load' });
  await page.waitForFunction('window.__ready === true', { timeout: 10000 });

  await page.evaluate((f) => window.anim.goToAndStop(f, true), Math.floor(totalFrames / 2));
  await new Promise(r => setTimeout(r, 120));
  const svg = await page.evaluate(() => {
    const s = document.querySelector('#anim svg');
    if (!s) return null;
    s.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    return s.outerHTML;
  });
  fs.writeFileSync(path.join(packDir, `${item.name}.svg`),
    svg || `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"></svg>`);

  const frameDir = path.join(WORK, item.folder + '-' + item.name);
  mkdirp(frameDir);
  for (let i = 0; i < totalFrames; i++) {
    await page.evaluate((f) => window.anim.goToAndStop(f, true), i);
    await new Promise(r => setTimeout(r, 16));
    const buf = await page.screenshot({ type: 'png', omitBackground: false, clip: { x: 0, y: 0, width: RW, height: RH } });
    fs.writeFileSync(path.join(frameDir, `f${String(i).padStart(4, '0')}.png`), buf);
  }
  await page.close();

  const ff = spawnSync('ffmpeg', [
    '-y', '-framerate', String(fr), '-i', path.join(frameDir, 'f%04d.png'),
    '-c:v', 'libx264', '-crf', '14', '-preset', 'slow', '-pix_fmt', 'yuv420p',
    '-vf', `scale=${RW}:${RH}:flags=lanczos`, '-movflags', '+faststart',
    path.join(packDir, `${item.name}.mp4`),
  ], { stdio: ['ignore', 'pipe', 'pipe'] });
  if (ff.status !== 0) console.error('ffmpeg fail', item.name, ff.stderr.toString().slice(-200));
  fs.rmSync(frameDir, { recursive: true, force: true });
}

async function main() {
  mkdirp(WORK);
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  for (const item of ITEMS) {
    process.stdout.write(`· ${item.folder}/${item.name} ... `);
    try { await renderItem(browser, item); console.log('ok'); }
    catch (e) { console.log('FAIL:', e.message); }
  }
  await browser.close();
  console.log('\n✓ Patches done');
}
main().catch(e => { console.error(e); process.exit(1); });
