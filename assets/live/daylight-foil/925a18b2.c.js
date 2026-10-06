function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* global React */
var _React = React,
  useState = _React.useState;

// Sidebar — persistent left nav. Three signals: where I've been (filled dots),
// where I am (orange today), what's locked. Phase headers group weeks like
// chapters; current phase is open, future phases are gated.

// Icons -----------------------------------------------------------------
var Icon = {
  chevron: function chevron(p) {
    return /*#__PURE__*/React.createElement("svg", _extends({
      viewBox: "0 0 12 12",
      width: "12",
      height: "12",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.5",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, p), /*#__PURE__*/React.createElement("path", {
      d: "M4 3l3 3-3 3"
    }));
  },
  chevronDown: function chevronDown(p) {
    return /*#__PURE__*/React.createElement("svg", _extends({
      viewBox: "0 0 12 12",
      width: "12",
      height: "12",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.5",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, p), /*#__PURE__*/React.createElement("path", {
      d: "M3 4.5l3 3 3-3"
    }));
  },
  lock: function lock(p) {
    return /*#__PURE__*/React.createElement("svg", _extends({
      viewBox: "0 0 12 12",
      width: "11",
      height: "11",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.3"
    }, p), /*#__PURE__*/React.createElement("rect", {
      x: "2.5",
      y: "5.5",
      width: "7",
      height: "5",
      rx: "1"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M4 5.5V4a2 2 0 014 0v1.5",
      strokeLinecap: "round"
    }));
  },
  check: function check(p) {
    return /*#__PURE__*/React.createElement("svg", _extends({
      viewBox: "0 0 12 12",
      width: "10",
      height: "10",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, p), /*#__PURE__*/React.createElement("path", {
      d: "M2.5 6.5l2.3 2.3L9.5 3.5"
    }));
  },
  search: function search(p) {
    return /*#__PURE__*/React.createElement("svg", _extends({
      viewBox: "0 0 14 14",
      width: "14",
      height: "14",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.4",
      strokeLinecap: "round"
    }, p), /*#__PURE__*/React.createElement("circle", {
      cx: "6",
      cy: "6",
      r: "3.8"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M9 9l3 3"
    }));
  },
  flame: function flame(p) {
    return /*#__PURE__*/React.createElement("svg", _extends({
      viewBox: "0 0 16 16",
      width: "14",
      height: "14",
      fill: "currentColor"
    }, p), /*#__PURE__*/React.createElement("path", {
      d: "M8 1.5c.6 1.7.3 3-1 4-1.8 1.4-3 2.7-3 4.8C4 12.9 5.8 14.5 8 14.5s4-1.6 4-4.2c0-1.4-.6-2.5-1.4-3.4-.5-.5-.6.3-1.1.3-.6 0-1-.4-1-1 0-1.4 0-3.1-.5-4.7z"
    }));
  },
  play: function play(p) {
    return /*#__PURE__*/React.createElement("svg", _extends({
      viewBox: "0 0 12 12",
      width: "10",
      height: "10",
      fill: "currentColor"
    }, p), /*#__PURE__*/React.createElement("path", {
      d: "M3.5 2.5v7l6-3.5z"
    }));
  },
  doc: function doc(p) {
    return /*#__PURE__*/React.createElement("svg", _extends({
      viewBox: "0 0 12 12",
      width: "11",
      height: "11",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.3",
      strokeLinejoin: "round"
    }, p), /*#__PURE__*/React.createElement("path", {
      d: "M3 1.5h4l2 2v7H3z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M7 1.5v2h2"
    }));
  }
};

// Day dots — visual heatbar per week (filled = done, ring = today, dim = ahead)
function DayDots(_ref) {
  var states = _ref.states;
  // states: array of 'done' | 'today' | 'open' | 'rest'
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 3,
      alignItems: 'center',
      height: 10
    }
  }, states.map(function (s, i) {
    var sz = s === 'today' ? 7 : 5;
    var base = {
      width: sz,
      height: sz,
      borderRadius: 999,
      transition: 'all .15s'
    };
    if (s === 'done') return /*#__PURE__*/React.createElement("span", {
      key: i,
      style: _objectSpread(_objectSpread({}, base), {}, {
        background: 'var(--ink)'
      })
    });
    if (s === 'today') return /*#__PURE__*/React.createElement("span", {
      key: i,
      style: _objectSpread(_objectSpread({}, base), {}, {
        background: 'var(--orange)',
        boxShadow: '0 0 0 2px var(--orange-glow)'
      })
    });
    if (s === 'open') return /*#__PURE__*/React.createElement("span", {
      key: i,
      style: _objectSpread(_objectSpread({}, base), {}, {
        background: 'transparent',
        border: '1.2px solid var(--line-strong)'
      })
    });
    return /*#__PURE__*/React.createElement("span", {
      key: i,
      style: _objectSpread(_objectSpread({}, base), {}, {
        background: 'var(--line)'
      })
    });
  }));
}

