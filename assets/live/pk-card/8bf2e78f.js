/* global React */
// ─────────────────────────────────────────────────────────────────────────
//  UX Pokémon · v2 — orchestrator.
//  welcome → flow → reveal → hero (the card). Scoring + data unchanged.
// ─────────────────────────────────────────────────────────────────────────

const { useState: pState, useEffect: pEffect, useRef: pRef, useCallback: pCb } = React;
const PAPER = '#F7F4EE', INK = '#15110D';

// html-to-image cannot inline the bundle's blob: font URLs (they never become
// data: URIs), so an exported PNG falls back to system fonts - the Instrument
// Serif name renders as a generic serif and labels shift/overlap. We build the
// @font-face CSS ourselves: fetch each blob font and inline it as a data: URI,
// then hand it to toPng via `fontEmbedCSS`. Computed once, then cached.
let __exportFontCSS = null;
async function exportFontCSS() {
  if (__exportFontCSS != null) return __exportFontCSS;
  const out = [];
  for (const sheet of Array.from(document.styleSheets)) {
    let rules; try { rules = sheet.cssRules; } catch (e) { continue; }
    if (!rules) continue;
    for (const rule of Array.from(rules)) {
      if (!rule || rule.constructor.name !== 'CSSFontFaceRule') continue;
      const src = rule.style.getPropertyValue('src');
      const mm = src.match(/url\(["']?(blob:[^"')]+)["']?\)/);
      if (!mm) { out.push(rule.cssText); continue; }
      try {
        const blob = await (await fetch(mm[1])).blob();
        const dataUrl = await new Promise((res, rej) => { const fr = new FileReader(); fr.onload = () => res(fr.result); fr.onerror = rej; fr.readAsDataURL(blob); });
        out.push(rule.cssText.replace(mm[1], dataUrl));
      } catch (e) { out.push(rule.cssText); }
    }
  }
  __exportFontCSS = out.join('\n');
  return __exportFontCSS;
}

