// Pack 12: Advanced Loaders — inspired by LottieFiles loading-1 pack
// Palette: multi-color — coral #F43F5E, mint #34D399, lavender #A78BFA, gold #FBBF24
const {
  baseDoc, linear, easeInOut, easeOut,
  ellipse, rect, fill, stroke, trimPath, group, shapeLayer, txAnim, docFromLayers,
} = require('../lib/lottie-builder');

const PAL = {
  coral:   '#F43F5E',
  mint:    '#34D399',
  lavender:'#A78BFA',
  gold:    '#FBBF24',
  sky:     '#38BDF8',
  bg:      '#0A0A0F',
};
const COLORS = [PAL.coral, PAL.mint, PAL.lavender, PAL.gold, PAL.sky];

// 1. Pie chart loader — trim path arc fills 0→100%, rotates continuously
function pieChartLoader() {
  const fr = 60, op = 120; // 2 second loop

  const track = shapeLayer({
    name: 'Track',
    shapes: [group([ellipse({ size: [220, 220] }), stroke('#1F2937', 18)])],
    transform: txAnim({ p: { a: 0, k: [256, 256, 0] } }),
    startFrame: 0, endFrame: op,
  });

  // 4 colored arc segments, each 90° of the circle
  const segments = COLORS.slice(0, 4).map((color, i) => {
    const startPct = i * 25;
    const d = i * 20;
    return shapeLayer({
      name: `Segment ${i}`,
      shapes: [group([
        ellipse({ size: [220, 220] }),
        trimPath(
          startPct,
          { a: 1, k: easeOut([{ t: d, v: [startPct] }, { t: d + 35, v: [startPct + 25] }, { t: op, v: [startPct + 25] }]) },
          0,
        ),
        stroke(color, 18),
      ])],
      transform: txAnim({
        p: { a: 0, k: [256, 256, 0] },
        r: { a: 0, k: -90 }, // start at 12 o'clock
      }),
      startFrame: 0, endFrame: op,
    });
  });

  // Center dot pulses
  const center = shapeLayer({
    name: 'Center',
    shapes: [group([ellipse({ size: [50, 50] }), fill(PAL.gold)])],
    transform: txAnim({
      p: { a: 0, k: [256, 256, 0] },
      s: { a: 1, k: easeInOut([{ t: 0, v: [80, 80, 100] }, { t: 60, v: [120, 120, 100] }, { t: op, v: [80, 80, 100] }]) },
    }),
    startFrame: 0, endFrame: op,
  });

  const bg = shapeLayer({
    name: 'BG', shapes: [group([rect({ size: [512, 512] }), fill(PAL.bg)])],
    transform: txAnim({ p: { a: 0, k: [256, 256, 0] } }),
    startFrame: 0, endFrame: op,
  });

  return docFromLayers(baseDoc({ name: '01-pie-chart-loader', op, fr }), [center, ...segments, track, bg]);
}

// 2. Grid pulse — 3×3 squares light up in a wave sequence
function gridPulse() {
  const fr = 60, op = 90;
  const cols = 3, rows = 3;
  const size = 80, gap = 100;
  const startX = 256 - gap;
  const startY = 256 - gap;

  const cells = Array.from({ length: rows * cols }, (_, idx) => {
    const col = idx % cols;
    const row = Math.floor(idx / cols);
    const x = startX + col * gap;
    const y = startY + row * gap;
    // Wave order: diagonal pulse
    const d = (col + row) * 8;
    const color = COLORS[idx % COLORS.length];
    return shapeLayer({
      name: `Cell ${idx}`,
      shapes: [group([rect({ size: [size, size], r: 16 }), fill(color)])],
      transform: txAnim({
        p: { a: 0, k: [x, y, 0] },
        o: {
          a: 1, k: linear([
            { t: d,      v: 20 },
            { t: d + 16, v: 100 },
            { t: d + 32, v: 20 },
            { t: op,     v: 20 },
          ]),
        },
        s: {
          a: 1, k: easeInOut([
            { t: d,      v: [70,  70,  100] },
            { t: d + 16, v: [110, 110, 100] },
            { t: d + 32, v: [70,  70,  100] },
            { t: op,     v: [70,  70,  100] },
          ]),
        },
      }),
      startFrame: 0, endFrame: op,
    });
  });

  const bg = shapeLayer({
    name: 'BG', shapes: [group([rect({ size: [512, 512] }), fill(PAL.bg)])],
    transform: txAnim({ p: { a: 0, k: [256, 256, 0] } }),
    startFrame: 0, endFrame: op,
  });

  return docFromLayers(baseDoc({ name: '02-grid-pulse', op, fr }), [...cells, bg]);
}

// 3. Color ring spinner — multi-colored arc segments rotate at offset speeds
function colorRing() {
  const fr = 60, op = 90;

  const rings = [
    { size: 220, strokeW: 18, color: PAL.coral,    speed: 360,  trim: 75 },
    { size: 170, strokeW: 18, color: PAL.mint,     speed: -270, trim: 60 },
    { size: 120, strokeW: 18, color: PAL.lavender, speed: 450,  trim: 45 },
  ].map(({ size, strokeW, color, speed, trim }, i) => shapeLayer({
    name: `Ring ${i}`,
    shapes: [group([
      ellipse({ size: [size, size] }),
      trimPath(0, trim, 0),
      stroke(color, strokeW),
    ])],
    transform: txAnim({
      p: { a: 0, k: [256, 256, 0] },
      r: { a: 1, k: linear([{ t: 0, v: 0 }, { t: op, v: speed }]) },
    }),
    startFrame: 0, endFrame: op,
  }));

  const center = shapeLayer({
    name: 'Center',
    shapes: [group([ellipse({ size: [44, 44] }), fill(PAL.gold)])],
    transform: txAnim({
      p: { a: 0, k: [256, 256, 0] },
      r: { a: 1, k: linear([{ t: 0, v: 0 }, { t: op, v: -360 }]) },
    }),
    startFrame: 0, endFrame: op,
  });

  const bg = shapeLayer({
    name: 'BG', shapes: [group([rect({ size: [512, 512] }), fill(PAL.bg)])],
    transform: txAnim({ p: { a: 0, k: [256, 256, 0] } }),
    startFrame: 0, endFrame: op,
  });

  return docFromLayers(baseDoc({ name: '03-color-ring', op, fr }), [center, ...rings, bg]);
}

