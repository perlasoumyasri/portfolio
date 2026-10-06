/* global React */
// ─────────────────────────────────────────────────────────────────────────
//  UX Pokémon · v2 — the visual substrate of the collectible.
//  Per-type "character" config, generative geometric AURAS (no single icon),
//  guilloché security-foil rosettes, and the patterned card BACK (teasers).
//  Everything is built from primitives — circles, lines, arcs, polygons —
//  arranged generatively. No illustration, no single stamped symbol.
// ─────────────────────────────────────────────────────────────────────────

// Extra per-type "character": each creature gets a distinct geometric motif,
// a metallic shine for its name, an element identity and a specimen number.
const PK2_CFG = {
  EYE:   { motif:'lens',     shine:['#7FD8C8','#2F7E72','#0F362F'], element:'PERCEPTION', num:'001', hp:'58' },
  HEART: { motif:'ripple',   shine:['#F4A7B0','#D14B5B','#5E1822'], element:'EMPATHY',    num:'002', hp:'62' },
  BRAIN: { motif:'synapse',  shine:['#9F9DE0','#4B49A6','#1C1B45'], element:'INQUIRY',     num:'003', hp:'55' },
  HAND:  { motif:'assembly', shine:['#F3A86E','#E0611D','#6B2806'], element:'CRAFT',       num:'004', hp:'64' },
  FACE:  { motif:'broadcast',shine:['#C99BDD','#9A4DB8','#411C56'], element:'STORY',       num:'005', hp:'60' },
};

const deg = (d) => (d * Math.PI) / 180;
const onCircle = (cx, cy, r, a) => [cx + Math.cos(deg(a)) * r, cy + Math.sin(deg(a)) * r];

// ── Guilloché rosette ──────────────────────────────────────────────────────
// Many rotated ellipses → a moiré flower. Pure banknote / holo-foil texture.
function Guilloche({ size = 240, color = '#fff', petals = 30, rx = 0.46, ry = 0.18, opacity = 0.5, strokeWidth = 0.6 }) {
  const c = size / 2;
  const R = size * rx, r2 = size * ry;
  const rings = [];
  for (let i = 0; i < petals; i++) {
    rings.push(<ellipse key={i} cx={c} cy={c} rx={R} ry={r2} transform={`rotate(${(i * 360) / petals} ${c} ${c})`} fill="none" stroke={color} strokeWidth={strokeWidth} />);
  }
  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} style={{ display: 'block', overflow: 'visible', opacity }} aria-hidden>
      {rings}
    </svg>
  );
}

// ── Aura — the generative "presence" of each creature ───────────────────────
// A radial geometric field unique to each type. Sits BEHIND the portrait.
function Aura({ type, color, deep, size = 260, opacity = 1, idle = false }) {
  const cfg = PK2_CFG[type] || PK2_CFG.EYE;
  const c = size / 2;
  const els = [];
  const motif = cfg.motif;

  if (motif === 'lens') {
    // radiating sightlines + nested lens rings
    for (let i = 0; i < 32; i++) {
      const [x1, y1] = onCircle(c, c, size * 0.18, i * 11.25);
      const [x2, y2] = onCircle(c, c, size * 0.5, i * 11.25);
      els.push(<line key={'l' + i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="1" opacity={i % 2 ? 0.16 : 0.3} />);
    }
    [0.5, 0.4, 0.3, 0.2].forEach((f, i) => els.push(<ellipse key={'e' + i} cx={c} cy={c} rx={size * f} ry={size * f * 0.62} fill="none" stroke={color} strokeWidth="1.4" opacity={0.32 - i * 0.04} />));
  } else if (motif === 'ripple') {
    for (let i = 8; i >= 1; i--) els.push(<circle key={'c' + i} cx={c} cy={c} r={size * 0.058 * i} fill="none" stroke={color} strokeWidth={i % 2 ? 1.6 : 1} opacity={0.34 - i * 0.03} />);
    for (let i = 0; i < 12; i++) { const [x, y] = onCircle(c, c, size * 0.44, i * 30); els.push(<circle key={'d' + i} cx={x} cy={y} r="2.6" fill={color} opacity="0.4" />); }
  } else if (motif === 'synapse') {
    const nodes = [];
    for (let i = 0; i < 9; i++) nodes.push(onCircle(c, c, size * 0.42, i * 40 - 90));
    nodes.forEach((n, i) => {
      const m = nodes[(i + 1) % nodes.length];
      els.push(<line key={'ring' + i} x1={n[0]} y1={n[1]} x2={m[0]} y2={m[1]} stroke={color} strokeWidth="1" opacity="0.22" />);
      els.push(<line key={'spk' + i} x1={c} y1={c} x2={n[0]} y2={n[1]} stroke={color} strokeWidth="1" opacity="0.26" />);
    });
    nodes.forEach((n, i) => els.push(<circle key={'nd' + i} cx={n[0]} cy={n[1]} r={i % 2 ? 5 : 7} fill={i % 2 ? color : deep} opacity="0.55" />));
    els.push(<circle key="core" cx={c} cy={c} r="11" fill={color} opacity="0.5" />);
  } else if (motif === 'assembly') {
    // bauhaus blocks orbiting on two rings
    const shapeAt = (x, y, k, s) => {
      if (k === 0) return <circle key={'s' + x + y} cx={x} cy={y} r={s} fill={color} opacity="0.42" />;
      if (k === 1) return <rect key={'s' + x + y} x={x - s} y={y - s} width={s * 2} height={s * 2} rx="2" fill={deep} opacity="0.4" transform={`rotate(12 ${x} ${y})`} />;
      return <polygon key={'s' + x + y} points={`${x},${y - s} ${x + s},${y + s} ${x - s},${y + s}`} fill={color} opacity="0.46" />;
    };
    for (let i = 0; i < 9; i++) { const [x, y] = onCircle(c, c, size * 0.44, i * 40); els.push(shapeAt(x, y, i % 3, 9)); }
    for (let i = 0; i < 6; i++) { const [x, y] = onCircle(c, c, size * 0.24, i * 60 + 30); els.push(shapeAt(x, y, (i + 1) % 3, 6)); }
    els.push(<circle key="ringline" cx={c} cy={c} r={size * 0.44} fill="none" stroke={color} strokeWidth="1" opacity="0.2" />);
  } else if (motif === 'broadcast') {
    // concentric upward-opening arcs — radiating story
    for (let i = 1; i <= 6; i++) {
      const r = size * 0.07 * i;
      const [sx, sy] = onCircle(c, c + size * 0.04, r, 150);
      const [ex, ey] = onCircle(c, c + size * 0.04, r, 30);
      els.push(<path key={'a' + i} d={`M ${sx} ${sy} A ${r} ${r} 0 0 1 ${ex} ${ey}`} fill="none" stroke={color} strokeWidth={i % 2 ? 1.8 : 1.1} opacity={0.4 - i * 0.04} />);
    }
    for (let i = 0; i < 16; i++) { const [x, y] = onCircle(c, c, size * 0.46, i * 22.5); els.push(<circle key={'p' + i} cx={x} cy={y} r="1.8" fill={color} opacity="0.34" />); }
  }

  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} aria-hidden
      className={idle ? 'pk2Spin' : ''}
      style={{ display: 'block', overflow: 'visible', opacity, transformOrigin: 'center' }}>
      {els}
    </svg>
  );
}

