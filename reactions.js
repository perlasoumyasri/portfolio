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

  /* Before the first message lands the frame used to be an empty navy
     box, which on a slow phone looked broken. Now it shows the founder
     typing, the three dots WhatsApp shows, so the wait is the start of
     the scene rather than a gap in it. Made here, so a dead script leaves
     no bubble behind (the cards then simply show, see style.css). */
  var stage = box.querySelector('.reax-stage');
  var typing = document.createElement('div');
  typing.className = 'reax-typing';
  typing.setAttribute('aria-hidden', 'true');
  typing.innerHTML = '<span class="who">UX Anudeep</span><span class="tdots"><i></i><i></i><i></i></span>';
  (stage || box).appendChild(typing);
  function waiting(on) { box.classList.toggle('is-waiting', on); }
  waiting(true);

  /* ------------------------------------------------------------------ *
   * The drop
   * A water drop, at her call: the little plip a droplet makes falling
   * into a glass. What defines that sound is a pitch that swoops
   * upward as the sound dies away, which is the bubble under the
   * surface shrinking. One sine, gliding up more than an octave in a
   * tenth of a second, gone in under a fifth. Each landing is a
   * slightly smaller drop than the last, so the three read as drip,
   * drip, drip rather than the same drop three times.
   *
   * The browser will not let any audio start until the visitor has
   * clicked, tapped or typed somewhere at least once, and scrolling does
   * not count. At first it was armed only by a click somewhere else on
   * the page, so a visitor who only scrolled, which is most of them,
   * never heard a drop, and neither did Soumya. So the card now carries
   * its own small sound button: pressing it is the permission the
   * browser needs, and it replays the three messages with their drops.
   * The same button mutes them afterwards.
   * ------------------------------------------------------------------ */
  var Ctx = window.AudioContext || window.webkitAudioContext;
  var ac = null;
  var muted = false;
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
    if (muted || !ac || ac.state !== 'running') return;
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
    g.gain.exponentialRampToValueAtTime(0.16, t + 0.006);
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
    waiting(false);
    card.classList.add('on', 'pop');
    pop(step);
  }

  /* On a slow connection the screenshots can still be on their way when
     the panel arrives, and a card that pops in before its picture is an
     empty frame. So the founder keeps typing until all three are here. */
  var imgs = cards.map(function (c) { return c.querySelector('img'); }).filter(Boolean);
  var inView = false;
  function ready() { return imgs.every(function (im) { return im.complete && im.naturalWidth > 0; }); }
  imgs.forEach(function (im) {
    im.addEventListener('load', function () { if (inView && !finished && ready()) run(); });
  });

  function run() {
    clear();
    finished = false;
    if (!ready()) { waiting(true); return; }

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
    waiting(true);
  }

  function settle() {
    // Everything in place at once, no motion, no sound. Used when motion
    // is unwanted or when nothing can drive the timing.
    clear();
    waiting(false);
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
  /* ------------------------------------------------------------------ *
   * Full size
   * However big the collage makes them, these are screenshots of type,
   * and on a phone the words stay small. Any landed message opens full
   * size on a tap or click, and closes on another, on Escape, or with
   * the close button. Turned sideways, a phone shows it wide enough to
   * read every line.
   * ------------------------------------------------------------------ */
  var zoom = document.createElement('div');
  zoom.className = 'reax-zoom';
  zoom.setAttribute('role', 'dialog');
  zoom.setAttribute('aria-modal', 'true');
  zoom.setAttribute('aria-label', 'Message from the founder, full size');
  zoom.hidden = true;
  zoom.innerHTML = '<img alt=""><p class="reax-zoom-hint">Turn your phone sideways to read it larger</p>' +
                   '<button type="button" class="reax-zoom-x" aria-label="Close">&times;</button>';
  document.body.appendChild(zoom);
  var zImg = zoom.querySelector('img'), back = null;
  function openZoom(card) {
    var im = card.querySelector('img');
    if (!im) return;
    back = card;
    zImg.src = im.currentSrc || im.src;
    zImg.alt = im.alt;
    zoom.hidden = false;
    requestAnimationFrame(function () { zoom.classList.add('on'); });
    zoom.querySelector('.reax-zoom-x').focus({ preventScroll: true });
  }
  function closeZoom() {
    if (zoom.hidden) return;
    zoom.classList.remove('on');
    zoom.hidden = true;
    if (back) back.focus({ preventScroll: true });
  }
  zoom.addEventListener('click', closeZoom);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeZoom(); });
  cards.forEach(function (c) {
    c.setAttribute('tabindex', '0');
    c.setAttribute('role', 'button');
    c.setAttribute('aria-label', 'Open this message full size');
    c.addEventListener('click', function () { if (c.classList.contains('on')) openZoom(c); });
    c.addEventListener('keydown', function (e) {
      if ((e.key === 'Enter' || e.key === ' ') && c.classList.contains('on')) { e.preventDefault(); openZoom(c); }
    });
  });

  if (reduced.matches || !('IntersectionObserver' in window)) {
    settle();
    return;
  }

  var ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z"/>' +
             '<path class="w" d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12"/></svg>';
  var btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'reax-sound';
  /* The first press always means "play it with sound", even if a click
     elsewhere already armed the audio: that click happens first, on
     pointerdown, so judging by the audio state alone would turn the very
     first press into a mute. After the first press it is a toggle. */
  var heard = false;
  function label() {
    var txt = !heard ? 'Play with sound' : muted ? 'Sound off' : 'Sound on';
    btn.innerHTML = ICON + '<span>' + txt + '</span>';
    btn.classList.toggle('is-off', heard && muted);
    btn.setAttribute('aria-pressed', heard && !muted ? 'true' : 'false');
  }
  btn.addEventListener('click', function () {
    arm();
    if (!heard || muted) {
      heard = true; muted = false;
      /* Resuming can take a moment, so the replay waits for it. */
      var go = function () { label(); reset(); run(); };
      if (ac && ac.state !== 'running' && ac.resume) ac.resume().then(go, go);
      else go();
    } else {
      muted = true;
      label();
    }
  });
  label();
  box.appendChild(btn);

  new IntersectionObserver(function (entries) {
    inView = entries[0].isIntersecting;
    if (inView) {
      if (!finished) { reset(); run(); }
    } else {
      reset();
    }
  }, { threshold: 0.45 }).observe(box.closest('.panel') || box);
})();
