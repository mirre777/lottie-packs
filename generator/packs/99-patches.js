// Surgical patches — fix individual broken animations from packs whose
// source generators were cleared from /tmp. Each entry renders to the SAME
// pack folder + filename, overwriting the broken original.
const {
  baseDoc, linear, easeInOut, easeOut,
  ellipse, rect, polygon, path, fill, stroke, trimPath, group, shapeLayer, txAnim, docFromLayers,
} = require('../lib/lottie-builder');

// ── GLASS SOCIAL: Facebook "f" ────────────────────────────────────────────
// Was: a rotating white bar. Now: a real "f" built from 3 white bars on blue.
function fbGlassLoader() {
  const fr = 60, op = 90;
  const FB = '#1877F2', W = '#FFFFFF';

  const card = shapeLayer({
    name: 'Card',
    shapes: [group([rect({ size: [340, 340], r: 56 }), fill(FB)])],
    transform: txAnim({ p: { a: 0, k: [256, 256, 0] } }),
    startFrame: 0, endFrame: op,
  });

  // "f" — vertical stem + top hook + horizontal crossbar, grouped in one layer
  // so it can pop/breathe together.
  const fLetter = shapeLayer({
    name: 'F',
    shapes: [
      // vertical stem
      group([rect({ size: [34, 150], r: 6, pos: [266, 262] }), fill(W)]),
      // top hook (short horizontal turning up-right)
      group([rect({ size: [60, 34], r: 6, pos: [283, 195] }), fill(W)]),
      // crossbar
      group([rect({ size: [90, 30], r: 6, pos: [256, 250] }), fill(W)]),
    ],
    transform: txAnim({
      p: { a: 0, k: [256, 256, 0] },
      a: { a: 0, k: [256, 256, 0] },
      s: { a: 1, k: easeInOut([{ t: 0, v: [88, 88, 100] }, { t: 45, v: [104, 104, 100] }, { t: op, v: [88, 88, 100] }]) },
    }),
    startFrame: 0, endFrame: op,
  });

  return docFromLayers(baseDoc({ name: '01-fb-glass-loader', op, fr }), [fLetter, card]);
}

// ── GLASS SOCIAL: YouTube play button ─────────────────────────────────────
// Was: a small white diamond. Now: a real right-pointing play triangle on red.
function ytGlassLoader() {
  const fr = 60, op = 90;
  const YT = '#FF0000', W = '#FFFFFF';

  const card = shapeLayer({
    name: 'Card',
    shapes: [group([rect({ size: [340, 340], r: 56 }), fill(YT)])],
    transform: txAnim({ p: { a: 0, k: [256, 256, 0] } }),
    startFrame: 0, endFrame: op,
  });

  // White rounded-rect "screen" behind the play button (YouTube logo style)
  const screen = shapeLayer({
    name: 'Screen',
    shapes: [group([rect({ size: [210, 150], r: 40 }), fill('#FFFFFF')])],
    transform: txAnim({
      p: { a: 0, k: [256, 256, 0] },
      s: { a: 1, k: easeInOut([{ t: 0, v: [100, 100, 100] }, { t: 45, v: [106, 106, 100] }, { t: op, v: [100, 100, 100] }]) },
    }),
    startFrame: 0, endFrame: op,
  });

  // Red play triangle (▶) inside the white screen — bounces
  const play = shapeLayer({
    name: 'Play',
    shapes: [group([polygon({ radius: 48, points: 3, rotation: 90, roundness: 4 }), fill(YT)])],
    transform: txAnim({
      p: { a: 0, k: [264, 256, 0] },
      s: { a: 1, k: easeOut([
        { t: 0,  v: [70, 70, 100] },
        { t: 18, v: [112, 112, 100] },
        { t: 30, v: [100, 100, 100] },
        { t: 60, v: [108, 108, 100] },
        { t: op, v: [100, 100, 100] },
      ]) },
    }),
    startFrame: 0, endFrame: op,
  });

  return docFromLayers(baseDoc({ name: '03-yt-glass-loader', op, fr }), [play, screen, card]);
}

