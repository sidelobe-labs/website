<p align="center">
  <img src="./public/brand/sidelobe-signal-dark.svg" width="420" alt="Sidelobe">
</p>

<p align="center">
  <strong>Sidelobe studio website</strong><br>
  Small software. Built properly.
</p>

<p align="center">
  <a href="https://sidelobe.dev">sidelobe.dev</a>
  ·
  <a href="https://github.com/sidelobe-labs/website/actions/workflows/quality.yml">
    <img src="https://github.com/sidelobe-labs/website/actions/workflows/quality.yml/badge.svg" alt="Website quality">
  </a>
</p>

---

Source repository for the Sidelobe studio website.

The site presents Sidelobe's on-demand software offering, process and contact information. It is intentionally small, dependency-light and served as static assets by a Cloudflare Worker.

## Structure

- `public/index.html` — semantic page content and metadata
- `public/styles.css` — responsive layout and visual system
- `public/app.js` — progressive UX enhancements
- `public/404.html`, `public/404.css` — branded error page
- `public/brand/` — website logo assets
- `public/favicon.svg` — canonical website icon
- `public/og.png` — link preview
- `public/robots.txt`, `public/sitemap.xml` — discovery
- `public/_headers` — security and cache headers
- `scripts/validate.mjs` — dependency-free static-site validation
- `wrangler.jsonc` — Worker static asset configuration

Canonical brand rules and source artwork live in the private `sidelobe-labs/brand` repository.

## Local validation

Run:

```sh
npm run check
```

The check validates internal anchors, referenced local assets, CSP-sensitive inline code, required files, mobile contact navigation and JavaScript syntax.

## Deployment

Cloudflare Workers Builds uses `main` as the production branch and `npx wrangler deploy` as the deploy command. The Worker serves `./public` as static assets and uses the branded `404.html` for unknown paths.

The public `workers.dev` URL is disabled in Wrangler; production is served from the configured custom domain.

GitHub also runs `Website quality` on pull requests and pushes to `main`. For deliberate changes, prefer a branch/PR, check the Cloudflare preview and quality check, then merge to production.

## Release checks

1. Confirm `Website quality` passes.
2. Confirm the production commit receives a successful `Workers Builds: website` check.
3. Check `https://sidelobe.dev/` at desktop, tablet and narrow mobile widths.
4. Check hero CTA, anchors, mobile navigation, FAQ, email link and copy-email state.
5. Verify `/favicon.svg`, `/og.png`, `/robots.txt`, `/sitemap.xml` and an unknown path.
6. Verify `hello@sidelobe.dev` can receive a real message before relying on it publicly.
7. Check the intended `www.sidelobe.dev` and `sidelobe.app` redirect behaviour separately in Cloudflare.
