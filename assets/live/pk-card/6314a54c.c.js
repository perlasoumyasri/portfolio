function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/* global React */
// ─────────────────────────────────────────────────────────────────────────
//  UX Pokémon · v2 — THE OPENING.
//  "The UX Pokémon you are." Minimal copy, the prize teased as a living fan
//  of face-down cards (no spoiler), drifting in 3D. Starting feels effortless.
// ─────────────────────────────────────────────────────────────────────────

var _React = React,
  wState = _React.useState,
  wRef = _React.useRef,
  wEffect = _React.useEffect;
function W_Logo(_ref) {
  var _ref$h = _ref.h,
    h = _ref$h === void 0 ? 26 : _ref$h;
  var BrandMark = window.PokemonCard.BrandMark;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: Math.round(h * 0.34)
    }
  }, /*#__PURE__*/React.createElement(BrandMark, {
    size: Math.round(h * 1.02)
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'Geist',sans-serif",
      fontWeight: 700,
      fontSize: Math.round(h * 0.74),
      letterSpacing: '-0.02em',
      color: '#1A1611'
    }
  }, "UX\xA0Gym"));
}
function W_Begin(_ref2) {
  var onClick = _ref2.onClick;
  var _wState = wState(false),
    _wState2 = _slicedToArray(_wState, 2),
    h = _wState2[0],
    setH = _wState2[1];
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
      border: 'none',
      borderRadius: 999,
      padding: '18px 46px',
      fontSize: 17,
      fontWeight: 600,
      fontFamily: "'Geist',sans-serif",
      cursor: 'pointer',
      background: 'linear-gradient(180deg, #FF5C28 0%, #FF450F 100%)',
      color: '#fff',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 11,
      boxShadow: h ? '0 0 0 4px rgba(255,69,15,0.14), inset 0 1px 0 rgba(255,255,255,0.32), 0 6px 16px -4px rgba(255,69,15,0.5), 0 26px 52px -16px rgba(255,69,15,0.66)' : 'inset 0 1px 0 rgba(255,255,255,0.28), 0 3px 10px -3px rgba(255,69,15,0.45), 0 16px 34px -14px rgba(255,69,15,0.55)',
      transform: h ? 'translateY(-2px) scale(1.015)' : 'none',
      transition: 'transform .22s cubic-bezier(.34,1.4,.5,1), box-shadow .25s ease'
    }
  }, "Begin", /*#__PURE__*/React.createElement("svg", {
    width: "17",
    height: "17",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.4",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14M13 6l6 6-6 6"
  })));
}

