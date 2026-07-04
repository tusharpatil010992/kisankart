# KisanKart — Remaining TODOs

## Setup (required before the app works)

- [ ] Create a Supabase project, copy URL/anon key/service role key into `.env.local` (see `.env.example`)
- [ ] Run `docs/schema.sql` in the Supabase SQL editor
- [ ] Create an admin user in Supabase Auth (email/password) to log into `/admin`
- [ ] Create a Resend account, verify a sending domain, add `RESEND_API_KEY` and `RESEND_FROM_EMAIL` to `.env.local`

## Testing checklist (from the plan, still to verify manually against a live backend)

- [ ] Products load correctly on home and `/products`
- [ ] Search and category filter work together
- [ ] Add to cart / update quantity / remove from cart
- [ ] Checkout creates an order + order items and sends a confirmation email
- [ ] Admin login / logout works, `/admin/*` redirects to login when signed out
- [ ] Product create / edit / delete works and reflects on the public site
- [ ] Category create / edit / delete works and reflects on the public site
- [ ] Realtime: editing a product in another tab updates the storefront without a manual refresh
- [ ] Mobile layout check (nav, product grid, cart, admin sidebar)

## Not yet implemented

- [ ] Deployment to Vercel + production env vars
- [ ] Rate limiting on checkout/login (plan lists this as "consider implementing")
- [ ] Image upload (currently URL-only)
