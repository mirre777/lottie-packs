const baseDoc = ({ name, w = 512, h = 512, fr = 60, op = 60 }) => ({
  v: '5.7.4', fr, ip: 0, op, w, h, nm: name, ddd: 0, assets: [], layers: [], markers: [],
});

const linear = (frames) => frames.map((f, i) => ({
  t: f.t, s: Array.isArray(f.v) ? f.v : [f.v],
  ...(i < frames.length - 1 ? { o: { x: [0.33], y: [0] }, i: { x: [0.67], y: [1] } } : {}),
}));

const easeOut = (frames) => frames.map((f, i) => ({
  t: f.t, s: Array.isArray(f.v) ? f.v : [f.v],
  ...(i < frames.length - 1 ? { o: { x: [0.4], y: [0] }, i: { x: [0.2], y: [1] } } : {}),
}));

const easeInOut = (frames) => frames.map((f, i) => ({
  t: f.t, s: Array.isArray(f.v) ? f.v : [f.v],
  ...(i < frames.length - 1 ? { o: { x: [0.42], y: [0] }, i: { x: [0.58], y: [1] } } : {}),
}));

const tx = ({ p = [256, 256], a = [0, 0], s = [100, 100], r = 0, o = 100 } = {}) => ({
  o: typeof o === 'object' ? o : { a: 0, k: o },
  r: typeof r === 'object' ? r : { a: 0, k: r },
  p: Array.isArray(p) && !p[0]?.t ? { a: 0, k: [...p, 0] } : p,
  a: Array.isArray(a) && !a[0]?.t ? { a: 0, k: [...a, 0] } : a,
  s: Array.isArray(s) && !s[0]?.t ? { a: 0, k: [...s, 100] } : s,
});

const txAnim = (overrides) => ({
  o: { a: 0, k: 100 },
  r: { a: 0, k: 0 },
  p: { a: 0, k: [256, 256, 0] },
  a: { a: 0, k: [0, 0, 0] },
  s: { a: 0, k: [100, 100, 100] },
  ...overrides,
});

const rgbToFloat = (hex) => {
  const h = hex.replace('#', '');
  return [parseInt(h.slice(0,2),16)/255, parseInt(h.slice(2,4),16)/255, parseInt(h.slice(4,6),16)/255, 1];
};

const ellipse = ({ size = [40, 40], pos = [0, 0] } = {}) => ({
  ty: 'el', d: 1,
  s: { a: 0, k: size }, p: { a: 0, k: pos },
  nm: 'Ellipse Path 1',
});

const rect = ({ size = [80, 80], pos = [0, 0], r = 0 } = {}) => ({
  ty: 'rc', d: 1,
  s: { a: 0, k: size }, p: { a: 0, k: pos }, r: { a: 0, k: r },
  nm: 'Rectangle Path 1',
});

const fill = (hex, opacity = 100) => ({
  ty: 'fl', c: { a: 0, k: rgbToFloat(hex) }, o: { a: 0, k: opacity }, r: 1, nm: 'Fill 1',
});

const fillAnim = (fromHex, toHex, startFrame, endFrame) => ({
  ty: 'fl',
  c: { a: 1, k: easeInOut([{ t: startFrame, v: rgbToFloat(fromHex) }, { t: endFrame, v: rgbToFloat(toHex) }]) },
  o: { a: 0, k: 100 }, r: 1, nm: 'Fill 1',
});

const stroke = (hex, width = 4) => ({
  ty: 'st', c: { a: 0, k: rgbToFloat(hex) }, o: { a: 0, k: 100 },
  w: { a: 0, k: width }, lc: 2, lj: 2, ml: 1, nm: 'Stroke 1',
});

const groupTransform = (overrides = {}) => ({
  ty: 'tr', p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] },
  s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 },
  sk: { a: 0, k: 0 }, sa: { a: 0, k: 0 }, ...overrides,
});

const group = (items, transformOverrides) => ({
  ty: 'gr', it: [...items, groupTransform(transformOverrides)],
  nm: 'Group', np: items.length + 1, cix: 2, bm: 0, ix: 1,
  mn: 'ADBE Vector Group', hd: false,
});

const trimPath = (s = 0, e = 100, o = 0) => ({
  ty: 'tm', nm: 'Trim Paths 1',
  s: typeof s === 'object' ? s : { a: 0, k: s },
  e: typeof e === 'object' ? e : { a: 0, k: e },
  o: typeof o === 'object' ? o : { a: 0, k: o },
  m: 1,
});

const shapeLayer = ({ name, shapes, transform, startFrame = 0, endFrame = 60 }) => ({
  ddd: 0, ind: 0, ty: 4, nm: name, sr: 1,
  ks: transform, ao: 0, shapes,
  ip: startFrame, op: endFrame, st: 0, bm: 0,
});

const docFromLayers = (docBase, layers) => ({
  ...docBase,
  layers: layers.map((l, i) => ({ ...l, ind: i + 1 })),
});

// Native Lottie star shape (ty:'sr') — actual 5-pointed star, not rects
// rotation -90 puts first point at the top
const lottieStar = ({
  outerRadius = 55, innerRadius = 22, points = 5,
  pos = [0, 0], rotation = -90,
} = {}) => ({
  ty: 'sr', d: 1, sy: 1,
  pt: { a: 0, k: points },
  p:  { a: 0, k: pos },
  r:  { a: 0, k: rotation },
  or: { a: 0, k: outerRadius },
  os: { a: 0, k: 0 },
  ir: { a: 0, k: innerRadius },
  is: { a: 0, k: 0 },
  nm: 'Star Path',
});

// Native Lottie polygon (ty:'sr', sy:2) — N-sided regular polygon.
// points:3 = triangle (great for play buttons). rotation 90 points it right (▶).
const polygon = ({ radius = 50, points = 3, pos = [0, 0], rotation = 0, roundness = 0 } = {}) => ({
  ty: 'sr', d: 1, sy: 2,
  pt: { a: 0, k: points },
  p:  { a: 0, k: pos },
  r:  { a: 0, k: rotation },
  or: { a: 0, k: radius },
  os: { a: 0, k: roundness },
  nm: 'Polygon Path',
});

// Custom bezier path (ty:'sh') from an array of [x,y] vertices.
// Straight edges only (no tangents). closed defaults true. Great for
// shields, envelopes, arrows, chevrons — any shape rect/ellipse can't make.
const path = (vertices, closed = true) => ({
  ty: 'sh', d: 1, ix: 1, nm: 'Path 1',
  ks: {
    a: 0,
    k: {
      c: closed,
      v: vertices,
      i: vertices.map(() => [0, 0]),
      o: vertices.map(() => [0, 0]),
    },
  },
});

module.exports = {
  baseDoc, linear, easeOut, easeInOut, tx, txAnim, rgbToFloat,
  ellipse, rect, lottieStar, polygon, path, fill, fillAnim, stroke, trimPath,
  group, groupTransform, shapeLayer, docFromLayers,
};
