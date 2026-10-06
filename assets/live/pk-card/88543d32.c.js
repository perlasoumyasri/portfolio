function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* global React, window */
// ─────────────────────────────────────────────────────────────────────────
//  UX Pokémon · v2 — THE READ (view).
//  A warm, enlightening letter written to one person — never a form. No
//  numbered tags, no all-caps eyebrows; only the warm sentence-case headings
//  from the content appear, and the reveal carries none. Generous breathing
//  space, one consistent type scale, editorial gem dividers for rhythm.
//  Words live in pk2-read-content.jsx.
// ─────────────────────────────────────────────────────────────────────────

var _React = React,
  rState = _React.useState;
var R_SERIF = "'Instrument Serif',Georgia,serif";
var R_SANS = "'Geist',system-ui,sans-serif";
var R_MONO = "'Geist Mono',monospace";
var R_INK = '#FAF6F0',
  R_INK2 = 'rgba(250,246,240,0.84)',
  R_INK3 = 'rgba(250,246,240,0.5)';

// one consistent system
var R_GAP = 96; // vertical rhythm between sections
var R_MAX = 720; // reading measure
var R_RAD = 22; // panel radius
var R_PANEL = 'clamp(26px,4vw,38px)'; // panel padding

// ── primitives ───────────────────────────────────────────────────────────────
function SecGem(_ref) {
  var a = _ref.a,
    light = _ref.light,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 15 : _ref$size;
  return /*#__PURE__*/React.createElement("span", {
    "aria-hidden": true,
    style: {
      position: 'relative',
      width: size,
      height: size,
      borderRadius: '50%',
      padding: size * 0.09,
      flexShrink: 0,
      background: "conic-gradient(from 130deg, ".concat(light, ", ").concat(a.color, " 40%, #fff 60%, ").concat(light, ")"),
      boxShadow: "0 0 10px -1px rgba(".concat(a.glowRGB, ",0.85)")
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      background: "radial-gradient(circle at 40% 34%, ".concat(a.color, ", ").concat(a.deep, " 80%, #0B0806)")
    }
  }));
}

// editorial divider — a centred gem between two fading hairlines. Pure rhythm.
function Divider(_ref2) {
  var a = _ref2.a,
    light = _ref2.light;
  var line = function line(dir) {
    return {
      flex: 1,
      height: 1,
      background: "linear-gradient(".concat(dir, ", transparent, rgba(255,255,255,0.16))")
    };
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 18,
      margin: '0 auto 40px',
      maxWidth: 360
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": true,
    style: line('90deg')
  }), /*#__PURE__*/React.createElement(SecGem, {
    a: a,
    light: light,
    size: 13
  }), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": true,
    style: line('270deg')
  }));
}
function Sec(_ref3) {
  var heading = _ref3.heading,
    a = _ref3.a,
    light = _ref3.light,
    children = _ref3.children,
    first = _ref3.first,
    _ref3$max = _ref3.max,
    max = _ref3$max === void 0 ? R_MAX : _ref3$max;
  return /*#__PURE__*/React.createElement("section", {
    style: {
      width: '100%',
      maxWidth: max,
      margin: '0 auto',
      paddingTop: first ? 0 : R_GAP,
      textAlign: 'left'
    }
  }, !first && /*#__PURE__*/React.createElement(Divider, {
    a: a,
    light: light
  }), heading && /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: R_SERIF,
      fontWeight: 400,
      fontSize: 'clamp(29px,4vw,42px)',
      lineHeight: 1.1,
      letterSpacing: '-.018em',
      color: R_INK,
      margin: '0 0 26px',
      textAlign: 'center',
      textWrap: 'balance'
    }
  }, heading), children);
}
function Para(_ref4) {
  var children = _ref4.children,
    lead = _ref4.lead;
  return /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: R_SANS,
      fontSize: lead ? 18.5 : 17,
      lineHeight: 1.78,
      color: lead ? R_INK : R_INK2,
      margin: '0 0 20px',
      textWrap: 'pretty'
    }
  }, children);
}

// prose — one consistent body voice (sans). First paragraph reads a touch
// larger as a lead. No italic, no serif in the reading flow.
function Prose(_ref5) {
  var items = _ref5.items;
  return /*#__PURE__*/React.createElement(React.Fragment, null, items.map(function (t, i) {
    return /*#__PURE__*/React.createElement(Para, {
      key: i,
      lead: i === 0
    }, t);
  }));
}

