# KisanKart — Build Progress

Tracks what's been implemented against `E-commerce_development_plan.md`.

## Status: Core app implemented, not yet connected to a live Supabase/Resend project

## Done

- **Project scaffold**: Next.js (App Router, JavaScript, Tailwind v4, ESLint) via `create-next-app`.
- **Styling**: Brand colors (forest/light/sage green, light gray) defined in `app/globals.css` via Tailwind v4's `@theme` — no `tailwind.config.js` needed in v4. Modernized pass (green primary palette, Inter/Sora typography, gradients, mobile/tablet-responsive admin + cart + navbar) documented in `docs/design-system.md`.
- **Supabase setup**: `lib/supabase/{client,server,admin}.js` using `@supabase/ssr`. SQL schema + RLS policies + realtime publication in `docs/schema.sql` (run manually in the Supabase SQL editor).
- **Auth**: Email/password admin login (`app/admin/login`), session refresh + route protection in `proxy.js` (redirects unauthenticated users away from `/admin/*`). Named `proxy.js` not `middleware.js` — Next.js 16 renamed the convention (`middleware` is deprecated in favor of `proxy`, same API).
- **Server actions**: `app/actions/{products,categories,orders,auth}.js` — CRUD + checkout + login/logout, with Zod validation (`lib/validators.js`).
- **Public storefront**: home page, product listing with search + category filter (via URL search params, no separate search page), product detail, cart (localStorage + Context in `components/cart/CartProvider.jsx`), checkout.
- **Admin panel**: dashboard with counts, product CRUD, category CRUD, delete confirmation via `window.confirm`.
- **Realtime sync**: `hooks/useRealtime.js` subscribes to `products`/`categories` changes and calls `router.refresh()` so the public site updates when admin edits data. Mounted once in the public layout.
- **Email**: `lib/email.js` sends an order confirmation via Resend after checkout (best-effort — a failed email doesn't fail the order).

## Deliberate simplifications vs. the original plan (avoiding over-engineering)

The plan's folder structure had several layers that would have been redundant for this app's size. These were collapsed:

- **No `services/` layer** — business logic lives directly in `app/actions/*.js`. There was no second caller that needed the logic factored out separately from the Server Action.
- **No `types/` folder** — project is plain JS, not TypeScript (per request).
- **No `utils/` + `lib/` split** — merged into `lib/` only.
- **No separate `config/app.js`, `config/routes.js`, `config/supabase.js`, `config/email.js`** — env vars are read directly where used; there's only one place each is needed.
- **No dedicated `/products/search` page** — search and category filtering are query params (`?q=&category=`) on the products listing page.
- **No generic `DataTable` component** — the two admin tables (products, categories) have different enough columns that a generic abstraction would need render props for every cell anyway; plain `<table>` markup is more direct.
- **`(admin)` route group dropped** — `app/admin/*` directly; the extra route group added a folder with no distinct behavior. A `(dashboard)` route group *was* kept, to give the login page a different layout (no sidebar) than the authenticated dashboard pages.
- **Auth helper**: used `@supabase/ssr` instead of the plan's `@supabase/auth-helpers-nextjs`, which is deprecated upstream.

## Known gaps / things a real deployment still needs

- No Supabase project has been created — `.env.local` must be filled in from `.env.example` and `docs/schema.sql` run before anything works.
- No Resend account/domain configured — checkout will still create the order if email sending fails (logged to console), so this isn't blocking, just incomplete.
- No automated tests.
- No image upload — product images are pasted URLs only.
- `lib/supabase/admin.js` (service-role client) is created but currently unused; current RLS design lets authenticated admins write directly. Keep it only if a future feature needs to bypass RLS.

See `docs/todos.md` for the remaining checklist items from the original plan.

## Verified so far

- `npm run lint` — clean.
- `npm run build` — succeeds, all 12 routes compile (see route list below).
- `npm run dev` — confirmed every route resolves to the correct component; pages that fetch data currently 500 with "Your project's URL and Key are required to create a Supabase client!", which is expected with no `.env.local` filled in yet. This is the last remaining step — once Supabase credentials are added and `docs/schema.sql` is run, these should resolve.
- Not yet verified end-to-end (needs live Supabase + Resend): checkout flow, admin CRUD, realtime sync, email delivery. See `docs/todos.md`.
