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
//  UX Pokémon · v2 — THE REVEAL + THE HERO PAGE (dark / cinematic).
//  You sink into darkness. The card you were dealt flips up out of the black,
//  light blooming — the epiphany hit. Then it lives there, glowing, alive.
//  Name, photo and the read-out all sit BELOW it, secondary.
// ─────────────────────────────────────────────────────────────────────────

var _React = React,
  sState = _React.useState,
  sEffect = _React.useEffect,
  sRef = _React.useRef;
var D_INK = '#FAF6F0',
  D_INK2 = 'rgba(250,246,240,0.72)',
  D_INK3 = 'rgba(250,246,240,0.46)',
  D_LINE = 'rgba(255,255,255,0.12)',
  S_OR = '#FF450F';

// ── reading… (held breath, in the dark) ─────────────────────────────────────
function Reveal() {
  var A = window.POKEMON.ARCH;
  var cols = ['HEART', 'BRAIN', 'HAND', 'FACE', 'EYE'].map(function (t) {
    return A[t].color;
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 30,
      padding: 24,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    style: {
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(circle at 50% 46%, rgba(255,69,15,0.1), transparent 60%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      gap: 14
    }
  }, cols.map(function (c, i) {
    return /*#__PURE__*/React.createElement("span", {
      key: i,
      style: {
        width: 15,
        height: 15,
        borderRadius: '50%',
        background: c,
        boxShadow: "0 0 16px ".concat(c),
        animation: "pk2Pulse 1.3s ease-in-out ".concat((i * 0.12).toFixed(2), "s infinite")
      }
    });
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      fontFamily: "'Instrument Serif',Georgia,serif",
      fontSize: 'clamp(28px,4vw,40px)',
      color: D_INK,
      textAlign: 'center',
      textWrap: 'balance',
      letterSpacing: '-.01em'
    }
  }, "Reading the shape of who you are."), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      fontFamily: "'Geist Mono',monospace",
      fontSize: 12,
      letterSpacing: '.18em',
      textTransform: 'uppercase',
      color: D_INK3
    }
  }, "One moment"));
}
function S_Primary(_ref) {
  var children = _ref.children,
    onClick = _ref.onClick,
    style = _ref.style;
  var _sState = sState(false),
    _sState2 = _slicedToArray(_sState, 2),
    h = _sState2[0],
    setH = _sState2[1];
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    onMouseEnter: function onMouseEnter() {
      return setH(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setH(false);
    },
    style: _objectSpread({
      border: 'none',
      borderRadius: 999,
      padding: '16px 34px',
      fontSize: 16,
      fontWeight: 600,
      fontFamily: "'Geist',sans-serif",
      cursor: 'pointer',
      background: S_OR,
      color: '#fff',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      justifyContent: 'center',
      boxShadow: h ? '0 0 0 1px rgba(255,69,15,0.5), 0 22px 50px -12px rgba(255,69,15,0.8)' : '0 0 30px -8px rgba(255,69,15,0.6), 0 12px 26px -10px rgba(255,69,15,0.55)',
      transform: h ? 'translateY(-2px)' : 'none',
      transition: 'all .16s ease'
    }, style)
  }, children);
}
function S_Text(_ref2) {
  var children = _ref2.children,
    onClick = _ref2.onClick;
  var _sState3 = sState(false),
    _sState4 = _slicedToArray(_sState3, 2),
    h = _sState4[0],
    setH = _sState4[1];
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    onMouseEnter: function onMouseEnter() {
      return setH(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setH(false);
    },
    style: {
      background: 'transparent',
      border: 'none',
      color: h ? D_INK : D_INK3,
      fontSize: 14,
      cursor: 'pointer',
      padding: 8,
      transition: 'color .15s ease'
    }
  }, children);
}
function PhotoDrop(_ref3) {
  var hasPhoto = _ref3.hasPhoto,
    onPhoto = _ref3.onPhoto,
    error = _ref3.error,
    accent = _ref3.accent;
  var _sState5 = sState(false),
    _sState6 = _slicedToArray(_sState5, 2),
    h = _sState6[0],
    setH = _sState6[1];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    onMouseEnter: function onMouseEnter() {
      return setH(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setH(false);
    },
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 13,
      padding: '14px 16px',
      border: '1.5px dashed ' + (h ? accent : 'rgba(255,255,255,0.24)'),
      borderRadius: 14,
      background: h ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.035)',
      cursor: 'pointer',
      transition: 'all .15s ease'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flexShrink: 0,
      width: 38,
      height: 38,
      borderRadius: 10,
      background: accent,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      boxShadow: "0 0 18px -4px ".concat(accent)
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.7"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 16V5m0 0L8 9m4-4 4 4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 16v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2"
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 14.5,
      fontWeight: 600,
      color: D_INK
    }
  }, hasPhoto ? 'Change your photo' : 'Add your photo'), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 12,
      color: D_INK3,
      marginTop: 1
    }
  }, "A clear photo of your face works best.")), /*#__PURE__*/React.createElement("input", {
    type: "file",
    accept: "image/*",
    onChange: onPhoto,
    style: {
      display: 'none'
    }
  })), error && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 7,
      fontSize: 12,
      color: '#FF8A6A'
    }
  }, error));
}
function NameInput(_ref4) {
  var value = _ref4.value,
    onChange = _ref4.onChange,
    accent = _ref4.accent;
  var _sState7 = sState(false),
    _sState8 = _slicedToArray(_sState7, 2),
    f = _sState8[0],
    setF = _sState8[1];
  return /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: value,
    onChange: onChange,
    onFocus: function onFocus() {
      return setF(true);
    },
    onBlur: function onBlur() {
      return setF(false);
    },
    placeholder: "Type your name",
    maxLength: 28,
    style: {
      width: '100%',
      border: '1px solid ' + (f ? accent : D_LINE),
      borderRadius: 12,
      background: 'rgba(255,255,255,0.05)',
      padding: '14px 16px',
      fontFamily: "'Geist',sans-serif",
      fontSize: 15,
      color: D_INK,
      outline: 'none',
      transition: 'all .15s ease',
      boxShadow: f ? "0 0 0 4px ".concat(accent, "26") : 'none'
    }
  });
}
function InsightCard(_ref5) {
  var label = _ref5.label,
    text = _ref5.text,
    accent = _ref5.accent;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '1 1 300px',
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid ' + D_LINE,
      borderRadius: 18,
      padding: '24px 26px',
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: 3,
      height: '100%',
      background: accent,
      opacity: 0.7
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Geist Mono',monospace",
      fontSize: 11,
      letterSpacing: '.12em',
      textTransform: 'uppercase',
      color: D_INK3,
      marginBottom: 11
    }
  }, label), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 16.5,
      lineHeight: 1.55,
      color: 'rgba(250,246,240,0.88)',
      textWrap: 'pretty'
    }
  }, text));
}

