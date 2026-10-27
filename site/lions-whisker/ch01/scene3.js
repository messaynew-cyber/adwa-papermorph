/* ትእይንት ሶስት — ጫካው። በየቀኑ ስጋ ታመጣለች፤ አንበሳው ይታመናል፤ ጢሶቹን ትወስዳለች፤ የኤመቤት ቃል በላዩ ይመጣል።
   The lion is never shown: a growl, a shake of the leaves, two amber lamps in the dark.
   s07 narrator "በየቀኑ ስጋ…" · s08 narrator "ከሳምንታት በኋላ… ወሰደች" · s09 Emebet "አንበሳን በትዕግስት…" */
'use strict';
const PRE3 = 1.2;

function scene3(p, D) {
  const cam = paperCam(p, 'bush');
  const aster = asterPuppet(cam.stage, { coat: '#b8563f', stripe: '#f0d9a8', pants: '#7a3a2c', skin: '#e8bb92',
    holds: { basket: BASKET } });

  const t7 = clipAt('scene3', PRE3, 's07');   // the daily meat
  const t8 = clipAt('scene3', PRE3, 's08');   // after months: the whiskers
  const t9 = clipAt('scene3', PRE3, 's09');   // Emebet's voice over the ending
  const eyesAt = t7 + .5;

  sfx('scene3', .2, 'crickets', .42);
  sfx('scene3', .4, 'wind', .5);
  sfx('scene3', eyesAt, 'growl', .85);
  cam.shake(eyesAt, .7, 8);

  // wide while she walks in, then a slow push to her hand as the whiskers come away
  cam.cut({ x: 800, y: 470, z: .98 }, 0).to({ x: 760, y: 560, z: 1.28 }, Math.max(.5, t8 - 1.4), 4.5);

  const STEP = 2 / 3, walkEnd = t7 + .5, steps = Math.max(0, Math.floor((walkEnd - .4) / STEP)), far = spStep(steps * STEP).d;

  stopClock(D, (q, f) => {
    const w = spStep(Math.min(Math.floor(q * 6) / 6, steps * STEP));
    const moving = q < steps * STEP;
    cam.apply(q, f);
    cam.show('eyes', q >= eyesAt);
    aster.pose({ x: 430 + .92 * (far - w.d), y: 800, s: 1, look: .72,
      mouth: 'X',                                     // every line in this scene is narration or voice-over
      brow: q >= eyesAt ? -.55 : .15,
      lean: q >= t8 ? -3 : (q >= eyesAt ? -1.5 : 0),
      legL: moving ? w.legL : 0, legR: moving ? w.legR : 0, bob: moving ? w.drop : 0,
      armL: q >= t8 ? 30 : (q >= eyesAt ? 12 : 0),    // reaching into the dark for three whiskers
      shut: blinking(q, [3.6, 9.1]) }, f);
  });
}
