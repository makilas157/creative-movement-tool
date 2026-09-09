# Tevexxo Motion

https://github.com/makilas157/tevexxo-studio-build.git  Tevexxo — Lovable Follow-up Prompt (Animation & Effects Pass)

Paste this into the same Lovable project (as a follow-up/edit prompt — do NOT ask it to rebuild the site, only enhance it).

Enhance the existing Tevexxo site with a polished animation and micro-interaction layer. Keep the current structure, pages, copy, and color system (dark charcoal + amber/gold + burnt-orange accent) exactly as they are — this is a visual polish pass, not a redesign.

1. Page load

On first load, hero elements (eyebrow tag → headline → sub-paragraph → CTA buttons → stat row) should stagger in with a subtle fade-up (opacity 0→1, translateY 12px→0), each delayed ~80–100ms after the previous.

Navbar fades/slides down into place on load.

2. Scroll-reveal

Every major section (Services preview, Products preview, Social/connect band, and all content blocks on Services/Products/Projects/Why Us/About/Blogs/Contact) should fade up + slightly scale in (0.98→1) as it enters the viewport, using an IntersectionObserver-based reveal. Trigger once per element, ease-out, ~500ms.

Stagger the cards inside a grid (Services cards, Products cards, social cards) by ~60–80ms each so they cascade in rather than popping in together.

3. Cursor & hover

Keep the existing cursor-grid background and cursor-spider — but add: when hovering over any card (catalog-card, depth-card, social card), the cursor-grid glow underneath should intensify slightly (brighter accent glow) to reinforce the "energized" feel.

Cards: on hover, lift (translateY -4 to -6px), border transitions to accent color, soft accent-tinted shadow grows in — animate with a spring/ease, not linear.

Buttons: primary buttons get a subtle shimmer sweep (a soft diagonal light band moving left→right) on hover; the arrow icon shifts right ~4px on hover for both primary and outline buttons.

4. Section tags

The small "eyebrow" section tags (uppercase, accent-colored, pulsing dot before them) — make the dot a genuine soft pulse (scale 1→1.3, opacity 1→0.5, ~1.5s loop) rather than static.

5. Stat row (Home hero)

Numbers in the stat row (120+ Projects, 40+ Clients, etc.) should count up from 0 to their final value when the hero enters the viewport, over ~1.2s, ease-out.

6. Nav & mobile menu

Mobile hamburger menu: slide/fade down as a smooth panel, not an instant toggle. Links inside stagger in slightly.

Active nav link gets a small animated underline that slides in from the left.

7. Forms (Contact page)

Input fields get a subtle accent-colored focus ring transition (not an abrupt snap).

Submit button shows a brief loading/success state animation (spinner → checkmark) instead of an instant static change.

Guardrails

Keep all animations subtle and fast (150–600ms range) — this is a premium/professional tech studio, not a playful consumer app.

Respect prefers-reduced-motion: disable/simplify scroll-reveal, count-up, and shimmer effects for users with that setting on.

Do not change page structure, routes, copy, or the color/typography system — this prompt only adds motion and interaction polish to what already exists.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/83e8f081-3771-453a-991c-c976db9e56a2).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
