/* ትእይንት አንድ — ጎጆው ውስጥ፦ ሴቲቱ ቅሬታዋን ትናገራለች፣ አረጋዊው መፍትሔ ይሰጣል።
   scene one: inside the hut. The wife complains; the elder gives her the impossible task.
   One scene = one beat = a pure function of the beat clock q. */
'use strict';
const PRE1 = .8;                       // picture before the first word

function scene1(p, D) {
  const cam = paperCam(p, 'hut');
  cam.cut({ x: 800, y: 470, z: 1 }, 0).to({ x: 740, y: 500, z: 1.16 }, 1.4, 15);
  const wife = womanPuppet(cam.stage, { coat: '#b8563f', stripe: '#f0d9a8', pants: '#7a3a2c', skin: '#e8bb92',
    holds: { basket: BASKET } });
  const elder = elderPuppet(cam.stage, { coat: '#5d6b4a', stripe: '#e8e0c8', pants: '#4a4436', skin: '#d8a878',
    holds: { staff: STAFF } });

  const t3 = clipAt('scene1', PRE1, 's03');   // "ቃሉ እንደ እሳት ያቃጥላል"
  const t4 = clipAt('scene1', PRE1, 's04');   // "ሶስት የአንበሳ ጢስ አምጪልኝ"
  const t5 = clipAt('scene1', PRE1, 's05');   // "የአንበሳ ጢስ? እንዴት?"

  sfx('scene1', .25, 'room', .5);
  sfx('scene1', .7, 'wind', .45);            // the wind outside, under the whole scene

  stopClock(D, (q, f) => {
    cam.apply(q, f);
    cam.show('cloth', false);
    wife.pose({ x: 545, y: 800, s: 1, look: .55,
      mouth: lips(q, 'scene1', PRE1, 's03', 's05'),
      brow: q > t3 ? -.55 : 0,
      lean: q > t3 ? -2.5 : 0,
      shut: blinking(q, [2.2, 9.6, 15.1]) }, f);
    elder.pose({ x: 905, y: 806, s: 1.03, look: -.5,
      mouth: lips(q, 'scene1', PRE1, 's04'),
      brow: q > t4 ? .35 : 0,
      armR: q > t4 ? 16 : 0,
      shut: blinking(q, [4.3, 12.4]) }, f);
  });
}
