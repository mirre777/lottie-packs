// Pack 7: E-commerce Actions — fixed (proper stars, truck on-canvas)
const {
  baseDoc, linear, easeInOut, easeOut,
  ellipse, rect, lottieStar, fill, stroke, group, shapeLayer, txAnim, docFromLayers,
} = require('../lib/lottie-builder');

const PAL = { orange: '#F97316', green: '#10B981', red: '#EF4444', blue: '#3B82F6', white: '#FFFFFF', gold: '#EAB308', dark: '#0F172A' };

// 1. Add to cart
function addToCart() {
  const fr = 60, op = 90;

  const cartBody = shapeLayer({
    name: 'Cart',
    shapes: [group([rect({ size: [140, 100], r: 18 }), fill(PAL.blue)])],
    transform: txAnim({
      p: { a: 0, k: [300, 290, 0] },
      s: { a: 1, k: easeOut([{ t: 55, v: [100, 100, 100] }, { t: 65, v: [118, 118, 100] }, { t: 75, v: [100, 100, 100] }, { t: op, v: [100, 100, 100] }]) },
    }),
    startFrame: 0, endFrame: op,
  });

  const wheels = [-30, 30].map((ox) => shapeLayer({
    name: 'Wheel',
    shapes: [group([ellipse({ size: [22, 22] }), fill('#1E40AF')])],
    transform: txAnim({ p: { a: 0, k: [300 + ox, 350, 0] } }),
    startFrame: 0, endFrame: op,
  }));

  const item = shapeLayer({
    name: 'Item',
    shapes: [group([rect({ size: [60, 60], r: 14 }), fill(PAL.orange)])],
    transform: txAnim({
      p: { a: 1, k: easeInOut([
        { t: 0,  v: [160, 200, 0] },
        { t: 22, v: [190, 140, 0] },
        { t: 50, v: [300, 290, 0] },
        { t: op, v: [300, 290, 0] },
      ]) },
      s: { a: 1, k: easeInOut([{ t: 0, v: [100, 100, 100] }, { t: 50, v: [35, 35, 100] }, { t: op, v: [35, 35, 100] }]) },
      o: { a: 1, k: linear([{ t: 44, v: 100 }, { t: 56, v: 0 }, { t: op, v: 0 }]) },
    }),
    startFrame: 0, endFrame: op,
  });

  return docFromLayers(baseDoc({ name: '01-add-to-cart', op, fr }), [item, cartBody, ...wheels]);
}

// 2. Wishlist heart
function wishlistHeart() {
  const fr = 60, op = 80;
  const d0 = 4;
  const pop = (d) => easeOut([
    { t: d,      v: [0, 0, 100] },
    { t: d + 15, v: [118, 118, 100] },
    { t: d + 22, v: [100, 100, 100] },
    { t: op,     v: [100, 100, 100] },
  ]);

  const circleL = shapeLayer({
    name: 'Circle L',
    shapes: [group([ellipse({ size: [144, 144] }), fill(PAL.red)])],
    transform: txAnim({ p: { a: 0, k: [204, 228, 0] }, s: { a: 1, k: pop(d0) } }),
    startFrame: 0, endFrame: op,
  });
  const circleR = shapeLayer({
    name: 'Circle R',
    shapes: [group([ellipse({ size: [144, 144] }), fill(PAL.red)])],
    transform: txAnim({ p: { a: 0, k: [308, 228, 0] }, s: { a: 1, k: pop(d0) } }),
    startFrame: 0, endFrame: op,
  });
  const base = shapeLayer({
    name: 'Base',
    shapes: [group([rect({ size: [78, 78] }), fill(PAL.red)], { r: { a: 0, k: 45 } })],
    transform: txAnim({ p: { a: 0, k: [256, 272, 0] }, s: { a: 1, k: pop(d0) } }),
    startFrame: 0, endFrame: op,
  });
  const fill_mid = shapeLayer({
    name: 'Mid fill',
    shapes: [group([rect({ size: [180, 90] }), fill(PAL.red)])],
    transform: txAnim({ p: { a: 0, k: [256, 258, 0] }, s: { a: 1, k: pop(d0) } }),
    startFrame: 0, endFrame: op,
  });
  const sparks = Array.from({ length: 6 }, (_, i) => {
    const ang = (i / 6) * Math.PI * 2;
    return shapeLayer({
      name: `Spark ${i}`,
      shapes: [group([ellipse({ size: [13, 13] }), fill('#FF6B6B')])],
      transform: txAnim({
        p: { a: 1, k: easeOut([
          { t: d0 + 16, v: [256, 248, 0] },
          { t: d0 + 40, v: [256 + Math.cos(ang) * 105, 248 + Math.sin(ang) * 95, 0] },
          { t: op,      v: [256 + Math.cos(ang) * 105, 248 + Math.sin(ang) * 95, 0] },
        ]) },
        o: { a: 1, k: linear([{ t: d0 + 16, v: 100 }, { t: d0 + 42, v: 0 }, { t: op, v: 0 }]) },
      }),
      startFrame: 0, endFrame: op,
    });
  });

  return docFromLayers(baseDoc({ name: '02-wishlist-heart', op, fr }), [...sparks, base, fill_mid, circleR, circleL]);
}

