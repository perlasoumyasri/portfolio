function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/* global React */
// ─────────────────────────────────────────────────────────────────────────
//  UX Pokémon · v2 — THE HERO CARD (dark / legendary edition).
//  A luminous cinematic specimen that lives on darkness. God-rays, a glowing
//  animated aura, drifting sparks, blazing holo foil over near-black, a
//  portrait that floats in its own light. Everything centred. No single icon.
// ─────────────────────────────────────────────────────────────────────────

var _React = React,
  hcState = _React.useState,
  hcEffect = _React.useEffect,
  hcRef = _React.useRef;
var HC_NOISE = "url(\"data:image/svg+xml,".concat(encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter><rect width="160" height="160" filter="url(#n)"/></svg>'), "\")");

// A true holographic foil for a dark face: the WHOLE surface is iridescent.
// A thin, crisp specular glint that glides with the cursor — mostly clear, with
// just hints of spectral colour at its edges. Keeps the card clean (no cloud);
// the smooth 3D tilt leads, the sheen is a highlight, not a haze.
function HoloV2(_ref) {
  var _ref$px = _ref.px,
    px = _ref$px === void 0 ? 0.5 : _ref$px,
    _ref$py = _ref.py,
    py = _ref$py === void 0 ? 0.5 : _ref$py,
    _ref$intensity = _ref.intensity,
    intensity = _ref$intensity === void 0 ? 0.3 : _ref$intensity,
    _ref$sweeping = _ref.sweeping,
    sweeping = _ref$sweeping === void 0 ? false : _ref$sweeping;
  var t = Math.max(0, Math.min(1, px * 0.6 + py * 0.4));
  var posX = (t * 100).toFixed(1);
  var band = "linear-gradient(106deg, transparent 43%, hsla(316,90%,80%,0.16) 47.5%, rgba(255,255,255,0.42) 50%, hsla(187,90%,80%,0.16) 52.5%, transparent 57%)";
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    style: {
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 12,
      backgroundImage: band,
      backgroundSize: '220% 100%',
      backgroundPosition: "".concat(posX, "% 50%"),
      filter: 'blur(2px)',
      mixBlendMode: 'screen',
      opacity: 0.16 + intensity * 0.46,
      transition: sweeping ? 'opacity .5s ease' : 'background-position .3s ease-out, opacity .5s ease'
    }
  }), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    style: {
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 14,
      backgroundImage: HC_NOISE,
      backgroundSize: '88px',
      opacity: 0.05,
      mixBlendMode: 'overlay'
    }
  }));
}
function rankFromScore(score) {
  var P = window.POKEMON;
  return P.TYPES.slice().sort(function (a, b) {
    return (score[b] || 0) - (score[a] || 0);
  });
}

// deterministic spark positions
var SPARKS = [{
  x: 18,
  y: 20,
  s: 3,
  d: 0
}, {
  x: 82,
  y: 16,
  s: 2,
  d: 1.1
}, {
  x: 12,
  y: 52,
  s: 2.4,
  d: 0.6
}, {
  x: 88,
  y: 48,
  s: 3,
  d: 1.7
}, {
  x: 26,
  y: 74,
  s: 2,
  d: 0.3
}, {
  x: 74,
  y: 80,
  s: 2.6,
  d: 1.3
}, {
  x: 50,
  y: 12,
  s: 2.2,
  d: 0.9
}, {
  x: 60,
  y: 64,
  s: 1.8,
  d: 2.1
}];

