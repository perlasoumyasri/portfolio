function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/* global React */
// ─────────────────────────────────────────────────────────────────────────
//  UX Pokémon · v2 — the visual substrate of the collectible.
//  Per-type "character" config, generative geometric AURAS (no single icon),
//  guilloché security-foil rosettes, and the patterned card BACK (teasers).
//  Everything is built from primitives — circles, lines, arcs, polygons —
//  arranged generatively. No illustration, no single stamped symbol.
// ─────────────────────────────────────────────────────────────────────────

// Extra per-type "character": each creature gets a distinct geometric motif,
// a metallic shine for its name, an element identity and a specimen number.
var PK2_CFG = {
  EYE: {
    motif: 'lens',
    shine: ['#7FD8C8', '#2F7E72', '#0F362F'],
    element: 'PERCEPTION',
    num: '001',
    hp: '58'
  },
  HEART: {
    motif: 'ripple',
    shine: ['#F4A7B0', '#D14B5B', '#5E1822'],
    element: 'EMPATHY',
    num: '002',
    hp: '62'
  },
  BRAIN: {
    motif: 'synapse',
    shine: ['#9F9DE0', '#4B49A6', '#1C1B45'],
    element: 'INQUIRY',
    num: '003',
    hp: '55'
  },
  HAND: {
    motif: 'assembly',
    shine: ['#F3A86E', '#E0611D', '#6B2806'],
    element: 'CRAFT',
    num: '004',
    hp: '64'
  },
  FACE: {
    motif: 'broadcast',
    shine: ['#C99BDD', '#9A4DB8', '#411C56'],
    element: 'STORY',
    num: '005',
    hp: '60'
  }
};
var deg = function deg(d) {
  return d * Math.PI / 180;
};
var onCircle = function onCircle(cx, cy, r, a) {
  return [cx + Math.cos(deg(a)) * r, cy + Math.sin(deg(a)) * r];
};

// ── Guilloché rosette ──────────────────────────────────────────────────────
// Many rotated ellipses → a moiré flower. Pure banknote / holo-foil texture.
function Guilloche(_ref) {
  var _ref$size = _ref.size,
    size = _ref$size === void 0 ? 240 : _ref$size,
    _ref$color = _ref.color,
    color = _ref$color === void 0 ? '#fff' : _ref$color,
    _ref$petals = _ref.petals,
    petals = _ref$petals === void 0 ? 30 : _ref$petals,
    _ref$rx = _ref.rx,
    rx = _ref$rx === void 0 ? 0.46 : _ref$rx,
    _ref$ry = _ref.ry,
    ry = _ref$ry === void 0 ? 0.18 : _ref$ry,
    _ref$opacity = _ref.opacity,
    opacity = _ref$opacity === void 0 ? 0.5 : _ref$opacity,
    _ref$strokeWidth = _ref.strokeWidth,
    strokeWidth = _ref$strokeWidth === void 0 ? 0.6 : _ref$strokeWidth;
  var c = size / 2;
  var R = size * rx,
    r2 = size * ry;
  var rings = [];
  for (var i = 0; i < petals; i++) {
    rings.push(/*#__PURE__*/React.createElement("ellipse", {
      key: i,
      cx: c,
      cy: c,
      rx: R,
      ry: r2,
      transform: "rotate(".concat(i * 360 / petals, " ").concat(c, " ").concat(c, ")"),
      fill: "none",
      stroke: color,
      strokeWidth: strokeWidth
    }));
  }
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 ".concat(size, " ").concat(size),
    width: size,
    height: size,
    style: {
      display: 'block',
      overflow: 'visible',
      opacity: opacity
    },
    "aria-hidden": true
  }, rings);
}