// Mini week row (collapsed)
function WeekRow(_ref2) {
  var idx = _ref2.idx,
    label = _ref2.label,
    dots = _ref2.dots,
    status = _ref2.status,
    percent = _ref2.percent,
    onClick = _ref2.onClick,
    active = _ref2.active;
  var isLocked = status === 'locked';
  var isDone = status === 'done';
  var isCurrent = status === 'current';
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '8px 10px',
      borderRadius: 8,
      textAlign: 'left',
      background: active ? 'rgba(255,69,15,0.05)' : 'transparent',
      color: isLocked ? 'var(--ink-3)' : 'var(--ink)',
      opacity: isLocked ? 0.7 : 1,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "mono mono-s",
    style: {
      width: 24,
      height: 22,
      borderRadius: 5,
      flex: '0 0 auto',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: isCurrent ? 'var(--orange)' : isDone ? 'var(--ink)' : 'transparent',
      color: isCurrent || isDone ? 'white' : 'var(--ink-3)',
      border: !isCurrent && !isDone ? '1px solid var(--line-strong)' : '0',
      fontWeight: 600,
      fontSize: 11
    }
  }, String(idx).padStart(2, '0')), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: '1 1 auto',
      minWidth: 0,
      fontSize: 13.5,
      fontWeight: isCurrent ? 600 : 500,
      lineHeight: 1.2
    }
  }, label), isLocked ? /*#__PURE__*/React.createElement(Icon.lock, {
    style: {
      color: 'var(--ink-3)',
      flex: '0 0 auto'
    }
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      flex: '0 0 auto'
    }
  }, /*#__PURE__*/React.createElement(DayDots, {
    states: dots
  })));
}

// Expanded week row — list pages with check/today
function WeekExpanded(_ref3) {
  var idx = _ref3.idx,
    label = _ref3.label,
    pages = _ref3.pages,
    onCollapse = _ref3.onCollapse,
    activeSlug = _ref3.activeSlug;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '4px 0 8px',
      borderRadius: 12,
      background: 'rgba(255,69,15,0.04)',
      border: '1px solid rgba(255,69,15,0.16)',
      margin: '4px 0'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onCollapse,
    style: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '8px 10px',
      textAlign: 'left'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "mono mono-s",
    style: {
      width: 24,
      height: 22,
      borderRadius: 5,
      flex: '0 0 auto',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--orange)',
      color: 'white',
      fontWeight: 600,
      fontSize: 11
    }
  }, String(idx).padStart(2, '0')), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: '1 1 auto',
      minWidth: 0,
      fontSize: 13.5,
      fontWeight: 600
    }
  }, label), /*#__PURE__*/React.createElement(Icon.chevronDown, {
    style: {
      color: 'var(--ink-2)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '2px 10px 4px',
      marginLeft: 22,
      borderLeft: '1px dashed rgba(255,69,15,0.25)'
    }
  }, pages.map(function (p, i) {
    var isActive = p.slug === activeSlug;
    var Icn = p.kind === 'video' ? Icon.play : Icon.doc;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '6px 8px',
        marginLeft: 6,
        borderRadius: 7,
        background: isActive ? 'var(--surface)' : 'transparent',
        boxShadow: isActive ? '0 1px 0 rgba(20,15,10,0.04), 0 0 0 1px rgba(255,69,15,0.18)' : 'none',
        color: p.done ? 'var(--ink-2)' : 'var(--ink)',
        fontSize: 13,
        lineHeight: 1.25,
        position: 'relative'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 14,
        height: 14,
        borderRadius: 999,
        flex: '0 0 auto',
        background: p.done ? 'var(--orange)' : isActive ? 'transparent' : 'transparent',
        border: p.done ? '0' : isActive ? '1.5px solid var(--orange)' : '1.5px solid var(--line-strong)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white'
      }
    }, p.done && /*#__PURE__*/React.createElement(Icon.check, null)), /*#__PURE__*/React.createElement(Icn, {
      style: {
        color: 'var(--ink-3)',
        flex: '0 0 auto'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: '1 1 auto',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        fontWeight: isActive ? 600 : 400
      }
    }, p.title), p.duration && /*#__PURE__*/React.createElement("span", {
      className: "mono mono-s",
      style: {
        color: 'var(--ink-3)',
        flex: '0 0 auto'
      }
    }, p.duration));
  })));
}