// 3. Order confirmed
function orderConfirmed() {
  const fr = 60, op = 90;

  const box = shapeLayer({
    name: 'Box',
    shapes: [group([rect({ size: [170, 140], r: 20 }), fill(PAL.green)])],
    transform: txAnim({
      p: { a: 0, k: [256, 270, 0] },
      s: { a: 1, k: easeOut([{ t: 0, v: [0, 0, 100] }, { t: 18, v: [112, 112, 100] }, { t: 26, v: [100, 100, 100] }, { t: op, v: [100, 100, 100] }]) },
    }),
    startFrame: 0, endFrame: op,
  });
  const lid = shapeLayer({
    name: 'Lid',
    shapes: [group([rect({ size: [180, 32], r: 14 }), fill('#059669')])],
    transform: txAnim({
      p: { a: 0, k: [256, 202, 0] },
      a: { a: 0, k: [0, 16, 0] },
      r: { a: 1, k: easeInOut([{ t: 0, v: 0 }, { t: 25, v: -45 }, { t: op, v: -45 }]) },
      s: { a: 1, k: easeOut([{ t: 0, v: [0, 0, 100] }, { t: 18, v: [112, 112, 100] }, { t: 26, v: [100, 100, 100] }, { t: op, v: [100, 100, 100] }]) },
    }),
    startFrame: 0, endFrame: op,
  });
  const check = shapeLayer({
    name: 'Check',
    shapes: [group([ellipse({ size: [65, 65] }), fill(PAL.white)])],
    transform: txAnim({
      p: { a: 0, k: [256, 278, 0] },
      s: { a: 1, k: easeOut([{ t: 28, v: [0, 0, 100] }, { t: 44, v: [118, 118, 100] }, { t: 52, v: [100, 100, 100] }, { t: op, v: [100, 100, 100] }]) },
    }),
    startFrame: 0, endFrame: op,
  });

  return docFromLayers(baseDoc({ name: '03-order-confirmed', op, fr }), [check, lid, box]);
}

