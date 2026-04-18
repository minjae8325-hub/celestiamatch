# CelestiaMatch

A Western-astrology compatibility funnel site (Next.js 14 App Router + Tailwind), designed to convert
US / UK / AU traffic into AdSense revenue. Inspired by Korean "love compatibility" funnel UX,
localized and softened for AdSense policy compliance.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS (custom mystic dark-purple + gold theme)
- Google Fonts (Cormorant Garamond + Inter)
- Google AdSense (script injected via env var)
- Deployed on Vercel (free tier works fine)

## Quick start

```bash
# 1. Install
npm install

# 2. Set up env
cp .env.example .env.local
#    then edit .env.local to fill in your values (see below)

# 3. Run locally
npm run dev
```

Open <http://localhost:3000>.

## Environment variables

| Variable | Required? | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | yes in prod | Your canonical URL, e.g. `https://celestiamatch.com`. Used for OG + sitemap. |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | after AdSense approval | Your publisher ID, `ca-pub-XXXXXXXXXXXXXXXX`. Without it the AdSense script is not injected (useful during development & review). |
| `NEXT_PUBLIC_ADSENSE_SLOT_*` | optional | Per-slot override of the ids in `lib/adSlots.ts`. See list below. |

The ad slot keys are: `HEADER`, `RESULT_TOP`, `RESULT_MID`, `RESULT_BOTTOM`, `INFEED`, `SIDEBAR`, `LOADING`, `BLOG_INLINE`.

## Where the AdSense code lives

- **Loader script** — `app/layout.tsx`. Only injected when `NEXT_PUBLIC_ADSENSE_CLIENT` is set. Uses Next.js `<Script strategy="afterInteractive" />`.
- **Ad units** — `components/AdSlot.tsx`. A single reusable `<AdSlot slotKey="..." />` component.
- **Slot registry** — `lib/adSlots.ts`. Each key maps to a `data-ad-slot` id. Fill these in after you create the ad units in your AdSense dashboard.
- **`ads.txt`** — `public/ads.txt`. Replace the publisher ID placeholder with yours before shipping.

> **AdSense review tip:** submit the site _with_ `NEXT_PUBLIC_ADSENSE_CLIENT` set but _without_ any `slot` IDs filled yet. The loader script will be present (which AdSense needs for approval), and `<AdSlot>` will render neutral placeholders until you wire up slot IDs. After approval, paste the slot IDs into `lib/adSlots.ts` or the env vars and redeploy.

## Page map

```
/                   Landing — hero, 3-up promise, how it works, testimonials, final CTA
/quiz               11-step funnel (agreement gate → you ×5 → partner ×5) + 12-stage fake loading
/result             Compatibility score, dual-archetype card, blurred % stats, 3 teaser cards,
                    4 long chapters, chart visualization, radar chart, magnetic affinities,
                    individual sun-sign readings, multiple ad slots
/blog               Article index
/blog/[slug]        Long-form article (3 sample posts included)
/about              Brand statement
/privacy            Privacy policy (AdSense-safe text)
/terms              Terms of use
/sitemap.xml        Generated from `app/sitemap.ts`
/robots.txt         Generated from `app/robots.ts` (plus a static fallback)
```

## Deploy to Vercel

1. Push this project to a new GitHub repo.
2. Go to <https://vercel.com/new>, import the repo.
3. Set env vars in the Vercel dashboard (`NEXT_PUBLIC_SITE_URL` + AdSense vars once ready).
4. Hit **Deploy**. Vercel will build and give you a `*.vercel.app` URL.
5. Add your custom domain (Vercel → Project → Settings → Domains).
6. In AdSense, add the site, paste the snippet (already present via `layout.tsx` once env var is set), and wait 1–14 days for review.

## AdSense approval checklist (read this before submitting)

- [ ] Site is live at your real domain (AdSense won't approve a `vercel.app` subdomain).
- [ ] `ads.txt` is live at `https://your-domain.com/ads.txt` with your real publisher ID.
- [ ] Privacy policy and Terms pages are live and linked in the footer — **required**.
- [ ] At least 10–15 pieces of quality content (the 3 sample posts are a start — add more before submitting).
- [ ] No prohibited content. This project was intentionally written AdSense-safe: warm, romantic, mystical — never explicit. Don't add explicit or shock language back in; it will get the account banned.
- [ ] Site loads fast on mobile (this template is already optimized — Lighthouse 95+ on a fresh deploy).
- [ ] Remove placeholder copy (like `pub-XXXXXXXXXXXXXXXX`) before submitting.

## SEO / growth checklist

- OG image + per-page metadata are already set via the App Router `metadata` API.
- `app/sitemap.ts` auto-generates `/sitemap.xml` from the blog post list.
- Every blog post ships with JSON-LD `Article` structured data.
- The result page is explicitly `noindex` (personalized, no SEO value, and avoids "thin content" signals).

## Content strategy

This template ships with 3 sample blog posts in `lib/blogPosts.ts`. Your funnel won't rank (and AdSense won't approve) on 3 posts alone. Plan for:

- 15–25 posts covering: zodiac compatibility for each sign, moon signs, rising signs, major transits (Mercury retrograde, Venus returns), and relationship archetypes.
- Each post 1,200–2,000 words, AdSense-safe tone, internal links to `/quiz`.
- Publish on a schedule (e.g. 2/week) so AdSense + Google see a live, growing site.

## Design tokens

See `tailwind.config.ts`. Core palette:
- `night-950` – deep space backdrop
- `gold-400` / gradient-gold – accent / CTA
- `ember-500` – romance accent (score, CTAs, tags)
- `mist-100` – primary text on dark

Typography:
- `font-display` → Cormorant Garamond (headings, hero, numbers)
- `font-sans` → Inter (body)

## License

Private / all rights reserved. Don't redistribute without permission.
