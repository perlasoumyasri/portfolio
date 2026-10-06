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

var _React = React,
  useState = _React.useState,
  useEffect = _React.useEffect,
  useRef = _React.useRef,
  useCallback = _React.useCallback;

// ---------------------------------------------------------------- data

var CELEB_DATA = {
  IGNITE: {
    batchType: 'IGNITE',
    moduleName: 'Week 3',
    moduleSub: 'Brain — frame the problem',
    studentFirstName: 'Arjun',
    personalLine: "You\u2019re halfway there, Arjun. Momentum looks good on you.",
    pagesCompleted: '8/8',
    completionDate: '12 Jun 2026'
  },
  BLAZE: {
    batchType: 'BLAZE',
    moduleName: 'Interaction Design',
    moduleSub: 'Sprint 02',
    studentFirstName: 'Priya',
    personalLine: 'Sprint conquered, Priya. Interaction Design is now part of your toolkit.',
    pagesCompleted: '12/12',
    completionDate: '12 Jun 2026'
  }
};
var CONFETTI_COLORS = {
  IGNITE: ['#FF450F', '#FF7E50', '#FFB47A', '#FFD9C8', '#FFFFFF'],
  BLAZE: ['#FF450F', '#FF7E50', '#FFB47A', '#F5C97B', '#FFFFFF']
};

// ---------------------------------------------------------------- hooks

function usePRM() {
  var _useState = useState(function () {
      return typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }),
    _useState2 = _slicedToArray(_useState, 1),
    prm = _useState2[0];
  return prm;
}
function useTilt(prm, fx) {
  var factor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var max = (fx && fx.tiltMax != null ? fx.tiltMax : 7) * factor;
  var persp = fx && fx.perspective || 950;
  var zoom = fx && fx.hoverScale || 1;
  var _useState3 = useState({
      rx: 0,
      ry: 0,
      px: 0.5,
      py: 0.5,
      hover: false
    }),
    _useState4 = _slicedToArray(_useState3, 2),
    t = _useState4[0],
    setT = _useState4[1];
  var onMove = useCallback(function (e) {
    if (prm) return;
    var r = e.currentTarget.getBoundingClientRect();
    var px = (e.clientX - r.left) / r.width;
    var py = (e.clientY - r.top) / r.height;
    setT({
      rx: -(py - 0.5) * max,
      ry: (px - 0.5) * max,
      px: px,
      py: py,
      hover: true
    });
  }, [prm, max]);
  var onLeave = useCallback(function () {
    return setT({
      rx: 0,
      ry: 0,
      px: 0.5,
      py: 0.5,
      hover: false
    });
  }, []);
  var style = {
    transform: "perspective(".concat(persp, "px) rotateX(").concat(t.rx.toFixed(2), "deg) rotateY(").concat(t.ry.toFixed(2), "deg) scale(").concat(t.hover ? zoom : 1, ")"),
    transition: t.hover ? 'transform .14s ease-out' : 'transform .5s cubic-bezier(.22,1,.36,1)',
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

// Cursor-reactive outer glow — drifts opposite the tilt, like light catching the edge.
function glowShadow(fx, tilt, rgb) {
  var baseAlpha = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0.18;
  var gain = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0.42;
  var a = (baseAlpha + fx.edgeGlow * gain).toFixed(2);
  var r = Math.round(46 + fx.edgeGlow * 74);
  var on = tilt.hover ? 1 : 0;
  var gx = Math.round((0.5 - tilt.px) * 34 * on);
  var gy = Math.round((0.5 - tilt.py) * 34 * on) + 20;
  return "".concat(gx, "px ").concat(gy, "px ").concat(r, "px -12px rgba(").concat(rgb, ",").concat(a, ")");
}

// ---------------------------------------------------------------- pieces

function CloseX(_ref) {
  var dark = _ref.dark,
    onClose = _ref.onClose;
  return /*#__PURE__*/React.createElement("button", {
    "aria-label": "Dismiss",
    onClick: onClose,
    style: {
      position: 'absolute',
      top: 12,
      right: 12,
      zIndex: 5,
      width: 28,
      height: 28,
      borderRadius: 999,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: dark ? 'rgba(255,255,255,0.08)' : 'rgba(20,15,10,0.05)',
      border: dark ? '1px solid rgba(255,255,255,0.1)' : '1px solid var(--line)',
      color: dark ? 'var(--ink-on-dark-2)' : 'var(--ink-2)'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 10 10",
    width: "9",
    height: "9",
    stroke: "currentColor",
    strokeWidth: "1.4",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M1.5 1.5l7 7M8.5 1.5l-7 7",
    fill: "none"
  })));
}
function Medallion(_ref2) {
  var _ref2$size = _ref2.size,
    size = _ref2$size === void 0 ? 92 : _ref2$size,
    _ref2$dark = _ref2.dark,
    dark = _ref2$dark === void 0 ? false : _ref2$dark,
    _ref2$hot = _ref2.hot,
    hot = _ref2$hot === void 0 ? false : _ref2$hot,
    _ref2$prm = _ref2.prm,
    prm = _ref2$prm === void 0 ? false : _ref2$prm;
  var _useState5 = useState(prm),
    _useState6 = _slicedToArray(_useState5, 2),
    swept = _useState6[0],
    setSwept = _useState6[1];
  useEffect(function () {
    if (prm) return;
    var t = setTimeout(function () {
      return setSwept(true);
    }, 80);
    return function () {
      return clearTimeout(t);
    };
  }, [prm]);
  var R = size / 2 - 3.5;
  var C = 2 * Math.PI * R;
  var inner = size - 26;
  var medBg = hot ? 'linear-gradient(165deg, #FFC98F 0%, #FF6A2E 38%, var(--orange) 62%, #8C1F03 100%)' : 'linear-gradient(165deg, #FFB47A 0%, var(--orange) 55%, #C2350A 100%)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: size,
      height: size,
      flex: '0 0 auto'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 ".concat(size, " ").concat(size),
    style: {
      position: 'absolute',
      inset: 0,
      transform: 'rotate(-90deg)'
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: R,
    fill: "none",
    stroke: dark ? 'rgba(255,255,255,0.12)' : 'var(--line)',
    strokeWidth: "3"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: R,
    fill: "none",
    stroke: hot ? '#F5A623' : 'var(--orange)',
    strokeWidth: "3",
    strokeLinecap: "round",
    strokeDasharray: C,
    strokeDashoffset: swept ? 0 : C,
    style: {
      transition: 'stroke-dashoffset 1.15s cubic-bezier(.55,.06,.25,1) .45s'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 13,
      left: 13,
      width: inner,
      height: inner,
      borderRadius: 999,
      background: medBg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      boxShadow: '0 1px 0 rgba(255,255,255,0.45) inset, 0 -8px 14px rgba(120,25,0,0.35) inset, 0 10px 24px -6px rgba(255,69,15,0.5)'
    }
  }, /*#__PURE__*/React.createElement(Icon.flame, {
    style: {
      width: inner * 0.42,
      height: inner * 0.42,
      filter: 'drop-shadow(0 2px 3px rgba(120,25,0,0.4))'
    }
  })), /*#__PURE__*/React.createElement("span", {
    className: "celebPop",
    style: {
      position: 'absolute',
      right: 2,
      bottom: 2,
      width: 24,
      height: 24,
      borderRadius: 999,
      background: hot ? '#F5A623' : 'var(--orange)',
      color: 'white',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: dark ? '2.5px solid #14110D' : '2.5px solid white',
      animationDelay: prm ? '0s' : '1.55s'
    }
  }, /*#__PURE__*/React.createElement(Icon.check, null)));
}
function StatChips(_ref3) {
  var data = _ref3.data,
    dark = _ref3.dark;
  var cls = dark ? 'chip chip-dark' : 'chip';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      justifyContent: 'center',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: cls,
    style: {
      height: 26
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: dark ? '#FF8559' : 'var(--orange-ink)',
      display: 'inline-flex'
    }
  }, /*#__PURE__*/React.createElement(Icon.check, null)), /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 11.5
    }
  }, data.pagesCompleted, " pages")), /*#__PURE__*/React.createElement("span", {
    className: cls,
    style: {
      height: 26
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 11.5
    }
  }, "Completed ", data.completionDate)));
}

