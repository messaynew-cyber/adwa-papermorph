/* ትእይንት አንድ — ጎጆው። አስቴር ብቻዋ ትናገራለች፤ ከዚያ ወደ ጠቢቧ ለመሄድ ትነሳለች።
   s01 narrator "…አስቴር… ትኖር ነበር" · s02 Aster "በመካከላችን ያለው ፍቅር ጠፍቷል" · s03 narrator "ወደ ጠቢቧ ኤመቤት ሄደች"
   One scene = one beat = a pure function of the beat clock q. */
'use strict';
const PRE1 = .8;

function scene1(p, D) {
  const cam = paperCam(p, 'hut');
  cam.cut({ x: 800, y: 470, z: 1 }, 0).to({ x: 760, y: 500, z: 1.18 }, 1.2, 11);
  const aster = asterPuppet(cam.stage, { coat: '#b8563f', stripe: '#f0d9a8', pants: '#7a3a2c', skin: '#e8bb92' });

  const t2 = clipAt('scene1', PRE1, 's02');   // "በመካከላችን ያለው ፍቅር ጠፍቷል"
  const t3 = clipAt('scene1', PRE1, 's03');   // "ስለዚህ ወደ ጠቢቧ አሮጊት ኤመቤት ሄደች"

  sfx('scene1', .25, 'room', .5);
  sfx('scene1', .8, 'wind', .4);

  // she leaves on her own feet, whole steps, once the narrator says she went
  const STEP = 2 / 3, stepFrom = t3 + .55, steps = 4, far = spStep(steps * STEP).d;

  stopClock(D, (q, f) => {
    const w = spStep(Math.max(0, Math.min(Math.floor((q - stepFrom) * 6) / 6, steps * STEP)));
    const walking = q > stepFrom && q < stepFrom + steps * STEP;
    cam.apply(q, f);
    cam.show('cloth', false);
    aster.pose({ x: 620 + .95 * (far - w.d), y: 800, s: 1, look: q < t3 ? -.15 : .7,
      mouth: lips(q, 'scene1', PRE1, 's02'),
      brow: q > t2 - .2 && q < t3 ? -.5 : .05,
      lean: q > t2 - .2 && q < t3 ? -2 : 0,
      legL: walking ? w.legL : 0, legR: walking ? w.legR : 0, bob: walking ? w.drop : 0,
      shut: blinking(q, [2.9, 7.8]) }, f);
  });
}
