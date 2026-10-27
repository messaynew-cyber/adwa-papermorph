/* The cast of "የአንበሳው ጢስ", built on the kit's own rig (lib/cast.js, spKid) rather than a fork of it.
   Two grown-ups: a wife in a cream netela with a tibeb band, and an old man with a white beard and a staff.
   Load this AFTER lib/cast.js. */
'use strict';

const SHAPES2 = {
  // a grown woman: longer body, dress that flares, headscarf with the coloured border of a netela
  woman: {
    sx: 50, sy: -200, hipX: 20, legW: 30, shoe: 22, legH: 84, armH: 92,
    body: 'M-46,-214 C-64,-198 -76,-140 -70,-6 Q-34,8 0,8 Q34,8 70,-6 C76,-140 64,-198 46,-214 Z',
    head: [0, -306, 92, 88], neck: -212, eyes: [22, -314, 19, 24], mouth: [0, -258],
    cheeks: [46, -292], slide: 26, glasses: 0,
    hair: ['#cfc3ae', 'M-94,-316 C-98,-384 -58,-402 0,-402 C58,-402 98,-384 94,-316 L74,-338 Q0,-354 -74,-338 Z'],
    hat: `<path d="M-92,-330 q92,-26 184,0 l0,-16 q-92,-26 -184,0 Z" fill="#8d2f3a"/>
          <path d="M-92,-338 q92,-24 184,0 l0,-6 q-92,-24 -184,0 Z" fill="#d8a13c"/>
          <path d="M-86,-316 q-6,44 10,66 l-26,4 q-14,-40 -6,-74 Z" fill="#cfc3ae"/>
          <path d="M86,-316 q6,44 -10,66 l26,4 q14,-40 6,-74 Z" fill="#cfc3ae"/>`,
  },
  // an old man: stooped shoulders, white hair and a beard that hangs to the chest, a staff in his right hand
  elder: {
    sx: 56, sy: -204, hipX: 22, legW: 30, shoe: 24, legH: 86, armH: 96,
    body: 'M-52,-216 C-70,-200 -78,-140 -70,-6 Q-34,8 0,8 Q34,8 70,-6 C78,-140 70,-200 52,-216 Z',
    head: [0, -310, 94, 90], neck: -216, eyes: [22, -318, 18, 23], mouth: [0, -262],
    browUp: 16, slide: 24, glasses: 0,
    hair: ['#e6e1d6', 'M-96,-320 C-100,-390 -58,-408 0,-408 C58,-408 100,-390 96,-320 L76,-342 Q0,-358 -76,-342 Z'],
    hat: `<path d="M-36,-246 Q0,-238 36,-246 Q32,-192 0,-174 Q-32,-192 -36,-246 Z" fill="#e6e1d6"/>
          <path d="M-20,-244 Q0,-240 20,-244" stroke="#c9c2b4" stroke-width="3" fill="none"/>`,
  },
};

const womanPuppet = (p, o) => spKid(p, SHAPES2.woman, o);
const elderPuppet = (p, o) => spKid(p, SHAPES2.elder, o);

// a staff: a long straight stick, drawn in the hand
const STAFF = `<g transform="translate(0,-40)"><path d="M0,150 V-70" stroke="#6b4a2b" stroke-width="11" stroke-linecap="round"/>
  <path d="M0,-70 q10,-14 22,-6" stroke="#6b4a2b" stroke-width="9" fill="none" stroke-linecap="round"/></g>`;
// a flat basket with meat in it, carried at the hip
const BASKET = `<g transform="translate(6,10)"><path d="M-40,0 q40,-16 80,0 q-6,40 -40,44 q-34,-4 -40,-44 Z" fill="#b98b52"/>
  <path d="M-38,4 q38,-14 76,0" stroke="#8a6239" stroke-width="4" fill="none"/>
  <ellipse cx="0" cy="2" rx="26" ry="8" fill="#a34a3a"/></g>`;