// ── the flip — back of the card turns up to reveal the front ────────────────
function FlipReveal(_ref6) {
  var arch = _ref6.arch,
    score = _ref6.score,
    name = _ref6.name,
    photoUrl = _ref6.photoUrl,
    prm = _ref6.prm,
    cardRef = _ref6.cardRef,
    adj = _ref6.adj,
    onAdjust = _ref6.onAdjust,
    aspect = _ref6.aspect;
  var HeroCard = window.PK2Card.HeroCard;
  var CardBack = window.PK2.CardBack;
  var noFlip = prm || new URLSearchParams(location.search).get('flip') === '0';
  var _sState9 = sState(noFlip),
    _sState0 = _slicedToArray(_sState9, 2),
    flipped = _sState0[0],
    setFlipped = _sState0[1];
  var _sState1 = sState(false),
    _sState10 = _slicedToArray(_sState1, 2),
    bloom = _sState10[0],
    setBloom = _sState10[1];
  var _sState11 = sState(noFlip),
    _sState12 = _slicedToArray(_sState11, 2),
    done = _sState12[0],
    setDone = _sState12[1];
  sEffect(function () {
    if (noFlip) {
      setFlipped(true);
      setDone(true);
      return;
    }
    var t1 = setTimeout(function () {
      return setFlipped(true);
    }, 400);
    var t2 = setTimeout(function () {
      return setBloom(true);
    }, 1180);
    var t3 = setTimeout(function () {
      return setDone(true);
    }, 1500);
    var t4 = setTimeout(function () {
      return setBloom(false);
    }, 2600);
    return function () {
      [t1, t2, t3, t4].forEach(clearTimeout);
    };
  }, [noFlip]);

  // Once the reveal flip is finished, drop the 3D flip scaffolding (perspective /
  // preserve-3d / transform). Nested 3D distorts pointer hit-testing and makes the
  // tilt + shine "break" near the edges; in normal flow the hover glides smoothly.
  return /*#__PURE__*/React.createElement("div", {
    style: {
      perspective: done ? 'none' : 1700
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: 416,
      transformStyle: done ? 'flat' : 'preserve-3d',
      transition: done || noFlip ? 'none' : 'transform 0.95s cubic-bezier(.36,.05,.2,1)',
      transform: done ? 'none' : flipped ? 'rotateY(0deg)' : 'rotateY(180deg)'
    }
  }, bloom && /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    className: "pk2Bloom",
    style: {
      position: 'absolute',
      top: 150,
      left: '50%',
      width: 320,
      height: 320,
      zIndex: 30,
      pointerEvents: 'none',
      background: "radial-gradient(circle, rgba(255,255,255,0.82) 0%, rgba(".concat(arch.glowRGB, ",0.5) 26%, transparent 64%)"),
      mixBlendMode: 'screen'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      backfaceVisibility: done ? 'visible' : 'hidden',
      WebkitBackfaceVisibility: done ? 'visible' : 'hidden'
    }
  }, /*#__PURE__*/React.createElement(HeroCard, {
    arch: arch,
    score: score,
    name: name,
    photoUrl: photoUrl,
    prm: prm,
    cardRef: cardRef,
    minting: flipped && !prm,
    adj: adj,
    onAdjust: onAdjust,
    aspect: aspect,
    alive: true
  })), !done && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      backfaceVisibility: 'hidden',
      WebkitBackfaceVisibility: 'hidden',
      transform: 'rotateY(180deg)'
    }
  }, /*#__PURE__*/React.createElement(CardBack, {
    w: 416
  }))));
}