// ── THE CARD ───────────────────────────────────────────────────────────────
function HeroCard(_ref2) {
  var arch = _ref2.arch,
    score = _ref2.score,
    name = _ref2.name,
    photoUrl = _ref2.photoUrl,
    prm = _ref2.prm,
    cardRef = _ref2.cardRef,
    minting = _ref2.minting,
    _ref2$alive = _ref2.alive,
    alive = _ref2$alive === void 0 ? true : _ref2$alive,
    adj = _ref2.adj,
    onAdjust = _ref2.onAdjust,
    aspect = _ref2.aspect;
  var P = window.POKEMON;
  var _window$PK = window.PK2,
    Aura = _window$PK.Aura,
    Guilloche = _window$PK.Guilloche,
    CFG = _window$PK.CFG;
  var RadarChart = window.PokemonEmblems.RadarChart;
  var BrandMark = window.PokemonCard.BrandMark;
  var tilt = window.PokemonCard.useTilt(prm, 8, 1300);
  var cfg = CFG[arch.key];
  var W = 416;
  var ranked = rankFromScore(score);
  var blendTop = ranked.slice(0, 3);
  var displayName = name && name.trim() || 'Your name';
  var light = cfg.shine[0];
  var shine = "linear-gradient(96deg, #FFFFFF 0%, ".concat(cfg.shine[0], " 38%, ").concat(arch.color, " 72%, ").concat(cfg.shine[0], " 100%)");
  var animate = alive && !prm;

  // mint-in shine sweep
  var _hcState = hcState(minting && !prm ? 0 : 1),
    _hcState2 = _slicedToArray(_hcState, 2),
    sweep = _hcState2[0],
    setSweep = _hcState2[1];
  hcEffect(function () {
    if (!minting || prm) {
      setSweep(1);
      return;
    }
    var raf,
      start = null;
    var dur = 1400;
    var ease = function ease(t) {
      return t * t * (3 - 2 * t);
    };
    var _step = function step(now) {
      if (start === null) start = now;
      var p = Math.min(1, (now - start) / dur);
      setSweep(ease(p));
      if (p < 1) raf = requestAnimationFrame(_step);
    };
    var to = setTimeout(function () {
      raf = requestAnimationFrame(_step);
    }, 250);
    return function () {
      clearTimeout(to);
      cancelAnimationFrame(raf);
    };
  }, [minting, prm]);
  var sweeping = minting && !prm && sweep < 1;
  var fxPx = tilt.hover ? tilt.px : sweeping ? 0.04 + sweep * 0.92 : 0.5;
  var fxPy = tilt.hover ? tilt.py : 0.4;
  // rise-and-settle: the load glow peaks mid-sweep and eases back to idle, never snapping off
  var fxInt = tilt.hover ? 0.68 : sweeping ? 0.12 + Math.sin(Math.min(1, sweep) * Math.PI) * 0.62 : 0.12;
  var edge = "conic-gradient(from 130deg, ".concat(arch.light, ", ").concat(arch.color, " 16%, ").concat(arch.deep, " 36%, #FFFFFF 50%, ").concat(cfg.shine[0], " 60%, ").concat(arch.color, " 76%, ").concat(arch.deep, " 90%, ").concat(arch.light, ")");
  var pc = 160; // portrait centre Y inside face
  var A = adj || {
    fx: 0,
    fy: 0,
    fw: 1,
    fh: 1
  };
  var _bgW = 100 / A.fw,
    _bgH = 100 / A.fh;
  var _pX = A.fw >= 1 ? 50 : A.fx / (1 - A.fw) * 100;
  var _pY = A.fh >= 1 ? 50 : A.fy / (1 - A.fh) * 100;
  return /*#__PURE__*/React.createElement("div", {
    onMouseMove: tilt.onMove,
    onMouseLeave: tilt.onLeave,
    style: _objectSpread(_objectSpread({}, tilt.style), {}, {
      width: W
    })
  }, /*#__PURE__*/React.createElement("div", {
    ref: cardRef,
    style: {
      padding: 6,
      borderRadius: 30,
      background: edge,
      boxShadow: "0 0 54px -14px rgba(".concat(arch.glowRGB, ",0.26), 0 46px 100px -46px rgba(").concat(arch.glowRGB, ",0.28), 0 34px 80px -34px rgba(0,0,0,0.72), 0 14px 34px rgba(0,0,0,0.5)")
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      overflow: 'hidden',
      borderRadius: 24,
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      fontFamily: "'Geist',sans-serif",
      background: "linear-gradient(168deg, ".concat(arch.deep, " 0%, #15100C 56%, #0B0806 100%)")
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    className: animate ? 'pk2GlowP' : '',
    style: {
      position: 'absolute',
      top: pc - 150,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 360,
      height: 360,
      background: "radial-gradient(circle, rgba(".concat(arch.glowRGB, ",0.7) 0%, rgba(").concat(arch.glowRGB, ",0.18) 38%, transparent 66%)"),
      filter: 'blur(6px)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    className: animate ? 'pk2Rays' : '',
    style: {
      position: 'absolute',
      top: pc - 230,
      left: '50%',
      width: 460,
      height: 460,
      marginLeft: -230,
      pointerEvents: 'none',
      background: "repeating-conic-gradient(from 0deg at 50% 50%, rgba(255,255,255,0.085) 0deg 5deg, transparent 5deg 17deg)",
      WebkitMaskImage: 'radial-gradient(closest-side, #000 8%, transparent 64%)',
      maskImage: 'radial-gradient(closest-side, #000 8%, transparent 64%)',
      mixBlendMode: 'screen'
    }
  }), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    style: {
      position: 'absolute',
      top: pc,
      left: '50%',
      transform: 'translate(-50%,-50%)',
      mixBlendMode: 'screen'
    }
  }, /*#__PURE__*/React.createElement(Aura, {
    type: arch.key,
    color: light,
    deep: "rgba(255,255,255,0.55)",
    size: 300,
    opacity: 0.85,
    idle: animate
  })), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    style: {
      position: 'absolute',
      top: pc - 220,
      left: '50%',
      transform: 'translateX(-50%)',
      mixBlendMode: 'screen'
    }
  }, /*#__PURE__*/React.createElement(Guilloche, {
    size: 430,
    color: light,
    petals: 32,
    opacity: 0.1,
    strokeWidth: 0.6
  })), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    style: {
      position: 'absolute',
      inset: 0,
      opacity: 0.5,
      backgroundImage: 'radial-gradient(rgba(255,255,255,0.16) 1px, transparent 1px)',
      backgroundSize: '17px 17px',
      maskImage: 'linear-gradient(180deg, #000, transparent 70%)',
      WebkitMaskImage: 'linear-gradient(180deg, #000, transparent 70%)'
    }
  }), SPARKS.map(function (s, i) {
    return /*#__PURE__*/React.createElement("span", {
      key: i,
      "aria-hidden": true,
      className: animate ? 'pk2Twinkle' : '',
      style: {
        position: 'absolute',
        left: s.x + '%',
        top: s.y + '%',
        width: s.s,
        height: s.s,
        borderRadius: '50%',
        background: '#fff',
        boxShadow: "0 0 6px 1px ".concat(light),
        animationDelay: s.d + 's',
        opacity: 0.7
      }
    });
  }), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(180deg, transparent 52%, rgba(7,5,4,0.55) 100%)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 16,
      left: 18,
      right: 18,
      zIndex: 5,
      display: 'grid',
      gridTemplateColumns: '1fr auto 1fr',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      justifySelf: 'start',
      fontFamily: "'Geist Mono',monospace",
      fontSize: 10,
      letterSpacing: '.14em',
      color: 'rgba(255,255,255,0.72)'
    }
  }, "N\xBA\xA0", cfg.num), /*#__PURE__*/React.createElement("span", {
    style: {
      justifySelf: 'center',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      padding: '4px 11px',
      borderRadius: 999,
      background: 'rgba(255,255,255,0.1)',
      border: "1px solid rgba(".concat(arch.glowRGB, ",0.5)"),
      fontFamily: "'Geist Mono',monospace",
      fontSize: 9,
      fontWeight: 600,
      letterSpacing: '.16em',
      color: '#fff',
      boxShadow: "0 0 16px -4px rgba(".concat(arch.glowRGB, ",0.7)")
    }
  }, cfg.element), /*#__PURE__*/React.createElement("span", {
    title: "Legendary",
    style: {
      justifySelf: 'end',
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 27,
      height: 27,
      borderRadius: '50%',
      padding: 1.5,
      background: "conic-gradient(from 130deg, ".concat(light, ", ").concat(arch.color, " 38%, #FFFFFF 58%, ").concat(light, " 78%, ").concat(arch.color, ")"),
      boxShadow: "0 0 13px -2px rgba(".concat(arch.glowRGB, ",0.9), 0 2px 6px rgba(0,0,0,0.4)")
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      background: "radial-gradient(circle at 40% 34%, ".concat(arch.deep, ", #0B0806)"),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    "aria-hidden": true,
    style: {
      filter: "drop-shadow(0 0 4px ".concat(light, ")")
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 1.6l1.9 8.1 8.1 2.3-8.1 2.3L12 22.4l-1.9-8.1L2 12l8.1-2.3z",
    fill: light
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 4,
      width: '100%',
      padding: '52px 22px 18px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: animate ? 'pk2FloatS' : '',
    style: {
      position: 'relative',
      width: 220,
      height: 220,
      borderRadius: 18,
      padding: 4,
      background: "conic-gradient(from 130deg, ".concat(cfg.shine[0], ", ").concat(arch.color, " 28%, ").concat(arch.deep, " 52%, #fff 62%, ").concat(cfg.shine[0], " 80%, ").concat(arch.color, ")"),
      boxShadow: "0 0 34px -2px rgba(".concat(arch.glowRGB, ",0.85), 0 16px 40px -10px rgba(0,0,0,0.6)")
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height: '100%',
      borderRadius: 19,
      padding: 3,
      background: 'linear-gradient(160deg, #1A140F, #0B0806)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height: '100%',
      borderRadius: 16,
      overflow: 'hidden',
      position: 'relative',
      background: "radial-gradient(circle at 50% 36%, ".concat(arch.deep, ", #0B0806)")
    }
  }, photoUrl ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    style: {
      position: 'absolute',
      inset: 0,
      backgroundImage: "url(\"".concat(photoUrl, "\")"),
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      filter: 'blur(16px) saturate(1.12) brightness(0.5)',
      transform: 'scale(1.2)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      backgroundImage: "url(\"".concat(photoUrl, "\")"),
      backgroundRepeat: 'no-repeat',
      backgroundSize: _bgW + '% ' + _bgH + '%',
      backgroundPosition: _pX + '% ' + _pY + '%',
      filter: 'saturate(0.82) contrast(1.06) brightness(0.97)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    style: {
      position: 'absolute',
      inset: 0,
      background: arch.color,
      mixBlendMode: 'soft-light',
      opacity: 0.45
    }
  }), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    style: {
      position: 'absolute',
      inset: 0,
      background: "radial-gradient(circle at 50% 34%, transparent 42%, rgba(0,0,0,0.4))"
    }
  })) : /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      color: light
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "40",
    height: "40",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.3",
    opacity: "0.85"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "9",
    r: "3.4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 19.5c1.2-3 4-4.5 7-4.5s5.8 1.5 7 4.5"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'Geist Mono',monospace",
      fontSize: 8,
      letterSpacing: '.16em',
      opacity: 0.85
    }
  }, "ADD YOUR PHOTO")), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 16,
      boxShadow: 'inset 0 2px 8px rgba(255,255,255,0.28), inset 0 -14px 26px rgba(0,0,0,0.5)'
    }
  })))), /*#__PURE__*/React.createElement("h2", {
    style: {
      width: '100%',
      textAlign: 'center',
      fontFamily: "'Instrument Serif',Georgia,serif",
      fontWeight: 400,
      fontSize: 58,
      lineHeight: 0.94,
      letterSpacing: '-.02em',
      margin: '22px 0 0',
      color: cfg.shine[0],
      textShadow: "0 0 22px rgba(".concat(arch.glowRGB, ",0.6), 0 1px 0 rgba(0,0,0,0.25)")
    }
  }, arch.name), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '14px auto 0',
      maxWidth: 286,
      width: '100%',
      textAlign: 'center',
      fontFamily: "'Instrument Serif',Georgia,serif",
      fontStyle: 'italic',
      fontSize: 18.5,
      lineHeight: 1.34,
      color: 'rgba(250,246,240,0.9)',
      textWrap: 'pretty'
    }
  }, arch.blurb), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18,
      fontFamily: "'Geist Mono',monospace",
      fontSize: 9,
      fontWeight: 600,
      letterSpacing: '.22em',
      textTransform: 'uppercase',
      color: 'rgba(255,255,255,0.5)'
    }
  }, "Your five directions"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4,
      position: 'relative',
      filter: "drop-shadow(0 0 12px rgba(".concat(arch.glowRGB, ",0.55))")
    }
  }, /*#__PURE__*/React.createElement(RadarChart, {
    score: score,
    color: light,
    fill: "rgba(".concat(arch.glowRGB, ",0.3)"),
    size: 184,
    showLabels: true,
    showDots: true,
    ringColor: "rgba(255,255,255,0.14)",
    labelColor: "rgba(250,246,240,0.88)",
    labelSize: 20,
    strokeW: 4
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      marginTop: 16,
      paddingTop: 15,
      borderTop: '1px solid rgba(255,255,255,0.14)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'Geist Mono',monospace",
      fontSize: 14,
      letterSpacing: '.08em',
      color: 'rgba(255,255,255,0.8)'
    }
  }, displayName.toUpperCase()), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 9
    }
  }, /*#__PURE__*/React.createElement(BrandMark, {
    size: 27
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'Geist',sans-serif",
      fontWeight: 700,
      fontSize: 21,
      letterSpacing: '-0.02em',
      color: 'rgba(255,255,255,0.97)'
    }
  }, "UX\xA0Gym")))), /*#__PURE__*/React.createElement(HoloV2, {
    px: fxPx,
    py: fxPy,
    intensity: fxInt,
    sweeping: sweeping,
    hueCenter: 22
  }))));
}
window.PK2Card = {
  HeroCard: HeroCard,
  HoloV2: HoloV2,
  rankFromScore: rankFromScore
};