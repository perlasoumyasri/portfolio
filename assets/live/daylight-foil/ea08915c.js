/* global React, Icon */

// Module Complete — celebration card. Three directions:
//  A · Daylight foil  — light collectible, warm gradient edge
//  B · Midnight ember — dark premium, golden foil (Blaze-first)
//  C · Certificate    — editorial paper, stamp + mono ledger
//
// Each stage: faux page behind, dimmed backdrop, spring-in card,
// one-shot foil sweep (re-runs on hover), cursor tilt, confetti burst,
// medallion ring sweeping to 100%. Dismiss: ✕ / Esc / backdrop.
// Reduced motion: gentle fade, no confetti, no tilt.

const { useState, useEffect, useRef, useCallback } = React;

// ---------------------------------------------------------------- data

const CELEB_DATA = {
  IGNITE: {
    batchType: 'IGNITE',
    moduleName: 'Week 3',
    moduleSub: 'Brain — frame the problem',
    studentFirstName: 'Arjun',
    personalLine: 'You\u2019re halfway there, Arjun. Momentum looks good on you.',
    pagesCompleted: '8/8',
    completionDate: '12 Jun 2026',
  },
  BLAZE: {
    batchType: 'BLAZE',
    moduleName: 'Interaction Design',
    moduleSub: 'Sprint 02',
    studentFirstName: 'Priya',
    personalLine: 'Sprint conquered, Priya. Interaction Design is now part of your toolkit.',
    pagesCompleted: '12/12',
    completionDate: '12 Jun 2026',
  },
};

const CONFETTI_COLORS = {
  IGNITE: ['#FF450F', '#FF7E50', '#FFB47A', '#FFD9C8', '#FFFFFF'],
  BLAZE:  ['#FF450F', '#FF7E50', '#FFB47A', '#F5C97B', '#FFFFFF'],
};

// ---------------------------------------------------------------- hooks

