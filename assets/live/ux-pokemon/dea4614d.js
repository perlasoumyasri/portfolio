/* global React */
// ─────────────────────────────────────────────────────────────────────────
//  UX Pokémon · v2 — GLIMPSE cards for the opening.
//  Five sealed-but-alive collectibles, fanned out. Each is a full-bleed energy
//  storm: a white-hot nucleus (a legendary still forming) pulsing inside the
//  type's swirling aura, orbiting embers, god-rays, and a shimmering name that
//  is not yet legible. No "?", no lock, no gem, no pentagon — the drama comes
//  from light and motion, so a student wonders which one is theirs.
// ─────────────────────────────────────────────────────────────────────────

// deterministic orbiting embers
const G_EMBERS = [
  { x: 24, y: 30, s: 2.4, d: 0.0 }, { x: 76, y: 26, s: 1.8, d: 0.7 }, { x: 18, y: 58, s: 2, d: 1.3 },
  { x: 82, y: 60, s: 2.6, d: 0.4 }, { x: 34, y: 74, s: 1.6, d: 1.7 }, { x: 66, y: 78, s: 2.2, d: 0.9 },
  { x: 50, y: 20, s: 1.7, d: 1.1 }, { x: 60, y: 50, s: 1.5, d: 2.0 }, { x: 40, y: 44, s: 1.5, d: 0.3 },
];