// ── the five parts rail ──────────────────────────────────────────────────────
function PartsRail(_ref6) {
  var top = _ref6.top,
    accent = _ref6.accent;
  var A = window.POKEMON.ARCH,
    L = window.POKEMON.LABELS;
  var order = ['EYE', 'HEART', 'BRAIN', 'HAND', 'FACE'];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      gap: 'clamp(16px,5vw,46px)',
      alignItems: 'flex-end',
      flexWrap: 'wrap',
      margin: '8px 0 40px'
    }
  }, order.map(function (t) {
    var on = t === top,
      a = A[t],
      sz = on ? 66 : 42;
    return /*#__PURE__*/React.createElement("div", {
      key: t,
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: on ? 'pk2GlowP' : '',
      style: {
        position: 'relative',
        width: sz,
        height: sz,
        borderRadius: '50%',
        padding: on ? 3 : 2,
        background: on ? "conic-gradient(from 130deg, ".concat(a.light, ", ").concat(a.color, " 30%, ").concat(a.deep, " 54%, #fff 64%, ").concat(a.color, ")") : 'rgba(255,255,255,0.13)',
        boxShadow: on ? "0 0 28px -2px rgba(".concat(a.glowRGB, ",0.85)") : 'none',
        opacity: on ? 1 : 0.55
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        background: "radial-gradient(circle at 40% 34%, ".concat(a.color, ", ").concat(a.deep, " 78%, #0B0806)"),
        boxShadow: 'inset 0 2px 6px rgba(255,255,255,0.25), inset 0 -8px 16px rgba(0,0,0,0.5)'
      }
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: R_SANS,
        fontSize: on ? 15 : 13,
        fontWeight: on ? 700 : 500,
        color: on ? R_INK : R_INK3,
        letterSpacing: '-.01em'
      }
    }, L[t]));
  }));
}

// ── the playful Pokédex entry (a thematic visual, not a section label) ───────
function DexCard(_ref7) {
  var top = _ref7.top,
    dex = _ref7.dex;
  var A = window.POKEMON.ARCH,
    CFG = window.PK2.CFG;
  var a = A[top],
    cfg = CFG[top],
    light = cfg.shine[0];
  var m = dex.title.match(/^(.*?)(?:\.\s*([A-Za-z]+ type)\.?)?$/);
  var lead = m ? m[1].replace(/\.\s*$/, '') : dex.title;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      borderRadius: R_RAD,
      overflow: 'hidden',
      border: "1px solid rgba(".concat(a.glowRGB, ",0.3)"),
      background: "linear-gradient(168deg, ".concat(a.deep, " 0%, #120D0A 60%, #0B0806 100%)"),
      boxShadow: "0 0 50px -16px rgba(".concat(a.glowRGB, ",0.4), 0 30px 70px -40px rgba(0,0,0,0.7)")
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    style: {
      position: 'absolute',
      inset: 0,
      opacity: 0.4,
      backgroundImage: 'radial-gradient(rgba(255,255,255,0.16) 1px, transparent 1px)',
      backgroundSize: '17px 17px',
      maskImage: 'linear-gradient(180deg,#000,transparent 75%)',
      WebkitMaskImage: 'linear-gradient(180deg,#000,transparent 75%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    style: {
      position: 'absolute',
      top: -60,
      right: -40,
      width: 260,
      height: 260,
      background: "radial-gradient(circle, rgba(".concat(a.glowRGB, ",0.4), transparent 66%)"),
      filter: 'blur(8px)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      padding: R_PANEL
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 11,
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement(SecGem, {
    a: a,
    light: light,
    size: 20
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: R_MONO,
      fontSize: 11,
      letterSpacing: '.14em',
      color: 'rgba(255,255,255,0.55)'
    }
  }, "Pok\xE9dex \xB7 N\xBA\xA0", cfg.num)), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: R_SERIF,
      fontWeight: 400,
      fontSize: 'clamp(25px,3.4vw,33px)',
      lineHeight: 1.12,
      letterSpacing: '-.01em',
      color: light,
      margin: '0 0 16px',
      textShadow: "0 0 22px rgba(".concat(a.glowRGB, ",0.5)")
    }
  }, lead, "."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: R_SERIF,
      fontStyle: 'italic',
      fontSize: 19,
      lineHeight: 1.64,
      color: 'rgba(250,246,240,0.9)',
      margin: 0,
      textWrap: 'pretty'
    }
  }, dex.body)));
}