function usePRM() {
  const [prm] = useState(() =>
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  return prm;
}

function useTilt(prm, fx, factor = 1) {
  const max = ((fx && fx.tiltMax != null) ? fx.tiltMax : 7) * factor;
  const persp = (fx && fx.perspective) || 950;
  const zoom = (fx && fx.hoverScale) || 1;
  const [t, setT] = useState({ rx: 0, ry: 0, px: 0.5, py: 0.5, hover: false });
  const onMove = useCallback((e) => {
    if (prm) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setT({ rx: -(py - 0.5) * max, ry: (px - 0.5) * max, px, py, hover: true });
  }, [prm, max]);
  const onLeave = useCallback(() => setT({ rx: 0, ry: 0, px: 0.5, py: 0.5, hover: false }), []);
  const style = {
    transform: `perspective(${persp}px) rotateX(${t.rx.toFixed(2)}deg) rotateY(${t.ry.toFixed(2)}deg) scale(${t.hover ? zoom : 1})`,
    transition: t.hover ? 'transform .14s ease-out' : 'transform .5s cubic-bezier(.22,1,.36,1)',
    transformStyle: 'preserve-3d',
    willChange: 'transform',
  };
  return { onMove, onLeave, style, hover: t.hover, px: t.px, py: t.py };
}

// Cursor-reactive outer glow — drifts opposite the tilt, like light catching the edge.
function glowShadow(fx, tilt, rgb, baseAlpha = 0.18, gain = 0.42) {
  const a = (baseAlpha + fx.edgeGlow * gain).toFixed(2);
  const r = Math.round(46 + fx.edgeGlow * 74);
  const on = tilt.hover ? 1 : 0;
  const gx = Math.round((0.5 - tilt.px) * 34 * on);
  const gy = Math.round((0.5 - tilt.py) * 34 * on) + 20;
  return `${gx}px ${gy}px ${r}px -12px rgba(${rgb},${a})`;
}


// ---------------------------------------------------------------- pieces

function CloseX({ dark, onClose }) {
  return (
    <button
      aria-label="Dismiss"
      onClick={onClose}
      style={{
        position: 'absolute', top: 12, right: 12, zIndex: 5,
        width: 28, height: 28, borderRadius: 999,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        background: dark ? 'rgba(255,255,255,0.08)' : 'rgba(20,15,10,0.05)',
        border: dark ? '1px solid rgba(255,255,255,0.1)' : '1px solid var(--line)',
        color: dark ? 'var(--ink-on-dark-2)' : 'var(--ink-2)',
      }}
    >
      <svg viewBox="0 0 10 10" width="9" height="9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <path d="M1.5 1.5l7 7M8.5 1.5l-7 7" fill="none"></path>
      </svg>
    </button>
  );
}

function Medallion({ size = 92, dark = false, hot = false, prm = false }) {
  const [swept, setSwept] = useState(prm);
  useEffect(() => {
    if (prm) return;
    const t = setTimeout(() => setSwept(true), 80);
    return () => clearTimeout(t);
  }, [prm]);
  const R = size / 2 - 3.5;
  const C = 2 * Math.PI * R;
  const inner = size - 26;
  const medBg = hot
    ? 'linear-gradient(165deg, #FFC98F 0%, #FF6A2E 38%, var(--orange) 62%, #8C1F03 100%)'
    : 'linear-gradient(165deg, #FFB47A 0%, var(--orange) 55%, #C2350A 100%)';
  return (
    <div style={{ position: 'relative', width: size, height: size, flex: '0 0 auto' }}>
      <svg viewBox={`0 0 ${size} ${size}`} style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={R} fill="none"
          stroke={dark ? 'rgba(255,255,255,0.12)' : 'var(--line)'} strokeWidth="3"></circle>
        <circle cx={size / 2} cy={size / 2} r={R} fill="none"
          stroke={hot ? '#F5A623' : 'var(--orange)'} strokeWidth="3" strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={swept ? 0 : C}
          style={{ transition: 'stroke-dashoffset 1.15s cubic-bezier(.55,.06,.25,1) .45s' }}></circle>
      </svg>
      <div style={{
        position: 'absolute', top: 13, left: 13, width: inner, height: inner, borderRadius: 999,
        background: medBg,
        display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white',
        boxShadow: '0 1px 0 rgba(255,255,255,0.45) inset, 0 -8px 14px rgba(120,25,0,0.35) inset, 0 10px 24px -6px rgba(255,69,15,0.5)',
      }}>
        <Icon.flame style={{ width: inner * 0.42, height: inner * 0.42, filter: 'drop-shadow(0 2px 3px rgba(120,25,0,0.4))' }} />
      </div>
      <span className="celebPop" style={{
        position: 'absolute', right: 2, bottom: 2,
        width: 24, height: 24, borderRadius: 999,
        background: hot ? '#F5A623' : 'var(--orange)', color: 'white',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        border: dark ? '2.5px solid #14110D' : '2.5px solid white',
        animationDelay: prm ? '0s' : '1.55s',
      }}>
        <Icon.check />
      </span>
    </div>
  );
}

function StatChips({ data, dark }) {
  const cls = dark ? 'chip chip-dark' : 'chip';
  return (
    <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
      <span className={cls} style={{ height: 26 }}>
        <span style={{ color: dark ? '#FF8559' : 'var(--orange-ink)', display: 'inline-flex' }}><Icon.check /></span>
        <span className="mono" style={{ fontSize: 11.5 }}>{data.pagesCompleted} pages</span>
      </span>
      <span className={cls} style={{ height: 26 }}>
        <span className="mono" style={{ fontSize: 11.5 }}>Completed {data.completionDate}</span>
      </span>
    </div>
  );
}

// Holographic FX stack: iridescent shine band + specular hotspot + noise grain.
// All parameters come from the Tweaks panel via useCelebFx().
const CELEB_NOISE = `url("data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter><rect width="160" height="160" filter="url(#n)"/></svg>')}")`;

// Original simple foil — single warm shine band that follows the cursor.
function SimpleFoil({ x = 0.5, active = false, golden }) {
  const tint = golden ? 'rgba(245,201,123,0.32)' : 'rgba(255,180,122,0.26)';
  const white = golden ? 'rgba(255,243,220,0.5)' : 'rgba(255,255,255,0.55)';
  return (
    <div aria-hidden style={{
      position: 'absolute', inset: '-30%', pointerEvents: 'none', zIndex: 4,
      background: `linear-gradient(115deg, transparent 36%, ${white} 46%, ${tint} 51%, transparent 62%)`,
      mixBlendMode: golden ? 'screen' : 'normal',
      transform: `translateX(${((x - 0.5) * 150).toFixed(1)}%)`,
      opacity: active ? 1 : 0,
      transition: 'transform .55s cubic-bezier(.22,1,.36,1), opacity .5s ease',
      willChange: 'transform, opacity',
    }}></div>
  );
}

function HoloFX({ fx, px = 0.5, py = 0.5, active = false, golden, dark, rich }) {
  const hueBase = fx.hueCenter + (golden ? 18 : 0) + (rich ? (px - 0.5) * fx.hueSpread : 0);
  const ir = fx.iridescence;
  const s = fx.shineStrength;
  const w = fx.bandWidth;
  const hsla = (h, a, l = 70) =>
    `hsla(${Math.round(((h % 360) + 360) % 360)}, 95%, ${l}%, ${Math.max(0, Math.min(1, a)).toFixed(3)})`;
  // Diffraction spectrum — a full hue wheel laid diagonally across the surface.
  // Position + hue-rotate are driven by the tilt, so the colors genuinely change
  // with viewing angle, the way a security sticker does.
  const spectrumStops = [];
  for (let i = 0; i <= 6; i++) {
    spectrumStops.push(`${hsla(fx.hueCenter + i * 60, ir * (dark ? 0.34 : 0.3), dark ? 62 : 67)} ${Math.round(i * 100 / 6)}%`);
  }
  const rainbow = `linear-gradient(115deg, ${spectrumStops.join(', ')})`;
  // Non-rich cards keep a plain warm-metal foil: white core with a gold/peach
  // tint only — no spectral hues, no cursor-driven hue shift.
  const warmTint = golden ? '245,201,123' : '255,180,122';
  const band = rich
    ? `linear-gradient(115deg, ${hsla(hueBase - 55, 0, 70)} ${(50 - w * 1.45).toFixed(1)}%, ${hsla(hueBase - 55, ir * 0.32, 70)} ${(50 - w * 0.6).toFixed(1)}%, ${hsla(hueBase - 20, ir * 0.4, 76)} ${(50 - w * 0.25).toFixed(1)}%, rgba(255,255,255,${(s * (dark ? 0.6 : 0.7)).toFixed(3)}) 50%, ${hsla(hueBase + 35, ir * 0.42, 74)} ${(50 + w * 0.3).toFixed(1)}%, ${hsla(hueBase + 60, ir * 0.32, 70)} ${(50 + w * 0.65).toFixed(1)}%, ${hsla(hueBase + 95, ir * 0.18, 68)} ${(50 + w).toFixed(1)}%, ${hsla(hueBase + 95, 0, 68)} ${(50 + w * 1.45).toFixed(1)}%)`
    : `linear-gradient(115deg, rgba(${warmTint},0) ${(50 - w * 1.45).toFixed(1)}%, rgba(${warmTint},${(s * 0.18).toFixed(3)}) ${(50 - w * 0.85).toFixed(1)}%, rgba(${warmTint},${(s * 0.45).toFixed(3)}) ${(50 - w * 0.45).toFixed(1)}%, rgba(255,255,255,${(s * (dark ? 0.5 : 0.55)).toFixed(3)}) ${(50 - w * 0.12).toFixed(1)}%, rgba(255,255,255,${(s * (dark ? 0.65 : 0.75)).toFixed(3)}) 50%, rgba(255,255,255,${(s * (dark ? 0.5 : 0.55)).toFixed(3)}) ${(50 + w * 0.12).toFixed(1)}%, rgba(${warmTint},${(s * 0.5).toFixed(3)}) ${(50 + w * 0.45).toFixed(1)}%, rgba(${warmTint},${(s * 0.2).toFixed(3)}) ${(50 + w * 0.85).toFixed(1)}%, rgba(${warmTint},0) ${(50 + w * 1.45).toFixed(1)}%)`;
  const spec = rich
    ? `radial-gradient(circle at ${(px * 100).toFixed(1)}% ${(py * 100).toFixed(1)}%, rgba(255,255,255,${(fx.specular * (dark ? 0.8 : 0.55)).toFixed(3)}) 0%, ${hsla(hueBase + 15, fx.specular * Math.max(ir, 0.25) * 0.35, 78)} ${(fx.specSize * 0.45).toFixed(0)}%, transparent ${fx.specSize.toFixed(0)}%)`
    : `radial-gradient(circle at ${(px * 100).toFixed(1)}% ${(py * 100).toFixed(1)}%, rgba(255,255,255,${(fx.specular * (dark ? 0.8 : 0.55)).toFixed(3)}) 0%, rgba(${warmTint},${(fx.specular * 0.3).toFixed(3)}) ${(fx.specSize * 0.45).toFixed(0)}%, transparent ${fx.specSize.toFixed(0)}%)`;
  return (
    <React.Fragment>
      {/* angle-dependent diffraction rainbow — faintly visible at rest, alive on tilt */}
      {rich && (
        <div aria-hidden style={{
          position: 'absolute', inset: '-8%', pointerEvents: 'none', zIndex: 3,
          background: rainbow,
          backgroundSize: `${Math.round(fx.rainbowScale)}% ${Math.round(fx.rainbowScale)}%`,
          backgroundPosition: `${(px * 100).toFixed(1)}% ${(py * 100).toFixed(1)}%`,
          filter: `hue-rotate(${((px + py - 1) * fx.hueSpread).toFixed(0)}deg) saturate(1.15) blur(7px)`,
          mixBlendMode: dark ? 'screen' : 'multiply',
          opacity: active ? 1 : fx.rainbowRest,
          transition: 'background-position .18s ease-out, filter .18s ease-out, opacity .7s ease',
          willChange: 'background-position, filter, opacity',
        }}></div>
      )}
      {/* iridescent shine band — follows cursor with inertia */}
      <div aria-hidden style={{
        position: 'absolute', inset: '-30%', pointerEvents: 'none', zIndex: 4,
        background: band,
        mixBlendMode: dark ? 'screen' : 'normal',
        filter: `blur(${Math.round(fx.bandBlur != null ? fx.bandBlur : 12)}px)`,
        transform: `translateX(${((px - 0.5) * 150).toFixed(1)}%)`,
        opacity: active ? 1 : 0,
        transition: `transform ${Math.round(fx.shineLag)}ms cubic-bezier(.22,1,.36,1), opacity .5s ease`,
        willChange: 'transform, opacity',
      }}></div>
      {/* specular hotspot — snaps to the cursor */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 5,
        background: spec,
        mixBlendMode: dark ? 'screen' : 'normal',
        opacity: active ? 1 : 0,
        transition: 'opacity .45s ease',
      }}></div>
      {/* film grain */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 6,
        backgroundImage: CELEB_NOISE,
        backgroundSize: `${Math.round(fx.noiseScale * 90)}px`,
        opacity: fx.noise,
        mixBlendMode: 'overlay',
      }}></div>
    </React.Fragment>
  );
}

