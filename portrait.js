/* Soumya Perla · the portrait on the first screen.
   ---------------------------------------------------------------------
   Her name assembles out of drifting dust, holds for a beat, then bursts
   and rebuilds as her face: one dot for every pixel of her photo, each
   in that pixel's colour. When the face lands it tells site.js, which
   brings in the claim and then the record. After that the portrait
   keeps going: the face, then her name,
   and the face again. A click on it moves on at once.

   The cursor parts the dots only while they are letters. On her face the
   same push read as a hole in her face, so the face only leans toward
   the cursor and is never pushed apart.

   The dots are drawn on a canvas that covers the first panel, in that
   panel's own pixels, so the face lands exactly in the slot the layout
   leaves for it and travels with the panel when the strip moves.
   Any scroll, key or click finishes the opening at once. Reduced motion
   gets the face, still. Without WebGL, the plain photo stays.
   --------------------------------------------------------------------- */
import * as THREE from 'three';

const panel = document.querySelector('.hs .panel.say');
const slot = panel && panel.querySelector('.say-face');
const canvas = panel && panel.querySelector('canvas.face-dots');

function landed() {
  if (landed.done) return;
  landed.done = true;
  document.dispatchEvent(new Event('portrait:landed'));
}

if (!panel || !slot || !canvas) {
  landed();
} else {
  start().catch(err => {
    /* No WebGL, or the photo failed: the plain photo is already in the
       slot, so it simply shows, and the claim comes in as normal. */
    console.error('portrait', err);
    document.documentElement.classList.add('face-fallback');
    landed();
  });
}

