// Pack 11: UI Micro-interactions — inspired by MansCreative UI pack
// Palette: near-black bg, indigo #4F46E5, amber #F59E0B, white
const {
  baseDoc, linear, easeInOut, easeOut,
  ellipse, rect, polygon, path, fill, stroke, trimPath, group, shapeLayer, txAnim, docFromLayers,
} = require('../lib/lottie-builder');

const PAL = { indigo: '#4F46E5', amber: '#F59E0B', white: '#F8FAFC', bg: '#09090B', dim: '#27272A' };

// 1. Settings gear — full cog (ring + 8 teeth + hole) rotates as one body
function settingsGear() {
  const fr = 60, op = 90;

  // Build the whole gear in ONE layer so teeth + ring rotate together.
  // Teeth: 8 rects placed on a radius, each oriented radially (relative to center 256,256).
  const teethShapes = Array.from({ length: 8 }, (_, i) => {
    const deg = (i / 8) * 360;
    const rad = deg * Math.PI / 180;
    const R = 92; // distance of tooth center from gear center
    const x = 256 + Math.cos(rad) * R;
    const y = 256 + Math.sin(rad) * R;
    return group(
      [rect({ size: [30, 38], r: 6 }), fill(PAL.indigo)],
      { p: { a: 0, k: [x, y] }, r: { a: 0, k: deg + 90 } }, // +90 = point outward
    );
  });
  const ringShape = group([ellipse({ size: [150, 150], pos: [256, 256] }), fill(PAL.indigo)]);
  // Hole punched with bg color
  const holeShape = group([ellipse({ size: [70, 70], pos: [256, 256] }), fill(PAL.bg)]);

  const gear = shapeLayer({
    name: 'Gear',
    // teeth first (behind ring edge), then ring, then hole on top
    shapes: [holeShape, ringShape, ...teethShapes],
    transform: txAnim({
      p: { a: 0, k: [256, 256, 0] },
      a: { a: 0, k: [256, 256, 0] }, // rotate about canvas center
      r: { a: 1, k: linear([{ t: 0, v: 0 }, { t: op, v: 360 }]) },
    }),
    startFrame: 0, endFrame: op,
  });

  // Center dot pulses (separate, doesn't spin)
  const center = shapeLayer({
    name: 'Center',
    shapes: [group([ellipse({ size: [44, 44] }), fill(PAL.amber)])],
    transform: txAnim({
      p: { a: 0, k: [256, 256, 0] },
      s: { a: 1, k: easeInOut([{ t: 0, v: [80, 80, 100] }, { t: 45, v: [120, 120, 100] }, { t: op, v: [80, 80, 100] }]) },
    }),
    startFrame: 0, endFrame: op,
  });

  const bg = shapeLayer({
    name: 'BG', shapes: [group([rect({ size: [512, 512] }), fill(PAL.bg)])],
    transform: txAnim({ p: { a: 0, k: [256, 256, 0] } }),
    startFrame: 0, endFrame: op,
  });

  return docFromLayers(baseDoc({ name: '01-settings-gear', op, fr }), [center, gear, bg]);
}

