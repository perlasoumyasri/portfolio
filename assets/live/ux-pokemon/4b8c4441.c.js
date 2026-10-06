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
//  UX Pokémon · v2 — THE FLOW.
//  Each question is its own moment. The room's colour shifts beneath you,
//  type transforms, transitions are cinematic. Progress is an ambient hairline
//  — never a count. Time disappears. (Question data + scoring unchanged.)
// ─────────────────────────────────────────────────────────────────────────

var _React = React,
  fState = _React.useState;
var F_INK = '#15110D',
  F_INK2 = '#5A544B',
  F_INK3 = '#A8A095',
  F_LINE = 'rgba(33,30,26,0.12)',
  F_OR = '#FF450F';
var F_MINREFLECT = 25;

// the room's wash cycles through the five type worlds as you move
function washFor(i) {
  var A = window.POKEMON.ARCH;
  var order = ['HAND', 'EYE', 'HEART', 'BRAIN', 'FACE'];
  return A[order[i % order.length]];
}
function f_shuffle(map, key, n) {
  if (!map[key]) {
    var a = Array.from({
      length: n
    }, function (_, i) {
      return i;
    });
    for (var i = n - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i];
      a[i] = a[j];
      a[j] = t;
    }
    map[key] = a;
  }
  return map[key];
}
function FCheck(_ref) {
  var _ref$size = _ref.size,
    size = _ref$size === void 0 ? 12 : _ref$size,
    style = _ref.style;
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#fff",
    strokeWidth: "3.4",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: style
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 12.5l4.3 4.5L19 7"
  }));
}

// ── character: drifting guilloché "foil" behind the whole drill ──────────────
function FoilField() {
  var Guilloche = window.PK2.Guilloche;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    className: "pk2Spin",
    style: {
      position: 'absolute',
      top: '-22%',
      left: '-10%',
      mixBlendMode: 'multiply',
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement(Guilloche, {
    size: 640,
    color: "rgba(255,69,15,0.07)",
    petals: 38,
    strokeWidth: 0.6
  })), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    className: "pk2Rays",
    style: {
      position: 'absolute',
      bottom: '-30%',
      right: '-12%',
      mixBlendMode: 'multiply',
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement(Guilloche, {
    size: 540,
    color: "rgba(33,30,26,0.05)",
    petals: 30,
    rx: 0.5,
    ry: 0.5,
    strokeWidth: 0.6
  })));
}

