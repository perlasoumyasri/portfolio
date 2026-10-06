/* global React */
// ─────────────────────────────────────────────────────────────────────────
//  The collectible — a Bauhaus holographic trading card the student keeps.
//  Foil edge · cursor tilt · iridescent sweep · specular hotspot · grain.
//  Same craft language as the module-complete "Daylight" card.
// ─────────────────────────────────────────────────────────────────────────

const { useState: pcState, useEffect: pcEffect, useRef: pcRef, useCallback: pcCb } = React;

function usePRM() {
  const [prm] = pcState(() => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  return prm;
}

function useTilt(prm, max = 8, persp = 1000) {
  const [t, setT] = pcState({ rx: 0, ry: 0, px: 0.5, py: 0.5, hover: false });
  const onMove = pcCb((e) => {
    if (prm) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
    setT({ rx: -(py - 0.5) * max, ry: (px - 0.5) * max, px, py, hover: true });
  }, [prm, max]);
  const onLeave = pcCb(() => setT({ rx: 0, ry: 0, px: 0.5, py: 0.5, hover: false }), []);
  const style = {
    transform: `perspective(${persp}px) rotateX(${t.rx.toFixed(2)}deg) rotateY(${t.ry.toFixed(2)}deg)`,
    transition: t.hover ? 'transform .12s ease-out' : 'transform .55s cubic-bezier(.22,1,.36,1)',
    transformStyle: 'preserve-3d', willChange: 'transform',
  };
  return { onMove, onLeave, style, hover: t.hover, px: t.px, py: t.py };
}

const PK_NOISE = `url("data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter><rect width="160" height="160" filter="url(#n)"/></svg>')}")`;

// Holographic overlay stack — diffraction rainbow + shine band + specular + grain.
// `intensity` (0..1) scales the whole effect: low = subtle inherent foil, high = hover.
function HoloFX({ px = 0.5, py = 0.5, intensity = 0.32, hueCenter = 22 }) {
  const ir = 0.95, s = 0.9, w = 15;
  const hsla = (h, a, l = 70) => `hsla(${Math.round(((h % 360) + 360) % 360)}, 95%, ${l}%, ${Math.max(0, Math.min(1, a)).toFixed(3)})`;
  const spectrum = [];
  for (let i = 0; i <= 6; i++) spectrum.push(`${hsla(hueCenter + i * 60, ir * 0.3, 67)} ${Math.round(i * 100 / 6)}%`);
  const rainbow = `linear-gradient(115deg, ${spectrum.join(', ')})`;
  const hb = hueCenter + (px - 0.5) * 60;
  const band = `linear-gradient(115deg, ${hsla(hb - 55, 0, 70)} ${(50 - w * 1.45).toFixed(1)}%, ${hsla(hb - 55, ir * 0.32, 70)} ${(50 - w * 0.6).toFixed(1)}%, ${hsla(hb - 20, ir * 0.4, 76)} ${(50 - w * 0.25).toFixed(1)}%, rgba(255,255,255,${(s * 0.45).toFixed(3)}) 50%, ${hsla(hb + 35, ir * 0.42, 74)} ${(50 + w * 0.3).toFixed(1)}%, ${hsla(hb + 60, ir * 0.32, 70)} ${(50 + w * 0.65).toFixed(1)}%, ${hsla(hb + 95, ir * 0.18, 68)} ${(50 + w).toFixed(1)}%, ${hsla(hb + 95, 0, 68)} ${(50 + w * 1.45).toFixed(1)}%)`;
  const spec = `radial-gradient(circle at ${(px * 100).toFixed(1)}% ${(py * 100).toFixed(1)}%, rgba(255,255,255,0.42) 0%, ${hsla(hb + 15, 0.26, 78)} 30%, transparent 62%)`;
  const rainbowOp = 0.10 + intensity * 0.5;
  const bandOp = intensity * 0.55;
  const specOp = 0.14 + intensity * 0.5;
  return (
    <React.Fragment>
      <div aria-hidden style={{ position: 'absolute', inset: '-8%', pointerEvents: 'none', zIndex: 6, background: rainbow, backgroundSize: '180% 180%', backgroundPosition: `${(px * 100).toFixed(1)}% ${(py * 100).toFixed(1)}%`, filter: `hue-rotate(${((px + py - 1) * 60).toFixed(0)}deg) saturate(1.1) blur(8px)`, mixBlendMode: 'multiply', opacity: rainbowOp, transition: 'background-position .2s ease-out, filter .2s ease-out, opacity .7s ease', willChange: 'background-position, filter, opacity' }}></div>
      <div aria-hidden style={{ position: 'absolute', inset: '-30%', pointerEvents: 'none', zIndex: 7, background: band, filter: 'blur(16px)', transform: `translateX(${((px - 0.5) * 150).toFixed(1)}%)`, opacity: bandOp, transition: 'transform 420ms cubic-bezier(.22,1,.36,1), opacity .5s ease', willChange: 'transform, opacity' }}></div>
      <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 8, background: spec, opacity: specOp, transition: 'opacity .45s ease' }}></div>
      <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 9, backgroundImage: PK_NOISE, backgroundSize: '90px', opacity: 0.05, mixBlendMode: 'overlay' }}></div>
    </React.Fragment>
  );
}

