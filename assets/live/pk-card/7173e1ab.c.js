function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* global React */
// ─────────────────────────────────────────────────────────────────────────
//  Bauhaus emblems (one per archetype) + the radar chart.
//  Built only from primitives — circles, squares, single arcs. No illustration.
// ─────────────────────────────────────────────────────────────────────────

// Emblem: a flat, two-tone geometric mark. `fill` = primary, `accent` = second.
function Emblem(_ref) {
  var type = _ref.type,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 120 : _ref$size,
    _ref$fill = _ref.fill,
    fill = _ref$fill === void 0 ? '#211e1a' : _ref$fill,
    _ref$accent = _ref.accent,
    accent = _ref$accent === void 0 ? 'rgba(0,0,0,0.28)' : _ref$accent,
    stroke = _ref.stroke;
  var sw = stroke || fill;
  var common = {
    width: size,
    height: size,
    viewBox: '0 0 120 120',
    style: {
      display: 'block',
      overflow: 'visible'
    }
  };
  switch (type) {
    case 'EYE':
      // almond eye with iris — the noticer
      return /*#__PURE__*/React.createElement("svg", _extends({}, common, {
        "aria-hidden": true
      }), /*#__PURE__*/React.createElement("path", {
        d: "M12,60 Q60,20 108,60 Q60,100 12,60 Z",
        fill: "none",
        stroke: sw,
        strokeWidth: "8.5",
        strokeLinejoin: "round"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "60",
        cy: "60",
        r: "20",
        fill: fill
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "60",
        cy: "60",
        r: "8.5",
        fill: accent
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "52.5",
        cy: "52.5",
        r: "4.5",
        fill: "#FCFAF4",
        opacity: "0.92"
      }));
    case 'HEART':
      // clean heart silhouette — the feeler
      return /*#__PURE__*/React.createElement("svg", _extends({}, common, {
        "aria-hidden": true
      }), /*#__PURE__*/React.createElement("path", {
        d: "M60,99 C27,75 16,56 16,39.5 C16,26.5 26,16.5 39,16.5 C48.5,16.5 56,22 60,30.5 C64,22 71.5,16.5 81,16.5 C94,16.5 104,26.5 104,39.5 C104,56 93,75 60,99 Z",
        fill: fill
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "41",
        cy: "38",
        r: "7.5",
        fill: accent,
        opacity: "0.9"
      }));
    case 'BRAIN':
      // synapse / connected nodes — the questioner
      return /*#__PURE__*/React.createElement("svg", _extends({}, common, {
        "aria-hidden": true
      }), /*#__PURE__*/React.createElement("g", {
        stroke: sw,
        strokeWidth: "6",
        strokeLinecap: "round"
      }, /*#__PURE__*/React.createElement("line", {
        x1: "60",
        y1: "60",
        x2: "60",
        y2: "20"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "60",
        y1: "60",
        x2: "25",
        y2: "85"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "60",
        y1: "60",
        x2: "95",
        y2: "85"
      })), /*#__PURE__*/React.createElement("circle", {
        cx: "60",
        cy: "60",
        r: "14",
        fill: fill
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "60",
        cy: "20",
        r: "9.5",
        fill: accent
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "25",
        cy: "85",
        r: "9.5",
        fill: fill
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "95",
        cy: "85",
        r: "9.5",
        fill: accent
      }));
    case 'HAND':
      // Bauhaus primitives, assembled — the maker
      return /*#__PURE__*/React.createElement("svg", _extends({}, common, {
        "aria-hidden": true
      }), /*#__PURE__*/React.createElement("polygon", {
        points: "60,13 85,57 35,57",
        fill: fill
      }), /*#__PURE__*/React.createElement("rect", {
        x: "17",
        y: "64",
        width: "39",
        height: "39",
        rx: "5",
        fill: fill
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "84",
        cy: "83",
        r: "20",
        fill: accent
      }));
    case 'FACE':
      // overlapping speech bubbles — the teller
      return /*#__PURE__*/React.createElement("svg", _extends({}, common, {
        "aria-hidden": true
      }), /*#__PURE__*/React.createElement("rect", {
        x: "44",
        y: "14",
        width: "62",
        height: "40",
        rx: "14",
        fill: accent,
        opacity: "0.92"
      }), /*#__PURE__*/React.createElement("rect", {
        x: "14",
        y: "34",
        width: "64",
        height: "46",
        rx: "14",
        fill: fill
      }), /*#__PURE__*/React.createElement("polygon", {
        points: "28,73 28,98 51,76",
        fill: fill
      }));
    default:
      return /*#__PURE__*/React.createElement("svg", _extends({}, common, {
        "aria-hidden": true
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "60",
        cy: "60",
        r: "40",
        fill: fill
      }));
  }
}