// ── Aura — the generative "presence" of each creature ───────────────────────
// A radial geometric field unique to each type. Sits BEHIND the portrait.
function Aura(_ref2) {
  var type = _ref2.type,
    color = _ref2.color,
    deep = _ref2.deep,
    _ref2$size = _ref2.size,
    size = _ref2$size === void 0 ? 260 : _ref2$size,
    _ref2$opacity = _ref2.opacity,
    opacity = _ref2$opacity === void 0 ? 1 : _ref2$opacity,
    _ref2$idle = _ref2.idle,
    idle = _ref2$idle === void 0 ? false : _ref2$idle;
  var cfg = PK2_CFG[type] || PK2_CFG.EYE;
  var c = size / 2;
  var els = [];
  var motif = cfg.motif;
  if (motif === 'lens') {
    // radiating sightlines + nested lens rings
    for (var i = 0; i < 32; i++) {
      var _onCircle = onCircle(c, c, size * 0.18, i * 11.25),
        _onCircle2 = _slicedToArray(_onCircle, 2),
        x1 = _onCircle2[0],
        y1 = _onCircle2[1];
      var _onCircle3 = onCircle(c, c, size * 0.5, i * 11.25),
        _onCircle4 = _slicedToArray(_onCircle3, 2),
        x2 = _onCircle4[0],
        y2 = _onCircle4[1];
      els.push(/*#__PURE__*/React.createElement("line", {
        key: 'l' + i,
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2,
        stroke: color,
        strokeWidth: "1",
        opacity: i % 2 ? 0.16 : 0.3
      }));
    }
    [0.5, 0.4, 0.3, 0.2].forEach(function (f, i) {
      return els.push(/*#__PURE__*/React.createElement("ellipse", {
        key: 'e' + i,
        cx: c,
        cy: c,
        rx: size * f,
        ry: size * f * 0.62,
        fill: "none",
        stroke: color,
        strokeWidth: "1.4",
        opacity: 0.32 - i * 0.04
      }));
    });
  } else if (motif === 'ripple') {
    for (var _i = 8; _i >= 1; _i--) els.push(/*#__PURE__*/React.createElement("circle", {
      key: 'c' + _i,
      cx: c,
      cy: c,
      r: size * 0.058 * _i,
      fill: "none",
      stroke: color,
      strokeWidth: _i % 2 ? 1.6 : 1,
      opacity: 0.34 - _i * 0.03
    }));
    for (var _i2 = 0; _i2 < 12; _i2++) {
      var _onCircle5 = onCircle(c, c, size * 0.44, _i2 * 30),
        _onCircle6 = _slicedToArray(_onCircle5, 2),
        x = _onCircle6[0],
        y = _onCircle6[1];
      els.push(/*#__PURE__*/React.createElement("circle", {
        key: 'd' + _i2,
        cx: x,
        cy: y,
        r: "2.6",
        fill: color,
        opacity: "0.4"
      }));
    }
  } else if (motif === 'synapse') {
    var nodes = [];
    for (var _i3 = 0; _i3 < 9; _i3++) nodes.push(onCircle(c, c, size * 0.42, _i3 * 40 - 90));
    nodes.forEach(function (n, i) {
      var m = nodes[(i + 1) % nodes.length];
      els.push(/*#__PURE__*/React.createElement("line", {
        key: 'ring' + i,
        x1: n[0],
        y1: n[1],
        x2: m[0],
        y2: m[1],
        stroke: color,
        strokeWidth: "1",
        opacity: "0.22"
      }));
      els.push(/*#__PURE__*/React.createElement("line", {
        key: 'spk' + i,
        x1: c,
        y1: c,
        x2: n[0],
        y2: n[1],
        stroke: color,
        strokeWidth: "1",
        opacity: "0.26"
      }));
    });
    nodes.forEach(function (n, i) {
      return els.push(/*#__PURE__*/React.createElement("circle", {
        key: 'nd' + i,
        cx: n[0],
        cy: n[1],
        r: i % 2 ? 5 : 7,
        fill: i % 2 ? color : deep,
        opacity: "0.55"
      }));
    });
    els.push(/*#__PURE__*/React.createElement("circle", {
      key: "core",
      cx: c,
      cy: c,
      r: "11",
      fill: color,
      opacity: "0.5"
    }));
  } else if (motif === 'assembly') {
    // bauhaus blocks orbiting on two rings
    var shapeAt = function shapeAt(x, y, k, s) {
      if (k === 0) return /*#__PURE__*/React.createElement("circle", {
        key: 's' + x + y,
        cx: x,
        cy: y,
        r: s,
        fill: color,
        opacity: "0.42"
      });
      if (k === 1) return /*#__PURE__*/React.createElement("rect", {
        key: 's' + x + y,
        x: x - s,
        y: y - s,
        width: s * 2,
        height: s * 2,
        rx: "2",
        fill: deep,
        opacity: "0.4",
        transform: "rotate(12 ".concat(x, " ").concat(y, ")")
      });
      return /*#__PURE__*/React.createElement("polygon", {
        key: 's' + x + y,
        points: "".concat(x, ",").concat(y - s, " ").concat(x + s, ",").concat(y + s, " ").concat(x - s, ",").concat(y + s),
        fill: color,
        opacity: "0.46"
      });
    };
    for (var _i4 = 0; _i4 < 9; _i4++) {
      var _onCircle7 = onCircle(c, c, size * 0.44, _i4 * 40),
        _onCircle8 = _slicedToArray(_onCircle7, 2),
        _x = _onCircle8[0],
        _y = _onCircle8[1];
      els.push(shapeAt(_x, _y, _i4 % 3, 9));
    }
    for (var _i5 = 0; _i5 < 6; _i5++) {
      var _onCircle9 = onCircle(c, c, size * 0.24, _i5 * 60 + 30),
        _onCircle0 = _slicedToArray(_onCircle9, 2),
        _x2 = _onCircle0[0],
        _y2 = _onCircle0[1];
      els.push(shapeAt(_x2, _y2, (_i5 + 1) % 3, 6));
    }
    els.push(/*#__PURE__*/React.createElement("circle", {
      key: "ringline",
      cx: c,
      cy: c,
      r: size * 0.44,
      fill: "none",
      stroke: color,
      strokeWidth: "1",
      opacity: "0.2"
    }));
  } else if (motif === 'broadcast') {
    // concentric upward-opening arcs — radiating story
    for (var _i6 = 1; _i6 <= 6; _i6++) {
      var r = size * 0.07 * _i6;
      var _onCircle1 = onCircle(c, c + size * 0.04, r, 150),
        _onCircle10 = _slicedToArray(_onCircle1, 2),
        sx = _onCircle10[0],
        sy = _onCircle10[1];
      var _onCircle11 = onCircle(c, c + size * 0.04, r, 30),
        _onCircle12 = _slicedToArray(_onCircle11, 2),
        ex = _onCircle12[0],
        ey = _onCircle12[1];
      els.push(/*#__PURE__*/React.createElement("path", {
        key: 'a' + _i6,
        d: "M ".concat(sx, " ").concat(sy, " A ").concat(r, " ").concat(r, " 0 0 1 ").concat(ex, " ").concat(ey),
        fill: "none",
        stroke: color,
        strokeWidth: _i6 % 2 ? 1.8 : 1.1,
        opacity: 0.4 - _i6 * 0.04
      }));
    }
    for (var _i7 = 0; _i7 < 16; _i7++) {
      var _onCircle13 = onCircle(c, c, size * 0.46, _i7 * 22.5),
        _onCircle14 = _slicedToArray(_onCircle13, 2),
        _x3 = _onCircle14[0],
        _y3 = _onCircle14[1];
      els.push(/*#__PURE__*/React.createElement("circle", {
        key: 'p' + _i7,
        cx: _x3,
        cy: _y3,
        r: "1.8",
        fill: color,
        opacity: "0.34"
      }));
    }
  }
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 ".concat(size, " ").concat(size),
    width: size,
    height: size,
    "aria-hidden": true,
    className: idle ? 'pk2Spin' : '',
    style: {
      display: 'block',
      overflow: 'visible',
      opacity: opacity,
      transformOrigin: 'center'
    }
  }, els);
}

