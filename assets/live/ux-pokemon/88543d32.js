/* global React, window */
// ─────────────────────────────────────────────────────────────────────────
//  UX Pokémon · v2 — THE READ (view).
//  A warm, enlightening letter written to one person — never a form. No
//  numbered tags, no all-caps eyebrows; only the warm sentence-case headings
//  from the content appear, and the reveal carries none. Generous breathing
//  space, one consistent type scale, editorial gem dividers for rhythm.
//  Words live in pk2-read-content.jsx.
// ─────────────────────────────────────────────────────────────────────────

const { useState: rState } = React;

const R_SERIF = "'Instrument Serif',Georgia,serif";
const R_SANS = "'Geist',system-ui,sans-serif";
const R_MONO = "'Geist Mono',monospace";
const R_INK = '#FAF6F0', R_INK2 = 'rgba(250,246,240,0.84)', R_INK3 = 'rgba(250,246,240,0.5)';

// one consistent system
const R_GAP = 96;          // vertical rhythm between sections
const R_MAX = 720;         // reading measure
const R_RAD = 22;          // panel radius
const R_PANEL = 'clamp(26px,4vw,38px)'; // panel padding

// ── primitives ───────────────────────────────────────────────────────────────
function SecGem({ a, light, size = 15 }) {
  return (
    <span aria-hidden style={{ position: 'relative', width: size, height: size, borderRadius: '50%', padding: size * 0.09, flexShrink: 0,
      background: `conic-gradient(from 130deg, ${light}, ${a.color} 40%, #fff 60%, ${light})`, boxShadow: `0 0 10px -1px rgba(${a.glowRGB},0.85)` }}>
      <span style={{ display: 'block', width: '100%', height: '100%', borderRadius: '50%', background: `radial-gradient(circle at 40% 34%, ${a.color}, ${a.deep} 80%, #0B0806)` }}></span>
    </span>
  );
}

// editorial divider — a centred gem between two fading hairlines. Pure rhythm.
function Divider({ a, light }) {
  const line = (dir) => ({ flex: 1, height: 1, background: `linear-gradient(${dir}, transparent, rgba(255,255,255,0.16))` });
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 18, margin: '0 auto 40px', maxWidth: 360 }}>
      <span aria-hidden style={line('90deg')}></span>
      <SecGem a={a} light={light} size={13} />
      <span aria-hidden style={line('270deg')}></span>
    </div>
  );
}

function Sec({ heading, a, light, children, first, max = R_MAX }) {
  return (
    <section style={{ width: '100%', maxWidth: max, margin: '0 auto', paddingTop: first ? 0 : R_GAP, textAlign: 'left' }}>
      {!first && <Divider a={a} light={light} />}
      {heading && <h2 style={{ fontFamily: R_SERIF, fontWeight: 400, fontSize: 'clamp(29px,4vw,42px)', lineHeight: 1.1, letterSpacing: '-.018em', color: R_INK, margin: '0 0 26px', textAlign: 'center', textWrap: 'balance' }}>{heading}</h2>}
      {children}
    </section>
  );
}

function Para({ children, lead }) {
  return <p style={{ fontFamily: R_SANS, fontSize: lead ? 18.5 : 17, lineHeight: 1.78, color: lead ? R_INK : R_INK2, margin: '0 0 20px', textWrap: 'pretty' }}>{children}</p>;
}

// prose — one consistent body voice (sans). First paragraph reads a touch
// larger as a lead. No italic, no serif in the reading flow.
function Prose({ items }) {
  return <React.Fragment>{items.map((t, i) => <Para key={i} lead={i === 0}>{t}</Para>)}</React.Fragment>;
}

