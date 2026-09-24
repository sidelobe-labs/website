# Sidelobe Website

Source repository for the Sidelobe studio website: https://sidelobe.dev

The current site presents Sidelobe's on-demand software offering, approach and contact information. It is a static site served by a Cloudflare Worker.

## Structure

- `public/index.html` — page content, styles and social metadata
- `public/brand/` — website logo assets
- `public/favicon.svg`, `public/site.webmanifest` — site icon and manifest
- `public/og.png` — link preview
- `public/robots.txt`, `public/sitemap.xml`, `public/404.html` — discovery and error page
- `public/_headers` — response headers
- `wrangler.jsonc` — Worker configuration

Canonical brand rules and source artwork live in the private `sidelobe-labs/brand` repository. The website favicon uses the SL monogram; the main header uses the Signal wordmark.

## Deployment

Cloudflare Workers Builds uses `main` as the production branch and `npx wrangler deploy` as the deploy command. The Worker serves `./public` as static assets. Confirm the custom domain and the latest deployment in Cloudflare before treating a commit as published.

## Release checks

1. Open `https://sidelobe.dev/` on desktop and mobile; check navigation, spacing and contact button.
2. Check `https://www.sidelobe.dev/` and confirm its intended redirect or canonical behaviour.
3. Check favicon and `/og.png` in a browser and a link preview.
4. Check `/robots.txt`, `/sitemap.xml` and an unknown path.
5. Send a real test message to `hello@sidelobe.dev` and verify delivery and reply.
6. Check search indexing separately; metadata alone does not establish indexing.