// The real UX Gym icon — verbatim from the brand favicon. Do not redraw.
function BrandMark({ size = 18, radius }) {
  const gid = (React.useId ? React.useId() : 'uxg' + Math.random().toString(36).slice(2)).replace(/:/g, '');
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden style={{ display: 'block', flex: '0 0 auto', borderRadius: radius }}>
      <defs>
        <linearGradient id={gid} x1="0.9458" x2="0.0542" y1="0" y2="1">
          <stop offset="0" stopColor="rgb(255,64,26)" />
          <stop offset="1" stopColor="rgb(255,174,0)" />
        </linearGradient>
      </defs>
      <path d="M 4.741 31.936 C 2.122 31.936 0 29.818 0 27.205 L 0 4.731 C 0 2.118 2.122 0 4.741 0 L 27.259 0 C 29.878 0 32 2.118 32 4.731 L 32 27.205 C 32 29.818 29.878 31.936 27.259 31.936 Z" fill={`url(#${gid})`} />
      <g transform="translate(0 0.064)">
        <path d="M 22.523 24.377 C 20.757 26.139 18.362 27.129 15.864 27.129 C 13.367 27.129 10.971 26.139 9.205 24.377 L 15.864 17.731 Z" fill="rgba(255,255,255,0.8)" />
        <path d="M 22.523 11.086 C 24.289 12.848 25.281 15.239 25.281 17.731 C 25.281 20.224 24.289 22.614 22.523 24.377 L 15.864 17.731 L 22.523 11.086 Z" fill="rgba(255,255,255,0.9)" />
        <path d="M 15.858 4.453 C 17.624 6.215 18.616 8.606 18.616 11.098 C 18.616 13.591 17.624 15.981 15.858 17.744 L 9.199 11.098 Z" fill="rgb(255,255,255)" />
        <path d="M 9.206 24.377 C 6.512 21.689 5.707 17.647 7.164 14.135 C 7.637 12.995 8.331 11.959 9.206 11.086 L 15.864 17.731 Z" fill="rgba(255,255,255,0.9)" />
      </g>
    </svg>
  );
}

function FlameMark({ size = 18 }) {
  return <BrandMark size={size} />;
}