// Holographic FX stack: iridescent shine band + specular hotspot + noise grain.
// All parameters come from the Tweaks panel via useCelebFx().
var CELEB_NOISE = "url(\"data:image/svg+xml,".concat(encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter><rect width="160" height="160" filter="url(#n)"/></svg>'), "\")");

// Original simple foil — single warm shine band that follows the cursor.
function SimpleFoil(_ref4) {
  var _ref4$x = _ref4.x,
    x = _ref4$x === void 0 ? 0.5 : _ref4$x,
    _ref4$active = _ref4.active,
    active = _ref4$active === void 0 ? false : _ref4$active,
    golden = _ref4.golden;
  var tint = golden ? 'rgba(245,201,123,0.32)' : 'rgba(255,180,122,0.26)';
  var white = golden ? 'rgba(255,243,220,0.5)' : 'rgba(255,255,255,0.55)';
  return /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    style: {
      position: 'absolute',
      inset: '-30%',
      pointerEvents: 'none',
      zIndex: 4,
      background: "linear-gradient(115deg, transparent 36%, ".concat(white, " 46%, ").concat(tint, " 51%, transparent 62%)"),
      mixBlendMode: golden ? 'screen' : 'normal',
      transform: "translateX(".concat(((x - 0.5) * 150).toFixed(1), "%)"),
      opacity: active ? 1 : 0,
      transition: 'transform .55s cubic-bezier(.22,1,.36,1), opacity .5s ease',
      willChange: 'transform, opacity'
    }
  });
}
function HoloFX(_ref5) {
  var fx = _ref5.fx,
    _ref5$px = _ref5.px,
    px = _ref5$px === void 0 ? 0.5 : _ref5$px,
    _ref5$py = _ref5.py,
    py = _ref5$py === void 0 ? 0.5 : _ref5$py,
    _ref5$active = _ref5.active,
    active = _ref5$active === void 0 ? false : _ref5$active,
    golden = _ref5.golden,
    dark = _ref5.dark,
    rich = _ref5.rich;
  var hueBase = fx.hueCenter + (golden ? 18 : 0) + (rich ? (px - 0.5) * fx.hueSpread : 0);
  var ir = fx.iridescence;
  var s = fx.shineStrength;
  var w = fx.bandWidth;
  var hsla = function hsla(h, a) {
    var l = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 70;
    return "hsla(".concat(Math.round((h % 360 + 360) % 360), ", 95%, ").concat(l, "%, ").concat(Math.max(0, Math.min(1, a)).toFixed(3), ")");
  };
  // Diffraction spectrum — a full hue wheel laid diagonally across the surface.
  // Position + hue-rotate are driven by the tilt, so the colors genuinely change
  // with viewing angle, the way a security sticker does.
  var spectrumStops = [];
  for (var i = 0; i <= 6; i++) {
    spectrumStops.push("".concat(hsla(fx.hueCenter + i * 60, ir * (dark ? 0.34 : 0.3), dark ? 62 : 67), " ").concat(Math.round(i * 100 / 6), "%"));
  }
  var rainbow = "linear-gradient(115deg, ".concat(spectrumStops.join(', '), ")");
  // Non-rich cards keep a plain warm-metal foil: white core with a gold/peach
  // tint only — no spectral hues, no cursor-driven hue shift.
  var warmTint = golden ? '245,201,123' : '255,180,122';
  var band = rich ? "linear-gradient(115deg, ".concat(hsla(hueBase - 55, 0, 70), " ").concat((50 - w * 1.45).toFixed(1), "%, ").concat(hsla(hueBase - 55, ir * 0.32, 70), " ").concat((50 - w * 0.6).toFixed(1), "%, ").concat(hsla(hueBase - 20, ir * 0.4, 76), " ").concat((50 - w * 0.25).toFixed(1), "%, rgba(255,255,255,").concat((s * (dark ? 0.6 : 0.7)).toFixed(3), ") 50%, ").concat(hsla(hueBase + 35, ir * 0.42, 74), " ").concat((50 + w * 0.3).toFixed(1), "%, ").concat(hsla(hueBase + 60, ir * 0.32, 70), " ").concat((50 + w * 0.65).toFixed(1), "%, ").concat(hsla(hueBase + 95, ir * 0.18, 68), " ").concat((50 + w).toFixed(1), "%, ").concat(hsla(hueBase + 95, 0, 68), " ").concat((50 + w * 1.45).toFixed(1), "%)") : "linear-gradient(115deg, rgba(".concat(warmTint, ",0) ").concat((50 - w * 1.45).toFixed(1), "%, rgba(").concat(warmTint, ",").concat((s * 0.18).toFixed(3), ") ").concat((50 - w * 0.85).toFixed(1), "%, rgba(").concat(warmTint, ",").concat((s * 0.45).toFixed(3), ") ").concat((50 - w * 0.45).toFixed(1), "%, rgba(255,255,255,").concat((s * (dark ? 0.5 : 0.55)).toFixed(3), ") ").concat((50 - w * 0.12).toFixed(1), "%, rgba(255,255,255,").concat((s * (dark ? 0.65 : 0.75)).toFixed(3), ") 50%, rgba(255,255,255,").concat((s * (dark ? 0.5 : 0.55)).toFixed(3), ") ").concat((50 + w * 0.12).toFixed(1), "%, rgba(").concat(warmTint, ",").concat((s * 0.5).toFixed(3), ") ").concat((50 + w * 0.45).toFixed(1), "%, rgba(").concat(warmTint, ",").concat((s * 0.2).toFixed(3), ") ").concat((50 + w * 0.85).toFixed(1), "%, rgba(").concat(warmTint, ",0) ").concat((50 + w * 1.45).toFixed(1), "%)");
  var spec = rich ? "radial-gradient(circle at ".concat((px * 100).toFixed(1), "% ").concat((py * 100).toFixed(1), "%, rgba(255,255,255,").concat((fx.specular * (dark ? 0.8 : 0.55)).toFixed(3), ") 0%, ").concat(hsla(hueBase + 15, fx.specular * Math.max(ir, 0.25) * 0.35, 78), " ").concat((fx.specSize * 0.45).toFixed(0), "%, transparent ").concat(fx.specSize.toFixed(0), "%)") : "radial-gradient(circle at ".concat((px * 100).toFixed(1), "% ").concat((py * 100).toFixed(1), "%, rgba(255,255,255,").concat((fx.specular * (dark ? 0.8 : 0.55)).toFixed(3), ") 0%, rgba(").concat(warmTint, ",").concat((fx.specular * 0.3).toFixed(3), ") ").concat((fx.specSize * 0.45).toFixed(0), "%, transparent ").concat(fx.specSize.toFixed(0), "%)");
  return /*#__PURE__*/React.createElement(React.Fragment, null, rich && /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    style: {
      position: 'absolute',
      inset: '-8%',
      pointerEvents: 'none',
      zIndex: 3,
      background: rainbow,
      backgroundSize: "".concat(Math.round(fx.rainbowScale), "% ").concat(Math.round(fx.rainbowScale), "%"),
      backgroundPosition: "".concat((px * 100).toFixed(1), "% ").concat((py * 100).toFixed(1), "%"),
      filter: "hue-rotate(".concat(((px + py - 1) * fx.hueSpread).toFixed(0), "deg) saturate(1.15) blur(7px)"),
      mixBlendMode: dark ? 'screen' : 'multiply',
      opacity: active ? 1 : fx.rainbowRest,
      transition: 'background-position .18s ease-out, filter .18s ease-out, opacity .7s ease',
      willChange: 'background-position, filter, opacity'
    }
  }), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    style: {
      position: 'absolute',
      inset: '-30%',
      pointerEvents: 'none',
      zIndex: 4,
      background: band,
      mixBlendMode: dark ? 'screen' : 'normal',
      filter: "blur(".concat(Math.round(fx.bandBlur != null ? fx.bandBlur : 12), "px)"),
      transform: "translateX(".concat(((px - 0.5) * 150).toFixed(1), "%)"),
      opacity: active ? 1 : 0,
      transition: "transform ".concat(Math.round(fx.shineLag), "ms cubic-bezier(.22,1,.36,1), opacity .5s ease"),
      willChange: 'transform, opacity'
    }
  }), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    style: {
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 5,
      background: spec,
      mixBlendMode: dark ? 'screen' : 'normal',
      opacity: active ? 1 : 0,
      transition: 'opacity .45s ease'
    }
  }), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    style: {
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 6,
      backgroundImage: CELEB_NOISE,
      backgroundSize: "".concat(Math.round(fx.noiseScale * 90), "px"),
      opacity: fx.noise,
      mixBlendMode: 'overlay'
    }
  }));
}
function Eyebrow(_ref6) {
  var color = _ref6.color;
  return /*#__PURE__*/React.createElement("div", {
    className: "caption",
    style: {
      color: color,
      fontSize: 10.5,
      letterSpacing: '0.16em'
    }
  }, "MODULE\xA0\xA0COMPLETE");
}
function TierTag(_ref7) {
  var data = _ref7.data,
    dark = _ref7.dark;
  var blaze = data.batchType === 'BLAZE';
  return /*#__PURE__*/React.createElement("span", {
    className: "mono mono-s",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontSize: 10,
      letterSpacing: '0.14em',
      color: blaze ? dark ? '#F5C97B' : '#9A6A1B' : dark ? 'var(--ink-on-dark-2)' : 'var(--ink-3)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 5,
      height: 5,
      borderRadius: 999,
      background: blaze ? dark ? '#F5C97B' : '#C98A1F' : 'var(--orange)'
    }
  }), data.batchType, " BATCH");
}
function CTA(_ref8) {
  var dark = _ref8.dark,
    onContinue = _ref8.onContinue,
    onClose = _ref8.onClose;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 10,
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    style: {
      width: '100%',
      height: 42
    },
    onClick: onContinue
  }, "Continue to next module ", /*#__PURE__*/React.createElement(Icon.chevron, null)), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      fontSize: 12.5,
      fontWeight: 500,
      color: dark ? 'var(--ink-on-dark-2)' : 'var(--ink-2)',
      borderBottom: '1px solid transparent'
    },
    onMouseEnter: function onMouseEnter(e) {
      e.currentTarget.style.borderBottomColor = 'currentColor';
    },
    onMouseLeave: function onMouseLeave(e) {
      e.currentTarget.style.borderBottomColor = 'transparent';
    }
  }, "Back to dashboard"));
}

