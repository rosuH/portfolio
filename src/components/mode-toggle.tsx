"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const THEME_FADE_MS = 420;

/** 16×16 Bayer-style pixel sun (shown in dark mode). */
function DitherSunIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      shapeRendering="crispEdges"
      aria-hidden
    >
      <rect x="7" y="0" width="2" height="2" />
      <rect x="7" y="14" width="2" height="2" />
      <rect x="0" y="7" width="2" height="2" />
      <rect x="14" y="7" width="2" height="2" />
      <rect x="2" y="2" width="2" height="2" />
      <rect x="12" y="2" width="2" height="2" />
      <rect x="2" y="12" width="2" height="2" />
      <rect x="12" y="12" width="2" height="2" />
      <rect x="5" y="4" width="2" height="2" />
      <rect x="9" y="4" width="2" height="2" />
      <rect x="4" y="5" width="2" height="2" />
      <rect x="7" y="5" width="2" height="2" />
      <rect x="10" y="5" width="2" height="2" />
      <rect x="5" y="6" width="2" height="2" />
      <rect x="9" y="6" width="2" height="2" />
      <rect x="4" y="7" width="2" height="2" />
      <rect x="7" y="7" width="2" height="2" />
      <rect x="10" y="7" width="2" height="2" />
      <rect x="5" y="8" width="2" height="2" />
      <rect x="9" y="8" width="2" height="2" />
      <rect x="4" y="9" width="2" height="2" />
      <rect x="7" y="9" width="2" height="2" />
      <rect x="10" y="9" width="2" height="2" />
      <rect x="5" y="10" width="2" height="2" />
      <rect x="9" y="10" width="2" height="2" />
    </svg>
  );
}

/** 16×16 Bayer-style pixel moon crescent (shown in light mode). */
function DitherMoonIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      shapeRendering="crispEdges"
      aria-hidden
    >
      <rect x="8" y="2" width="2" height="2" />
      <rect x="10" y="2" width="2" height="2" />
      <rect x="6" y="3" width="2" height="2" />
      <rect x="11" y="3" width="2" height="2" />
      <rect x="5" y="4" width="2" height="2" />
      <rect x="12" y="4" width="2" height="2" />
      <rect x="4" y="5" width="2" height="2" />
      <rect x="12" y="5" width="2" height="2" />
      <rect x="4" y="6" width="2" height="2" />
      <rect x="13" y="6" width="2" height="2" />
      <rect x="4" y="7" width="2" height="2" />
      <rect x="13" y="7" width="2" height="2" />
      <rect x="4" y="8" width="2" height="2" />
      <rect x="13" y="8" width="2" height="2" />
      <rect x="4" y="9" width="2" height="2" />
      <rect x="12" y="9" width="2" height="2" />
      <rect x="5" y="10" width="2" height="2" />
      <rect x="12" y="10" width="2" height="2" />
      <rect x="6" y="11" width="2" height="2" />
      <rect x="11" y="11" width="2" height="2" />
      <rect x="8" y="12" width="2" height="2" />
      <rect x="10" y="12" width="2" height="2" />
      <rect x="9" y="4" width="2" height="2" />
      <rect x="10" y="6" width="2" height="2" />
      <rect x="10" y="8" width="2" height="2" />
      <rect x="9" y="10" width="2" height="2" />
    </svg>
  );
}

/**
 * Theme control.
 * Icon visibility is pure CSS (`dark:`) so it swaps with `html.dark`.
 * On click we mark `html.theme-animating` so CSS can fade bg/ink/moon.
 *
 * Convention: moon in light (click → dark), sun in dark (click → light).
 * Icons match blog: 16×16 Bayer dither pixels, no drop shadow on the control.
 */
export function ModeToggle({ className }: { className?: string }) {
  const { setTheme } = useTheme();

  return (
    <Button
      type="button"
      variant="link"
      size="icon"
      className={cn("relative overflow-hidden", className)}
      aria-label="Toggle light and dark mode"
      title="Toggle light and dark mode"
      onClick={() => {
        const root = document.documentElement;
        const isDark = root.classList.contains("dark");
        const reduce = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;

        if (!reduce) {
          root.classList.add("theme-animating");
          window.setTimeout(() => {
            root.classList.remove("theme-animating");
          }, THEME_FADE_MS);
        }

        setTheme(isDark ? "light" : "dark");
      }}
    >
      {/* Fixed slot: both icons always absolute — opacity crossfade + slight rotate */}
      <span className="relative inline-flex size-4 items-center justify-center">
        <DitherSunIcon
          className={cn(
            "absolute size-4",
            "scale-75 rotate-90 opacity-0",
            "transition-[opacity,transform] duration-300 ease-out",
            "dark:scale-100 dark:rotate-0 dark:opacity-100",
            "[image-rendering:pixelated]",
          )}
        />
        <DitherMoonIcon
          className={cn(
            "absolute size-4",
            "scale-100 rotate-0 opacity-100",
            "transition-[opacity,transform] duration-300 ease-out",
            "dark:scale-75 dark:-rotate-90 dark:opacity-0",
            "[image-rendering:pixelated]",
          )}
        />
      </span>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
