/* ትእይንት ሁለት — ጫካው። ሴቲቱ በየቀኑ ስጋ ታመጣለች፤ አንበሳው ይታመናል፤ ጢሶቹን ትነቅላለች።
   The lion is never shown: it is a growl, a shake of the leaves, and two amber lamps in the dark.
   That is cheaper than a rig and truer to the tale — she never sees the whole animal either. */
'use strict';
const PRE2 = 1.2;

function scene2(p, D) {
  const cam = paperCam(p, 'bush');
  const wife = womanPuppet(cam.stage, { coat: '#b8563f', stripe: '#f0d9a8', pants: '#7a3a2c', skin: '#e8bb92',
    holds: { basket: BASKET } });

  const t6 = clipAt('scene2', PRE2, 's06');   // "በየቀኑ ስጋ ይዛ ወደ ጫካ ትሄድ ነበር"
  const t7 = clipAt('scene2', PRE2, 's07');   // "ቀስ በቀስ አንበሳው አመነባት"
  const t8 = clipAt('scene2', PRE2, 's08');   // "አትፍራ። እኔ ጓደኛህ ነኝ"
  const t9 = clipAt('scene2', PRE2, 's09');   // "በአንድ ቀን ሶስት ጢሶችን አነቀለች"
  const eyesAt = t7 + .35;

  sfx('scene2', .2, 'crickets', .45);
  sfx('scene2', .4, 'wind', .5);
  sfx('scene2', eyesAt, 'growl', .9);
  cam.shake(eyesAt, .7, 9);                   // the leaves answer the growl

  // camera: wide while she walks, then a slow push towards the bush as she is trusted
  cam.cut({ x: 800, y: 470, z: .98 }, 0).to({ x: 905, y: 545, z: 1.2 }, Math.max(.5, t8 - 1.6), 4.2);

  // she walks in from the left on twos, whole steps, and stops short of the bush
  const STEP = 2 / 3, walkEnd = t6 + .4, steps = Math.max(0, Math.floor((walkEnd - .3) / STEP)), far = spStep(steps * STEP).d;

  stopClock(D, (q, f) => {
    const w = spStep(Math.min(Math.floor(q * 6) / 6, steps * STEP));
    const moving = q < steps * STEP;
    cam.apply(q, f);
    cam.show('eyes', q >= eyesAt);
    wife.pose({ x: 440 + .92 * (far - w.d), y: 800, s: 1, look: .7,
      mouth: lips(q, 'scene2', PRE2, 's08'),
      brow: q >= eyesAt ? -.6 : (q > t6 ? .2 : 0),
      lean: q >= eyesAt ? -3 : 0,
      legL: moving ? w.legL : 0, legR: moving ? w.legR : 0, bob: moving ? w.drop : 0,
      armL: q >= t9 ? 26 : (q >= eyesAt ? 12 : 0),            // reaching for the whiskers
      shut: blinking(q, [3.4, 8.9, 12.2]) }, f);
  });
}