// 2. Search → zoom — magnifier sweeps then zooms into center
function searchZoom() {
  const fr = 60, op = 90;

  const handle = shapeLayer({
    name: 'Handle',
    shapes: [group([rect({ size: [14, 60], r: 7 }), fill(PAL.white)],
      { r: { a: 0, k: 45 }, p: { a: 0, k: [36, 36] } })],
    transform: txAnim({
      p: { a: 1, k: easeInOut([
        { t: 0,  v: [256, 256, 0] },
        { t: 30, v: [210, 210, 0] },
        { t: 55, v: [290, 290, 0] },
        { t: 70, v: [256, 256, 0] },
        { t: op, v: [256, 256, 0] },
      ]) },
      s: { a: 1, k: easeOut([{ t: 55, v: [100, 100, 100] }, { t: 75, v: [0, 0, 100] }, { t: op, v: [0, 0, 100] }]) },
    }),
    startFrame: 0, endFrame: op,
  });

  const glass = shapeLayer({
    name: 'Glass',
    shapes: [group([ellipse({ size: [120, 120] }), stroke(PAL.indigo, 10), fill(PAL.bg, 80)])],
    transform: txAnim({
      p: { a: 1, k: easeInOut([
        { t: 0,  v: [256, 256, 0] },
        { t: 30, v: [210, 210, 0] },
        { t: 55, v: [290, 290, 0] },
        { t: 70, v: [256, 256, 0] },
        { t: op, v: [256, 256, 0] },
      ]) },
      s: { a: 1, k: easeOut([{ t: 55, v: [100, 100, 100] }, { t: 75, v: [300, 300, 100] }, { t: op, v: [300, 300, 100] }]) },
      o: { a: 1, k: linear([{ t: 55, v: 100 }, { t: 72, v: 0 }, { t: op, v: 0 }]) },
    }),
    startFrame: 0, endFrame: op,
  });

  // Result dot after zoom
  const result = shapeLayer({
    name: 'Result',
    shapes: [group([ellipse({ size: [40, 40] }), fill(PAL.amber)])],
    transform: txAnim({
      p: { a: 0, k: [256, 256, 0] },
      s: { a: 1, k: easeOut([{ t: 68, v: [0, 0, 100] }, { t: 80, v: [130, 130, 100] }, { t: 86, v: [100, 100, 100] }, { t: op, v: [100, 100, 100] }]) },
    }),
    startFrame: 0, endFrame: op,
  });

  const bg = shapeLayer({
    name: 'BG', shapes: [group([rect({ size: [512, 512] }), fill(PAL.bg)])],
    transform: txAnim({ p: { a: 0, k: [256, 256, 0] } }),
    startFrame: 0, endFrame: op,
  });

  return docFromLayers(baseDoc({ name: '02-search-zoom', op, fr }), [result, handle, glass, bg]);
}

// 3. Hamburger → X — 3 bars: middle fades, top+bottom rotate to form X
function hamburgerX() {
  const fr = 60, op = 90;
  const MID = 40;

  // Top bar — moves to center + rotates 45°
  const top = shapeLayer({
    name: 'Top bar',
    shapes: [group([rect({ size: [160, 16], r: 8 }), fill(PAL.white)])],
    transform: txAnim({
      p: { a: 1, k: easeInOut([
        { t: 0,   v: [256, 200, 0] },
        { t: MID, v: [256, 256, 0] },
        { t: op,  v: [256, 256, 0] },
      ]) },
      r: { a: 1, k: easeInOut([
        { t: 0,   v: 0 },
        { t: MID, v: 45 },
        { t: op,  v: 45 },
      ]) },
    }),
    startFrame: 0, endFrame: op,
  });

  // Middle bar — fades out
  const mid = shapeLayer({
    name: 'Mid bar',
    shapes: [group([rect({ size: [160, 16], r: 8 }), fill(PAL.indigo)])],
    transform: txAnim({
      p: { a: 0, k: [256, 256, 0] },
      o: { a: 1, k: easeInOut([{ t: 0, v: 100 }, { t: MID - 10, v: 100 }, { t: MID, v: 0 }, { t: op, v: 0 }]) },
      s: { a: 1, k: easeInOut([{ t: 0, v: [100, 100, 100] }, { t: MID, v: [0, 100, 100] }, { t: op, v: [0, 100, 100] }]) },
    }),
    startFrame: 0, endFrame: op,
  });

  // Bottom bar — moves to center + rotates -45°
  const bot = shapeLayer({
    name: 'Bot bar',
    shapes: [group([rect({ size: [160, 16], r: 8 }), fill(PAL.white)])],
    transform: txAnim({
      p: { a: 1, k: easeInOut([
        { t: 0,   v: [256, 312, 0] },
        { t: MID, v: [256, 256, 0] },
        { t: op,  v: [256, 256, 0] },
      ]) },
      r: { a: 1, k: easeInOut([
        { t: 0,   v: 0 },
        { t: MID, v: -45 },
        { t: op,  v: -45 },
      ]) },
    }),
    startFrame: 0, endFrame: op,
  });

  const bg = shapeLayer({
    name: 'BG', shapes: [group([rect({ size: [512, 512] }), fill(PAL.bg)])],
    transform: txAnim({ p: { a: 0, k: [256, 256, 0] } }),
    startFrame: 0, endFrame: op,
  });

  return docFromLayers(baseDoc({ name: '03-hamburger-x', op, fr }), [top, mid, bot, bg]);
}

