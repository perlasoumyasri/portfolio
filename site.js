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

  function reel(box) {
    var panel = box.closest('.panel');
    var rail = panel && panel.querySelector('.dots');
    var cap  = panel && panel.querySelector('.subt');
    if (!rail || !cap) return;

    var vids = [].slice.call(box.querySelectorAll('video'));
    var i = 0, timer = null, wasOn = false, replays = 0, paused = false;

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
        b.setAttribute('aria-label', 'Clip ' + (n + 1) + ' of ' + vids.length);
        b.innerHTML = '<span class="bar"></span>';
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
      cap.textContent = vids[i].getAttribute('data-cap') || '';
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
      return c > window.innerWidth * 0.12 && c < window.innerWidth * 0.88;
    }

    function tick() {
      var on = onStage();
      if (!on) {
        if (wasOn) { wasOn = false; clearPause(); show(0); }
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
      if (!wasOn) { wasOn = true; show(0); }
      else { show(i + 1); }
      restart();
    }
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
      if (held || paused) return;
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
    }

    var step = function (d) { show(i + d); restart(); };

    /* The corner mark. It is not a button: the whole picture is already
       the target, and a second thing to aim at would only compete with
       it. Shown to a screen reader as the reel's state instead. */
    var flag = document.createElement('div');
    flag.className = 'rpause';
    flag.setAttribute('aria-hidden', 'true');
    flag.innerHTML = ICON_PLAY + '<span>Paused</span>';
    box.appendChild(flag);

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
    var RISE_AFTER = 1800;   /* after the lines and the headline sweep land */
    var sayLead = panels[0] && panels[0].querySelector('.say-lead');
    var sayCreds = panels[0] && panels[0].querySelector('.creds');
    /* "Keep scrolling" has done its job the moment the reader scrolls, and
       once the record has risen it would sit on top of it, so it leaves
       as the record arrives. */
    var sayGo = panels[0] && panels[0].querySelector('.go');

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
      var kids = [];
      [].forEach.call(p.children, function (el) {
        if (el === wrap) [].push.apply(kids, [].slice.call(el.children));
        else kids.push(el);
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

    function measure() {
      if (off()) {
        sec.style.height = ''; track.style.transform = '';
        /* Stacked, everything sits where it belongs and nothing is held
           back, so any inline state from a wider window is cleared. */
        sec.classList.remove('js-beat');
        [sayLead, sayCreds, sayGo].forEach(function (el) {
          if (el) { el.style.transition = ''; el.style.transform = ''; el.style.opacity = ''; }
        });
        return;
      }
      /* The record's rise is driven from here, so it must not also be
         running the entrance transition. Two things animating one element
         fight, and the record arrives late or not at all. Stacked, the
         class is off and the entrance takes it back. */
      sec.classList.add('js-beat');
      dist = Math.max(0, track.scrollWidth - view.clientWidth);
      /* How far the claim has to travel is measured, not guessed: it is
         half of what the record occupies, which is exactly the distance
         that leaves the claim optically centred while the record is out
         of sight. */
      if (sayLead && sayCreds) {
        var cs = window.getComputedStyle(sayCreds);
        shift = (sayCreds.offsetHeight + (parseFloat(cs.marginTop) || 0)) / 2;
      } else { shift = 0; }
      sec.style.height = (window.innerHeight + dist) + 'px';
      top = sec.getBoundingClientRect().top + window.scrollY;
      place(false);
      if (!risen && !riseTimer) riseTimer = setTimeout(rise, RISE_AFTER);
      draw();
    }

    /* Held or risen, with or without the movement. Inline styles, so they
       win over the entrance rules without a fight over specificity. */
    function place(animate) {
      var up = risen;
      var ease = 'cubic-bezier(.23, 1, .32, 1)';
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
      place(true);
    }

    function draw() {
      if (off()) return;
      var y = window.scrollY - top;
      /* Scrolling before the pause is over is an answer in itself: the
         reader is ready, so the record comes up now. */
      if (!risen && y > 4) rise();

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
        if (!v.parentNode) return;
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

  function reels() { [].forEach.call(document.querySelectorAll('.reel'), reel); }

  function init() {
    theatre(); reels(); horizontal();
    /* The opening state is set, so the panel can be shown. Same task as
       the setup above, so no frame is ever painted in between. */
    document.documentElement.classList.remove('js-early');
    copyPills(); progress(); reveal(); compare(); inviewVideo(); hoverVideo();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
