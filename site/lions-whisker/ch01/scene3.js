/* ትእይንት ሶስት — ወደ ጎጆው ተመልሳ። ጢሶቹ በነጭ ጨርቅ ላይ፤ አረጋዊው ትምህርቱን ይናገራል።
   scene three: the whiskers on a white cloth. The elder names the lesson. */
'use strict';
const PRE3 = .8;

function scene3(p, D) {
  const cam = paperCam(p, 'hut');
  const wife = womanPuppet(cam.stage, { coat: '#b8563f', stripe: '#f0d9a8', pants: '#7a3a2c', skin: '#e8bb92' });
  const elder = elderPuppet(cam.stage, { coat: '#5d6b4a', stripe: '#e8e0c8', pants: '#4a4436', skin: '#d8a878',
    holds: { staff: STAFF } });

  const t10 = clipAt('scene3', PRE3, 's10');   // "አንበሳን በትዕግስት አስተካከልሽው"
  const t11 = clipAt('scene3', PRE3, 's11');   // "ባልሽ አንበሳ አይደለም"
  const t12 = clipAt('scene3', PRE3, 's12');   // "ትዕግስት ከኃይል ይበልጣል"

  // hold on the whiskers first, then cut wide for the two of them
  cam.cut({ x: 1150, y: 700, z: 1.55 }, 0);
  cam.cut({ x: 780, y: 520, z: 1.12 }, Math.max(.6, t10 + .2));

  sfx('scene3', .2, 'room', .45);
  sfx('scene3', t11, 'wind', .3);

  stopClock(D, (q, f) => {
    cam.apply(q, f);
    cam.show('cloth', true);
    wife.pose({ x: 560, y: 800, s: 1, look: .55,
      mouth: lips(q, 'scene3', PRE3, 's12'),
      brow: q > t11 ? -.25 : .1,
      shut: blinking(q, [2.6, 7.4]) }, f);
    elder.pose({ x: 900, y: 806, s: 1.03, look: -.5,
      mouth: lips(q, 'scene3', PRE3, 's10', 's11'),
      brow: q > t11 ? .4 : .1,
      armR: q > t11 ? 20 : 8,
      shut: blinking(q, [4.8]) }, f);
  });
}