// ── the five parts rail ──────────────────────────────────────────────────────
function PartsRail({ top, accent }) {
  const A = window.POKEMON.ARCH, L = window.POKEMON.LABELS;
  const order = ['EYE', 'HEART', 'BRAIN', 'HAND', 'FACE'];
  return (
    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', gap: 'clamp(16px,5vw,46px)', alignItems: 'flex-end', flexWrap: 'wrap', margin: '8px 0 40px' }}>
      {order.map((t) => {
        const on = t === top, a = A[t], sz = on ? 66 : 42;
        return (
          <div key={t} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <div className={on ? 'pk2GlowP' : ''} style={{ position: 'relative', width: sz, height: sz, borderRadius: '50%', padding: on ? 3 : 2,
              background: on ? `conic-gradient(from 130deg, ${a.light}, ${a.color} 30%, ${a.deep} 54%, #fff 64%, ${a.color})` : 'rgba(255,255,255,0.13)',
              boxShadow: on ? `0 0 28px -2px rgba(${a.glowRGB},0.85)` : 'none', opacity: on ? 1 : 0.55 }}>
              <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: `radial-gradient(circle at 40% 34%, ${a.color}, ${a.deep} 78%, #0B0806)`, boxShadow: 'inset 0 2px 6px rgba(255,255,255,0.25), inset 0 -8px 16px rgba(0,0,0,0.5)' }}></div>
            </div>
            <span style={{ fontFamily: R_SANS, fontSize: on ? 15 : 13, fontWeight: on ? 700 : 500, color: on ? R_INK : R_INK3, letterSpacing: '-.01em' }}>{L[t]}</span>
          </div>
        );
      })}
    </div>
  );
}

// ── the playful Pokédex entry (a thematic visual, not a section label) ───────
function DexCard({ top, dex }) {
  const A = window.POKEMON.ARCH, CFG = window.PK2.CFG;
  const a = A[top], cfg = CFG[top], light = cfg.shine[0];
  const m = dex.title.match(/^(.*?)(?:\.\s*([A-Za-z]+ type)\.?)?$/);
  const lead = m ? m[1].replace(/\.\s*$/, '') : dex.title;
  return (
    <div style={{ position: 'relative', borderRadius: R_RAD, overflow: 'hidden', border: `1px solid rgba(${a.glowRGB},0.3)`, background: `linear-gradient(168deg, ${a.deep} 0%, #120D0A 60%, #0B0806 100%)`, boxShadow: `0 0 50px -16px rgba(${a.glowRGB},0.4), 0 30px 70px -40px rgba(0,0,0,0.7)` }}>
      <div aria-hidden style={{ position: 'absolute', inset: 0, opacity: 0.4, backgroundImage: 'radial-gradient(rgba(255,255,255,0.16) 1px, transparent 1px)', backgroundSize: '17px 17px', maskImage: 'linear-gradient(180deg,#000,transparent 75%)', WebkitMaskImage: 'linear-gradient(180deg,#000,transparent 75%)' }}></div>
      <div aria-hidden style={{ position: 'absolute', top: -60, right: -40, width: 260, height: 260, background: `radial-gradient(circle, rgba(${a.glowRGB},0.4), transparent 66%)`, filter: 'blur(8px)', pointerEvents: 'none' }}></div>
      <div style={{ position: 'relative', padding: R_PANEL }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 18 }}>
          <SecGem a={a} light={light} size={20} />
          <span style={{ fontFamily: R_MONO, fontSize: 11, letterSpacing: '.14em', color: 'rgba(255,255,255,0.55)' }}>Pokédex · Nº&nbsp;{cfg.num}</span>
        </div>
        <h3 style={{ fontFamily: R_SERIF, fontWeight: 400, fontSize: 'clamp(25px,3.4vw,33px)', lineHeight: 1.12, letterSpacing: '-.01em', color: light, margin: '0 0 16px', textShadow: `0 0 22px rgba(${a.glowRGB},0.5)` }}>{lead}.</h3>
        <p style={{ fontFamily: R_SERIF, fontStyle: 'italic', fontSize: 19, lineHeight: 1.64, color: 'rgba(250,246,240,0.9)', margin: 0, textWrap: 'pretty' }}>{dex.body}</p>
      </div>
    </div>
  );
}