// 4. Download arrow — clean arrow (shaft + down-triangle) drops, tray draws in
function downloadArrow() {
  const fr = 60, op = 75;

  // Arrow built as ONE layer: shaft rect + down-pointing triangle head, aligned on x=256.
  // The head's flat top (y≈250) sits flush against the shaft's bottom.
  const arrow = shapeLayer({
    name: 'Arrow',
    shapes: [
      // shaft (centered at y=205, spans 165–245)
      group([rect({ size: [20, 80], r: 10, pos: [256, 205] }), fill(PAL.indigo)]),
      // head: triangle pointing DOWN, flat top flush with shaft bottom
      group([polygon({ radius: 38, points: 3, rotation: 180, pos: [256, 268], roundness: 4 }), fill(PAL.indigo)]),
    ],
    transform: txAnim({
      p: { a: 1, k: easeInOut([
        { t: 0,  v: [256, 236, 0] },  // start a bit up
        { t: 14, v: [256, 256, 0] },  // arrives down
        { t: 26, v: [256, 248, 0] },  // small bounce
        { t: 36, v: [256, 256, 0] },
        { t: op, v: [256, 256, 0] },
      ]) },
      a: { a: 0, k: [256, 236, 0] },
      o: { a: 1, k: linear([{ t: 0, v: 0 }, { t: 10, v: 100 }, { t: op, v: 100 }]) },
    }),
    startFrame: 0, endFrame: op,
  });

  // Tray / underline draws in from left
  const tray = shapeLayer({
    name: 'Tray',
    shapes: [group([rect({ size: [150, 16], r: 8 }), fill(PAL.amber)])],
    transform: txAnim({
      p: { a: 0, k: [256, 350, 0] },
      a: { a: 0, k: [75, 0, 0] },
      s: { a: 1, k: easeOut([{ t: 30, v: [0, 100, 100] }, { t: 48, v: [100, 100, 100] }, { t: op, v: [100, 100, 100] }]) },
    }),
    startFrame: 0, endFrame: op,
  });

  const bg = shapeLayer({
    name: 'BG', shapes: [group([rect({ size: [512, 512] }), fill(PAL.bg)])],
    transform: txAnim({ p: { a: 0, k: [256, 256, 0] } }),
    startFrame: 0, endFrame: op,
  });

  return docFromLayers(baseDoc({ name: '04-download-arrow', op, fr }), [arrow, tray, bg]);
}

// 5. Notification bell — bell swings + badge pulses
function notificationBell() {
  const fr = 60, op = 90;

  // Badge (top-right dot)
  const badge = shapeLayer({
    name: 'Badge',
    shapes: [group([ellipse({ size: [36, 36] }), fill(PAL.amber)])],
    transform: txAnim({
      p: { a: 0, k: [306, 186, 0] },
      s: { a: 1, k: easeInOut([
        { t: 0,  v: [100, 100, 100] },
        { t: 20, v: [130, 130, 100] },
        { t: 40, v: [100, 100, 100] },
        { t: 60, v: [120, 120, 100] },
        { t: op, v: [100, 100, 100] },
      ]) },
    }),
    startFrame: 0, endFrame: op,
  });

  // Bell body
  const bell = shapeLayer({
    name: 'Bell',
    shapes: [
      group([rect({ size: [130, 140], r: 65 }), fill(PAL.indigo)]),
      group([rect({ size: [150, 30], r: 10, pos: [0, 70] }), fill(PAL.indigo)]),
      group([ellipse({ size: [24, 24], pos: [0, 95] }), fill(PAL.white)]),
    ],
    transform: txAnim({
      p: { a: 0, k: [256, 256, 0] },
      a: { a: 0, k: [0, -80, 0] },
      r: { a: 1, k: easeInOut([
        { t: 0,  v: 0 },
        { t: 14, v: 18 },
        { t: 30, v: -16 },
        { t: 46, v: 12 },
        { t: 60, v: -8 },
        { t: 72, v: 4 },
        { t: op, v: 0 },
      ]) },
    }),
    startFrame: 0, endFrame: op,
  });

  const bg = shapeLayer({
    name: 'BG', shapes: [group([rect({ size: [512, 512] }), fill(PAL.bg)])],
    transform: txAnim({ p: { a: 0, k: [256, 256, 0] } }),
    startFrame: 0, endFrame: op,
  });

  return docFromLayers(baseDoc({ name: '05-notification-bell', op, fr }), [badge, bell, bg]);
}

module.exports = {
  pack: 'micro-interactions',
  animations: [
    { name: '01-settings-gear',    build: settingsGear },
    { name: '02-search-zoom',      build: searchZoom },
    { name: '03-hamburger-x',      build: hamburgerX },
    { name: '04-download-arrow',   build: downloadArrow },
    { name: '05-notification-bell',build: notificationBell },
  ],
};
