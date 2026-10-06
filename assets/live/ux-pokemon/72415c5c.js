/* global React */
// ─────────────────────────────────────────────────────────────────────────
//  UX Pokémon · v2 — THE HERO CARD (dark / legendary edition).
//  A luminous cinematic specimen that lives on darkness. God-rays, a glowing
//  animated aura, drifting sparks, blazing holo foil over near-black, a
//  portrait that floats in its own light. Everything centred. No single icon.
// ─────────────────────────────────────────────────────────────────────────

const { useState: hcState, useEffect: hcEffect, useRef: hcRef } = React;

const HC_NOISE = `url("data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter><rect width="160" height="160" filter="url(#n)"/></svg>')}")`;

// A true holographic foil for a dark face: the WHOLE surface is iridescent.
// A thin, crisp specular glint that glides with the cursor — mostly clear, with
// just hints of spectral colour at its edges. Keeps the card clean (no cloud);
// the smooth 3D tilt leads, the sheen is a highlight, not a haze.
function HoloV2({ px = 0.5, py = 0.5, intensity = 0.3, sweeping = false }) {
  const t = Math.max(0, Math.min(1, px * 0.6 + py * 0.4));
  const posX = (t * 100).toFixed(1);
  const band = `linear-gradient(106deg, transparent 43%, hsla(316,90%,80%,0.16) 47.5%, rgba(255,255,255,0.42) 50%, hsla(187,90%,80%,0.16) 52.5%, transparent 57%)`;
  return (
    <React.Fragment>
      <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 12, backgroundImage: band, backgroundSize: '220% 100%', backgroundPosition: `${posX}% 50%`, filter: 'blur(2px)', mixBlendMode: 'screen', opacity: 0.16 + intensity * 0.46, transition: sweeping ? 'opacity .5s ease' : 'background-position .3s ease-out, opacity .5s ease' }}></div>
      <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 14, backgroundImage: HC_NOISE, backgroundSize: '88px', opacity: 0.05, mixBlendMode: 'overlay' }}></div>
    </React.Fragment>
  );
}

function rankFromScore(score) {
  const P = window.POKEMON;
  return P.TYPES.slice().sort((a, b) => (score[b] || 0) - (score[a] || 0));
}

// deterministic spark positions
const SPARKS = [
  { x: 18, y: 20, s: 3, d: 0 }, { x: 82, y: 16, s: 2, d: 1.1 }, { x: 12, y: 52, s: 2.4, d: 0.6 },
  { x: 88, y: 48, s: 3, d: 1.7 }, { x: 26, y: 74, s: 2, d: 0.3 }, { x: 74, y: 80, s: 2.6, d: 1.3 },
  { x: 50, y: 12, s: 2.2, d: 0.9 }, { x: 60, y: 64, s: 1.8, d: 2.1 },
];

