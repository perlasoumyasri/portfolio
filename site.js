/* Soumya Perla. Interaction layer.
   Three things live here: the theatre on the homepage, the reading progress
   hairline, and the drag to compare control used inside case studies.
   Everything degrades to a readable page if this file never loads. */

(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

  /* ------------------------------------------------------------------ *
   * 1. The theatre
   * ------------------------------------------------------------------ */
  function theatre() {
    var plate = document.querySelector('.plate');
    if (!plate) return;

    var vids = Array.prototype.slice.call(plate.querySelectorAll('.th-vid'));
    var isVideo = function (el) { return el && el.tagName === 'VIDEO'; };
    var btns = Array.prototype.slice.call(plate.querySelectorAll('.th-btn'));
    var cap = plate.querySelector('.th-cap');
    var capText = cap.querySelector('p');
    var capNum = cap.querySelector('.n');
    var capLink = cap.querySelector('a');
    if (!vids.length || !btns.length) return;

    var current = 0;
    var hoverTimer = null;
    var capTimer = null;
    var visible = true;

    function play(v) {
      // A moment can be a still image, and a still has nothing to play.
      if (!isVideo(v)) return;
      // play() rejects if the browser declines autoplay. The poster stays up,
      // which is a perfectly good still, so there is nothing to recover from.
      var p = v.play();
      if (p && p.catch) p.catch(function () {});
    }

    function select(i, opts) {
      if (i === current || !btns[i]) return;
      var prev = current;
      current = i;

      vids[prev].classList.remove('is-live');
      if (isVideo(vids[prev])) vids[prev].pause();
      vids[i].classList.add('is-live');
      if (!reduced.matches && visible) play(vids[i]);

      btns.forEach(function (b, n) {
        b.setAttribute('aria-selected', n === i ? 'true' : 'false');
        b.tabIndex = n === i ? 0 : -1;
        if (n !== i) b.style.setProperty('--v', 0);
      });

      // Fade the caption out, swap the words, fade it back. Changing the text
      // under a reader mid sentence is worse than a short blank.
      cap.classList.add('swapping');
      clearTimeout(capTimer);
      capTimer = setTimeout(function () {
        capText.textContent = btns[i].dataset.cap;
        capNum.textContent = '0' + (i + 1);
        capLink.href = btns[i].dataset.href;
        cap.classList.remove('swapping');
      }, 130);

      if (opts && opts.focus) btns[i].focus();
    }

    btns.forEach(function (b, i) {
      b.addEventListener('click', function () { select(i); });

      // Hovering is intent, so it selects. The short delay stops the screen
      // flickering when the pointer only crosses the rail on its way past.
      if (finePointer.matches) {
        b.addEventListener('mouseenter', function () {
          clearTimeout(hoverTimer);
          hoverTimer = setTimeout(function () { select(i); }, 90);
        });
        b.addEventListener('mouseleave', function () { clearTimeout(hoverTimer); });
      }
    });

    // Arrow keys, because this is a tablist and that is what a tablist does.
    plate.querySelector('.th-rail').addEventListener('keydown', function (e) {
      var i = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') i = (current + 1) % btns.length;
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') i = (current - 1 + btns.length) % btns.length;
      else if (e.key === 'Home') i = 0;
      else if (e.key === 'End') i = btns.length - 1;
      if (i === null) return;
      e.preventDefault();
      select(i, { focus: true });
    });

    // Fill the underline across the clip that is playing. Linear, because it
    // reports elapsed time and nothing else.
    function tick() {
      var v = vids[current];
      if (isVideo(v) && v.duration) {
        btns[current].style.setProperty('--v', (v.currentTime / v.duration).toFixed(4));
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);

    // Nothing decodes video while it is off screen.
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting;
        if (!visible) { if (isVideo(vids[current])) vids[current].pause(); }
        else if (!reduced.matches) play(vids[current]);
      }, { threshold: 0.15 }).observe(plate);
    }

    if (!reduced.matches) play(vids[0]);
  }

  /* ------------------------------------------------------------------ *
   * 2. Reading progress
   * ------------------------------------------------------------------ */
  function progress() {
    var bar = document.querySelector('.progress');
    if (!bar) return;
    var queued = false;

    function update() {
      queued = false;
      var max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.setProperty('--p', max > 0 ? Math.min(1, window.scrollY / max).toFixed(4) : 0);
    }
    window.addEventListener('scroll', function () {
      if (queued) return;
      queued = true;
      requestAnimationFrame(update);
    }, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();
  }

  /* ------------------------------------------------------------------ *
   * 3. Reveal on entry
   * The class is added here rather than in the markup, so a page with no
   * JavaScript shows everything instead of hiding it.
   * ------------------------------------------------------------------ */
  function reveal() {
    if (!('IntersectionObserver' in window)) return;
    var targets = document.querySelectorAll('.card, .shot, .dgm, .about, .quote');
    if (!targets.length) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add('in');
        io.unobserve(en.target);
      });
    }, { rootMargin: '0px 0px -12% 0px' });

    targets.forEach(function (el) {
      // Anything already on screen at load stays put. Animating the first
      // view costs the reader time and buys nothing.
      if (el.getBoundingClientRect().top < window.innerHeight) return;
      el.classList.add('rv');
      io.observe(el);
    });
  }

  /* ------------------------------------------------------------------ *
   * 4. Drag to compare
   * ------------------------------------------------------------------ */
  function compare() {
    document.querySelectorAll('.compare').forEach(function (el) {
      var dragging = false;

      function set(clientX) {
        var r = el.getBoundingClientRect();
        var pct = ((clientX - r.left) / r.width) * 100;
        el.style.setProperty('--x', Math.max(0, Math.min(100, pct)) + '%');
      }

      el.addEventListener('pointerdown', function (e) {
        dragging = true;
        el.setPointerCapture(e.pointerId);   // keep the drag alive outside the box
        set(e.clientX);
      });
      el.addEventListener('pointermove', function (e) {
        if (!dragging) return;
        e.preventDefault();
        set(e.clientX);
      });
      ['pointerup', 'pointercancel'].forEach(function (ev) {
        el.addEventListener(ev, function () { dragging = false; });
      });

      el.tabIndex = 0;
      el.addEventListener('keydown', function (e) {
        var cur = parseFloat(el.style.getPropertyValue('--x')) || 50;
        if (e.key === 'ArrowLeft') { el.style.setProperty('--x', Math.max(0, cur - 4) + '%'); e.preventDefault(); }
        if (e.key === 'ArrowRight') { el.style.setProperty('--x', Math.min(100, cur + 4) + '%'); e.preventDefault(); }
      });
    });
  }

  /* ------------------------------------------------------------------ *
   * 5. Case study video
   * A clip that argues something is interactive has to be moving while the
   * sentence next to it is being read. It plays on entry and stops on exit.
   * ------------------------------------------------------------------ */
  function inviewVideo() {
    var vids = document.querySelectorAll('video[data-inview]');
    if (!vids.length || !('IntersectionObserver' in window)) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var v = en.target;
        if (en.isIntersecting && !reduced.matches) {
          var p = v.play();
          if (p && p.catch) p.catch(function () {});
        } else {
          v.pause();
        }
      });
    }, { threshold: 0.35 });

    vids.forEach(function (v) { io.observe(v); });
  }

  /* ------------------------------------------------------------------ *
   * 6. Thumbnails that play
   * Anudeep's rule is that a thumbnail should be the crux of the project
   * rather than a picture of one screen. Hovering a card starts the work.
   * ------------------------------------------------------------------ */
  function hoverVideo() {
    if (!finePointer.matches || reduced.matches) return;

    document.querySelectorAll('video[data-hover]').forEach(function (v) {
      var card = v.closest('.card');
      if (!card) return;

      function start() {
        var p = v.play();
        if (p && p.catch) p.catch(function () {});
        v.classList.add('is-live');
      }
      function stop() {
        v.classList.remove('is-live');
        // Let the crossfade finish before rewinding, so the still does not
        // jump back to frame one while it is still visible.
        setTimeout(function () {
          if (!v.classList.contains('is-live')) { v.pause(); v.currentTime = 0; }
        }, 260);
      }

      card.addEventListener('mouseenter', start);
      card.addEventListener('mouseleave', stop);
      card.addEventListener('focusin', start);
      card.addEventListener('focusout', stop);
    });
  }


  /* ------------------------------------------------------------------ *
   * The reel. Three clips share one frame and crossfade, the rail names
   * all three at once, and the line underneath changes with the clip.
   *
   * It advances on a timer rather than on a click, because the card is
   * sliding under the cursor while the reader scrolls and a moving click
   * target is uncomfortable. Clicking still works for anyone who stops.
   * A clip whose file is missing removes itself, so the reel keeps
   * working while a video is still being recorded.
   * ------------------------------------------------------------------ */
  /* Each clip is held for its own length rather than a fixed beat, so no
     demonstration is ever cut off halfway through the action it exists to
     show. The real advance comes from the clip's own ended event; this
     hold is the bar timing and the safety fallback, bounded so one stuck
     clip can never stall the reel. */
  var REEL_MIN = 5000, REEL_MAX = 25000, REEL_PAD = 700;

  /* Drawn, not typed. A glyph like &#9654; lands at a different size and
     baseline in every font, and these three have to sit on one optical
     line inside identical circles. */
  var ICON_PAUSE = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="7.2" y="5" width="3.5" height="14" rx="1.2"/><rect x="13.3" y="5" width="3.5" height="14" rx="1.2"/></svg>';
  var ICON_PLAY  = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.8 5.3l9.6 6.2a.6.6 0 010 1l-9.6 6.2a.6.6 0 01-.9-.5V5.8a.6.6 0 01.9-.5z"/></svg>';
  var ICON_PREV  = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.6 6.3L8.9 12l5.7 5.7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var ICON_NEXT  = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9.4 6.3L15.1 12l-5.7 5.7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  var ICON_FULL  = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function clamp01(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function ease3(q) { return 1 - Math.pow(1 - q, 3); }
  function parseFig(txt) {
    var m = /^([^0-9]*)([0-9][0-9,]*(?:\.[0-9]+)?)(.*)$/.exec(txt);
    if (!m) return null;
    return { pre: m[1], post: m[3], end: parseFloat(m[2].replace(/,/g, '')), group: m[2].indexOf(',') !== -1 };
  }
  function renderFig(f, v) {
    var t = String(Math.round(v));
    if (f.group) t = t.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return f.pre + t + f.post;
  }

  /* ---- The flight ------------------------------------------------ *
   * Three frames come down a corridor and land. set(p) draws the whole
   * scene for a progress p from 0 (nothing yet) to 1 (landed), so the
   * scroll can scrub it both ways and a timer can play it. Each frame
   * has its own window inside p, oldest first, so they arrive one after
   * another; its figure counts up as it comes. The corridor, outlines
   * and dust rushing past in the site's blue warming to orange, only
   * exists while something is in flight. */
  function flight(box) {
    if (!box) return null;
    var cards = [].slice.call(box.querySelectorAll('.cr'));
    if (!cards.length) return null;
    var tun = document.createElement('div');
    tun.className = 'fly-tunnel';
    tun.setAttribute('aria-hidden', 'true');
    var RINGS = 9, DUST = 28, GAP = 380, DEPTH = 2400, rings = [], dust = [];
    var blue = [147, 180, 255], warm = [255, 154, 77];
    for (var i = 0; i < RINGS; i++) {
      var r = document.createElement('i'), t = i / (RINGS - 1);
      r.style.borderColor = 'rgba(' + blue.map(function (c, n) { return Math.round(c + (warm[n] - c) * t); }).join(',') + ',.7)';
      tun.appendChild(r); rings.push(r);
    }
    for (var d = 0; d < DUST; d++) {
      var b = document.createElement('b');
      b.__x = (Math.random() - 0.5) * 1.2; b.__y = (Math.random() - 0.5) * 2.2;
      b.__z = -Math.random() * RINGS * GAP;
      tun.appendChild(b); dust.push(b);
    }
    box.insertBefore(tun, box.firstChild);
    box.classList.add('fly-ready');
    var nums = cards.map(function (c) {
      var el = c.querySelector('.cr-n b');
      var f = el && parseFig(el.textContent.trim());
      if (!f || f.end < 10) return null;
      f.el = el; f.full = el.textContent;
      return f;
    });
    var span = RINGS * GAP;
    function set(p) {
      cards.forEach(function (c, k) {
        /* Each frame has its own stretch of the flight, a third apart, so
           one has landed before the next is close. It swings in from an
           angle and out of focus, and settles flat and sharp. */
        var q = clamp01((p - (0.04 + k * 0.24)) / 0.48), e = 1 - Math.pow(1 - q, 4), r = 1 - e;
        if (q >= 1) {
          c.style.transform = ''; c.style.opacity = ''; c.style.filter = '';
          if (!c.__landed) { c.__landed = true; c.classList.remove('landed'); void c.offsetWidth; c.classList.add('landed'); }
        } else {
          if (c.__landed) { c.__landed = false; c.classList.remove('landed'); }
          c.style.transform = 'translate3d(0,' + (r * 26).toFixed(1) + 'px,' + (-DEPTH * r).toFixed(1) + 'px) rotateX(' + (r * 16).toFixed(2) + 'deg) rotateY(' + ((1 - k) * r * 22).toFixed(2) + 'deg)';
          c.style.opacity = String(clamp01(q * 1.8));
          c.style.filter = r > 0.02 ? 'blur(' + (r * 7).toFixed(2) + 'px)' : '';
        }
        var f = nums[k];
        if (f) f.el.textContent = q >= 1 ? f.full : renderFig(f, f.end * e);
      });
      var T = clamp01(p * 6) * clamp01((1 - p) * 3.5);
      tun.style.opacity = String(T);
      if (!T) return;
      var travel = p * span * 0.8, W = box.offsetWidth, H = box.offsetHeight;
      rings.forEach(function (r, i) {
        var z = -i * GAP - 200 + travel;
        /* Far ones fade into fog, near ones fade before they fill the
           screen, so the outlines never sit across the claim. */
        var fog = clamp01(1 + z / span) * clamp01(-z / 520);
        r.style.opacity = (fog * 0.6).toFixed(3);
        r.style.transform = 'translate(-50%,-50%) translateZ(' + z.toFixed(1) + 'px) rotate(' + (i * 3 + p * 12).toFixed(2) + 'deg)';
      });
      dust.forEach(function (b) {
        var z = b.__z + travel * 1.2;
        var fog = clamp01(1 + z / span) * clamp01(-z / 120);
        b.style.opacity = fog.toFixed(3);
        b.style.transform = 'translate(' + (b.__x * W).toFixed(1) + 'px,' + (b.__y * H).toFixed(1) + 'px) translateZ(' + z.toFixed(1) + 'px)';
      });
    }
    return { set: set };
  }

  function reel(box) {
    var panel = box.closest('.panel');
    var rail = panel && panel.querySelector('.dots');
    var cap  = panel && panel.querySelector('.subt');
    if (!rail || !cap) return;

    var vids = [].slice.call(box.querySelectorAll('video'));
    var i = 0, timer = null, wasOn = false, replays = 0, paused = false;
    /* The caption and the filmstrip sit side by side (see .cap-film). */
    if (rail.parentNode) rail.parentNode.classList.add('cap-film');

    /* The clip's own last frame is the cue to move on. Reel clips do not
       carry the loop attribute, because a clip that restarts and plays a
       stray second before the swap reads as a glitch. While the reader is
       holding the reel on the caption, the clip replays once, and then
       the reel moves anyway: two full plays is reading time for any
       three-line caption, and a parked cursor must not pin the reel
       forever. */
    vids.forEach(function (v) {
      v.addEventListener('ended', function () {
        if (v !== vids[i]) return;
        /* A clip that ends while its reel is off stage, peeking in at the
           edge, must not move the reel on: that is how a visitor arrived
           to find clip two already playing, clip one spent unseen. */
        if (!onStage()) return;
        mark(v);
        if (held && replays < 1) {
          replays++;
          try { v.currentTime = 0; } catch (e) {}
          var q = v.play();
          if (q && q.catch) q.catch(function () {});
          return;
        }
        show(i + 1);
        restart();
      });
    });

    /* A missing file drops out of the reel rather than showing a black
       rectangle where a clip should be. */
    vids.forEach(function (v) {
      v.addEventListener('error', function () {
        var n = vids.indexOf(v);
        if (n < 0) return;
        vids.splice(n, 1);
        v.remove();
        build();
        show(0);
      });
    });

    function build() {
      rail.innerHTML = '';
      vids.forEach(function (v, n) {
        var b = document.createElement('button');
        b.className = 'rb' + (n === i ? ' on' : '');
        b.type = 'button';
        b.style.setProperty('--rt', barTime(v) + 'ms');
        /* The clip's own poster frame, so the strip shows what each clip
           is. The label reads its caption's first sentence aloud. */
        var still = v.getAttribute('poster');
        var line = (v.getAttribute('data-cap') || '').split('. ')[0];
        b.setAttribute('aria-label', 'Clip ' + (n + 1) + ' of ' + vids.length + (line ? ': ' + line : ''));
        b.innerHTML = (still ? '<img src="' + still + '" alt="" decoding="async">' : '') +
                      '<span class="bar"></span>';
        if (v.__seen) b.classList.add('seen');
        b.addEventListener('click', function () { show(n); restart(); });
        rail.appendChild(b);
      });
    }

    function show(n) {
      if (!vids.length) return;
      i = (n + vids.length) % vids.length;
      replays = 0;
      vids.forEach(function (v, k) {
        v.classList.toggle('is-live', k === i);
        if (k !== i && !v.paused) v.pause();
      });
      /* Start it here. The reel advances on its own timer, and the scroll
         handler is the only other thing that calls play(), so a reader
         sitting still would watch a frozen poster until they moved. */
      var live = vids[i];
      if (live && onStage() && !paused) {
        /* preload="none" means nothing has been fetched yet, and play() on
           an empty element can sit on a still frame. Ask for the data first. */
        if (live.readyState < 2) { try { live.load(); } catch (e) {} }
        /* Back to the top every time. These clips demonstrate one action
           each, and joining one halfway through explains nothing. */
        try { live.currentTime = 0; } catch (e) {}
        var q = live.play();
        if (q && q.catch) q.catch(function () {});
      }
      /* Warm the next one while this one plays, so the swap has no gap. */
      var nxt = vids[(i + 1) % vids.length];
      if (nxt && nxt !== live && nxt.preload === 'none') nxt.preload = 'auto';
      /* A static copy. rail.children is live, and replacing a node while
         walking it makes the highlight land on the wrong button. */
      var btns = [].slice.call(rail.children);
      if (btns[i]) btns[i].style.setProperty('--rt', barTime(vids[i]) + 'ms');
      btns.forEach(function (b) { b.classList.remove('on'); });
      var act = btns[i];
      if (act) {
        /* Toggling the class alone will not replay a running animation,
           so the bar is stopped, the layout is flushed, and it starts again. */
        var bar = act.querySelector('.bar');
        if (bar) { bar.style.animation = 'none'; void bar.offsetWidth; bar.style.animation = ''; }
        act.classList.add('on');
      }
      marked(cap, vids[i].getAttribute('data-cap') || '');
      /* Metadata often lands after the first show, so the bar is corrected
         once the real duration is known. */
      if (live && live.readyState < 1) {
        live.addEventListener('loadedmetadata', function () {
          var b = rail.children[i];
          if (b) b.style.setProperty('--rt', barTime(live) + 'ms');
          restart();
        }, { once: true });
      }
    }

    /* Centred enough to be worth watching. Off stage, the reel rewinds so
       it always starts on the first clip when the reader arrives. */
    function onStage() {
      var r = box.getBoundingClientRect();
      var c = r.left + r.width / 2;
      var m = r.top + r.height / 2;
      /* Across, for the pinned strip; down, for a phone, where every reel
         is centred across and only scrolling decides what is on screen. */
      return c > window.innerWidth * 0.12 && c < window.innerWidth * 0.88 &&
             m > 0 && m < window.innerHeight;
    }

    /* ---- Which clips this visitor has watched ---------------------- *
       A clip is watched when it plays to its end on stage, or when the
       visitor leaves with most of it seen. The first visit always opens
       on clip one. A return opens on the first clip not yet watched,
       counting on from where they left, so nothing is skipped and
       nothing is shown twice before the rest have been seen. Once all
       of them are watched, the reel simply carries on in order. A clip
       always starts from its beginning: half a demonstration explains
       nothing. Each watched still gets a small tick in the strip. */
    function mark(v) {
      if (v.__seen) return;
      v.__seen = true;
      var b = rail.children[vids.indexOf(v)];
      if (b) {
        b.classList.add('seen');
        b.setAttribute('aria-label', b.getAttribute('aria-label') + ', watched');
      }
    }
    function resumeAt() {
      var n = vids.length;
      for (var k = 0; k < n; k++) {
        var j = (i + k) % n;
        if (!vids[j].__seen) return j;
      }
      return (i + 1) % n;
    }

    function tick() {
      if (full) return;
      var on = onStage();
      if (!on) {
        /* Leaving keeps the place. A visitor who scrolls on during clip
           two and comes back meets clip two again, not clip one a second
           time while the rest stay unseen. */
        if (wasOn) {
          wasOn = false;
          var cur = vids[i];
          if (cur && cur.duration && cur.currentTime / cur.duration > 0.85) mark(cur);
          /* Nothing plays off stage. The strip's scroll handler would pause
             it on a desktop, but a phone has no such handler. */
          vids.forEach(function (v) { if (!v.paused) v.pause(); });
          clearPause(); show(i);
        }
        /* Off stage the reel only watches for its own entrance. A short
           poll catches the arrival within half a second, so the first
           clip gets exactly one hold. Inheriting the stale full-length
           timer here is what made clip one replay two or three times
           before the reel started advancing. */
        clearTimeout(timer);
        timer = setTimeout(tick, 400);
        return;
      }
      if (paused) return;
      if (!wasOn) { wasOn = true; show(resumeAt()); hintOnce(); }
      else { show(i + 1); }
      restart();
    }

    /* Arrivals and departures are noticed at once. The reel's own timer
       runs for a whole clip, so on its own a reel only found out it had
       been left when the clip ran out: come back quickly and the clip
       carried on from its middle, and on a phone it kept playing to an
       empty screen. A cheap check, three times a second, closes that. */
    setInterval(function () {
      if (document.hidden || full) return;
      if (onStage() !== wasOn) { clearTimeout(timer); tick(); }
    }, 300);
    /* A clip whose metadata has not arrived yet has no duration, so it
       falls back to the minimum and is corrected on the next pass. */
    /* The pill fills over the clip's true length, so it reaches full at
       the same moment the clip ends and the reel moves on. */
    function barTime(v) {
      var d = v && v.duration;
      if (!d || !isFinite(d)) return REEL_MIN;
      return Math.min(REEL_MAX, Math.round(d * 1000));
    }
    function hold(v) {
      var d = v && v.duration;
      if (!d || !isFinite(d)) return REEL_MIN;
      return Math.max(REEL_MIN, Math.min(REEL_MAX, Math.round(d * 1000) + REEL_PAD));
    }
    /* Reading beats rotation. While the pointer is over the caption the
       reel holds on the current clip, because advancing under a reader mid
       sentence is the one thing this card must never do. Only the caption:
       a cursor parked on the video means watching, and the reel must keep
       advancing on its own. The clip itself keeps looping; only the change
       is held. */
    var held = false;
    var capEl = panel.querySelector('.cap');
    if (capEl && finePointer.matches) {
      capEl.addEventListener('mouseenter', function () { held = true; clearTimeout(timer); });
      capEl.addEventListener('mouseleave', function () { held = false; restart(); });
    }
    function restart() {
      clearTimeout(timer);
      if (held || paused || full) return;
      /* A beat behind the clip's own length, so the ended event is what
         actually advances the reel and this timer only catches a clip
         that stalled or was never allowed to play. */
      timer = setTimeout(tick, hold(vids[i]) + 900);
    }

    /* Manual navigation, only where there is more than one clip. Arrows
       either side of the frame for mouse users, a sideways swipe on
       touch. Both land on the same show()+restart() path the dots use,
       so the dots and the auto-advance timer never disagree with what
       is on screen. The controls are created here, not in the HTML, so
       a dead script leaves no dead buttons. */
    /* The picture is the control. Clicking the clip stops it, clicking it
       again lets it run, which is what a person already expects a video to
       do and costs the card no furniture. A stopped clip says so with a
       small mark in the corner, never over the middle: a frozen picture
       with nothing on it reads as broken rather than held. */
    function setPaused(p) {
      paused = p;
      panel.classList.toggle('is-paused', paused);
      box.classList.toggle('is-paused', paused);
      if (typeof ringLabel === 'function') ringLabel();
      var v = vids[i];
      if (paused) {
        clearTimeout(timer);
        if (v && !v.paused) v.pause();
      } else if (v && onStage()) {
        var q = v.play();
        if (q && q.catch) q.catch(function () {});
      }
      if (!paused) restart();
    }
    /* Used when the reel leaves the stage: drop the pause without
       starting anything, because show(0) off stage must stay still. */
    function clearPause() {
      if (!paused) return;
      paused = false;
      panel.classList.remove('is-paused');
      box.classList.remove('is-paused');
      ringLabel();
    }

    var step = function (d) { show(i + d); restart(); };

    /* The ring, top right (her ask, 2026-10-05). It fills as the clip
       plays, so a visitor can see how long this clip is and how much is
       left, and its middle says what a click will do: the pause bars while
       it plays, the play triangle once stopped. It is a real button, and
       the whole picture still works as the same control. A label beside it
       says so in words: on hover with a mouse, and once, briefly, on a
       phone the first time a reel starts. It replaces the old "Paused"
       corner mark. */
    var R = 15, CIRC = 2 * Math.PI * R;
    var ring = document.createElement('button');
    ring.type = 'button';
    ring.className = 'rring';
    ring.innerHTML =
      '<svg class="rr-arc" viewBox="0 0 36 36" aria-hidden="true">' +
        '<circle class="rr-track" cx="18" cy="18" r="' + R + '"/>' +
        '<circle class="rr-fill" cx="18" cy="18" r="' + R + '" stroke-dasharray="' + CIRC.toFixed(2) + '" stroke-dashoffset="' + CIRC.toFixed(2) + '"/>' +
      '</svg>' +
      '<svg class="rr-ico rr-pause" viewBox="0 0 24 24" aria-hidden="true"><rect x="7" y="6" width="3.6" height="12" rx="1"/><rect x="13.4" y="6" width="3.6" height="12" rx="1"/></svg>' +
      ICON_PLAY.replace('<svg ', '<svg class="rr-ico rr-play" ') +
      '<span class="rr-tip"></span>';
    box.appendChild(ring);
    var fillArc = ring.querySelector('.rr-fill'), tip = ring.querySelector('.rr-tip');
    var touchUI = !finePointer.matches;
    function ringLabel() {
      var verb = touchUI ? 'Tap' : 'Click';
      tip.textContent = paused ? verb + ' to play' : verb + ' to pause';
      ring.setAttribute('aria-label', paused ? 'Play this clip' : 'Pause this clip');
    }
    ringLabel();
    ring.addEventListener('click', function (e) {
      e.stopPropagation();
      setPaused(!paused);
    });
    /* Smooth fill: read the clip's own clock every frame, but only while
       this reel is the one on stage. */
    var lastFrac = -1;
    (function tickRing() {
      requestAnimationFrame(tickRing);
      if (!wasOn) return;
      var v = vids[i];
      var f = v && v.duration ? Math.min(1, v.currentTime / v.duration) : 0;
      if (Math.abs(f - lastFrac) < 0.001) return;
      lastFrac = f;
      fillArc.setAttribute('stroke-dashoffset', (CIRC * (1 - f)).toFixed(2));
    })();
    /* On a phone, the hint shows once, the first time this reel plays. */
    var hinted = false;
    function hintOnce() {
      if (hinted || !touchUI) return;
      hinted = true;
      box.classList.add('rr-hint');
      setTimeout(function () { box.classList.remove('rr-hint'); }, 2600);
    }

    /* Full screen, for phones. These are desktop recordings, and at phone
       width the words inside them are a few pixels tall: the visitor sees
       something happening but cannot read what. Full screen, turned
       sideways, gives the clip the whole screen and makes it readable.
       While it is open the reel holds still and the clip loops, so the
       picture never swaps underneath someone who is reading it. */
    var full = false;
    var fs = document.createElement('button');
    fs.type = 'button';
    fs.className = 'rfull';
    fs.setAttribute('aria-label', 'Watch this clip full screen');
    fs.innerHTML = ICON_FULL + '<span>Full screen</span>';
    box.appendChild(fs);
    function fullOff() {
      if (!full) return;
      var v = full; full = false;
      v.__full = false; v.loop = false; v.controls = false;
      try { if (screen.orientation && screen.orientation.unlock) screen.orientation.unlock(); } catch (e) {}
      restart();
    }
    fs.addEventListener('click', function (e) {
      e.stopPropagation();
      var v = vids[i];
      if (!v) return;
      full = v; v.__full = true;
      clearTimeout(timer);
      clearPause();
      v.loop = true; v.controls = true;
      if (v.readyState < 2) { try { v.load(); } catch (er) {} }
      var q = v.play();
      if (q && q.catch) q.catch(function () {});
      if (v.requestFullscreen) {
        v.requestFullscreen().then(function () {
          if (screen.orientation && screen.orientation.lock) screen.orientation.lock('landscape').catch(function () {});
        }, fullOff);
      } else if (v.webkitEnterFullscreen) {
        /* iPhone: only the video element itself can go full screen. */
        try { v.webkitEnterFullscreen(); } catch (er) { fullOff(); }
      } else { fullOff(); }
    });
    ['fullscreenchange', 'webkitfullscreenchange'].forEach(function (ev) {
      document.addEventListener(ev, function () {
        if (!(document.fullscreenElement || document.webkitFullscreenElement)) fullOff();
      });
    });
    vids.forEach(function (v) { v.addEventListener('webkitendfullscreen', fullOff); });

    /* A swipe ends in a click too, so a sideways drag would both change
       the clip and stop it. The swipe sets this, and the click that
       follows it is spent clearing the flag rather than pausing. */
    var swiped = false;
    box.addEventListener('click', function (e) {
      if (e.target.closest('.rnav')) return;
      if (swiped) { swiped = false; return; }
      setPaused(!paused);
    });

    if (vids.length > 1) {
      /* Arrows sit on the frame, inside its edges, quiet until the
         pointer arrives. Touch screens get none of them: there the frame
         itself is swiped, and a phone has no hover to reveal them. */
      ['l', 'r'].forEach(function (side) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'rnav rnav-' + side;
        b.setAttribute('aria-label', side === 'l' ? 'Previous clip' : 'Next clip');
        b.innerHTML = side === 'l' ? ICON_PREV : ICON_NEXT;
        b.addEventListener('click', function () { step(side === 'l' ? -1 : 1); });
        box.appendChild(b);
      });
      var tx = 0, ty = 0, tt = 0;
      box.addEventListener('touchstart', function (e) {
        var t = e.changedTouches[0];
        tx = t.clientX; ty = t.clientY; tt = e.timeStamp;
      }, { passive: true });
      /* A swipe is fast, mostly horizontal, and far enough to be meant.
         Anything else is the page scrolling and is left alone. */
      box.addEventListener('touchend', function (e) {
        var t = e.changedTouches[0];
        var dx = t.clientX - tx, dy = t.clientY - ty;
        if (e.timeStamp - tt < 700 && Math.abs(dx) > 44 && Math.abs(dx) > Math.abs(dy) * 1.4) {
          swiped = true;
          step(dx < 0 ? 1 : -1);
        }
      }, { passive: true });
    }

    build();
    show(0);
    /* The first tick comes quickly rather than after a full hold, so a
       reader who scrolls in during the opening seconds is noticed at
       once. tick() itself decides between the fast off-stage poll and
       the full on-stage hold from there. */
    timer = setTimeout(tick, 400);
  }

  /* ------------------------------------------------------------------ *
   * 7. The pinned horizontal first screen
   *
   * The section is made exactly as tall as the track is wide, so one
   * pixel of scroll equals one pixel of sideways travel. Any other
   * mapping feels wrong under the hand. Touch and reduced motion get a
   * plain vertical stack instead, handled entirely in CSS.
   * ------------------------------------------------------------------ */
  function horizontal() {
    var sec   = document.getElementById('hs');
    var track = document.getElementById('track');
    if (!sec || !track) return;

    var view   = sec.querySelector('.hs-view');
    var fill   = document.getElementById('fill');
    var count  = document.getElementById('count');
    var panels = [].slice.call(track.children);
    var vids   = [].slice.call(track.querySelectorAll('video'));
    var dist = 0, top = 0, active = -1, ticking = false;

    /* The opening beat. The claim opens centred on the screen by itself,
       and after a short pause it lifts into its resting place while the
       record rises into view under it. The record is the evidence, and
       evidence reads better once the claim it supports has been read.

       It runs on a timer, not on the scroll. Tied to the scroll, the
       record only appeared for someone who scrolled, so a visitor who sat
       on the first screen never saw the experience at all. A scroll that
       comes before the timer brings it forward, so nobody waits on it. */
    var shift = 0, RISE = 72, risen = false, riseTimer = null;
    /* The opening is a sequence, one motion at a time: the claim's lines,
       the box round "Design", "builder." typed, and only then the record
       flies in. At 1800 the flight began while "builder." was still being
       typed, and the two fought for the eye (2026-10-05). */
    var RISE_AFTER = 2000;
    var sayLead = panels[0] && panels[0].querySelector('.say-lead');
    var sayCreds = panels[0] && panels[0].querySelector('.creds');
    /* "Keep scrolling" has done its job the moment the reader scrolls, and
       once the record has risen it would sit on top of it, so it leaves
       as the record arrives. */
    var sayGo = panels[0] && panels[0].querySelector('.go');

    /* The record flies in (2026-10-04, from her 3D Lab's scroll
       flythrough). The first stretch of scrolling, HOLD of a screen, does
       not move the strip: it flies the camera down a corridor and the
       three frames of the record arrive from depth, oldest first, and land
       in their slots. Scroll back up and they fly back out, as in the lab.
       A visitor who never scrolls gets the same flight on a timer, after
       which the hold is dropped so their first scroll moves the strip at
       once. Phones get it on a timer when the record comes into view. */
    var fly = reduced.matches ? null : flight(sayCreds);
    var HOLD_VH = 1.2, hold = 0, baseHold = 0;
    var flyMode = null;   /* null, 'wait', 'time', 'scroll' or 'done' */
    var flyP = 0, flyFloor = 0, flyTarget = 0, flyLoop = 0, flyLast = 0, flyV = 0;
    /* A full flight never takes less than this, however hard the
       trackpad is flicked. Tied straight to the scroll, one flick flew
       all three frames in a fraction of a second (her note, 2026-10-05:
       "appearing very fast"). The scroll now sets where the flight is
       heading and the flight follows at its own pace, easing in to the
       target like the lab's camera does. */
    var FLY_MIN = 3.6;
    function flyTo(p) {
      flyP = p;
      if (fly) fly.set(p);
      /* The claim lifts into its resting place in the first third of the
         flight, and "Keep scrolling" has done its job once it starts. */
      if (sayLead) {
        var k = ease3(clamp01(p / 0.3));
        sayLead.style.transform = 'translate3d(0,' + (shift * (1 - k)).toFixed(1) + 'px,0)';
      }
      if (sayGo) sayGo.style.opacity = String(1 - clamp01(p * 4));
    }
    /* A section link jumps straight past the opening: the flight lands
       at once and the hold is dropped, so the jump reaches the card. */
    document.addEventListener('secnav:jump', function () {
      if (!fly || flyMode === 'done') return;
      flyMode = 'done'; flyFloor = 1; flyTarget = 1; flyV = 0; flyTo(1);
      risen = true; clearTimeout(riseTimer);
      if (!off()) measure();
    });
    function chase(now) {
      flyLoop = 0;
      var dt = Math.min(0.05, (now - flyLast) / 1000);
      flyLast = now;
      var d = flyTarget - flyP;
      if (Math.abs(d) < 0.0006) {
        flyV = 0;
        flyTo(flyTarget);
        if (flyTarget >= 1 && flyMode === 'time') {
          flyMode = 'done';
          /* the hold is dropped, so the next scroll moves the strip */
          if (!off()) measure();
        }
        return;
      }
      /* Cruise at an even pace, easing out only in the last stretch, so
         the three frames land about a second apart instead of the last
         one crawling in. The velocity itself eases, so it never lurches. */
      var top = 1 / FLY_MIN;
      var want = d * 7; want = want > top ? top : want < -top ? -top : want;
      flyV += (want - flyV) * (1 - Math.exp(-dt * 9));
      var np = flyP + flyV * dt;
      if ((d > 0 && np > flyTarget) || (d < 0 && np < flyTarget)) np = flyTarget;
      flyTo(np);
      flyLoop = requestAnimationFrame(chase);
    }
    function aim(t) {
      flyTarget = t;
      if (!flyLoop) { flyLast = performance.now(); flyLoop = requestAnimationFrame(chase); }
    }

    /* Progressive disclosure. A text panel's children enter one after the
       other when the panel arrives at centre, so the reader is handed the
       parts in reading order rather than a whole screen at once. It is a
       beat, not a sequence: nobody should have to wait to read.

       The work itself is never made to wait. Media panels arrive whole.

       The hiding class lives on the section and only JS applies it, so a
       dead script can never leave the screen blank. */
    sec.classList.add('js-stagger');
    panels.forEach(function (p) {
      if (p.className.indexOf('med') !== -1) return;
      /* The claim sits inside a wrapper so the scroll can move it as one
         thing, but the entrance is still handed out line by line, so the
         wrapper is stepped through rather than counted as one child. */
      var wrap = p.querySelector('.say-lead');
      var grid = p.querySelector('.grid');
      var kids = [];
      [].forEach.call(p.children, function (el) {
        if (el === wrap || el === grid) [].push.apply(kids, [].slice.call(el.children));
        /* the portrait has its own entrance, drawn by portrait.js */
        else if (!el.classList.contains('say-face') && el.tagName !== 'CANVAS') kids.push(el);
      });
      kids.forEach(function (el, i) {
        el.classList.add('st');
        el.style.setProperty('--d', (i * 110) + 'ms');
      });
    });

    function off() {
      return window.matchMedia('(max-width: 700px)').matches || reduced.matches;
    }

    /* On the stacked layout the draw loop never runs, so nothing would
       ever tell the introduction panel it has arrived. It is told here,
       one beat after first paint, and its lines and the two record rows
       make the same staggered entrance the desktop gets. */
    if (off()) {
      setTimeout(function () { panels[0].classList.add('on'); }, 140);
    }

    /* The portrait opens the page: her name, then her face. Until the
       face has landed the claim and the record wait, and the record's
       rise is timed from the landing. Under reduced motion there is no
       opening, so nothing waits. If portrait.js never reports (no
       network for three.js, a script error), the claim comes in anyway. */
    var faceSlot = panels[0] && panels[0].querySelector('.say-face');
    var faceWait = !!faceSlot && !reduced.matches;
    if (faceSlot) document.documentElement.classList.add('js-face');
    function faceLanded() {
      if (!faceWait) return;
      faceWait = false;
      sec.classList.remove('js-face-wait');
      /* replay the claim's entrance now that it can be seen */
      panels[0].classList.remove('on');
      void panels[0].offsetWidth;
      panels[0].classList.add('on');
      if (!off() && !risen && !riseTimer) riseTimer = setTimeout(rise, RISE_AFTER);
      if (off()) phoneFly();
    }
    /* Stacked, there is no pinned scroll to scrub, so the flight plays
       once, on a timer, when most of the record is on screen. */
    function phoneFly() {
      if (!fly || !off() || flyMode) return;
      flyMode = 'wait';
      fly.set(0);
      var io = new IntersectionObserver(function (en) {
        if (!en[0].isIntersecting) return;
        io.disconnect();
        flyMode = 'time';
        aim(1);
      }, { threshold: 0.6 });
      io.observe(sayCreds);
    }
    if (faceWait) {
      sec.classList.add('js-face-wait');
      document.addEventListener('portrait:landed', faceLanded);
      setTimeout(function () {
        if (!faceWait) return;
        document.documentElement.classList.add('face-fallback');
        faceLanded();
      }, 6000);
    }

    function measure() {
      if (off()) {
        sec.style.height = ''; track.style.transform = '';
        /* Stacked, everything sits where it belongs and nothing is held
           back, so any inline state from a wider window is cleared. */
        sec.classList.remove('js-beat');
        [sayLead, sayCreds, sayGo].forEach(function (el) {
          if (el) { el.style.transition = ''; el.style.transform = ''; el.style.opacity = ''; }
        });
        if (fly && flyMode !== 'wait' && flyMode !== 'time') { if (flyMode) fly.set(1); else if (!faceWait) phoneFly(); }
        return;
      }
      /* The record's rise is driven from here, so it must not also be
         running the entrance transition. Two things animating one element
         fight, and the record arrives late or not at all. Stacked, the
         class is off and the entrance takes it back. */
      sec.classList.add('js-beat');
      /* Measured to the last card's own right edge plus its margin.
         scrollWidth leaves out a last child's trailing margin, and that
         is how the strip stopped with the final card cut off by the edge. */
      var last = track.lastElementChild;
      var end = last ? last.offsetLeft + last.offsetWidth + (parseFloat(window.getComputedStyle(last).marginRight) || 0) : 0;
      /* Only the last card's edge counts. scrollWidth also counts anything
         that pokes out of a card, such as the record's flight corridor, and
         on the home page, where the strip is one card long, that made the
         first screen slide 4,000px sideways before the page went on down. */
      dist = Math.max(0, end - view.clientWidth);
      /* How far the claim has to travel is measured, not guessed: it is
         half of what the record occupies, which is exactly the distance
         that leaves the claim optically centred while the record is out
         of sight. */
      if (sayLead && sayCreds) {
        var cs = window.getComputedStyle(sayCreds);
        shift = (sayCreds.offsetHeight + (parseFloat(cs.marginTop) || 0)) / 2;
      } else { shift = 0; }
      baseHold = Math.round(window.innerHeight * HOLD_VH);
      hold = (fly && flyMode !== 'done') ? baseHold : 0;
      sec.style.height = (window.innerHeight + dist + hold) + 'px';
      top = sec.getBoundingClientRect().top + window.scrollY;
      place(false);
      if (!risen && !riseTimer && !faceWait) riseTimer = setTimeout(rise, RISE_AFTER);
      draw();
    }

    /* Held or risen, with or without the movement. Inline styles, so they
       win over the entrance rules without a fight over specificity. */
    function place(animate) {
      var up = risen;
      var ease = 'cubic-bezier(.23, 1, .32, 1)';
      /* With the flight, the record and the claim are placed by flyTo. */
      if (fly) {
        if (sayLead) sayLead.style.transition = 'none';
        if (sayGo) sayGo.style.transition = 'none';
        if (sayCreds) { sayCreds.style.transition = 'none'; sayCreds.style.transform = ''; sayCreds.style.opacity = ''; }
        flyTo(flyP);
        return;
      }
      if (sayLead) {
        sayLead.style.transition = animate ? 'transform 900ms ' + ease : 'none';
        sayLead.style.transform = 'translate3d(0,' + (up ? 0 : shift).toFixed(1) + 'px,0)';
      }
      if (sayCreds) {
        sayCreds.style.transition = animate ? 'transform 900ms ' + ease + ', opacity 700ms ' + ease : 'none';
        sayCreds.style.transform = 'translate3d(0,' + (up ? 0 : RISE) + 'px,0)';
        sayCreds.style.opacity = up ? '1' : '0';
      }
      /* "Keep scrolling" leaves as the record arrives. Once the record has
         risen it would sit on top of the Tata Steel row. */
      if (sayGo) {
        sayGo.style.transition = animate ? 'opacity 400ms ' + ease : 'none';
        sayGo.style.opacity = up ? '0' : '1';
      }
    }
    function rise() {
      if (risen) return;
      risen = true;
      clearTimeout(riseTimer);
      if (fly) {
        /* Nobody scrolled: the flight plays by itself, and then the hold
           goes, so the next scroll moves the strip straight away. */
        if (flyMode === null) { flyMode = 'time'; aim(1); }
        return;
      }
      place(true);
    }

    function draw() {
      if (off()) return;
      var y = window.scrollY - top;
      if (fly) {
        /* A scroll takes the flight over from the timer, from wherever the
           timer had got to, so nothing jumps backwards. */
        if (y > 4 && !faceWait && (flyMode === null || flyMode === 'time')) {
          if (flyMode === 'time') flyFloor = flyP;
          flyMode = 'scroll'; risen = true; clearTimeout(riseTimer);
        }
        if (flyMode === 'scroll') {
          /* The strip waits for the last frame. Scroll that runs ahead of
             the flight lengthens the hold instead of moving the strip, and
             the section grows by the same amount below the reader, so the
             end of the strip is still reachable and nothing jumps. */
          if (flyP < 1 && y > hold) {
            if (y - baseHold < window.innerHeight * 1.5) {
              hold = y;
              sec.style.height = (window.innerHeight + dist + hold) + 'px';
            } else {
              /* A jump, not a scroll (the scrollbar, the End key): the
                 reader wants to be somewhere else, so the flight finishes
                 at once and the strip goes where they asked. */
              flyFloor = 1; flyTarget = 1; flyV = 0; flyTo(1);
            }
          }
          aim(Math.max(flyFloor, clamp01(hold ? y / hold : 1)));
        }
        y -= hold;
      } else if (!risen && y > 4) rise();
      /* Scrolling before the pause is over is an answer in itself: the
         reader is ready, so the record comes up now. */

      var s = y;
      s = s < 0 ? 0 : s > dist ? dist : s;

      track.style.transform = 'translate3d(' + (-s) + 'px,0,0)';
      if (fill) fill.style.width = ((dist ? s / dist : 0) * 100) + '%';

      var vr = view.getBoundingClientRect();
      var mid = vr.left + vr.width / 2, best = 0, bestD = Infinity;

      for (var i = 0; i < panels.length; i++) {
        var r = panels[i].getBoundingClientRect();
        var d = Math.abs((r.left + r.width / 2) - mid);
        if (d < bestD) { bestD = d; best = i; }

        /* Focus follows the middle of the view. A panel at the centre is
           fully present, one on its way out settles back. Cheap, and it
           does the job a label would otherwise have to do. */
        var raw  = d / vr.width;
        var away = raw < 0.26 ? 0 : Math.min(1, (raw - 0.26) / 0.42);
        panels[i].style.opacity   = (1 - away * 0.85).toFixed(3);
        panels[i].style.transform = 'translate3d(0,' + (away * 16).toFixed(1) + 'px,0) scale(' + (1 - away * 0.035).toFixed(4) + ')';

        /* A text panel fully off stage rewinds, so its entrance performs
           again on every arrival, in either direction. */
        if (panels[i].className.indexOf('med') === -1 &&
            (r.right < vr.left - 24 || r.left > vr.right + 24)) {
          panels[i].classList.remove('on');
        }
      }

      if (best !== active) {
        active = best;
        panels[best].classList.add('on');
        if (count) count.textContent = ('0' + (best + 1)).slice(-2) + ' / 0' + panels.length;
      }

      /* Only the visible clip plays, so several videos never decode at once. */
      vids.forEach(function (v) {
        /* Inside the reel, only the clip on screen is allowed to run.
           Three stacked videos decoding at once is three times the work
           for one visible frame. */
        /* A clip whose file was missing has already removed itself from
           the document, and this list was captured before that happened. */
        if (!v.parentNode || v.__full) return;
        if (v.parentNode.classList.contains('reel')) {
          /* Only the clip on screen runs, and a reel the reader has
             paused stays paused however the page is scrolled. */
          var rp = v.closest('.panel');
          if (!v.classList.contains('is-live') || (rp && rp.classList.contains('is-paused'))) {
            if (!v.paused) v.pause();
            return;
          }
        }
        var r = v.getBoundingClientRect();
        var seen = r.right > vr.left - 100 && r.left < vr.right + 100;
        /* A reel peeking in at the edge shows its still and waits. It plays
           only once it is properly on stage, so its first clip is never
           used up before the visitor has arrived. */
        if (v.parentNode.classList.contains('reel')) {
          var rc = r.left + r.width / 2;
          seen = rc > vr.left + vr.width * 0.12 && rc < vr.right - vr.width * 0.12;
        }
        if (seen && v.paused) { var q = v.play(); if (q && q.catch) q.catch(function () {}); }
        else if (!seen && !v.paused) { v.pause(); }
      });
    }

    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () { draw(); ticking = false; });
    }, { passive: true });

    window.addEventListener('resize', measure, { passive: true });
    window.addEventListener('load', measure);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
    measure();
  }

  /* ------------------------------------------------------------------ *
   * Contact pills copy on click. The toast confirms it and offers the
   * matching next step, so the number is never a dead tap.
   * ------------------------------------------------------------------ */
  function copyPills() {
    var t = null;
    function toast(msg, actLabel, actHref) {
      if (t) t.remove();
      t = document.createElement('div');
      t.className = 'toast';
      /* Announced, not just shown. Someone using a screen reader gets no
         confirmation at all from a pill that silently appears. */
      t.setAttribute('role', 'status');
      t.setAttribute('aria-live', 'polite');
      t.innerHTML = '<span>' + msg + '</span>' +
        (actLabel ? '<a href="' + actHref + '" target="_blank" rel="noopener">' + actLabel + '</a>' : '');
      document.body.appendChild(t);
      requestAnimationFrame(function () { t.classList.add('in'); });
      /* A confirmation on its own can go quickly. One carrying something
         to press has to outlast the time it takes to notice it, read it
         and move the pointer to it. */
      setTimeout(function () {
        if (t) { t.classList.remove('in'); setTimeout(function () { if (t) { t.remove(); t = null; } }, 300); }
      }, actLabel ? 6000 : 3000);
    }
    [].forEach.call(document.querySelectorAll('[data-copy]'), function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        var v = el.getAttribute('data-copy');
        var done = function () {
          var act = el.getAttribute('data-action');
          if (act === 'wa') toast('Copied', 'Open WhatsApp ↗', 'https://wa.me/918074889819');
          else if (act === 'mail') toast('Copied', 'Write an email ↗', 'mailto:perlasoumyasri@gmail.com');
          else toast('Copied');
        };
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(v).then(done, done);
        else done();
      });
    });
  }

  /* ------------------------------------------------------------------ *
   * The figures count up
   *
   * These numbers are the whole argument of the page: they are what the
   * client got. So when a figure card arrives, each number runs up to
   * itself instead of being sitting there already.
   *
   * The final value is always in the HTML and is never cleared, so a
   * browser that refuses the animation, a phone, or a reader who asked
   * for less motion all see the real number with nothing missing. The
   * count resets when the card leaves, so scrolling back plays it again,
   * which is what happens on a call when she scrolls up to make a point.
   * ------------------------------------------------------------------ */
  function figures() {
    var cards = document.querySelectorAll('.panel.nums');
    if (!cards.length || !window.MutationObserver) return;

    function parse(txt) {
      var m = /^([^0-9]*)([0-9][0-9,]*(?:\.[0-9]+)?)(.*)$/.exec(txt);
      if (!m) return null;
      var raw = m[2];
      var dot = raw.indexOf('.');
      return {
        pre: m[1], post: m[3],
        end: parseFloat(raw.replace(/,/g, '')),
        dp: dot === -1 ? 0 : raw.length - dot - 1,
        group: raw.indexOf(',') !== -1
      };
    }

    function render(f, v) {
      var t = f.dp ? v.toFixed(f.dp) : String(Math.round(v));
      if (f.group) {
        var bits = t.split('.');
        bits[0] = bits[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        t = bits.join('.');
      }
      return f.pre + t + f.post;
    }

    [].forEach.call(cards, function (card) {
      var nums = [].slice.call(card.querySelectorAll('.n b'));
      var plan = nums.map(function (el) {
        var f = parse(el.textContent.trim());
        /* A single digit has nothing to count through: a 1 that sits at 0
           and then flips reads as a glitch, not as a count. */
        if (f && f.end < 10) return null;
        if (f) f.el = el, f.full = el.textContent;
        return f;
      }).filter(Boolean);
      if (!plan.length) return;

      var raf = null, running = false;

      function stop() {
        if (raf) cancelAnimationFrame(raf), raf = null;
        running = false;
        plan.forEach(function (f) { f.el.textContent = f.full; f.el.style.removeProperty('--p'); });
      }

      function run() {
        if (running || reduced.matches) return;
        running = true;
        /* The tiles themselves arrive on a stagger, so each number waits
           for its own tile before it starts moving. */
        var DUR = 1000, LAG = 110;
        var t0 = performance.now();
        (function frame(now) {
          var live = false;
          plan.forEach(function (f, i) {
            var t = (now - t0 - i * LAG) / DUR;
            if (t < 0) { f.el.textContent = render(f, 0); f.el.style.setProperty('--p', 0); live = true; return; }
            if (t >= 1) { f.el.textContent = f.full; f.el.style.removeProperty('--p'); return; }
            live = true;
            var e = 1 - Math.pow(1 - t, 3);   /* ease out, lands softly */
            f.el.textContent = render(f, f.end * e);
            /* The stroke under the figure fills with the count. */
            f.el.style.setProperty('--p', e.toFixed(3));
          });
          raf = live ? requestAnimationFrame(frame) : null;
          if (!live) running = false;
        })(t0);
      }

      function here() { return card.classList.contains('on') || card.classList.contains('seen'); }
      new MutationObserver(function () {
        if (here()) run();
        else stop();
      }).observe(card, { attributes: true, attributeFilter: ['class'] });

      if (here()) run();
    });
  }

  /* ------------------------------------------------------------------ *
   * The marker
   *
   * Every number that says what the client gained is marked in orange,
   * and on a desktop the mark is drawn by a pen that travels through the
   * line in reading order. The drawing itself is CSS; this finds the
   * numbers and numbers the marks, so each one knows its turn.
   *
   * A number here is a figure with its unit if it has one: "300+
   * students", "20%", "3 cohorts". Two figures joined by "to" are one
   * mark, so "20% to 80%" is drawn as a single stroke, the way a person
   * would underline it.
   * ------------------------------------------------------------------ */
  var FIG = /\d[\d,.]*[+%]?(?:\s(?:students|cohorts|leads|people|hours?|days?|weeks?|months?))?(?:\sto\s\d[\d,.]*[+%]?)?/g;

  function esc(t) {
    return t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function marked(el, text) {
    var n = 0;
    el.innerHTML = esc(text).replace(FIG, function (m) {
      /* A figure that ends a sentence brings its full stop along in the
         match; the stop belongs to the sentence, not to the mark. */
      var tail = '';
      if (/[.,]$/.test(m)) { tail = m.slice(-1); m = m.slice(0, -1); }
      return '<mark class="mk" style="--i:' + (n++) + '">' + m + '</mark>' + tail;
    });
  }

  function marks() {
    /* Lines written into the page get the same treatment as the captions. */
    [].forEach.call(document.querySelectorAll('.reel-claim'), function (el) {
      marked(el, el.textContent);
    });
    [].forEach.call(document.querySelectorAll('.st-sub'), function (el) {
      [].forEach.call(el.querySelectorAll('.mk'), function (m, k) {
        m.style.setProperty('--i', k);
      });
    });
    /* The pen draws wherever motion is allowed: on the pinned strip a card
       arrives when it reaches the centre (.on), on a phone when it scrolls
       into view (.seen). Under reduced motion the marks are simply there. */
    var mq = window.matchMedia('(prefers-reduced-motion: no-preference)');
    function sync() { document.documentElement.classList.toggle('mk-arm', mq.matches); }
    sync();
    if (mq.addEventListener) mq.addEventListener('change', sync);
    else if (mq.addListener) mq.addListener(sync);
  }

  /* ------------------------------------------------------------------ *
   * Arriving, on a phone
   *
   * On a phone the strip is a plain stack that scrolls the ordinary way,
   * so no card ever reaches "the centre" and nothing gets .on. This gives
   * the phone its own arrival: a card is .seen once a third of it is on
   * screen, and loses it when it has fully left, so scrolling back plays
   * it again. The marker, the count and the chip all listen for it.
   * Scrolling itself is never touched.
   * ------------------------------------------------------------------ */
  function arrivals() {
    if (!('IntersectionObserver' in window)) return;
    var mq = window.matchMedia('(max-width: 700px) and (prefers-reduced-motion: no-preference)');
    var panels = [].slice.call(document.querySelectorAll('#track > .panel'));
    var io = null;
    function sync() {
      if (io) { io.disconnect(); io = null; }
      panels.forEach(function (p) { p.classList.remove('seen'); });
      if (!mq.matches) return;
      io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.intersectionRatio >= 0.34) e.target.classList.add('seen');
          else if (!e.isIntersecting) e.target.classList.remove('seen');
        });
      }, { threshold: [0, 0.34] });
      panels.forEach(function (p) { io.observe(p); });
    }
    sync();
    if (mq.addEventListener) mq.addEventListener('change', sync);
    else if (mq.addListener) mq.addListener(sync);
  }

  function reels() { [].forEach.call(document.querySelectorAll('.reel'), reel); }

  /* "builder." types itself the first time the claim is seen (her ask,
     2026-10-05): the caret waits on the empty line, holds steady while
     the letters arrive at a human, slightly uneven pace, then goes back
     to blinking. It starts once her face has landed and the selection
     box around "Design" has drawn, so the two halves of the headline
     happen one after the other: designed, then built. The heading keeps
     its full name for screen readers throughout. */
  function typeBuilder() {
    var el = document.querySelector('.db-build');
    if (!el || reduced.matches) return;
    var h = el.closest('h2'), panel = el.closest('.panel'), sec = el.closest('.hs');
    var caret = h.querySelector('.db-caret');
    var full = el.textContent;
    h.setAttribute('aria-label', 'Design builder.');
    el.textContent = '';
    var queued = false;
    function type() {
      if (caret) caret.classList.add('typing');
      var n = 0;
      (function step() {
        n++;
        el.textContent = full.slice(0, n);
        /* An even, confident cadence: 62ms a key with a little human
           variance, and a beat before the full stop. Random 70 to 150ms
           read as hesitant rather than typed. */
        var next = full.charAt(n) === '.' ? 150 : 56 + Math.random() * 14;
        if (n < full.length) setTimeout(step, next);
        else setTimeout(function () { if (caret) caret.classList.remove('typing'); }, 500);
      })();
    }
    function check() {
      if (queued) return;
      if (!panel.classList.contains('on') || (sec && sec.classList.contains('js-face-wait'))) return;
      queued = true;
      /* after the box has drawn and its handles have landed */
      setTimeout(type, 1100);
    }
    var mo = new MutationObserver(check);
    mo.observe(panel, { attributes: true, attributeFilter: ['class'] });
    if (sec) mo.observe(sec, { attributes: true, attributeFilter: ['class'] });
    check();
    /* never leave the word missing, whatever happens to the opening */
    setTimeout(function () { if (!queued) { queued = true; type(); } }, 9000);
  }

  /* Design work: any piece opens full size, reusing the WhatsApp
     card's viewer (reactions.js makes .reax-zoom). Esc, a tap or the
     close button shuts it. */
  function designWork() {
    var pieces = document.querySelectorAll('.dw-piece');
    if (!pieces.length) return;
    /* The viewer came from the WhatsApp collage, which now lives on
       lms.html, so the home page had none and a tap on a poster did
       nothing (2026-10-06). It makes its own when the page has none. */
    if (!document.querySelector('.reax-zoom')) {
      var nz = document.createElement('div'), back = null;
      nz.className = 'reax-zoom no-hint';
      nz.setAttribute('role', 'dialog'); nz.setAttribute('aria-modal', 'true');
      nz.setAttribute('aria-label', 'Design, full size');
      nz.hidden = true;
      nz.innerHTML = '<img alt=""><button type="button" class="reax-zoom-x" aria-label="Close">&times;</button>';
      document.body.appendChild(nz);
      var shut = function () {
        if (nz.hidden) return;
        nz.classList.remove('on'); nz.hidden = true;
        if (back) back.focus({ preventScroll: true });
      };
      nz.addEventListener('click', shut);
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape') shut(); });
      [].forEach.call(pieces, function (b) { b.addEventListener('click', function () { back = b; }); });
    }
    [].forEach.call(pieces, function (b) {
      b.addEventListener('click', function () {
        var z = document.querySelector('.reax-zoom');
        var im = b.querySelector('img');
        if (!z || !im) return;
        var zi = z.querySelector('img');
        zi.src = im.currentSrc || im.src; zi.alt = im.alt;
        z.classList.add('no-hint');
        z.hidden = false;
        requestAnimationFrame(function () { z.classList.add('on'); });
        var x = z.querySelector('.reax-zoom-x'); if (x) x.focus({ preventScroll: true });
      });
    });
  }

  /* Section links. A plain anchor cannot reach a card inside the pinned
     strip, because the strip moves sideways while the page scrolls down,
     so on a laptop the jump is worked out from where that card sits in
     the strip. On a phone the page is a normal column and the browser's
     own scroll does it. The phone bar shows after the first screen and
     marks the section in view. */
  function sections() {
    var links = document.querySelectorAll('.secnav a, .secbar a');
    if (!links.length) return;
    var sec = document.getElementById('hs');
    var smooth = reduced.matches ? 'auto' : 'smooth';
    function stacked() { return window.matchMedia('(max-width: 700px)').matches || reduced.matches; }
    [].forEach.call(links, function (a) {
      a.addEventListener('click', function (e) {
        var href = a.getAttribute('href');
        if (href.charAt(0) !== '#') return;   /* a link to another page */
        var id = href.slice(1), el = document.getElementById(id);
        if (!el) return;
        e.preventDefault();
        document.dispatchEvent(new Event('secnav:jump'));
        var y;
        if (!stacked() && sec && sec.contains(el)) {
          var track = document.getElementById('track'), view = sec.querySelector('.hs-view');
          var x = el.offsetLeft + el.offsetWidth / 2 - view.clientWidth / 2;
          /* the strip starts after the first screen's hold */
          var last = track.lastElementChild;
          var end = last.offsetLeft + last.offsetWidth + (parseFloat(window.getComputedStyle(last).marginRight) || 0);
          var hold = sec.offsetHeight - window.innerHeight - Math.max(0, end - view.clientWidth);
          y = sec.offsetTop + Math.max(0, hold) + Math.max(0, x);
        } else {
          y = el.getBoundingClientRect().top + window.scrollY - 12;
        }
        window.scrollTo({ top: y, behavior: smooth });
      });
    });
    var bar = document.querySelector('.secbar');
    if (!bar || !('IntersectionObserver' in window)) return;
    var first = document.querySelector('.panel.say');
    if (first) new IntersectionObserver(function (en) {
      bar.classList.toggle('show', !en[0].isIntersecting);
    }, { threshold: 0.05 }).observe(first);
    var map = {};
    [].forEach.call(bar.querySelectorAll('a'), function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var watch = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (!en.isIntersecting) return;
        var id = en.target.id;
        /* every client work card counts as Projects */
        if (!map[id]) id = 'projects';
        [].forEach.call(bar.querySelectorAll('a'), function (a) { a.classList.toggle('on', map[id] === a); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['projects', 'personal', 'design-work'].forEach(function (id) { var el = document.getElementById(id); if (el) watch.observe(el); });
    [].forEach.call(document.querySelectorAll('#track > .panel:not(.say)'), function (p) { watch.observe(p); });
  }

  /* The personal project's demo plays silently in view. "Watch with
     sound" starts it from the beginning with sound, once; after that the
     player's own controls take over. Turning the sound on from those
     controls retires the button too. */
  function demoSound() {
    var btn = document.querySelector('.pux-sound');
    var v = btn && btn.parentNode.querySelector('video');
    if (!v) return;
    btn.addEventListener('click', function () {
      v.muted = false; v.loop = false;
      try { v.currentTime = 0; } catch (e) {}
      var q = v.play(); if (q && q.catch) q.catch(function () {});
      btn.hidden = true;
    });
    v.addEventListener('volumechange', function () { if (!v.muted) { btn.hidden = true; v.loop = false; } });
  }


  /* Cards on the visual design page move like objects: they sway on their
     own (CSS), lean toward the cursor with a glare, and give a turn when
     tapped, so a phone gets a response too (her ask, 2026-10-06). */
  function cards3d() {
    var cards = document.querySelectorAll('.c3d');
    if (!cards.length || reduced.matches) return;
    var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    [].forEach.call(cards, function (c) {
      if (fine) {
        c.addEventListener('pointermove', function (e) {
          var r = c.getBoundingClientRect();
          var x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
          c.style.setProperty('--ry', ((x - .5) * 26).toFixed(1) + 'deg');
          c.style.setProperty('--rx', ((.5 - y) * 20).toFixed(1) + 'deg');
          c.style.setProperty('--gx', (x * 100).toFixed(0) + '%');
          c.style.setProperty('--gy', (y * 100).toFixed(0) + '%');
          c.classList.add('tilt');
        });
        c.addEventListener('pointerleave', function () { c.classList.remove('tilt'); });
      }
      c.addEventListener('click', function () {
        c.classList.remove('tilt', 'turn'); void c.offsetWidth; c.classList.add('turn');
      });
      c.addEventListener('animationend', function (e) { if (e.animationName === 'c3d-turn') c.classList.remove('turn'); });
    });
  }

  /* Live pieces on the visual design page: the real drill and card pages
     run inside a frame, drawn at their own size and scaled to fit (or
     cropped to one part). On a touch screen a page frame waits for a
     tap, so a swipe past it still scrolls the page. A frame marked
     data-replay plays its entrance again when it comes into view or when
     Replay is pressed: a fresh copy loads underneath and fades in over the
     old one, so the screen never goes blank. */
  function liveFrames() {
    var boxes = document.querySelectorAll('.livef');
    if (!boxes.length) return;
    var touch = !window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    [].forEach.call(boxes, function (box) {
      var f = box.querySelector('iframe');
      var W = +box.dataset.w, H = +box.dataset.h;
      var c = (box.dataset.crop || ('0,0,' + W + ',' + H)).split(',').map(Number);
      var still = box.classList.contains('livef-foil');
      box.style.aspectRatio = c[2] + ' / ' + c[3];
      function size(fr) {
        fr.style.width = W + 'px'; fr.style.height = H + 'px';
        fr.style.transform = 'scale(' + (box.clientWidth / c[2]) + ') translate(' + (-c[0]) + 'px,' + (-c[1]) + 'px)';
      }
      function fit() { [].forEach.call(box.querySelectorAll('iframe'), size); }
      fit();
      if ('ResizeObserver' in window) new ResizeObserver(fit).observe(box); else window.addEventListener('resize', fit);
      function prep(fr) {
        fr.addEventListener('load', function () {
          var d; try { d = fr.contentDocument; } catch (e) { return; }
          if (!d) return;
          fr.dataset.loaded = '1';
          var st = d.createElement('style');
          st.textContent = 'html,body{overflow:hidden!important}' + (still ? 'button{pointer-events:none!important}' : '');
          (d.head || d.documentElement).appendChild(st);
        });
      }
      prep(f);
      /* a live piece off screen stops drawing: its frame is taken out of
         rendering until it is near the view again, so only what is on
         screen ever costs anything */
      if ('IntersectionObserver' in window) new IntersectionObserver(function (en) {
        box.classList.toggle('is-off', !en[0].isIntersecting);
      }, { rootMargin: '300px 0px' }).observe(box);
      if (box.hasAttribute('data-direct')) box.classList.add('is-on');
      else if (touch) {
        f.style.pointerEvents = 'none';
        var b = document.createElement('button');
        b.type = 'button'; b.className = 'livef-play'; b.textContent = 'Tap to play';
        b.addEventListener('click', function () { box.classList.add('is-on'); f.style.pointerEvents = ''; });
        box.appendChild(b);
      } else box.classList.add('is-on');
      if (box.hasAttribute('data-replay')) {
        var src = f.getAttribute('src') || f.getAttribute('data-src'), busy = false;
        var replay = function () {
          if (busy) return;
          if (!f.getAttribute('src')) { f.src = src; return; }   /* first time: just load it, in view */
          if (!f.dataset.loaded) return;
          busy = true;
          var old = f, nf = document.createElement('iframe');
          nf.title = old.title; nf.tabIndex = -1;
          nf.style.opacity = '0'; nf.style.transition = 'opacity 280ms ease';
          size(nf); prep(nf);
          nf.addEventListener('load', function () {
            setTimeout(function () {
              nf.style.opacity = '1'; f = nf;
              setTimeout(function () { old.remove(); busy = false; }, 320);
            }, 300);
          }, { once: true });
          nf.src = src;
          box.appendChild(nf);
        };
        /* a card that celebrates plays when it is actually seen: it loads
           only once half of it is on screen, and plays again each time the
           visitor comes back to it */
        if (box.hasAttribute('data-onview') && 'IntersectionObserver' in window) {
          var seen = false;
          new IntersectionObserver(function (en) {
            if (en[0].isIntersecting && !seen) replay();
            seen = en[0].isIntersecting;
          }, { threshold: .5 }).observe(box);
        }
        var it = box.closest('.vw-item'), rb = it && it.querySelector('.replay');
        if (rb) rb.addEventListener('click', replay);
      }
    });
  }

  /* The Third Eye scan on the visual design page: the line sweeps across
     the chair, photo to blueprint and back, and stops for good the moment
     someone drags it. */
  function scanner() {
    var el = document.querySelector('.scan');
    if (!el) return;
    var p = 0, dir = 1, held = false, last = 0, visible = true, pause = 0;
    function set(v) {
      p = Math.max(0, Math.min(100, v));
      el.style.setProperty('--p', p + '%');
      var st = el.closest('.glow') || el;
      st.classList.toggle('is-user', p < 45);
      st.classList.toggle('is-designer', p > 55);
    }
    set(0);
    if ('IntersectionObserver' in window) new IntersectionObserver(function (en) { visible = en[0].isIntersecting; }).observe(el);
    function tick(t) {
      if (held) return;
      requestAnimationFrame(tick);
      var dt = last ? Math.min((t - last) / 1000, .05) : 0; last = t;
      if (!visible) return;
      if (pause > 0) { pause -= dt; return; }
      set(p + dir * dt * 38);
      if (p <= 0 || p >= 100) { dir = -dir; pause = 1.6; }
    }
    requestAnimationFrame(tick);
    function at(e) { var r = el.getBoundingClientRect(); set((e.clientX - r.left) / r.width * 100); }
    var resume;
    el.addEventListener('pointerdown', function (e) { held = true; clearTimeout(resume); el.setPointerCapture(e.pointerId); at(e); });
    el.addEventListener('pointermove', function (e) { if (held && e.buttons) at(e); });
    el.addEventListener('pointerup', function () {
      clearTimeout(resume);
      resume = setTimeout(function () { held = false; last = 0; dir = p > 50 ? -1 : 1; requestAnimationFrame(tick); }, 2500);
    });
  }

  /* A card from the quiz's last page, opened up close: the real card,
     live, large enough to read and tilt. */
  function cardViewer() {
    if (!document.querySelector('.livef-row')) return;
    var z = document.createElement('div');
    z.className = 'pk-zoom'; z.hidden = true;
    z.setAttribute('role', 'dialog'); z.setAttribute('aria-modal', 'true'); z.setAttribute('aria-label', 'Card, up close');
    z.innerHTML = '<div class="pk-zoom-box"><iframe title="Card, up close"></iframe></div><button type="button" class="reax-zoom-x" aria-label="Close">&times;</button>';
    document.body.appendChild(z);
    var f = z.querySelector('iframe'), boxEl = z.querySelector('.pk-zoom-box');
    function fit() {
      var s = Math.min((window.innerHeight - 40) / 780, (window.innerWidth - 32) / 456);
      boxEl.style.width = (456 * s) + 'px'; boxEl.style.height = (780 * s) + 'px';
      f.style.transform = 'scale(' + s + ') translate(-72px,-60px)';
    }
    function close() { z.hidden = true; z.classList.remove('on'); f.src = 'about:blank'; }
    window.addEventListener('message', function (e) {
      if (e.data && e.data.pkClose) { if (!z.hidden) close(); return; }
      if (!e.data || !e.data.pkOpen) return;
      f.src = 'assets/live/pk-card/?type=' + e.data.pkOpen;
      fit(); z.hidden = false; requestAnimationFrame(function () { z.classList.add('on'); });
      /* the click left focus inside the card's frame, where Escape would
         never reach this page: take it back */
      if (document.activeElement && document.activeElement.tagName === 'IFRAME') document.activeElement.blur();
      setTimeout(function () { z.querySelector('.reax-zoom-x').focus({ preventScroll: true }); }, 0);
    });
    z.addEventListener('click', function (e) { if (!boxEl.contains(e.target)) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !z.hidden) close(); });
    window.addEventListener('resize', function () { if (!z.hidden) fit(); });
  }
  function init() {
    marks(); theatre(); reels(); horizontal(); typeBuilder();
    /* The opening state is set, so the panel can be shown. Same task as
       the setup above, so no frame is ever painted in between. */
    document.documentElement.classList.remove('js-early');
    copyPills(); progress(); reveal(); compare(); inviewVideo(); hoverVideo(); figures(); arrivals(); designWork(); sections(); demoSound(); cards3d(); liveFrames(); scanner(); cardViewer();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
