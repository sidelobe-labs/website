# Sidelobe Website

Source repository for the Sidelobe studio website.

Production domain: https://sidelobe.dev

Status: temporary landing page / early setup.

## Hosting

The site is an assets-only Cloudflare Worker connected directly to this GitHub repository.

Structure:

```text
public/
  index.html
  _headers
wrangler.jsonc
package.json
```

Cloudflare Workers Builds settings:

- Project name: `website`
- Production branch: `main`
- Build command: leave empty
- Deploy command: `npx wrangler deploy`
- Preview command: `npx wrangler preview`
- Preview builds: enabled
- Cloudflare Access: disabled for the public website

`wrangler.jsonc` serves `./public` as static assets. Every push to `main` deploys production after the GitHub integration is connected. Non-production branches can receive isolated Cloudflare Preview deployments.

After the first successful deployment, attach `sidelobe.dev` as the Worker's custom domain in Cloudflare.
