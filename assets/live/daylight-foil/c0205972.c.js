function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/* global React, useTweaks, TweaksPanel, TweakSection, TweakSlider */

// Celebration FX — shared tweakable parameters for the holographic card effect.
// A tiny store broadcasts values to every card; the Tweaks panel writes to it.

var CELEB_FX_DEFAULTS = /*EDITMODE-BEGIN*/{
  "tiltMax": 10,
  "perspective": 850,
  "hoverScale": 1.02,
  "shineStrength": 0.4,
  "bandWidth": 27,
  "bandBlur": 12,
  "shineLag": 320,
  "iridescence": 0.65,
  "hueSpread": 200,
  "hueCenter": 38,
  "rainbowScale": 230,
  "rainbowRest": 0.35,
  "specular": 0.38,
  "specSize": 52,
  "edgeGlow": 0.5,
  "noise": 0.06,
  "noiseScale": 2,
  "confetti": 130
} /*EDITMODE-END*/;
window.CelebFxStore = function () {
  var v = _objectSpread({}, CELEB_FX_DEFAULTS);
  var subs = new Set();
  return {
    get: function get() {
      return v;
    },
    set: function set(nv) {
      v = _objectSpread(_objectSpread({}, v), nv);
      subs.forEach(function (f) {
        return f(v);
      });
    },
    sub: function sub(f) {
      subs.add(f);
      return function () {
        return subs["delete"](f);
      };
    }
  };
}();
function useCelebFx() {
  var _React$useState = React.useState(function () {
      return window.CelebFxStore.get();
    }),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    v = _React$useState2[0],
    setV = _React$useState2[1];
  React.useEffect(function () {
    return window.CelebFxStore.sub(setV);
  }, []);
  return v;
}
function CelebrationTweaks() {
  var _useTweaks = useTweaks(CELEB_FX_DEFAULTS),
    _useTweaks2 = _slicedToArray(_useTweaks, 2),
    t = _useTweaks2[0],
    setTweak = _useTweaks2[1];
  React.useEffect(function () {
    window.CelebFxStore.set(t);
  }, [t]);
  var S = function S(label, key, min, max, step, unit) {
    return /*#__PURE__*/React.createElement(TweakSlider, {
      label: label,
      value: t[key],
      min: min,
      max: max,
      step: step,
      unit: unit,
      onChange: function onChange(v) {
        return setTweak(key, v);
      }
    });
  };
  return /*#__PURE__*/React.createElement(TweaksPanel, null, /*#__PURE__*/React.createElement(TweakSection, {
    label: "Tilt"
  }), S('Tilt depth', 'tiltMax', 0, 18, 0.5, '°'), S('Perspective', 'perspective', 400, 1800, 50, 'px'), S('Hover zoom', 'hoverScale', 1, 1.08, 0.005, '×'), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Shine band"
  }), S('Strength', 'shineStrength', 0, 1, 0.05), S('Band width', 'bandWidth', 8, 40, 1, '%'), S('Band softness', 'bandBlur', 0, 30, 1, 'px'), S('Follow lag', 'shineLag', 50, 1200, 25, 'ms'), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Iridescence"
  }), S('Amount', 'iridescence', 0, 1, 0.05), S('Hue spread', 'hueSpread', 0, 360, 10, '°'), S('Hue center', 'hueCenter', 0, 360, 5, '°'), S('Pattern scale', 'rainbowScale', 140, 420, 10, '%'), S('Visible at rest', 'rainbowRest', 0, 1, 0.05), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Specular glow"
  }), S('Intensity', 'specular', 0, 1, 0.05), S('Size', 'specSize', 15, 80, 1, '%'), S('Edge glow', 'edgeGlow', 0, 1, 0.05), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Texture"
  }), S('Noise opacity', 'noise', 0, 0.3, 0.01), S('Noise scale', 'noiseScale', 1, 4, 0.25), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Confetti"
  }), S('Particles', 'confetti', 0, 300, 10));
}
Object.assign(window, {
  CELEB_FX_DEFAULTS: CELEB_FX_DEFAULTS,
  useCelebFx: useCelebFx,
  CelebrationTweaks: CelebrationTweaks
});