import { Suspense, lazy, useEffect, useRef, useState } from "react";

const HeroScene = lazy(() => import("./HeroScene"));

/**
 * Client-only 3D hero object. Never renders on the server, and stays out
 * of the way for users who prefer reduced motion.
 */
export function HeroObject() {
  const [ready, setReady] = useState(false);
  const [entered, setEntered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const t = window.setTimeout(() => setEntered(true), 420);
    return () => window.clearTimeout(t);
  }, [ready]);

  // very subtle scroll drift + fade so the object stays tied to the hero
  useEffect(() => {
    if (!ready) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const p = Math.min(window.scrollY / Math.max(window.innerHeight * 0.9, 1), 1);
      el.style.setProperty("--hero3d-drift", `${(p * 36).toFixed(2)}px`);
      el.style.setProperty("--hero3d-scroll-opacity", `${(1 - p).toFixed(3)}`);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ready]);

  if (!ready) return null;

  return (
    <div
      aria-hidden
      ref={ref}
      style={{
        opacity: entered ? 0.8 * Number(1) : 0,
        transition: "opacity 900ms cubic-bezier(0.16,1,0.3,1), transform 900ms cubic-bezier(0.16,1,0.3,1)",
        transform: `translateY(calc(-50% + var(--hero3d-drift, 0px))) scale(${entered ? 1 : 0.85})`,
      }}
      className="hero-3d pointer-events-none absolute top-1/2 right-[-14%] hidden h-[38rem] w-[38rem] lg:block xl:right-[-6%]"
    >
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>
    </div>
  );
}
