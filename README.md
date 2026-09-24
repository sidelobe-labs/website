# Sidelobe Website

Source repository for the Sidelobe studio website.

Production domain:

https://sidelobe.dev

Status:
Temporary landing page / early setup.

## Cloudflare Pages

1. In Cloudflare: Workers & Pages -> Create -> Pages -> Connect to Git.
2. Select `sidelobe-labs/website`.
3. Framework preset: None.
4. Build command: leave empty.
5. Build output directory: `/`
6. Deploy.
7. Add the custom domain `sidelobe.dev`.

No Node.js build step is required. Once connected, every push to `main` will trigger a new deployment.
