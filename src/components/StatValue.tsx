import { useEffect, useRef, useState } from "react";

function splitValue(value: string) {
  const match = value.match(/^(\D*)(\d+)(.*)$/);
  if (!match) return { prefix: "", target: 0, suffix: value };
  return { prefix: match[1] ?? "", target: Number(match[2]), suffix: match[3] ?? "" };
}

export function StatValue({ value }: { value: string }) {
  const ref = useRef<HTMLElement>(null);
  const [display, setDisplay] = useState(() => {
    const { prefix, suffix } = splitValue(value);
    return `${prefix}0${suffix}`;
  });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const { prefix, target, suffix } = splitValue(value);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      setDisplay(value);
      return;
    }

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        const startedAt = performance.now();
        const animate = (now: number) => {
          const progress = Math.min((now - startedAt) / 1200, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(`${prefix}${Math.round(target * eased)}${suffix}`);
          if (progress < 1) frame = requestAnimationFrame(animate);
        };
        frame = requestAnimationFrame(animate);
        observer.disconnect();
      },
      { threshold: 0.4 },
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return <dt ref={ref} className="font-display text-2xl font-semibold text-primary">{display}</dt>;
}