// ---------------------------------------------------------------- cards

// A · Daylight foil — light collectible with warm gradient edge
function DaylightCard(_ref9) {
  var data = _ref9.data,
    onClose = _ref9.onClose,
    onContinue = _ref9.onContinue,
    prm = _ref9.prm;
  var fx = useCelebFx();
  var tilt = useTilt(prm, fx);
  var blaze = data.batchType === 'BLAZE';
  var edge = blaze ? 'linear-gradient(165deg, #F5C97B 0%, #FF7E50 32%, var(--orange) 58%, #8C1F03 100%)' : 'linear-gradient(165deg, #FFE3D6 0%, #FFB47A 34%, var(--orange) 72%, #E2643C 100%)';
  return /*#__PURE__*/React.createElement("div", {
    onMouseMove: tilt.onMove,
    onMouseLeave: tilt.onLeave,
    style: _objectSpread(_objectSpread({}, tilt.style), {}, {
      width: 340
    })
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 1.5,
      borderRadius: 24,
      background: edge,
      boxShadow: "var(--shadow-lg), ".concat(glowShadow(fx, tilt, blaze ? '212,118,15' : '255,69,15')),
      transition: 'box-shadow .3s ease'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      overflow: 'hidden',
      borderRadius: 22.5,
      background: 'var(--surface)',
      height: 460,
      padding: '26px 26px 22px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    style: {
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      background: blaze ? 'radial-gradient(85% 48% at 50% -6%, rgba(245,166,35,0.16) 0%, rgba(255,69,15,0.07) 45%, transparent 70%)' : 'radial-gradient(85% 48% at 50% -6%, rgba(255,69,15,0.12) 0%, transparent 65%)'
    }
  }), /*#__PURE__*/React.createElement(HoloFX, {
    fx: fx,
    px: tilt.px,
    py: tilt.py,
    active: tilt.hover,
    golden: blaze,
    rich: true
  }), /*#__PURE__*/React.createElement(CloseX, {
    onClose: onClose
  }), /*#__PURE__*/React.createElement("div", {
    className: "celebRise",
    style: {
      animationDelay: '.15s'
    }
  }, /*#__PURE__*/React.createElement(TierTag, {
    data: data
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 16
    }
  }), /*#__PURE__*/React.createElement(Medallion, {
    prm: prm,
    hot: blaze
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 18
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "celebRise",
    style: {
      animationDelay: '.3s'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    color: "var(--orange-ink)"
  })), /*#__PURE__*/React.createElement("div", {
    className: "celebRise",
    style: {
      animationDelay: '.4s',
      fontFamily: 'var(--font-display)',
      fontSize: 42,
      lineHeight: 1.02,
      letterSpacing: '-0.02em',
      marginTop: 9,
      color: 'var(--ink)'
    }
  }, data.moduleName), /*#__PURE__*/React.createElement("div", {
    className: "celebRise mono mono-s",
    style: {
      animationDelay: '.48s',
      color: 'var(--ink-3)',
      marginTop: 7
    }
  }, data.moduleSub.toUpperCase()), /*#__PURE__*/React.createElement("p", {
    className: "celebRise",
    style: {
      animationDelay: '.56s',
      fontSize: 13.5,
      lineHeight: 1.5,
      color: 'var(--ink-2)',
      marginTop: 13,
      maxWidth: 260,
      textWrap: 'pretty'
    }
  }, data.personalLine), /*#__PURE__*/React.createElement("div", {
    className: "celebRise",
    style: {
      animationDelay: '.64s',
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement(StatChips, {
    data: data
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "celebRise",
    style: {
      animationDelay: '.74s',
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement(CTA, {
    onContinue: onContinue,
    onClose: onClose
  })))));
}

// B · Midnight ember — dark premium, golden conic foil edge
function EmberCard(_ref0) {
  var data = _ref0.data,
    onClose = _ref0.onClose,
    onContinue = _ref0.onContinue,
    prm = _ref0.prm;
  var fx = useCelebFx();
  var tilt = useTilt(prm, fx);
  var blaze = data.batchType === 'BLAZE';
  var edge = blaze ? 'conic-gradient(from 215deg, #F5C97B, #FF7E50 18%, var(--orange) 38%, #6E1802 55%, #B8742A 78%, #F5C97B)' : 'conic-gradient(from 215deg, #FFB47A, #FF7E50 22%, var(--orange) 45%, #5A1502 60%, #C2350A 80%, #FFB47A)';
  return /*#__PURE__*/React.createElement("div", {
    onMouseMove: tilt.onMove,
    onMouseLeave: tilt.onLeave,
    style: _objectSpread(_objectSpread({}, tilt.style), {}, {
      width: 340
    })
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 1.5,
      borderRadius: 24,
      background: edge,
      boxShadow: "0 32px 80px -18px ".concat(blaze ? 'rgba(245,166,35,0.4)' : 'rgba(255,69,15,0.42)', ", 0 8px 24px rgba(0,0,0,0.45)")
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      overflow: 'hidden',
      borderRadius: 22.5,
      background: 'linear-gradient(180deg, #1D1813 0%, #0E0D0B 60%)',
      height: 460,
      padding: '26px 26px 22px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      color: 'var(--ink-on-dark)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    style: {
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      background: blaze ? 'radial-gradient(90% 52% at 50% -8%, rgba(245,166,35,0.26) 0%, rgba(255,69,15,0.1) 48%, transparent 72%)' : 'radial-gradient(90% 52% at 50% -8%, rgba(255,69,15,0.28) 0%, transparent 68%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    style: {
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      opacity: 0.05,
      background: 'repeating-linear-gradient(125deg, rgba(255,255,255,0.7) 0 1px, transparent 1px 7px)'
    }
  }), /*#__PURE__*/React.createElement(SimpleFoil, {
    x: tilt.px,
    active: tilt.hover,
    golden: true
  }), /*#__PURE__*/React.createElement(CloseX, {
    dark: true,
    onClose: onClose
  }), /*#__PURE__*/React.createElement("div", {
    className: "celebRise",
    style: {
      animationDelay: '.15s'
    }
  }, /*#__PURE__*/React.createElement(TierTag, {
    data: data,
    dark: true
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 16
    }
  }), /*#__PURE__*/React.createElement(Medallion, {
    prm: prm,
    dark: true,
    hot: blaze
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 18
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "celebRise",
    style: {
      animationDelay: '.3s'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    color: blaze ? '#F5C97B' : '#FF8559'
  })), /*#__PURE__*/React.createElement("div", {
    className: "celebRise it",
    style: {
      animationDelay: '.4s',
      fontFamily: 'var(--font-display)',
      fontSize: 40,
      lineHeight: 1.04,
      letterSpacing: '-0.018em',
      marginTop: 9,
      background: blaze ? 'linear-gradient(100deg, #FFE9C4 10%, #F5C97B 45%, #FF9E63 90%)' : 'linear-gradient(100deg, #FFF2EA 10%, #FFB47A 55%, #FF7E50 90%)',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      color: 'transparent',
      textWrap: 'balance'
    }
  }, data.moduleName), /*#__PURE__*/React.createElement("div", {
    className: "celebRise mono mono-s",
    style: {
      animationDelay: '.48s',
      color: 'var(--ink-on-dark-2)',
      marginTop: 7,
      opacity: 0.75
    }
  }, data.moduleSub.toUpperCase()), /*#__PURE__*/React.createElement("p", {
    className: "celebRise",
    style: {
      animationDelay: '.56s',
      fontSize: 13.5,
      lineHeight: 1.5,
      color: 'var(--ink-on-dark-2)',
      marginTop: 13,
      maxWidth: 262,
      textWrap: 'pretty'
    }
  }, data.personalLine), /*#__PURE__*/React.createElement("div", {
    className: "celebRise",
    style: {
      animationDelay: '.64s',
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement(StatChips, {
    data: data,
    dark: true
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "celebRise",
    style: {
      animationDelay: '.74s',
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement(CTA, {
    dark: true,
    onContinue: onContinue,
    onClose: onClose
  })))));
}

// C · Certificate — editorial paper, stamp medallion, mono ledger
function CertificateCard(_ref1) {
  var data = _ref1.data,
    onClose = _ref1.onClose,
    onContinue = _ref1.onContinue,
    prm = _ref1.prm;
  var fx = useCelebFx();
  var tilt = useTilt(prm, fx, 0.7);
  var blaze = data.batchType === 'BLAZE';
  var tape = blaze ? 'repeating-linear-gradient(100deg, #F5C97B 0 14px, var(--orange) 14px 28px, #8C1F03 28px 42px)' : 'repeating-linear-gradient(100deg, #FFB47A 0 14px, var(--orange) 14px 28px, #C2350A 28px 42px)';
  var ledger = [['PAGES', "".concat(data.pagesCompleted, " \xB7 ALL DONE")], ['COMPLETED', data.completionDate.toUpperCase()], ['BATCH', "".concat(data.batchType).concat(blaze ? ' · ' + data.moduleSub.toUpperCase() : '')]];
  return /*#__PURE__*/React.createElement("div", {
    onMouseMove: tilt.onMove,
    onMouseLeave: tilt.onLeave,
    style: _objectSpread(_objectSpread({}, tilt.style), {}, {
      width: 340
    })
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      overflow: 'hidden',
      borderRadius: 18,
      background: '#FCFAF4',
      border: '1px solid var(--line-strong)',
      height: 480,
      boxShadow: "var(--shadow-lg), ".concat(glowShadow(fx, tilt, '255,69,15', 0.08, 0.3)),
      transition: 'box-shadow .3s ease',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    style: {
      height: 6,
      flex: '0 0 auto',
      background: tape
    }
  }), /*#__PURE__*/React.createElement(HoloFX, {
    fx: fx,
    px: tilt.px,
    py: tilt.py,
    active: tilt.hover,
    golden: blaze
  }), /*#__PURE__*/React.createElement(CloseX, {
    onClose: onClose
  }), /*#__PURE__*/React.createElement("div", {
    className: "celebStamp",
    style: {
      position: 'absolute',
      top: 46,
      right: 22,
      transform: 'rotate(8deg)'
    }
  }, /*#__PURE__*/React.createElement(Medallion, {
    size: 84,
    prm: prm,
    hot: blaze
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: '24px 24px 20px',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "celebRise",
    style: {
      animationDelay: '.15s'
    }
  }, /*#__PURE__*/React.createElement(TierTag, {
    data: data
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 26
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "celebRise",
    style: {
      animationDelay: '.28s'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    color: "var(--orange-ink)"
  })), /*#__PURE__*/React.createElement("div", {
    className: "celebRise it",
    style: {
      animationDelay: '.38s',
      fontFamily: 'var(--font-display)',
      fontSize: 44,
      lineHeight: 1.02,
      letterSpacing: '-0.022em',
      marginTop: 10,
      color: 'var(--ink)',
      maxWidth: 215,
      textWrap: 'balance'
    }
  }, data.moduleName), /*#__PURE__*/React.createElement("p", {
    className: "celebRise",
    style: {
      animationDelay: '.5s',
      fontSize: 13.5,
      lineHeight: 1.55,
      color: 'var(--ink-2)',
      marginTop: 14,
      maxWidth: 250,
      textWrap: 'pretty'
    }
  }, data.personalLine), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "celebRise",
    style: {
      animationDelay: '.6s',
      borderTop: '1px dashed var(--line-strong)',
      paddingTop: 14,
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, ledger.map(function (_ref10) {
    var _ref11 = _slicedToArray(_ref10, 2),
      k = _ref11[0],
      v = _ref11[1];
    return /*#__PURE__*/React.createElement("div", {
      key: k,
      style: {
        display: 'flex',
        alignItems: 'baseline',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "mono mono-s",
      style: {
        color: 'var(--ink-3)',
        fontSize: 10,
        letterSpacing: '0.12em',
        flex: '0 0 86px',
        textAlign: 'left'
      }
    }, k), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        borderBottom: '1px dotted var(--line-strong)',
        alignSelf: 'center'
      }
    }), /*#__PURE__*/React.createElement("span", {
      className: "mono mono-s",
      style: {
        color: 'var(--ink)',
        fontSize: 11
      }
    }, v));
  })), /*#__PURE__*/React.createElement("div", {
    className: "celebRise",
    style: {
      animationDelay: '.7s',
      marginTop: 16,
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 10,
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn",
    style: {
      width: '100%',
      height: 42,
      background: 'var(--surface-dark)',
      color: 'var(--ink-on-dark)',
      boxShadow: '0 1px 0 rgba(255,255,255,0.12) inset, 0 8px 18px -6px rgba(20,15,10,0.4)'
    },
    onClick: onContinue
  }, "Continue to next module ", /*#__PURE__*/React.createElement(Icon.chevron, null)), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      fontSize: 12.5,
      fontWeight: 500,
      color: 'var(--ink-2)'
    }
  }, "Back to dashboard"))))));
}

