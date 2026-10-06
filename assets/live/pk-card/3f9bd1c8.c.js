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
//  The collectible — a Bauhaus holographic trading card the student keeps.
//  Foil edge · cursor tilt · iridescent sweep · specular hotspot · grain.
//  Same craft language as the module-complete "Daylight" card.
// ─────────────────────────────────────────────────────────────────────────

var _React = React,
  pcState = _React.useState,
  pcEffect = _React.useEffect,
  pcRef = _React.useRef,
  pcCb = _React.useCallback;
function usePRM() {
  var _pcState = pcState(function () {
      return typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }),
    _pcState2 = _slicedToArray(_pcState, 1),
    prm = _pcState2[0];
  return prm;
}
function useTilt(prm) {
  var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 8;
  var persp = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1000;
  var _pcState3 = pcState({
      rx: 0,
      ry: 0,
      px: 0.5,
      py: 0.5,
      hover: false
    }),
    _pcState4 = _slicedToArray(_pcState3, 2),
    t = _pcState4[0],
    setT = _pcState4[1];
  var onMove = pcCb(function (e) {
    if (prm) return;
    var r = e.currentTarget.getBoundingClientRect();
    var px = (e.clientX - r.left) / r.width,
      py = (e.clientY - r.top) / r.height;
    setT({
      rx: -(py - 0.5) * max,
      ry: (px - 0.5) * max,
      px: px,
      py: py,
      hover: true
    });
  }, [prm, max]);
  var onLeave = pcCb(function () {
    return setT({
      rx: 0,
      ry: 0,
      px: 0.5,
      py: 0.5,
      hover: false
    });
  }, []);
  var style = {
    transform: "perspective(".concat(persp, "px) rotateX(").concat(t.rx.toFixed(2), "deg) rotateY(").concat(t.ry.toFixed(2), "deg)"),
    transition: t.hover ? 'transform .12s ease-out' : 'transform .55s cubic-bezier(.22,1,.36,1)',
    transformStyle: 'preserve-3d',
    willChange: 'transform'
  };
  return {
    onMove: onMove,
    onLeave: onLeave,
    style: style,
    hover: t.hover,
    px: t.px,
    py: t.py
  };
}
var PK_NOISE = "url(\"data:image/svg+xml,".concat(encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter><rect width="160" height="160" filter="url(#n)"/></svg>'), "\")");

// Holographic overlay stack — diffraction rainbow + shine band + specular + grain.
// `intensity` (0..1) scales the whole effect: low = subtle inherent foil, high = hover.
function HoloFX(_ref) {
  var _ref$px = _ref.px,
    px = _ref$px === void 0 ? 0.5 : _ref$px,
    _ref$py = _ref.py,
    py = _ref$py === void 0 ? 0.5 : _ref$py,
    _ref$intensity = _ref.intensity,
    intensity = _ref$intensity === void 0 ? 0.32 : _ref$intensity,
    _ref$hueCenter = _ref.hueCenter,
    hueCenter = _ref$hueCenter === void 0 ? 22 : _ref$hueCenter;
  var ir = 0.95,
    s = 0.9,
    w = 15;
  var hsla = function hsla(h, a) {
    var l = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 70;
    return "hsla(".concat(Math.round((h % 360 + 360) % 360), ", 95%, ").concat(l, "%, ").concat(Math.max(0, Math.min(1, a)).toFixed(3), ")");
  };
  var spectrum = [];
  for (var i = 0; i <= 6; i++) spectrum.push("".concat(hsla(hueCenter + i * 60, ir * 0.3, 67), " ").concat(Math.round(i * 100 / 6), "%"));
  var rainbow = "linear-gradient(115deg, ".concat(spectrum.join(', '), ")");
  var hb = hueCenter + (px - 0.5) * 60;
  var band = "linear-gradient(115deg, ".concat(hsla(hb - 55, 0, 70), " ").concat((50 - w * 1.45).toFixed(1), "%, ").concat(hsla(hb - 55, ir * 0.32, 70), " ").concat((50 - w * 0.6).toFixed(1), "%, ").concat(hsla(hb - 20, ir * 0.4, 76), " ").concat((50 - w * 0.25).toFixed(1), "%, rgba(255,255,255,").concat((s * 0.45).toFixed(3), ") 50%, ").concat(hsla(hb + 35, ir * 0.42, 74), " ").concat((50 + w * 0.3).toFixed(1), "%, ").concat(hsla(hb + 60, ir * 0.32, 70), " ").concat((50 + w * 0.65).toFixed(1), "%, ").concat(hsla(hb + 95, ir * 0.18, 68), " ").concat((50 + w).toFixed(1), "%, ").concat(hsla(hb + 95, 0, 68), " ").concat((50 + w * 1.45).toFixed(1), "%)");
  var spec = "radial-gradient(circle at ".concat((px * 100).toFixed(1), "% ").concat((py * 100).toFixed(1), "%, rgba(255,255,255,0.42) 0%, ").concat(hsla(hb + 15, 0.26, 78), " 30%, transparent 62%)");
  var rainbowOp = 0.10 + intensity * 0.5;
  var bandOp = intensity * 0.55;
  var specOp = 0.14 + intensity * 0.5;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    style: {
      position: 'absolute',
      inset: '-8%',
      pointerEvents: 'none',
      zIndex: 6,
      background: rainbow,
      backgroundSize: '180% 180%',
      backgroundPosition: "".concat((px * 100).toFixed(1), "% ").concat((py * 100).toFixed(1), "%"),
      filter: "hue-rotate(".concat(((px + py - 1) * 60).toFixed(0), "deg) saturate(1.1) blur(8px)"),
      mixBlendMode: 'multiply',
      opacity: rainbowOp,
      transition: 'background-position .2s ease-out, filter .2s ease-out, opacity .7s ease',
      willChange: 'background-position, filter, opacity'
    }
  }), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    style: {
      position: 'absolute',
      inset: '-30%',
      pointerEvents: 'none',
      zIndex: 7,
      background: band,
      filter: 'blur(16px)',
      transform: "translateX(".concat(((px - 0.5) * 150).toFixed(1), "%)"),
      opacity: bandOp,
      transition: 'transform 420ms cubic-bezier(.22,1,.36,1), opacity .5s ease',
      willChange: 'transform, opacity'
    }
  }), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    style: {
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 8,
      background: spec,
      opacity: specOp,
      transition: 'opacity .45s ease'
    }
  }), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    style: {
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 9,
      backgroundImage: PK_NOISE,
      backgroundSize: '90px',
      opacity: 0.05,
      mixBlendMode: 'overlay'
    }
  }));
}

