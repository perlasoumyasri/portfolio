/* global React */
// ─────────────────────────────────────────────────────────────────────────
//  UX Pokémon · v2 — THE FLOW.
//  Each question is its own moment. The room's colour shifts beneath you,
//  type transforms, transitions are cinematic. Progress is an ambient hairline
//  — never a count. Time disappears. (Question data + scoring unchanged.)
// ─────────────────────────────────────────────────────────────────────────

const { useState: fState } = React;
const F_INK = '#15110D', F_INK2 = '#5A544B', F_INK3 = '#A8A095', F_LINE = 'rgba(33,30,26,0.12)', F_OR = '#FF450F';
const F_MINREFLECT = 25;

// the room's wash cycles through the five type worlds as you move
function washFor(i) {
  const A = window.POKEMON.ARCH;
  const order = ['HAND', 'EYE', 'HEART', 'BRAIN', 'FACE'];
  return A[order[i % order.length]];
}

function f_shuffle(map, key, n) {
  if (!map[key]) { const a = Array.from({ length: n }, (_, i) => i); for (let i = n - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const t = a[i]; a[i] = a[j]; a[j] = t; } map[key] = a; }
  return map[key];
}

function FCheck({ size = 12, style }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" style={style}><path d="M5 12.5l4.3 4.5L19 7" /></svg>;
}

// ── character: drifting guilloché "foil" behind the whole drill ──────────────
function FoilField() {
  const { Guilloche } = window.PK2;
  return (
    <React.Fragment>
      <div aria-hidden className="pk2Spin" style={{ position: 'absolute', top: '-22%', left: '-10%', mixBlendMode: 'multiply', pointerEvents: 'none' }}>
        <Guilloche size={640} color="rgba(255,69,15,0.07)" petals={38} strokeWidth={0.6} />
      </div>
      <div aria-hidden className="pk2Rays" style={{ position: 'absolute', bottom: '-30%', right: '-12%', mixBlendMode: 'multiply', pointerEvents: 'none' }}>
        <Guilloche size={540} color="rgba(33,30,26,0.05)" petals={30} rx={0.5} ry={0.5} strokeWidth={0.6} />
      </div>
    </React.Fragment>
  );
}

// per-question-type prompt identity (label + glyph) — never a colour
const F_KIND = {
  mc:         { label: 'Choose what is true', d: 'M5 12.5l4.3 4.5L19 7' },
  choose:     { label: 'Choose up to three', d: 'M4 8l8-4 8 4-8 4-8-4zM4 12l8 4 8-4M4 16l8 4 8-4' },
  wyr:        { label: 'Which is more you', d: 'M7 4v6a4 4 0 0 0 4 4h2a4 4 0 0 1 4 4v2M17 4v3' },
  scale:      { label: 'How true is this', d: 'M4 18a8 8 0 0 1 16 0M12 18l4-5' },
  reflection: { label: 'A moment, just for you', d: 'M12 3v3M12 18v3M3 12h3M18 12h3M6.3 6.3l2 2M15.7 15.7l2 2M17.7 6.3l-2 2M8.3 15.7l-2 2' },
};
const F_WHISPER = ['No wrong answers.', 'Trust the first instinct.', 'Just be honest.', 'Take your time.', 'Only you know this.'];

function EyebrowChip({ kind }) {
  const m = F_KIND[kind]; if (!m) return null;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 14px 7px 11px', borderRadius: 999, border: '1px solid rgba(255,69,15,0.32)', background: 'rgba(255,69,15,0.07)', fontFamily: "'Geist Mono',monospace", fontSize: 12, letterSpacing: '.14em', textTransform: 'uppercase', color: F_OR, whiteSpace: 'nowrap' }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={m.d} /></svg>
      {m.label}
    </span>
  );
}

