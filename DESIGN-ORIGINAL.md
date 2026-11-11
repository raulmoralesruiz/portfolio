---
name: "Raúl Morales — Portfolio"
description: "The Terminal Garden — a calm, developer-native dark portfolio where a single Signal Emerald voice grows from a Graphite workbench."
colors:
  canvas: "#0a0a0a"
  surface: "#171717"
  surface-tinted: "rgba(23, 23, 23, 0.5)"
  border: "#262626"
  text-primary: "#ffffff"
  text-heading: "#e5e7eb"
  text-body: "#d1d5db"
  text-secondary: "#9ca3af"
  text-muted: "#6b7280"
  text-faint: "#737373"
  signal-emerald: "#34d399"
  signal-emerald-deep: "#10b981"
  signal-emerald-bright: "#6ee7b7"
typography:
  display:
    fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
    fontSize: "4.5rem"
    fontWeight: 700
    lineHeight: 1
  headline:
    fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
    fontSize: "3.75rem"
    fontWeight: 700
    lineHeight: 1
  title:
    fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
    fontSize: "1.875rem"
    fontWeight: 700
    lineHeight: 1.2
  body:
    fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0.05em"
rounded:
  sm: "4px"
  md: "8px"
  lg: "12px"
  full: "9999px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "40px"
  section: "80px"
components:
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.signal-emerald}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "16px 32px"
  button-outline-inverse:
    backgroundColor: "transparent"
    textColor: "{colors.text-primary}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "16px 32px"
  card-project:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-heading}"
    rounded: "{rounded.lg}"
    padding: "32px"
  card-skill:
    backgroundColor: "{colors.surface-tinted}"
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.md}"
    padding: "24px"
  card-certification:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-heading}"
    rounded: "{rounded.md}"
    padding: "24px"
  chip-year:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-muted}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "4px 12px"
---

# Design System: Raúl Morales — Portfolio