function PokemonApp() {
  const P = window.POKEMON;
  const prm = window.PokemonCard.usePRM();
  const { Welcome } = window.PK2Welcome;
  const { Flow } = window.PK2Flow;
  const { Reveal, HeroReveal } = window.PK2Stages;

  const params = new URLSearchParams(location.search);
  const startStage = params.get('stage');
  const startType = (params.get('type') || '').toUpperCase();
  const typeAns = () => (P.TYPES.indexOf(startType) >= 0 ? P.sampleAnswersFor(startType) : P.sampleAnswers());
  const initial = () => {
    if (startStage === 'hero' || startStage === 'card' || startStage === 'result') return { phase: 'hero', answers: typeAns() };
    if (startStage === 'reveal') return { phase: 'reveal', answers: P.sampleAnswers() };
    if (startStage === 'questions') return { phase: 'flow', answers: {} };
    try { if (!params.get('admin')) { var __s = JSON.parse(localStorage.getItem('uxpk_progress') || 'null'); if (__s && __s.phase) return __s; } } catch (e) {}
    return { phase: 'welcome', answers: {} };
  };
  const init = initial();
  const [phase, setPhase] = pState(init.phase);
  const [stepIndex, setStepIndex] = pState(init.stepIndex || 0);
  const [answers, setAnswers] = pState(init.answers);
  const [photoUrl, setPhotoUrl] = pState(null);
  const [name, setName] = pState(init.name || '');
  const [dbRestore, setDbRestore] = pState(null);
  pEffect(function () { try { if (params.get('admin')) return; if (dbRestore) return; if (phase === 'welcome') localStorage.removeItem('uxpk_progress'); else if (phase === 'flow' || phase === 'reveal' || phase === 'hero') localStorage.setItem('uxpk_progress', JSON.stringify({ phase: phase, stepIndex: stepIndex, answers: answers, name: name })); } catch (e) {} }, [phase, stepIndex, answers, name, dbRestore]);
  pEffect(function () {
    if (params.get('admin')) return;
    var __did = false;
    function __rebuild(rows) {
      var out = {}; var FLOW = (P && P.FLOW) || [];
      (rows || []).forEach(function (row) {
        var it = FLOW[((row && row.q) | 0) - 1]; if (!it) return;
        if (it.kind === 'scale') { if (row.rating != null) out[it.key] = row.rating; }
        else if (it.kind === 'mc' || it.kind === 'wyr') { var ix = (it.options || []).findIndex(function (o) { return o.text === row.choice; }); if (ix >= 0) out[it.key] = ix; }
        else if (it.kind === 'choose') { var arr = ((row.choices) || []).map(function (c) { return (it.options || []).findIndex(function (o) { return o.text === (c && c.text); }); }).filter(function (x) { return x >= 0; }); if (arr.length) out[it.key] = arr; }
        else { if (row.text != null) out[it.key] = row.text; }
      });
      return out;
    }
    function onRestore(e) {
      if (e.origin !== location.origin) return;
      var d = e.data;
      if (!d || d.source !== 'lms' || d.type !== 'restore' || !d.payload || !d.payload.type) return;
      if (__did) return;
      if ((P.TYPES || []).indexOf(String(d.payload.type).toUpperCase()) < 0) return;
      var saved = null; try { saved = JSON.parse(localStorage.getItem('uxpk_progress') || 'null'); } catch (e2) {}
      if (saved && saved.phase) {
        // Local progress exists. Only self-heal a COMPLETED card whose result
        // DISAGREES with the account (e.g. stale data from an old build). Never
        // touch an in-progress quiz, and leave an already-correct card alone.
        if (saved.phase !== 'hero') return;
        var localTop = null; try { localTop = P.computeResult(saved.answers || {}).top; } catch (e5) {}
        if (localTop === String(d.payload.type).toUpperCase()) return;
        try { localStorage.removeItem('uxpk_progress'); } catch (e6) {}
      }
      __did = true;
      setAnswers(__rebuild(d.payload.answers));
      if (d.payload.displayName) setName(d.payload.displayName);
      setDbRestore(d.payload);
      setPhase('hero');
    }
    window.addEventListener('message', onRestore);
    try { parent.postMessage({ source: 'drill', type: 'ready' }, location.origin); } catch (e3) {}
    return function () { window.removeEventListener('message', onRestore); };
  }, []);
  const [exporting, setExporting] = pState(false);
  const [photoError, setPhotoError] = pState('');
  const [previewType, setPreviewType] = pState('');
  const shuffleMap = pRef({}).current;
  const advRef = pRef(null), revRef = pRef(null);

  function __resultFromDB(pl) {
    var TYPES = P.TYPES || [];
    var top = String((pl && pl.type) || '').toUpperCase();
    var score = (pl && pl.scores) || {};
    var ranked = TYPES.slice().sort(function (x, y) { return (score[y] || 0) - (score[x] || 0); });
    ranked = [top].concat(ranked.filter(function (t) { return t !== top; }));
    return { score: score, ranked: ranked, top: top, second: ranked[1], low: ranked[4], secondLow: ranked[3] };
  }
  const result = dbRestore ? __resultFromDB(dbRestore) : ((phase === 'reveal' || phase === 'hero') ? P.computeResult(answers) : null);

  pEffect(() => () => { clearTimeout(advRef.current); clearTimeout(revRef.current); }, []);

  const goNext = pCb(() => {
    clearTimeout(advRef.current);
    setStepIndex((si) => {
      if (si < P.FLOW.length - 1) return si + 1;
      setPhase('reveal');
      clearTimeout(revRef.current);
      revRef.current = setTimeout(() => setPhase('hero'), prm ? 500 : 1900);
      return si;
    });
  }, [prm]);

  const selectAdvance = pCb((key, val) => {
    setAnswers((a) => ({ ...a, [key]: val }));
    clearTimeout(advRef.current);
    advRef.current = setTimeout(goNext, 330);
  }, [goNext]);

  const toggleChoose = pCb((key, oi) => {
    setAnswers((a) => {
      const cur = Array.isArray(a[key]) ? a[key].slice() : [];
      const idx = cur.indexOf(oi);
      if (idx >= 0) cur.splice(idx, 1); else { if (cur.length >= 3) return a; cur.push(oi); }
      return { ...a, [key]: cur };
    });
  }, []);

  const setReflect = pCb((key, val) => setAnswers((a) => ({ ...a, [key]: val })), []);

  const goBack = pCb(() => {
    clearTimeout(advRef.current);
    setStepIndex((si) => { if (si > 0) return si - 1; setPhase('welcome'); return si; });
  }, []);

  const restart = pCb(() => {
    clearTimeout(advRef.current); clearTimeout(revRef.current);
    Object.keys(shuffleMap).forEach((k) => delete shuffleMap[k]);
    setAnswers({}); setStepIndex(0); setPhotoUrl(null); setName(''); setExporting(false); setPhotoError(''); setPreviewType(''); setDbRestore(null); setPhase('welcome');
  }, []);

  const onPhoto = pCb((e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    if (!f.type || f.type.indexOf('image/') !== 0) { setPhotoError('Please choose an image file.'); return; }
    if (f.size > 10 * 1024 * 1024) { setPhotoError('Please choose an image under 10 MB.'); return; }
    const r = new FileReader();
    r.onload = () => { setPhotoUrl(r.result); setPhotoError(''); };
    r.readAsDataURL(f);
  }, []);

  const onDownload = pCb(async (cardRef) => {
    const node = cardRef.current;
    if (!node || !window.htmlToImage) return;
    if ((!name || !name.trim() || !photoUrl) && !window.confirm('Your card looks best with your name and photo on it. Download it anyway?')) return;
    setExporting(true);
    const w = node.offsetWidth, h = node.offsetHeight;
    // Strip the card's outer glow/shadow during capture so the exported PNG is
    // ONLY the card - no faint whitish halo (a rounded rectangle of a different
    // radius) baked in behind it. Restore it after.
    const prevShadow = node.style.boxShadow;
    node.style.boxShadow = 'none';
    const restore = () => { node.style.boxShadow = prevShadow; };
    try {
      const fontEmbedCSS = await exportFontCSS();
      const url = await window.htmlToImage.toPng(node, { pixelRatio: 3, cacheBust: true, width: w, height: h, backgroundColor: null, fontEmbedCSS, style: { boxShadow: 'none' } });
      restore(); const a = document.createElement('a'); a.download = (name || 'ux-pokemon') + '-card.png'; a.href = url; a.click(); setExporting(false);
    } catch (e) { restore(); setExporting(false); }
  }, [name, photoUrl]);


  const jumpStage = pCb((s) => {
    clearTimeout(advRef.current); clearTimeout(revRef.current);
    if (s === 'welcome') { setPreviewType(''); setAnswers({}); setStepIndex(0); setPhase('welcome'); return; }
    if (s === 'questions') { setPreviewType(''); setAnswers({}); setStepIndex(0); setPhase('flow'); return; }
    setAnswers((a) => (Object.keys(a).length ? a : P.sampleAnswers()));
    setPhase(s);
  }, []);

  const previewChar = pCb((t) => {
    setPreviewType(t);
    setAnswers(P.sampleAnswersFor(t));
    setPhase((p) => (p === 'welcome' || p === 'flow' || p === 'reveal') ? 'hero' : p);
  }, []);

  let screen = null;
  if (phase === 'welcome') screen = <Welcome onBegin={() => setPhase('flow')} />;
  else if (phase === 'flow') screen = <Flow flow={P.FLOW} stepIndex={stepIndex} answers={answers} shuffleMap={shuffleMap} screenKey={stepIndex} onSelect={selectAdvance} onToggle={toggleChoose} onReflect={setReflect} onBack={goBack} onContinue={goNext} />;
  else if (phase === 'reveal') screen = <Reveal />;
  else if (phase === 'hero') screen = <HeroReveal result={result} prm={prm} name={name} photoUrl={photoUrl} answers={answers} dbReview={dbRestore ? dbRestore.answers : null} exporting={exporting} photoError={photoError} onName={(e) => setName(e.target.value)} onPhoto={onPhoto} onDownload={onDownload} onRestart={restart} />;

  const dark = phase === 'hero' || phase === 'reveal';
  return (
    <div style={{ minHeight: '100vh', width: '100%', background: dark ? '#0A0705' : PAPER, color: dark ? '#FAF6F0' : INK, fontFamily: "'Geist',system-ui,sans-serif", WebkitFontSmoothing: 'antialiased', transition: 'background .6s ease' }}>
      {screen}
      <DrillTweaks phase={phase} stepIndex={stepIndex} total={P.FLOW.length} previewType={previewType} onStage={jumpStage} onStep={(i) => { setPhase('flow'); setStepIndex(i); }} onCharacter={previewChar} onRestart={restart} />
    </div>
  );
}

