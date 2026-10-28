/* lion.js — the lion, drawn in profile as a paper puppet, in the same idiom as cast.js.
 *
 * A lion is not a person with a cat head: the read comes from the MANE (a scalloped ring,
 * drawn behind the face), the JAW (a separate piece hinged at the back, so it opens) and the
 * TAIL (a lazy curve with a tuft). Everything else is paper.
 *
 *   const lion = lionPuppet(cam.stage, { coat: '#d8a24a', mane: '#8a5a24' });
 *   lion.pose({ x, y, s, jaw: 0..1, look: -1..1, tilt: deg, shut: bool, sway: 0..1, bob, face: 1|-1 }, f);
 *
 * `jaw` is the mouth opening: 0 shut, 1 wide. `face` -1 mirrors the lion so it looks left.
 * Feet sit at y = 0 and the body stands up into negative y, like every puppet in the kit.
 */
'use strict';

const LION_DEFS = `<defs>
  <radialGradient id="lionShadow" cx="50%" cy="50%" r="50%">
    <stop offset="0%" stop-color="#2a1608" stop-opacity=".34"/>
    <stop offset="100%" stop-color="#2a1608" stop-opacity="0"/>
  </radialGradient>
</defs>`;

// one leg: a paper column with a paw that sits flat on the ground
const lionLeg = (x, far) => `<g data-p="leg${far ? 'B' : 'F'}" transform="translate(${x},0)">
  <g filter="url(#paper)">
    <rect x="-13" y="-64" width="26" height="64" rx="9" fill="var(--lion-leg)"/>
    <ellipse cx="2" cy="-7" rx="19" ry="10" fill="var(--lion-paw)"/>
    <path d="M-6,-4 v6 M2,-4 v6 M10,-4 v6" stroke="#00000028" stroke-width="2.2"/>
  </g></g>`;