// ---------------------------------------------------------------- stage

// Faux page sitting behind the overlay — just enough to read as "the LMS".
function FauxPage() {
  var bar = function bar(w) {
    var h = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
    var bg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'var(--surface-2)';
    return /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        width: w,
        height: h,
        borderRadius: 5,
        background: bg
      }
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      background: 'var(--bg)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 250,
      flex: '0 0 auto',
      borderRight: '1px solid var(--line)',
      padding: '20px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "flame"
  }, /*#__PURE__*/React.createElement(Icon.flame, null)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600,
      fontSize: 14
    }
  }, "UX Gym")), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 8
    }
  }), [150, 180, 120, 165, 100, 140, 90].map(function (w, i) {
    return /*#__PURE__*/React.createElement("span", {
      key: i
    }, bar(w));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: '44px 64px',
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, bar(120, 12, 'var(--orange-wash)'), bar(380, 26), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 6
    }
  }), [520, 560, 480, 540, 360].map(function (w, i) {
    return /*#__PURE__*/React.createElement("span", {
      key: i
    }, bar(w));
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 10
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 560,
      height: 150,
      borderRadius: 14,
      background: 'var(--surface)',
      border: '1px solid var(--line)'
    }
  }), [540, 500, 380].map(function (w, i) {
    return /*#__PURE__*/React.createElement("span", {
      key: i
    }, bar(w));
  })));
}
function fireConfetti(canvas, batchType) {
  if (!canvas || !window.confetti) return null;
  var fxv = window.CelebFxStore ? window.CelebFxStore.get() : {};
  var total = fxv.confetti != null ? fxv.confetti : 130;
  if (total <= 0) return null;
  var conf = window.confetti.create(canvas, {
    resize: true,
    useWorker: false
  });
  var colors = CONFETTI_COLORS[batchType] || CONFETTI_COLORS.IGNITE;
  var t = setTimeout(function () {
    conf({
      particleCount: Math.round(total * 0.6),
      spread: 72,
      startVelocity: 34,
      origin: {
        x: 0.5,
        y: 0.62
      },
      colors: colors,
      ticks: 170,
      scalar: 0.9
    });
    conf({
      particleCount: Math.round(total * 0.2),
      angle: 62,
      spread: 48,
      startVelocity: 30,
      origin: {
        x: 0.38,
        y: 0.68
      },
      colors: colors,
      ticks: 150,
      scalar: 0.8
    });
    conf({
      particleCount: Math.round(total * 0.2),
      angle: 118,
      spread: 48,
      startVelocity: 30,
      origin: {
        x: 0.62,
        y: 0.68
      },
      colors: colors,
      ticks: 150,
      scalar: 0.8
    });
  }, 380);
  return {
    stop: function stop() {
      clearTimeout(t);
      conf.reset();
    }
  };
}
function BatchToggle(_ref12) {
  var batch = _ref12.batch,
    onChange = _ref12.onChange;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 16,
      bottom: 14,
      zIndex: 30,
      display: 'flex',
      gap: 2,
      padding: 3,
      borderRadius: 999,
      background: 'rgba(14,13,11,0.7)',
      border: '1px solid rgba(255,255,255,0.12)',
      backdropFilter: 'blur(6px)'
    }
  }, ['IGNITE', 'BLAZE'].map(function (b) {
    return /*#__PURE__*/React.createElement("button", {
      key: b,
      onClick: function onClick() {
        return onChange(b);
      },
      className: "mono",
      style: {
        fontSize: 10,
        letterSpacing: '0.1em',
        fontWeight: 600,
        padding: '5px 12px',
        borderRadius: 999,
        background: batch === b ? 'var(--orange)' : 'transparent',
        color: batch === b ? 'white' : 'rgba(255,255,255,0.55)',
        transition: 'background .15s, color .15s'
      }
    }, b);
  }));
}
function CelebrationStage(_ref13) {
  var Card = _ref13.Card,
    _ref13$defaultBatch = _ref13.defaultBatch,
    defaultBatch = _ref13$defaultBatch === void 0 ? 'IGNITE' : _ref13$defaultBatch;
  var prm = usePRM();
  var _useState7 = useState(defaultBatch),
    _useState8 = _slicedToArray(_useState7, 2),
    batch = _useState8[0],
    setBatch = _useState8[1];
  var _useState9 = useState(true),
    _useState0 = _slicedToArray(_useState9, 2),
    open = _useState0[0],
    setOpen = _useState0[1];
  var _useState1 = useState(0),
    _useState10 = _slicedToArray(_useState1, 2),
    seq = _useState10[0],
    setSeq = _useState10[1];
  var canvasRef = useRef(null);
  var data = CELEB_DATA[batch];
  var replay = useCallback(function (b) {
    setBatch(function (prev) {
      return b || prev;
    });
    setSeq(function (s) {
      return s + 1;
    });
    setOpen(true);
  }, []);
  var close = useCallback(function () {
    return setOpen(false);
  }, []);

  // confetti per reveal
  useEffect(function () {
    if (!open || prm) return;
    var handle = fireConfetti(canvasRef.current, batch);
    return function () {
      return handle && handle.stop();
    };
  }, [open, seq, batch, prm]);
  var onKeyDown = useCallback(function (e) {
    if (e.key === 'Escape' && open) {
      e.stopPropagation();
      setOpen(false);
    }
  }, [open]);
  return /*#__PURE__*/React.createElement("div", {
    className: "uxg celebStage",
    tabIndex: 0,
    onKeyDown: onKeyDown,
    onMouseEnter: function onMouseEnter(e) {
      return e.currentTarget.focus({
        preventScroll: true
      });
    },
    style: {
      position: 'relative',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      outline: 'none'
    }
  }, /*#__PURE__*/React.createElement(CelebCSS, null), /*#__PURE__*/React.createElement(FauxPage, null), open && /*#__PURE__*/React.createElement("div", {
    key: seq,
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "celebBackdrop",
    onClick: close,
    style: {
      position: 'absolute',
      inset: 0,
      background: 'rgba(12,9,6,0.55)',
      backdropFilter: 'blur(7px) saturate(0.9)',
      WebkitBackdropFilter: 'blur(7px) saturate(0.9)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "celebSpring",
    style: {
      pointerEvents: 'auto'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    data: data,
    prm: prm,
    onClose: close,
    onContinue: close
  }))), /*#__PURE__*/React.createElement("canvas", {
    ref: canvasRef,
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 20
    }
  })), !open && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return replay();
    },
    className: "btn",
    style: {
      background: 'var(--surface-dark)',
      color: 'var(--ink-on-dark)',
      height: 44,
      padding: '0 22px',
      borderRadius: 999,
      boxShadow: 'var(--shadow-lg)'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 12 12",
    width: "12",
    height: "12",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.4",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M10 6a4 4 0 1 1-1.2-2.85M10 1.5v2.2H7.8"
  })), "Replay celebration")), /*#__PURE__*/React.createElement(BatchToggle, {
    batch: batch,
    onChange: function onChange(b) {
      return replay(b);
    }
  }));
}
function CelebCSS() {
  return /*#__PURE__*/React.createElement("style", null, "\n      .celebBackdrop { animation: celebFade .35s ease both; }\n      .celebSpring   { animation: celebSpring .68s cubic-bezier(.34,1.4,.45,1) .08s both; }\n      .celebRise     { animation: celebRise .55s cubic-bezier(.22,1,.36,1) both; }\n      .celebPop      { animation: celebPop .4s cubic-bezier(.34,1.56,.64,1) both; }\n      .celebStamp    { animation: celebStampIn .5s cubic-bezier(.34,1.45,.55,1) .85s both; }\n\n      @keyframes celebFade   { from { opacity: 0; } to { opacity: 1; } }\n      @keyframes celebSpring { from { opacity: 0; transform: scale(.74) translateY(30px); }\n                               to   { opacity: 1; transform: scale(1) translateY(0); } }\n      @keyframes celebRise   { from { opacity: 0; transform: translateY(10px); }\n                               to   { opacity: 1; transform: translateY(0); } }\n      @keyframes celebPop    { from { opacity: 0; transform: scale(.3); }\n                               to   { opacity: 1; transform: scale(1); } }\n      @keyframes celebStampIn { from { opacity: 0; transform: rotate(8deg) scale(1.5); }\n                                to   { opacity: 1; transform: rotate(8deg) scale(1); } }\n\n      @media (prefers-reduced-motion: reduce) {\n        .celebBackdrop, .celebSpring, .celebRise, .celebPop, .celebStamp {\n          animation: celebFade .4s ease both;\n        }\n      }\n    ");
}

// ---------------------------------------------------------------- export

function CelebrationDaylight() {
  return /*#__PURE__*/React.createElement(CelebrationStage, {
    Card: DaylightCard,
    defaultBatch: "IGNITE"
  });
}
function CelebrationEmber() {
  return /*#__PURE__*/React.createElement(CelebrationStage, {
    Card: EmberCard,
    defaultBatch: "BLAZE"
  });
}
function CelebrationCertificate() {
  return /*#__PURE__*/React.createElement(CelebrationStage, {
    Card: CertificateCard,
    defaultBatch: "IGNITE"
  });
}
Object.assign(window, {
  CelebrationDaylight: CelebrationDaylight,
  CelebrationEmber: CelebrationEmber,
  CelebrationCertificate: CelebrationCertificate
});