// ── circular crop overlay — opens on upload; the circle IS the card slot, so
// what they frame here is exactly what lands on the card (WYSIWYG). Pan + zoom
// are stored as percentage offsets, identical units to the card render.
function PhotoCrop(_ref7) {
  var photoUrl = _ref7.photoUrl,
    adj = _ref7.adj,
    aspect = _ref7.aspect,
    accent = _ref7.accent,
    onAdjust = _ref7.onAdjust,
    onDone = _ref7.onDone,
    onPhoto = _ref7.onPhoto;
  var _sState13 = sState(null),
    _sState14 = _slicedToArray(_sState13, 2),
    mode = _sState14[0],
    setMode = _sState14[1];
  var dref = sRef(null);
  var ai = aspect > 0 ? aspect : 1;
  var A = adj || {
    fx: 0,
    fy: 0,
    fw: 1,
    fh: 1
  };
  var STAGE = 280;
  var Dw = ai >= 1 ? STAGE : STAGE * ai;
  var Dh = ai >= 1 ? STAGE / ai : STAGE;
  var fwMax = Math.min(1, 1 / ai),
    fwMin = 0.3;
  function clampBox(fx, fy, fw) {
    fw = Math.max(fwMin, Math.min(fwMax, fw));
    var fh = fw * ai;
    fx = Math.max(0, Math.min(1 - fw, fx));
    fy = Math.max(0, Math.min(1 - fh, fy));
    return {
      fx: fx,
      fy: fy,
      fw: fw,
      fh: fh
    };
  }
  function bodyDown(e) {
    e.stopPropagation();
    e.preventDefault();
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch (er) {}
    dref.current = {
      type: 'move',
      sx: e.clientX,
      sy: e.clientY,
      fx: A.fx,
      fy: A.fy,
      fw: A.fw
    };
    setMode('move');
  }
  function handleDown(e) {
    e.stopPropagation();
    e.preventDefault();
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch (er) {}
    dref.current = {
      type: 'resize',
      sx: e.clientX,
      sy: e.clientY,
      fx: A.fx,
      fy: A.fy,
      fw: A.fw
    };
    setMode('resize');
  }
  function onMove(e) {
    var d = dref.current;
    if (!d) return;
    e.stopPropagation();
    if (d.type === 'move') {
      onAdjust(clampBox(d.fx + (e.clientX - d.sx) / Dw, d.fy + (e.clientY - d.sy) / Dh, d.fw));
    } else {
      var dd = Math.max((e.clientX - d.sx) / Dw, (e.clientY - d.sy) / Dh);
      onAdjust(clampBox(d.fx, d.fy, d.fw + dd));
    }
  }
  function onUp() {
    dref.current = null;
    setMode(null);
  }
  function reset() {
    var fw = Math.min(1, 1 / ai),
      fh = Math.min(1, ai);
    onAdjust({
      fx: (1 - fw) / 2,
      fy: ai < 1 ? 0 : (1 - fh) / 2,
      fw: fw,
      fh: fh
    });
  }
  var bx = A.fx * Dw,
    by = A.fy * Dh,
    bs = A.fw * Dw;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onDone,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 60,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(8,5,4,0.8)',
      backdropFilter: 'blur(6px)',
      WebkitBackdropFilter: 'blur(6px)',
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: function onClick(e) {
      e.stopPropagation();
    },
    style: {
      position: 'relative',
      width: '100%',
      maxWidth: 360,
      background: 'linear-gradient(168deg,#1A130E,#0E0A07)',
      border: '1px solid ' + D_LINE,
      borderRadius: 22,
      padding: '24px 24px 20px',
      textAlign: 'center',
      boxShadow: '0 30px 80px -30px rgba(0,0,0,0.8)'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onDone,
    "aria-label": "Close",
    style: {
      position: 'absolute',
      top: 11,
      right: 11,
      width: 28,
      height: 28,
      borderRadius: '50%',
      border: 'none',
      background: 'rgba(255,255,255,0.08)',
      color: D_INK2,
      fontSize: 17,
      lineHeight: 1,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, "\xD7"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Geist Mono',monospace",
      fontSize: 11,
      letterSpacing: '.16em',
      textTransform: 'uppercase',
      color: D_INK3
    }
  }, "Crop your photo"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '8px 0 18px',
      fontSize: 13.5,
      lineHeight: 1.5,
      color: D_INK2
    }
  }, "Move the box over your face. Drag the corner to resize. Only what is inside the box lands on your card."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: Dw,
      height: Dh,
      borderRadius: 8,
      overflow: 'hidden',
      touchAction: 'none',
      userSelect: 'none',
      backgroundImage: 'url("' + photoUrl + '")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      boxShadow: '0 0 0 1px rgba(255,255,255,0.12)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onPointerDown: bodyDown,
    onPointerMove: onMove,
    onPointerUp: onUp,
    onPointerCancel: onUp,
    style: {
      position: 'absolute',
      left: bx,
      top: by,
      width: bs,
      height: bs,
      cursor: mode === 'move' ? 'grabbing' : 'move',
      boxShadow: '0 0 0 9999px rgba(0,0,0,0.55)',
      border: '2px solid #fff',
      borderRadius: 2,
      boxSizing: 'border-box',
      touchAction: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onPointerDown: handleDown,
    onPointerMove: onMove,
    onPointerUp: onUp,
    onPointerCancel: onUp,
    style: {
      position: 'absolute',
      right: -10,
      bottom: -10,
      width: 20,
      height: 20,
      borderRadius: '50%',
      background: accent,
      border: '2px solid #fff',
      cursor: 'nwse-resize',
      boxShadow: '0 1px 5px rgba(0,0,0,0.6)',
      touchAction: 'none'
    }
  })))), /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-block',
      marginTop: 14,
      fontSize: 13,
      color: D_INK2,
      textDecoration: 'underline',
      textUnderlineOffset: '3px',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "file",
    accept: "image/*",
    onChange: onPhoto,
    style: {
      display: 'none'
    }
  }), "Choose a different photo"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: reset,
    style: {
      flex: '0 0 auto',
      padding: '12px 18px',
      borderRadius: 11,
      border: '1px solid ' + D_LINE,
      background: 'transparent',
      color: D_INK2,
      fontSize: 14,
      cursor: 'pointer'
    }
  }, "Reset"), /*#__PURE__*/React.createElement("button", {
    onClick: onDone,
    style: {
      flex: 1,
      padding: '12px 18px',
      borderRadius: 11,
      border: 'none',
      background: accent,
      color: '#fff',
      fontSize: 14.5,
      fontWeight: 600,
      cursor: 'pointer',
      boxShadow: '0 0 24px -6px ' + accent
    }
  }, "Use this photo"))));
}