// ── THE CARD ───────────────────────────────────────────────────────────────
function HeroCard({ arch, score, name, photoUrl, prm, cardRef, minting, alive = true, adj, onAdjust, aspect }) {
  const P = window.POKEMON;
  const { Aura, Guilloche, CFG } = window.PK2;
  const RadarChart = window.PokemonEmblems.RadarChart;
  const BrandMark = window.PokemonCard.BrandMark;
  const tilt = window.PokemonCard.useTilt(prm, 8, 1300);
  const cfg = CFG[arch.key];
  const W = 416;
  const ranked = rankFromScore(score);
  const blendTop = ranked.slice(0, 3);
  const displayName = (name && name.trim()) || 'Your name';
  const light = cfg.shine[0];
  const shine = `linear-gradient(96deg, #FFFFFF 0%, ${cfg.shine[0]} 38%, ${arch.color} 72%, ${cfg.shine[0]} 100%)`;
  const animate = alive && !prm;

  // mint-in shine sweep
  const [sweep, setSweep] = hcState(minting && !prm ? 0 : 1);
  hcEffect(() => {
    if (!minting || prm) { setSweep(1); return; }
    let raf, start = null; const dur = 1400; const ease = (t) => t * t * (3 - 2 * t);
    const step = (now) => { if (start === null) start = now; const p = Math.min(1, (now - start) / dur); setSweep(ease(p)); if (p < 1) raf = requestAnimationFrame(step); };
    const to = setTimeout(() => { raf = requestAnimationFrame(step); }, 250);
    return () => { clearTimeout(to); cancelAnimationFrame(raf); };
  }, [minting, prm]);
  const sweeping = minting && !prm && sweep < 1;
  const fxPx = tilt.hover ? tilt.px : (sweeping ? 0.04 + sweep * 0.92 : 0.5);
  const fxPy = tilt.hover ? tilt.py : 0.4;
  // rise-and-settle: the load glow peaks mid-sweep and eases back to idle, never snapping off
  const fxInt = tilt.hover ? 0.68 : (sweeping ? 0.12 + Math.sin(Math.min(1, sweep) * Math.PI) * 0.62 : 0.12);

  const edge = `conic-gradient(from 130deg, ${arch.light}, ${arch.color} 16%, ${arch.deep} 36%, #FFFFFF 50%, ${cfg.shine[0]} 60%, ${arch.color} 76%, ${arch.deep} 90%, ${arch.light})`;
  const pc = 160; // portrait centre Y inside face
  const A = adj || { fx: 0, fy: 0, fw: 1, fh: 1 };
  const _bgW = 100 / A.fw, _bgH = 100 / A.fh;
  const _pX = A.fw >= 1 ? 50 : (A.fx / (1 - A.fw)) * 100;
  const _pY = A.fh >= 1 ? 50 : (A.fy / (1 - A.fh)) * 100;

  return (
    <div onMouseMove={tilt.onMove} onMouseLeave={tilt.onLeave} style={{ ...tilt.style, width: W }}>
      <div ref={cardRef} style={{ padding: 6, borderRadius: 30, background: edge, boxShadow: `0 0 54px -14px rgba(${arch.glowRGB},0.26), 0 46px 100px -46px rgba(${arch.glowRGB},0.28), 0 34px 80px -34px rgba(0,0,0,0.72), 0 14px 34px rgba(0,0,0,0.5)` }}>
        <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 24, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', fontFamily: "'Geist',sans-serif",
          background: `linear-gradient(168deg, ${arch.deep} 0%, #15100C 56%, #0B0806 100%)` }}>

          {/* ── atmosphere ── */}
          {/* glow pool behind portrait */}
          <div aria-hidden className={animate ? 'pk2GlowP' : ''} style={{ position: 'absolute', top: pc - 150, left: '50%', transform: 'translateX(-50%)', width: 360, height: 360, background: `radial-gradient(circle, rgba(${arch.glowRGB},0.7) 0%, rgba(${arch.glowRGB},0.18) 38%, transparent 66%)`, filter: 'blur(6px)', pointerEvents: 'none' }}></div>
          {/* god rays */}
          <div aria-hidden className={animate ? 'pk2Rays' : ''} style={{ position: 'absolute', top: pc - 230, left: '50%', width: 460, height: 460, marginLeft: -230, pointerEvents: 'none',
            background: `repeating-conic-gradient(from 0deg at 50% 50%, rgba(255,255,255,0.085) 0deg 5deg, transparent 5deg 17deg)`,
            WebkitMaskImage: 'radial-gradient(closest-side, #000 8%, transparent 64%)', maskImage: 'radial-gradient(closest-side, #000 8%, transparent 64%)', mixBlendMode: 'screen' }}></div>
          {/* aura motif (glowing) */}
          <div aria-hidden style={{ position: 'absolute', top: pc, left: '50%', transform: 'translate(-50%,-50%)', mixBlendMode: 'screen' }}>
            <Aura type={arch.key} color={light} deep="rgba(255,255,255,0.55)" size={300} opacity={0.85} idle={animate} />
          </div>
          {/* guilloché */}
          <div aria-hidden style={{ position: 'absolute', top: pc - 220, left: '50%', transform: 'translateX(-50%)', mixBlendMode: 'screen' }}>
            <Guilloche size={430} color={light} petals={32} opacity={0.1} strokeWidth={0.6} />
          </div>
          {/* starfield */}
          <div aria-hidden style={{ position: 'absolute', inset: 0, opacity: 0.5, backgroundImage: 'radial-gradient(rgba(255,255,255,0.16) 1px, transparent 1px)', backgroundSize: '17px 17px', maskImage: 'linear-gradient(180deg, #000, transparent 70%)', WebkitMaskImage: 'linear-gradient(180deg, #000, transparent 70%)' }}></div>
          {/* sparks */}
          {SPARKS.map((s, i) => (
            <span key={i} aria-hidden className={animate ? 'pk2Twinkle' : ''} style={{ position: 'absolute', left: s.x + '%', top: s.y + '%', width: s.s, height: s.s, borderRadius: '50%', background: '#fff', boxShadow: `0 0 6px 1px ${light}`, animationDelay: s.d + 's', opacity: 0.7 }}></span>
          ))}
          {/* bottom vignette to seat the text */}
          <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 52%, rgba(7,5,4,0.55) 100%)', pointerEvents: 'none' }}></div>

          {/* ── top ledger ── */}
          <div style={{ position: 'absolute', top: 16, left: 18, right: 18, zIndex: 5, display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center' }}>
            <span style={{ justifySelf: 'start', fontFamily: "'Geist Mono',monospace", fontSize: 10, letterSpacing: '.14em', color: 'rgba(255,255,255,0.72)' }}>Nº&nbsp;{cfg.num}</span>
            <span style={{ justifySelf: 'center', display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 11px', borderRadius: 999, background: 'rgba(255,255,255,0.1)', border: `1px solid rgba(${arch.glowRGB},0.5)`, fontFamily: "'Geist Mono',monospace", fontSize: 9, fontWeight: 600, letterSpacing: '.16em', color: '#fff', boxShadow: `0 0 16px -4px rgba(${arch.glowRGB},0.7)` }}>{cfg.element}</span>
            <span title="Legendary" style={{ justifySelf: 'end', position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 27, height: 27, borderRadius: '50%', padding: 1.5,
              background: `conic-gradient(from 130deg, ${light}, ${arch.color} 38%, #FFFFFF 58%, ${light} 78%, ${arch.color})`,
              boxShadow: `0 0 13px -2px rgba(${arch.glowRGB},0.9), 0 2px 6px rgba(0,0,0,0.4)` }}>
              <span style={{ width: '100%', height: '100%', borderRadius: '50%', background: `radial-gradient(circle at 40% 34%, ${arch.deep}, #0B0806)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden style={{ filter: `drop-shadow(0 0 4px ${light})` }}><path d="M12 1.6l1.9 8.1 8.1 2.3-8.1 2.3L12 22.4l-1.9-8.1L2 12l8.1-2.3z" fill={light} /></svg>
              </span>
            </span>
          </div>

          {/* ── content ── */}
          <div style={{ position: 'relative', zIndex: 4, width: '100%', padding: '52px 22px 18px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* portrait — floating in its own light */}
            <div className={animate ? 'pk2FloatS' : ''} style={{ position: 'relative', width: 220, height: 220, borderRadius: 18, padding: 4,
              background: `conic-gradient(from 130deg, ${cfg.shine[0]}, ${arch.color} 28%, ${arch.deep} 52%, #fff 62%, ${cfg.shine[0]} 80%, ${arch.color})`,
              boxShadow: `0 0 34px -2px rgba(${arch.glowRGB},0.85), 0 16px 40px -10px rgba(0,0,0,0.6)` }}>
              <div style={{ width: '100%', height: '100%', borderRadius: 19, padding: 3, background: 'linear-gradient(160deg, #1A140F, #0B0806)' }}>
                <div style={{ width: '100%', height: '100%', borderRadius: 16, overflow: 'hidden', position: 'relative', background: `radial-gradient(circle at 50% 36%, ${arch.deep}, #0B0806)` }}>
                  {photoUrl ? (
                    <div style={{ position: 'absolute', inset: 0 }}><div aria-hidden style={{ position: 'absolute', inset: 0, backgroundImage: `url("${photoUrl}")`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(16px) saturate(1.12) brightness(0.5)', transform: 'scale(1.2)' }}></div><div style={{ position: 'absolute', inset: 0, backgroundImage: `url("${photoUrl}")`, backgroundRepeat: 'no-repeat', backgroundSize: _bgW + '% ' + _bgH + '%', backgroundPosition: _pX + '% ' + _pY + '%', filter: 'saturate(0.82) contrast(1.06) brightness(0.97)' }}></div><div aria-hidden style={{ position: 'absolute', inset: 0, background: arch.color, mixBlendMode: 'soft-light', opacity: 0.45 }}></div><div aria-hidden style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 50% 34%, transparent 42%, rgba(0,0,0,0.4))` }}></div></div>
                  ) : (
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, color: light }}>
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" opacity="0.85"><circle cx="12" cy="9" r="3.4" /><path d="M5 19.5c1.2-3 4-4.5 7-4.5s5.8 1.5 7 4.5" /></svg>
                      <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: 8, letterSpacing: '.16em', opacity: 0.85 }}>ADD YOUR PHOTO</span>
                    </div>
                  )}
                  <div aria-hidden style={{ position: 'absolute', inset: 0, borderRadius: 16, boxShadow: 'inset 0 2px 8px rgba(255,255,255,0.28), inset 0 -14px 26px rgba(0,0,0,0.5)' }}></div>
                </div>
              </div>
            </div>

            {/* name — solid luminous colour so the word always renders (no clip-to-text rectangle) */}
            <h2 style={{ width: '100%', textAlign: 'center', fontFamily: "'Instrument Serif',Georgia,serif", fontWeight: 400, fontSize: 58, lineHeight: 0.94, letterSpacing: '-.02em', margin: '22px 0 0', color: cfg.shine[0], textShadow: `0 0 22px rgba(${arch.glowRGB},0.6), 0 1px 0 rgba(0,0,0,0.25)` }}>{arch.name}</h2>

            <p style={{ margin: '14px auto 0', maxWidth: 286, width: '100%', textAlign: 'center', fontFamily: "'Instrument Serif',Georgia,serif", fontStyle: 'italic', fontSize: 18.5, lineHeight: 1.34, color: 'rgba(250,246,240,0.9)', textWrap: 'pretty' }}>{arch.blurb}</p>

            {/* signature stat — a real read-out of the five directions */}
            <div style={{ marginTop: 18, fontFamily: "'Geist Mono',monospace", fontSize: 9, fontWeight: 600, letterSpacing: '.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>Your five directions</div>
            <div style={{ marginTop: 4, position: 'relative', filter: `drop-shadow(0 0 12px rgba(${arch.glowRGB},0.55))` }}>
              <RadarChart score={score} color={light} fill={`rgba(${arch.glowRGB},0.3)`} size={184} showLabels showDots ringColor="rgba(255,255,255,0.14)" labelColor="rgba(250,246,240,0.88)" labelSize={20} strokeW={4} />
            </div>

            {/* footer */}
            <div style={{ width: '100%', marginTop: 16, paddingTop: 15, borderTop: '1px solid rgba(255,255,255,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: 14, letterSpacing: '.08em', color: 'rgba(255,255,255,0.8)' }}>{displayName.toUpperCase()}</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 9 }}>
                <BrandMark size={27} />
                <span style={{ fontFamily: "'Geist',sans-serif", fontWeight: 700, fontSize: 21, letterSpacing: '-0.02em', color: 'rgba(255,255,255,0.97)' }}>UX&nbsp;Gym</span>
              </span>
            </div>
          </div>

          <HoloV2 px={fxPx} py={fxPy} intensity={fxInt} sweeping={sweeping} hueCenter={22} />
        </div>
      </div>
    </div>
  );
}

window.PK2Card = { HeroCard, HoloV2, rankFromScore };