function Eyebrow({ color }) {
  return (
    <div className="caption" style={{ color, fontSize: 10.5, letterSpacing: '0.16em' }}>
      MODULE&nbsp;&nbsp;COMPLETE
    </div>
  );
}

function TierTag({ data, dark }) {
  const blaze = data.batchType === 'BLAZE';
  return (
    <span className="mono mono-s" style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      fontSize: 10, letterSpacing: '0.14em',
      color: blaze ? (dark ? '#F5C97B' : '#9A6A1B') : (dark ? 'var(--ink-on-dark-2)' : 'var(--ink-3)'),
    }}>
      <span style={{
        width: 5, height: 5, borderRadius: 999,
        background: blaze ? (dark ? '#F5C97B' : '#C98A1F') : 'var(--orange)',
      }}></span>
      {data.batchType} BATCH
    </span>
  );
}

function CTA({ dark, onContinue, onClose }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, width: '100%' }}>
      <button className="btn btn-primary" style={{ width: '100%', height: 42 }} onClick={onContinue}>
        Continue to next module <Icon.chevron />
      </button>
      <button onClick={onClose} style={{
        fontSize: 12.5, fontWeight: 500,
        color: dark ? 'var(--ink-on-dark-2)' : 'var(--ink-2)',
        borderBottom: '1px solid transparent',
      }}
        onMouseEnter={(e) => { e.currentTarget.style.borderBottomColor = 'currentColor'; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderBottomColor = 'transparent'; }}>
        Back to dashboard
      </button>
    </div>
  );
}

