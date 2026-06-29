// @ts-nocheck
/* eslint-disable */
// ------------------------------------------------------------------
// rosu home — canvas FX engine (framework-agnostic)
// Dot-grid backdrop + custom cursor + per-row hover effects.
// Ported verbatim from the original design. Mount once against the
// page root element; returns a cleanup function.
// ------------------------------------------------------------------

export function mountRosuFx(root: HTMLElement): () => void {
  const cur = root.querySelector('[data-cursor]');
  const logo = new Image(); logo.src = '/aicommit.svg';
  const mkI = (s) => { const im = new Image(); im.src = s; return im; };
  const dith = { fox: mkI('/dither-fox.png'), bird: mkI('/dither-bird.png'), wolf: mkI('/dither-wolf.png') };
  const PURL = 'https://unpkg.com/@lobehub/icons-static-svg@latest/icons/';
  const providers = [['OpenAI', 'openai.svg'], ['Claude', 'claude-color.svg'], ['Gemini', 'gemini-color.svg'], ['DeepSeek', 'deepseek-color.svg'], ['Mistral', 'mistral-color.svg'], ['Ollama', 'ollama.svg']].map((p) => { const im = new Image(); im.crossOrigin = 'anonymous'; im.src = PURL + p[1]; return { name: p[0], img: im }; });

  const dotsC = root.querySelector('[data-dots]'), dctx = dotsC.getContext('2d');
  const fxC = root.querySelector('[data-fxc]'), fctx = fxC.getContext('2d');
  const rm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  let W = 0, H = 0;
  const resize = () => { W = window.innerWidth; H = window.innerHeight; [dotsC, fxC].forEach(c => { c.width = W * dpr; c.height = H * dpr; }); dctx.setTransform(dpr, 0, 0, dpr, 0, 0); fctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
  resize(); window.addEventListener('resize', resize);

  let cx = W / 2, cy = H / 2, tx = W / 2, ty = H / 2;
  const xr = root.querySelector('[data-x]'), yr = root.querySelector('[data-y]');
  const onMove = (e) => { tx = e.clientX; ty = e.clientY; if (xr) xr.textContent = String(Math.round(e.clientX)).padStart(4, '0'); if (yr) yr.textContent = String(Math.round(e.clientY)).padStart(4, '0'); };
  window.addEventListener('pointermove', onMove, { passive: true });

  const clk = root.querySelector('[data-clock]');
  const tick = () => { if (!clk) return; const d = new Date(); clk.textContent = [d.getHours(), d.getMinutes(), d.getSeconds()].map(v => String(v).padStart(2, '0')).join(':'); };
  tick(); const ci = setInterval(tick, 1000);
  const yy = String(new Date().getFullYear()).slice(-2);
  root.querySelectorAll('[data-since]').forEach((el) => { el.textContent = el.getAttribute('data-since') + '\u2013' + yy; });

  const hx = (h) => { const n = parseInt(h.slice(1), 16); return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }; };
  const fx = { type: null, c: { r: 23, g: 24, b: 27 }, t0: 0, target: 0, alpha: 0, parts: [] };
  const initParts = () => { fx.parts = []; };
  const mainEl = root.querySelector('main');
  if (mainEl) mainEl.querySelectorAll(':scope > section').forEach((s) => {
    if (s.querySelector('.row')) { const lbl = s.querySelector(':scope > div'); if (lbl) lbl.classList.add('fxb'); s.querySelectorAll('.row').forEach(r => r.classList.add('fxb')); }
    else s.classList.add('fxb');
  });
  let activeRow = null;
  root.querySelectorAll('[data-fx]').forEach((row) => {
    row.addEventListener('pointerenter', () => {
      if (rm) return;
      const ty2 = row.getAttribute('data-fx');
      if (fx.type !== ty2) { fx.t0 = performance.now(); initParts(); }
      fx.type = ty2; fx.c = hx(row.getAttribute('data-c') || '#17181B'); fx.target = 1;
      activeRow = row; root.classList.add('fxon');
      root.querySelectorAll('.fxkeep').forEach(e => e.classList.remove('fxkeep')); row.classList.add('fxkeep');
    });
    row.addEventListener('pointerleave', () => {
      fx.target = 0;
      if (activeRow === row) { activeRow = null; setTimeout(() => { if (!activeRow) { root.classList.remove('fxon'); root.querySelectorAll('.fxkeep').forEach(e => e.classList.remove('fxkeep')); } }, 40); }
    });
  });

  document.body.style.cursor = 'none';
  const gap = 34;
  let raf = 0, _fxOn = false;
  const loop = (now) => {
    if (!isFinite(cx)) cx = tx; if (!isFinite(cy)) cy = ty;
    cx += (tx - cx) * (rm ? 1 : 0.16); cy += (ty - cy) * (rm ? 1 : 0.16);
    if (cur) cur.style.transform = 'translate(' + cx.toFixed(1) + 'px,' + cy.toFixed(1) + 'px)';
    try {
      dctx.clearRect(0, 0, W, H);
      for (let y = gap; y < H; y += gap) for (let x = gap; x < W; x += gap) {
        const f = Math.max(0, 1 - Math.hypot(x - cx, y - cy) / 130);
        dctx.fillStyle = 'rgba(23,24,27,' + ((0.03 + f * 0.16) * (1 - fx.alpha * 0.82)).toFixed(3) + ')';
        dctx.beginPath(); dctx.arc(x, y, 0.6 + f * 0.8, 0, 7); dctx.fill();
      }
    } catch (e) {}
    fx.alpha += ((fx.type ? fx.target : 0) - fx.alpha) * 0.12;
    if (fx.alpha > 0.004) {
      try { fctx.clearRect(0, 0, W, H); if (fx.type) { fctx.globalAlpha = Math.min(1, fx.alpha); drawFx(fctx, W, H, (now - fx.t0) / 1000, fx.c, fx.type, fx.parts); fctx.globalAlpha = 1; } } catch (e) { fctx.globalAlpha = 1; }
      _fxOn = true;
    } else if (_fxOn) { fctx.clearRect(0, 0, W, H); _fxOn = false; }
    raf = requestAnimationFrame(loop);
  };
  raf = requestAnimationFrame(loop);

  function drawFx(g, W, H, t, c, type, parts) {
    const A = (a) => 'rgba(' + c.r + ',' + c.g + ',' + c.b + ',' + a + ')';
    if (type === 'glitch') {
      const fr = Math.floor(t * 13);
      const rnd = (n) => { const s = Math.sin(n * 127.1 + fr * 11.7) * 43758.5; return s - Math.floor(s); };
      for (let i = 0; i < 22; i++) {
        const sy = rnd(i + 1) * H, sh = 4 + rnd(i + 7) * H * 0.06, off = (rnd(i + 3) - 0.5) * 130;
        g.fillStyle = 'rgba(37,244,238,' + (0.10 + rnd(i + 2) * 0.16).toFixed(3) + ')'; g.fillRect(off, sy, W, sh);
        g.fillStyle = 'rgba(254,44,85,' + (0.10 + rnd(i + 5) * 0.16).toFixed(3) + ')'; g.fillRect(-off, sy, W, sh);
      }
      g.fillStyle = 'rgba(23,24,27,0.05)';
      for (let y = 0; y < H; y += 3) g.fillRect(0, y, W, 1);
    } else if (type === 'pk') {
      const oa = g.globalAlpha;
      const RED = (a) => 'rgba(255,72,99,' + a + ')', BLU = (a) => 'rgba(40,124,248,' + a + ')', INK = (a) => 'rgba(23,24,27,' + a + ')';
      const ease = (u) => 1 - Math.pow(1 - Math.max(0, Math.min(1, u)), 3);
      const rr = (x, y, w, h, r) => { g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath(); };
      const avatar = (cxp, cyp, R, col) => {
        g.save(); g.beginPath(); g.arc(cxp, cyp, R, 0, 7); g.clip();
        g.fillStyle = col(0.16); g.fillRect(cxp - R, cyp - R, R * 2, R * 2);
        g.fillStyle = col(0.6); g.beginPath(); g.ellipse(cxp, cyp + R * 1.02, R * 0.82, R * 0.62, 0, 0, 7); g.fill();
        g.beginPath(); g.arc(cxp, cyp - R * 0.16, R * 0.4, 0, 7); g.fill();
        g.restore();
        g.strokeStyle = col(0.72); g.lineWidth = 2; g.beginPath(); g.arc(cxp, cyp, R, 0, 7); g.stroke();
      };
      const tile = (x, y, w, h, col, seed) => {
        g.save(); rr(x, y, w, h, 11); g.clip();
        g.fillStyle = col(0.08); g.fillRect(x, y, w, h);
        const R = Math.min(w * 0.3, h * 0.32);
        avatar(x + w / 2, y + h * 0.42, R, col);
        const pw = Math.min(w * 0.46, 54); g.fillStyle = col(0.24); rr(x + w / 2 - pw / 2, y + h * 0.42 + R + 9, pw, 7, 3.5); g.fill();
        for (let b = 0; b < 4; b++) { const lv = (Math.sin(t * 6 + b * 1.4 + seed) * 0.5 + 0.5), bh = 3 + lv * Math.min(18, h * 0.14); g.fillStyle = col(0.7); g.fillRect(x + 11 + b * 5, y + h - 9 - bh, 3, bh); }
        g.fillStyle = col(0.9); g.beginPath(); g.arc(x + 14, y + 13, 3, 0, 7); g.fill();
        g.restore();
        g.strokeStyle = col(0.55); g.lineWidth = 1.5; rr(x, y, w, h, 11); g.stroke();
      };
      g.fillStyle = INK(0.02); g.fillRect(0, 0, W, H);
      const cyc = 3.6, ph = Math.floor(t / cyc), lt = t - ph * cyc, pop = ease(lt / 0.55);
      const stage = { x: W * 0.07, y: H * 0.17, w: W * 0.86, h: H * 0.7 };
      const counts = [2, 3, 4, 5, 6, 7], n = counts[ph % counts.length];
      const rowsArr = n === 2 ? [2] : n === 3 ? [3] : n === 4 ? [2, 2] : n === 5 ? [2, 3] : n === 6 ? [3, 3] : [3, 4];
      const gp = 16, rows = rowsArr.length, rh = (stage.h - (rows - 1) * gp) / rows;
      let idx = 0;
      for (let r = 0; r < rows; r++) { const m = rowsArr[r], rw = (stage.w - (m - 1) * gp) / m; for (let i = 0; i < m; i++) { const x = stage.x + i * (rw + gp), y = stage.y + r * (rh + gp), col = n === 2 ? (i === 0 ? RED : BLU) : (idx % 3 === 0 ? RED : idx % 3 === 1 ? BLU : INK), cxp = x + rw / 2, cyp = y + rh / 2, sc = 0.86 + 0.14 * pop; g.save(); g.globalAlpha = oa * pop; g.translate(cxp, cyp); g.scale(sc, sc); g.translate(-cxp, -cyp); tile(x, y, rw, rh, col, idx * 2.1); g.restore(); idx++; } }
      if (n === 2) {
        const bx = stage.x, bw = stage.w, by = H * 0.078 - (1 - ease(lt / 0.5)) * 70, bh = 16, spl = 0.5 + Math.sin(t * 1.1) * 0.16, mid = bx + bw * spl;
        g.save(); g.globalAlpha = oa * ease(lt / 0.5);
        rr(bx, by, bw, bh, 8); g.save(); g.clip(); g.fillStyle = RED(0.85); g.fillRect(bx, by, mid - bx, bh); g.fillStyle = BLU(0.85); g.fillRect(mid, by, bx + bw - mid, bh); g.restore();
        g.fillStyle = 'rgba(233,231,224,0.95)'; g.beginPath(); g.arc(mid, by + bh / 2, bh * 0.72, 0, 7); g.fill();
        g.fillStyle = INK(0.85); g.font = '700 11px ui-monospace, monospace'; g.textAlign = 'center'; g.fillText('PK', mid, by + bh / 2 + 4);
        g.font = '700 13px ui-monospace, monospace'; g.textAlign = 'left'; g.fillStyle = RED(0.9); g.fillText(String(Math.round(spl * 100)), bx + 6, by - 6); g.textAlign = 'right'; g.fillStyle = BLU(0.9); g.fillText(String(Math.round((1 - spl) * 100)), bx + bw - 6, by - 6); g.textAlign = 'left';
        g.restore();
        g.fillStyle = RED(0.022); g.fillRect(0, 0, W / 2, H); g.fillStyle = BLU(0.022); g.fillRect(W / 2, 0, W / 2, H);
      }
    } else if (type === 'edu') {
      const oa = g.globalAlpha;
      const rr = (x, y, w, h, r) => { g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath(); };
      g.fillStyle = A(0.03); g.fillRect(0, 0, W, H);
      const wy = H * 0.24, amp = H * 0.1;
      g.fillStyle = A(0.04); g.fillRect(0, wy - amp - 14, W, amp * 2 + 28);
      for (let x = 0; x < W; x += 5) { const a1 = (Math.sin(x * 0.05) * 0.5 + 0.5) * (Math.sin(x * 0.013 + 1) * 0.5 + 0.5), h = 3 + a1 * amp; g.fillStyle = A(0.26); g.fillRect(x, wy - h, 3, h * 2); }
      g.setLineDash([4, 5]);
      for (let k = 1; k < 7; k++) { const cxp = (k / 7) * W + Math.sin(t * 0.3 + k) * 8; g.strokeStyle = A(0.4); g.lineWidth = 1; g.beginPath(); g.moveTo(cxp, wy - amp - 12); g.lineTo(cxp, wy + amp + 12); g.stroke(); g.fillStyle = A(0.65); g.fillRect(cxp - 5, wy - amp - 18, 10, 7); }
      g.setLineDash([]);
      const ph = (t * 150) % W; g.strokeStyle = A(0.85); g.lineWidth = 1.6; g.beginPath(); g.moveTo(ph, wy - amp - 16); g.lineTo(ph, wy + amp + 16); g.stroke(); g.fillStyle = A(0.85); g.beginPath(); g.moveTo(ph - 5, wy - amp - 16); g.lineTo(ph + 5, wy - amp - 16); g.lineTo(ph, wy - amp - 9); g.closePath(); g.fill();
      g.font = '12px ui-monospace, monospace';
      for (let i = 0; i < 7; i++) { const life = ((t * 0.13 + i / 7) % 1), a = Math.sin(life * Math.PI); if (a < 0.02) continue; const teacher = i % 3 === 0, left = i % 2 === 0, bw = 70 + (i * 37 % 90), bh = 26, x = left ? W * 0.06 : W * 0.32 - bw, y = H * 0.92 - life * H * 0.46; g.globalAlpha = oa * a * 0.9; g.fillStyle = teacher ? A(0.2) : A(0.08); rr(x + 16, y, bw, bh, 8); g.fill(); g.strokeStyle = A(teacher ? 0.55 : 0.3); g.lineWidth = 1.1; rr(x + 16, y, bw, bh, 8); g.stroke(); g.fillStyle = A(0.6); g.beginPath(); g.arc(left ? x + 8 : x + bw + 24, y + bh / 2, 7, 0, 7); g.fill(); g.fillStyle = A(0.42); g.fillRect(x + 26, y + 9, bw * 0.6, 3.5); g.fillRect(x + 26, y + 16, bw * 0.4, 3.5); g.globalAlpha = oa; }
      const cardX = W * 0.6, cw = W * 0.32, chh = 50, gpc = 16;
      for (let i = 0; i < 3; i++) { const yy = H * 0.52 + i * (chh + gpc) + Math.sin(t * 0.5 + i) * 4; g.fillStyle = A(0.05); rr(cardX, yy, cw, chh, 9); g.fill(); g.strokeStyle = A(0.38); g.lineWidth = 1.2; rr(cardX, yy, cw, chh, 9); g.stroke(); g.strokeStyle = A(0.65); g.lineWidth = 1.3; g.beginPath(); g.arc(cardX + 26, yy + chh / 2, 13, 0, 7); g.stroke(); g.fillStyle = A(0.8); g.beginPath(); g.moveTo(cardX + 22, yy + chh / 2 - 6); g.lineTo(cardX + 22, yy + chh / 2 + 6); g.lineTo(cardX + 34, yy + chh / 2); g.closePath(); g.fill(); g.fillStyle = A(0.32); g.fillRect(cardX + 50, yy + 14, cw * 0.46, 5); g.fillRect(cardX + 50, yy + 25, cw * 0.3, 5); g.fillStyle = A(0.13); g.fillRect(cardX + 50, yy + 37, cw - 66, 4); g.fillStyle = A(0.7); g.fillRect(cardX + 50, yy + 37, (cw - 66) * (Math.sin(t * 0.6 + i) * 0.5 + 0.5), 4); }
    } else if (type === 'detect') {
      g.fillStyle = A(0.022); g.fillRect(0, 0, W, H);
      g.strokeStyle = A(0.05); g.lineWidth = 1;
      for (let x = 44; x < W; x += 44) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, H); g.stroke(); }
      for (let y = 44; y < H; y += 44) { g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke(); }
      const vg = g.createRadialGradient(W / 2, H * 0.5, Math.min(W, H) * 0.18, W / 2, H * 0.5, Math.max(W, H) * 0.62);
      vg.addColorStop(0, A(0)); vg.addColorStop(1, A(0.06)); g.fillStyle = vg; g.fillRect(0, 0, W, H);
      const face = (x, y, w, h, conf, locked, primary) => {
        const P = [[x + w * 0.32, y + h * 0.4], [x + w * 0.68, y + h * 0.4], [x + w * 0.5, y + h * 0.58], [x + w * 0.36, y + h * 0.75], [x + w * 0.64, y + h * 0.75], [x + w * 0.18, y + h * 0.46], [x + w * 0.82, y + h * 0.46], [x + w * 0.5, y + h * 0.2], [x + w * 0.5, y + h * 0.86]];
        const L = [[7, 0], [7, 1], [0, 1], [0, 2], [1, 2], [2, 3], [2, 4], [3, 4], [0, 5], [1, 6], [5, 3], [6, 4], [3, 8], [4, 8]];
        g.strokeStyle = A(locked ? 0.34 : 0.2); g.lineWidth = 1;
        g.beginPath(); L.forEach((l) => { g.moveTo(P[l[0]][0], P[l[0]][1]); g.lineTo(P[l[1]][0], P[l[1]][1]); }); g.stroke();
        g.beginPath(); g.moveTo(x + w * 0.16, y + h * 0.44); g.quadraticCurveTo(x + w * 0.5, y + h * 1.04, x + w * 0.84, y + h * 0.44); g.stroke();
        P.forEach((p) => { g.fillStyle = A(0.7); g.beginPath(); g.arc(p[0], p[1], primary ? 2 : 1.4, 0, 7); g.fill(); });
        const cl = primary ? 16 : 11; g.lineWidth = primary ? 2.6 : 2.2; g.strokeStyle = A(locked ? 0.85 : 0.55);
        [[x, y, 1, 1], [x + w, y, -1, 1], [x, y + h, 1, -1], [x + w, y + h, -1, -1]].forEach((q) => { g.beginPath(); g.moveTo(q[0], q[1] + q[3] * cl); g.lineTo(q[0], q[1]); g.lineTo(q[0] + q[2] * cl, q[1]); g.stroke(); });
        g.fillStyle = A(locked ? 0.82 : 0.5); g.fillRect(x, y - 14, 42, 11);
        g.fillStyle = 'rgba(233,231,224,0.95)'; g.font = '8px ui-monospace, monospace'; g.textAlign = 'left'; g.fillText(locked ? 'MATCH' : 'SCAN', x + 5, y - 5.5);
        g.fillStyle = A(0.6); g.font = '9px ui-monospace, monospace'; g.fillText(conf.toFixed(1) + '%', x + 48, y - 5);
      };
      const set = [[W * 0.1, H * 0.22, 132, 158, true], [W * 0.72, H * 0.16, 110, 134, false], [W * 0.8, H * 0.56, 96, 116, true], [W * 0.08, H * 0.6, 104, 126, false]];
      set.forEach((f, i) => { const dx = Math.sin(t * 0.4 + i) * 12, dy = Math.cos(t * 0.34 + i * 1.3) * 9, conf = 90 + (Math.sin(t * 0.8 + i) * 0.5 + 0.5) * 9.6; face(f[0] + dx, f[1] + dy, f[2], f[3], conf, f[4], false); });
      const fpx = W * 0.42, fpy = H * 0.28, fpw = 188, fph = 226;
      face(fpx, fpy, fpw, fph, 97.5 + Math.sin(t * 1.2) * 1.6, true, true);
      const ssy = fpy + ((t * 0.45) % 1) * fph; g.fillStyle = A(0.06); g.fillRect(fpx, fpy, fpw, ssy - fpy);
      g.strokeStyle = A(0.7); g.lineWidth = 1.4; g.beginPath(); g.moveTo(fpx, ssy); g.lineTo(fpx + fpw, ssy); g.stroke();
      const chx = W * 0.5 + Math.sin(t * 0.6) * W * 0.3, chy = H * 0.52 + Math.cos(t * 0.5) * H * 0.24;
      g.strokeStyle = A(0.32); g.lineWidth = 1; g.beginPath(); g.moveTo(chx - 13, chy); g.lineTo(chx + 13, chy); g.moveTo(chx, chy - 13); g.lineTo(chx, chy + 13); g.stroke();
      g.strokeRect(chx - 7, chy - 7, 14, 14);
      g.textAlign = 'left';
    } else if (type === 'atlas') {
      g.fillStyle = A(0.03); g.fillRect(0, 0, W, H);
      // topographic contour map (far depth)
      const centers = [[W * 0.26, H * 0.34], [W * 0.78, H * 0.3]];
      g.lineWidth = 1.1;
      centers.forEach((ct, ci) => {
        for (let k = 1; k <= 8; k++) {
          const base = k * 32 + Math.sin(t * 0.4 + ci * 2) * 5;
          g.strokeStyle = A(Math.max(0.03, 0.17 - k * 0.015));
          g.beginPath();
          for (let a = 0; a <= 6.2832; a += 0.16) { const rr2 = base + Math.sin(a * 3 + t * 0.5 + ci + k * 0.2) * 8 + Math.cos(a * 5 - t * 0.35) * 4; const x = ct[0] + Math.cos(a) * rr2, y = ct[1] + Math.sin(a) * rr2 * 0.58; a === 0 ? g.moveTo(x, y) : g.lineTo(x, y); }
          g.closePath(); g.stroke();
        }
      });
      // horizon ground line
      const gy = H * 0.82;
      g.strokeStyle = A(0.2); g.lineWidth = 1.4; g.beginPath(); g.moveTo(0, gy); for (let x = 0; x <= W; x += 12) g.lineTo(x, gy + Math.sin(x * 0.01 + 1) * 6); g.stroke();
      // --- wildlife silhouettes ---
      const flyBird = (x, y, s, ph, al) => { const f = Math.sin(ph); g.strokeStyle = A(al); g.lineWidth = Math.max(1, s * 0.12); g.lineCap = 'round'; g.beginPath(); g.moveTo(x - s, y - f * s * 0.45); g.quadraticCurveTo(x - s * 0.35, y - s * 0.55, x, y); g.quadraticCurveTo(x + s * 0.35, y - s * 0.55, x + s, y - f * s * 0.45); g.stroke(); };
      const bison = (cx, by, s, al) => {
        g.fillStyle = A(al); const lw = s * 0.12, lh = s * 0.34;
        [-0.7, -0.4, 0.18, 0.42].forEach(o => g.fillRect(cx + s * o - lw / 2, by - lh, lw, lh));
        g.beginPath();
        g.moveTo(cx - s * 0.92, by - s * 0.3);
        g.quadraticCurveTo(cx - s * 1.0, by - s * 0.62, cx - s * 0.66, by - s * 0.64);
        g.quadraticCurveTo(cx - s * 0.4, by - s * 0.66, cx - s * 0.26, by - s * 0.98);
        g.quadraticCurveTo(cx - s * 0.08, by - s * 1.08, cx + s * 0.08, by - s * 0.86);
        g.quadraticCurveTo(cx + s * 0.18, by - s * 0.78, cx + s * 0.36, by - s * 0.72);
        g.lineTo(cx + s * 0.54, by - s * 0.78); g.lineTo(cx + s * 0.66, by - s * 0.6);
        g.lineTo(cx + s * 0.6, by - s * 0.44); g.lineTo(cx + s * 0.68, by - s * 0.28);
        g.lineTo(cx + s * 0.48, by - s * 0.26);
        g.quadraticCurveTo(cx + s * 0.2, by - s * 0.34, cx - s * 0.1, by - s * 0.32);
        g.quadraticCurveTo(cx - s * 0.6, by - s * 0.3, cx - s * 0.92, by - s * 0.3);
        g.closePath(); g.fill();
      };
      const wolf = (cx, by, s, al) => {
        g.fillStyle = A(al); const lw = s * 0.1;
        g.fillRect(cx + s * 0.18 - lw / 2, by - s * 0.5, lw, s * 0.5); g.fillRect(cx + s * 0.04 - lw / 2, by - s * 0.5, lw, s * 0.5);
        g.beginPath(); g.ellipse(cx - s * 0.3, by - s * 0.32, s * 0.34, s * 0.3, 0, 0, 7); g.fill();
        g.beginPath();
        g.moveTo(cx - s * 0.5, by - s * 0.34);
        g.quadraticCurveTo(cx - s * 0.5, by - s * 0.66, cx - s * 0.2, by - s * 0.66);
        g.quadraticCurveTo(cx + s * 0.05, by - s * 0.66, cx + s * 0.12, by - s * 0.95);
        g.lineTo(cx + s * 0.06, by - s * 1.2); g.lineTo(cx + s * 0.24, by - s * 1.16); g.lineTo(cx + s * 0.2, by - s * 1.04);
        g.quadraticCurveTo(cx + s * 0.28, by - s * 0.8, cx + s * 0.26, by - s * 0.5);
        g.lineTo(cx + s * 0.1, by - s * 0.5);
        g.quadraticCurveTo(cx - s * 0.1, by - s * 0.5, cx - s * 0.5, by - s * 0.34);
        g.closePath(); g.fill();
        g.beginPath(); g.moveTo(cx + s * 0.04, by - s * 1.0); g.lineTo(cx - s * 0.04, by - s * 1.16); g.lineTo(cx + s * 0.12, by - s * 1.08); g.closePath(); g.fill();
        g.beginPath(); g.moveTo(cx - s * 0.48, by - s * 0.4); g.quadraticCurveTo(cx - s * 0.85, by - s * 0.5, cx - s * 0.72, by - s * 0.12); g.quadraticCurveTo(cx - s * 0.66, by - s * 0.4, cx - s * 0.46, by - s * 0.34); g.closePath(); g.fill();
      };
      const crane = (cx, by, s, al) => {
        g.strokeStyle = A(al); g.lineCap = 'round'; g.lineWidth = Math.max(1.3, s * 0.05);
        g.beginPath(); g.moveTo(cx - s * 0.06, by); g.lineTo(cx - s * 0.04, by - s * 0.62); g.moveTo(cx + s * 0.08, by); g.lineTo(cx + s * 0.04, by - s * 0.62); g.stroke();
        g.fillStyle = A(al); g.beginPath(); g.ellipse(cx, by - s * 0.72, s * 0.26, s * 0.16, -0.1, 0, 7); g.fill();
        g.beginPath(); g.moveTo(cx - s * 0.24, by - s * 0.74); g.lineTo(cx - s * 0.45, by - s * 0.66); g.lineTo(cx - s * 0.22, by - s * 0.66); g.closePath(); g.fill();
        g.strokeStyle = A(al); g.lineWidth = Math.max(1.3, s * 0.06); g.beginPath(); g.moveTo(cx + s * 0.12, by - s * 0.8); g.quadraticCurveTo(cx + s * 0.34, by - s * 1.0, cx + s * 0.24, by - s * 1.2); g.stroke();
        g.fillStyle = A(al); g.beginPath(); g.arc(cx + s * 0.24, by - s * 1.24, s * 0.07, 0, 7); g.fill();
        g.strokeStyle = A(al); g.lineWidth = Math.max(1, s * 0.04); g.beginPath(); g.moveTo(cx + s * 0.3, by - s * 1.26); g.lineTo(cx + s * 0.5, by - s * 1.28); g.stroke();
      };
      const coot = (cx, wy, s, al) => {
        g.strokeStyle = A(al * 0.45); g.lineWidth = 1;
        for (let r = 0; r < 3; r++) { const u = ((t * 0.4 + r / 3) % 1); g.beginPath(); g.ellipse(cx, wy + s * 0.22, s * (0.5 + u * 1.0), s * (0.14 + u * 0.3), 0, 0, 7); g.stroke(); }
        g.fillStyle = A(al); g.beginPath(); g.ellipse(cx, wy, s * 0.5, s * 0.28, 0, 0, 7); g.fill();
        g.beginPath(); g.arc(cx + s * 0.42, wy - s * 0.22, s * 0.16, 0, 7); g.fill();
        g.beginPath(); g.moveTo(cx + s * 0.56, wy - s * 0.22); g.lineTo(cx + s * 0.72, wy - s * 0.2); g.lineTo(cx + s * 0.56, wy - s * 0.12); g.closePath(); g.fill();
      };
      const dd = dith || {};
      const drawA = (img, cx2, h) => { if (!img || !img.complete || !img.naturalWidth) return; const w = h * img.naturalWidth / img.naturalHeight; g.imageSmoothingEnabled = false; g.drawImage(img, cx2 - w / 2, gy - h, w, h); g.imageSmoothingEnabled = true; };
      drawA(dd.fox, W * 0.19, 150);
      drawA(dd.bird, W * 0.47, 92);
      drawA(dd.wolf, W * 0.81, 132);
      for (let i = 0; i < 7; i++) { const bx = ((t * (16 + i * 4) + i * 220) % (W + 120)) - 60, by2 = H * (0.12 + 0.06 * (i % 3)) + Math.sin(t * 0.6 + i) * 6; flyBird(bx, by2, 13 - (i % 3) * 2, t * 6 + i, 0.3 - (i % 3) * 0.06); }
      for (let i = 0; i < 5; i++) { const fxb = ((t * 22) % (W + 200)) - 100, off = Math.abs(i - 2); flyBird(fxb - off * 22, H * 0.2 + off * 14, 11, t * 7 + i, 0.26); }
      g.lineCap = 'butt';
      // sound waveform threading through (the recording)
      const my = H * 0.5;
      g.strokeStyle = A(0.42); g.lineWidth = 1.6; g.beginPath();
      for (let x = 0; x <= W; x += 4) { const env = (0.4 + 0.6 * Math.abs(Math.sin(x * 0.0025 + t * 0.4))); const y = my + env * Math.sin(x * 0.07 - t * 3.5) * 18; x === 0 ? g.moveTo(x, y) : g.lineTo(x, y); }
      g.stroke();
      const sx = (t * 130) % W; g.fillStyle = A(0.8); g.beginPath(); g.arc(sx, my + (0.4 + 0.6 * Math.abs(Math.sin(sx * 0.0025 + t * 0.4))) * Math.sin(sx * 0.07 - t * 3.5) * 18, 3, 0, 7); g.fill();
    } else if (type === 'tiles') {
      g.font = '600 13px ui-monospace, monospace'; g.fillStyle = A(0.16);
      const gxx = 110, gyy = 34, off = (t * 16) % gxx;
      for (let y = 0; y < H + gyy; y += gyy) for (let x = -gxx; x < W + gxx; x += gxx) g.fillText('rosu', x + off + ((Math.floor(y / gyy) % 2) ? gxx / 2 : 0), y);
    } else if (type === 'hub') {
      const oa = g.globalAlpha;
      const INK = (a) => 'rgba(23,24,27,' + a + ')', BLU = (a) => 'rgba(46,124,246,' + a + ')', RED = (a) => 'rgba(229,69,77,' + a + ')';
      const smooth = (u) => { u = Math.max(0, Math.min(1, u)); return u * u * u * (u * (u * 6 - 15) + 10); };
      const rr = (x, y, w, h, r) => { g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath(); };
      g.fillStyle = INK(0.02); g.fillRect(0, 0, W, H);
      // background diff — classic red/blue, crisp and readable
      g.save(); g.font = '13px ui-monospace, monospace';
      const lh = 24, sp = 30, scroll = (t * sp) % lh, base = Math.floor(t * sp / lh);
      const rnd = (k) => { const s = Math.sin(k * 91.73) * 43758.5; return s - Math.floor(s); };
      const rows = Math.ceil(H / lh) + 2;
      for (let i = 0; i < rows; i++) { const idx = base + i, y = i * lh - scroll + 16, kind = rnd(idx) < 0.27 ? 1 : rnd(idx + 11) < 0.33 ? 2 : 0, col = kind === 1 ? RED : kind === 2 ? BLU : INK;
        if (kind) { g.fillStyle = (kind === 1 ? RED : BLU)(0.085); g.fillRect(0, y - 16, W, lh - 3); g.fillStyle = col(0.5); g.fillRect(0, y - 16, 3, lh - 3); }
        g.fillStyle = col(kind ? 0.62 : 0.16); g.fillText(kind === 1 ? '-' : kind === 2 ? '+' : ' ', 20, y);
        g.fillStyle = INK(0.16); g.fillText(String((idx % 900) + 100).padStart(3, '0'), 40, y);
        let x = 82 + (idx % 5) * 13; const ntok = 2 + Math.floor(rnd(idx + 5) * 5);
        for (let s2 = 0; s2 < ntok; s2++) { const w = 16 + rnd(idx * 13 + s2) * 78; if (x + w > W - 30) break; g.fillStyle = col(kind ? 0.2 : 0.09); g.fillRect(x, y - 9, w, 8); x += w + 9; }
      }
      g.restore();
      // soft center halo keeps the cluster legible without washing out the diff
      const cxp = W / 2, cyp = H * 0.55;
      const halo = g.createRadialGradient(cxp, cyp, 36, cxp, cyp, Math.max(W, H) * 0.46);
      halo.addColorStop(0, 'rgba(233,231,224,0.9)'); halo.addColorStop(0.5, 'rgba(233,231,224,0.52)'); halo.addColorStop(1, 'rgba(233,231,224,0)');
      g.fillStyle = halo; g.fillRect(0, 0, W, H);
      // providers across the top
      const ps = providers || [], n = ps.length || 6, cyc = 1.4, active = Math.floor(t / cyc) % n, lt = (t % cyc) / cyc;
      const rowY = H * 0.2, spanW = Math.min(W * 0.72, 720), x0 = cxp - spanW / 2;
      const provX = (i) => x0 + (n <= 1 ? spanW / 2 : (i / (n - 1)) * spanW);
      const logoTop = cyp - 42;
      // silky bezier connections fanning down into the logo
      for (let i = 0; i < n; i++) {
        const x = provX(i), y = rowY + 26, isA = i === active, midY = (y + logoTop) / 2;
        g.strokeStyle = isA ? BLU(0.5) : INK(0.09); g.lineWidth = isA ? 1.8 : 1;
        g.beginPath(); g.moveTo(x, y); g.bezierCurveTo(x, midY, cxp, midY, cxp, logoTop); g.stroke();
        if (isA) { const u = smooth(lt), mt = 1 - u, bx = mt * mt * mt * x + 3 * mt * mt * u * x + 3 * mt * u * u * cxp + u * u * u * cxp, by = mt * mt * mt * y + 3 * mt * mt * u * midY + 3 * mt * u * u * midY + u * u * u * logoTop;
          g.fillStyle = BLU(0.26); g.beginPath(); g.arc(bx, by, 7, 0, 7); g.fill(); g.fillStyle = BLU(0.95); g.beginPath(); g.arc(bx, by, 3.4, 0, 7); g.fill(); }
      }
      // provider icons
      g.textAlign = 'center';
      for (let i = 0; i < n; i++) {
        const x = provX(i), y = rowY, isA = i === active, cr = 22, p = ps[i];
        g.fillStyle = 'rgba(233,231,224,0.97)'; g.beginPath(); g.arc(x, y, cr, 0, 7); g.fill();
        g.strokeStyle = isA ? BLU(0.85) : INK(0.16); g.lineWidth = isA ? 2 : 1.1; g.beginPath(); g.arc(x, y, cr, 0, 7); g.stroke();
        if (p && p.img && p.img.complete && p.img.naturalWidth) { const s = 27; g.drawImage(p.img, x - s / 2, y - s / 2, s, s); } else { g.fillStyle = INK(0.5); g.font = '600 14px ui-monospace, monospace'; g.fillText((p && p.name || '?')[0], x, y + 5); }
        g.fillStyle = isA ? BLU(0.9) : INK(0.4); g.font = '9px ui-monospace, monospace'; g.fillText((p && p.name || '').toUpperCase(), x, y + cr + 13);
      }
      // center logo with an absorb flash as each pulse lands
      const land = lt > 0.78 ? Math.sin((lt - 0.78) / 0.22 * Math.PI) : 0, ringR = 44 + land * 7;
      g.strokeStyle = BLU(0.12 + land * 0.24); g.lineWidth = 1.4; g.beginPath(); g.arc(cxp, cyp, ringR + 9, 0, 7); g.stroke();
      g.strokeStyle = BLU(0.6); g.lineWidth = 2.2; g.beginPath(); g.arc(cxp, cyp, ringR, t * 3, t * 3 + 1.6); g.stroke();
      g.fillStyle = 'rgba(233,231,224,0.98)'; g.beginPath(); g.arc(cxp, cyp, 38, 0, 7); g.fill();
      g.strokeStyle = INK(0.14); g.lineWidth = 1.1; g.beginPath(); g.arc(cxp, cyp, 38, 0, 7); g.stroke();
      if (logo && logo.complete && logo.naturalWidth) { const Lw = 46 + land * 4; g.drawImage(logo, cxp - Lw / 2, cyp - Lw / 2, Lw, Lw); }
      // status: thinking / generating cycle below the logo
      const states = ['analyzing diff', 'thinking', 'generating', 'writing commit'];
      const si = Math.floor(t / 1.5) % states.length, dn = 1 + Math.floor((t * 2) % 3);
      g.textAlign = 'center'; g.font = '600 12px ui-monospace, monospace'; g.fillStyle = BLU(0.82);
      g.fillText(states[si] + '.'.repeat(dn), cxp, cyp + 66);
      const bw2 = 122, bx2 = cxp - bw2 / 2, by2 = cyp + 78;
      g.fillStyle = INK(0.07); rr(bx2, by2, bw2, 4, 2); g.fill();
      g.save(); rr(bx2, by2, bw2, 4, 2); g.clip(); const shx = ((t * 0.6) % 1.3) * bw2 - bw2 * 0.3; g.fillStyle = BLU(0.65); rr(bx2 + shx, by2, bw2 * 0.32, 4, 2); g.fill(); g.restore();
      g.textAlign = 'left';
    } else if (type === 'files') {
      const INK = (a) => 'rgba(23,24,27,' + a + ')';
      g.fillStyle = A(0.03); g.fillRect(0, 0, W, H);
      const rr = (x, y, w, h, r) => { g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath(); };
      const cw = 132, chh = 106, gap = 14, x0 = 12, y0 = 8;
      let count = 0;
      for (let yy = y0; yy < H + chh; yy += chh + gap) for (let xx = x0; xx < W + cw; xx += cw + gap) {
        const id = Math.round(xx / (cw + gap)) * 31 + Math.round(yy / (chh + gap)) * 7;
        const wave = (((xx * 0.45 + yy * 0.55 - t * 250) % 1500) + 1500) % 1500, sel = wave < 300, rip = sel ? Math.min(1, (300 - wave) / 300) : -1;
        g.fillStyle = sel ? A(0.1) : 'rgba(233,231,224,0.45)'; rr(xx, yy, cw, chh, 11); g.fill();
        g.strokeStyle = sel ? A(0.7) : INK(0.15); g.lineWidth = sel ? 1.6 : 1.1; rr(xx, yy, cw, chh, 11); g.stroke();
        if (rip >= 0 && rip < 1) { g.save(); rr(xx, yy, cw, chh, 11); g.clip(); g.fillStyle = A(0.16 * (1 - rip)); g.beginPath(); g.arc(xx + cw * 0.5, yy + chh * 0.5, rip * cw, 0, 7); g.fill(); g.restore(); }
        const gx = xx + cw / 2, gy = yy + chh * 0.42, kind = ((id % 4) + 4) % 4, st = sel ? A(0.9) : INK(0.42);
        g.strokeStyle = st; g.lineWidth = 1.7; g.lineJoin = 'round';
        if (kind === 0) { rr(gx - 21, gy - 11, 42, 28, 4); g.stroke(); g.beginPath(); g.moveTo(gx - 21, gy - 11); g.lineTo(gx - 12, gy - 18); g.lineTo(gx - 2, gy - 11); g.stroke(); }
        else if (kind === 1) { rr(gx - 21, gy - 16, 42, 32, 4); g.stroke(); g.fillStyle = st; g.beginPath(); g.arc(gx - 9, gy - 5, 3.4, 0, 7); g.fill(); g.beginPath(); g.moveTo(gx - 19, gy + 13); g.lineTo(gx - 4, gy - 2); g.lineTo(gx + 5, gy + 6); g.lineTo(gx + 19, gy - 7); g.stroke(); }
        else if (kind === 2) { g.beginPath(); for (let b = 0; b < 8; b++) { const bh = 4 + Math.abs(Math.sin(t * 4 + b * 0.7 + id)) * 17; g.moveTo(gx - 21 + b * 6, gy + 9); g.lineTo(gx - 21 + b * 6, gy + 9 - bh); } g.stroke(); }
        else { rr(gx - 15, gy - 17, 30, 34, 3); g.stroke(); g.beginPath(); g.moveTo(gx - 9, gy - 9); g.lineTo(gx + 9, gy - 9); g.moveTo(gx - 9, gy - 2); g.lineTo(gx + 9, gy - 2); g.moveTo(gx - 9, gy + 5); g.lineTo(gx + 3, gy + 5); g.stroke(); }
        g.fillStyle = sel ? A(0.32) : INK(0.14); g.fillRect(xx + 14, yy + chh - 20, cw * 0.56, 5);
        const bx = xx + cw - 24, by = yy + 11;
        if (sel) { g.fillStyle = A(0.95); rr(bx, by, 14, 14, 4); g.fill(); g.strokeStyle = 'rgba(233,231,224,0.96)'; g.lineWidth = 1.9; g.beginPath(); g.moveTo(bx + 3, by + 7); g.lineTo(bx + 6, by + 10.5); g.lineTo(bx + 11, by + 3.5); g.stroke(); count++; }
        else { g.strokeStyle = INK(0.28); g.lineWidth = 1.3; rr(bx, by, 14, 14, 4); g.stroke(); }
      }
      g.lineJoin = 'miter';
      const pill = count + ' selected'; g.font = '600 12px ui-monospace, monospace'; const pw2 = g.measureText(pill).width + 34, pxp = W / 2 - pw2 / 2, pyp = 58;
      g.fillStyle = A(0.92); rr(pxp, pyp, pw2, 26, 13); g.fill();
      g.fillStyle = 'rgba(233,231,224,0.97)'; g.beginPath(); g.arc(pxp + 14, pyp + 13, 4, 0, 7); g.fill();
      g.textAlign = 'left'; g.fillText(pill, pxp + 24, pyp + 17);
      const fr = 28, fxp = W - 62, fyp = H - 62; g.fillStyle = A(0.95); g.beginPath(); g.arc(fxp, fyp, fr, 0, 7); g.fill();
      g.strokeStyle = 'rgba(233,231,224,0.97)'; g.lineWidth = 2.4; g.lineJoin = 'round'; g.beginPath(); g.moveTo(fxp - 9, fyp); g.lineTo(fxp - 3, fyp + 7); g.lineTo(fxp + 10, fyp - 8); g.stroke();
      const pr = (t * 0.8) % 1; g.strokeStyle = A(0.3 * (1 - pr)); g.lineWidth = 2; g.beginPath(); g.arc(fxp, fyp, fr + pr * 18, 0, 7); g.stroke();
      g.textAlign = 'left'; g.lineJoin = 'miter';
    }
  }

  return () => {
    cancelAnimationFrame(raf);
    clearInterval(ci);
    window.removeEventListener('resize', resize);
    window.removeEventListener('pointermove', onMove);
    document.body.style.cursor = '';
  };
}
