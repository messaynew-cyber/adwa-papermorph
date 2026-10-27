/* The cast of "የአንበሳው ጢስ", built on the kit's own rig (lib/cast.js, spKid) rather than a fork of it.
   Aster, the wife: cream netela with a red tibeb band, a flat basket at the hip.
   Emebet, the wise old woman: hunched, white shawl over the head, a stick in her right hand.
   Load this AFTER lib/cast.js. */
'use strict';

const SHAPES2 = {
  aster: {
    sx: 50, sy: -200, hipX: 20, legW: 30, shoe: 22, legH: 84, armH: 92,
    body: 'M-46,-214 C-64,-198 -76,-140 -70,-6 Q-34,8 0,8 Q34,8 70,-6 C76,-140 64,-198 46,-214 Z',
    head: [0, -306, 92, 88], neck: -212, eyes: [22, -314, 19, 24], mouth: [0, -258],
    cheeks: [46, -292], slide: 26, glasses: 0,
    hair: ['#cfc3ae', 'M-94,-316 C-98,-384 -58,-402 0,-402 C58,-402 98,-384 94,-316 L74,-338 Q0,-354 -74,-338 Z'],
    hat: `<path d="M-92,-330 q92,-26 184,0 l0,-16 q-92,-26 -184,0 Z" fill="#8d2f3a"/>
          <path d="M-92,-338 q92,-24 184,0 l0,-6 q-92,-24 -184,0 Z" fill="#d8a13c"/>
          <path d="M-86,-316 q-6,44 10,66 l-26,4 q-14,-40 -6,-74 Z" fill="#cfc3ae"/>
          <path d="M86,-316 q6,44 -10,66 l26,4 q14,-40 6,-74 Z" fill="#e8e2d4"/>`,
  },
  // an old woman: shorter, stooped shoulders, a white shawl drawn over her head, and a lined face
  emebet: {
    sx: 52, sy: -188, hipX: 20, legW: 28, shoe: 21, legH: 74, armH: 84,
    body: 'M-52,-202 C-68,-188 -76,-134 -68,-6 Q-32,8 0,8 Q32,8 68,-6 C76,-134 68,-188 52,-202 Z',
    head: [0, -288, 88, 84], neck: -200, eyes: [21, -296, 17, 22], mouth: [0, -244],
    cheeks: null, browUp: 14, slide: 22, glasses: 0,
    hair: ['#f2eee4', 'M-90,-298 C-94,-360 -56,-378 0,-378 C56,-378 94,-360 90,-298 L70,-320 Q0,-336 -70,-320 Z'],
    hat: `<path d="M-88,-300 q88,-24 176,0 q-4,30 -18,40 l-30,-6 q-40,-10 -80,0 l-30,6 q-14,-10 -18,-40 Z" fill="#f2eee4"/>
          <path d="M-64,-262 q64,14 128,0" stroke="#d8d2c6" stroke-width="3" fill="none"/>
          <path d="M-30,-252 q30,10 60,0" stroke="#d8d2c6" stroke-width="2.5" fill="none"/>`,
  },
};

const asterPuppet = (p, o) => spKid(p, SHAPES2.aster, o);
const emebetPuppet = (p, o) => spKid(p, SHAPES2.emebet, o);

// a stick, drawn in the hand
const STAFF = `<g transform="translate(0,-40)"><path d="M0,150 V-70" stroke="#6b4a2b" stroke-width="11" stroke-linecap="round"/>
  <path d="M0,-70 q10,-14 22,-6" stroke="#6b4a2b" stroke-width="9" fill="none" stroke-linecap="round"/></g>`;
// a flat basket with a piece of meat in it, carried at the hip
const BASKET = `<g transform="translate(6,10)"><path d="M-40,0 q40,-16 80,0 q-6,40 -40,44 q-34,-4 -40,-44 Z" fill="#b98b52"/>
  <path d="M-38,4 q38,-14 76,0" stroke="#8a6239" stroke-width="4" fill="none"/>
  <ellipse cx="0" cy="2" rx="26" ry="8" fill="#a34a3a"/></g>`;
// three whiskers held in the hand: the end of the errand
const WHISKERS = `<g transform="translate(0,-6)"><path d="M-6,10 q-10,-24 -22,-34 M0,10 q0,-26 4,-40 M6,10 q10,-22 22,-32"
  stroke="#3b2a1c" stroke-width="3.4" fill="none" stroke-linecap="round"/></g>`;