function FOption({ kind, selected, dim, accent, children, onClick, delay }) {
  const [h, setH] = fState(false);
  const isWyr = kind === 'wyr';
  const base = isWyr
    ? { position: 'relative', flex: '1 1 220px', minHeight: 'clamp(120px,20vw,180px)', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 'clamp(18px,3vw,28px)', borderRadius: 22, fontSize: 'clamp(16px,2.3vw,19px)', lineHeight: 1.36, fontWeight: 500 }
    : { display: 'flex', alignItems: 'center', gap: 15, width: '100%', textAlign: 'left', padding: 'clamp(13px,2.4vw,17px) clamp(15px,3.2vw,20px)', borderRadius: 16, fontSize: 'clamp(14.5px,2vw,16.5px)', lineHeight: 1.45 };
  const on = selected, hov = h && !selected;
  const st = {
    ...base, fontFamily: "'Geist',sans-serif", color: F_INK, cursor: 'pointer', outline: 'none', background: '#fff',
    border: '1px solid ' + (on ? accent : (hov ? 'rgba(33,30,26,0.22)' : F_LINE)),
    boxShadow: on ? `0 0 0 1.5px ${accent}, 0 18px 40px -14px ${accent}66` : (hov ? '0 12px 26px -12px rgba(33,30,26,0.22)' : '0 2px 8px rgba(33,30,26,0.04)'),
    transform: on ? 'translateY(-2px)' : (hov ? 'translateY(-2px)' : 'none'), opacity: dim ? 0.5 : 1,
    transition: 'all .16s ease', animationDelay: (delay || 0) + 's',
  };
  return <button type="button" className="pk2Opt" onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={st}>{children}</button>;
}

function FScaleDot({ selected, size, label, accent, onClick }) {
  const [h, setH] = fState(false);
  return (
    <button type="button" title={label} aria-label={label} onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ width: size, height: size, borderRadius: '50%', border: '2px solid ' + (selected ? accent : (h ? accent + 'aa' : 'rgba(33,30,26,0.18)')), background: selected ? accent : '#fff', cursor: 'pointer', transition: 'all .16s ease', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transform: h && !selected ? 'scale(1.12)' : 'none', boxShadow: selected ? `0 0 0 2px ${accent}40, 0 12px 26px -8px ${accent}88` : (h ? `0 10px 22px -8px ${accent}66` : '0 2px 6px rgba(33,30,26,0.05)') }}>
      <span style={{ width: '38%', height: '38%', borderRadius: '50%', background: selected ? '#fff' : 'rgba(33,30,26,0.14)' }}></span>
    </button>
  );
}

function FReflect({ value, onChange, accent }) {
  const [f, setF] = fState(false);
  return (
    <textarea value={value} onChange={(e) => onChange(e.target.value)} onFocus={() => setF(true)} onBlur={() => setF(false)}
      placeholder="Take your time. Write it the way it really happened."
      style={{ width: '100%', minHeight: 210, border: '1px solid ' + (f ? accent : F_LINE), borderRadius: 18, background: '#fff', padding: '22px 24px', fontFamily: "'Geist',sans-serif", fontSize: 18, lineHeight: 1.62, color: F_INK, resize: 'vertical', outline: 'none', transition: 'border-color .15s ease, box-shadow .2s ease', boxShadow: f ? `0 0 0 4px ${accent}1f` : '0 2px 8px rgba(33,30,26,0.03)' }}></textarea>
  );
}

function FBack({ onClick }) {
  const [h, setH] = fState(false);
  return <button type="button" onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'transparent', border: 'none', color: h ? F_INK : '#8A847B', fontSize: 15, cursor: 'pointer', padding: '8px 2px', transition: 'color .15s ease' }}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>Back</button>;
}

function FContinue({ onClick, disabled, accent }) {
  const [h, setH] = fState(false);
  return (
    <button type="button" onClick={onClick} disabled={disabled} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ border: 'none', borderRadius: 999, padding: '14px 32px', fontSize: 15.5, fontWeight: 600, fontFamily: "'Geist',sans-serif", cursor: disabled ? 'not-allowed' : 'pointer',
        background: disabled ? 'rgba(33,30,26,0.07)' : accent, color: disabled ? '#B0A89C' : '#fff', display: 'inline-flex', alignItems: 'center', gap: 9,
        boxShadow: disabled ? 'none' : (h ? `0 16px 36px -12px ${accent}99` : `0 10px 22px -10px ${accent}88`), transform: !disabled && h ? 'translateY(-2px)' : 'none', transition: 'all .16s ease' }}>
      Continue<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
    </button>
  );
}

