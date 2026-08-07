"use client";

/**
 * Photo Bayer dither: top-left cloud + bottom-right palm/sea.
 * Pre-baked WebP frames, ring-buffered ImageBitmaps, rAF only while visible.
 */
import { useEffect, useRef } from "react";

const N = 36;
const FPS = 12;
const RING = 2;
const CLOUD = { w: 720, h: 573, dir: "/dither/cloud" };
const TREE = { w: 1920, h: 670, dir: "/dither/tree" };

const pad = (i: number) => String(i).padStart(2, "0");
const frameUrl = (dir: string, i: number) => `${dir}/frame-${pad(i)}.webp`;

async function loadBitmap(url: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(url);
  return createImageBitmap(await res.blob());
}

type Cache = Map<number, ImageBitmap>;
type Loading = Map<number, Promise<ImageBitmap | null>>;

function makeRing() {
  const cache: Cache = new Map();
  const loading: Loading = new Map();

  const ensure = (dir: string, idx: number) => {
    const hit = cache.get(idx);
    if (hit) return Promise.resolve(hit);
    const pending = loading.get(idx);
    if (pending) return pending;
    const p = loadBitmap(frameUrl(dir, idx))
      .then((bm) => {
        loading.delete(idx);
        cache.set(idx, bm);
        return bm;
      })
      .catch(() => {
        loading.delete(idx);
        return null;
      });
    loading.set(idx, p);
    return p;
  };

  const trim = (center: number) => {
    for (const [k, bm] of cache) {
      if (Math.abs(k - center) > RING) {
        bm.close();
        cache.delete(k);
      }
    }
  };

  const warm = (dir: string, center: number) => {
    const jobs: Promise<ImageBitmap | null>[] = [];
    for (let d = -RING; d <= RING; d++) {
      const idx = center + d;
      if (idx >= 0 && idx < N) jobs.push(ensure(dir, idx));
    }
    trim(center);
    return Promise.all(jobs);
  };

  const get = (idx: number) => cache.get(idx);
  const clear = () => {
    for (const bm of cache.values()) bm.close();
    cache.clear();
    loading.clear();
  };

  return { ensure, warm, get, clear };
}

export default function DitherScene() {
  const cloudRef = useRef<HTMLCanvasElement>(null);
  const treeRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cloudEl = cloudRef.current;
    const treeEl = treeRef.current;
    if (!cloudEl || !treeEl) return;

    const cctx = cloudEl.getContext("2d", { alpha: true });
    const tctx = treeEl.getContext("2d", { alpha: true });
    if (!cctx || !tctx) return;
    cctx.imageSmoothingEnabled = false;
    tctx.imageSmoothingEnabled = false;

    const cloud = makeRing();
    const tree = makeRing();
    let cancelled = false;
    let raf = 0;
    let i = 0;
    let dir = 1;
    let last = 0;
    const dt = 1000 / FPS;

    const paint = (cb: ImageBitmap, tb: ImageBitmap) => {
      cctx.clearRect(0, 0, CLOUD.w, CLOUD.h);
      cctx.drawImage(cb, 0, 0);
      tctx.clearRect(0, 0, TREE.w, TREE.h);
      tctx.drawImage(tb, 0, 0);
    };

    const paintIfReady = (idx: number) => {
      const cb = cloud.get(idx);
      const tb = tree.get(idx);
      if (cb && tb) paint(cb, tb);
    };

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      Promise.all([
        loadBitmap("/dither/cloud.webp"),
        loadBitmap("/dither/tree.webp"),
      ]).then(([c, t]) => {
        if (!cancelled) paint(c, t);
      });
      return () => {
        cancelled = true;
      };
    }

    const tick = (ts: number) => {
      if (cancelled) return;
      if (ts - last >= dt) {
        last = ts;
        i += dir;
        if (i >= N - 1) {
          i = N - 1;
          dir = -1;
        } else if (i <= 0) {
          i = 0;
          dir = 1;
        }
        paintIfReady(i);
        void Promise.all([cloud.warm(CLOUD.dir, i), tree.warm(TREE.dir, i)]).then(
          () => {
            if (!cancelled) paintIfReady(i);
          },
        );
      }
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (!cancelled && !raf) raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);

    Promise.all([
      cloud.ensure(CLOUD.dir, 0),
      tree.ensure(TREE.dir, 0),
    ])
      .then(([c0, t0]) => {
        if (!cancelled && c0 && t0) paint(c0, t0);
        return Promise.all([cloud.warm(CLOUD.dir, 0), tree.warm(TREE.dir, 0)]);
      })
      .then(() => {
        if (!cancelled && !document.hidden) start();
      })
      .catch(() => {
        Promise.all([
          loadBitmap("/dither/cloud.webp"),
          loadBitmap("/dither/tree.webp"),
        ]).then(([c, t]) => {
          if (!cancelled) paint(c, t);
        });
      });

    return () => {
      cancelled = true;
      stop();
      document.removeEventListener("visibilitychange", onVis);
      cloud.clear();
      tree.clear();
    };
  }, []);

  return (
    <div
      aria-hidden
      className="dither-scene"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <canvas
        ref={cloudRef}
        className="dither-cloud"
        width={CLOUD.w}
        height={CLOUD.h}
        style={{
          position: "absolute",
          top: "-6%",
          left: "-8%",
          width: "min(62vw, 760px)",
          height: "auto",
          aspectRatio: `${CLOUD.w} / ${CLOUD.h}`,
          opacity: 0.92,
          imageRendering: "pixelated",
        }}
      />
      <canvas
        ref={treeRef}
        className="dither-tree"
        width={TREE.w}
        height={TREE.h}
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          height: "min(72vh, 700px)",
          width: "auto",
          aspectRatio: `${TREE.w} / ${TREE.h}`,
          opacity: 0.88,
          imageRendering: "pixelated",
        }}
      />
      <style>{`
        @media (max-width: 720px) {
          .dither-scene .dither-cloud {
            width: 85vw !important;
            left: -12% !important;
          }
          .dither-scene .dither-tree {
            height: 52vh !important;
          }
        }
      `}</style>
    </div>
  );
}
