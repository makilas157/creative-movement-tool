import { useEffect, useRef } from "react";

/**
 * Subtle dot-grid backdrop with a soft glow that follows the cursor.
 * Purely decorative — pointer events pass through.
 */
export function CursorGrid({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      el.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };

    const onPointerOver = (e: PointerEvent) => {
      if ((e.target as Element | null)?.closest(".catalog-card, .depth-card, .social-card")) {
        el.dataset.energized = "true";
      }
    };

    const onPointerOut = (e: PointerEvent) => {
      const next = e.relatedTarget as Element | null;
      if (!next?.closest?.(".catalog-card, .depth-card, .social-card")) {
        delete el.dataset.energized;
      }
    };

    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerover", onPointerOver);
    document.addEventListener("pointerout", onPointerOut);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerout", onPointerOut);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className={`cursor-grid pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ "--mx": "50%", "--my": "50%" } as React.CSSProperties}
    >
      <div
        className="cursor-grid-dots absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, oklch(0.72 0.16 70 / 0.35) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage:
            "radial-gradient(220px circle at var(--mx) var(--my), black 0%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(220px circle at var(--mx) var(--my), black 0%, transparent 75%)",
        }}
      />
      <div
        className="cursor-grid-glow absolute inset-0"
        style={{
          background:
            "radial-gradient(320px circle at var(--mx) var(--my), oklch(0.68 0.19 40 / 0.1), transparent 70%)",
        }}
      />
    </div>
  );
}
