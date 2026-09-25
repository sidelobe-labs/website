# Sidelobe Website

Source repository for the Sidelobe studio website: https://sidelobe.dev

The current site presents Sidelobe's on-demand software offering, process and contact information. It is intentionally small, dependency-light and served as static assets by a Cloudflare Worker.

## Structure

- `public/index.html` — semantic page content and metadata
- `public/styles.css` — responsive layout and visual system
- `public/app.js` — progressive UX enhancements (mobile navigation, active section state, copy email)
- `public/brand/` — website logo assets
- `public/favicon.svg`, `public/site.webmanifest` — site icon and manifest
- `public/og.png` — link preview
- `public/robots.txt`, `public/sitemap.xml`, `public/404.html` — discovery and error handling
- `public/_headers` — security and cache headers
- `wrangler.jsonc` — Worker static asset configuration

Canonical brand rules and source artwork live in the private `sidelobe-labs/brand` repository. The website favicon uses the SL monogram; the main header and signal artwork use the Signal family.

## Deployment

Cloudflare Workers Builds uses `main` as the production branch and `npx wrangler deploy` as the deploy command. The Worker serves `./public` as static assets and uses the branded `404.html` for unknown paths.

A production commit should receive the `Workers Builds: website` check before it is treated as published.

## Release checks

1. Check the latest GitHub commit has a successful Cloudflare Workers build.
2. Open `https://sidelobe.dev/` on desktop and mobile.
3. Check hero CTA, anchor navigation, mobile menu, FAQ interactions and both contact actions.
4. Verify the favicon, `/og.png`, `/robots.txt`, `/sitemap.xml` and an unknown URL.
5. Verify `hello@sidelobe.dev` can receive a real message before relying on it publicly.
6. Check the intended `www.sidelobe.dev` and `sidelobe.app` redirect behaviour separately in Cloudflare.