// ── Card BACK — patterned, type-neutral, for the welcome-screen teasers ─────
function CardBack(_ref3) {
  var _ref3$w = _ref3.w,
    w = _ref3$w === void 0 ? 300 : _ref3$w;
  var h = Math.round(w * 1.42);
  var BrandMark = window.PokemonCard.BrandMark;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: w,
      height: h,
      borderRadius: 22,
      position: 'relative',
      overflow: 'hidden',
      padding: 7,
      background: 'linear-gradient(150deg, #F2B27A 0%, #FF450F 44%, #7C1E04 100%)',
      boxShadow: '0 1px 2px rgba(20,15,10,0.18), 0 6px 14px -6px rgba(124,30,4,0.34), 0 20px 40px -18px rgba(124,30,4,0.42), 0 44px 88px -44px rgba(124,30,4,0.5)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 7,
      borderRadius: 16,
      overflow: 'hidden',
      background: 'radial-gradient(120% 90% at 50% 14%, #2A211B 0%, #18120E 55%, #0E0A07 100%)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Guilloche, {
    size: w * 1.4,
    color: "#FF8A4A",
    petals: 34,
    opacity: 0.16,
    strokeWidth: 0.7
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Guilloche, {
    size: w * 0.78,
    color: "#FFB47A",
    petals: 26,
    rx: 0.5,
    ry: 0.5,
    opacity: 0.2,
    strokeWidth: 0.6
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 14,
      borderRadius: 11,
      border: '1px solid rgba(255,138,74,0.34)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 19,
      borderRadius: 8,
      border: '1px solid rgba(255,138,74,0.16)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 26,
      left: 0,
      right: 0,
      textAlign: 'center',
      fontFamily: "'Geist Mono',monospace",
      fontSize: w * 0.038,
      letterSpacing: '.34em',
      color: 'rgba(255,176,122,0.78)'
    }
  }, "THE\xA0UX\xA0POK\xC9MON"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
      width: w * 0.4,
      height: w * 0.4,
      borderRadius: '50%',
      background: 'radial-gradient(circle at 38% 30%, #FFB47A, #FF450F 58%, #9A2606)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 12px 30px -8px rgba(255,69,15,0.7), inset 0 2px 5px rgba(255,255,255,0.4), inset 0 -8px 14px rgba(0,0,0,0.35)',
      border: '2px solid rgba(255,200,160,0.5)'
    }
  }, /*#__PURE__*/React.createElement(BrandMark, {
    size: w * 0.2
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 26,
      left: 0,
      right: 0,
      textAlign: 'center',
      fontFamily: "'Geist Mono',monospace",
      fontSize: w * 0.034,
      letterSpacing: '.3em',
      color: 'rgba(255,176,122,0.62)'
    }
  }, "UX\xA0GYM\xA0\xB7\xA0FIRST\xA0DRILL"), [[14, 14], [14, null], [null, 14], [null, null]].map(function (_ref4, i) {
    var _ref5 = _slicedToArray(_ref4, 2),
      t = _ref5[0],
      l = _ref5[1];
    return /*#__PURE__*/React.createElement("span", {
      key: i,
      style: {
        position: 'absolute',
        top: t != null ? 30 : 'auto',
        bottom: t == null ? 30 : 'auto',
        left: l != null ? 30 : 'auto',
        right: l == null ? 30 : 'auto',
        width: 6,
        height: 6,
        background: '#FF8A4A',
        transform: 'rotate(45deg)',
        opacity: 0.6
      }
    });
  })));
}
window.PK2 = {
  CFG: PK2_CFG,
  Guilloche: Guilloche,
  Aura: Aura,
  CardBack: CardBack,
  onCircle: onCircle
};