// Phase header
function PhaseHeader(_ref4) {
  var label = _ref4.label,
    sub = _ref4.sub,
    locked = _ref4.locked;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 8,
      padding: '14px 12px 6px',
      color: locked ? 'var(--ink-3)' : 'var(--ink-2)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "caption",
    style: {
      fontWeight: 600,
      color: locked ? 'var(--ink-3)' : 'var(--ink)'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      height: 1,
      background: 'var(--line)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "mono mono-s",
    style: {
      color: 'var(--ink-3)'
    }
  }, sub));
}

// Top brand row
function BrandRow() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '20px 16px 14px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "flame"
  }, /*#__PURE__*/React.createElement(Icon.flame, {
    style: {
      color: 'white'
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600,
      fontSize: 15,
      letterSpacing: '-0.01em'
    }
  }, "UX Gym"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("button", {
    title: "Search",
    style: {
      width: 28,
      height: 28,
      borderRadius: 7,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--ink-2)',
      border: '1px solid var(--line)',
      background: 'var(--surface)'
    }
  }, /*#__PURE__*/React.createElement(Icon.search, null)));
}

// Identity / streak pill at bottom
function UserPill(_ref5) {
  var name = _ref5.name,
    day = _ref5.day,
    streak = _ref5.streak,
    week = _ref5.week;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      margin: 12,
      padding: '12px 14px',
      borderRadius: 14,
      background: 'var(--surface)',
      border: '1px solid var(--line)',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      boxShadow: 'var(--shadow-sm)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 34,
      height: 34,
      borderRadius: 10,
      background: 'linear-gradient(135deg, #2A211A, #15110D)',
      color: 'var(--ink-on-dark)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 600,
      fontSize: 13,
      flex: '0 0 auto'
    }
  }, "SP"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '1 1 auto',
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      lineHeight: 1.2
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: 'var(--ink-2)',
      lineHeight: 1.3,
      marginTop: 1
    }
  }, "Week ", week, " \xB7 Ignite")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      flex: '0 0 auto',
      color: 'var(--orange-ink)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 3,
      fontSize: 13,
      fontWeight: 700,
      lineHeight: 1
    }
  }, /*#__PURE__*/React.createElement(Icon.flame, {
    style: {
      color: 'var(--orange)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontWeight: 700,
      fontSize: 13
    }
  }, streak)), /*#__PURE__*/React.createElement("span", {
    className: "mono mono-s",
    style: {
      color: 'var(--ink-3)',
      marginTop: 3
    }
  }, "day ", day)));
}

// Today highlight at top of nav
function TodayCard(_ref6) {
  var label = _ref6.label,
    sub = _ref6.sub;
  return /*#__PURE__*/React.createElement("button", {
    style: {
      width: 'calc(100% - 24px)',
      margin: '0 12px 4px',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '10px 12px',
      borderRadius: 11,
      background: 'var(--surface-dark)',
      color: 'var(--ink-on-dark)',
      textAlign: 'left',
      boxShadow: '0 1px 0 rgba(255,255,255,0.05) inset, 0 8px 18px -8px rgba(20,15,10,0.4)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 28,
      height: 28,
      borderRadius: 8,
      background: 'rgba(255,69,15,0.18)',
      border: '1px solid rgba(255,69,15,0.4)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#FF7E50',
      flex: '0 0 auto'
    }
  }, /*#__PURE__*/React.createElement(Icon.flame, {
    style: {
      width: 14,
      height: 14
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '1 1 auto',
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "caption",
    style: {
      color: '#FF8559',
      fontSize: 10,
      fontWeight: 600
    }
  }, "TODAY"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      fontWeight: 600,
      lineHeight: 1.25,
      marginTop: 2
    }
  }, label)), /*#__PURE__*/React.createElement(Icon.chevron, {
    style: {
      color: 'var(--ink-on-dark-2)'
    }
  }));
}