// the share band — the first thing under the card, at peak excitement
function ShareBand(_ref8) {
  var glow = _ref8.glow;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: '100%',
      maxWidth: R_MAX,
      margin: '0 auto',
      borderRadius: R_RAD,
      overflow: 'hidden',
      padding: R_PANEL,
      background: "linear-gradient(135deg, rgba(".concat(glow, ",0.15), rgba(").concat(glow, ",0.04))"),
      border: "1px solid rgba(".concat(glow, ",0.3)"),
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    style: {
      position: 'absolute',
      top: -100,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 380,
      height: 240,
      background: "radial-gradient(circle, rgba(".concat(glow, ",0.32), transparent 66%)"),
      filter: 'blur(12px)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: R_SERIF,
      fontWeight: 400,
      fontSize: 'clamp(27px,3.8vw,38px)',
      lineHeight: 1.1,
      letterSpacing: '-.018em',
      color: R_INK,
      margin: '0 0 14px',
      textWrap: 'balance'
    }
  }, "Show the world the designer you are."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: R_SANS,
      fontSize: 16,
      lineHeight: 1.6,
      color: R_INK2,
      margin: '0 auto 26px',
      maxWidth: 520,
      textWrap: 'pretty'
    }
  }, "Download your card and post it on LinkedIn with #UXGym by UX Anudeep, and tell people what it says about the designer you are.")));
}