// ---------------------------------------------------------------- cards

// A · Daylight foil — light collectible with warm gradient edge
function DaylightCard({ data, onClose, onContinue, prm }) {
  const fx = useCelebFx();
  const tilt = useTilt(prm, fx);
  const blaze = data.batchType === 'BLAZE';
  const edge = blaze
    ? 'linear-gradient(165deg, #F5C97B 0%, #FF7E50 32%, var(--orange) 58%, #8C1F03 100%)'
    : 'linear-gradient(165deg, #FFE3D6 0%, #FFB47A 34%, var(--orange) 72%, #E2643C 100%)';
  return (
    <div onMouseMove={tilt.onMove} onMouseLeave={tilt.onLeave}
      style={{ ...tilt.style, width: 340 }}>
      <div style={{
        padding: 1.5, borderRadius: 24, background: edge,
        boxShadow: `var(--shadow-lg), ${glowShadow(fx, tilt, blaze ? '212,118,15' : '255,69,15')}`,
        transition: 'box-shadow .3s ease',
      }}>
        <div style={{
          position: 'relative', overflow: 'hidden', borderRadius: 22.5,
          background: 'var(--surface)',
          height: 460, padding: '26px 26px 22px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
        }}>
          <div aria-hidden style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: blaze
              ? 'radial-gradient(85% 48% at 50% -6%, rgba(245,166,35,0.16) 0%, rgba(255,69,15,0.07) 45%, transparent 70%)'
              : 'radial-gradient(85% 48% at 50% -6%, rgba(255,69,15,0.12) 0%, transparent 65%)',
          }}></div>
          <HoloFX fx={fx} px={tilt.px} py={tilt.py} active={tilt.hover} golden={blaze} rich />
          <CloseX onClose={onClose} />

          <div className="celebRise" style={{ animationDelay: '.15s' }}><TierTag data={data} /></div>
          <div style={{ height: 16 }}></div>
          <Medallion prm={prm} hot={blaze} />
          <div style={{ height: 18 }}></div>

          <div className="celebRise" style={{ animationDelay: '.3s' }}>
            <Eyebrow color="var(--orange-ink)" />
          </div>
          <div className="celebRise" style={{
            animationDelay: '.4s',
            fontFamily: 'var(--font-display)', fontSize: 42, lineHeight: 1.02,
            letterSpacing: '-0.02em', marginTop: 9, color: 'var(--ink)',
          }}>
            {data.moduleName}
          </div>
          <div className="celebRise mono mono-s" style={{ animationDelay: '.48s', color: 'var(--ink-3)', marginTop: 7 }}>
            {data.moduleSub.toUpperCase()}
          </div>

          <p className="celebRise" style={{
            animationDelay: '.56s',
            fontSize: 13.5, lineHeight: 1.5, color: 'var(--ink-2)',
            marginTop: 13, maxWidth: 260, textWrap: 'pretty',
          }}>
            {data.personalLine}
          </p>

          <div className="celebRise" style={{ animationDelay: '.64s', marginTop: 14 }}>
            <StatChips data={data} />
          </div>

          <div style={{ flex: 1 }}></div>
          <div className="celebRise" style={{ animationDelay: '.74s', width: '100%' }}>
            <CTA onContinue={onContinue} onClose={onClose} />
          </div>
        </div>
      </div>
    </div>
  );
}

