import { Suspense, lazy, useEffect, useState } from "react";

const HeroScene = lazy(() => import("./HeroScene"));

/**
 * Client-only 3D hero object. Never renders on the server, and stays out
 * of the way for users who prefer reduced motion.
 */
export function HeroObject() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setReady(true);
  }, []);

  if (!ready) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute top-1/2 right-[-14%] hidden h-[38rem] w-[38rem] -translate-y-1/2 opacity-80 lg:block xl:right-[-6%]"
    >
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>
    </div>
  );
}