// compact action chips used under the card (name + photo + download + share)
var CHIP = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 7,
  padding: '10px 13px',
  borderRadius: 11,
  border: '1px solid ' + D_LINE,
  background: 'rgba(255,255,255,0.05)',
  color: D_INK,
  fontFamily: "'Geist',sans-serif",
  fontSize: 13.5,
  fontWeight: 500,
  cursor: 'pointer',
  whiteSpace: 'nowrap'
};
function chipPrimary(accent) {
  return Object.assign({}, CHIP, {
    border: 'none',
    background: accent,
    color: '#fff',
    fontWeight: 600,
    boxShadow: '0 0 22px -8px ' + accent
  });
}
var GL = {
  width: 16,
  height: 16,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.9,
  strokeLinecap: 'round',
  strokeLinejoin: 'round'
};
function PhotoGlyph() {
  return /*#__PURE__*/React.createElement("svg", GL, /*#__PURE__*/React.createElement("path", {
    d: "M4 7h3l1.6-2h6.8L17 7h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1z"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "13",
    r: "3.2"
  }));
}
function CropGlyph() {
  return /*#__PURE__*/React.createElement("svg", GL, /*#__PURE__*/React.createElement("path", {
    d: "M7 2v15a2 2 0 0 0 2 2h15"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M2 7h15a2 2 0 0 1 2 2v15"
  }));
}
function DownGlyph() {
  return /*#__PURE__*/React.createElement("svg", GL, /*#__PURE__*/React.createElement("path", {
    d: "M12 4v12m0 0l-4-4m4 4l4-4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M4 18v1a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-1"
  }));
}