// The real UX Gym icon — verbatim from the brand favicon. Do not redraw.
function BrandMark(_ref2) {
  var _ref2$size = _ref2.size,
    size = _ref2$size === void 0 ? 18 : _ref2$size,
    radius = _ref2.radius;
  var gid = (React.useId ? React.useId() : 'uxg' + Math.random().toString(36).slice(2)).replace(/:/g, '');
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 32 32",
    fill: "none",
    "aria-hidden": true,
    style: {
      display: 'block',
      flex: '0 0 auto',
      borderRadius: radius
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: gid,
    x1: "0.9458",
    x2: "0.0542",
    y1: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0",
    stopColor: "rgb(255,64,26)"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "1",
    stopColor: "rgb(255,174,0)"
  }))), /*#__PURE__*/React.createElement("path", {
    d: "M 4.741 31.936 C 2.122 31.936 0 29.818 0 27.205 L 0 4.731 C 0 2.118 2.122 0 4.741 0 L 27.259 0 C 29.878 0 32 2.118 32 4.731 L 32 27.205 C 32 29.818 29.878 31.936 27.259 31.936 Z",
    fill: "url(#".concat(gid, ")")
  }), /*#__PURE__*/React.createElement("g", {
    transform: "translate(0 0.064)"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 22.523 24.377 C 20.757 26.139 18.362 27.129 15.864 27.129 C 13.367 27.129 10.971 26.139 9.205 24.377 L 15.864 17.731 Z",
    fill: "rgba(255,255,255,0.8)"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 22.523 11.086 C 24.289 12.848 25.281 15.239 25.281 17.731 C 25.281 20.224 24.289 22.614 22.523 24.377 L 15.864 17.731 L 22.523 11.086 Z",
    fill: "rgba(255,255,255,0.9)"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 15.858 4.453 C 17.624 6.215 18.616 8.606 18.616 11.098 C 18.616 13.591 17.624 15.981 15.858 17.744 L 9.199 11.098 Z",
    fill: "rgb(255,255,255)"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 9.206 24.377 C 6.512 21.689 5.707 17.647 7.164 14.135 C 7.637 12.995 8.331 11.959 9.206 11.086 L 15.864 17.731 Z",
    fill: "rgba(255,255,255,0.9)"
  })));
}
function FlameMark(_ref3) {
  var _ref3$size = _ref3.size,
    size = _ref3$size === void 0 ? 18 : _ref3$size;
  return /*#__PURE__*/React.createElement(BrandMark, {
    size: size
  });
}