async function start() {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const smooth = (a, b, v) => { const t = clamp((v - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true });
  const DPR = Math.min(devicePixelRatio || 1, 2);
  renderer.setPixelRatio(DPR);
  const scene = new THREE.Scene();
  /* One world unit is one CSS pixel of the panel, origin top left, y down. */
  const camera = new THREE.OrthographicCamera(0, 1, 0, 1, -10, 10);
  let W = 1, H = 1;

  /* ---- The photo, as a grid of coloured cells ---- */
  const img = await new Promise((res, rej) => {
    const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = slot.querySelector('img').getAttribute('src');
  });
  const IW = img.width, IH = img.height;
  const cells = (() => {
    const c = document.createElement('canvas'); c.width = IW; c.height = IH;
    const g = c.getContext('2d'); g.drawImage(img, 0, 0);
    const d = g.getImageData(0, 0, IW, IH).data, out = [];
    for (let y = 0; y < IH; y++) for (let x = 0; x < IW; x++) {
      const p = (y * IW + x) * 4;
      if (d[p + 3] > 140) out.push({ x, y, r: d[p] / 255, g: d[p + 1] / 255, b: d[p + 2] / 255 });
    }
    return out;
  })();
  const N = cells.length;

  const pos = new Float32Array(N * 3), vel = new Float32Array(N * 3);
  const col = new Float32Array(N * 3), size = new Float32Array(N), phase = new Float32Array(N);
  const tPos = new Float32Array(N * 3), tCol = new Float32Array(N * 3), tSize = new Float32Array(N);
  const alp = new Float32Array(N).fill(1), tAlp = new Float32Array(N).fill(1);
  const speed = new Float32Array(N);
  for (let i = 0; i < N; i++) { phase[i] = Math.random() * 6.283; speed[i] = .55 + (i % 13) / 18; }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('aColor', new THREE.BufferAttribute(col, 3));
  geo.setAttribute('aSize', new THREE.BufferAttribute(size, 1));
  geo.setAttribute('aAlpha', new THREE.BufferAttribute(alp, 1));
  const points = new THREE.Points(geo, new THREE.ShaderMaterial({
    uniforms: { uDpr: { value: DPR } }, transparent: true, depthWrite: false, depthTest: false,
    vertexShader: `
      attribute vec3 aColor; attribute float aSize; attribute float aAlpha; uniform float uDpr; varying vec3 vColor; varying float vAlpha;
      void main(){ vColor = aColor; vAlpha = aAlpha; gl_PointSize = aSize * uDpr; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
    fragmentShader: `
      varying vec3 vColor; varying float vAlpha;
      void main(){
        float a = 1.0 - smoothstep(0.4, 0.5, length(gl_PointCoord - 0.5));
        a *= vAlpha;
        if (a < 0.02) discard;
        gl_FragColor = vec4(vColor, a);
        #include <colorspace_fragment>
      }`,
  }));
  points.frustumCulled = false;
  points.matrixAutoUpdate = false;
  scene.add(points);

  /* ---- Targets ---- */
  const BLUE = new THREE.Color('#3b82f6'), PALE = new THREE.Color('#93b4ff'), c3 = new THREE.Color();
  let face = { x: 0, y: 0, w: 1, h: 1 }, cell = 3;

  function measureSlot() {
    /* the slot's place inside the panel, untouched by any transform */
    let x = 0, y = 0, el = slot;
    while (el && el !== panel) { x += el.offsetLeft; y += el.offsetTop; el = el.offsetParent; }
    face = { x, y, w: slot.offsetWidth, h: slot.offsetHeight };
    cell = face.h / IH;
  }
  /* On a phone the face is about 100px tall, so a dot is half a screen
     pixel. Dots that fine beat against the pixel grid and drew a lattice
     of dark diamonds and fat blobs over her face (found 2026-10-06). There
     the dots overlap so the face is solid, and the soft edge fades out
     instead of shrinking the dots. */
  function setFace() {
    const tight = cell * DPR < 1.8;
    for (let i = 0; i < N; i++) {
      const c = cells[i];
      tPos[i * 3] = face.x + (c.x + .5) * cell;
      tPos[i * 3 + 1] = face.y + (c.y + .5) * cell;
      tPos[i * 3 + 2] = 0;
      const lum = .2126 * c.r + .7152 * c.g + .0722 * c.b;
      /* soft edges at the crop, and the shadows lifted so dark hair and a
         black top still read against a dark page */
      const fade = (1 - smooth(.74, 1, c.y / IH)) * (1 - smooth(.9, 1, c.x / IW)) * (1 - smooth(.9, 1, 1 - c.x / IW));
      c3.setRGB(Math.pow(c.r, .8), Math.pow(c.g, .8), Math.pow(c.b, .8), THREE.SRGBColorSpace);
      if (tight) {
        c3.toArray(tCol, i * 3);
        tSize[i] = Math.max(cell * 2.4, 2.6 / DPR);
        tAlp[i] = fade;
        continue;
      }
      c3.multiplyScalar(.35 + .65 * fade).toArray(tCol, i * 3);
      tAlp[i] = 1;
      tSize[i] = cell * 1.24 * (.95 + .25 * lum) * (.25 + .75 * fade);
    }
  }

  /* Words become dots: every lit pixel of the drawn lines is a place a dot
     can land, and the whole block is fitted into a box. */
  async function textState(lines, box) {
    await document.fonts.load('800 200px Inter');
    const CW = 1400, CH = 360 * lines.length;
    const c = document.createElement('canvas'); c.width = CW; c.height = CH;
    const g = c.getContext('2d');
    g.font = '800 300px Inter'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = '#fff';
    g.letterSpacing = '-8px';
    lines.forEach((l, i) => g.fillText(l, CW / 2, 180 + i * 330));
    const d = g.getImageData(0, 0, CW, CH).data, pts = [];
    let x0 = 1e9, x1 = 0, y0 = 1e9, y1 = 0;
    for (let y = 0; y < CH; y += 2) for (let x = 0; x < CW; x += 2) {
      if (d[(y * CW + x) * 4 + 3] > 128) {
        pts.push(x, y); x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y);
      }
    }
    const sc = Math.min(box.w / (x1 - x0), box.h / (y1 - y0));
    const out = { pos: new Float32Array(N * 3), col: new Float32Array(N * 3), size: new Float32Array(N) };
    /* On a phone the same 22,000 dots crowd into a small word, and at the
       desktop's dot size they merged into a blob. Finer dots there keep
       the letters' gaps open. */
    const dot = innerWidth <= 700 ? Math.max(.8, sc * 1.2) : Math.max(1.6, sc * 2.1);
    for (let i = 0; i < N; i++) {
      const k = Math.floor(Math.random() * pts.length / 2) * 2;
      out.pos[i * 3] = box.cx + (pts[k] + Math.random() * 2 - (x0 + x1) / 2) * sc;
      out.pos[i * 3 + 1] = box.cy + (pts[k + 1] + Math.random() * 2 - (y0 + y1) / 2) * sc;
      c3.lerpColors(BLUE, PALE, (pts[k] - x0) / (x1 - x0)).toArray(out.col, i * 3);
      out.size[i] = dot;
    }
    return out;
  }

  /* ---- Layout ---- */
  const words = {};
  let state = 'name';
  async function layout() {
    W = Math.max(1, canvas.clientWidth); H = Math.max(1, canvas.clientHeight);
    renderer.setSize(W, H, false);
    camera.left = 0; camera.right = W; camera.top = 0; camera.bottom = H;
    camera.updateProjectionMatrix();
    measureSlot();
    const mob = innerWidth <= 700;
    /* The opening writes the name across the middle of the first screen;
       stacked on a phone, across the middle of where the face will be. */
    words.name = await textState(['SOUMYA'], {
      cx: W / 2, cy: mob ? face.y + face.h / 2 : Math.min(H, innerHeight) / 2,
      w: mob ? W * .9 : Math.min(W * .62, 980), h: Math.min(H, innerHeight) * .3 });
    /* On a phone the slot is small, and words fitted to it were too small
       to read, so there they take most of the screen's width instead. */
    const inSlot = (wf, hf) => ({ cx: mob ? W / 2 : face.x + face.w / 2, cy: face.y + face.h * .46,
      w: mob ? Math.max(face.w * wf, W * .84) : face.w * wf, h: mob ? Math.max(face.h * hf, face.h * .8) : face.h * hf });
    words.slotName = await textState(['SOUMYA'], inSlot(.96, .3));
  }
  function aim(which) {
    state = which;
    if (which === 'face') { setFace(); return; }
    const w = words[which];
    tPos.set(w.pos); tCol.set(w.col); tSize.set(w.size); tAlp.fill(1);
  }
  function snap() { pos.set(tPos); col.set(tCol); size.set(tSize); alp.set(tAlp); vel.fill(0); }
  function scatter() {
    for (let i = 0; i < N; i++) {
      pos[i * 3] = Math.random() * W; pos[i * 3 + 1] = Math.random() * Math.min(H, innerHeight);
      vel[i * 3] = vel[i * 3 + 1] = 0;
      col[i * 3] = col[i * 3 + 1] = col[i * 3 + 2] = .25;
      size[i] = 1.2;
    }
  }
  /* Each change of shape starts with a small burst outward from the middle
     of whatever is on screen, so the dots visibly let go before they fly. */
  function burst(strength) {
    let cx = 0, cy = 0;
    for (let i = 0; i < N; i++) { cx += pos[i * 3]; cy += pos[i * 3 + 1]; }
    cx /= N; cy /= N;
    for (let i = 0; i < N; i++) {
      const dx = pos[i * 3] - cx, dy = pos[i * 3 + 1] - cy, d = Math.hypot(dx, dy) + 1;
      const f = (4 + Math.random() * 9) * strength;
      vel[i * 3] += dx / d * f + (Math.random() - .5) * 6 * strength;
      vel[i * 3 + 1] += dy / d * f + (Math.random() - .5) * 6 * strength;
    }
  }

  /* ---- The cycle, once the face has landed. The face holds longest. ---- */
  /* The first time, the face holds 3.8s: with the 3s opening before it,
     the old 6.5s meant "product designer" waited 9.5s to appear (her
     note, 2026-10-05: "taking too much time"). Later rounds hold 5s. */
  /* Face and name only (2026-10-05). "product designer" and "builder"
     said a third time what the headline and the line under it already
     say, and a morph beside the headline pulled the eye off it while it
     was being read. The face holds long and calm; her name surfaces now
     and then. A click on it still moves on. */
  const CYCLE = [['face', 10], ['slotName', 3.4]];
  const FIRST_FACE = 9;
  let cyc = 0, since = 0, cycling = false;
  function next() {
    cyc = (cyc + 1) % CYCLE.length; since = 0;
    burst(cyc === 0 ? 1 : .6);
    aim(CYCLE[cyc][0]);
  }

  /* ---- Pointer, in the panel's pixels ---- */
  const ptr = { x: -9999, y: -9999, on: 0, sx: 0, sy: 0 };
  if (fine) {
    addEventListener('pointermove', e => {
      const r = canvas.getBoundingClientRect();
      ptr.x = e.clientX - r.left; ptr.y = e.clientY - r.top;
      ptr.on = (ptr.x > 0 && ptr.y > 0 && ptr.x < r.width && ptr.y < r.height) ? 1 : 0;
    }, { passive: true });
    document.addEventListener('pointerleave', () => { ptr.on = 0; });
  }
  slot.addEventListener('click', () => { if (cycling) next(); });

  /* Only draw while the panel is on screen. */
  let visible = true;
  new IntersectionObserver(([en]) => { visible = en.isIntersecting; }).observe(canvas);

  /* ---- The loop ---- */
  let last = performance.now(), t = 0, push = 0;
  function frame(now) {
    requestAnimationFrame(frame);
    const dt = Math.min((now - last) / 1000, 1 / 20); last = now;
    if (!visible) return;
    t += dt;
    if (cycling) { since += dt; if (since > CYCLE[cyc][1]) next(); }
    /* Words form in about a second (was over two), so each one is
       readable for most of its 3.2s instead of under one. */
    const k = 1 - Math.pow(.008, dt), ck = 1 - Math.pow(.02, dt), damp = Math.pow(.03, dt);
    const isFace = state === 'face';
    push += ((isFace ? 0 : 1) - push) * (1 - Math.pow(.01, dt));
    const fcx = face.x + face.w / 2, fcy = face.y + face.h / 2;
    ptr.sx += ((ptr.on ? (ptr.x - fcx) / W : 0) - ptr.sx) * .06;
    ptr.sy += ((ptr.on ? (ptr.y - fcy) / H : 0) - ptr.sy) * .06;
    const R = 64, R2 = R * R, pushing = ptr.on && push > .02;
    /* Landing on the face is quicker and more even than any other move.
       The face is drawn far bigger than in the Lab, so stragglers still
       on their way read as holes in it, and at the old pace the face spent
       half its hold with holes. Now it is whole in about a second. */
    const kf = 1 - Math.pow(.0025, dt), df = Math.pow(.002, dt);
    for (let i = 0; i < N; i++) {
      const i3 = i * 3, sp = isFace ? kf * (.85 + speed[i] * .15) : k * speed[i];
      let tx = tPos[i3], ty = tPos[i3 + 1];
      /* The face holds still dot by dot. Each dot drifting on its own, and
         each following the cursor at its own speed, pulled neighbours
         apart and opened holes in her face (her note, 2026-10-05). The
         face now moves as one piece, below, the way the Lab's did. */
      if (isFace) {
        /* no per-dot motion */
      } else if (state !== 'name') {
        tx += Math.sin(t * 1.6 + phase[i]) * .6;
        ty += Math.cos(t * 1.4 + phase[i]) * .6;
      }
      const dmp = isFace ? df : damp;
      vel[i3] *= dmp; vel[i3 + 1] *= dmp;
      pos[i3] += vel[i3] + (tx - pos[i3]) * sp;
      pos[i3 + 1] += vel[i3 + 1] + (ty - pos[i3 + 1]) * sp;
      if (pushing) {
        const dx = pos[i3] - ptr.x, dy = pos[i3 + 1] - ptr.y, d2 = dx * dx + dy * dy;
        if (d2 < R2) { const d = Math.sqrt(d2) + .01, f = (1 - d / R) * 3 * push; pos[i3] += dx / d * f; pos[i3 + 1] += dy / d * f; }
      }
      col[i3] += (tCol[i3] - col[i3]) * ck; col[i3 + 1] += (tCol[i3 + 1] - col[i3 + 1]) * ck; col[i3 + 2] += (tCol[i3 + 2] - col[i3 + 2]) * ck;
      size[i] += (tSize[i] - size[i]) * ck;
      alp[i] += (tAlp[i] - alp[i]) * ck;
    }
    /* The lean toward the cursor and a slow breath, applied to the whole
       cloud at once, so the face turns and breathes without tearing. It
       fades out while the dots are words. */
    const w = 1 - push;
    const sh = ptr.sx * -.06 * w;
    const lx = (ptr.sx * 18 + Math.sin(t * .9) * .8) * w, ly = (ptr.sy * 14 + Math.cos(t * .7) * .8) * w;
    points.matrix.set(1, sh, 0, lx - sh * fcy, 0, 1, 0, ly, 0, 0, 1, 0, 0, 0, 0, 1);
    points.matrixWorldNeedsUpdate = true;
    geo.attributes.position.needsUpdate = true;
    geo.attributes.aColor.needsUpdate = true;
    geo.attributes.aSize.needsUpdate = true; geo.attributes.aAlpha.needsUpdate = true;
    renderer.render(scene, camera);
  }

  /* ---- The opening ---- */
  await layout();
  document.documentElement.classList.add('face-live');
  let timers = [];
  function finish() {
    timers.forEach(clearTimeout); timers = [];
    if (state === 'name') { aim('face'); snap(); since = CYCLE[0][1] - FIRST_FACE; }
    cycling = true;
    landed();
  }
  if (reduced) {
    aim('face'); snap();
    geo.attributes.position.needsUpdate = true;
    geo.attributes.aColor.needsUpdate = true;
    geo.attributes.aSize.needsUpdate = true; geo.attributes.aAlpha.needsUpdate = true;
    renderer.render(scene, camera);
    landed();
  } else {
    aim('name'); scatter();
    requestAnimationFrame(frame);
    timers.push(setTimeout(() => { burst(1); aim('face'); cycling = true; cyc = 0; since = CYCLE[0][1] - FIRST_FACE; }, 2900));
    timers.push(setTimeout(landed, 3600));
    const skip = () => { if (!landed.done) finish(); };
    ['wheel', 'keydown', 'touchstart'].forEach(ev => addEventListener(ev, skip, { passive: true }));
    addEventListener('pointerdown', skip);
  }

  let rt;
  addEventListener('resize', () => {
    clearTimeout(rt);
    rt = setTimeout(async () => {
      await layout(); aim(state);
      if (reduced) {
        snap();
        geo.attributes.position.needsUpdate = true; geo.attributes.aColor.needsUpdate = true; geo.attributes.aSize.needsUpdate = true; geo.attributes.aAlpha.needsUpdate = true;
        renderer.render(scene, camera);
      }
    }, 150);
  });
}
