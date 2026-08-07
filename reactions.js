/* Soumya Perla · panel 02, a happy client.
   ---------------------------------------------------------------------
   Three real messages from the client pop into a collage one after
   another, tap tap tap, the way YouTube videos present the comments
   they got. The first appears alone in the middle, then slides to its
   place on the left while the other two pop into theirs. Each landing
   makes a small feedback pop, the kind a keyboard click makes: quiet
   enough to need no mute button, pleasant enough to want again. At the
   end all three sit balanced and fully readable, and nothing moves
   again until the panel is revisited.

   This lives in its own file on purpose. It touches nothing that site.js
   owns, so the two can be edited at the same time without either one
   standing on the other.
   --------------------------------------------------------------------- */

(function () {
  'use strict';

  var box = document.getElementById('reax');
  if (!box) return;

  var cards = [].slice.call(box.querySelectorAll('.reax-card'));
  if (!cards.length) return;

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ------------------------------------------------------------------ *
   * The drop
   * A water drop, at her call: the little plip a droplet makes falling
   * into a glass. What defines that sound is a pitch that swoops
   * upward as the sound dies away, which is the bubble under the
   * surface shrinking. One sine, gliding up more than an octave in a
   * tenth of a second, gone in under a fifth. Each landing is a
   * slightly smaller drop than the last, so the three read as drip,
   * drip, drip rather than the same drop three times. It peaks well
   * under speech volume, which is why there is no mute button: a sound
   * this small is feedback, and nobody asks to mute feedback.
   *
   * The browser will not let any audio start until the visitor has
   * clicked, tapped or typed somewhere at least once, so the context is
   * armed on the first gesture anywhere on the page and the drops simply
   * work from then on.
   * ------------------------------------------------------------------ */
  var Ctx = window.AudioContext || window.webkitAudioContext;
  var ac = null;
  // Where each drop's glide starts. Higher start = smaller drop.
  var DROPS = [330, 392, 466];

  function arm() {
    if (!Ctx || ac) return;
    try { ac = new Ctx(); } catch (e) { ac = null; return; }
    if (ac.state === 'suspended') ac.resume();
  }
  ['pointerdown', 'keydown', 'touchstart'].forEach(function (ev) {
    window.addEventListener(ev, arm, { once: true, passive: true });
  });

  function pop(step) {
    if (!ac || ac.state !== 'running') return;
    var t = ac.currentTime;
    var f = DROPS[step] || DROPS[0];

    var osc = ac.createOscillator();
    osc.type = 'sine';
    // The swoop. It hangs on its starting pitch for a blink, then rises
    // two and a half times over the tail. Without that first hold the
    // glide starts too early and it reads as a chirp, not a drip.
    osc.frequency.setValueAtTime(f, t);
    osc.frequency.setValueAtTime(f, t + 0.03);
    osc.frequency.exponentialRampToValueAtTime(f * 2.5, t + 0.16);

    var g = ac.createGain();
    // Soft strike, quick fade. The drop is loudest the instant it lands
    // and is already fading while the pitch is still rising.
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.07, t + 0.006);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);

    osc.connect(g); g.connect(ac.destination);
    osc.start(t); osc.stop(t + 0.2);
  }

  /* ------------------------------------------------------------------ *
   * The run: pop, shift, pop, pop.
   * ------------------------------------------------------------------ */
  var timers = [];
  var finished = false;

  function later(fn, ms) { timers.push(setTimeout(fn, ms)); }

  function land(card, step) {
    card.classList.add('on', 'pop');
    pop(step);
  }

  function run() {
    clear();
    finished = false;

    // 1. The first message, alone in the middle, big enough to read.
    cards[0].classList.add('is-center');
    later(function () { land(cards[0], 0); }, 350);

    // 2. It slides to its place in the collage, and while it is still
    //    moving the second one taps in. The overlap is what makes it a
    //    rhythm instead of a slideshow.
    later(function () {
      cards[0].classList.remove('is-center', 'pop');
      if (cards[1]) later(function () { land(cards[1], 1); }, 300);
    }, 1550);

    // 3. The third, right on the heels of the second. Tap, tap, tap.
    later(function () {
      if (cards[2]) land(cards[2], 2);
      finished = true;
    }, 2350);
  }

  function clear() {
    timers.forEach(clearTimeout);
    timers = [];
  }

  function reset() {
    clear();
    finished = false;
    cards.forEach(function (c) { c.classList.remove('on', 'pop', 'is-center'); });
  }

  function settle() {
    // Everything in place at once, no motion, no sound. Used when motion
    // is unwanted or when nothing can drive the timing.
    clear();
    cards.forEach(function (c) { c.classList.add('on'); });
    finished = true;
  }

  /* ------------------------------------------------------------------ *
   * When it runs
   * The panel slides on inside the pinned strip on a desktop, and
   * scrolls on normally on a phone. An observer on the panel covers
   * both. Arriving plays the run, leaving cancels or rearms it, so a
   * half landed collage is never left behind and every visit gets the
   * performance rather than a still picture of one.
   * ------------------------------------------------------------------ */
  if (reduced.matches || !('IntersectionObserver' in window)) {
    settle();
    return;
  }

  new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting) {
      if (!finished) { reset(); run(); }
    } else {
      reset();
    }
  }, { threshold: 0.45 }).observe(box.closest('.panel') || box);
})();