function lionPuppet(parent, {
  coat = '#d8a24a', mane = '#8a5a24', paw = '#c99441', leg = '#c08a3a',
  nose = '#3a2418', eye = '#f0c04a', ink = '#241a12',
} = {}) {
  const g = mk('g', {}, parent);
  g.style.setProperty('--lion-leg', leg);
  g.style.setProperty('--lion-paw', paw);

  // the mane: two rings of scallops, the inner darker, so it reads as depth not a halo
  const scallop = (r, n, fill, op = 1) => Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2, cx = Math.cos(a) * r, cy = Math.sin(a) * r;
    return `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${(r * .34).toFixed(1)}" fill="${fill}" opacity="${op}"/>`;
  }).join('');
  const maneSvg = `<g data-p="mane"><g filter="url(#paperBig)"><circle r="74" fill="${mane}"/>
      ${scallop(66, 13, mane)}${scallop(66, 13, '#a06b2c', .45)}
      <circle r="46" fill="${mane}"/></g></g>`;

  // the head, in profile facing right: skull, muzzle, nose, chin, ear
  const headSvg = `<g data-p="head">
    <g filter="url(#paper)">
      <path d="M-30,-18 q-6,-58 34,-66 q44,-9 58,20 q10,20 4,32 l-16,2 q2,-14 -10,-18 l-2,20 q-18,10 -34,6 z" fill="${coat}"/>
      <ellipse cx="52" cy="-6" rx="34" ry="24" fill="${coat}"/>
      <path d="M78,-16 q16,2 18,10 q-4,8 -18,8 z" fill="${coat}"/>
      ${[[84, -14], [92, -12], [84, -2]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.7" fill="${ink}" opacity=".5"/>`).join('')}
      <path d="M70,-2 q-6,6 -14,4" stroke="${ink}" stroke-width="2.6" fill="none" opacity=".55"/>
      <ellipse cx="86" cy="-14" rx="11" ry="8" fill="${nose}"/>
      <path d="M-16,-70 q6,-26 30,-24 q-6,18 -12,24 z" fill="${coat}"/>
      <ellipse cx="8" cy="-84" rx="15" ry="13" fill="#e8b96a"/>
    </g>
    <g data-p="eyeW"><circle cx="34" cy="-40" r="12" fill="#fff8e6"/></g>
    <g data-p="pupil"><circle cx="37" cy="-40" r="6.4" fill="${eye}"/><circle cx="38.4" cy="-40" r="2.6" fill="${ink}"/></g>
    <g data-p="lid"><rect x="20" y="-54" width="30" height="15" fill="${coat}"/>
      <path d="M21,-40 h27" stroke="${ink}" stroke-width="2.6" stroke-linecap="round"/></g>
    <g data-p="whisk"><g filter="url(#paper)">
      <path d="M96,-8 l30,-6 M96,-3 l32,2 M94,-12 l28,-14" stroke="#f7efdc" stroke-width="1.6" fill="none" opacity=".85"/></g></g>
  </g>`;

  // the jaw: hinged at the back of the muzzle, so opening it drops the chin and shows the tongue
  const jawSvg = `<g data-p="jaw">
    <g filter="url(#paper)">
      <path d="M18,10 q40,16 76,4 q10,-3 8,6 q-2,10 -16,12 q-40,6 -70,-4 z" fill="${coat}"/>
      <path d="M30,16 q26,10 56,4" stroke="#a6702a" stroke-width="3" fill="none"/>
      <path d="M34,12 q18,8 40,3" stroke="${ink}" stroke-width="2" fill="none" opacity=".35"/>
      <path d="M56,14 q10,-2 16,4 q-8,8 -18,2 z" fill="#c2564d" opacity=".9"/>
      ${[34, 44, 54].map(x => `<path d="M${x},10 l3,7 l4,-7 z" fill="#fff8e6"/>`).join('')}
    </g></g>`;

  const tailSvg = `<g data-p="tail"><g filter="url(#paper)">
      <path d="M-96,-118 q-46,-14 -58,-52 q-6,-18 8,-22" stroke="${coat}" stroke-width="17" fill="none" stroke-linecap="round"/>
    </g>
    <g data-p="tuft"><g filter="url(#paper)"><path d="M-146,-200 q-10,-26 6,-34 q16,8 12,30 z" fill="${mane}"/></g></g></g>`;

  g.innerHTML = `${LION_DEFS}
    <ellipse data-p="shadow" cx="0" cy="-2" rx="150" ry="22" fill="url(#lionShadow)"/>
    <g data-p="all">
      <g data-p="legsB">${lionLeg(-72, true)}${lionLeg(58, true)}</g>
      <g data-p="tailWrap">${tailSvg}</g>
      <g data-p="body"><g filter="url(#paperBig)">
        <path d="M-104,-70 q6,-58 74,-66 q78,-8 92,44 q6,32 -10,52 q-40,20 -96,8 q-48,-8 -60,-38 z" fill="${coat}"/>
        <path d="M-30,-118 q26,-10 58,-4" stroke="#b8802c" stroke-width="4" fill="none" opacity=".6"/>
      </g></g>
      <g data-p="legsF">${lionLeg(70, false)}${lionLeg(-40, false)}</g>
      <g data-p="headWrap" transform="translate(52,-132)">
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
      // head: tilt and a small turn (the profile slides a little, never the whole body)
      tf(P.headWrap, `translate(${52 + o.look * 8},${-132}) rotate(${o.tilt},0,10)`);
      // jaw opens around a hinge at the back of the muzzle
      tf(P.jaw, `translate(0,${(o.jaw * 2).toFixed(1)}) rotate(${(o.jaw * 15).toFixed(1)},18,10)`);
      // the lid drops on a blink
      vis(P.lid, o.shut);
      tf(P.pupil, `translate(${o.look * 3},0)`);
      // tail: a slow lazy sway, the tuft lagging behind it
      tf(P.tailWrap, `rotate(${(o.sway * 6).toFixed(1)},-96,-118)`);
      tf(P.tuft, `rotate(${(o.sway * 14).toFixed(1)},-140,-206)`);
    },
  };
}