function DrillTweaks({ phase, stepIndex, total, previewType, onStage, onStep, onCharacter, onRestart }) {
  const { TweaksPanel, TweakSection, TweakSelect, TweakSlider, TweakButton } = window;
  if (!TweaksPanel) return null;
  const A = window.POKEMON.ARCH;
  const stageVal = phase === 'flow' ? 'questions' : phase;
  const stageOpts = [
    { value: 'welcome', label: 'Opening' },
    { value: 'questions', label: 'Questions' },
    { value: 'reveal', label: 'Reading…' },
    { value: 'hero', label: 'Your card' },
  ];
  const chars = ['EYE', 'HEART', 'BRAIN', 'HAND', 'FACE'];
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Go to" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5 }}>
        {stageOpts.map((o) => {
          const on = stageVal === o.value;
          return (
            <button key={o.value} type="button" onClick={() => onStage(o.value)}
              style={{ height: 32, borderRadius: 8, fontSize: 12, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer', border: on ? '1px solid #29261b' : '.5px solid rgba(0,0,0,.14)', background: on ? '#29261b' : '#fff', color: on ? '#fff' : '#29261b' }}>{o.label}</button>
          );
        })}
      </div>
      {phase === 'flow' && (
        <React.Fragment>
          <TweakSection label={`Question ${stepIndex + 1} / ${total}`} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5 }}>
            <button type="button" onClick={() => onStep(Math.max(0, stepIndex - 1))} disabled={stepIndex === 0}
              style={{ height: 32, borderRadius: 8, fontSize: 12, fontWeight: 600, fontFamily: 'inherit', cursor: stepIndex === 0 ? 'not-allowed' : 'pointer', border: '.5px solid rgba(0,0,0,.14)', background: '#fff', color: stepIndex === 0 ? '#bdb7ab' : '#29261b', opacity: stepIndex === 0 ? 0.6 : 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>Previous
            </button>
            <button type="button" onClick={() => onStep(Math.min(total - 1, stepIndex + 1))} disabled={stepIndex === total - 1}
              style={{ height: 32, borderRadius: 8, fontSize: 12, fontWeight: 600, fontFamily: 'inherit', cursor: stepIndex === total - 1 ? 'not-allowed' : 'pointer', border: '1px solid #29261b', background: stepIndex === total - 1 ? '#fff' : '#29261b', color: stepIndex === total - 1 ? '#bdb7ab' : '#fff', opacity: stepIndex === total - 1 ? 0.6 : 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              Next<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </button>
          </div>
        </React.Fragment>
      )}
      <TweakSection label="Preview creature" />
      <div style={{ display: 'flex', gap: 6 }}>
        {chars.map((t) => (
          <button key={t} type="button" title={A[t].name} onClick={() => onCharacter(t)} style={{ flex: 1, height: 30, borderRadius: 7, border: previewType === t ? '1.5px solid rgba(41,38,27,.85)' : '.5px solid rgba(0,0,0,.12)', background: A[t].color, cursor: 'pointer' }}></button>
        ))}
      </div>
      <TweakButton label="Restart" secondary onClick={onRestart} />
    </TweaksPanel>
  );
}

window.PokemonApp = PokemonApp;
