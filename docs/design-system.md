# KisanKart — Design System

Summary of the visual theme applied across the app: primary-green brand palette,
stylish/professional typography, gradient accents, and mobile/tablet-responsive
layout. Defined once in `app/globals.css` + `app/layout.js` and consumed by
existing Tailwind utility classes everywhere else — no `tailwind.config.js`
needed (Tailwind v4 CSS-first `@theme`).

## Color palette

Primary brand color is green, expressed as three tonal steps plus two neutral
surfaces — all defined as CSS variables in `app/globals.css`:

| Token | Hex | Role |
|---|---|---|
| `--forest-green` | `#15803d` | Primary brand color — headings, prices, links, icons, solid buttons |
| `--light-green` | `#22c55e` | Accent — hover/active states, badges |
| `--sage-green` | `#bbf7d0` | Pale tint — soft borders, inactive pill backgrounds |
| `--light-gray` | `#f8fafc` | Neutral surface — page sections, admin content area |
| `--foreground` | `#1e293b` | Body text (slate, not pure black — softer/more modern) |

**Deliberate choice: neutral borders, green accents.** Cards, inputs, and
tables use Tailwind's neutral `slate-200` for resting borders rather than
green everywhere. Green is reserved for interactive/brand elements (buttons,
links, active states, focus rings). Tinting every border green read as dated;
neutral-by-default + strategic green reads as modern SaaS.

Three gradient utility classes (`app/globals.css`) implement "green from
white" without breaking text contrast:

- `.bg-gradient-green-soft` / `.bg-gradient-green-medium` — white fading into
  a pale green tint. Used on surfaces with **dark text** (product cards,
  dashboard tiles, cart summary, admin login background).
- `.bg-gradient-green-strong` — a tonal `forest-green → #16a34a` blend (green
  on green, not white on green). Used anywhere **white text** sits on top
  (navbar, admin sidebar, hero section, primary buttons, active category
  pill) — a white-to-green gradient would fail contrast at the white end.

## Typography

Loaded via `next/font/google` in `app/layout.js`, mapped to Tailwind's
`font-sans` / `font-heading` in `app/globals.css`:

- **Inter** (`font-sans`, default body font) — clean, highly legible for
  prices, descriptions, form labels.
- **Sora** (`font-heading`) — a geometric display face with more character
  than a standard UI font, applied automatically to every `h1`–`h6` via a
  global CSS rule (no per-page class needed) plus explicit brand lockups
  (navbar/admin-nav logo, buttons).

## Responsive / mobile & tablet fixes

- **Admin sidebar was broken on mobile** (fixed 224px-wide `<aside>` always
  visible, crowding a 375px screen). Replaced with `components/admin/AdminShell.jsx`
  — a client component that shows a top bar with a hamburger button below
  `md`, and slides the sidebar (`components/admin/AdminNav.jsx`, now with
  active-link highlighting) in as an overlay drawer with a backdrop.
- **Admin tables** (`admin/products`, `admin/categories`) switch from a
  `<table>` layout to stacked cards below `md` (each `<td>` gets an inline
  mobile-only label) and back to a normal table at `md:` and up — avoids
  horizontal scrolling on phones.
- **Cart line items** (`CartItem.jsx`) stack name/price above the
  quantity-stepper/total/remove row below `sm:`, instead of cramming five
  inline elements into one row.
- **Navbar** is sticky (`sticky top-0`) with responsive padding; the "Cart"
  label collapses to icon-only below `sm:` to save space, count badge stays.
- General: container padding scales `px-4 → sm:px-6 → lg:px-8` across public
  layout, hero, and admin shell; product grid gap tightens on mobile
  (`gap-3` → `sm:gap-5`).

## Components touched

`Button`, `Input`, `Textarea`, `Modal` — rounded from `rounded-md`/`rounded-lg`
to `rounded-xl`/`rounded-2xl`, neutral resting borders with a green
focus ring (`focus:ring-forest-green/20`), buttons get a press
(`active:scale-[0.97]`) and hover-elevation (`hover:shadow-md`) instead of a
flat color swap. `ProductCard` and `DashboardCard` gained hover lift
(`hover:-translate-y-1`) and image zoom-on-hover. `Footer` expanded from a
single centered line to a two-column responsive layout with real nav links.

## Not changed

Data model, server actions, auth flow, and realtime sync are unaffected —
this pass was visual/CSS/layout only, verified with `npm run build` and a
local `npm run dev` smoke test of the home, products, cart, and admin-login
routes.