// ── FINTECH: Security shield ───────────────────────────────────────────────
// Was: a green squircle. Now: a real shield silhouette (pointed bottom) with
// pulse rings + a check inside.
function securityShield() {
  const fr = 60, op = 90;
  const GREEN = '#10B981', WHITE = '#FFFFFF';

  const rings = [0, 22, 44].map((d, i) => shapeLayer({
    name: `Pulse ${i}`,
    shapes: [group([ellipse({ size: [150, 150] }), stroke(GREEN, 3)])],
    transform: txAnim({
      p: { a: 0, k: [256, 256, 0] },
      s: { a: 1, k: easeOut([{ t: d, v: [50, 50, 100] }, { t: d + 44, v: [230, 230, 100] }, { t: op, v: [230, 230, 100] }]) },
      o: { a: 1, k: linear([{ t: d, v: 90 }, { t: d + 44, v: 0 }, { t: op, v: 0 }]) },
    }),
    startFrame: 0, endFrame: op,
  }));

  // Shield silhouette via custom path: flat shoulders at top, curves down to a point.
  const shield = shapeLayer({
    name: 'Shield',
    shapes: [group([
      path([
        [256, 176],  // top center
        [330, 206],  // top right shoulder
        [330, 286],  // right side
        [256, 348],  // bottom point
        [182, 286],  // left side
        [182, 206],  // top left shoulder
      ]),
      fill(GREEN),
    ])],
    transform: txAnim({
      // p must equal a so absolute path coords map 1:1 while scaling pivots about center
      p: { a: 0, k: [256, 262, 0] },
      a: { a: 0, k: [256, 262, 0] },
      s: { a: 1, k: easeInOut([{ t: 0, v: [100, 100, 100] }, { t: 30, v: [108, 108, 100] }, { t: 60, v: [100, 100, 100] }, { t: op, v: [100, 100, 100] }]) },
    }),
    startFrame: 0, endFrame: op,
  });

  // White check mark inside the shield (two bars)
  const checkShort = shapeLayer({
    name: 'Check short',
    shapes: [group([rect({ size: [30, 14], r: 7 }), fill(WHITE)], { r: { a: 0, k: 45 } })],
    transform: txAnim({
      p: { a: 0, k: [240, 268, 0] },
      s: { a: 1, k: easeOut([{ t: 20, v: [0, 0, 100] }, { t: 34, v: [100, 100, 100] }, { t: op, v: [100, 100, 100] }]) },
    }),
    startFrame: 0, endFrame: op,
  });
  const checkLong = shapeLayer({
    name: 'Check long',
    shapes: [group([rect({ size: [62, 14], r: 7 }), fill(WHITE)], { r: { a: 0, k: -45 } })],
    transform: txAnim({
      p: { a: 0, k: [270, 256, 0] },
      s: { a: 1, k: easeOut([{ t: 26, v: [0, 0, 100] }, { t: 42, v: [100, 100, 100] }, { t: op, v: [100, 100, 100] }]) },
    }),
    startFrame: 0, endFrame: op,
  });

  return docFromLayers(baseDoc({ name: '04-security-shield', op, fr }), [checkShort, checkLong, shield, ...rings]);
}

// ── SAAS: Empty inbox ──────────────────────────────────────────────────────
// Was: a flat blue rectangle. Now: a clear envelope (body + flap "V" lines)
// with floating "Z" sleep dots.
function emptyInbox() {
  const fr = 60, op = 90;
  const INDIGO = '#6366F1', DARK = '#4F46E5', BASE = '#94A3B8';

  const float = (base) => easeInOut([
    { t: 0,  v: [256, base, 0] },
    { t: 45, v: [256, base - 14, 0] },
    { t: op, v: [256, base, 0] },
  ]);

  // Envelope body
  const body = shapeLayer({
    name: 'Body',
    shapes: [group([rect({ size: [190, 130], r: 16 }), fill(INDIGO)])],
    transform: txAnim({ p: { a: 1, k: float(266) } }),
    startFrame: 0, endFrame: op,
  });

  // Flap: a downward triangle (the open envelope V) sitting on the top edge
  const flap = shapeLayer({
    name: 'Flap',
    shapes: [group([
      path([
        [161, 207],  // top-left corner of body
        [351, 207],  // top-right corner of body
        [256, 285],  // V point in the middle
      ]),
      fill(DARK),
    ])],
    transform: txAnim({
      p: { a: 1, k: easeInOut([
        { t: 0,  v: [0, 0, 0] },
        { t: 45, v: [0, -14, 0] },
        { t: op, v: [0, 0, 0] },
      ]) },
    }),
    startFrame: 0, endFrame: op,
  });

  // Floating sleep dots (zzz) rising and fading
  const dots = [0, 22, 44].map((d, i) => shapeLayer({
    name: `Z ${i}`,
    shapes: [group([ellipse({ size: [14 - i * 2, 14 - i * 2] }), fill(BASE)])],
    transform: txAnim({
      p: { a: 1, k: linear([
        { t: d,      v: [320 + i * 8, 210, 0] },
        { t: d + 34, v: [332 + i * 8, 140, 0] },
        { t: op,     v: [332 + i * 8, 140, 0] },
      ]) },
      o: { a: 1, k: linear([{ t: d, v: 0 }, { t: d + 14, v: 100 }, { t: d + 34, v: 0 }, { t: op, v: 0 }]) },
    }),
    startFrame: 0, endFrame: op,
  }));

  return docFromLayers(baseDoc({ name: '01-empty-inbox', op, fr }), [...dots, flap, body]);
}