// 4. Delivery truck — FIXED: all coords within canvas, enters from left
function deliveryTruck() {
  const fr = 60, op = 90;
  // Final resting positions (on-canvas, truck centered at ~x=280)
  const CARGO_X  = 300, CARGO_Y  = 258;
  const CAB_X    = 170, CAB_Y    = 253;
  const WHEEL1_X = 220, WHEEL2_X = 355, WHEEL_Y = 320;
  // Off-screen start: shift everything 480px left
  const OFF = -480;

  const cargo = shapeLayer({
    name: 'Cargo',
    shapes: [group([rect({ size: [200, 120], r: 12 }), fill(PAL.blue)])],
    transform: txAnim({
      p: { a: 1, k: easeInOut([
        { t: 0,  v: [CARGO_X + OFF, CARGO_Y, 0] },
        { t: 48, v: [CARGO_X,       CARGO_Y, 0] },
        { t: op, v: [CARGO_X,       CARGO_Y, 0] },
      ]) },
    }),
    startFrame: 0, endFrame: op,
  });

  const cab = shapeLayer({
    name: 'Cab',
    shapes: [group([rect({ size: [90, 110], r: 14 }), fill('#2563EB')])],
    transform: txAnim({
      p: { a: 1, k: easeInOut([
        { t: 0,  v: [CAB_X + OFF, CAB_Y, 0] },
        { t: 48, v: [CAB_X,       CAB_Y, 0] },
        { t: op, v: [CAB_X,       CAB_Y, 0] },
      ]) },
    }),
    startFrame: 0, endFrame: op,
  });

  // Cab window
  const window_ = shapeLayer({
    name: 'Window',
    shapes: [group([rect({ size: [50, 44], r: 8 }), fill('#93C5FD')])],
    transform: txAnim({
      p: { a: 1, k: easeInOut([
        { t: 0,  v: [CAB_X + OFF, CAB_Y - 16, 0] },
        { t: 48, v: [CAB_X,       CAB_Y - 16, 0] },
        { t: op, v: [CAB_X,       CAB_Y - 16, 0] },
      ]) },
    }),
    startFrame: 0, endFrame: op,
  });

  // Wheels (spin while moving)
  const wheels = [WHEEL1_X, WHEEL2_X].map((wx, i) => shapeLayer({
    name: `Wheel ${i}`,
    shapes: [group([ellipse({ size: [48, 48] }), fill('#1E293B'), stroke(PAL.white, 4)])],
    transform: txAnim({
      p: { a: 1, k: easeInOut([
        { t: 0,  v: [wx + OFF, WHEEL_Y, 0] },
        { t: 48, v: [wx,       WHEEL_Y, 0] },
        { t: op, v: [wx,       WHEEL_Y, 0] },
      ]) },
      r: { a: 1, k: linear([{ t: 0, v: 0 }, { t: 48, v: -360 }, { t: op, v: -360 }]) },
    }),
    startFrame: 0, endFrame: op,
  }));

  return docFromLayers(baseDoc({ name: '04-delivery-truck', op, fr }), [...wheels, window_, cab, cargo]);
}

// 5. Star rating — proper 5-point stars using native Lottie sr type
function starRating() {
  const fr = 60, op = 75;
  const stars = Array.from({ length: 5 }, (_, i) => {
    const x = 116 + i * 70;
    const d = i * 9;
    return shapeLayer({
      name: `Star ${i}`,
      // lottieStar → ty:'sr', sy:1 = actual pointed star shape
      shapes: [group([lottieStar({ outerRadius: 48, innerRadius: 19, points: 5, rotation: -90 }), fill(PAL.gold)])],
      transform: txAnim({
        p: { a: 0, k: [x, 256, 0] },
        s: { a: 1, k: easeOut([
          { t: d,      v: [0,   0,   100] },
          { t: d + 14, v: [130, 130, 100] },
          { t: d + 22, v: [100, 100, 100] },
          { t: op,     v: [100, 100, 100] },
        ]) },
        o: { a: 1, k: linear([{ t: d, v: 0 }, { t: d + 6, v: 100 }, { t: op, v: 100 }]) },
      }),
      startFrame: 0, endFrame: op,
    });
  });
  return docFromLayers(baseDoc({ name: '05-star-rating', op, fr }), stars);
}

module.exports = {
  pack: 'ecommerce-actions',
  animations: [
    { name: '01-add-to-cart',    build: addToCart },
    { name: '02-wishlist-heart', build: wishlistHeart },
    { name: '03-order-confirmed',build: orderConfirmed },
    { name: '04-delivery-truck', build: deliveryTruck },
    { name: '05-star-rating',    build: starRating },
  ],
};