// ── THE READ ─────────────────────────────────────────────────────────────────
function ReadBelow(_ref9) {
  var result = _ref9.result,
    copy = _ref9.copy,
    answers = _ref9.answers,
    exporting = _ref9.exporting,
    cardRef = _ref9.cardRef;
  var C = window.PK2ReadContent;
  var P = window.POKEMON;
  var RadarChart = window.PokemonEmblems.RadarChart;
  var top = result.top;
  var a = P.ARCH[top],
    L = P.LABELS;
  var accent = a.color,
    glow = a.glowRGB,
    light = window.PK2.CFG[top].shine[0];
  var read = C.READ[top],
    S = C.SHARED;
  var gem = {
    a: a,
    light: light
  };

  // the opening, in their own words — 2–3 of their own answers, woven as prose
  var opening = C.buildThread(answers, result).slice(0, 3);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      paddingTop: 8,
      paddingBottom: 40
    }
  }, /*#__PURE__*/React.createElement(ShareBand, {
    glow: glow
  }), /*#__PURE__*/React.createElement(Sec, gem, opening.length > 0 && /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: R_SANS,
      fontSize: 'clamp(16px,1.9vw,18px)',
      lineHeight: 1.72,
      color: R_INK3,
      margin: '0 auto 22px',
      maxWidth: 620,
      textAlign: 'center',
      textWrap: 'pretty'
    }
  }, opening.join(' ')), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: R_SERIF,
      fontWeight: 400,
      fontSize: 'clamp(32px,5vw,52px)',
      lineHeight: 1.06,
      letterSpacing: '-.022em',
      color: R_INK,
      margin: '0 0 28px',
      textAlign: 'center',
      textWrap: 'balance'
    }
  }, "You are ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: light,
      textShadow: "0 0 28px rgba(".concat(glow, ",0.55)")
    }
  }, a.name), ".", /*#__PURE__*/React.createElement("br", null), "You lead with the ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: light
    }
  }, L[top]), "."), /*#__PURE__*/React.createElement(Para, {
    lead: true
  }, read.revealBody)), /*#__PURE__*/React.createElement(Sec, _extends({}, gem, {
    heading: "Every designer is built from five parts"
  }), /*#__PURE__*/React.createElement(PartsRail, {
    top: top,
    accent: accent
  }), /*#__PURE__*/React.createElement(Prose, {
    items: S.fiveParts
  })), /*#__PURE__*/React.createElement(Sec, _extends({}, gem, {
    heading: "How you move through the world"
  }), /*#__PURE__*/React.createElement(Prose, {
    items: read.move
  })), /*#__PURE__*/React.createElement(Sec, _extends({}, gem, {
    heading: "Why your ".concat(L[top], " is a designer's superpower")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      borderRadius: R_RAD,
      padding: R_PANEL,
      overflow: 'hidden',
      background: "linear-gradient(180deg, rgba(".concat(glow, ",0.1), rgba(").concat(glow, ",0.025))"),
      border: "1px solid rgba(".concat(glow, ",0.24)")
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    style: {
      position: 'absolute',
      top: -80,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 420,
      height: 220,
      background: "radial-gradient(circle, rgba(".concat(glow, ",0.28), transparent 66%)"),
      filter: 'blur(10px)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, read.superpower.map(function (t, i) {
    return /*#__PURE__*/React.createElement(Para, {
      key: i,
      lead: i === 0
    }, t);
  })))), /*#__PURE__*/React.createElement(Sec, _extends({}, gem, {
    heading: "Your own shape"
  }), /*#__PURE__*/React.createElement(Para, null, S.shapeIntro), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      margin: '28px 0 30px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      filter: "drop-shadow(0 0 18px rgba(".concat(glow, ",0.42))")
    }
  }, /*#__PURE__*/React.createElement(RadarChart, {
    score: result.score,
    color: light,
    fill: "rgba(".concat(glow, ",0.28)"),
    size: 266,
    showLabels: true,
    showDots: true,
    ringColor: "rgba(255,255,255,0.13)",
    labelColor: "rgba(250,246,240,0.86)",
    labelSize: 22,
    strokeW: 4
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      margin: '0 0 26px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": true,
    style: {
      flexShrink: 0,
      marginTop: 8,
      width: 10,
      height: 10,
      borderRadius: '50%',
      background: light,
      boxShadow: "0 0 12px ".concat(light)
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: R_SANS,
      fontSize: 17,
      lineHeight: 1.78,
      color: R_INK
    }
  }, copy.gift)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": true,
    style: {
      flexShrink: 0,
      marginTop: 8,
      width: 10,
      height: 10,
      borderRadius: '50%',
      background: 'rgba(255,255,255,0.32)'
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: R_SANS,
      fontSize: 17,
      lineHeight: 1.78,
      color: R_INK2
    }
  }, copy.growth))), /*#__PURE__*/React.createElement(Para, null, S.shapeClose)), /*#__PURE__*/React.createElement(Sec, _extends({}, gem, {
    heading: "The other side"
  }), /*#__PURE__*/React.createElement(Prose, {
    items: read.otherSide
  })), /*#__PURE__*/React.createElement(Sec, gem, /*#__PURE__*/React.createElement(DexCard, {
    top: top,
    dex: read.pokedex
  })), /*#__PURE__*/React.createElement(Sec, _extends({}, gem, {
    heading: "Where you go from here"
  }), /*#__PURE__*/React.createElement(Prose, {
    items: read.whereYouGo
  })), /*#__PURE__*/React.createElement(Sec, gem, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      borderRadius: R_RAD,
      padding: R_PANEL,
      background: 'linear-gradient(180deg, rgba(255,138,74,0.07), rgba(255,138,74,0.02))',
      border: '1px solid rgba(255,138,74,0.2)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 40,
      height: 40,
      borderRadius: '50%',
      background: 'linear-gradient(150deg, #FF8A4A, #FF450F)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: R_SERIF,
      fontStyle: 'italic',
      fontSize: 20,
      color: '#fff',
      boxShadow: '0 0 18px -4px rgba(255,69,15,0.7)'
    }
  }, "A"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: R_SERIF,
      fontSize: 19,
      color: R_INK2
    }
  }, "A note from UX Anudeep")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: R_SERIF,
      fontStyle: 'italic',
      fontSize: 'clamp(20px,2.7vw,25px)',
      lineHeight: 1.52,
      color: R_INK,
      margin: 0,
      textWrap: 'pretty'
    }
  }, read.anudeep), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 22,
      fontFamily: R_SANS,
      fontWeight: 600,
      fontSize: 15,
      color: R_INK2
    }
  }, "\u2014 UX Anudeep"))), /*#__PURE__*/React.createElement(Sec, gem, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: R_SERIF,
      fontWeight: 400,
      fontSize: 'clamp(24px,3.2vw,34px)',
      lineHeight: 1.16,
      letterSpacing: '-.015em',
      color: R_INK,
      margin: '0 auto 28px',
      maxWidth: 520,
      textWrap: 'balance'
    }
  }, "This is the first thing you get to show the world. Download it and post it on LinkedIn with #UXGym by UX Anudeep, and tell people what it says about you."))));
}
window.PK2Read = {
  ReadBelow: ReadBelow
};