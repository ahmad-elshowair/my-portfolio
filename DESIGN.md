# Design System Tokens & Guidelines: Ahmad Elshowair Portfolio

## Color Strategy
- **Strategy**: Restrained, luxury technical aesthetic rooted in nature and precision engineering.
- **Background**: `#2c3531` (`bgGreen` — deep forest slate neutral).
- **Primary Brand / Accent**: `#8DA55B` (`mainGreen` — refined olive moss green, used for active highlights, focus rings, and glowing borders).
- **Primary Body & Contrast Text**: `#F5E6D3` (`beige` — warm parchment contrast neutral).
- **Secondary Neutral**: `rgba(245, 230, 211, 0.7)` (`beige/70` for metadata and secondary descriptions, maintaining ≥ 4.5:1 contrast).

## Surface Elevation & Glassmorphism (Article IX v1.2.0)
- **Signature Surface**: Glassmorphic panels with backdrop filter:
  - Standard Card: `bg-mainGreen/10 border border-beige/15 backdrop-blur-md rounded-2xl`
  - Active / Highlighted Card: `bg-mainGreen/25 border-mainGreen shadow-[0_0_15px_rgba(141,165,91,0.25)]`
  - Dark Deck / Terminal Surface: `bg-bgGreen/85 border border-beige/20 backdrop-blur-md`
- **Ambient Lighting**: Soft radial green glows (`bg-mainGreen/20 blur-[20px]`) behind section headings and focal interactive elements.
- **Rule**: All glass fills and glow effects must derive exclusively from the 3 palette tokens.

## Typography
- **Headings & Display**: `Inika`, serif/display, font-bold (`text-mainGreen`).
- **Body & Interface**: `Geist` / sans-serif, leading-relaxed (`text-beige`).
- **Terminal & CLI Code**: Monospace, clean font-mono (`text-beige/90`).
- **Scale**: Strict hierarchy with ≥ 1.25 ratio between steps; body line-length capped at 65–75ch.

## Motion & Micro-Interactions (Article VI & IX)
- **Scale Tokens**: Scale on hover strictly capped at `scale ≤ 1.05`.
- **Duration**: `150ms – 250ms` with smooth exponential easing (`ease-out`).
- **Reduced Motion (Non-Negotiable)**: All animations, spring physics, and orbital rotations must respect `prefers-reduced-motion` with immediate static fallbacks.
- **GPU Composited**: Animations restricted to `transform` and `opacity` only; no animating layout properties.

## Mobile Ergonomics
- Layouts verified down to 390px viewport width.
- Minimum interactive touch targets: `44px × 44px`.
- Zero horizontal layout shift (CLS < 0.1).