// Full sidebar
function Sidebar(_ref7) {
  var _ref7$activeWeek = _ref7.activeWeek,
    activeWeek = _ref7$activeWeek === void 0 ? 4 : _ref7$activeWeek,
    _ref7$activePageSlug = _ref7.activePageSlug,
    activePageSlug = _ref7$activePageSlug === void 0 ? null : _ref7$activePageSlug,
    _ref7$todayLabel = _ref7.todayLabel,
    todayLabel = _ref7$todayLabel === void 0 ? 'Visual hierarchy' : _ref7$todayLabel,
    _ref7$todayWeek = _ref7.todayWeek,
    todayWeek = _ref7$todayWeek === void 0 ? 4 : _ref7$todayWeek;
  // Data
  var igniteWeeks = [{
    idx: 0,
    label: 'Pre-program prep',
    status: 'done',
    dots: ['done', 'done', 'done', 'done', 'done', 'rest', 'rest']
  }, {
    idx: 1,
    label: 'Eye — see like a designer',
    status: 'done',
    dots: ['done', 'done', 'done', 'done', 'done', 'done', 'rest']
  }, {
    idx: 2,
    label: 'Heart — feel the user',
    status: 'done',
    dots: ['done', 'done', 'done', 'done', 'done', 'done', 'rest']
  }, {
    idx: 3,
    label: 'Brain — frame the problem',
    status: 'done',
    dots: ['done', 'done', 'done', 'done', 'done', 'done', 'rest']
  }, {
    idx: 4,
    label: 'Hand — make it real',
    status: 'current',
    dots: ['done', 'done', 'today', 'open', 'open', 'open', 'rest']
  }, {
    idx: 5,
    label: 'Face — present it',
    status: 'locked'
  }, {
    idx: 6,
    label: 'Studio week',
    status: 'locked'
  }];
  var week4Pages = [{
    slug: 'affordances',
    title: 'Affordances & signifiers',
    kind: 'video',
    duration: '12m',
    done: true
  }, {
    slug: 'hierarchy',
    title: 'Visual hierarchy',
    kind: 'video',
    duration: '14m',
    done: false
  }, {
    slug: 'microcopy',
    title: 'Microcopy that earns',
    kind: 'doc',
    duration: '8m',
    done: false
  }, {
    slug: 'states',
    title: 'Empty, loading, error',
    kind: 'doc',
    duration: '10m',
    done: false
  }, {
    slug: 'workshop',
    title: 'Live critique workshop',
    kind: 'video',
    duration: '60m',
    done: false
  }];
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 280,
      flex: '0 0 280px',
      height: '100%',
      background: 'var(--bg)',
      borderRight: '1px solid var(--line)',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(BrandRow, null), /*#__PURE__*/React.createElement(TodayCard, {
    label: todayLabel ? "".concat(todayLabel) : 'Open today\'s session',
    sub: "Week ".concat(todayWeek)
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '1 1 auto',
      overflow: 'auto',
      padding: '4px 8px 8px'
    }
  }, /*#__PURE__*/React.createElement(PhaseHeader, {
    label: "Ignite",
    sub: "W0\u2013W6"
  }), igniteWeeks.map(function (w) {
    return w.idx === activeWeek ? /*#__PURE__*/React.createElement(WeekExpanded, {
      key: w.idx,
      idx: w.idx,
      label: w.label,
      pages: week4Pages,
      activeSlug: activePageSlug,
      onCollapse: function onCollapse() {}
    }) : /*#__PURE__*/React.createElement(WeekRow, {
      key: w.idx,
      idx: w.idx,
      label: w.label,
      dots: w.dots || [],
      status: w.status
    });
  }), /*#__PURE__*/React.createElement(PhaseHeader, {
    label: "UI Forge",
    sub: "locked \xB7 unlocks W6",
    locked: true
  }), ['Warm-up · phase 2', 'Colour & light', 'Typography', 'Layout & grid'].map(function (t, i) {
    return /*#__PURE__*/React.createElement(WeekRow, {
      key: t,
      idx: i + 1,
      label: t,
      status: "locked"
    });
  }), /*#__PURE__*/React.createElement(PhaseHeader, {
    label: "Portfolio",
    sub: "locked",
    locked: true
  }), ['Industry-backwards case study', 'Critique & polish'].map(function (t, i) {
    return /*#__PURE__*/React.createElement(WeekRow, {
      key: t,
      idx: i + 1,
      label: t,
      status: "locked"
    });
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 12
    }
  }), /*#__PURE__*/React.createElement(PhaseHeader, {
    label: "Library",
    sub: "saved \xB7 14"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 6px'
    }
  }, [{
    t: 'Heuristics reference',
    kind: 'doc'
  }, {
    t: 'Critique workshop · W3',
    kind: 'video'
  }, {
    t: 'Hierarchy field notes',
    kind: 'doc'
  }].map(function (it) {
    var Icn = it.kind === 'video' ? Icon.play : Icon.doc;
    return /*#__PURE__*/React.createElement("div", {
      key: it.t,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '7px 10px',
        borderRadius: 7,
        color: 'var(--ink-2)',
        fontSize: 13
      }
    }, /*#__PURE__*/React.createElement(Icn, {
      style: {
        color: 'var(--ink-3)',
        flex: '0 0 auto'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }
    }, it.t));
  }))), /*#__PURE__*/React.createElement(UserPill, {
    name: "Soumya P.",
    day: 47,
    streak: 12,
    week: 4
  }));
}

// Export
Object.assign(window, {
  Sidebar: Sidebar,
  Icon: Icon,
  DayDots: DayDots
});