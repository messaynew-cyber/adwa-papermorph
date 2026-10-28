/* ትእይንት ሶስት — ጫካው። በየቀኑ ስጋ ታመጣለች፤ አንበሳው ይታመናል፤ ጢሶቹን ትወስዳለች።
   Scene three — the bush. She brings meat every day; the lion comes to trust her; she takes the whiskers.

   The lion IS shown now (lion.js). It starts far right, in profile facing her, low and wary; the growl
   lifts its head and opens its jaw; by s08 the jaw is shut, the head is down and it lets her reach in.
   s07 narrator "በየቀኑ ስጋ…" · s08 narrator "ከሳምንታት በኋላ… ወሰደች" · s09 Emebet "አንበሳን በትዕግስት…" */
'use strict';
const PRE3 = 1.2;

function scene3(p, D) {
  const cam = paperCam(p, 'bush');
  const aster = asterPuppet(cam.stage, { coat: '#b8563f', stripe: '#f0d9a8', pants: '#7a3a2c', skin: '#e8bb92',
    holds: { basket: BASKET } });
  const lion = lionPuppet(cam.stage, {});

  const t7 = clipAt('scene3', PRE3, 's07');   // the daily meat
  const t8 = clipAt('scene3', PRE3, 's08');   // after months: the whiskers
  const t9 = clipAt('scene3', PRE3, 's09');   // Emebet's voice over the ending
  const growlAt = t7 + .5;
  const trustAt = t8 - 1.2;                   // it settles before she reaches

  sfx('scene3', .2, 'crickets', .42);
  sfx('scene3', .4, 'wind', .5);
  sfx('scene3', growlAt, 'growl', .85);
  cam.shake(growlAt, .7, 8);
  cam.show('eyes', false);              // the lion is on screen now; the disembodied eyes only stole focus

  // wide while she walks in, then a slow push to her hand as the whiskers come away
  cam.cut({ x: 830, y: 520, z: 1.06 }, 0).to({ x: 860, y: 600, z: 1.42 }, Math.max(.5, t8 - 1.4), 4.5);

  const STEP = 2 / 3, walkEnd = t7 + .5, steps = Math.max(0, Math.floor((walkEnd - .4) / STEP)), far = spStep(steps * STEP).d;

  stopClock(D, (q, f) => {
    const w = spStep(Math.min(Math.floor(q * 6) / 6, steps * STEP));
    const moving = q < steps * STEP;
    cam.apply(q, f);

    // the lion: wary and low, then it lifts its head on the growl and settles once she is trusted
    const breathe = Math.sin(q * 1.9) * 2.2;                       // it is alive even when nothing happens
    const settled = span(q, trustAt, trustAt + 1.6);             // 0 wary → 1 settled
    lion.pose({
      x: 1075 - 40 * settled,                                      // it comes a little closer as trust grows
      y: 818, s: 1.06, face: -1,                                   // in profile, facing her
      bob: breathe, sway: Math.sin(q * .7) * .8,
      tilt: q >= growlAt ? -8 + 10 * settled : 6 - 4 * settled,    // head down, up on the growl, down again
      jaw: q >= growlAt && q < growlAt + 1.1 ? Math.min(1, (q - growlAt) / .25) * (1 - Math.max(0, (q - growlAt - .75) / .35)) : .06,
      look: -.85,                                         // eyes toward her
      shut: blinking(q, [2.7, 6.4, 11.2]),
    }, f);

    aster.pose({ x: 700 + .92 * (far - w.d), y: 818, s: 1.02, look: .92,
      mouth: 'X',                                     // every line in this scene is narration or voice-over
      brow: q >= growlAt ? -.55 : .15,
      lean: q >= t8 ? -3 : (q >= growlAt ? -1.5 : 0),
      legL: moving ? w.legL : 0, legR: moving ? w.legR : 0, bob: moving ? w.drop : 0,
      armL: q >= t8 ? 30 : (q >= growlAt ? 12 : 0),    // reaching in for the three whiskers
      shut: blinking(q, [3.6, 9.1]) }, f);
  });
}
