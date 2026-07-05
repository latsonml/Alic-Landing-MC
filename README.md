# Alic Landing Page

Marketing site for **Alic** — cash flow management for business. Built with Vite as a multi-page static site.

## Routes

| Path | Description |
|------|-------------|
| `/` | Main landing page |
| `/features/` | Product features overview |
| `/pricing/` | Starter, Pro, and Premium plans |
| `/mca/` | MCA-focused page with censor-char hero and cost calculator |
| `/services/reconciliation/` | MCA reconciliation service page |

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Scripts

- `npm run dev` — start the local development server
- `npm run build` — build for production (output in `dist/`)
- `npm run preview` — preview the production build locally

## Project structure

```
index.html                        Main landing page
features/index.html               Product features page
pricing/index.html                Starter, Pro, and Premium pricing
mca/index.html                    MCA landing page
services/reconciliation/index.html  Reconciliation service page
css/base.css                      Shared design tokens, nav, footer, buttons
css/home.css                      Home page sections
css/features.css                  Features page layout
css/pricing.css                   Pricing page layout
css/mca.css                       MCA page sections
css/reconciliation.css            Reconciliation page sections
js/reveal.js                      Scroll reveal (IntersectionObserver)
js/features.js                    Features page init
js/pricing.js                     Pricing page init
js/censor-chars.js                Rotating censor characters (GSAP)
js/mca.js                         MCA calculator and counters
js/reconciliation.js              Reconciliation page counters
public/js/posthog.js              PostHog analytics (all pages)
public/assets/                    Images from pace-landing reference
```

## Source

The main page design comes from `alic-landing-page-2.html`. MCA and reconciliation content is ported from the `pace-landing` repo, restyled to match this lander's design system (Cambo, Geist Mono, Aspekta).

External dependencies (CDN): Google Fonts, Aspekta, GSAP, PostHog (`public/js/posthog.js`).