// B · Midnight ember — dark premium, golden conic foil edge
function EmberCard({ data, onClose, onContinue, prm }) {
  const fx = useCelebFx();
  const tilt = useTilt(prm, fx);
  const blaze = data.batchType === 'BLAZE';
  const edge = blaze
    ? 'conic-gradient(from 215deg, #F5C97B, #FF7E50 18%, var(--orange) 38%, #6E1802 55%, #B8742A 78%, #F5C97B)'
    : 'conic-gradient(from 215deg, #FFB47A, #FF7E50 22%, var(--orange) 45%, #5A1502 60%, #C2350A 80%, #FFB47A)';
  return (
    <div onMouseMove={tilt.onMove} onMouseLeave={tilt.onLeave}
      style={{ ...tilt.style, width: 340 }}>
      <div style={{
        padding: 1.5, borderRadius: 24, background: edge,
        boxShadow: `0 32px 80px -18px ${blaze ? 'rgba(245,166,35,0.4)' : 'rgba(255,69,15,0.42)'}, 0 8px 24px rgba(0,0,0,0.45)`,
      }}>
        <div style={{
          position: 'relative', overflow: 'hidden', borderRadius: 22.5,
          background: 'linear-gradient(180deg, #1D1813 0%, #0E0D0B 60%)',
          height: 460, padding: '26px 26px 22px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
          color: 'var(--ink-on-dark)',
        }}>
          <div aria-hidden style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: blaze
              ? 'radial-gradient(90% 52% at 50% -8%, rgba(245,166,35,0.26) 0%, rgba(255,69,15,0.1) 48%, transparent 72%)'
              : 'radial-gradient(90% 52% at 50% -8%, rgba(255,69,15,0.28) 0%, transparent 68%)',
          }}></div>
          {/* faint guilloché texture */}
          <div aria-hidden style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.05,
            background: 'repeating-linear-gradient(125deg, rgba(255,255,255,0.7) 0 1px, transparent 1px 7px)',
          }}></div>
          <SimpleFoil x={tilt.px} active={tilt.hover} golden />
          <CloseX dark onClose={onClose} />

          <div className="celebRise" style={{ animationDelay: '.15s' }}><TierTag data={data} dark /></div>
          <div style={{ height: 16 }}></div>
          <Medallion prm={prm} dark hot={blaze} />
          <div style={{ height: 18 }}></div>

          <div className="celebRise" style={{ animationDelay: '.3s' }}>
            <Eyebrow color={blaze ? '#F5C97B' : '#FF8559'} />
          </div>
          <div className="celebRise it" style={{
            animationDelay: '.4s',
            fontFamily: 'var(--font-display)', fontSize: 40, lineHeight: 1.04,
            letterSpacing: '-0.018em', marginTop: 9,
            background: blaze
              ? 'linear-gradient(100deg, #FFE9C4 10%, #F5C97B 45%, #FF9E63 90%)'
              : 'linear-gradient(100deg, #FFF2EA 10%, #FFB47A 55%, #FF7E50 90%)',
            WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
            textWrap: 'balance',
          }}>
            {data.moduleName}
          </div>
          <div className="celebRise mono mono-s" style={{ animationDelay: '.48s', color: 'var(--ink-on-dark-2)', marginTop: 7, opacity: 0.75 }}>
            {data.moduleSub.toUpperCase()}
          </div>

          <p className="celebRise" style={{
            animationDelay: '.56s',
            fontSize: 13.5, lineHeight: 1.5, color: 'var(--ink-on-dark-2)',
            marginTop: 13, maxWidth: 262, textWrap: 'pretty',
          }}>
            {data.personalLine}
          </p>

          <div className="celebRise" style={{ animationDelay: '.64s', marginTop: 14 }}>
            <StatChips data={data} dark />
          </div>

          <div style={{ flex: 1 }}></div>
          <div className="celebRise" style={{ animationDelay: '.74s', width: '100%' }}>
            <CTA dark onContinue={onContinue} onClose={onClose} />
          </div>
        </div>
      </div>
    </div>
  );
}

