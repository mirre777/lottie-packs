// Pack 10: Audio & Video UI Icons
// Inspired by LottiePro audio-video-ui-icons-01-solid
// Palette: dark bg, cyan #06B6D4, purple #8B5CF6, white
const {
  baseDoc, linear, easeInOut, easeOut,
  ellipse, rect, polygon, path, fill, stroke, trimPath, group, shapeLayer, txAnim, docFromLayers,
} = require('../lib/lottie-builder');

const PAL = { cyan: '#06B6D4', purple: '#8B5CF6', white: '#F0F9FF', bg: '#0C1222', dim: '#1E3A4C' };

// 1. Equalizer — 5 bars bounce at different heights/phases
function equalizer() {
  const fr = 60, op = 60;
  const heights = [80, 140, 100, 170, 90];
  const phases  = [0, 8, 4, 14, 2];
  const baseY   = 320;

  const bars = heights.map((maxH, i) => {
    const d = phases[i];
    const x = 156 + i * 52;
    const minH = 20;
    return shapeLayer({
      name: `Bar ${i}`,
      shapes: [group([rect({ size: [28, maxH], r: 14 }), fill(i % 2 === 0 ? PAL.cyan : PAL.purple)])],
      transform: txAnim({
        p: { a: 0, k: [x, baseY - maxH / 2, 0] },
        a: { a: 0, k: [0, maxH / 2, 0] }, // anchor bottom
        s: {
          a: 1, k: easeInOut([
            { t: d,           v: [100, 100, 100] },
            { t: d + 15,      v: [100, Math.round(minH / maxH * 100), 100] },
            { t: d + 30,      v: [100, 100, 100] },
            { t: d + 45,      v: [100, Math.round(minH / maxH * 60), 100] },
            { t: op,          v: [100, 100, 100] },
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

  return docFromLayers(baseDoc({ name: '01-equalizer', op, fr }), [...bars, bg]);
}

// 2. Mic with pulse rings — mic body + 3 expanding rings
function micPulse() {
  const fr = 60, op = 90;

  const rings = [0, 20, 40].map((d, i) => shapeLayer({
    name: `Ring ${i}`,
    shapes: [group([ellipse({ size: [80 + i * 40, 80 + i * 40] }), stroke(PAL.cyan, 3)])],
    transform: txAnim({
      p: { a: 0, k: [256, 256, 0] },
      s: { a: 1, k: easeOut([{ t: d, v: [40, 40, 100] }, { t: d + 45, v: [200, 200, 100] }, { t: op, v: [200, 200, 100] }]) },
      o: { a: 1, k: linear([{ t: d, v: 90 }, { t: d + 45, v: 0 }, { t: op, v: 0 }]) },
    }),
    startFrame: 0, endFrame: op,
  }));

  // Mic body = rounded rect + stand arc (rect)
  const micBody = shapeLayer({
    name: 'Mic body',
    shapes: [group([rect({ size: [70, 110], r: 35 }), fill(PAL.purple)])],
    transform: txAnim({
      p: { a: 0, k: [256, 240, 0] },
      s: { a: 1, k: easeInOut([{ t: 0, v: [100, 100, 100] }, { t: 30, v: [106, 106, 100] }, { t: 60, v: [100, 100, 100] }, { t: op, v: [100, 100, 100] }]) },
    }),
    startFrame: 0, endFrame: op,
  });
  const micStand = shapeLayer({
    name: 'Stand',
    shapes: [group([rect({ size: [12, 44], r: 6 }), fill(PAL.white)])],
    transform: txAnim({ p: { a: 0, k: [256, 330, 0] } }),
    startFrame: 0, endFrame: op,
  });
  const micBase = shapeLayer({
    name: 'Base',
    shapes: [group([rect({ size: [80, 12], r: 6 }), fill(PAL.white)])],
    transform: txAnim({ p: { a: 0, k: [256, 352, 0] } }),
    startFrame: 0, endFrame: op,
  });

  const bg = shapeLayer({
    name: 'BG', shapes: [group([rect({ size: [512, 512] }), fill(PAL.bg)])],
    transform: txAnim({ p: { a: 0, k: [256, 256, 0] } }),
    startFrame: 0, endFrame: op,
  });

  return docFromLayers(baseDoc({ name: '02-mic-pulse', op, fr }), [...rings, micBase, micStand, micBody, bg]);
}

// 3. Play/pause toggle — triangle scales out, two bars scale in
function playPause() {
  const fr = 60, op = 90;
  const MID = 45; // toggle point

  // Play triangle — real right-pointing triangle (▶) via 3-point polygon
  const playTri = shapeLayer({
    name: 'Play',
    shapes: [group([polygon({ radius: 60, points: 3, rotation: 90, roundness: 8 }), fill(PAL.cyan)])],
    transform: txAnim({
      p: { a: 0, k: [264, 256, 0] },
      o: { a: 1, k: linear([{ t: 0, v: 100 }, { t: MID - 8, v: 100 }, { t: MID, v: 0 }, { t: op, v: 0 }]) },
      s: { a: 1, k: easeInOut([{ t: 0, v: [100, 100, 100] }, { t: MID - 8, v: [112, 112, 100] }, { t: MID, v: [0, 0, 100] }, { t: op, v: [0, 0, 100] }]) },
    }),
    startFrame: 0, endFrame: op,
  });

  // Pause bars
  const pauseL = shapeLayer({
    name: 'Pause L',
    shapes: [group([rect({ size: [26, 90], r: 13 }), fill(PAL.purple)])],
    transform: txAnim({
      p: { a: 0, k: [220, 256, 0] },
      o: { a: 1, k: linear([{ t: 0, v: 0 }, { t: MID, v: 0 }, { t: MID + 8, v: 100 }, { t: op, v: 100 }]) },
      s: { a: 1, k: easeOut([{ t: MID, v: [0, 0, 100] }, { t: MID + 12, v: [110, 110, 100] }, { t: MID + 20, v: [100, 100, 100] }, { t: op, v: [100, 100, 100] }]) },
    }),
    startFrame: 0, endFrame: op,
  });
  const pauseR = shapeLayer({
    name: 'Pause R',
    shapes: [group([rect({ size: [26, 90], r: 13 }), fill(PAL.purple)])],
    transform: txAnim({
      p: { a: 0, k: [292, 256, 0] },
      o: { a: 1, k: linear([{ t: 0, v: 0 }, { t: MID, v: 0 }, { t: MID + 8, v: 100 }, { t: op, v: 100 }]) },
      s: { a: 1, k: easeOut([{ t: MID, v: [0, 0, 100] }, { t: MID + 12, v: [110, 110, 100] }, { t: MID + 20, v: [100, 100, 100] }, { t: op, v: [100, 100, 100] }]) },
    }),
    startFrame: 0, endFrame: op,
  });

  const bg = shapeLayer({
    name: 'BG', shapes: [group([rect({ size: [512, 512] }), fill(PAL.bg)])],
    transform: txAnim({ p: { a: 0, k: [256, 256, 0] } }),
    startFrame: 0, endFrame: op,
  });

  return docFromLayers(baseDoc({ name: '03-play-pause', op, fr }), [pauseL, pauseR, playTri, bg]);
}

// 4. Music waveform — 7 bars animate as a sine wave
function musicWave() {
  const fr = 60, op = 90;
  const count = 9;
  const bars = Array.from({ length: count }, (_, i) => {
    const x = 110 + i * 38;
    const maxH = [50, 90, 130, 160, 140, 110, 80, 120, 60][i];
    const d = i * 5;
    return shapeLayer({
      name: `Wave ${i}`,
      shapes: [group([rect({ size: [20, maxH], r: 10 }), fill(i % 3 === 0 ? PAL.cyan : i % 3 === 1 ? PAL.purple : PAL.white)])],
      transform: txAnim({
        p: { a: 0, k: [x, 256, 0] },
        s: {
          a: 1, k: easeInOut([
            { t: d,      v: [100, 30, 100] },
            { t: d + 20, v: [100, 100, 100] },
            { t: d + 40, v: [100, 50, 100] },
            { t: d + 60, v: [100, 100, 100] },
            { t: op,     v: [100, 30, 100] },
          ]),
        },
        o: { a: 1, k: linear([{ t: d, v: 60 }, { t: d + 20, v: 100 }, { t: d + 40, v: 60 }, { t: op, v: 60 }]) },
      }),
      startFrame: 0, endFrame: op,
    });
  });

  const bg = shapeLayer({
    name: 'BG', shapes: [group([rect({ size: [512, 512] }), fill(PAL.bg)])],
    transform: txAnim({ p: { a: 0, k: [256, 256, 0] } }),
    startFrame: 0, endFrame: op,
  });

  return docFromLayers(baseDoc({ name: '04-music-wave', op, fr }), [...bars, bg]);
}

// 5. Volume indicator — speaker + rising bar
function volumeIndicator() {
  const fr = 60, op = 75;

  const rings = [0, 18].map((d, i) => shapeLayer({
    name: `Vol ring ${i}`,
    shapes: [group([ellipse({ size: [60 + i * 60, 60 + i * 60] }), stroke(PAL.cyan, 4)])],
    transform: txAnim({
      p: { a: 0, k: [286, 256, 0] },
      s: { a: 1, k: easeOut([{ t: d, v: [30, 30, 100] }, { t: d + 40, v: [110, 110, 100] }, { t: op, v: [110, 110, 100] }]) },
      o: { a: 1, k: linear([{ t: d, v: 90 }, { t: d + 40, v: 0 }, { t: op, v: 0 }]) },
    }),
    startFrame: 0, endFrame: op,
  }));

  // Speaker = back plate (rect) + cone mouth (triangle) — proper speaker icon
  // Back plate (small rect at far left of cone)
  const backPlate = shapeLayer({
    name: 'Back',
    shapes: [group([rect({ size: [26, 70], r: 6 }), fill(PAL.purple)])],
    transform: txAnim({ p: { a: 0, k: [186, 256, 0] } }),
    startFrame: 0, endFrame: op,
  });
  // Cone mouth (triangle widening to the right)
  const mouth = shapeLayer({
    name: 'Mouth',
    shapes: [group([
      path([
        [200, 256],  // tip at back
        [240, 210],  // top of mouth
        [240, 302],  // bottom of mouth
      ]),
      fill(PAL.purple),
    ])],
    transform: txAnim({ p: { a: 0, k: [0, 0, 0] } }),
    startFrame: 0, endFrame: op,
  });

  const bg = shapeLayer({
    name: 'BG', shapes: [group([rect({ size: [512, 512] }), fill(PAL.bg)])],
    transform: txAnim({ p: { a: 0, k: [256, 256, 0] } }),
    startFrame: 0, endFrame: op,
  });

  return docFromLayers(baseDoc({ name: '05-volume-indicator', op, fr }), [...rings, mouth, backPlate, bg]);
}

module.exports = {
  pack: 'audio-video-ui',
  animations: [
    { name: '01-equalizer',        build: equalizer },
    { name: '02-mic-pulse',        build: micPulse },
    { name: '03-play-pause',       build: playPause },
    { name: '04-music-wave',       build: musicWave },
    { name: '05-volume-indicator', build: volumeIndicator },
  ],
};
