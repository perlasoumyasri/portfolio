/* global React */
// ─────────────────────────────────────────────────────────────────────────
//  UX Pokémon · v2 — THE OPENING.
//  "The UX Pokémon you are." Minimal copy, the prize teased as a living fan
//  of face-down cards (no spoiler), drifting in 3D. Starting feels effortless.
// ─────────────────────────────────────────────────────────────────────────

const { useState: wState, useRef: wRef, useEffect: wEffect } = React;

function W_Logo({ h = 26 }) {
  const BrandMark = window.PokemonCard.BrandMark;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: Math.round(h * 0.34) }}>
      <BrandMark size={Math.round(h * 1.02)} />
      <span style={{ fontFamily: "'Geist',sans-serif", fontWeight: 700, fontSize: Math.round(h * 0.74), letterSpacing: '-0.02em', color: '#1A1611' }}>UX&nbsp;Gym</span>
    </span>
  );
}

function W_Begin({ onClick }) {
  const [h, setH] = wState(false);
  return (
    <button type="button" onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ border: 'none', borderRadius: 999, padding: '18px 46px', fontSize: 17, fontWeight: 600, fontFamily: "'Geist',sans-serif", cursor: 'pointer',
        background: 'linear-gradient(180deg, #FF5C28 0%, #FF450F 100%)', color: '#fff', display: 'inline-flex', alignItems: 'center', gap: 11,
        boxShadow: h
          ? '0 0 0 4px rgba(255,69,15,0.14), inset 0 1px 0 rgba(255,255,255,0.32), 0 6px 16px -4px rgba(255,69,15,0.5), 0 26px 52px -16px rgba(255,69,15,0.66)'
          : 'inset 0 1px 0 rgba(255,255,255,0.28), 0 3px 10px -3px rgba(255,69,15,0.45), 0 16px 34px -14px rgba(255,69,15,0.55)',
        transform: h ? 'translateY(-2px) scale(1.015)' : 'none', transition: 'transform .22s cubic-bezier(.34,1.4,.5,1), box-shadow .25s ease' }}>
      Begin
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
    </button>
  );
}

