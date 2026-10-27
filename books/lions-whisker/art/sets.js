// Paper sets for "የአንበሳው ጢስ" — hut interior, and the bush at dusk.
// Sketches only: bake with  python3 SKILL/scripts/bake_sets.py books/lions-whisker/art/sets.js site/lions-whisker
const DEFS = `<defs>
  <filter id="paper" x="-15%" y="-15%" width="130%" height="135%" color-interpolation-filters="sRGB">
    <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="3" result="warp"/>
    <feDisplacementMap in="SourceGraphic" in2="warp" scale="3.5" xChannelSelector="R" yChannelSelector="G" result="cut"/>
    <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" seed="7" result="fib"/>
    <feColorMatrix in="fib" type="matrix" values="0 0 0 0 .25  0 0 0 0 .17  0 0 0 0 .08  .5 0 0 0 -.14" result="tint"/>
    <feComposite in="tint" in2="cut" operator="in" result="grain"/>
    <feMerge result="tex"><feMergeNode in="cut"/><feMergeNode in="grain"/></feMerge>
    <feDropShadow in="tex" dx="2.5" dy="3.5" stdDeviation="2.2" flood-color="#2a1608" flood-opacity=".38"/>
  </filter>
  <filter id="paperBig" x="-5%" y="-10%" width="110%" height="125%" color-interpolation-filters="sRGB">
    <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="5" result="warp"/>
    <feDisplacementMap in="SourceGraphic" in2="warp" scale="5" xChannelSelector="R" yChannelSelector="G" result="cut"/>
    <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" seed="11" result="fib"/>
    <feColorMatrix in="fib" type="matrix" values="0 0 0 0 .25  0 0 0 0 .17  0 0 0 0 .08  .5 0 0 0 -.15" result="tint"/>
    <feComposite in="tint" in2="cut" operator="in" result="grain"/>
    <feMerge result="tex"><feMergeNode in="cut"/><feMergeNode in="grain"/></feMerge>
    <feDropShadow in="tex" dx="4" dy="6" stdDeviation="5" flood-color="#2a1608" flood-opacity=".32"/>
  </filter>
</defs>`;
const P = (body, f = 'paper') => `<g filter="url(#${f})">${body}</g>`;
// a woven basket hanging on the wall, and a row of clay pots on a shelf
const pots = (x, y) => P(`<rect x="${x}" y="${y}" width="230" height="14" rx="4" fill="#7a5334"/>
  <path d="M${x + 20},${y} q-14,-40 16,-42 q30,2 16,42 Z" fill="#a8563c"/>
  <path d="M${x + 80},${y} q-18,-52 22,-54 q40,2 22,54 Z" fill="#8d6a45"/>
  <path d="M${x + 158},${y} q-12,-34 14,-36 q26,2 14,36 Z" fill="#c07a4e"/>`);

// ---- the hut: a round wall of mud plaster, one small window on the evening, a hide on the floor
function hut() {
  const wall = P(`<rect x="-100" y="-60" width="1800" height="820" fill="#e6cfa4"/>`, 'paperBig')
    + P(`<g stroke="#d4b98a" stroke-width="5" opacity=".55">
         ${Array.from({ length: 9 }, (_, i) => `<path d="M${-60 + i * 200},-60 q-12,420 8,820"/>`).join('')}
         <path d="M-100,300 q900,26 1800,-10"/><path d="M-100,520 q900,22 1800,-14"/></g>`)
    + P(`<rect x="1080" y="170" width="250" height="270" fill="#4d5a86"/>
         <circle cx="1270" cy="212" r="26" fill="#f2e3b8" opacity=".9"/>
         <path d="M1080,440 q60,-70 120,0 q70,-90 130,0 Z" fill="#2f3a5c"/>
         <path d="M1066,158 h278 v296 h-278 Z" fill="none" stroke="#8a6239" stroke-width="14"/>`)
    + P(`<path d="M300,120 q44,-26 88,0 v86 q-44,26 -88,0 Z" fill="#b98b52"/><path d="M300,150 q44,-22 88,0 M300,178 q44,-22 88,0" stroke="#8a6239" stroke-width="5" fill="none"/>`)
    + pots(330, 620);
  const floor = P(`<rect x="-100" y="690" width="1800" height="330" fill="#b08150"/>${Array.from({ length: 9 }, (_, i) => `<path d="M-100,${726 + i * 34} h1800" stroke="#9c6f42" stroke-width="3"/>`).join('')}
    <path d="M420,806 q260,-58 520,0 q-260,54 -520,0 Z" fill="#8e5a3a" opacity=".75"/>`, 'paperBig');
  // in front of the puppets: a low stool, and later the white cloth with the three whiskers on it
  const stool = P(`<rect x="980" y="700" width="330" height="26" rx="8" fill="#8a5a36"/>
    <rect x="1010" y="726" width="22" height="120" fill="#7a4d2e"/><rect x="1258" y="726" width="22" height="120" fill="#7a4d2e"/>`);
  const cloth = P(`<path d="M1020,700 q150,-24 300,0 q-150,26 -300,0 Z" fill="#f6f1e4"/>
    <g stroke="#3b2a1c" stroke-width="4" stroke-linecap="round">
      <path d="M1090,694 q26,-14 50,-4"/><path d="M1104,700 q22,-12 44,-2"/><path d="M1178,692 q26,-12 48,-2"/></g>`);
  return [
    { name: 'wall', k: .85, box: [-100, -60, 1800, 820], scale: 1.2, svg: wall },
    { name: 'floor', k: 1, box: [-100, 690, 1800, 330], scale: 1.2, svg: floor },
    { name: 'stool', k: 1, box: [960, 660, 380, 200], scale: 1.5, soft: false, svg: stool },
    { name: 'cloth', k: 1, box: [1000, 660, 340, 80], scale: 1.5, soft: false, svg: cloth },
  ];
}

