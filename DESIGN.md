---
name: "Raúl Morales — Portfolio"
description: "Adelante — a neo-brutalist editorial portfolio: teal + green + neon + amber on cream or deep-teal surfaces, Fraunces display type, 3px borders, hard offset shadows, dark by default."
colors:
  canvas-light: "#faf3e0"
  ink-light: "#004242"
  card-light: "#ffffff"
  canvas-dark: "#001515"
  ink-dark: "#faf3e0"
  card-dark: "#002b2b"
  teal: "#004242"
  green: "#24c87f"
  neon: "#00ff8d"
  amber: "#ffc233"
  cream: "#faf3e0"
typography:
  display:
    fontFamily: '"Fraunces", Georgia, serif'
    fontWeight: 800
    lineHeight: 0.88
    letterSpacing: "-0.01em"
  body:
    fontFamily: '"Work Sans", system-ui, sans-serif'
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
  numeral:
    fontFamily: '"Clash Display", "Work Sans", sans-serif'
    fontWeight: 600
  label:
    fontFamily: '"Work Sans", system-ui, sans-serif'
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1.5
    letterSpacing: "0.18em"
rounded:
  none: "0px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "40px"
  section: "80px"
components:
  button:
    backgroundColor: "{colors.canvas-light}"
    textColor: "{colors.ink-light}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "12px 24px"
    border: "3px solid {colors.ink-light}"
    shadow: "5px 5px 0 {colors.ink-light}"
  button-solid:
    backgroundColor: "{colors.green}"
    textColor: "{colors.teal}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "12px 24px"
    border: "3px solid {colors.ink-light}"
    shadow: "5px 5px 0 {colors.ink-light}"
  card:
    backgroundColor: "{colors.card-light}"
    textColor: "{colors.ink-light}"
    rounded: "{rounded.none}"
    padding: "24px"
    border: "3px solid {colors.ink-light}"
    shadow: "5px 5px 0 {colors.ink-light}"
  chip:
    backgroundColor: "{colors.canvas-light}"
    textColor: "{colors.ink-light}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "4px 14px"
    border: "3px solid {colors.ink-light}"
---

# Design System: Raúl Morales — Portfolio ("Adelante")

## Overview

**Creative North Star: "Adelante" — neo-brutalismo editorial.**

Bold, confident, print-inspired. The page is an editorial spread where ink and paper meet the terminal: a deep **teal** voice on **cream** paper (light theme) or cream ink on **deep teal** paper (dark theme, the default), punctuated by a small, fixed palette of living accents — **green**, **neon**, **amber**. Nothing is subtle by accident: 3px borders, zero corner radius, hard offset shadows that press like a key, uppercase buttons, serif display type set tight (line-height 0.88), and hand-drawn amber underlines on the words that matter.

The composition is loud but disciplined: numbered sections that read like a magazine's table of contents, a 7-tile mosaic band as the signature ornament, diamond patterns on the dark contact panel, and a "ficha" (spec card) that lays the facts out plainly. Motion is mechanical, not ambient — buttons press in (translate + shadow collapse), sections fade up once on load. The restraint lives in the system, not in the volume: four accents, three type voices, one border weight, one shadow recipe.

**Key Characteristics:**

- Four fixed accents (teal, green, neon, amber) on two surface themes (cream / deep teal); accents never change between themes
- Three type voices, all self-hosted: Fraunces (display), Work Sans (body + labels), Clash Display (numerals)
- 3px borders as the only structural device; **zero border-radius anywhere**
- Hard offset shadows (`5px 5px 0`) — depth is a solid block, never a blur
- Uppercase buttons with a press interaction (hover: 2px in; active: 5px in, shadow gone)
- Dark theme by default; one-click toggle to cream, persisted in `localStorage`
- Progressive enhancement: content is visible with JS off; the fade-up is a CSS-only extra

## Colors

Two themes, one design. The surfaces (canvas, ink, cards) swap with the theme; the four accents are **invariant** — the same green, neon, amber, teal in both worlds.

### Light theme (cream) — `:root`

