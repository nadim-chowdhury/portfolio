"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { siteConfig } from "@/lib/data";

const MIN_DURATION = 320; // ms minimum visible to prevent visual flash on instant route shifts
const SAFETY_TIMEOUT = 3500; // ms max before auto-dismissing if navigation stalls

export function triggerRouteSplash(targetPath?: string) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("app:route-transition", { detail: { targetPath } }),
    );
  }
}

export function RouteSplashScreen() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [targetLabel, setTargetLabel] = useState("SWITCHING ROUTE···");
  const startTimeRef = useRef<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const safetyRef = useRef<NodeJS.Timeout | null>(null);
  const isNavigatingRef = useRef(false);

  const getLabelForPath = (path: string) => {
    if (path.includes("terminal")) return "INITIALIZING TERMINAL···";
    if (path === "/" || path === "") return "RETURNING TO PORTFOLIO···";
    return "SWITCHING ROUTE···";
  };

  const startTransition = useCallback((targetPath?: string) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (safetyRef.current) clearTimeout(safetyRef.current);

    startTimeRef.current = Date.now();
    isNavigatingRef.current = true;
    setTargetLabel(getLabelForPath(targetPath || ""));
    setIsLoading(true);

    // Safety fallback
    safetyRef.current = setTimeout(() => {
      setIsLoading(false);
      isNavigatingRef.current = false;
    }, SAFETY_TIMEOUT);
  }, []);

  const endTransition = useCallback(() => {
    if (!isNavigatingRef.current) return;
    isNavigatingRef.current = false;

    const elapsed = Date.now() - startTimeRef.current;
    const remaining = Math.max(0, MIN_DURATION - elapsed);

    timerRef.current = setTimeout(() => {
      setIsLoading(false);
    }, remaining);
  }, []);

  // Detect pathname changes to complete navigation
  useEffect(() => {
    if (isNavigatingRef.current) {
      endTransition();
    }
  }, [pathname, endTransition]);

  // Global listeners: internal link clicks, custom events, popstate
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Ignore external, anchors, mailto, tel, target _blank, modifier keys, downloads
      if (
        anchor.target === "_blank" ||
        anchor.hasAttribute("download") ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("javascript:") ||
        e.ctrlKey ||
        e.metaKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }

      try {
        const targetUrl = new URL(href, window.location.href);
        if (targetUrl.origin === window.location.origin) {
          const currentPath = window.location.pathname;
          const targetPath = targetUrl.pathname;
          if (currentPath !== targetPath) {
            startTransition(targetPath);
          }
        }
      } catch {
        // invalid URL ignore
      }
    };

    const handleCustomTransition = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      startTransition(detail?.targetPath);
    };

    const handlePopState = () => {
      startTransition(window.location.pathname);
    };

    document.addEventListener("click", handleAnchorClick, { capture: true });
    window.addEventListener("app:route-transition", handleCustomTransition);
    window.addEventListener("popstate", handlePopState);

    return () => {
      document.removeEventListener("click", handleAnchorClick, {
        capture: true,
      });
      window.removeEventListener("app:route-transition", handleCustomTransition);
      window.removeEventListener("popstate", handlePopState);
      if (timerRef.current) clearTimeout(timerRef.current);
      if (safetyRef.current) clearTimeout(safetyRef.current);
    };
  }, [startTransition]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="route-splash-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999999,
            backgroundColor: "rgba(9, 10, 14, 0.88)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "all",
          }}
        >
          {/* Top linear progress bar */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 2,
              backgroundColor: "rgba(255, 255, 255, 0.06)",
              overflow: "hidden",
            }}
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{
                repeat: Infinity,
                duration: 1.05,
                ease: "easeInOut",
              }}
              style={{
                width: "45%",
                height: "100%",
                background:
                  "linear-gradient(90deg, transparent, #00D4AA, transparent)",
              }}
            />
          </div>

          {/* Centered Minimal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -4 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 14,
              userSelect: "none",
            }}
          >
            {/* Minimal Brand Emblem */}
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: -4,
                  borderRadius: "50%",
                  background: "rgba(0, 212, 170, 0.15)",
                  filter: "blur(12px)",
                }}
              />
              <div
                style={{
                  position: "relative",
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  background: "rgba(18, 18, 22, 0.75)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={siteConfig.logo}
                  alt="Nadim Logo"
                  width={34}
                  height={34}
                  className="rounded-full object-cover"
                  priority
                />
              </div>
            </div>

            {/* Subtle route status */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginTop: 2,
              }}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: "#00D4AA",
                  boxShadow: "0 0 8px #00D4AA",
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  fontFamily:
                    "var(--font-geist-mono), ui-monospace, SFMono-Regular, monospace",
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  color: "#9A9AA0",
                  fontWeight: 500,
                }}
              >
                {targetLabel}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