// ── Card BACK — patterned, type-neutral, for the welcome-screen teasers ─────
function CardBack({ w = 300 }) {
  const h = Math.round(w * 1.42);
  const BrandMark = window.PokemonCard.BrandMark;
  return (
    <div style={{ width: w, height: h, borderRadius: 22, position: 'relative', overflow: 'hidden',
      padding: 7, background: 'linear-gradient(150deg, #F2B27A 0%, #FF450F 44%, #7C1E04 100%)',
      boxShadow: '0 1px 2px rgba(20,15,10,0.18), 0 6px 14px -6px rgba(124,30,4,0.34), 0 20px 40px -18px rgba(124,30,4,0.42), 0 44px 88px -44px rgba(124,30,4,0.5)' }}>
      <div style={{ position: 'absolute', inset: 7, borderRadius: 16, overflow: 'hidden',
        background: 'radial-gradient(120% 90% at 50% 14%, #2A211B 0%, #18120E 55%, #0E0A07 100%)' }}>
        {/* guilloché field */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Guilloche size={w * 1.4} color="#FF8A4A" petals={34} opacity={0.16} strokeWidth={0.7} />
        </div>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Guilloche size={w * 0.78} color="#FFB47A" petals={26} rx={0.5} ry={0.5} opacity={0.2} strokeWidth={0.6} />
        </div>
        {/* inner keyline */}
        <div style={{ position: 'absolute', inset: 14, borderRadius: 11, border: '1px solid rgba(255,138,74,0.34)' }}></div>
        <div style={{ position: 'absolute', inset: 19, borderRadius: 8, border: '1px solid rgba(255,138,74,0.16)' }}></div>
        {/* top label */}
        <div style={{ position: 'absolute', top: 26, left: 0, right: 0, textAlign: 'center', fontFamily: "'Geist Mono',monospace", fontSize: w * 0.038, letterSpacing: '.34em', color: 'rgba(255,176,122,0.78)' }}>THE&nbsp;UX&nbsp;POKÉMON</div>
        {/* center medallion */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: w * 0.4, height: w * 0.4, borderRadius: '50%',
          background: 'radial-gradient(circle at 38% 30%, #FFB47A, #FF450F 58%, #9A2606)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 12px 30px -8px rgba(255,69,15,0.7), inset 0 2px 5px rgba(255,255,255,0.4), inset 0 -8px 14px rgba(0,0,0,0.35)', border: '2px solid rgba(255,200,160,0.5)' }}>
          <BrandMark size={w * 0.2} />
        </div>
        {/* bottom label */}
        <div style={{ position: 'absolute', bottom: 26, left: 0, right: 0, textAlign: 'center', fontFamily: "'Geist Mono',monospace", fontSize: w * 0.034, letterSpacing: '.3em', color: 'rgba(255,176,122,0.62)' }}>UX&nbsp;GYM&nbsp;·&nbsp;FIRST&nbsp;DRILL</div>
        {/* corner diamonds */}
        {[[14, 14], [14, null], [null, 14], [null, null]].map(([t, l], i) => (
          <span key={i} style={{ position: 'absolute', top: t != null ? 30 : 'auto', bottom: t == null ? 30 : 'auto', left: l != null ? 30 : 'auto', right: l == null ? 30 : 'auto', width: 6, height: 6, background: '#FF8A4A', transform: 'rotate(45deg)', opacity: 0.6 }}></span>
        ))}
      </div>
    </div>
  );
}

window.PK2 = { CFG: PK2_CFG, Guilloche, Aura, CardBack, onCircle };