// ── ONBOARDING: Welcome wave ───────────────────────────────────────────────
// Was: a swaying pill. Now: a hand (palm + 4 fingers + thumb) waving, with rings.
function welcomeWave() {
  const fr = 60, op = 80;
  const SKIN = '#F59E0B', BLUE = '#3B82F6';

  const rings = [0, 16, 32].map((d, i) => shapeLayer({
    name: `Ring ${i}`,
    shapes: [group([ellipse({ size: [90 + i * 30, 90 + i * 30] }), stroke(BLUE, 3)])],
    transform: txAnim({
      p: { a: 0, k: [256, 250, 0] },
      s: { a: 1, k: easeOut([{ t: d, v: [40, 40, 100] }, { t: d + 40, v: [180, 180, 100] }, { t: op, v: [180, 180, 100] }]) },
      o: { a: 1, k: linear([{ t: d, v: 70 }, { t: d + 40, v: 0 }, { t: op, v: 0 }]) },
    }),
    startFrame: 0, endFrame: op,
  }));

  // Hand = palm + 4 fingers + thumb, all in one layer so it waves as a unit.
  // Pivots from the wrist (bottom).
  const fingerW = 26, fingerH = 70, palmY = 268;
  const fingers = [-39, -13, 13, 39].map((ox, i) => {
    const h = [62, 74, 70, 58][i]; // varied finger lengths
    return group([rect({ size: [fingerW, h], r: 13, pos: [256 + ox, palmY - 50 - h / 2 + 30] }), fill(SKIN)]);
  });
  const hand = shapeLayer({
    name: 'Hand',
    shapes: [
      ...fingers,
      // thumb (angled, left side)
      group([rect({ size: [26, 58], r: 13, pos: [206, 268] }), fill(SKIN)], { r: { a: 0, k: 55 } }),
      // palm
      group([rect({ size: [120, 96], r: 30, pos: [256, palmY] }), fill(SKIN)]),
    ],
    transform: txAnim({
      p: { a: 0, k: [256, 330, 0] }, // = anchor so absolute coords map 1:1
      a: { a: 0, k: [256, 330, 0] }, // pivot at wrist
      r: { a: 1, k: easeInOut([
        { t: 0,  v: -18 },
        { t: 14, v: 18 },
        { t: 32, v: -14 },
        { t: 50, v: 12 },
        { t: 68, v: 0 },
        { t: op, v: 0 },
      ]) },
      s: { a: 1, k: easeOut([{ t: 0, v: [0, 0, 100] }, { t: 12, v: [108, 108, 100] }, { t: 20, v: [100, 100, 100] }, { t: op, v: [100, 100, 100] }]) },
    }),
    startFrame: 0, endFrame: op,
  });

  return docFromLayers(baseDoc({ name: '05-welcome-wave', op, fr }), [...rings, hand]);
}

module.exports = [
  { folder: 'glass-social-loaders', name: '01-fb-glass-loader', build: fbGlassLoader },
  { folder: 'glass-social-loaders', name: '03-yt-glass-loader', build: ytGlassLoader },
  { folder: 'fintech-ui',           name: '04-security-shield', build: securityShield },
  { folder: 'saas-empty-states',    name: '01-empty-inbox',     build: emptyInbox },
  { folder: 'onboarding-steps',     name: '05-welcome-wave',    build: welcomeWave },
];
