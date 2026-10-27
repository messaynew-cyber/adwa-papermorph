/* ትእይንት ሁለት — በጠቢቧ ቤት። ኤመቤት ተግባሩን ትሰጣለች፤ አስቴር ትጠይቃለች፤ ኤመቤት መልስ ትሰጣለች።
   s04 Emebet "ሦስት የአንበሳ ጢስ አምጪልኝ" · s05 Aster "እንዴት ቀርቤ…" · s06 Emebet "በትዕግስት። ቀስ በቀስ…" */
'use strict';
const PRE2 = .9;

function scene2(p, D) {
  const cam = paperCam(p, 'hut');
  cam.cut({ x: 800, y: 480, z: 1.06 }, 0).to({ x: 820, y: 500, z: 1.2 }, 2.2, 6.5);
  const aster = asterPuppet(cam.stage, { coat: '#b8563f', stripe: '#f0d9a8', pants: '#7a3a2c', skin: '#e8bb92' });
  const emebet = emebetPuppet(cam.stage, { coat: '#55604e', stripe: '#e8e0c8', pants: '#44403a', skin: '#d8a878',
    holds: { staff: STAFF } });

  const t4 = clipAt('scene2', PRE2, 's04');
  const t5 = clipAt('scene2', PRE2, 's05');
  const t6 = clipAt('scene2', PRE2, 's06');

  sfx('scene2', .2, 'room', .45);

  stopClock(D, (q, f) => {
    cam.apply(q, f);
    cam.show('cloth', false);
    aster.pose({ x: 1055, y: 800, s: 1, look: -.55,
      mouth: lips(q, 'scene2', PRE2, 's05'),
      brow: q > t5 - .3 ? -.5 : .1,
      lean: q > t5 - .3 && q < t6 ? -2.5 : 0,
      armL: q > t5 - .3 && q < t6 ? 14 : 0,
      shut: blinking(q, [3.1, 8.2]) }, f);
    emebet.pose({ x: 640, y: 806, s: 1, look: .5,
      mouth: lips(q, 'scene2', PRE2, 's04', 's06'),
      brow: q > t6 ? .35 : .05,
      armR: q > t6 ? 18 : 6,
      shut: blinking(q, [2.4, 6.9]) }, f);
  });
}