// ── one abstract type card ──────────────────────────────────────────────────
function GlimpseCard({ typeKey, w = 196, sheenDelay = 0, prm = false }) {
  const P = window.POKEMON;
  const { Aura, Guilloche, CFG } = window.PK2;
  const BrandMark = window.PokemonCard.BrandMark;
  const arch = P.ARCH[typeKey];
  const cfg = CFG[typeKey];
  const h = Math.round(w * 1.46);
  const light = cfg.shine[0];
  const cx = '50%', cyPct = 0.42; // nucleus centre

  const edge = `conic-gradient(from 130deg, ${arch.light}, ${arch.color} 16%, ${arch.deep} 36%, #FFFFFF 50%, ${light} 60%, ${arch.color} 76%, ${arch.deep} 90%, ${arch.light})`;
  const anim = !prm;

  return (
    <div style={{ width: w, height: h, padding: 5, borderRadius: 24, background: edge, position: 'relative',
      boxShadow: `0 0 40px -8px rgba(${arch.glowRGB},0.5), 0 18px 36px -18px rgba(${arch.glowRGB},0.5), 0 36px 70px -40px rgba(0,0,0,0.62), 0 1px 2px rgba(0,0,0,0.3)` }}>
      <div style={{ position: 'absolute', inset: 5, borderRadius: 19, overflow: 'hidden',
        background: `radial-gradient(125% 90% at 50% ${cyPct * 100}%, ${arch.deep} 0%, #140F0B 52%, #080503 100%)` }}>

        {/* ── full-bleed energy storm ── */}
        {/* deep glow pool */}
        <div aria-hidden className={anim ? 'pk2GlowP' : ''} style={{ position: 'absolute', top: `${cyPct * 100}%`, left: cx, transform: 'translate(-50%,-50%)', width: w * 1.5, height: w * 1.5, background: `radial-gradient(circle, rgba(${arch.glowRGB},0.6) 0%, rgba(${arch.glowRGB},0.16) 40%, transparent 66%)`, filter: 'blur(6px)', pointerEvents: 'none' }}></div>
        {/* rotating god-rays */}
        <div aria-hidden className={anim ? 'pk2Rays' : ''} style={{ position: 'absolute', top: `${cyPct * 100}%`, left: cx, width: w * 1.7, height: w * 1.7, transform: 'translate(-50%,-50%)', pointerEvents: 'none',
          background: 'repeating-conic-gradient(from 0deg at 50% 50%, rgba(255,255,255,0.09) 0deg 4deg, transparent 4deg 15deg)',
          WebkitMaskImage: 'radial-gradient(closest-side, #000 4%, transparent 58%)', maskImage: 'radial-gradient(closest-side, #000 4%, transparent 58%)', mixBlendMode: 'screen' }}></div>
        {/* counter-rotating guilloché filigree */}
        <div aria-hidden className={anim ? 'pk2Spin' : ''} style={{ position: 'absolute', top: `${cyPct * 100}%`, left: cx, transform: 'translate(-50%,-50%)', mixBlendMode: 'screen', opacity: 0.7 }}>
          <Guilloche size={w * 1.15} color={light} petals={34} opacity={0.2} strokeWidth={0.5} />
        </div>
        {/* the type's living aura — large + bright */}
        <div aria-hidden style={{ position: 'absolute', top: `${cyPct * 100}%`, left: cx, transform: 'translate(-50%,-50%)', mixBlendMode: 'screen' }}>
          <Aura type={typeKey} color={light} deep="rgba(255,255,255,0.6)" size={w * 1.0} opacity={0.95} idle={anim} />
        </div>
        {/* white-hot nucleus — the legendary still forming */}
        <div aria-hidden className={anim ? 'pk2GlowP' : ''} style={{ position: 'absolute', top: `${cyPct * 100}%`, left: cx, transform: 'translate(-50%,-50%)', width: w * 0.3, height: w * 0.3, borderRadius: '50%',
          background: `radial-gradient(circle at 45% 40%, #FFFFFF 0%, ${light} 34%, ${arch.color} 64%, rgba(${arch.glowRGB},0) 80%)`,
          boxShadow: `0 0 42px 8px rgba(${arch.glowRGB},0.7)`, pointerEvents: 'none' }}></div>
        {/* orbiting embers */}
        {G_EMBERS.map((e, i) => (
          <span key={i} aria-hidden className={anim ? 'pk2Twinkle' : ''} style={{ position: 'absolute', left: e.x + '%', top: e.y + '%', width: e.s, height: e.s, borderRadius: '50%', background: '#fff', boxShadow: `0 0 6px 1px ${light}`, animationDelay: e.d + 's', opacity: 0.8 }}></span>
        ))}
        {/* drifting scan veil — the form is concealed behind shifting light */}
        <div aria-hidden style={{ position: 'absolute', inset: 0, backgroundImage: `repeating-linear-gradient(180deg, transparent 0 3px, rgba(0,0,0,0.16) 3px 4px)`, opacity: 0.4, mixBlendMode: 'multiply', pointerEvents: 'none' }}></div>
        {/* card-wide starfield */}
        <div aria-hidden style={{ position: 'absolute', inset: 0, opacity: 0.34, backgroundImage: 'radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px)', backgroundSize: '17px 17px', maskImage: 'radial-gradient(130% 80% at 50% 30%, transparent 30%, #000 78%)', WebkitMaskImage: 'radial-gradient(130% 80% at 50% 30%, transparent 30%, #000 78%)' }}></div>
        {/* top + bottom vignette to seat the chrome */}
        <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(6,4,3,0.55) 0%, transparent 18%, transparent 56%, rgba(5,3,2,0.82) 100%)', pointerEvents: 'none' }}></div>
        {/* collectible keyline */}
        <div aria-hidden style={{ position: 'absolute', inset: 9, borderRadius: 13, border: `1px solid rgba(${arch.glowRGB},0.28)`, pointerEvents: 'none' }}></div>

        {/* ── top chrome ── */}
        <div style={{ position: 'absolute', top: 13, left: 14, right: 14, zIndex: 5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: w * 0.044, letterSpacing: '.18em', color: 'rgba(255,255,255,0.5)' }}>UX&nbsp;GYM</span>
          {/* legendary rarity sparkle */}
          <span aria-hidden style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: w * 0.1, height: w * 0.1, borderRadius: '50%', padding: 1.5,
            background: `conic-gradient(from 130deg, ${light}, ${arch.color} 38%, #fff 58%, ${light})`, boxShadow: `0 0 12px -2px rgba(${arch.glowRGB},0.9)` }}>
            <span style={{ width: '100%', height: '100%', borderRadius: '50%', background: `radial-gradient(circle at 40% 34%, ${arch.deep}, #0B0806)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width={w * 0.055} height={w * 0.055} viewBox="0 0 24 24" style={{ filter: `drop-shadow(0 0 3px ${light})` }}><path d="M12 1.6l1.9 8.1 8.1 2.3-8.1 2.3L12 22.4l-1.9-8.1L2 12l8.1-2.3z" fill={light} /></svg>
            </span>
          </span>
        </div>

        {/* ── bottom plate: a name not yet legible + brandmark ── */}
        <div style={{ position: 'absolute', left: 14, right: 14, bottom: 13, zIndex: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 9 }}>
          {/* shimmering glyph waveform — the forming name */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: w * 0.018, height: w * 0.1 }}>
            {[0.42, 0.7, 1, 0.55, 0.86, 0.5, 0.95, 0.64, 0.46].map((f, i) => (
              <span key={i} aria-hidden className={anim ? 'pk2GlowP' : ''} style={{ width: w * 0.017, height: `${f * 100}%`, borderRadius: 99, background: `linear-gradient(180deg, ${light}, rgba(${arch.glowRGB},0.25))`, boxShadow: `0 0 6px -1px rgba(${arch.glowRGB},0.8)`, animationDelay: (i * 0.16) + 's' }}></span>
            ))}
          </div>
          {/* footer */}
          <div style={{ width: '100%', paddingTop: 9, borderTop: '1px solid rgba(255,255,255,0.13)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
            <BrandMark size={w * 0.058} />
            <span style={{ fontFamily: "'Geist',sans-serif", fontWeight: 700, fontSize: w * 0.056, letterSpacing: '-0.02em', color: 'rgba(255,255,255,0.82)' }}>UX&nbsp;Gym</span>
            <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: w * 0.038, letterSpacing: '.14em', color: 'rgba(255,255,255,0.4)', marginLeft: 4 }}>FIRST&nbsp;DRILL</span>
          </div>
        </div>

        {/* foil sheen sweep */}
        <div aria-hidden style={{ position: 'absolute', inset: 0, borderRadius: 19, overflow: 'hidden', pointerEvents: 'none', zIndex: 6 }}>
          <div className={anim ? 'pk2Sheen' : ''} style={{ position: 'absolute', top: '-25%', left: 0, width: '42%', height: '150%', background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.34), transparent)`, filter: 'blur(6px)', mixBlendMode: 'screen', animationDelay: sheenDelay + 's' }}></div>
        </div>
      </div>
    </div>
  );
}

window.PK2Glimpse = { GlimpseCard };
