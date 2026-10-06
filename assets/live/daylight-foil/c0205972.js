/* global React, useTweaks, TweaksPanel, TweakSection, TweakSlider */

// Celebration FX — shared tweakable parameters for the holographic card effect.
// A tiny store broadcasts values to every card; the Tweaks panel writes to it.

const CELEB_FX_DEFAULTS = /*EDITMODE-BEGIN*/{
  "tiltMax": 10,
  "perspective": 850,
  "hoverScale": 1.02,
  "shineStrength": 0.4,
  "bandWidth": 27,
  "bandBlur": 12,
  "shineLag": 320,
  "iridescence": 0.65,
  "hueSpread": 200,
  "hueCenter": 38,
  "rainbowScale": 230,
  "rainbowRest": 0.35,
  "specular": 0.38,
  "specSize": 52,
  "edgeGlow": 0.5,
  "noise": 0.06,
  "noiseScale": 2,
  "confetti": 130
}/*EDITMODE-END*/;

window.CelebFxStore = (() => {
  let v = { ...CELEB_FX_DEFAULTS };
  const subs = new Set();
  return {
    get: () => v,
    set: (nv) => { v = { ...v, ...nv }; subs.forEach((f) => f(v)); },
    sub: (f) => { subs.add(f); return () => subs.delete(f); },
  };
})();

function useCelebFx() {
  const [v, setV] = React.useState(() => window.CelebFxStore.get());
  React.useEffect(() => window.CelebFxStore.sub(setV), []);
  return v;
}

function CelebrationTweaks() {
  const [t, setTweak] = useTweaks(CELEB_FX_DEFAULTS);
  React.useEffect(() => { window.CelebFxStore.set(t); }, [t]);
  const S = (label, key, min, max, step, unit) => (
    <TweakSlider label={label} value={t[key]} min={min} max={max} step={step} unit={unit}
      onChange={(v) => setTweak(key, v)} />
  );
  return (
    <TweaksPanel>
      <TweakSection label="Tilt" />
      {S('Tilt depth', 'tiltMax', 0, 18, 0.5, '°')}
      {S('Perspective', 'perspective', 400, 1800, 50, 'px')}
      {S('Hover zoom', 'hoverScale', 1, 1.08, 0.005, '×')}
      <TweakSection label="Shine band" />
      {S('Strength', 'shineStrength', 0, 1, 0.05)}
      {S('Band width', 'bandWidth', 8, 40, 1, '%')}
      {S('Band softness', 'bandBlur', 0, 30, 1, 'px')}
      {S('Follow lag', 'shineLag', 50, 1200, 25, 'ms')}
      <TweakSection label="Iridescence" />
      {S('Amount', 'iridescence', 0, 1, 0.05)}
      {S('Hue spread', 'hueSpread', 0, 360, 10, '°')}
      {S('Hue center', 'hueCenter', 0, 360, 5, '°')}
      {S('Pattern scale', 'rainbowScale', 140, 420, 10, '%')}
      {S('Visible at rest', 'rainbowRest', 0, 1, 0.05)}
      <TweakSection label="Specular glow" />
      {S('Intensity', 'specular', 0, 1, 0.05)}
      {S('Size', 'specSize', 15, 80, 1, '%')}
      {S('Edge glow', 'edgeGlow', 0, 1, 0.05)}
      <TweakSection label="Texture" />
      {S('Noise opacity', 'noise', 0, 0.3, 0.01)}
      {S('Noise scale', 'noiseScale', 1, 4, 0.25)}
      <TweakSection label="Confetti" />
      {S('Particles', 'confetti', 0, 300, 10)}
    </TweaksPanel>
  );
}

Object.assign(window, { CELEB_FX_DEFAULTS, useCelebFx, CelebrationTweaks });
