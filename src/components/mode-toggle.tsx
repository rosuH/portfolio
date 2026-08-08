"use client";

import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const THEME_FADE_MS = 420;

/**
 * Theme control.
 * Icon visibility is pure CSS (`dark:`) so it swaps with `html.dark`.
 * On click we mark `html.theme-animating` so CSS can fade bg/ink/moon.
 *
 * Convention: moon in light (click → dark), sun in dark (click → light).
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
        <SunIcon
          className={cn(
            "absolute size-4",
            "scale-75 rotate-90 opacity-0",
            "transition-[opacity,transform] duration-300 ease-out",
            "dark:scale-100 dark:rotate-0 dark:opacity-100",
          )}
          aria-hidden
        />
        <MoonIcon
          className={cn(
            "absolute size-4",
            "scale-100 rotate-0 opacity-100",
            "transition-[opacity,transform] duration-300 ease-out",
            "dark:scale-75 dark:-rotate-90 dark:opacity-0",
          )}
          aria-hidden
        />
      </span>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