- **Canvas** (#faf3e0): the cream paper; page background and the "on-ink" text color.
- **Ink** (#004242): the deep teal; primary text, all borders, the hard-shadow color, solid chips.
- **Card** (#ffffff): card surfaces.
- **Card soft** (#faf3e0): alternative card surface and chips (cream on white).
- **Panel** (#004242 / #003030): the dark contact section and footer — teal on cream, with cream text.

### Dark theme (default) — `html[data-theme="dark"]`

- **Canvas** (#001515): near-black teal; the page background.
- **Ink** (#faf3e0): cream; primary text, borders, and now the hard-shadow color.
- **Card** (#002b2b): raised teal surface.
- **Card soft** (#002222): alternative surface and chips.
- **Panel** (#002b2b / #001515): contact and footer blend into the canvas, separated by the neon top rule.
- **On-accent** (#001515): text on green/amber/neon buttons (dark ink instead of cream).

### Accents (invariant between themes)

- **Teal** (#004242): the structural voice — borders, ink (light theme), solid fills in the mosaic.
- **Green** (#24c87f): the primary action accent — solid buttons, the "RM" monogram, the Ficha card, highlight marks in prose.
- **Neon** (#00ff8d): the loudest accent — the contact CTA, the contact-section eyebrow, the footer rule, hover fills in the dark panel.
- **Amber** (#ffc233): the editorial accent — hand underlines, the "featured" chip, year chips, the theme-toggle hover, focus outlines.

### Named Rules

**The Two-Themes-One-Design Rule.** `data-theme` swaps only the surface tokens (canvas, ink, card, shadow, panel). The four accents and every component recipe stay identical; a screenshot of the green button is the same screenshot in both themes.

**The Dark-By-Default Rule.** The site ships `data-theme="dark"` on `<html>`. The pre-paint inline script only overrides it if `localStorage["at-theme"]` says otherwise — so first visit is dark, and the choice persists.

## Typography

**Display Font:** Fraunces (self-hosted woff2, `public/fuentes/`) — a high-contrast serif with a workhouse weight (800) and a real italic.
**Body Font:** Work Sans (self-hosted woff2) — the workhorse for prose, labels, buttons, chips.
**Numeral Font:** Clash Display (self-hosted woff2) — the geometric voice for numbers: section indices (`01.`–`07.`), dates, years, the `ES · EN` tag.

**Character:** Three voices, each with one job. Fraunces carries the name, the role line, and every heading — set at weight 800 with a tight 0.88 line-height and −0.01em tracking, so the serif reads as a solid block, not a book. Work Sans carries all prose (1.125rem, 1.625) and the small uppercase labels (0.75rem, 0.18em tracking). Clash Display carries only numerals — it is never used for words. All three are self-hosted variable woff2 files (weight 100–900, `font-display: swap`); no CDN, no external request.

> **Exception to the old "no webfont" rule.** The archived "Terminal Garden" design forbade webfonts. Adelante is the deliberate exception: the serif display is the identity, and self-hosting keeps it fast and private.

### Hierarchy

- **Display** (Fraunces 800, `clamp(3.25rem, 9vw, 7rem)`, 0.88): the name, hero only.
- **Headline** (Fraunces 600 italic, `clamp(1.75rem, 4vw, 3rem)`, 0.88): the role line beneath the name, with an amber hand-underline on the first word.
- **Title** (Fraunces 800, 1.5rem–3rem, 0.88): section and card headings.
- **Body** (Work Sans 400, 1rem–1.125rem, 1.5–1.625): prose; capped at `max-w-xl`/`max-w-2xl` in hero, contact, and featured projects.
- **Label** (Work Sans 700, 0.75rem, 0.18em, uppercase): eyebrows, nav links, buttons, `dt` labels.
- **Numeral** (Clash Display 600): section numbers, dates, years, counts.

### Named Rules

**The Three Voices Rule.** Serif for display, sans for words, geometric for numbers. A numeral never appears in Fraunces; a word never appears in Clash Display.

## Layout

One column of sections, wider than the archived design: every section is a `max-w-6xl` (1152px) centered container with 16px gutters and 64–80px vertical rhythm (`py-16`/`py-20`). The hero and the featured project are the two full-width moments; everything else is a grid.

Grids are bold and mobile-first:

- **Hero:** `3fr / 2fr` at `lg` — copy + actions on the left; the portrait card (with `raulmorales.eu` + `ES · EN` chips) stacked over the 7-tile mosaic band on the right.
- **About:** `2fr / 1fr` at `md` — prose on the left, the green **Ficha** spec-card on the right.
- **Skills:** 2-up at `sm`; odd cards get the cream surface for a checkerboard rhythm.
- **Projects:** the featured project is a full-width card crowned by the mosaic band; the rest are 3-up at `md`, with the middle card in amber as the visual anchor.
- **Experience / Education:** rows with a fixed `10rem` period column (amber chip for experience, plain chip for education).
- **Certifications:** 2-up at `sm`, 3-up at `lg`.
- **Contact:** full-bleed dark panel (diamond pattern), centered `max-w-4xl`.
- **Nav:** sticky, full-width, 3px bottom border; all 7 section links appear at `lg`, the name at `xl`.

## Elevation & Depth

**Hard shadow, no blur.** Every raised surface carries a solid offset shadow — `5px 5px 0` in the theme's ink color (teal on cream, cream on teal). There is no `box-shadow` with a blur radius anywhere in the system; depth is a block you can see the edge of.

### Shadow & Motion Vocabulary

- **Resting shadow** (`5px 5px 0 var(--at-shadow)`): cards, buttons, chips, the mosaic band, timeline rows.
- **Hover press** (`translate(2px, 2px)` + `3px 3px 0`): the button sinks halfway toward its shadow.
- **Active press** (`translate(5px, 5px)` + `0 0 0`): the button reaches the shadow and it disappears — a mechanical "click".
- **Reveal** (`at-fade-up`, 650ms ease): sections fade up 16px on load — CSS-only, gated on `<html class="js">`, disabled under `prefers-reduced-motion`.

### Named Rules

**The Hard-Shadow Rule.** Shadows are solid, offset, and unblurred. A blurred shadow or a resting `box-shadow` on non-raised elements is outside the system.

**The Press Rule.** Interactive elements respond with translation, not color: hover moves 2px, active moves 5px and kills the shadow. Color changes (amber hover on nav links, neon hover in the dark panel) are secondary.

## Shapes

One geometry: **the square.** `border-radius` is not used anywhere in the system — buttons, cards, chips, the portrait frame, the email pill, all 0px. Structure is drawn with 3px borders (the theme's ink color); the only other lines are the 3px eyebrow rules, the 3px nav bottom border, and the 3px neon footer rule.

The two soft ornaments are patterns, not shapes:

- **The 7-tile mosaic** (`.at-tiles`): a 7-column grid of hand-drawn SVG tiles (plus, rhombus, zigzag, circle, cross, wave, checker) on a 3px gap of the canvas color, framed by a 3px border and a hard shadow. It crowns the hero and the featured project; below 640px it collapses to 4 tiles.
- **The diamond field** (`.at-diamonds`): a `repeating-conic-gradient` of 7%-opacity neon diamonds on a 28px grid, used as the background of the contact section and the footer.

### Named Rules

**The No-Radius Rule.** If a corner is rounded, it does not belong in this design.

## Components

### Buttons (`.at-btn`)

- **Shape:** 0px radius; 3px ink border; uppercase Work Sans 800 at 0.9rem with 0.08em tracking; min-height 3.25rem; 12px × 24px padding; hard shadow.
- **Outline (default):** canvas background, ink text — the quiet option.
- **Solid (`.at-btn-solid`):** green background, teal text — the primary action (view projects, view project).
- **Amber (`.at-btn-amber`):** amber background — the email copy button.
- **Neon (`.at-btn-neon`):** neon background with a neon shadow — the contact CTA, the loudest button on the page.
- **Press:** hover 2px + 3px shadow; active 5px + no shadow (see Press Rule).
- **Focus:** 3px amber outline, 3px offset — visible in both themes.
- **Small variant:** `!min-h-11 !py-2 !px-4 !text-xs` for nav, cards, and the email pill.

### Cards (`.at-card`)

- 3px ink border, hard shadow, 24px padding, 0px radius.
- **Default:** card surface (white / #002b2b).
- **Green (`.at-card-green`):** the Ficha spec-card — green surface, teal text.
- **Amber (`.at-card-amber`):** the middle project card — amber surface, teal text, solid ink chips (the tile amber+teal pair).
- **Cream (`.at-card-cream`):** the soft surface, for alternating skill cards.

### Chips (`.at-chip`)

- 3px ink border, min-height 2.25rem, 0.25rem × 0.85rem padding, 0.85rem Work Sans 600.
- **Soft (default):** card-soft background — tech tags, counts.
- **Solid (`.at-chip-solid`):** ink background, canvas text — the "featured" tag, the domain tag.
- **Amber (`.at-chip-amber`):** year chips in the experience timeline.

### Eyebrow / Mancheta (`.at-eyebrow`)

Uppercase Work Sans 700 at 0.75rem with 0.18em tracking, flanked by 3px rules in `currentColor` (2.5rem before, up to 8rem after). Every section opens with one: `NN.` numeral in Clash Display + the localized section name.

### Mark (`.at-mark`)

The hand-drawn underline: a 0.22em-tall amber bar at 90% of the line box, under exactly one keyword — the first word of the role in the hero, the key word in the contact title (`contacto` / `touch`).

### Mosaic Band (`.at-tiles`)

See Shapes. Seven inline SVGs, each 48×48 viewBox, using only the five system colors.

### Diamond Panel (`.at-diamonds`)

See Shapes. Contact section + footer background.

### Timeline Row (`.at-row`)

3px border + hard shadow; `10rem` period column at `md`; period as a chip (amber for experience, soft for education); role in Fraunces 800; company in uppercase Work Sans 700.

### Nav (`.at-nav`)

Sticky, canvas background, 3px bottom border. Left: the green "RM" monogram card + name (name hidden below `xl`). Center: all 7 section links (from `lg`). Right: language switcher (ES/EN) + theme toggle. There is no CTA button in the nav — the hero carries the "Ver mis proyectos" action, and the "Proyectos" link already targets `#proyectos`. Nav links hover to amber with teal text.

### Theme Toggle

An independent inline `<script is:inline>` (works even if the main module fails): reads/writes `localStorage["at-theme"]`, swaps `data-theme`, repaints the icon (☀/☾) and the localized label (CLARO/OSCURO · LIGHT/DARK). Dark by default; the pre-paint script in the layout applies the saved theme before first paint (no flash).

### Reveal (progressive enhancement)

Content is **visible by default**. `<html class="js">` (added by the pre-paint script) enables the CSS-only `at-fade-up` animation on `.reveal` elements. No IntersectionObserver, no JS in the critical path; `prefers-reduced-motion` kills both the animation and the button press.

### Portrait (signature)

Square, not circular — the one place the archived design's circle becomes a card: 3px ink border, full-bleed photo, with the `raulmorales.eu` solid chip and the `ES · EN` amber chip as the caption strip.

### Footer

Diamond pattern, 3px neon top rule, cream text; localized one-liner on the left, `raulmorales.eu` + `© year` on the right.

### Print / PDF (`.at` under `@media print`)

The "Exportar PDF" action is `window.print()` → the browser's "Save as PDF"; there is no PDF library. A single `@media print` block in `adelante.css` turns the live page into a ~5-page A4 CV that mirrors the active theme:

- **Full-bleed:** `@page { size: A4; margin: 0 }` — the theme-aware `<body>` background paints the whole sheet (no white bands); section padding is the only inset.
- **Both themes print:** `print-color-adjust: exact` so the dark theme keeps its surfaces and accents.
- **Screen-only UI hidden:** nav, FAB, theme toggle, the CV/PDF buttons, copy-email and `mailto:` links; the FICHA card is hidden too (the hero already shows role, web and languages).
- **Forced layout:** the A4 content width (~762px) sits just under Tailwind's `md` (768px), so print re-enables the 2-column hero, the `10rem 1fr` timeline rows and 2-up project buttons.
- **Print hygiene:** hard shadows off (3px borders stay), `break-inside: avoid` on cards/rows/chips/tiles and the contact panel, and link-buttons append their real URL via `::after` so the paper CV is usable.

## Theming & Tokens

All design tokens live as CSS custom properties in `src/styles/adelante.css`, namespaced `--at-*`:

| Token | Light (cream) | Dark (default) |
|---|---|---|
| `--at-canvas` | #faf3e0 | #001515 |
| `--at-ink` | #004242 | #faf3e0 |
| `--at-card` | #ffffff | #002b2b |
| `--at-card-soft` | #faf3e0 | #002222 |
| `--at-on-ink` | #faf3e0 | #001515 |
| `--at-shadow` | #004242 | #faf3e0 |
| `--at-panel` / `--at-panel-deep` | #004242 / #003030 | #002b2b / #001515 |
| `--at-green` / `--at-neon` / `--at-amber` | #24c87f / #00ff8d / #ffc233 (invariant) | same |
| `--at-on-accent` | #004242 | #001515 |

The theme is a single attribute — `html[data-theme="dark"]` — toggled by the inline script and persisted in `localStorage["at-theme"]`. The `<body>` background follows `--at-canvas` to prevent white overscroll flash.

## Do's and Don'ts

### Do:

- **Do** use the `at-` prefix for every class and `--at-` for every token — the site must render in Vivaldi with its built-in ad blocker ON, which hides `ad-*` selectors.
- **Do** keep the four accents (teal, green, neon, amber) and use each for its job: green = primary action, amber = editorial highlight, neon = loudest moment, teal = structure.
- **Do** keep 3px borders, 0px radius, and the `5px 5px 0` hard shadow as the only elevation.
- **Do** set display type in Fraunces 800 at 0.88 line-height; numerals in Clash Display; prose and labels in Work Sans.
- **Do** keep the site dark by default and the toggle a single inline script (no framework).
- **Do** keep content visible with JS disabled; the reveal animation is an enhancement, never a gate.
- **Do** respect `prefers-reduced-motion` (no fade-up, no press).
- **Do** keep both themes in the same design: swap surfaces, never accents.
- **Do** keep the `@media print` block faithful to the on-screen design — the exported PDF is a first-class artifact (both themes, full-bleed, ~5 pages), not an afterthought.

### Don't:

- **Don't** use `ad-` prefixed classes or tokens — Vivaldi's ad blocker will hide them.
- **Don't** add border-radius, blurred shadows, gradients, or a fifth accent color.
- **Don't** load fonts from a CDN — the three families are self-hosted in `public/fuentes/`.
- **Don't** hide content behind JavaScript or an IntersectionObserver.
- **Don't** change the default theme to light — dark is the identity; cream is the option.
- **Don't** put words in Clash Display or numerals in Fraunces.
- **Don't** break the numbered-section rhythm (`01.`–`07.`) when adding sections.