// ── floating fan of face-down cards (the prize, no spoiler) ─────────────────
function CardFan() {
  const { GlimpseCard } = window.PK2Glimpse;
  const stage = wRef(null);
  const [par, setPar] = wState({ x: 0, y: 0 });
  const prm = window.PokemonCard.usePRM();

  wEffect(() => {
    if (prm) return;
    const el = stage.current; if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      setPar({ x: (e.clientX - (r.left + r.width / 2)) / r.width, y: (e.clientY - (r.top + r.height / 2)) / r.height });
    };
    const onLeave = () => setPar({ x: 0, y: 0 });
    el.addEventListener('mousemove', onMove); el.addEventListener('mouseleave', onLeave);
    return () => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave); };
  }, [prm]);

  // five sealed cards fanned in an arc — one colour world each; centre forward
  const fan = [
    { t: 'EYE',   rot: -22, x: -270, y: 46, z: 1, s: 0.86, d: 0.0 },
    { t: 'HEART', rot: -11, x: -142, y: 8, z: 2, s: 0.93, d: 0.6 },
    { t: 'HAND',  rot: 0, x: 0, y: -8, z: 3, s: 1.0, d: 0.3 },
    { t: 'BRAIN', rot: 11, x: 142, y: 8, z: 2, s: 0.93, d: 0.9 },
    { t: 'FACE',  rot: 22, x: 270, y: 46, z: 1, s: 0.86, d: 1.2 },
  ];

  return (
    <div ref={stage} style={{ position: 'relative', width: '100%', height: 440, display: 'flex', alignItems: 'center', justifyContent: 'center', perspective: 1400 }}>
      {/* breathing ground glow */}
      <div aria-hidden className={prm ? '' : 'pk2Breathe'} style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', width: 760, height: 380, background: 'radial-gradient(closest-side, rgba(255,86,30,0.2), rgba(255,69,15,0.07) 52%, transparent 74%)', filter: 'blur(10px)' }}></div>
      {/* soft floor reflection */}
      <div aria-hidden style={{ position: 'absolute', bottom: 56, left: '50%', transform: 'translateX(-50%)', width: 460, height: 30, background: 'radial-gradient(closest-side, rgba(20,15,10,0.16), transparent 76%)', filter: 'blur(7px)' }}></div>
      {fan.map((c, i) => (
        <div key={i} style={{ position: 'absolute', zIndex: c.z,
          transform: `translateX(${c.x + par.x * (12 + c.z * 8)}px) translateY(${c.y + par.y * (8 + c.z * 6)}px) rotate(${c.rot + par.x * 3}deg) scale(${c.s})`,
          transition: 'transform .35s cubic-bezier(.22,1,.36,1)', transformStyle: 'preserve-3d' }}>
          <div className={prm ? '' : 'pk2Deal'} style={{ animationDelay: (0.42 + i * 0.09) + 's' }}>
            <div className={prm ? '' : 'pk2FloatSlow'} style={{ animationDelay: c.d + 's' }}>
              <div style={{ position: 'relative', transform: `rotateY(${par.x * 8}deg) rotateX(${-par.y * 6}deg)`, transformStyle: 'preserve-3d' }}>
                <GlimpseCard typeKey={c.t} w={184} sheenDelay={i * 0.7} prm={prm} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Welcome({ onBegin }) {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* ambient */}
      <div aria-hidden style={{ position: 'absolute', top: '-22%', left: '50%', transform: 'translateX(-50%)', width: 1100, height: 760, background: 'radial-gradient(circle, rgba(255,69,15,0.09) 0%, transparent 62%)', pointerEvents: 'none' }}></div>
      <div style={{ position: 'relative', padding: '28px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} className="pk2Rise">
        <W_Logo h={28} />
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 15px', borderRadius: 999, background: '#fff', border: '1px solid rgba(33,30,26,0.1)', fontFamily: "'Geist Mono',monospace", fontSize: 11, letterSpacing: '.1em', color: '#6B6358' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF450F' }}></span>YOUR FIRST DRILL
        </span>
      </div>

      <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '6px 24px 30px', textAlign: 'center' }}>
        <div className="pk2Rise" style={{ animationDelay: '.06s', fontFamily: "'Geist Mono',monospace", fontSize: 12, letterSpacing: '.2em', textTransform: 'uppercase', color: '#FF450F', marginBottom: 18 }}>5 types · 1 is unmistakably you</div>
        <h1 className="pk2Rise" style={{ animationDelay: '.15s', fontFamily: "'Instrument Serif',Georgia,serif", fontWeight: 400, fontSize: 'clamp(44px,7.4vw,80px)', lineHeight: 1.05, letterSpacing: '-.025em', margin: 0, color: '#15110D', textWrap: 'balance' }}>
          The UX&nbsp;Pokémon <span style={{ fontStyle: 'italic', color: '#FF450F', textShadow: '0 0 28px rgba(255,69,15,0.34)' }}>you</span> are.
        </h1>
        <p className="pk2Rise" style={{ animationDelay: '.27s', margin: '24px 0 0', maxWidth: 620, fontSize: 19, lineHeight: 1.55, color: '#5A544B', textWrap: 'balance' }}>
          A few honest questions reveal <span style={{ color: '#15110D', fontWeight: 600 }}>your identity as a designer</span> through the UX&nbsp;Pokémon type that <span style={{ color: '#15110D', fontWeight: 600 }}>symbolises you</span>.
        </p>

        <div className="pk2Rise" style={{ animationDelay: '.36s', width: '100%', maxWidth: 980, marginTop: 6 }}><CardFan /></div>

        <div className="pk2Rise" style={{ animationDelay: '.62s', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, marginTop: 2 }}>
          <W_Begin onClick={onBegin} />
          <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: 11.5, letterSpacing: '.06em', color: '#A8A095' }}>No right answers. Just you.</span>
        </div>
      </div>
    </div>
  );
}

window.PK2Welcome = { Welcome };