// ── Radar chart ──────────────────────────────────────────────────────────
// score: {EYE,HEART,...}. animate gates the draw-in. compact hides labels/axes.
function RadarChart(_ref2) {
  var score = _ref2.score,
    color = _ref2.color,
    fill = _ref2.fill,
    _ref2$size = _ref2.size,
    size = _ref2$size === void 0 ? 320 : _ref2$size,
    _ref2$animate = _ref2.animate,
    animate = _ref2$animate === void 0 ? false : _ref2$animate,
    _ref2$showLabels = _ref2.showLabels,
    showLabels = _ref2$showLabels === void 0 ? true : _ref2$showLabels,
    _ref2$showDots = _ref2.showDots,
    showDots = _ref2$showDots === void 0 ? true : _ref2$showDots,
    _ref2$ringColor = _ref2.ringColor,
    ringColor = _ref2$ringColor === void 0 ? 'rgba(33,30,26,0.10)' : _ref2$ringColor,
    _ref2$strokeW = _ref2.strokeW,
    strokeW = _ref2$strokeW === void 0 ? 2.5 : _ref2$strokeW,
    labelColor = _ref2.labelColor,
    _ref2$labelSize = _ref2.labelSize,
    labelSize = _ref2$labelSize === void 0 ? 12 : _ref2$labelSize;
  var P = window.POKEMON;
  var R = P.buildRadar(score, 320, 116);
  var polyStyle = animate ? {
    transformBox: 'fill-box',
    transformOrigin: 'center',
    animation: 'pkRadarDraw .95s .15s cubic-bezier(.2,.7,.2,1) both'
  } : {};
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 320 320",
    width: size,
    height: size,
    style: {
      display: 'block',
      overflow: 'visible',
      maxWidth: '100%'
    },
    "aria-hidden": true
  }, R.rings.map(function (ring, i) {
    return /*#__PURE__*/React.createElement("polygon", {
      key: i,
      points: ring.pts,
      fill: "none",
      stroke: ringColor,
      strokeWidth: "1"
    });
  }), showLabels && R.axes.map(function (ax, i) {
    return /*#__PURE__*/React.createElement("line", {
      key: i,
      x1: "160",
      y1: "160",
      x2: ax.ox,
      y2: ax.oy,
      stroke: ringColor,
      strokeWidth: "1"
    });
  }), /*#__PURE__*/React.createElement("polygon", {
    points: R.polyPoints,
    fill: fill,
    stroke: color,
    strokeWidth: strokeW,
    strokeLinejoin: "round",
    style: polyStyle
  }), showDots && R.axes.map(function (ax, i) {
    return /*#__PURE__*/React.createElement("circle", {
      key: i,
      cx: ax.dx,
      cy: ax.dy,
      r: size > 160 ? 4.5 : 6,
      fill: ax.color,
      style: animate ? {
        transformBox: 'fill-box',
        transformOrigin: 'center',
        animation: "pkRadarDot .45s ".concat((0.65 + i * 0.08).toFixed(2), "s both")
      } : {}
    });
  }), showLabels && R.axes.map(function (ax, i) {
    return /*#__PURE__*/React.createElement("text", {
      key: i,
      x: ax.lx,
      y: ax.ly,
      fill: labelColor || ax.color,
      textAnchor: ax.anchor,
      dominantBaseline: "middle",
      style: {
        fontFamily: "'Geist Mono',monospace",
        fontSize: labelSize,
        fontWeight: 600,
        letterSpacing: '.03em'
      }
    }, ax.label);
  }));
}
window.PokemonEmblems = {
  Emblem: Emblem,
  RadarChart: RadarChart
};