// ── THE HERO PAGE ───────────────────────────────────────────────────────────
function ConfirmReset(_ref8) {
  var onCancel = _ref8.onCancel,
    onConfirm = _ref8.onConfirm,
    onReview = _ref8.onReview;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onCancel,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 95,
      background: 'rgba(8,5,4,0.74)',
      backdropFilter: 'blur(6px)',
      WebkitBackdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: function onClick(e) {
      e.stopPropagation();
    },
    style: {
      width: '100%',
      maxWidth: 380,
      background: 'linear-gradient(180deg,#1b1410,#120d0a)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 18,
      padding: '28px 24px',
      textAlign: 'center',
      boxShadow: '0 40px 100px -30px rgba(0,0,0,0.7)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Instrument Serif',serif",
      fontSize: 25,
      color: '#EFE7DD'
    }
  }, "Start again?"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      lineHeight: 1.55,
      color: '#cdbfb2',
      marginTop: 10
    }
  }, "This erases your answers and takes you back to the very start of the workbook. This cannot be undone."), /*#__PURE__*/React.createElement("button", {
    onClick: onConfirm,
    style: {
      width: '100%',
      marginTop: 22,
      border: 'none',
      borderRadius: 12,
      padding: '13px 16px',
      background: '#C0392B',
      color: '#fff',
      fontFamily: "'Geist',sans-serif",
      fontWeight: 600,
      fontSize: 14,
      cursor: 'pointer'
    }
  }, "Reset everything"), /*#__PURE__*/React.createElement("button", {
    onClick: onCancel,
    style: {
      width: '100%',
      marginTop: 10,
      border: '1px solid rgba(255,255,255,0.16)',
      background: 'rgba(255,255,255,0.05)',
      color: '#EFE7DD',
      borderRadius: 12,
      padding: '12px 16px',
      fontFamily: "'Geist',sans-serif",
      fontWeight: 600,
      fontSize: 14,
      cursor: 'pointer'
    }
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    onClick: onReview,
    style: {
      width: '100%',
      marginTop: 14,
      background: 'transparent',
      border: 'none',
      color: '#9a8f82',
      fontFamily: "'Geist',sans-serif",
      fontWeight: 600,
      fontSize: 13,
      cursor: 'pointer',
      textDecoration: 'underline',
      textUnderlineOffset: '3px'
    }
  }, "Check your answers instead")));
}
function ReviewOverlay(_ref9) {
  var flow = _ref9.flow,
    answers = _ref9.answers,
    arch = _ref9.arch,
    onClose = _ref9.onClose,
    dbRows = _ref9.dbRows;
  var LBL = ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree'];
  function ansText(it) {
    var val = answers[it.key];
    if (val == null || val === '') return null;
    if (it.kind === 'reflection') return String(val);
    if (it.kind === 'scale') return LBL[(val | 0) - 1] || String(val);
    var opts = it.options || [];
    if (Array.isArray(val)) return val.map(function (j) {
      return opts[j] && opts[j].text;
    }).filter(Boolean).join('  ·  ');
    return opts[val] && opts[val].text || String(val);
  }
  function dbAnsText(row) {
    if (!row) return null;
    if (row.kind === 'scale') return row.rating != null ? LBL[(row.rating | 0) - 1] || String(row.rating) : null;
    if (row.kind === 'mc' || row.kind === 'wyr') return row.choice || null;
    if (row.kind === 'choose') return (row.choices || []).map(function (c) {
      return c && c.text;
    }).filter(Boolean).join('  ·  ') || null;
    return row.text != null && row.text !== '' ? String(row.text) : null;
  }
  var rows = dbRows ? (dbRows || []).map(function (r, i) {
    return {
      key: 'db' + i,
      n: r.q || i + 1,
      q: r.question,
      a: dbAnsText(r)
    };
  }).filter(function (r) {
    return r.a;
  }) : (flow || []).map(function (it, i) {
    return {
      key: it.key,
      n: i + 1,
      q: it.prompt,
      a: ansText(it)
    };
  }).filter(function (r) {
    return r.a;
  });
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 90,
      background: 'rgba(8,5,4,0.74)',
      backdropFilter: 'blur(6px)',
      WebkitBackdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      overflowY: 'auto',
      padding: '40px 16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: function onClick(e) {
      e.stopPropagation();
    },
    style: {
      width: '100%',
      maxWidth: 640,
      background: 'linear-gradient(180deg,#1b1410,#120d0a)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 20,
      padding: '24px 24px 28px',
      boxShadow: '0 40px 100px -30px rgba(0,0,0,0.7)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Geist Mono',monospace",
      fontSize: 11,
      letterSpacing: '.18em',
      textTransform: 'uppercase',
      color: '#9a8f82'
    }
  }, "Your answers"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Instrument Serif',serif",
      fontSize: 24,
      color: '#EFE7DD',
      marginTop: 2
    }
  }, "What you told us")), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Close",
    style: {
      width: 34,
      height: 34,
      borderRadius: 999,
      border: '1px solid rgba(255,255,255,0.14)',
      background: 'rgba(255,255,255,0.05)',
      color: '#cdbfb2',
      fontSize: 15,
      cursor: 'pointer',
      flexShrink: 0
    }
  }, "\u2715")), rows.map(function (r) {
    return /*#__PURE__*/React.createElement("div", {
      key: r.key,
      style: {
        padding: '14px 0',
        borderTop: '1px solid rgba(255,255,255,0.07)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 11
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "'Geist Mono',monospace",
        fontSize: 12,
        color: arch.color,
        flexShrink: 0,
        paddingTop: 1
      }
    }, ('0' + r.n).slice(-2)), /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        lineHeight: 1.5,
        color: '#cdbfb2'
      }
    }, r.q), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 15,
        lineHeight: 1.55,
        color: '#EFE7DD',
        fontWeight: 600,
        marginTop: 6
      }
    }, r.a))));
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 22,
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      border: '1px solid rgba(255,255,255,0.16)',
      background: 'rgba(255,255,255,0.06)',
      color: '#EFE7DD',
      borderRadius: 12,
      padding: '11px 26px',
      fontFamily: "'Geist',sans-serif",
      fontWeight: 600,
      fontSize: 14,
      cursor: 'pointer'
    }
  }, "Done"))));
}
function HeroReveal(_ref0) {
  var result = _ref0.result,
    prm = _ref0.prm,
    name = _ref0.name,
    photoUrl = _ref0.photoUrl,
    answers = _ref0.answers,
    exporting = _ref0.exporting,
    photoError = _ref0.photoError,
    onName = _ref0.onName,
    onPhoto = _ref0.onPhoto,
    onDownload = _ref0.onDownload,
    onRestart = _ref0.onRestart,
    dbReview = _ref0.dbReview;
  var P = window.POKEMON;
  var arch = P.ARCH[result.top];
  var copy = P.resultCopy(result);
  var ReadBelow = window.PK2Read.ReadBelow;
  var cardRef = sRef(null);
  // crop & adjust state for the uploaded photo; reset whenever a new photo loads
  var _sState15 = sState({
      fx: 0,
      fy: 0,
      fw: 1,
      fh: 1
    }),
    _sState16 = _slicedToArray(_sState15, 2),
    adj = _sState16[0],
    setAdj = _sState16[1];
  var _sState17 = sState(false),
    _sState18 = _slicedToArray(_sState17, 2),
    cropping = _sState18[0],
    setCropping = _sState18[1];
  var _sState19 = sState(false),
    _sState20 = _slicedToArray(_sState19, 2),
    reviewOpen = _sState20[0],
    setReviewOpen = _sState20[1];
  var _sState21 = sState(false),
    _sState22 = _slicedToArray(_sState21, 2),
    confirmReset = _sState22[0],
    setConfirmReset = _sState22[1];
  var _sState23 = sState(false),
    _sState24 = _slicedToArray(_sState23, 2),
    docked = _sState24[0],
    setDocked = _sState24[1];
  sEffect(function () {
    var t = setTimeout(function () {
      setDocked(true);
    }, 2300);
    return function () {
      clearTimeout(t);
    };
  }, []);
  var _sState25 = sState(0),
    _sState26 = _slicedToArray(_sState25, 2),
    aspect = _sState26[0],
    setAspect = _sState26[1];
  sEffect(function () {
    if (photoUrl) {
      setCropping(true);
      var im = new Image();
      im.onload = function () {
        var ai = im.naturalWidth / im.naturalHeight;
        setAspect(ai);
        var fw = Math.min(1, 1 / ai),
          fh = Math.min(1, ai);
        setAdj({
          fx: (1 - fw) / 2,
          fy: ai < 1 ? 0 : (1 - fh) / 2,
          fw: fw,
          fh: fh
        });
      };
      im.src = photoUrl;
    }
  }, [photoUrl]);
  // Scale the whole card to the viewport height so the entire reveal lands on
  // one screen (Windows laptops included); full size on tall displays.
  var _sState27 = sState(function () {
      try {
        return window.innerWidth >= 900 ? Math.max(0.62, Math.min(1, (window.innerHeight - 280) / 780)) : Math.max(0.6, Math.min(1, (window.innerWidth - 40) / 416));
      } catch (e) {
        return 1;
      }
    }),
    _sState28 = _slicedToArray(_sState27, 2),
    fit = _sState28[0],
    setFit = _sState28[1];
  var _sState29 = sState(function () {
      try {
        return window.innerWidth >= 900 ? Math.max(0.62, Math.min(1, (window.innerHeight - 210) / 780)) : Math.max(0.6, Math.min(1, (window.innerWidth - 40) / 416));
      } catch (e) {
        return 1;
      }
    }),
    _sState30 = _slicedToArray(_sState29, 2),
    bigFit = _sState30[0],
    setBigFit = _sState30[1];
  var _sState31 = sState(0),
    _sState32 = _slicedToArray(_sState31, 2),
    natH = _sState32[0],
    setNatH = _sState32[1];
  var cardWrapRef = sRef(null);
  sEffect(function () {
    function calc() {
      var el = cardWrapRef.current;
      if (!el) return;
      var h = el.offsetHeight;
      if (h) setNatH(h);
      var W = window.innerWidth;
      if (W >= 900) {
        var fitH = (window.innerHeight - 280) / (h || 780);
        setFit(Math.max(0.62, Math.min(1, fitH)));
        setBigFit(Math.max(0.62, Math.min(1, (window.innerHeight - 210) / (h || 780))));
        return;
      }
      var fitW = (W - 40) / 416;
      var mf = Math.max(0.6, Math.min(1, fitW));
      setFit(mf);
      setBigFit(mf);
    }
    var t = setTimeout(calc, 80);
    calc();
    window.addEventListener('resize', calc);
    return function () {
      clearTimeout(t);
      window.removeEventListener('resize', calc);
    };
  }, []);
  var curFit = docked ? fit : bigFit;
  var heroShift = function () {
    try {
      if (window.innerWidth < 900) return 0;
      var dw = Math.min(1240, window.innerWidth - 48);
      var gl = (window.innerWidth - dw) / 2;
      return Math.round(window.innerWidth / 2 - (gl + 192));
    } catch (e) {
      return 0;
    }
  }();
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '52px 24px 96px',
      overflowX: 'clip',
      background: "radial-gradient(120% 74% at 50% -4%, rgba(".concat(arch.glowRGB, ",0.14) 0%, transparent 50%), radial-gradient(78% 50% at 50% 0%, rgba(255,238,224,0.05) 0%, transparent 58%), linear-gradient(180deg, #140D09 0%, #0A0705 72%)")
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    style: {
      position: 'absolute',
      inset: 0,
      backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
      backgroundSize: '26px 26px',
      maskImage: 'radial-gradient(120% 70% at 50% 0%, #000, transparent 70%)',
      WebkitMaskImage: 'radial-gradient(120% 70% at 50% 0%, #000, transparent 70%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "pk2Dossier",
    style: {
      position: 'relative',
      width: '100%',
      maxWidth: 1240
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "pk2Grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pk2Left"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pk2LeftInner",
    style: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      transform: docked ? 'none' : 'translateX(' + heroShift + 'px)',
      transition: 'transform 1.1s cubic-bezier(.5,0,.18,1)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      opacity: docked ? 0 : 1,
      maxHeight: docked ? 0 : 40,
      overflow: 'hidden',
      transition: 'opacity .5s ease, max-height .5s ease',
      fontFamily: "'Geist Mono',monospace",
      fontSize: 12,
      letterSpacing: '.24em',
      textTransform: 'uppercase',
      color: D_INK3,
      marginBottom: docked ? 0 : 18,
      textAlign: 'center'
    }
  }, "Your UX Pok\xE9mon"), /*#__PURE__*/React.createElement("div", {
    ref: cardWrapRef,
    style: {
      transformOrigin: 'top center',
      transform: 'scale(' + curFit + ')',
      marginLeft: curFit < 1 ? -Math.round(416 * (1 - curFit) / 2) : 0,
      marginRight: curFit < 1 ? -Math.round(416 * (1 - curFit) / 2) : 0,
      marginBottom: natH && curFit < 1 ? -Math.round(natH * (1 - curFit)) : 0,
      transition: 'transform 1.1s cubic-bezier(.5,0,.18,1), margin 1.1s cubic-bezier(.5,0,.18,1)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "pk2Soft",
    style: {
      position: 'relative',
      marginTop: 30
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: prm ? '' : 'pk2FloatS'
  }, /*#__PURE__*/React.createElement(FlipReveal, {
    arch: arch,
    score: result.score,
    name: name,
    photoUrl: photoUrl,
    prm: prm,
    cardRef: cardRef,
    adj: adj,
    onAdjust: setAdj,
    aspect: aspect
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      opacity: docked ? 0 : 1,
      maxHeight: docked ? 0 : 260,
      overflow: 'hidden',
      transition: 'opacity .55s ease, max-height .6s ease',
      textAlign: 'center',
      marginTop: docked ? 0 : 22
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Instrument Serif',Georgia,serif",
      fontWeight: 400,
      fontSize: 'clamp(30px,3.6vw,46px)',
      lineHeight: 1.05,
      letterSpacing: '-.02em',
      margin: 0,
      color: D_INK
    }
  }, "You are ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: 'italic',
      color: arch.color,
      textShadow: "0 0 28px rgba(".concat(arch.glowRGB, ",0.6)")
    }
  }, arch.name), "."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'Instrument Serif',Georgia,serif",
      fontStyle: 'italic',
      fontSize: 'clamp(15px,1.9vw,19px)',
      lineHeight: 1.36,
      color: D_INK2,
      margin: '10px auto 0',
      maxWidth: 360
    }
  }, P.TAGLINE[result.top])), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18,
      width: Math.round(416 * curFit),
      maxWidth: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: 11,
      alignItems: 'center',
      opacity: docked ? 1 : 0,
      transform: docked ? 'none' : 'translateY(10px)',
      transition: 'opacity .6s ease .35s, transform .6s ease .35s',
      pointerEvents: docked ? 'auto' : 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Geist Mono',monospace",
      fontSize: 11,
      letterSpacing: '.16em',
      textTransform: 'uppercase',
      color: D_INK3
    }
  }, "Make it yours"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: name,
    onChange: onName,
    placeholder: "Add your name",
    maxLength: 28,
    style: {
      width: '100%',
      textAlign: 'center',
      border: '1px solid ' + D_LINE,
      borderRadius: 10,
      background: 'rgba(255,255,255,0.04)',
      padding: '10px 14px',
      fontFamily: "'Geist',sans-serif",
      fontSize: 14,
      color: D_INK,
      outline: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: 8,
      marginTop: 2
    }
  }, photoUrl ? /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      setCropping(true);
    },
    style: CHIP
  }, /*#__PURE__*/React.createElement(PhotoGlyph, null), "Edit photo") : /*#__PURE__*/React.createElement("label", {
    style: CHIP
  }, /*#__PURE__*/React.createElement("input", {
    type: "file",
    accept: "image/*",
    onChange: onPhoto,
    style: {
      display: 'none'
    }
  }), /*#__PURE__*/React.createElement(PhotoGlyph, null), "Add photo"), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      onDownload(cardRef);
    },
    style: chipPrimary(arch.color)
  }, /*#__PURE__*/React.createElement(DownGlyph, null), exporting ? 'Preparing…' : 'Download')), photoError ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: '#FF8A6A'
    }
  }, photoError) : null))), /*#__PURE__*/React.createElement("div", {
    className: "pk2Right"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pk2Pop",
    style: {
      fontFamily: "'Geist Mono',monospace",
      fontSize: 12,
      letterSpacing: '.24em',
      textTransform: 'uppercase',
      color: D_INK3,
      marginBottom: 16
    }
  }, "Your UX Pok\xE9mon"), /*#__PURE__*/React.createElement("div", {
    className: "pk2Pop",
    style: {
      marginTop: 30
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "'Instrument Serif',Georgia,serif",
      fontWeight: 400,
      fontSize: 'clamp(34px,5.5vw,56px)',
      lineHeight: 1.04,
      letterSpacing: '-.02em',
      margin: 0,
      color: D_INK
    }
  }, "You are ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: 'italic',
      color: arch.color,
      textShadow: "0 0 28px rgba(".concat(arch.glowRGB, ",0.6)")
    }
  }, arch.name), "."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'Instrument Serif',Georgia,serif",
      fontStyle: 'italic',
      fontSize: 'clamp(19px,2.6vw,24px)',
      lineHeight: 1.36,
      color: D_INK2,
      margin: '14px auto 0',
      maxWidth: 560,
      textWrap: 'pretty'
    }
  }, P.TAGLINE[result.top])), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(ReadBelow, {
    result: result,
    copy: copy,
    answers: answers,
    exporting: exporting,
    cardRef: cardRef
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 56,
      paddingTop: 26,
      borderTop: '1px solid rgba(255,255,255,0.08)',
      display: 'flex',
      flexWrap: 'wrap',
      gap: 20,
      justifyContent: 'space-between',
      alignItems: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Geist Mono',monospace",
      fontSize: 11,
      letterSpacing: '.14em',
      textTransform: 'uppercase',
      color: D_INK3,
      marginBottom: 10
    }
  }, "Want to look back?"), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      setReviewOpen(true);
    },
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      background: 'rgba(255,255,255,0.06)',
      border: '1px solid rgba(255,255,255,0.14)',
      color: D_INK,
      borderRadius: 11,
      padding: '11px 20px',
      fontFamily: "'Geist',sans-serif",
      fontWeight: 600,
      fontSize: 13.5,
      cursor: 'pointer'
    }
  }, "Check your answers")), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Geist Mono',monospace",
      fontSize: 11,
      letterSpacing: '.14em',
      textTransform: 'uppercase',
      color: D_INK3,
      marginBottom: 10
    }
  }, "Wanna give the test again?"), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      setConfirmReset(true);
    },
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      background: 'transparent',
      border: '1px solid ' + D_LINE,
      color: D_INK2,
      borderRadius: 11,
      padding: '11px 20px',
      fontFamily: "'Geist',sans-serif",
      fontWeight: 600,
      fontSize: 13.5,
      cursor: 'pointer'
    }
  }, "Start again"))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginTop: 44
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    },
    "aria-label": "Back to top",
    className: "pk2ToTop",
    style: {
      width: 42,
      height: 42,
      borderRadius: 999,
      border: '1px solid rgba(255,255,255,0.16)',
      background: 'rgba(255,255,255,0.05)',
      color: D_INK2,
      fontSize: 18,
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, "\u2191"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Geist Mono',monospace",
      fontSize: 10,
      letterSpacing: '.16em',
      textTransform: 'uppercase',
      color: D_INK3,
      marginTop: 8
    }
  }, "Back to top")))), reviewOpen ? /*#__PURE__*/React.createElement(ReviewOverlay, {
    flow: P.FLOW,
    answers: answers,
    arch: arch,
    dbRows: dbReview,
    onClose: function onClose() {
      setReviewOpen(false);
    }
  }) : null, confirmReset ? /*#__PURE__*/React.createElement(ConfirmReset, {
    onCancel: function onCancel() {
      setConfirmReset(false);
    },
    onConfirm: function onConfirm() {
      setConfirmReset(false);
      onRestart();
    },
    onReview: function onReview() {
      setConfirmReset(false);
      setReviewOpen(true);
    }
  }) : null, cropping && photoUrl ? /*#__PURE__*/React.createElement(PhotoCrop, {
    photoUrl: photoUrl,
    adj: adj,
    aspect: aspect,
    onAdjust: setAdj,
    accent: arch.color,
    onDone: function onDone() {
      setCropping(false);
    },
    onPhoto: onPhoto
  }) : null));
}
window.PK2Stages = {
  Reveal: Reveal,
  HeroReveal: HeroReveal
};