// ---- the bush at dusk: the lion is never seen, only heard, and its eyes come on in the dark
function bush() {
  const sky = P(`<rect x="-100" y="-60" width="1800" height="900" fill="#2b2f52"/>
    <rect x="-100" y="-60" width="1800" height="330" fill="#3b3360"/>
    <circle cx="1240" cy="180" r="64" fill="#f0c98a" opacity=".85"/>
    <circle cx="1240" cy="180" r="120" fill="#f0c98a" opacity=".12"/>`, 'paperBig');
  const hills = P(`<path d="M-100,560 q220,-150 460,-30 q120,60 260,-40 q200,-140 440,20 q160,110 340,-10 L1700,700 L-100,700 Z" fill="#4a3a56"/>
    <path d="M-100,620 q260,-96 520,10 q220,86 480,-20 q240,-96 500,30 L1700,760 L-100,760 Z" fill="#3d2f47" opacity=".9"/>`);
  const trees = P(`<g fill="#241d2c">
      <path d="M150,640 v-190 M150,450 l-62,-46 M150,470 l58,-52 M150,510 l-50,-40"/><path d="M150,450 q-70,-58 -2,-92 q72,34 2,92 Z"/>
      <path d="M1450,650 v-230 M1450,420 l-70,-52 M1450,450 l64,-58"/><path d="M1450,420 q-84,-70 -2,-104 q84,38 2,104 Z"/>
      <path d="M820,600 v-140 M820,460 l-48,-38 M820,480 l44,-40"/><path d="M820,460 q-56,-52 -2,-78 q58,28 2,78 Z"/></g>
    <g stroke="#241d2c" stroke-width="18" stroke-linecap="round"><path d="M150,640 v-190"/><path d="M1450,650 v-230"/><path d="M820,600 v-140"/></g>`);
  const ground = P(`<rect x="-100" y="700" width="1800" height="320" fill="#6b5a3a"/>${Array.from({ length: 10 }, (_, i) => `<path d="M-100,${716 + i * 30} h1800" stroke="#5b4c31" stroke-width="3"/>`).join('')}
    <g stroke="#7d6b42" stroke-width="5" stroke-linecap="round">${Array.from({ length: 26 }, (_, i) => `<path d="M${-60 + i * 68},${900 - (i % 5) * 22} l${i % 2 ? 8 : -8},-34"/>`).join('')}</g>`, 'paperBig');
  // a wall of dark leaves across the lower half: the lion stands behind it
  const front = P(`<path d="M-100,900 L-100,740 q120,-90 250,-30 q130,-96 260,-16 q140,-92 280,-6 q150,-96 300,-10 q140,-84 280,4 q140,-70 270,18 q80,-40 160,10 L1700,900 Z" fill="#1b2a1d"/>
    <g fill="#243726">${Array.from({ length: 16 }, (_, i) => `<circle cx="${-20 + i * 112}" cy="${742 - (i % 3) * 26}" r="${44 + (i % 4) * 9}"/>`).join('')}</g>
    <g fill="#16211a" opacity=".8">${Array.from({ length: 12 }, (_, i) => `<circle cx="${30 + i * 148}" cy="${790 + (i % 2) * 16}" r="${52 + (i % 3) * 11}"/>`).join('')}</g>`);
  // the eyes: two amber lamps in the dark, turned on when the growl comes
  const eyes = `<g><ellipse cx="880" cy="676" rx="13" ry="9" fill="#f6d27a"/><ellipse cx="930" cy="676" rx="13" ry="9" fill="#f6d27a"/>
    <ellipse cx="880" cy="676" rx="26" ry="20" fill="#f6d27a" opacity=".16"/><ellipse cx="930" cy="676" rx="26" ry="20" fill="#f6d27a" opacity=".16"/>
    <ellipse cx="880" cy="676" rx="4" ry="9" fill="#241d10"/><ellipse cx="930" cy="676" rx="4" ry="9" fill="#241d10"/></g>`;
  return [
    { name: 'sky', k: .6, box: [-100, -60, 1800, 900], scale: 1.1, svg: sky },
    { name: 'hills', k: .75, box: [-100, 380, 1800, 420], scale: 1.15, svg: hills },
    { name: 'trees', k: .88, box: [-100, 240, 1800, 520], scale: 1.2, svg: trees },
    { name: 'ground', k: 1, box: [-100, 690, 1800, 330], scale: 1.2, svg: ground },
    { name: 'front', k: 1.04, box: [-100, 620, 1800, 300], scale: 1.25, soft: false, svg: front },
    { name: 'eyes', k: 1.04, box: [820, 620, 180, 100], scale: 1.6, soft: false, svg: eyes },
  ];
}

const SETS = { hut, bush };
if (typeof window !== 'undefined') window.SETS = SETS, window.SET_DEFS = DEFS;