// ── the card visual ────────────────────────────────────────────────────
function CollectibleCard({ arch, score, name, photoUrl, prm, cardRef, hueCenter, minting }) {
  const { Emblem, RadarChart } = window.PokemonEmblems;
  const tilt = useTilt(prm, 8);
  const W = 360;
  const edge = `linear-gradient(150deg, ${arch.light} 0%, ${arch.color} 46%, ${arch.deep} 100%)`;
  const displayName = (name && name.trim()) || 'Your name';

  // Automatic shine sweep while the card mints in (and straightens).
  const [sweep, setSweep] = pcState(minting && !prm ? 0 : 1);
  pcEffect(() => {
    if (!minting || prm) { setSweep(1); return; }
    let raf, start = null;
    const dur = 1500;
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    const step = (now) => {
      if (start === null) start = now;
      const p = Math.min(1, (now - start) / dur);
      setSweep(ease(p));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    const to = setTimeout(() => { raf = requestAnimationFrame(step); }, 220);
    return () => { clearTimeout(to); cancelAnimationFrame(raf); };
  }, [minting, prm]);
  const sweeping = minting && !prm && sweep < 1;
  const fxPx = tilt.hover ? tilt.px : (sweeping ? 0.06 + sweep * 0.88 : 0.5);
  const fxPy = tilt.hover ? tilt.py : (sweeping ? 0.42 : 0.4);
  const fxIntensity = tilt.hover ? 0.82 : (sweeping ? 0.5 : 0.34);

  return (
    <div onMouseMove={tilt.onMove} onMouseLeave={tilt.onLeave} style={{ ...tilt.style, width: W }}>
      {/* capture node — includes foil edge, no ancestor transform */}
      <div ref={cardRef} style={{
        padding: 5, borderRadius: 26, background: edge,
        boxShadow: `0 34px 70px -24px rgba(${arch.glowRGB},0.5), 0 10px 28px rgba(33,30,26,0.18)`,
      }}>
        <div style={{
          position: 'relative', overflow: 'hidden', borderRadius: 21,
          background: '#FAF8F3', width: '100%', padding: '15px 15px 14px',
          display: 'flex', flexDirection: 'column', fontFamily: "'Geist',sans-serif",
        }}>
          <HoloFX px={fxPx} py={fxPy} intensity={fxIntensity} hueCenter={hueCenter} />

          {/* top ledger */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 2 }}>
            <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: 10.5, letterSpacing: '.12em', color: '#A8A095' }}>№ 01 · FIRST DRILL</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 999, background: arch.color, color: '#fff', fontFamily: "'Geist Mono',monospace", fontSize: 9.5, fontWeight: 600, letterSpacing: '.12em' }}>{arch.tag}</span>
          </div>

          {/* art window — photo block + colour/emblem block */}
          <div style={{ display: 'flex', gap: 8, marginTop: 11, height: 188, position: 'relative', zIndex: 2 }}>
            <div style={{ flex: '0 0 150px', borderRadius: 13, overflow: 'hidden', position: 'relative', background: '#ECE7DF' }}>
              {photoUrl ? (
                <div style={{ position: 'absolute', inset: 0, backgroundImage: `url("${photoUrl}")`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
              ) : (
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 7, color: '#B7AFA3' }}>
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="12" cy="9" r="3.4" /><path d="M5 19.5c1.2-3 4-4.5 7-4.5s5.8 1.5 7 4.5" /></svg>
                  <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: 8.5, letterSpacing: '.08em', textTransform: 'uppercase' }}>Your photo</span>
                </div>
              )}
              <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 0 1px rgba(33,30,26,0.06)', borderRadius: 13, pointerEvents: 'none' }}></div>
            </div>
            <div style={{ flex: 1, borderRadius: 13, position: 'relative', overflow: 'hidden', background: `linear-gradient(160deg, ${arch.color} 0%, ${arch.deep} 120%)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div aria-hidden style={{ position: 'absolute', inset: 0, opacity: 0.5, backgroundImage: `radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px)`, backgroundSize: '13px 13px' }}></div>
              <div style={{ position: 'relative' }}><Emblem type={arch.key} size={96} fill="#FCFAF4" accent="rgba(255,255,255,0.45)" /></div>
            </div>
          </div>

          {/* name */}
          <div style={{ marginTop: 13, position: 'relative', zIndex: 2 }}>
            <h2 style={{ fontFamily: "'Instrument Serif',Georgia,serif", fontWeight: 400, fontSize: 38, lineHeight: 0.96, letterSpacing: '-.015em', color: arch.deep, margin: 0 }}>{arch.name}</h2>
          </div>
          <div style={{ fontFamily: "'Geist Mono',monospace", fontSize: 10, letterSpacing: '.06em', color: '#8A847B', marginTop: 5, position: 'relative', zIndex: 2 }}>{displayName.toUpperCase()}</div>

          <p style={{ margin: '10px 0 0', fontSize: 12.5, lineHeight: 1.46, color: '#4A443D', textWrap: 'pretty', position: 'relative', zIndex: 2 }}>{arch.blurb}</p>

          {/* footer: radar mini + brand */}
          <div style={{ marginTop: 13, paddingTop: 12, borderTop: '1px solid rgba(33,30,26,0.10)', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 10, position: 'relative', zIndex: 2 }}>
            <div style={{ flex: '0 0 auto' }}>
              <RadarChart score={score} color={arch.color} fill={`rgba(${arch.glowRGB},0.3)`} size={72} showLabels={false} showDots ringColor="rgba(33,30,26,0.12)" strokeW={4} />
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'flex-end' }}>
                <FlameMark size={17} />
                <span style={{ fontFamily: "'Geist',sans-serif", fontWeight: 700, fontSize: 14.5, letterSpacing: '-0.02em', color: '#1A1611' }}>UX&nbsp;Gym</span>
              </div>
              <div style={{ fontFamily: "'Geist Mono',monospace", fontSize: 8.5, letterSpacing: '.04em', color: '#A8A095', marginTop: 4, maxWidth: 150, lineHeight: 1.35 }}>The designer I already am.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.PokemonCard = { CollectibleCard, useTilt, usePRM, FlameMark, BrandMark };