// ── the card visual ────────────────────────────────────────────────────
function CollectibleCard(_ref4) {
  var arch = _ref4.arch,
    score = _ref4.score,
    name = _ref4.name,
    photoUrl = _ref4.photoUrl,
    prm = _ref4.prm,
    cardRef = _ref4.cardRef,
    hueCenter = _ref4.hueCenter,
    minting = _ref4.minting;
  var _window$PokemonEmblem = window.PokemonEmblems,
    Emblem = _window$PokemonEmblem.Emblem,
    RadarChart = _window$PokemonEmblem.RadarChart;
  var tilt = useTilt(prm, 8);
  var W = 360;
  var edge = "linear-gradient(150deg, ".concat(arch.light, " 0%, ").concat(arch.color, " 46%, ").concat(arch.deep, " 100%)");
  var displayName = name && name.trim() || 'Your name';

  // Automatic shine sweep while the card mints in (and straightens).
  var _pcState5 = pcState(minting && !prm ? 0 : 1),
    _pcState6 = _slicedToArray(_pcState5, 2),
    sweep = _pcState6[0],
    setSweep = _pcState6[1];
  pcEffect(function () {
    if (!minting || prm) {
      setSweep(1);
      return;
    }
    var raf,
      start = null;
    var dur = 1500;
    var ease = function ease(t) {
      return 1 - Math.pow(1 - t, 3);
    };
    var _step = function step(now) {
      if (start === null) start = now;
      var p = Math.min(1, (now - start) / dur);
      setSweep(ease(p));
      if (p < 1) raf = requestAnimationFrame(_step);
    };
    var to = setTimeout(function () {
      raf = requestAnimationFrame(_step);
    }, 220);
    return function () {
      clearTimeout(to);
      cancelAnimationFrame(raf);
    };
  }, [minting, prm]);
  var sweeping = minting && !prm && sweep < 1;
  var fxPx = tilt.hover ? tilt.px : sweeping ? 0.06 + sweep * 0.88 : 0.5;
  var fxPy = tilt.hover ? tilt.py : sweeping ? 0.42 : 0.4;
  var fxIntensity = tilt.hover ? 0.82 : sweeping ? 0.5 : 0.34;
  return /*#__PURE__*/React.createElement("div", {
    onMouseMove: tilt.onMove,
    onMouseLeave: tilt.onLeave,
    style: _objectSpread(_objectSpread({}, tilt.style), {}, {
      width: W
    })
  }, /*#__PURE__*/React.createElement("div", {
    ref: cardRef,
    style: {
      padding: 5,
      borderRadius: 26,
      background: edge,
      boxShadow: "0 34px 70px -24px rgba(".concat(arch.glowRGB, ",0.5), 0 10px 28px rgba(33,30,26,0.18)")
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      overflow: 'hidden',
      borderRadius: 21,
      background: '#FAF8F3',
      width: '100%',
      padding: '15px 15px 14px',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: "'Geist',sans-serif"
    }
  }, /*#__PURE__*/React.createElement(HoloFX, {
    px: fxPx,
    py: fxPy,
    intensity: fxIntensity,
    hueCenter: hueCenter
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'relative',
      zIndex: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'Geist Mono',monospace",
      fontSize: 10.5,
      letterSpacing: '.12em',
      color: '#A8A095'
    }
  }, "\u2116 01 \xB7 FIRST DRILL"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '4px 10px',
      borderRadius: 999,
      background: arch.color,
      color: '#fff',
      fontFamily: "'Geist Mono',monospace",
      fontSize: 9.5,
      fontWeight: 600,
      letterSpacing: '.12em'
    }
  }, arch.tag)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginTop: 11,
      height: 188,
      position: 'relative',
      zIndex: 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '0 0 150px',
      borderRadius: 13,
      overflow: 'hidden',
      position: 'relative',
      background: '#ECE7DF'
    }
  }, photoUrl ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      backgroundImage: "url(\"".concat(photoUrl, "\")"),
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 7,
      color: '#B7AFA3'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "34",
    height: "34",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.4"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "9",
    r: "3.4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 19.5c1.2-3 4-4.5 7-4.5s5.8 1.5 7 4.5"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'Geist Mono',monospace",
      fontSize: 8.5,
      letterSpacing: '.08em',
      textTransform: 'uppercase'
    }
  }, "Your photo")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      boxShadow: 'inset 0 0 0 1px rgba(33,30,26,0.06)',
      borderRadius: 13,
      pointerEvents: 'none'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      borderRadius: 13,
      position: 'relative',
      overflow: 'hidden',
      background: "linear-gradient(160deg, ".concat(arch.color, " 0%, ").concat(arch.deep, " 120%)"),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    style: {
      position: 'absolute',
      inset: 0,
      opacity: 0.5,
      backgroundImage: "radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px)",
      backgroundSize: '13px 13px'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(Emblem, {
    type: arch.key,
    size: 96,
    fill: "#FCFAF4",
    accent: "rgba(255,255,255,0.45)"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 13,
      position: 'relative',
      zIndex: 2
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Instrument Serif',Georgia,serif",
      fontWeight: 400,
      fontSize: 38,
      lineHeight: 0.96,
      letterSpacing: '-.015em',
      color: arch.deep,
      margin: 0
    }
  }, arch.name)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Geist Mono',monospace",
      fontSize: 10,
      letterSpacing: '.06em',
      color: '#8A847B',
      marginTop: 5,
      position: 'relative',
      zIndex: 2
    }
  }, displayName.toUpperCase()), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '10px 0 0',
      fontSize: 12.5,
      lineHeight: 1.46,
      color: '#4A443D',
      textWrap: 'pretty',
      position: 'relative',
      zIndex: 2
    }
  }, arch.blurb), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 13,
      paddingTop: 12,
      borderTop: '1px solid rgba(33,30,26,0.10)',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 10,
      position: 'relative',
      zIndex: 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '0 0 auto'
    }
  }, /*#__PURE__*/React.createElement(RadarChart, {
    score: score,
    color: arch.color,
    fill: "rgba(".concat(arch.glowRGB, ",0.3)"),
    size: 72,
    showLabels: false,
    showDots: true,
    ringColor: "rgba(33,30,26,0.12)",
    strokeW: 4
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      justifyContent: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement(FlameMark, {
    size: 17
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'Geist',sans-serif",
      fontWeight: 700,
      fontSize: 14.5,
      letterSpacing: '-0.02em',
      color: '#1A1611'
    }
  }, "UX\xA0Gym")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Geist Mono',monospace",
      fontSize: 8.5,
      letterSpacing: '.04em',
      color: '#A8A095',
      marginTop: 4,
      maxWidth: 150,
      lineHeight: 1.35
    }
  }, "The designer I already am."))))));
}
window.PokemonCard = {
  CollectibleCard: CollectibleCard,
  useTilt: useTilt,
  usePRM: usePRM,
  FlameMark: FlameMark,
  BrandMark: BrandMark
};