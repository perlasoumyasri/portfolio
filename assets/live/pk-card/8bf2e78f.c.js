function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorValues(e) { if (null != e) { var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"], r = 0; if (t) return t.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) return { next: function next() { return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }; } }; } throw new TypeError(_typeof(e) + " is not iterable"); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
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
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
/* global React */
// ─────────────────────────────────────────────────────────────────────────
//  UX Pokémon · v2 — orchestrator.
//  welcome → flow → reveal → hero (the card). Scoring + data unchanged.
// ─────────────────────────────────────────────────────────────────────────

var _React = React,
  pState = _React.useState,
  pEffect = _React.useEffect,
  pRef = _React.useRef,
  pCb = _React.useCallback;
var PAPER = '#F7F4EE',
  INK = '#15110D';

// html-to-image cannot inline the bundle's blob: font URLs (they never become
// data: URIs), so an exported PNG falls back to system fonts - the Instrument
// Serif name renders as a generic serif and labels shift/overlap. We build the
// @font-face CSS ourselves: fetch each blob font and inline it as a data: URI,
// then hand it to toPng via `fontEmbedCSS`. Computed once, then cached.
var __exportFontCSS = null;
function exportFontCSS() {
  return _exportFontCSS.apply(this, arguments);
}
function _exportFontCSS() {
  _exportFontCSS = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
    var out, _i, _Array$from, sheet, rules, _loop, _ret, _i2, _Array$from2, _t3;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.p = _context3.n) {
        case 0:
          if (!(__exportFontCSS != null)) {
            _context3.n = 1;
            break;
          }
          return _context3.a(2, __exportFontCSS);
        case 1:
          out = [];
          _i = 0, _Array$from = Array.from(document.styleSheets);
        case 2:
          if (!(_i < _Array$from.length)) {
            _context3.n = 11;
            break;
          }
          sheet = _Array$from[_i];
          rules = void 0;
          _context3.p = 3;
          rules = sheet.cssRules;
          _context3.n = 5;
          break;
        case 4:
          _context3.p = 4;
          _t3 = _context3.v;
          return _context3.a(3, 10);
        case 5:
          if (rules) {
            _context3.n = 6;
            break;
          }
          return _context3.a(3, 10);
        case 6:
          _loop = /*#__PURE__*/_regenerator().m(function _loop() {
            var rule, src, mm, blob, dataUrl, _t2;
            return _regenerator().w(function (_context2) {
              while (1) switch (_context2.p = _context2.n) {
                case 0:
                  rule = _Array$from2[_i2];
                  if (!(!rule || rule.constructor.name !== 'CSSFontFaceRule')) {
                    _context2.n = 1;
                    break;
                  }
                  return _context2.a(2, 0);
                case 1:
                  src = rule.style.getPropertyValue('src');
                  mm = src.match(/url\(["']?(blob:[^"')]+)["']?\)/);
                  if (mm) {
                    _context2.n = 2;
                    break;
                  }
                  out.push(rule.cssText);
                  return _context2.a(2, 0);
                case 2:
                  _context2.p = 2;
                  _context2.n = 3;
                  return fetch(mm[1]);
                case 3:
                  _context2.n = 4;
                  return _context2.v.blob();
                case 4:
                  blob = _context2.v;
                  _context2.n = 5;
                  return new Promise(function (res, rej) {
                    var fr = new FileReader();
                    fr.onload = function () {
                      return res(fr.result);
                    };
                    fr.onerror = rej;
                    fr.readAsDataURL(blob);
                  });
                case 5:
                  dataUrl = _context2.v;
                  out.push(rule.cssText.replace(mm[1], dataUrl));
                  _context2.n = 7;
                  break;
                case 6:
                  _context2.p = 6;
                  _t2 = _context2.v;
                  out.push(rule.cssText);
                case 7:
                  return _context2.a(2);
              }
            }, _loop, null, [[2, 6]]);
          });
          _i2 = 0, _Array$from2 = Array.from(rules);
        case 7:
          if (!(_i2 < _Array$from2.length)) {
            _context3.n = 10;
            break;
          }
          return _context3.d(_regeneratorValues(_loop()), 8);
        case 8:
          _ret = _context3.v;
          if (!(_ret === 0)) {
            _context3.n = 9;
            break;
          }
          return _context3.a(3, 9);
        case 9:
          _i2++;
          _context3.n = 7;
          break;
        case 10:
          _i++;
          _context3.n = 2;
          break;
        case 11:
          __exportFontCSS = out.join('\n');
          return _context3.a(2, __exportFontCSS);
      }
    }, _callee2, null, [[3, 4]]);
  }));
  return _exportFontCSS.apply(this, arguments);
}
function PokemonApp() {
  var P = window.POKEMON;
  var prm = window.PokemonCard.usePRM();
  var Welcome = window.PK2Welcome.Welcome;
  var Flow = window.PK2Flow.Flow;
  var _window$PK2Stages = window.PK2Stages,
    Reveal = _window$PK2Stages.Reveal,
    HeroReveal = _window$PK2Stages.HeroReveal;
  var params = new URLSearchParams(location.search);
  var startStage = params.get('stage');
  var startType = (params.get('type') || '').toUpperCase();
  var typeAns = function typeAns() {
    return P.TYPES.indexOf(startType) >= 0 ? P.sampleAnswersFor(startType) : P.sampleAnswers();
  };
  var initial = function initial() {
    if (startStage === 'hero' || startStage === 'card' || startStage === 'result') return {
      phase: 'hero',
      answers: typeAns()
    };
    if (startStage === 'reveal') return {
      phase: 'reveal',
      answers: P.sampleAnswers()
    };
    if (startStage === 'questions') return {
      phase: 'flow',
      answers: {}
    };
    try {
      if (!params.get('admin')) {
        var __s = JSON.parse(localStorage.getItem('uxpk_progress') || 'null');
        if (__s && __s.phase) return __s;
      }
    } catch (e) {}
    return {
      phase: 'welcome',
      answers: {}
    };
  };
  var init = initial();
  var _pState = pState(init.phase),
    _pState2 = _slicedToArray(_pState, 2),
    phase = _pState2[0],
    setPhase = _pState2[1];
  var _pState3 = pState(init.stepIndex || 0),
    _pState4 = _slicedToArray(_pState3, 2),
    stepIndex = _pState4[0],
    setStepIndex = _pState4[1];
  var _pState5 = pState(init.answers),
    _pState6 = _slicedToArray(_pState5, 2),
    answers = _pState6[0],
    setAnswers = _pState6[1];
  var _pState7 = pState(null),
    _pState8 = _slicedToArray(_pState7, 2),
    photoUrl = _pState8[0],
    setPhotoUrl = _pState8[1];
  var _pState9 = pState(init.name || ''),
    _pState0 = _slicedToArray(_pState9, 2),
    name = _pState0[0],
    setName = _pState0[1];
  var _pState1 = pState(null),
    _pState10 = _slicedToArray(_pState1, 2),
    dbRestore = _pState10[0],
    setDbRestore = _pState10[1];
  pEffect(function () {
    try {
      if (params.get('admin')) return;
      if (dbRestore) return;
      if (phase === 'welcome') localStorage.removeItem('uxpk_progress');else if (phase === 'flow' || phase === 'reveal' || phase === 'hero') localStorage.setItem('uxpk_progress', JSON.stringify({
        phase: phase,
        stepIndex: stepIndex,
        answers: answers,
        name: name
      }));
    } catch (e) {}
  }, [phase, stepIndex, answers, name, dbRestore]);
  pEffect(function () {
    if (params.get('admin')) return;
    var __did = false;
    function __rebuild(rows) {
      var out = {};
      var FLOW = P && P.FLOW || [];
      (rows || []).forEach(function (row) {
        var it = FLOW[((row && row.q) | 0) - 1];
        if (!it) return;
        if (it.kind === 'scale') {
          if (row.rating != null) out[it.key] = row.rating;
        } else if (it.kind === 'mc' || it.kind === 'wyr') {
          var ix = (it.options || []).findIndex(function (o) {
            return o.text === row.choice;
          });
          if (ix >= 0) out[it.key] = ix;
        } else if (it.kind === 'choose') {
          var arr = (row.choices || []).map(function (c) {
            return (it.options || []).findIndex(function (o) {
              return o.text === (c && c.text);
            });
          }).filter(function (x) {
            return x >= 0;
          });
          if (arr.length) out[it.key] = arr;
        } else {
          if (row.text != null) out[it.key] = row.text;
        }
      });
      return out;
    }
    function onRestore(e) {
      if (e.origin !== location.origin) return;
      var d = e.data;
      if (!d || d.source !== 'lms' || d.type !== 'restore' || !d.payload || !d.payload.type) return;
      if (__did) return;
      if ((P.TYPES || []).indexOf(String(d.payload.type).toUpperCase()) < 0) return;
      var saved = null;
      try {
        saved = JSON.parse(localStorage.getItem('uxpk_progress') || 'null');
      } catch (e2) {}
      if (saved && saved.phase) {
        // Local progress exists. Only self-heal a COMPLETED card whose result
        // DISAGREES with the account (e.g. stale data from an old build). Never
        // touch an in-progress quiz, and leave an already-correct card alone.
        if (saved.phase !== 'hero') return;
        var localTop = null;
        try {
          localTop = P.computeResult(saved.answers || {}).top;
        } catch (e5) {}
        if (localTop === String(d.payload.type).toUpperCase()) return;
        try {
          localStorage.removeItem('uxpk_progress');
        } catch (e6) {}
      }
      __did = true;
      setAnswers(__rebuild(d.payload.answers));
      if (d.payload.displayName) setName(d.payload.displayName);
      setDbRestore(d.payload);
      setPhase('hero');
    }
    window.addEventListener('message', onRestore);
    try {
      parent.postMessage({
        source: 'drill',
        type: 'ready'
      }, location.origin);
    } catch (e3) {}
    return function () {
      window.removeEventListener('message', onRestore);
    };
  }, []);
  var _pState11 = pState(false),
    _pState12 = _slicedToArray(_pState11, 2),
    exporting = _pState12[0],
    setExporting = _pState12[1];
  var _pState13 = pState(''),
    _pState14 = _slicedToArray(_pState13, 2),
    photoError = _pState14[0],
    setPhotoError = _pState14[1];
  var _pState15 = pState(''),
    _pState16 = _slicedToArray(_pState15, 2),
    previewType = _pState16[0],
    setPreviewType = _pState16[1];
  var shuffleMap = pRef({}).current;
  var advRef = pRef(null),
    revRef = pRef(null);
  function __resultFromDB(pl) {
    var TYPES = P.TYPES || [];
    var top = String(pl && pl.type || '').toUpperCase();
    var score = pl && pl.scores || {};
    var ranked = TYPES.slice().sort(function (x, y) {
      return (score[y] || 0) - (score[x] || 0);
    });
    ranked = [top].concat(ranked.filter(function (t) {
      return t !== top;
    }));
    return {
      score: score,
      ranked: ranked,
      top: top,
      second: ranked[1],
      low: ranked[4],
      secondLow: ranked[3]
    };
  }
  var result = dbRestore ? __resultFromDB(dbRestore) : phase === 'reveal' || phase === 'hero' ? P.computeResult(answers) : null;
  pEffect(function () {
    return function () {
      clearTimeout(advRef.current);
      clearTimeout(revRef.current);
    };
  }, []);
  var goNext = pCb(function () {
    clearTimeout(advRef.current);
    setStepIndex(function (si) {
      if (si < P.FLOW.length - 1) return si + 1;
      setPhase('reveal');
      clearTimeout(revRef.current);
      revRef.current = setTimeout(function () {
        return setPhase('hero');
      }, prm ? 500 : 1900);
      return si;
    });
  }, [prm]);
  var selectAdvance = pCb(function (key, val) {
    setAnswers(function (a) {
      return _objectSpread(_objectSpread({}, a), {}, _defineProperty({}, key, val));
    });
    clearTimeout(advRef.current);
    advRef.current = setTimeout(goNext, 330);
  }, [goNext]);
  var toggleChoose = pCb(function (key, oi) {
    setAnswers(function (a) {
      var cur = Array.isArray(a[key]) ? a[key].slice() : [];
      var idx = cur.indexOf(oi);
      if (idx >= 0) cur.splice(idx, 1);else {
        if (cur.length >= 3) return a;
        cur.push(oi);
      }
      return _objectSpread(_objectSpread({}, a), {}, _defineProperty({}, key, cur));
    });
  }, []);
  var setReflect = pCb(function (key, val) {
    return setAnswers(function (a) {
      return _objectSpread(_objectSpread({}, a), {}, _defineProperty({}, key, val));
    });
  }, []);
  var goBack = pCb(function () {
    clearTimeout(advRef.current);
    setStepIndex(function (si) {
      if (si > 0) return si - 1;
      setPhase('welcome');
      return si;
    });
  }, []);
  var restart = pCb(function () {
    clearTimeout(advRef.current);
    clearTimeout(revRef.current);
    Object.keys(shuffleMap).forEach(function (k) {
      return delete shuffleMap[k];
    });
    setAnswers({});
    setStepIndex(0);
    setPhotoUrl(null);
    setName('');
    setExporting(false);
    setPhotoError('');
    setPreviewType('');
    setDbRestore(null);
    setPhase('welcome');
  }, []);
  var onPhoto = pCb(function (e) {
    var f = e.target.files && e.target.files[0];
    if (!f) return;
    if (!f.type || f.type.indexOf('image/') !== 0) {
      setPhotoError('Please choose an image file.');
      return;
    }
    if (f.size > 10 * 1024 * 1024) {
      setPhotoError('Please choose an image under 10 MB.');
      return;
    }
    var r = new FileReader();
    r.onload = function () {
      setPhotoUrl(r.result);
      setPhotoError('');
    };
    r.readAsDataURL(f);
  }, []);
  var onDownload = pCb(/*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(cardRef) {
      var node, w, h, prevShadow, restore, fontEmbedCSS, url, a, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            node = cardRef.current;
            if (!(!node || !window.htmlToImage)) {
              _context.n = 1;
              break;
            }
            return _context.a(2);
          case 1:
            if (!((!name || !name.trim() || !photoUrl) && !window.confirm('Your card looks best with your name and photo on it. Download it anyway?'))) {
              _context.n = 2;
              break;
            }
            return _context.a(2);
          case 2:
            setExporting(true);
            w = node.offsetWidth, h = node.offsetHeight; // Strip the card's outer glow/shadow during capture so the exported PNG is
            // ONLY the card - no faint whitish halo (a rounded rectangle of a different
            // radius) baked in behind it. Restore it after.
            prevShadow = node.style.boxShadow;
            node.style.boxShadow = 'none';
            restore = function restore() {
              node.style.boxShadow = prevShadow;
            };
            _context.p = 3;
            _context.n = 4;
            return exportFontCSS();
          case 4:
            fontEmbedCSS = _context.v;
            _context.n = 5;
            return window.htmlToImage.toPng(node, {
              pixelRatio: 3,
              cacheBust: true,
              width: w,
              height: h,
              backgroundColor: null,
              fontEmbedCSS: fontEmbedCSS,
              style: {
                boxShadow: 'none'
              }
            });
          case 5:
            url = _context.v;
            restore();
            a = document.createElement('a');
            a.download = (name || 'ux-pokemon') + '-card.png';
            a.href = url;
            a.click();
            setExporting(false);
            _context.n = 7;
            break;
          case 6:
            _context.p = 6;
            _t = _context.v;
            restore();
            setExporting(false);
          case 7:
            return _context.a(2);
        }
      }, _callee, null, [[3, 6]]);
    }));
    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }(), [name, photoUrl]);
  var jumpStage = pCb(function (s) {
    clearTimeout(advRef.current);
    clearTimeout(revRef.current);
    if (s === 'welcome') {
      setPreviewType('');
      setAnswers({});
      setStepIndex(0);
      setPhase('welcome');
      return;
    }
    if (s === 'questions') {
      setPreviewType('');
      setAnswers({});
      setStepIndex(0);
      setPhase('flow');
      return;
    }
    setAnswers(function (a) {
      return Object.keys(a).length ? a : P.sampleAnswers();
    });
    setPhase(s);
  }, []);
  var previewChar = pCb(function (t) {
    setPreviewType(t);
    setAnswers(P.sampleAnswersFor(t));
    setPhase(function (p) {
      return p === 'welcome' || p === 'flow' || p === 'reveal' ? 'hero' : p;
    });
  }, []);
  var screen = null;
  if (phase === 'welcome') screen = /*#__PURE__*/React.createElement(Welcome, {
    onBegin: function onBegin() {
      return setPhase('flow');
    }
  });else if (phase === 'flow') screen = /*#__PURE__*/React.createElement(Flow, {
    flow: P.FLOW,
    stepIndex: stepIndex,
    answers: answers,
    shuffleMap: shuffleMap,
    screenKey: stepIndex,
    onSelect: selectAdvance,
    onToggle: toggleChoose,
    onReflect: setReflect,
    onBack: goBack,
    onContinue: goNext
  });else if (phase === 'reveal') screen = /*#__PURE__*/React.createElement(Reveal, null);else if (phase === 'hero') screen = /*#__PURE__*/React.createElement(HeroReveal, {
    result: result,
    prm: prm,
    name: name,
    photoUrl: photoUrl,
    answers: answers,
    dbReview: dbRestore ? dbRestore.answers : null,
    exporting: exporting,
    photoError: photoError,
    onName: function onName(e) {
      return setName(e.target.value);
    },
    onPhoto: onPhoto,
    onDownload: onDownload,
    onRestart: restart
  });
  var dark = phase === 'hero' || phase === 'reveal';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100vh',
      width: '100%',
      background: dark ? '#0A0705' : PAPER,
      color: dark ? '#FAF6F0' : INK,
      fontFamily: "'Geist',system-ui,sans-serif",
      WebkitFontSmoothing: 'antialiased',
      transition: 'background .6s ease'
    }
  }, screen, /*#__PURE__*/React.createElement(DrillTweaks, {
    phase: phase,
    stepIndex: stepIndex,
    total: P.FLOW.length,
    previewType: previewType,
    onStage: jumpStage,
    onStep: function onStep(i) {
      setPhase('flow');
      setStepIndex(i);
    },
    onCharacter: previewChar,
    onRestart: restart
  }));
}
function DrillTweaks(_ref2) {
  var phase = _ref2.phase,
    stepIndex = _ref2.stepIndex,
    total = _ref2.total,
    previewType = _ref2.previewType,
    onStage = _ref2.onStage,
    onStep = _ref2.onStep,
    onCharacter = _ref2.onCharacter,
    onRestart = _ref2.onRestart;
  var _window = window,
    TweaksPanel = _window.TweaksPanel,
    TweakSection = _window.TweakSection,
    TweakSelect = _window.TweakSelect,
    TweakSlider = _window.TweakSlider,
    TweakButton = _window.TweakButton;
  if (!TweaksPanel) return null;
  var A = window.POKEMON.ARCH;
  var stageVal = phase === 'flow' ? 'questions' : phase;
  var stageOpts = [{
    value: 'welcome',
    label: 'Opening'
  }, {
    value: 'questions',
    label: 'Questions'
  }, {
    value: 'reveal',
    label: 'Reading…'
  }, {
    value: 'hero',
    label: 'Your card'
  }];
  var chars = ['EYE', 'HEART', 'BRAIN', 'HAND', 'FACE'];
  return /*#__PURE__*/React.createElement(TweaksPanel, {
    title: "Tweaks"
  }, /*#__PURE__*/React.createElement(TweakSection, {
    label: "Go to"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 5
    }
  }, stageOpts.map(function (o) {
    var on = stageVal === o.value;
    return /*#__PURE__*/React.createElement("button", {
      key: o.value,
      type: "button",
      onClick: function onClick() {
        return onStage(o.value);
      },
      style: {
        height: 32,
        borderRadius: 8,
        fontSize: 12,
        fontWeight: 600,
        fontFamily: 'inherit',
        cursor: 'pointer',
        border: on ? '1px solid #29261b' : '.5px solid rgba(0,0,0,.14)',
        background: on ? '#29261b' : '#fff',
        color: on ? '#fff' : '#29261b'
      }
    }, o.label);
  })), phase === 'flow' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TweakSection, {
    label: "Question ".concat(stepIndex + 1, " / ").concat(total)
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 5
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: function onClick() {
      return onStep(Math.max(0, stepIndex - 1));
    },
    disabled: stepIndex === 0,
    style: {
      height: 32,
      borderRadius: 8,
      fontSize: 12,
      fontWeight: 600,
      fontFamily: 'inherit',
      cursor: stepIndex === 0 ? 'not-allowed' : 'pointer',
      border: '.5px solid rgba(0,0,0,.14)',
      background: '#fff',
      color: stepIndex === 0 ? '#bdb7ab' : '#29261b',
      opacity: stepIndex === 0 ? 0.6 : 1,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "13",
    height: "13",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.4",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M19 12H5M11 6l-6 6 6 6"
  })), "Previous"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: function onClick() {
      return onStep(Math.min(total - 1, stepIndex + 1));
    },
    disabled: stepIndex === total - 1,
    style: {
      height: 32,
      borderRadius: 8,
      fontSize: 12,
      fontWeight: 600,
      fontFamily: 'inherit',
      cursor: stepIndex === total - 1 ? 'not-allowed' : 'pointer',
      border: '1px solid #29261b',
      background: stepIndex === total - 1 ? '#fff' : '#29261b',
      color: stepIndex === total - 1 ? '#bdb7ab' : '#fff',
      opacity: stepIndex === total - 1 ? 0.6 : 1,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6
    }
  }, "Next", /*#__PURE__*/React.createElement("svg", {
    width: "13",
    height: "13",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.4",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14M13 6l6 6-6 6"
  }))))), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Preview creature"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6
    }
  }, chars.map(function (t) {
    return /*#__PURE__*/React.createElement("button", {
      key: t,
      type: "button",
      title: A[t].name,
      onClick: function onClick() {
        return onCharacter(t);
      },
      style: {
        flex: 1,
        height: 30,
        borderRadius: 7,
        border: previewType === t ? '1.5px solid rgba(41,38,27,.85)' : '.5px solid rgba(0,0,0,.12)',
        background: A[t].color,
        cursor: 'pointer'
      }
    });
  })), /*#__PURE__*/React.createElement(TweakButton, {
    label: "Restart",
    secondary: true,
    onClick: onRestart
  }));
}
window.PokemonApp = PokemonApp;