// per-question-type prompt identity (label + glyph) — never a colour
var F_KIND = {
  mc: {
    label: 'Choose what is true',
    d: 'M5 12.5l4.3 4.5L19 7'
  },
  choose: {
    label: 'Choose up to three',
    d: 'M4 8l8-4 8 4-8 4-8-4zM4 12l8 4 8-4M4 16l8 4 8-4'
  },
  wyr: {
    label: 'Which is more you',
    d: 'M7 4v6a4 4 0 0 0 4 4h2a4 4 0 0 1 4 4v2M17 4v3'
  },
  scale: {
    label: 'How true is this',
    d: 'M4 18a8 8 0 0 1 16 0M12 18l4-5'
  },
  reflection: {
    label: 'A moment, just for you',
    d: 'M12 3v3M12 18v3M3 12h3M18 12h3M6.3 6.3l2 2M15.7 15.7l2 2M17.7 6.3l-2 2M8.3 15.7l-2 2'
  }
};
var F_WHISPER = ['No wrong answers.', 'Trust the first instinct.', 'Just be honest.', 'Take your time.', 'Only you know this.'];
function EyebrowChip(_ref2) {
  var kind = _ref2.kind;
  var m = F_KIND[kind];
  if (!m) return null;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      padding: '7px 14px 7px 11px',
      borderRadius: 999,
      border: '1px solid rgba(255,69,15,0.32)',
      background: 'rgba(255,69,15,0.07)',
      fontFamily: "'Geist Mono',monospace",
      fontSize: 12,
      letterSpacing: '.14em',
      textTransform: 'uppercase',
      color: F_OR,
      whiteSpace: 'nowrap'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: m.d
  })), m.label);
}
function FOption(_ref3) {
  var kind = _ref3.kind,
    selected = _ref3.selected,
    dim = _ref3.dim,
    accent = _ref3.accent,
    children = _ref3.children,
    onClick = _ref3.onClick,
    delay = _ref3.delay;
  var _fState = fState(false),
    _fState2 = _slicedToArray(_fState, 2),
    h = _fState2[0],
    setH = _fState2[1];
  var isWyr = kind === 'wyr';
  var base = isWyr ? {
    position: 'relative',
    flex: '1 1 220px',
    minHeight: 'clamp(120px,20vw,180px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: 'clamp(18px,3vw,28px)',
    borderRadius: 22,
    fontSize: 'clamp(16px,2.3vw,19px)',
    lineHeight: 1.36,
    fontWeight: 500
  } : {
    display: 'flex',
    alignItems: 'center',
    gap: 15,
    width: '100%',
    textAlign: 'left',
    padding: 'clamp(13px,2.4vw,17px) clamp(15px,3.2vw,20px)',
    borderRadius: 16,
    fontSize: 'clamp(14.5px,2vw,16.5px)',
    lineHeight: 1.45
  };
  var on = selected,
    hov = h && !selected;
  var st = _objectSpread(_objectSpread({}, base), {}, {
    fontFamily: "'Geist',sans-serif",
    color: F_INK,
    cursor: 'pointer',
    outline: 'none',
    background: '#fff',
    border: '1px solid ' + (on ? accent : hov ? 'rgba(33,30,26,0.22)' : F_LINE),
    boxShadow: on ? "0 0 0 1.5px ".concat(accent, ", 0 18px 40px -14px ").concat(accent, "66") : hov ? '0 12px 26px -12px rgba(33,30,26,0.22)' : '0 2px 8px rgba(33,30,26,0.04)',
    transform: on ? 'translateY(-2px)' : hov ? 'translateY(-2px)' : 'none',
    opacity: dim ? 0.5 : 1,
    transition: 'all .16s ease',
    animationDelay: (delay || 0) + 's'
  });
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "pk2Opt",
    onClick: onClick,
    onMouseEnter: function onMouseEnter() {
      return setH(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setH(false);
    },
    style: st
  }, children);
}
function FScaleDot(_ref4) {
  var selected = _ref4.selected,
    size = _ref4.size,
    label = _ref4.label,
    accent = _ref4.accent,
    onClick = _ref4.onClick;
  var _fState3 = fState(false),
    _fState4 = _slicedToArray(_fState3, 2),
    h = _fState4[0],
    setH = _fState4[1];
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    title: label,
    "aria-label": label,
    onClick: onClick,
    onMouseEnter: function onMouseEnter() {
      return setH(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setH(false);
    },
    style: {
      width: size,
      height: size,
      borderRadius: '50%',
      border: '2px solid ' + (selected ? accent : h ? accent + 'aa' : 'rgba(33,30,26,0.18)'),
      background: selected ? accent : '#fff',
      cursor: 'pointer',
      transition: 'all .16s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      transform: h && !selected ? 'scale(1.12)' : 'none',
      boxShadow: selected ? "0 0 0 2px ".concat(accent, "40, 0 12px 26px -8px ").concat(accent, "88") : h ? "0 10px 22px -8px ".concat(accent, "66") : '0 2px 6px rgba(33,30,26,0.05)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: '38%',
      height: '38%',
      borderRadius: '50%',
      background: selected ? '#fff' : 'rgba(33,30,26,0.14)'
    }
  }));
}
function FReflect(_ref5) {
  var value = _ref5.value,
    _onChange = _ref5.onChange,
    accent = _ref5.accent;
  var _fState5 = fState(false),
    _fState6 = _slicedToArray(_fState5, 2),
    f = _fState6[0],
    setF = _fState6[1];
  return /*#__PURE__*/React.createElement("textarea", {
    value: value,
    onChange: function onChange(e) {
      return _onChange(e.target.value);
    },
    onFocus: function onFocus() {
      return setF(true);
    },
    onBlur: function onBlur() {
      return setF(false);
    },
    placeholder: "Take your time. Write it the way it really happened.",
    style: {
      width: '100%',
      minHeight: 210,
      border: '1px solid ' + (f ? accent : F_LINE),
      borderRadius: 18,
      background: '#fff',
      padding: '22px 24px',
      fontFamily: "'Geist',sans-serif",
      fontSize: 18,
      lineHeight: 1.62,
      color: F_INK,
      resize: 'vertical',
      outline: 'none',
      transition: 'border-color .15s ease, box-shadow .2s ease',
      boxShadow: f ? "0 0 0 4px ".concat(accent, "1f") : '0 2px 8px rgba(33,30,26,0.03)'
    }
  });
}
function FBack(_ref6) {
  var onClick = _ref6.onClick;
  var _fState7 = fState(false),
    _fState8 = _slicedToArray(_fState7, 2),
    h = _fState8[0],
    setH = _fState8[1];
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
      display: 'inline-flex',
      alignItems: 'center',
      gap: 7,
      background: 'transparent',
      border: 'none',
      color: h ? F_INK : '#8A847B',
      fontSize: 15,
      cursor: 'pointer',
      padding: '8px 2px',
      transition: 'color .15s ease'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M19 12H5M11 6l-6 6 6 6"
  })), "Back");
}
function FContinue(_ref7) {
  var onClick = _ref7.onClick,
    disabled = _ref7.disabled,
    accent = _ref7.accent;
  var _fState9 = fState(false),
    _fState0 = _slicedToArray(_fState9, 2),
    h = _fState0[0],
    setH = _fState0[1];
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    disabled: disabled,
    onMouseEnter: function onMouseEnter() {
      return setH(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setH(false);
    },
    style: {
      border: 'none',
      borderRadius: 999,
      padding: '14px 32px',
      fontSize: 15.5,
      fontWeight: 600,
      fontFamily: "'Geist',sans-serif",
      cursor: disabled ? 'not-allowed' : 'pointer',
      background: disabled ? 'rgba(33,30,26,0.07)' : accent,
      color: disabled ? '#B0A89C' : '#fff',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 9,
      boxShadow: disabled ? 'none' : h ? "0 16px 36px -12px ".concat(accent, "99") : "0 10px 22px -10px ".concat(accent, "88"),
      transform: !disabled && h ? 'translateY(-2px)' : 'none',
      transition: 'all .16s ease'
    }
  }, "Continue", /*#__PURE__*/React.createElement("svg", {
    width: "15",
    height: "15",
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
function Flow(_ref8) {
  var flow = _ref8.flow,
    stepIndex = _ref8.stepIndex,
    answers = _ref8.answers,
    shuffleMap = _ref8.shuffleMap,
    onSelect = _ref8.onSelect,
    onToggle = _ref8.onToggle,
    onReflect = _ref8.onReflect,
    onBack = _ref8.onBack,
    onContinue = _ref8.onContinue,
    screenKey = _ref8.screenKey;
  var it = flow[stepIndex];
  var total = flow.length;
  var pct = stepIndex / (total - 1) * 100;
  var accent = F_OR; // neutral brand accent — type colours stay hidden until the reveal
  var BrandMark = window.PokemonCard.BrandMark;
  var body = null,
    showContinue = false,
    continueDisabled = true,
    eyebrow = '';
  if (it.kind === 'mc' || it.kind === 'choose') {
    var order = f_shuffle(shuffleMap, it.key, it.options.length);
    var sel = answers[it.key];
    var isCh = it.kind === 'choose';
    var selCount = Array.isArray(sel) ? sel.length : 0;
    eyebrow = isCh ? 'Choose up to three' : 'Choose what is true';
    body = /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 11,
        marginTop: 32
      }
    }, order.map(function (oi, mi) {
      var opt = it.options[oi];
      var selected = isCh ? Array.isArray(sel) && sel.indexOf(oi) >= 0 : sel === oi;
      var dim = isCh && !selected && selCount >= 3;
      var sq = isCh;
      return /*#__PURE__*/React.createElement(FOption, {
        key: oi,
        kind: it.kind,
        selected: selected,
        dim: dim,
        accent: accent,
        delay: 0.05 + mi * 0.05,
        onClick: function onClick() {
          return isCh ? onToggle(it.key, oi) : onSelect(it.key, oi);
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          flexShrink: 0,
          width: 22,
          height: 22,
          borderRadius: sq ? 7 : '50%',
          border: '2px solid ' + (selected ? accent : 'rgba(33,30,26,0.2)'),
          background: selected ? accent : 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all .16s ease'
        }
      }, /*#__PURE__*/React.createElement(FCheck, {
        style: {
          opacity: selected ? 1 : 0,
          transform: selected ? 'scale(1)' : 'scale(.4)',
          transition: 'all .18s cubic-bezier(.34,1.56,.64,1)'
        }
      })), /*#__PURE__*/React.createElement("span", {
        style: {
          flex: 1
        }
      }, opt.text));
    }));
    if (isCh) {
      showContinue = true;
      continueDisabled = selCount < 1;
    }
  } else if (it.kind === 'wyr') {
    var _order = f_shuffle(shuffleMap, it.key, it.options.length);
    var _sel = answers[it.key];
    eyebrow = 'Which is more you';
    body = /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        display: 'flex',
        flexWrap: 'wrap',
        gap: 18,
        marginTop: 34,
        alignItems: 'stretch'
      }
    }, _order.map(function (oi, mi) {
      var opt = it.options[oi];
      var selected = _sel === oi;
      return /*#__PURE__*/React.createElement(FOption, {
        key: oi,
        kind: "wyr",
        selected: selected,
        accent: accent,
        delay: 0.06 + mi * 0.08,
        onClick: function onClick() {
          return onSelect(it.key, oi);
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          position: 'absolute',
          top: 14,
          right: 14,
          width: 28,
          height: 28,
          borderRadius: '50%',
          background: accent,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: selected ? 1 : 0,
          transform: selected ? 'scale(1)' : 'scale(.4)',
          transition: 'all .2s cubic-bezier(.34,1.56,.64,1)',
          boxShadow: "0 4px 12px -2px ".concat(accent, "88")
        }
      }, /*#__PURE__*/React.createElement(FCheck, {
        size: 15
      })), opt.text);
    }), /*#__PURE__*/React.createElement("span", {
      "aria-hidden": true,
      style: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%,-50%)',
        width: 46,
        height: 46,
        borderRadius: '50%',
        background: '#FBF9F3',
        border: '1px solid ' + F_LINE,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Instrument Serif',serif",
        fontStyle: 'italic',
        fontSize: 17,
        color: F_INK3,
        zIndex: 3,
        pointerEvents: 'none'
      }
    }, "or"));
  } else if (it.kind === 'scale') {
    var _sel2 = answers[it.key];
    var sizes = [44, 52, 60, 68, 76];
    var labels = ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree'];
    body = /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 50
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        maxWidth: 540,
        margin: '0 auto'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        left: 22,
        right: 22,
        top: '50%',
        height: 3,
        background: "linear-gradient(90deg, rgba(33,30,26,0.08), ".concat(accent, "55, rgba(33,30,26,0.08))"),
        transform: 'translateY(-1.5px)',
        borderRadius: 99
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8
      }
    }, [1, 2, 3, 4, 5].map(function (v, i) {
      return /*#__PURE__*/React.createElement(FScaleDot, {
        key: v,
        selected: _sel2 === v,
        size: sizes[i],
        label: labels[i],
        accent: accent,
        onClick: function onClick() {
          return onSelect(it.key, v);
        }
      });
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        maxWidth: 540,
        margin: '18px auto 0',
        fontFamily: "'Geist Mono',monospace",
        fontSize: 11,
        letterSpacing: '.05em',
        textTransform: 'uppercase',
        color: F_INK3
      }
    }, /*#__PURE__*/React.createElement("span", null, "Strongly disagree"), /*#__PURE__*/React.createElement("span", null, "Strongly agree")));
  } else if (it.kind === 'reflection') {
    eyebrow = 'A moment, just for you';
    var val = answers[it.key] || '';
    var met = val.trim().length >= F_MINREFLECT;
    body = /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 28
      }
    }, /*#__PURE__*/React.createElement(FReflect, {
      value: val,
      onChange: function onChange(v) {
        return onReflect(it.key, v);
      },
      accent: accent
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 12,
        fontFamily: "'Geist Mono',monospace",
        fontSize: 12,
        color: F_INK3
      }
    }, met ? 'Ready whenever you are.' : val.trim().length === 0 ? 'Write as much or as little as feels true.' : 'A few more words, then you can continue.'));
    showContinue = true;
    continueDisabled = !met;
  }
  var nn = String(stepIndex + 1).padStart(2, '0');
  var tt = String(total).padStart(2, '0');
  var whisper = F_WHISPER[stepIndex % F_WHISPER.length];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(FoilField, null), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    style: {
      position: 'absolute',
      top: '-26%',
      left: '50%',
      transform: 'translateX(-50%)',
      width: 1200,
      height: 820,
      background: "radial-gradient(circle, ".concat(accent, "14 0%, transparent 60%)"),
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      padding: '22px 34px 0',
      zIndex: 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 820,
      margin: '0 auto',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 9
    }
  }, /*#__PURE__*/React.createElement(BrandMark, {
    size: 22
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'Geist',sans-serif",
      fontWeight: 700,
      fontSize: 15,
      letterSpacing: '-0.02em',
      color: '#1A1611'
    }
  }, "UX\xA0Gym"), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 5,
      paddingLeft: 11,
      borderLeft: '1px solid ' + F_LINE,
      fontFamily: "'Geist Mono',monospace",
      fontSize: 10,
      letterSpacing: '.22em',
      color: F_INK3
    }
  }, "FIRST\xA0DRILL")), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 11
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      lineHeight: 1.15
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'Geist Mono',monospace",
      fontSize: 13,
      fontWeight: 600,
      letterSpacing: '.06em',
      color: F_INK
    }
  }, "N\xBA\xA0", nn, /*#__PURE__*/React.createElement("span", {
    style: {
      color: F_INK3
    }
  }, "\xA0/\xA0", tt))))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      maxWidth: 820,
      margin: '15px auto 0',
      width: '100%',
      height: 3
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'rgba(33,30,26,0.08)',
      borderRadius: 99
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      top: 0,
      height: '100%',
      width: pct + '%',
      background: "linear-gradient(90deg, ".concat(accent, "88, ").concat(accent, ")"),
      borderRadius: 99,
      transition: 'width .6s cubic-bezier(.2,.7,.2,1)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '50%',
      left: "calc(".concat(pct, "% - 5px)"),
      width: 10,
      height: 10,
      borderRadius: '50%',
      background: '#fff',
      border: "2px solid ".concat(accent),
      transform: 'translateY(-50%)',
      boxShadow: "0 0 12px 2px ".concat(accent, "99"),
      transition: 'left .6s cubic-bezier(.2,.7,.2,1)'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 24px 48px',
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    key: screenKey,
    className: "pk2Soft",
    style: {
      maxWidth: 820,
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 18,
      marginBottom: 16,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": true,
    style: {
      fontFamily: "'Instrument Serif',Georgia,serif",
      fontSize: 'clamp(44px,7vw,82px)',
      lineHeight: 0.74,
      letterSpacing: '-.02em',
      color: 'rgba(33,30,26,0.1)'
    }
  }, nn), /*#__PURE__*/React.createElement(EyebrowChip, {
    kind: it.kind
  })), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Instrument Serif',Georgia,serif",
      fontWeight: 400,
      fontSize: 'clamp(28px,4vw,42px)',
      lineHeight: 1.24,
      letterSpacing: '-.012em',
      margin: 0,
      color: F_INK,
      textWrap: 'pretty'
    }
  }, it.prompt), body, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 38,
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(FBack, {
    onClick: onBack
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      fontFamily: "'Geist Mono',monospace",
      fontSize: 11.5,
      letterSpacing: '.04em',
      color: F_INK3
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 5,
      height: 5,
      borderRadius: '50%',
      background: accent,
      opacity: 0.7
    }
  }), whisper)), showContinue && /*#__PURE__*/React.createElement(FContinue, {
    onClick: onContinue,
    disabled: continueDisabled,
    accent: accent
  })))));
}
window.PK2Flow = {
  Flow: Flow
};