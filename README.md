# Jeno Energy — Homepage

Production-ready static site for the Jeno Energy homepage. Responsive: the **desktop** design shows on screens ≥ 768px, the **mobile** design shows below 768px — matching the approved mockup exactly.

## What's in here

```
index.html                     ← the page (open this / entry point)
homepage.jsx                   ← page layout & sections (React, in-browser Babel)
product-screens.jsx            ← the in-page product UI mockups
tokens.css                     ← brand colors, type, component styles
assets/
  logo_primary_wordmark.png    ← Jeno wordmark (transparent background)
  images/                      ← product screenshots used on the page
jeno-energy-single-file.html   ← the ENTIRE site inlined into one file (backup, works offline)
```

## Publish on GitHub Pages (quickest path)

1. Create a new GitHub repo (e.g. `jeno-website`).
2. Copy **everything in this folder** into the repo root and push:
   ```bash
   git add .
   git commit -m "Jeno Energy homepage"
   git push origin main
   ```
3. In the repo: **Settings → Pages → Build and deployment → Source: "Deploy from a branch"**, pick `main` / `/ (root)`, Save.
4. Wait ~1 min. Your site is live at `https://<user>.github.io/<repo>/`.

That's it — no build step required. `index.html` loads React + Babel from a CDN and renders the site.

### Even simpler
If you just want it online with zero config, upload **`jeno-energy-single-file.html`** anywhere (rename it `index.html`) — it's completely self-contained (all code, styles, fonts, and images inlined). Good for a quick preview link; drag-drop into Netlify Drop, etc.

## Notes for production hardening (optional, recommended)

The site currently transpiles JSX **in the browser** via Babel Standalone. That's perfect for a mockup or a quick launch, but for a real production site the developer should:

- **Precompile the JSX** (Vite/Next/CRA or a plain esbuild step) so Babel isn't shipped to the browser — this cuts ~1.5MB and speeds up first paint.
- **Pin/host React** locally instead of the unpkg CDN, or swap to the production React builds (`react.production.min.js`).
- Add real `href`s to the nav links / buttons and wire the "Get Free Early Access" form to a backend or form service.
- Add favicon, Open Graph tags, and analytics as needed.

None of this changes the design — it's the same components, just compiled ahead of time.

## Editing

- Content & layout: `homepage.jsx`
- In-page product mockups (the dark screens under each gate): `product-screens.jsx`
- Colors / fonts / shared styles: `tokens.css`
- The responsive breakpoint (768px) is set in `index.html`.

## Brand

Colors, typography, and logo treatment are defined in `tokens.css`. The wordmark has a transparent background so it sits cleanly on any section color.