// ── floating fan of face-down cards (the prize, no spoiler) ─────────────────
function CardFan() {
  var GlimpseCard = window.PK2Glimpse.GlimpseCard;
  var stage = wRef(null);
  var _wState3 = wState({
      x: 0,
      y: 0
    }),
    _wState4 = _slicedToArray(_wState3, 2),
    par = _wState4[0],
    setPar = _wState4[1];
  var prm = window.PokemonCard.usePRM();
  wEffect(function () {
    if (prm) return;
    var el = stage.current;
    if (!el) return;
    var onMove = function onMove(e) {
      var r = el.getBoundingClientRect();
      setPar({
        x: (e.clientX - (r.left + r.width / 2)) / r.width,
        y: (e.clientY - (r.top + r.height / 2)) / r.height
      });
    };
    var onLeave = function onLeave() {
      return setPar({
        x: 0,
        y: 0
      });
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return function () {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [prm]);

  // five sealed cards fanned in an arc — one colour world each; centre forward
  var fan = [{
    t: 'EYE',
    rot: -22,
    x: -270,
    y: 46,
    z: 1,
    s: 0.86,
    d: 0.0
  }, {
    t: 'HEART',
    rot: -11,
    x: -142,
    y: 8,
    z: 2,
    s: 0.93,
    d: 0.6
  }, {
    t: 'HAND',
    rot: 0,
    x: 0,
    y: -8,
    z: 3,
    s: 1.0,
    d: 0.3
  }, {
    t: 'BRAIN',
    rot: 11,
    x: 142,
    y: 8,
    z: 2,
    s: 0.93,
    d: 0.9
  }, {
    t: 'FACE',
    rot: 22,
    x: 270,
    y: 46,
    z: 1,
    s: 0.86,
    d: 1.2
  }];
  return /*#__PURE__*/React.createElement("div", {
    ref: stage,
    style: {
      position: 'relative',
      width: '100%',
      height: 440,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      perspective: 1400
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    className: prm ? '' : 'pk2Breathe',
    style: {
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
      width: 760,
      height: 380,
      background: 'radial-gradient(closest-side, rgba(255,86,30,0.2), rgba(255,69,15,0.07) 52%, transparent 74%)',
      filter: 'blur(10px)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    style: {
      position: 'absolute',
      bottom: 56,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 460,
      height: 30,
      background: 'radial-gradient(closest-side, rgba(20,15,10,0.16), transparent 76%)',
      filter: 'blur(7px)'
    }
  }), fan.map(function (c, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        position: 'absolute',
        zIndex: c.z,
        transform: "translateX(".concat(c.x + par.x * (12 + c.z * 8), "px) translateY(").concat(c.y + par.y * (8 + c.z * 6), "px) rotate(").concat(c.rot + par.x * 3, "deg) scale(").concat(c.s, ")"),
        transition: 'transform .35s cubic-bezier(.22,1,.36,1)',
        transformStyle: 'preserve-3d'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: prm ? '' : 'pk2Deal',
      style: {
        animationDelay: 0.42 + i * 0.09 + 's'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: prm ? '' : 'pk2FloatSlow',
      style: {
        animationDelay: c.d + 's'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        transform: "rotateY(".concat(par.x * 8, "deg) rotateX(").concat(-par.y * 6, "deg)"),
        transformStyle: 'preserve-3d'
      }
    }, /*#__PURE__*/React.createElement(GlimpseCard, {
      typeKey: c.t,
      w: 184,
      sheenDelay: i * 0.7,
      prm: prm
    })))));
  }));
}
function Welcome(_ref3) {
  var onBegin = _ref3.onBegin;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    style: {
      position: 'absolute',
      top: '-22%',
      left: '50%',
      transform: 'translateX(-50%)',
      width: 1100,
      height: 760,
      background: 'radial-gradient(circle, rgba(255,69,15,0.09) 0%, transparent 62%)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      padding: '28px 40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    className: "pk2Rise"
  }, /*#__PURE__*/React.createElement(W_Logo, {
    h: 28
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      padding: '7px 15px',
      borderRadius: 999,
      background: '#fff',
      border: '1px solid rgba(33,30,26,0.1)',
      fontFamily: "'Geist Mono',monospace",
      fontSize: 11,
      letterSpacing: '.1em',
      color: '#6B6358'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: '#FF450F'
    }
  }), "YOUR FIRST DRILL")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '6px 24px 30px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "pk2Rise",
    style: {
      animationDelay: '.06s',
      fontFamily: "'Geist Mono',monospace",
      fontSize: 12,
      letterSpacing: '.2em',
      textTransform: 'uppercase',
      color: '#FF450F',
      marginBottom: 18
    }
  }, "5 types \xB7 1 is unmistakably you"), /*#__PURE__*/React.createElement("h1", {
    className: "pk2Rise",
    style: {
      animationDelay: '.15s',
      fontFamily: "'Instrument Serif',Georgia,serif",
      fontWeight: 400,
      fontSize: 'clamp(44px,7.4vw,80px)',
      lineHeight: 1.05,
      letterSpacing: '-.025em',
      margin: 0,
      color: '#15110D',
      textWrap: 'balance'
    }
  }, "The UX\xA0Pok\xE9mon ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: 'italic',
      color: '#FF450F',
      textShadow: '0 0 28px rgba(255,69,15,0.34)'
    }
  }, "you"), " are."), /*#__PURE__*/React.createElement("p", {
    className: "pk2Rise",
    style: {
      animationDelay: '.27s',
      margin: '24px 0 0',
      maxWidth: 620,
      fontSize: 19,
      lineHeight: 1.55,
      color: '#5A544B',
      textWrap: 'balance'
    }
  }, "A few honest questions reveal ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#15110D',
      fontWeight: 600
    }
  }, "your identity as a designer"), " through the UX\xA0Pok\xE9mon type that ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#15110D',
      fontWeight: 600
    }
  }, "symbolises you"), "."), /*#__PURE__*/React.createElement("div", {
    className: "pk2Rise",
    style: {
      animationDelay: '.36s',
      width: '100%',
      maxWidth: 980,
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement(CardFan, null)), /*#__PURE__*/React.createElement("div", {
    className: "pk2Rise",
    style: {
      animationDelay: '.62s',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 12,
      marginTop: 2
    }
  }, /*#__PURE__*/React.createElement(W_Begin, {
    onClick: onBegin
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'Geist Mono',monospace",
      fontSize: 11.5,
      letterSpacing: '.06em',
      color: '#A8A095'
    }
  }, "No right answers. Just you."))));
}
window.PK2Welcome = {
  Welcome: Welcome
};