// 4. Orbit loader — dot orbits a center point with trailing dots
function orbitLoader() {
  const fr = 60, op = 60; // 1s loop

  const orbiters = COLORS.map((color, i) => {
    const radius = 90;
    const startAngle = (i / COLORS.length) * 360;
    return shapeLayer({
      name: `Orbiter ${i}`,
      shapes: [group([ellipse({ size: [30, 30] }), fill(color)])],
      transform: txAnim({
        p: { a: 0, k: [256, 256, 0] },
        r: { a: 1, k: linear([{ t: 0, v: startAngle }, { t: op, v: startAngle + 360 }]) },
      }),
      // The position is on the ring — we simulate by offsetting child position
      // Since we can't parent in basic Lottie without precomp, use initial p on layer
      startFrame: 0, endFrame: op,
    });
  });

  // Actual orbital positions using layer position keyframes
  const dots = COLORS.map((color, i) => {
    const r = 100;
    const offset = (i / COLORS.length) * 360;
    return shapeLayer({
      name: `Dot ${i}`,
      shapes: [group([ellipse({ size: [28, 28] }), fill(color)])],
      transform: txAnim({
        p: {
          a: 1, k: (() => {
            const frames = 12;
            return linear(Array.from({ length: frames + 1 }, (_, f) => {
              const pct = f / frames;
              const angle = (offset + pct * 360) * Math.PI / 180;
              return {
                t: Math.round(pct * op),
                v: [256 + Math.cos(angle) * r, 256 + Math.sin(angle) * r, 0],
              };
            }));
          })(),
        },
        o: { a: 1, k: linear([{ t: 0, v: 30 + i * 14 }, { t: op, v: 30 + i * 14 }]) },
        s: {
          a: 1, k: easeInOut([
            { t: 0,           v: [60 + i * 8,  60 + i * 8,  100] },
            { t: Math.round(op / 2), v: [100, 100, 100] },
            { t: op,          v: [60 + i * 8,  60 + i * 8,  100] },
          ]),
        },
      }),
      startFrame: 0, endFrame: op,
    });
  });

  const center = shapeLayer({
    name: 'Core',
    shapes: [group([ellipse({ size: [30, 30] }), fill(PAL.gold)])],
    transform: txAnim({
      p: { a: 0, k: [256, 256, 0] },
      s: { a: 1, k: easeInOut([{ t: 0, v: [80, 80, 100] }, { t: 30, v: [120, 120, 100] }, { t: op, v: [80, 80, 100] }]) },
    }),
    startFrame: 0, endFrame: op,
  });

  const bg = shapeLayer({
    name: 'BG', shapes: [group([rect({ size: [512, 512] }), fill(PAL.bg)])],
    transform: txAnim({ p: { a: 0, k: [256, 256, 0] } }),
    startFrame: 0, endFrame: op,
  });

  return docFromLayers(baseDoc({ name: '04-orbit-loader', op, fr }), [...dots, center, bg]);
}

// 5. Morphing square — square rotates + scales in a hypnotic loop
function morphingSquare() {
  const fr = 60, op = 90;

  const squares = [0, 1, 2, 3].map((i) => {
    const d = i * 12;
    const size = 160 - i * 20;
    const color = COLORS[i];
    return shapeLayer({
      name: `Square ${i}`,
      shapes: [group([rect({ size: [size, size], r: 12 }), stroke(color, 6)])],
      transform: txAnim({
        p: { a: 0, k: [256, 256, 0] },
        r: { a: 1, k: linear([{ t: d, v: i * 15 }, { t: op, v: i * 15 + 90 }]) },
        s: {
          a: 1, k: easeInOut([
            { t: d,      v: [80, 80, 100] },
            { t: d + 30, v: [110, 110, 100] },
            { t: d + 60, v: [80, 80, 100] },
            { t: op,     v: [80, 80, 100] },
          ]),
        },
      }),
      startFrame: 0, endFrame: op,
    });
  });

  const core = shapeLayer({
    name: 'Core',
    shapes: [group([ellipse({ size: [50, 50] }), fill(PAL.gold)])],
    transform: txAnim({
      p: { a: 0, k: [256, 256, 0] },
      r: { a: 1, k: linear([{ t: 0, v: 0 }, { t: op, v: -180 }]) },
    }),
    startFrame: 0, endFrame: op,
  });

  const bg = shapeLayer({
    name: 'BG', shapes: [group([rect({ size: [512, 512] }), fill(PAL.bg)])],
    transform: txAnim({ p: { a: 0, k: [256, 256, 0] } }),
    startFrame: 0, endFrame: op,
  });

  return docFromLayers(baseDoc({ name: '05-morphing-square', op, fr }), [...squares, core, bg]);
}

module.exports = {
  pack: 'advanced-loaders',
  animations: [
    { name: '01-pie-chart-loader', build: pieChartLoader },
    { name: '02-grid-pulse',       build: gridPulse },
    { name: '03-color-ring',       build: colorRing },
    { name: '04-orbit-loader',     build: orbitLoader },
    { name: '05-morphing-square',  build: morphingSquare },
  ],
};
