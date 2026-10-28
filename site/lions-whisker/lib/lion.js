/* lion.js — a lion in profile, drawn in paper, in the same idiom as cast.js.
 *
 * Three things make it read as a LION and not a big dog, in this order:
 *   1. the MUZZLE is short and blocky, with a stop between brow and nose and a wide nose pad
 *   2. the MANE leaves the head and joins the shoulder and chest, or it is just a hat
 *   3. the BODY has a deep chest, a tucked waist and a spine that dips — never a sausage
 *
 *   const lion = lionPuppet(cam.stage, { coat, mane });
 *   lion.pose({ x, y, s, jaw: 0..1, look, tilt, shut, sway, bob, face }, f);
 *
 * Feet sit at y = 0, the body stands into negative y, like every other puppet in the kit.
 */
'use strict';

const LION_DEFS = `<defs>
  <radialGradient id="lionShadow" cx="50%" cy="50%" r="50%">
    <stop offset="0%" stop-color="#2a1608" stop-opacity=".30"/>
    <stop offset="100%" stop-color="#2a1608" stop-opacity="0"/>
  </radialGradient>
</defs>`;

function lionPuppet(parent, {
  coat = '#d8a24a', mane = '#7d4f1e', maneLit = '#96622a', paw = '#c99441', leg = '#c08a3a',
  nose = '#2e1d12', eye = '#f2c246', ink = '#241a12',
} = {}) {
  const g = mk('g', {}, parent);
  g.style.setProperty('--lion-leg', leg);
  g.style.setProperty('--lion-paw', paw);

  /* ---- mane: irregular tufts sweeping back and down onto the shoulder, plus a chest mass ---- */
  const tuft = (a, r, w, h, cx, cy, fill, rot) =>
    `<ellipse cx="${cx}" cy="${cy}" rx="${w}" ry="${h}" fill="${fill}" transform="rotate(${rot} ${cx} ${cy})"/>`;
  const ring = (n, r0, r1, base, spread) => Array.from({ length: n }, (_, i) => {
    const t = i / (n - 1), a = (-spread / 2 + spread * t) * Math.PI / 180;
    const r = r0 + (r1 - r0) * (0.55 + 0.45 * Math.sin(i * 2.1)), cx = Math.cos(a) * r, cy = Math.sin(a) * r;
    return tuft(a, r, 30 + (i % 3) * 7, 30 + (i % 4) * 7, cx, cy, i % 2 ? base : maneLit, (a * 180 / Math.PI) + (i % 2 ? 90 : 62));
  }).join('');
  const maneSvg = `<g data-p="mane"><g filter="url(#paperBig)">
      ${ring(11, 74, 96, mane, 250)}
      <circle r="72" cx="4" cy="6" fill="${mane}"/>
      <path d="M-58,-6 q30,-54 84,-30 q16,10 6,40 q-24,44 -60,40 q-38,-4 -30,-50 z" fill="${maneLit}" opacity=".5"/>
      <path d="M-40,34 q46,26 92,4 q10,28 -16,42 q-46,20 -76,-12 z" fill="${mane}"/>
    </g></g>`;

  /* ---- head: short muzzle, a stop at the brow, wide nose pad, cheek fluff, almond eye ---- */
  const headSvg = `<g data-p="head">
    <g filter="url(#paper)">
      <path d="M-46,-16 q-14,-62 20,-84 q38,-24 76,-4 q22,12 26,34
               l6,-4 q14,6 16,20 l-14,10 q-6,14 -22,16
               l-6,-14 q-18,8 -40,4 q-30,-6 -46,-24 z" fill="${coat}"/>
      <path d="M-30,-4 q20,16 46,12 q-6,-16 -22,-22 q-18,-6 -24,10 z" fill="#e9bd72" opacity=".55"/>
      <path d="M26,-52 q18,-10 34,2 q-14,10 -34,4 z" fill="#c08a3a" opacity=".5"/>
      <path d="M62,-30 q16,4 22,14 q-4,10 -18,8 q-12,-4 -12,-14 z" fill="${nose}"/>
      <path d="M64,-30 q8,-4 16,0" stroke="#00000035" stroke-width="2" fill="none"/>
      <path d="M52,-8 q10,6 22,4" stroke="${ink}" stroke-width="2.4" fill="none" opacity=".6"/>
      <path d="M-6,-78 q10,-26 34,-22 q-2,20 -10,30 z" fill="${coat}"/>
      <ellipse cx="10" cy="-92" rx="15" ry="12" fill="#eec27c"/>
      <path d="M-16,-30 q-22,10 -26,34 q26,10 44,-6 q-12,-14 -6,-30 z" fill="${coat}"/>
      <path d="M-38,0 q-8,10 -2,18 q10,2 16,-8 z" fill="${coat}"/>
    </g>
    <g data-p="eyeW"><ellipse cx="36" cy="-50" rx="10.5" ry="6.6" fill="#f6e7c4"/></g>
    <g data-p="pupil"><ellipse cx="38" cy="-50" rx="3.4" ry="5" fill="${eye}"/><ellipse cx="38.6" cy="-50" rx="1.5" ry="4.2" fill="${ink}"/></g>
    <g data-p="lid"><rect x="21" y="-66" width="30" height="18" fill="${coat}"/>
      <path d="M26,-50 q10,5 21,0" stroke="${ink}" stroke-width="2.6" stroke-linecap="round" fill="none"/></g>
    <g data-p="fangs"><g filter="url(#paper)">
      <path d="M56,-4 l3,11 l4,-10 z" fill="#fff8e6"/><path d="M72,-6 l3,12 l4,-11 z" fill="#fff8e6"/></g></g>
  </g>`;

  /* ---- jaw: hinged at the back of the cheek; the dark interior gives the teeth a ground ---- */
  const jawSvg = `<g data-p="jaw">
    <g filter="url(#paper)">
      <path d="M4,4 q26,20 60,12 q12,-3 10,7 q-2,11 -18,12 q-44,5 -62,-12 z" fill="${coat}"/>
      <path d="M8,8 q28,18 56,11 q8,5 -3,9 q-34,7 -55,-9 z" fill="#8c2f2a" opacity=".85"/>
      <path d="M18,10 q30,16 62,10" stroke="${ink}" stroke-width="2" fill="none" opacity=".3"/>

    </g></g>`;

  /* ---- legs: thick, with a bend; near pair darker than far pair ---- */
  const frontLeg = (x, far) => `<g data-p="leg${far ? 'B' : 'F'}" transform="translate(${x},0)">
    <g filter="url(#paper)">
      <path d="M-20,-104 q-4,40 2,60 q2,10 6,12 l26,0 q6,-6 4,-18 q-8,-30 -6,-58 z" fill="${far ? '#a9772f' : leg}"/>
      <path d="M-14,-44 q16,6 30,0" stroke="#00000022" stroke-width="3" fill="none"/>
      <ellipse cx="2" cy="-9" rx="25" ry="12" fill="${far ? '#a9772f' : paw}"/>
      <path d="M-8,-4 v5 M2,-4 v5 M12,-4 v5" stroke="#00000030" stroke-width="2.4"/>
    </g></g>`;
  const hindLeg = (x, far) => `<g data-p="leg${far ? 'B' : 'F'}" transform="translate(${x},0)">
    <g filter="url(#paper)">
      <path d="M-26,-118 q-10,30 16,46 q14,8 8,26 q-6,20 4,34 l30,0 q6,-8 0,-18 q-14,-22 -6,-46 q8,-26 -12,-42 z" fill="${far ? '#a9772f' : leg}"/>
      <path d="M-12,-64 q18,10 30,4" stroke="#00000022" stroke-width="3" fill="none"/>
      <ellipse cx="6" cy="-9" rx="27" ry="12" fill="${far ? '#a9772f' : paw}"/>
      <path d="M-4,-4 v5 M6,-4 v5 M16,-4 v5" stroke="#00000030" stroke-width="2.4"/>
    </g></g>`;

  const tailSvg = `<g data-p="tail"><g filter="url(#paper)">
      <path d="M-118,-142 q-44,10 -56,-30 q-8,-26 4,-38" stroke="${coat}" stroke-width="26" fill="none" stroke-linecap="round"/>
      <path d="M-118,-142 q-44,10 -56,-30 q-8,-26 4,-38" stroke="#b8802c" stroke-width="6" fill="none" stroke-linecap="round" opacity=".35"/>
    </g>
    <g data-p="tuft"><g filter="url(#paper)">
      <path d="M-170,-206 q-8,-24 8,-34 q16,10 12,30 q-6,14 -20,4 z" fill="${mane}"/>
      <path d="M-176,-198 q-10,-10 -4,-22 q10,4 12,16 z" fill="${maneLit}" opacity=".8"/></g></g></g>`;

  g.innerHTML = `${LION_DEFS}
    <ellipse data-p="shadow" cx="0" cy="-2" rx="140" ry="20" fill="url(#lionShadow)"/>
    <g data-p="all">
      <g data-p="legsB">${hindLeg(-92, true)}${frontLeg(96, true)}</g>
      <g data-p="tailWrap">${tailSvg}</g>
      <g data-p="body"><g filter="url(#paperBig)">
        <path d="M-118,-150 q58,-34 132,-22 q56,10 66,44 q8,28 -12,40
                 q-26,12 -68,6 q-56,-8 -84,-26 q-30,-18 -34,-42 z" fill="${coat}"/>
        <path d="M-104,-96 q40,18 96,16 q-30,20 -66,14 q-24,-4 -30,-30 z" fill="#b8802c" opacity=".28"/>
        <path d="M-40,-158 q40,-10 84,-2" stroke="#b8802c" stroke-width="4" fill="none" opacity=".45"/>
      </g></g>
      <g data-p="legsF">${hindLeg(-78, false)}${frontLeg(104, false)}</g>
      <g data-p="headWrap" transform="translate(96,-186)">
        ${maneSvg}${headSvg}${jawSvg}
      </g>
    </g>`;

  bakeAll(g);
  const P = pieces(g);

  return {
    g,
    pose(o, f = 0) {
      o = { x: 0, y: 0, s: 1, jaw: 0, look: 0, tilt: 0, shut: false, sway: 0, bob: 0, face: 1, ...o };
      const j = k => .4 * jit(f >> 1, k);
      const flip = o.face < 0 ? -1 : 1;
      tf(g, `translate(${(o.x + j(1) * .8).toFixed(1)},${(o.y + j(2) * .7 + o.bob).toFixed(1)}) scale(${(o.s * flip).toFixed(3)},${o.s})`);
      tf(P.shadow, `scale(${(1 - Math.max(0, -o.bob) * .004).toFixed(3)},1)`);
      tf(P.headWrap, `translate(${96 + o.look * 9},${-186}) rotate(${o.tilt},-30,10)`);
      tf(P.jaw, `translate(0,${(o.jaw * 3).toFixed(1)}) rotate(${(o.jaw * 17).toFixed(1)},4,4)`);
      vis(P.lid, o.shut);
      vis(P.fangs, o.jaw > .12);
      tf(P.pupil, `translate(${o.look * 3.4},${o.shut ? 1 : 0})`);
      tf(P.tailWrap, `rotate(${(o.sway * 7).toFixed(1)},-118,-142)`);
      tf(P.tuft, `rotate(${(o.sway * 16).toFixed(1)},-162,-206)`);
    },
  };
}