// the share band — the first thing under the card, at peak excitement
function ShareBand({ glow }) {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: R_MAX, margin: '0 auto', borderRadius: R_RAD, overflow: 'hidden', padding: R_PANEL,
      background: `linear-gradient(135deg, rgba(${glow},0.15), rgba(${glow},0.04))`, border: `1px solid rgba(${glow},0.3)`, textAlign: 'center' }}>
      <div aria-hidden style={{ position: 'absolute', top: -100, left: '50%', transform: 'translateX(-50%)', width: 380, height: 240, background: `radial-gradient(circle, rgba(${glow},0.32), transparent 66%)`, filter: 'blur(12px)', pointerEvents: 'none' }}></div>
      <div style={{ position: 'relative' }}>
        <h2 style={{ fontFamily: R_SERIF, fontWeight: 400, fontSize: 'clamp(27px,3.8vw,38px)', lineHeight: 1.1, letterSpacing: '-.018em', color: R_INK, margin: '0 0 14px', textWrap: 'balance' }}>Show the world the designer you are.</h2>
        <p style={{ fontFamily: R_SANS, fontSize: 16, lineHeight: 1.6, color: R_INK2, margin: '0 auto 26px', maxWidth: 520, textWrap: 'pretty' }}>Download your card and post it on LinkedIn with #UXGym by UX Anudeep, and tell people what it says about the designer you are.</p>
        
      </div>
    </div>
  );
}