> **⚠ DISEÑO ARCHIVADO — "The Terminal Garden"**
> Este documento describe la **versión anterior** del sitio, hoy disponible en
> [`/original/`](https://portfolio.raulmorales.eu/original/) (ES) y
> [`/original/en/`](https://portfolio.raulmorales.eu/original/en/) (EN), marcada
> `noindex` y fuera del sitemap.
>
> El **diseño actual de producción** es **"Adelante"** (neo-brutalismo editorial):
> ver [`DESIGN.md`](./DESIGN.md).

## Overview

**Creative North Star: "The Terminal Garden"**

Calm, precise, developer-native. The page is a dark workbench — a Graphite field of near-black neutrals — in which a single living voice, Signal Emerald, grows exactly where it means something: section numbers, labels, links, hover states, the selection highlight. Nothing shouts. Confidence comes from craft: hairline borders, a disciplined two-voice type system (sans for prose, mono for the developer's voice), generous whitespace, and evidence laid out plainly.

The composition is deliberately plain: one column, one measure, numbered sections that read like steps in a changelog. Motion is reserved — a color shift on hover, a small lift on feature cards, a faint emerald glow. The restraint is the point: a recruiter or a client should be able to read the page the way they'd read a well-formatted terminal session, and find the next step (write an email, download the CV) within one click.

**Key Characteristics:**

- One Signal Emerald voice on a Graphite workbench; no second accent, no gradients
- Two type voices: system sans for prose, system mono for the developer's voice (numbers, labels, buttons, tags, dates)
- Flat surfaces at rest; depth appears only as a response to state (hover lift + faint emerald glow)
- Ghost (outline) buttons with mono labels; 1px hairline borders as the primary structural device
- One column, one measure (max 896px), numbered sections, 80px vertical rhythm

## Colors

One chromatic voice on a mineral dark field: Signal Emerald is the only hue in the system; the Graphite neutrals carry everything else.

### Primary

- **Signal Emerald** (#34d399): the system's single voice. Section numbers, link and icon strokes, list bullets, button borders, the inline "Full-Stack" highlight, hover emphasis.
- **Signal Emerald Deep** (#10b981): hover intensification — border saturation (30–90% opacity), the `▹` list bullets, and the tint of every hover glow.
- **Signal Emerald Bright** (#6ee7b7): the brightest accent state — selection text and the top of the accent ramp.

### Neutral

- **Graphite Canvas** (#0a0a0a): the page background; the field everything grows from.
- **Graphite Surface** (#171717): card and chip surfaces; also at 50% opacity as the tinted surface of skill cards.
- **Graphite Line** (#262626): hairline borders, dividers, the timeline rail, the footer rule.
- **Text ramp:** white (#ffffff) for display headings; gray-200 (#e5e7eb) for card titles; gray-300 (#d1d5db) for primary prose; gray-400 (#9ca3af) for secondary text; gray-500 (#6b7280) and neutral-500 (#737373) for meta (dates, footer).

### Named Rules

**The One Voice Rule.** Signal Emerald is the only chromatic color in the system. It marks meaning — numbers, links, state — and is never used as a large fill. Its rarity is the point.

## Typography

**Display Font:** system sans stack (Tailwind default: `ui-sans-serif, system-ui, sans-serif, …`)
**Body Font:** same system sans stack
**Label/Mono Font:** system mono stack (`ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`)

**Character:** Two voices, never mixed: sans carries the human prose, mono carries the developer's voice — section numbers, labels, buttons, tech tags, dates, footer. The body renders in the system sans stack — no webfont is loaded or applied.

### Hierarchy

- **Display** (700, 3rem → 4.5rem, 1): the name, hero only.
- **Headline** (700, 2.25rem → 3.75rem, 1): the role line beneath the name.
- **Title** (700, 1.875rem, 1.2): section headings, always preceded by a mono `NN.` number.
- **Body** (400, 1rem–1.125rem, 1.5–1.625): prose; capped at `max-w-xl` (36rem) in hero and contact.
- **Label** (mono, 0.75rem–0.875rem, 0.05em tracking, uppercase in the intro): the developer's voice.

### Named Rules

**The Two Voices Rule.** Sans for prose, mono for the developer's voice. Mono never carries a paragraph; prose never sits in a mono label.

## Layout

One column, one measure. Every section is a `max-w-4xl` (896px) centered container with 16px gutters, separated by 80px of vertical rhythm (the closing section takes 96px). The hero fills the viewport (`100vh`) and left-aligns its content.

Grids are modest and mobile-first: projects and skills go two-up at `md` (768px), certifications go three-up at `lg` (1024px), and About splits two-thirds text / one-third portrait. The experience timeline is a left rail — 1px Graphite Line with 12px emerald dots. Below `md`, everything collapses to a single column.

## Elevation & Depth

**Flat by default, glow on state.** No surface carries a resting shadow. Depth is conveyed by tonal steps (Canvas → Surface → tinted Surface) and hairline borders. When a card is hovered it may lift (`translateY(-5px)`) and gain a faint emerald glow; the glow is a whisper (≤10% opacity), never a spotlight.

### Shadow Vocabulary

- **Hover lift** (`shadow-md` tinted `emerald-500/10`): feature (project) cards on hover, paired with the −5px lift.
- **Hover glow** (`0 0 15px rgba(16, 185, 129, 0.1)`): certification cards on hover.
- **Hover glow soft** (`shadow-lg` tinted `emerald-500/5`): skill cards on hover.

### Named Rules

**The Flat-By-Default Rule.** Surfaces are flat at rest. Shadows appear only in response to state (hover), and only as a faint emerald-tinted glow.

## Shapes

Three corner sizes, each with a job: 4px for buttons (the smallest, most mechanical element), 8px for utility cards (skills, certifications), 12px for feature cards (projects). Identity elements — the portrait, timeline dots, year chips — are fully circular, the one soft geometry in an otherwise rectilinear system. Structure is drawn with 1px hairline borders (Graphite Line); the only 2px border in the system is the emerald frame around the portrait.

## Components

### Buttons

- **Shape:** 4px radius; mono label; 16px × 32px padding.
- **Primary (ghost signal):** 1px Signal Emerald border, transparent background, emerald text; hover fills with 10% emerald.
- **Inverse (ghost white):** 1px white border, white text; hover fills with 10% white; pairs with a 20px stroke icon; the loading state swaps the label, drops to 70% opacity, and sets `cursor-not-allowed`.
- **Hover / Focus:** color transition ≈150ms; focus is a visible outline (2px, 2px offset).

### Section Heading

- Mono `NN.` number in Signal Emerald (1.5rem), followed by a 1.875rem bold white title; 32–48px clearance below.

### Cards / Containers

- **Project card:** 12px radius, Graphite Surface, 1px Graphite Line border, 32px padding; hover: −5px lift + emerald-tinted glow; the title shifts to emerald; tech tags in mono 0.75rem at 90% emerald.
- **Skill card:** 8px radius, 50%-opacity surface, mono emerald category title, `▹` bullets in Signal Emerald Deep; hover: border to 30% emerald + soft glow.
- **Certification card:** 8px radius, surface, 24px padding; hover: border to 50% emerald + 15px glow, icon scales 1.1×, issuer text brightens.

### Timeline Item

- 12px emerald dot on a 1px rail (4px ring in the surface color), mono emerald period, bold role with an emerald `@`, company in gray-300.

### Chips

- **Year chip:** fully circular, surface fill, 1px border, mono 0.875rem gray-500 text, 4px × 12px padding.

### Portrait (signature)

- 288px circle; an outer 2px emerald ring starts at 110% scale and eases to 100% on hover/focus (300ms ease-out); the disc carries a 2px 30%-emerald border that saturates on hover/focus; focusable (`tabindex="0"`) with a visible focus response, not just hover.

### Footer

- 1px top rule, mono 0.875rem, neutral-500, a single line.

## Do's and Don'ts

### Do:

- **Do** keep Signal Emerald on meaning-bearing elements (numbers, links, borders, hover, selection) — never as a large fill.
- **Do** use the mono voice for section numbers, labels, buttons, tech tags, dates, and the footer.
- **Do** keep one column at max 896px with 80px section rhythm.
- **Do** respond to hover with a border-color shift and a faint emerald glow (≤10% opacity); lift only feature cards (−5px).
- **Do** keep focus states visible (2px outline, 2px offset; the portrait responds to `:focus` as well as `:hover`).
- **Do** preserve the two-voice type system: sans prose, mono developer voice.

### Don't:

- **Don't** add a second accent color, a gradient, or a chromatic background.
- **Don't** give any surface a resting shadow.
- **Don't** use solid-filled primary buttons — the system is ghost (outline) only.
- **Don't** load or apply a webfont (e.g. Inter) — the system is the native system sans/mono stack and no external font is shipped.
- **Don't** put prose in the mono voice or labels in the sans voice.
- **Don't** break the numbered-section rhythm (`01.`–`07.`) when adding sections.