// C · Certificate — editorial paper, stamp medallion, mono ledger
function CertificateCard({ data, onClose, onContinue, prm }) {
  const fx = useCelebFx();
  const tilt = useTilt(prm, fx, 0.7);
  const blaze = data.batchType === 'BLAZE';
  const tape = blaze
    ? 'repeating-linear-gradient(100deg, #F5C97B 0 14px, var(--orange) 14px 28px, #8C1F03 28px 42px)'
    : 'repeating-linear-gradient(100deg, #FFB47A 0 14px, var(--orange) 14px 28px, #C2350A 28px 42px)';
  const ledger = [
    ['PAGES', `${data.pagesCompleted} · ALL DONE`],
    ['COMPLETED', data.completionDate.toUpperCase()],
    ['BATCH', `${data.batchType}${blaze ? ' · ' + data.moduleSub.toUpperCase() : ''}`],
  ];
  return (
    <div onMouseMove={tilt.onMove} onMouseLeave={tilt.onLeave}
      style={{ ...tilt.style, width: 340 }}>
      <div style={{
        position: 'relative', overflow: 'hidden', borderRadius: 18,
        background: '#FCFAF4',
        border: '1px solid var(--line-strong)',
        height: 480,
        boxShadow: `var(--shadow-lg), ${glowShadow(fx, tilt, '255,69,15', 0.08, 0.3)}`,
        transition: 'box-shadow .3s ease',
        display: 'flex', flexDirection: 'column',
      }}>
        <div aria-hidden style={{ height: 6, flex: '0 0 auto', background: tape }}></div>
        <HoloFX fx={fx} px={tilt.px} py={tilt.py} active={tilt.hover} golden={blaze} />
        <CloseX onClose={onClose} />

        {/* stamp medallion, slightly rotated like a seal */}
        <div className="celebStamp" style={{ position: 'absolute', top: 46, right: 22, transform: 'rotate(8deg)' }}>
          <Medallion size={84} prm={prm} hot={blaze} />
        </div>

        <div style={{
          flex: 1, padding: '24px 24px 20px',
          display: 'flex', flexDirection: 'column', position: 'relative',
        }}>
          <div className="celebRise" style={{ animationDelay: '.15s' }}><TierTag data={data} /></div>
          <div style={{ height: 26 }}></div>

          <div className="celebRise" style={{ animationDelay: '.28s' }}>
            <Eyebrow color="var(--orange-ink)" />
          </div>
          <div className="celebRise it" style={{
            animationDelay: '.38s',
            fontFamily: 'var(--font-display)', fontSize: 44, lineHeight: 1.02,
            letterSpacing: '-0.022em', marginTop: 10, color: 'var(--ink)',
            maxWidth: 215, textWrap: 'balance',
          }}>
            {data.moduleName}
          </div>

          <p className="celebRise" style={{
            animationDelay: '.5s',
            fontSize: 13.5, lineHeight: 1.55, color: 'var(--ink-2)',
            marginTop: 14, maxWidth: 250, textWrap: 'pretty',
          }}>
            {data.personalLine}
          </p>

          <div style={{ flex: 1 }}></div>

          <div className="celebRise" style={{
            animationDelay: '.6s',
            borderTop: '1px dashed var(--line-strong)',
            paddingTop: 14, display: 'flex', flexDirection: 'column', gap: 8,
          }}>
            {ledger.map(([k, v]) => (
              <div key={k} style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                <span className="mono mono-s" style={{ color: 'var(--ink-3)', fontSize: 10, letterSpacing: '0.12em', flex: '0 0 86px', textAlign: 'left' }}>{k}</span>
                <span style={{ flex: 1, borderBottom: '1px dotted var(--line-strong)', alignSelf: 'center' }}></span>
                <span className="mono mono-s" style={{ color: 'var(--ink)', fontSize: 11 }}>{v}</span>
              </div>
            ))}
          </div>

          <div className="celebRise" style={{ animationDelay: '.7s', marginTop: 16, width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, width: '100%' }}>
              <button className="btn" style={{
                width: '100%', height: 42,
                background: 'var(--surface-dark)', color: 'var(--ink-on-dark)',
                boxShadow: '0 1px 0 rgba(255,255,255,0.12) inset, 0 8px 18px -6px rgba(20,15,10,0.4)',
              }} onClick={onContinue}>
                Continue to next module <Icon.chevron />
              </button>
              <button onClick={onClose} style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--ink-2)' }}>
                Back to dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- stage

// Faux page sitting behind the overlay — just enough to read as "the LMS".
function FauxPage() {
  const bar = (w, h = 10, bg = 'var(--surface-2)') => (
    <span style={{ display: 'block', width: w, height: h, borderRadius: 5, background: bg }}></span>
  );
  return (
    <div aria-hidden style={{ position: 'absolute', inset: 0, display: 'flex', background: 'var(--bg)' }}>
      <div style={{
        width: 250, flex: '0 0 auto', borderRight: '1px solid var(--line)',
        padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 14,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="flame"><Icon.flame /></span>
          <span style={{ fontWeight: 600, fontSize: 14 }}>UX Gym</span>
        </div>
        <div style={{ height: 8 }}></div>
        {[150, 180, 120, 165, 100, 140, 90].map((w, i) => <span key={i}>{bar(w)}</span>)}
      </div>
      <div style={{ flex: 1, padding: '44px 64px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {bar(120, 12, 'var(--orange-wash)')}
        {bar(380, 26)}
        <div style={{ height: 6 }}></div>
        {[520, 560, 480, 540, 360].map((w, i) => <span key={i}>{bar(w)}</span>)}
        <div style={{ height: 10 }}></div>
        <div style={{ width: 560, height: 150, borderRadius: 14, background: 'var(--surface)', border: '1px solid var(--line)' }}></div>
        {[540, 500, 380].map((w, i) => <span key={i}>{bar(w)}</span>)}
      </div>
    </div>
  );
}

function fireConfetti(canvas, batchType) {
  if (!canvas || !window.confetti) return null;
  const fxv = window.CelebFxStore ? window.CelebFxStore.get() : {};
  const total = fxv.confetti != null ? fxv.confetti : 130;
  if (total <= 0) return null;
  const conf = window.confetti.create(canvas, { resize: true, useWorker: false });
  const colors = CONFETTI_COLORS[batchType] || CONFETTI_COLORS.IGNITE;
  const t = setTimeout(() => {
    conf({ particleCount: Math.round(total * 0.6), spread: 72, startVelocity: 34, origin: { x: 0.5, y: 0.62 }, colors, ticks: 170, scalar: 0.9 });
    conf({ particleCount: Math.round(total * 0.2), angle: 62, spread: 48, startVelocity: 30, origin: { x: 0.38, y: 0.68 }, colors, ticks: 150, scalar: 0.8 });
    conf({ particleCount: Math.round(total * 0.2), angle: 118, spread: 48, startVelocity: 30, origin: { x: 0.62, y: 0.68 }, colors, ticks: 150, scalar: 0.8 });
  }, 380);
  return { stop: () => { clearTimeout(t); conf.reset(); } };
}

function BatchToggle({ batch, onChange }) {
  return (
    <div style={{
      position: 'absolute', left: 16, bottom: 14, zIndex: 30,
      display: 'flex', gap: 2, padding: 3, borderRadius: 999,
      background: 'rgba(14,13,11,0.7)', border: '1px solid rgba(255,255,255,0.12)',
      backdropFilter: 'blur(6px)',
    }}>
      {['IGNITE', 'BLAZE'].map((b) => (
        <button key={b} onClick={() => onChange(b)} className="mono" style={{
          fontSize: 10, letterSpacing: '0.1em', fontWeight: 600,
          padding: '5px 12px', borderRadius: 999,
          background: batch === b ? 'var(--orange)' : 'transparent',
          color: batch === b ? 'white' : 'rgba(255,255,255,0.55)',
          transition: 'background .15s, color .15s',
        }}>
          {b}
        </button>
      ))}
    </div>
  );
}

function CelebrationStage({ Card, defaultBatch = 'IGNITE' }) {
  const prm = usePRM();
  const [batch, setBatch] = useState(defaultBatch);
  const [open, setOpen] = useState(true);
  const [seq, setSeq] = useState(0);
  const canvasRef = useRef(null);
  const data = CELEB_DATA[batch];

  const replay = useCallback((b) => {
    setBatch((prev) => b || prev);
    setSeq((s) => s + 1);
    setOpen(true);
  }, []);
  const close = useCallback(() => setOpen(false), []);

  // confetti per reveal
  useEffect(() => {
    if (!open || prm) return;
    const handle = fireConfetti(canvasRef.current, batch);
    return () => handle && handle.stop();
  }, [open, seq, batch, prm]);

  const onKeyDown = useCallback((e) => {
    if (e.key === 'Escape' && open) { e.stopPropagation(); setOpen(false); }
  }, [open]);

  return (
    <div className="uxg celebStage" tabIndex={0} onKeyDown={onKeyDown}
      onMouseEnter={(e) => e.currentTarget.focus({ preventScroll: true })}
      style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', outline: 'none' }}>
      <CelebCSS />
      <FauxPage />

      {open && (
        <div key={seq} style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
          {/* dim + blur backdrop — click to dismiss */}
          <div className="celebBackdrop" onClick={close} style={{
            position: 'absolute', inset: 0,
            background: 'rgba(12,9,6,0.55)',
            backdropFilter: 'blur(7px) saturate(0.9)',
            WebkitBackdropFilter: 'blur(7px) saturate(0.9)',
          }}></div>

          {/* card */}
          <div style={{
            position: 'absolute', inset: 0, display: 'flex',
            alignItems: 'center', justifyContent: 'center', pointerEvents: 'none',
          }}>
            <div className="celebSpring" style={{ pointerEvents: 'auto' }}>
              <Card data={data} prm={prm} onClose={close} onContinue={close} />
            </div>
          </div>

          {/* confetti above everything, never blocks input */}
          <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 20 }}></canvas>
        </div>
      )}

      {!open && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <button onClick={() => replay()} className="btn" style={{
            background: 'var(--surface-dark)', color: 'var(--ink-on-dark)',
            height: 44, padding: '0 22px', borderRadius: 999,
            boxShadow: 'var(--shadow-lg)',
          }}>
            <svg viewBox="0 0 12 12" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 6a4 4 0 1 1-1.2-2.85M10 1.5v2.2H7.8"></path>
            </svg>
            Replay celebration
          </button>
        </div>
      )}

      <BatchToggle batch={batch} onChange={(b) => replay(b)} />
    </div>
  );
}

function CelebCSS() {
  return (
    <style>{`
      .celebBackdrop { animation: celebFade .35s ease both; }
      .celebSpring   { animation: celebSpring .68s cubic-bezier(.34,1.4,.45,1) .08s both; }
      .celebRise     { animation: celebRise .55s cubic-bezier(.22,1,.36,1) both; }
      .celebPop      { animation: celebPop .4s cubic-bezier(.34,1.56,.64,1) both; }
      .celebStamp    { animation: celebStampIn .5s cubic-bezier(.34,1.45,.55,1) .85s both; }

      @keyframes celebFade   { from { opacity: 0; } to { opacity: 1; } }
      @keyframes celebSpring { from { opacity: 0; transform: scale(.74) translateY(30px); }
                               to   { opacity: 1; transform: scale(1) translateY(0); } }
      @keyframes celebRise   { from { opacity: 0; transform: translateY(10px); }
                               to   { opacity: 1; transform: translateY(0); } }
      @keyframes celebPop    { from { opacity: 0; transform: scale(.3); }
                               to   { opacity: 1; transform: scale(1); } }
      @keyframes celebStampIn { from { opacity: 0; transform: rotate(8deg) scale(1.5); }
                                to   { opacity: 1; transform: rotate(8deg) scale(1); } }

      @media (prefers-reduced-motion: reduce) {
        .celebBackdrop, .celebSpring, .celebRise, .celebPop, .celebStamp {
          animation: celebFade .4s ease both;
        }
      }
    `}</style>
  );
}

// ---------------------------------------------------------------- export

function CelebrationDaylight()    { return <CelebrationStage Card={DaylightCard} defaultBatch="IGNITE" />; }
function CelebrationEmber()       { return <CelebrationStage Card={EmberCard} defaultBatch="BLAZE" />; }
function CelebrationCertificate() { return <CelebrationStage Card={CertificateCard} defaultBatch="IGNITE" />; }

Object.assign(window, { CelebrationDaylight, CelebrationEmber, CelebrationCertificate });