// ── THE READ ─────────────────────────────────────────────────────────────────
function ReadBelow({ result, copy, answers, exporting, cardRef }) {
  const C = window.PK2ReadContent;
  const P = window.POKEMON;
  const RadarChart = window.PokemonEmblems.RadarChart;
  const top = result.top;
  const a = P.ARCH[top], L = P.LABELS;
  const accent = a.color, glow = a.glowRGB, light = window.PK2.CFG[top].shine[0];
  const read = C.READ[top], S = C.SHARED;
  const gem = { a, light };

  // the opening, in their own words — 2–3 of their own answers, woven as prose
  const opening = C.buildThread(answers, result).slice(0, 3);

  return (
    <div style={{ position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch', paddingTop: 8, paddingBottom: 40 }}>

      {/* share — at the top, at peak excitement */}
      <ShareBand glow={glow} />

      {/* the opening (their own words) → flows straight into the reveal. No heading. */}
      <Sec {...gem}>
        {opening.length > 0 && (
          <p style={{ fontFamily: R_SANS, fontSize: 'clamp(16px,1.9vw,18px)', lineHeight: 1.72, color: R_INK3, margin: '0 auto 22px', maxWidth: 620, textAlign: 'center', textWrap: 'pretty' }}>{opening.join(' ')}</p>
        )}
        <p style={{ fontFamily: R_SERIF, fontWeight: 400, fontSize: 'clamp(32px,5vw,52px)', lineHeight: 1.06, letterSpacing: '-.022em', color: R_INK, margin: '0 0 28px', textAlign: 'center', textWrap: 'balance' }}>
          You are <span style={{ color: light, textShadow: `0 0 28px rgba(${glow},0.55)` }}>{a.name}</span>.<br />You lead with the <span style={{ color: light }}>{L[top]}</span>.
        </p>
        <Para lead>{read.revealBody}</Para>
      </Sec>

      {/* every designer is built from five parts */}
      <Sec {...gem} heading="Every designer is built from five parts">
        <PartsRail top={top} accent={accent} />
        <Prose items={S.fiveParts} />
      </Sec>

      {/* how you move through the world */}
      <Sec {...gem} heading="How you move through the world">
        <Prose items={read.move} />
      </Sec>

      {/* why your [type] is a designer's superpower — the enlightening turn */}
      <Sec {...gem} heading={`Why your ${L[top]} is a designer's superpower`}>
        <div style={{ position: 'relative', borderRadius: R_RAD, padding: R_PANEL, overflow: 'hidden', background: `linear-gradient(180deg, rgba(${glow},0.1), rgba(${glow},0.025))`, border: `1px solid rgba(${glow},0.24)` }}>
          <div aria-hidden style={{ position: 'absolute', top: -80, left: '50%', transform: 'translateX(-50%)', width: 420, height: 220, background: `radial-gradient(circle, rgba(${glow},0.28), transparent 66%)`, filter: 'blur(10px)', pointerEvents: 'none' }}></div>
          <div style={{ position: 'relative' }}>
            {read.superpower.map((t, i) => <Para key={i} lead={i === 0}>{t}</Para>)}
          </div>
        </div>
      </Sec>

      {/* your own shape — assembled live from their graph */}
      <Sec {...gem} heading="Your own shape">
        <Para>{S.shapeIntro}</Para>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '28px 0 30px' }}>
          <div style={{ position: 'relative', filter: `drop-shadow(0 0 18px rgba(${glow},0.42))` }}>
            <RadarChart score={result.score} color={light} fill={`rgba(${glow},0.28)`} size={266} showLabels showDots ringColor="rgba(255,255,255,0.13)" labelColor="rgba(250,246,240,0.86)" labelSize={22} strokeW={4} />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, margin: '0 0 26px' }}>
          <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <span aria-hidden style={{ flexShrink: 0, marginTop: 8, width: 10, height: 10, borderRadius: '50%', background: light, boxShadow: `0 0 12px ${light}` }}></span>
            <p style={{ margin: 0, fontFamily: R_SANS, fontSize: 17, lineHeight: 1.78, color: R_INK }}>{copy.gift}</p>
          </div>
          <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <span aria-hidden style={{ flexShrink: 0, marginTop: 8, width: 10, height: 10, borderRadius: '50%', background: 'rgba(255,255,255,0.32)' }}></span>
            <p style={{ margin: 0, fontFamily: R_SANS, fontSize: 17, lineHeight: 1.78, color: R_INK2 }}>{copy.growth}</p>
          </div>
        </div>
        <Para>{S.shapeClose}</Para>
      </Sec>

      {/* the other side */}
      <Sec {...gem} heading="The other side">
        <Prose items={read.otherSide} />
      </Sec>

      {/* the pokédex entry */}
      <Sec {...gem}>
        <DexCard top={top} dex={read.pokedex} />
      </Sec>

      {/* where you go from here */}
      <Sec {...gem} heading="Where you go from here">
        <Prose items={read.whereYouGo} />
      </Sec>

      {/* a note from UX Anudeep */}
      <Sec {...gem}>
        <div style={{ position: 'relative', borderRadius: R_RAD, padding: R_PANEL, background: 'linear-gradient(180deg, rgba(255,138,74,0.07), rgba(255,138,74,0.02))', border: '1px solid rgba(255,138,74,0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <span style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(150deg, #FF8A4A, #FF450F)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: R_SERIF, fontStyle: 'italic', fontSize: 20, color: '#fff', boxShadow: '0 0 18px -4px rgba(255,69,15,0.7)' }}>A</span>
            <span style={{ fontFamily: R_SERIF, fontSize: 19, color: R_INK2 }}>A note from UX Anudeep</span>
          </div>
          <p style={{ fontFamily: R_SERIF, fontStyle: 'italic', fontSize: 'clamp(20px,2.7vw,25px)', lineHeight: 1.52, color: R_INK, margin: 0, textWrap: 'pretty' }}>{read.anudeep}</p>
          <div style={{ marginTop: 22, fontFamily: R_SANS, fontWeight: 600, fontSize: 15, color: R_INK2 }}>— UX Anudeep</div>
        </div>
      </Sec>

      {/* closing share reprise */}
      <Sec {...gem}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: R_SERIF, fontWeight: 400, fontSize: 'clamp(24px,3.2vw,34px)', lineHeight: 1.16, letterSpacing: '-.015em', color: R_INK, margin: '0 auto 28px', maxWidth: 520, textWrap: 'balance' }}>This is the first thing you get to show the world. Download it and post it on LinkedIn with #UXGym by UX Anudeep, and tell people what it says about you.</p>
          
        </div>
      </Sec>
    </div>
  );
}

window.PK2Read = { ReadBelow };