function Flow({ flow, stepIndex, answers, shuffleMap, onSelect, onToggle, onReflect, onBack, onContinue, screenKey }) {
  const it = flow[stepIndex];
  const total = flow.length;
  const pct = ((stepIndex) / (total - 1)) * 100;
  const accent = F_OR; // neutral brand accent — type colours stay hidden until the reveal
  const BrandMark = window.PokemonCard.BrandMark;

  let body = null, showContinue = false, continueDisabled = true, eyebrow = '';

  if (it.kind === 'mc' || it.kind === 'choose') {
    const order = f_shuffle(shuffleMap, it.key, it.options.length);
    const sel = answers[it.key];
    const isCh = it.kind === 'choose';
    const selCount = Array.isArray(sel) ? sel.length : 0;
    eyebrow = isCh ? 'Choose up to three' : 'Choose what is true';
    body = (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 11, marginTop: 32 }}>
        {order.map((oi, mi) => {
          const opt = it.options[oi];
          const selected = isCh ? (Array.isArray(sel) && sel.indexOf(oi) >= 0) : sel === oi;
          const dim = isCh && !selected && selCount >= 3;
          const sq = isCh;
          return (
            <FOption key={oi} kind={it.kind} selected={selected} dim={dim} accent={accent} delay={0.05 + mi * 0.05} onClick={() => isCh ? onToggle(it.key, oi) : onSelect(it.key, oi)}>
              <span style={{ flexShrink: 0, width: 22, height: 22, borderRadius: sq ? 7 : '50%', border: '2px solid ' + (selected ? accent : 'rgba(33,30,26,0.2)'), background: selected ? accent : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .16s ease' }}>
                <FCheck style={{ opacity: selected ? 1 : 0, transform: selected ? 'scale(1)' : 'scale(.4)', transition: 'all .18s cubic-bezier(.34,1.56,.64,1)' }} />
              </span>
              <span style={{ flex: 1 }}>{opt.text}</span>
            </FOption>
          );
        })}
      </div>
    );
    if (isCh) { showContinue = true; continueDisabled = selCount < 1; }
  } else if (it.kind === 'wyr') {
    const order = f_shuffle(shuffleMap, it.key, it.options.length);
    const sel = answers[it.key];
    eyebrow = 'Which is more you';
    body = (
      <div style={{ position: 'relative', display: 'flex', flexWrap: 'wrap', gap: 18, marginTop: 34, alignItems: 'stretch' }}>
        {order.map((oi, mi) => {
          const opt = it.options[oi];
          const selected = sel === oi;
          return (
            <FOption key={oi} kind="wyr" selected={selected} accent={accent} delay={0.06 + mi * 0.08} onClick={() => onSelect(it.key, oi)}>
              <span style={{ position: 'absolute', top: 14, right: 14, width: 28, height: 28, borderRadius: '50%', background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: selected ? 1 : 0, transform: selected ? 'scale(1)' : 'scale(.4)', transition: 'all .2s cubic-bezier(.34,1.56,.64,1)', boxShadow: `0 4px 12px -2px ${accent}88` }}><FCheck size={15} /></span>
              {opt.text}
            </FOption>
          );
        })}
        <span aria-hidden style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 46, height: 46, borderRadius: '50%', background: '#FBF9F3', border: '1px solid ' + F_LINE, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Instrument Serif',serif", fontStyle: 'italic', fontSize: 17, color: F_INK3, zIndex: 3, pointerEvents: 'none' }}>or</span>
      </div>
    );
  } else if (it.kind === 'scale') {
    const sel = answers[it.key];
    const sizes = [44, 52, 60, 68, 76];
    const labels = ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree'];
    body = (
      <div style={{ marginTop: 50 }}>
        <div style={{ position: 'relative', maxWidth: 540, margin: '0 auto' }}>
          <div style={{ position: 'absolute', left: 22, right: 22, top: '50%', height: 3, background: `linear-gradient(90deg, rgba(33,30,26,0.08), ${accent}55, rgba(33,30,26,0.08))`, transform: 'translateY(-1.5px)', borderRadius: 99 }}></div>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
            {[1, 2, 3, 4, 5].map((v, i) => <FScaleDot key={v} selected={sel === v} size={sizes[i]} label={labels[i]} accent={accent} onClick={() => onSelect(it.key, v)} />)}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: 540, margin: '18px auto 0', fontFamily: "'Geist Mono',monospace", fontSize: 11, letterSpacing: '.05em', textTransform: 'uppercase', color: F_INK3 }}>
          <span>Strongly disagree</span><span>Strongly agree</span>
        </div>
      </div>
    );
  } else if (it.kind === 'reflection') {
    eyebrow = 'A moment, just for you';
    const val = answers[it.key] || '';
    const met = val.trim().length >= F_MINREFLECT;
    body = (
      <div style={{ marginTop: 28 }}>
        <FReflect value={val} onChange={(v) => onReflect(it.key, v)} accent={accent} />
        <div style={{ marginTop: 12, fontFamily: "'Geist Mono',monospace", fontSize: 12, color: F_INK3 }}>{met ? 'Ready whenever you are.' : (val.trim().length === 0 ? 'Write as much or as little as feels true.' : 'A few more words, then you can continue.')}</div>
      </div>
    );
    showContinue = true; continueDisabled = !met;
  }

  const nn = String(stepIndex + 1).padStart(2, '0');
  const tt = String(total).padStart(2, '0');
  const whisper = F_WHISPER[stepIndex % F_WHISPER.length];

  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <FoilField />
      {/* ambient warm wash */}
      <div aria-hidden style={{ position: 'absolute', top: '-26%', left: '50%', transform: 'translateX(-50%)', width: 1200, height: 820, background: `radial-gradient(circle, ${accent}14 0%, transparent 60%)`, pointerEvents: 'none' }}></div>

      {/* HUD — brand · counter · sealed companion · comet progress */}
      <div style={{ position: 'relative', padding: '22px 34px 0', zIndex: 2 }}>
        <div style={{ maxWidth: 820, margin: '0 auto', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 9 }}>
            <BrandMark size={22} />
            <span style={{ fontFamily: "'Geist',sans-serif", fontWeight: 700, fontSize: 15, letterSpacing: '-0.02em', color: '#1A1611' }}>UX&nbsp;Gym</span>
            <span style={{ marginLeft: 5, paddingLeft: 11, borderLeft: '1px solid ' + F_LINE, fontFamily: "'Geist Mono',monospace", fontSize: 10, letterSpacing: '.22em', color: F_INK3 }}>FIRST&nbsp;DRILL</span>
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 11 }}>
            <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', lineHeight: 1.15 }}>
              <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: 13, fontWeight: 600, letterSpacing: '.06em', color: F_INK }}>Nº&nbsp;{nn}<span style={{ color: F_INK3 }}>&nbsp;/&nbsp;{tt}</span></span>
            </span>
          </span>
        </div>
        <div style={{ position: 'relative', maxWidth: 820, margin: '15px auto 0', width: '100%', height: 3 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(33,30,26,0.08)', borderRadius: 99 }}></div>
          <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: pct + '%', background: `linear-gradient(90deg, ${accent}88, ${accent})`, borderRadius: 99, transition: 'width .6s cubic-bezier(.2,.7,.2,1)' }}></div>
          <div style={{ position: 'absolute', top: '50%', left: `calc(${pct}% - 5px)`, width: 10, height: 10, borderRadius: '50%', background: '#fff', border: `2px solid ${accent}`, transform: 'translateY(-50%)', boxShadow: `0 0 12px 2px ${accent}99`, transition: 'left .6s cubic-bezier(.2,.7,.2,1)' }}></div>
        </div>
      </div>

      <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 24px 48px', zIndex: 1 }}>
        <div key={screenKey} className="pk2Soft" style={{ maxWidth: 820, width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 18, marginBottom: 16, flexWrap: 'wrap' }}>
            <span aria-hidden style={{ fontFamily: "'Instrument Serif',Georgia,serif", fontSize: 'clamp(44px,7vw,82px)', lineHeight: 0.74, letterSpacing: '-.02em', color: 'rgba(33,30,26,0.1)' }}>{nn}</span>
            <EyebrowChip kind={it.kind} />
          </div>
          <h2 style={{ fontFamily: "'Instrument Serif',Georgia,serif", fontWeight: 400, fontSize: 'clamp(28px,4vw,42px)', lineHeight: 1.24, letterSpacing: '-.012em', margin: 0, color: F_INK, textWrap: 'pretty' }}>{it.prompt}</h2>
          {body}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 38, gap: 16 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 14 }}>
              <FBack onClick={onBack} />
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'Geist Mono',monospace", fontSize: 11.5, letterSpacing: '.04em', color: F_INK3 }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: accent, opacity: 0.7 }}></span>{whisper}
              </span>
            </span>
            {showContinue && <FContinue onClick={onContinue} disabled={continueDisabled} accent={accent} />}
          </div>
        </div>
      </div>
    </div>
  );
}

window.PK2Flow = { Flow };
