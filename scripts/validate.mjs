import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join, normalize } from "node:path";

const root = process.cwd();
const publicDir = join(root, "public");
const failures = [];

const fail = (message) => failures.push(message);
const read = (path) => readFileSync(join(root, path), "utf8");

for (const required of [
  "public/index.html",
  "public/styles.css",
  "public/app.js",
  "public/404.html",
  "public/404.css",
  "public/_headers",
  "public/favicon.svg",
  "public/robots.txt",
  "public/sitemap.xml"
]) {
  if (!existsSync(join(root, required))) fail(`Missing required file: ${required}`);
}

const html = read("public/index.html");
const four = read("public/404.html");
const headersText = read("public/_headers");

if (/<style[\s>]/i.test(html) || /style\s*=/i.test(html)) {
  fail("index.html must not contain inline styles.");
}
if (/<script(?![^>]*src=)[^>]*>/i.test(html)) {
  fail("index.html must not contain inline scripts.");
}
if (/<style[\s>]/i.test(four) || /style\s*=/i.test(four)) {
  fail("404.html must not contain inline styles.");
}
if (!html.includes('href="#contact"')) {
  fail("Main page has no contact anchor.");
}
if (!html.match(/id="mobile-nav"[\s\S]*href="#contact"/)) {
  fail("Mobile navigation must expose Contact.");
}
if (html.includes('rel="manifest"')) {
  fail("Do not re-introduce a web manifest until the full icon/PWA package is intentional.");
}

const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
if (duplicateIds.length) {
  fail(`Duplicate HTML ids: ${[...new Set(duplicateIds)].join(", ")}`);
}

const idSet = new Set(ids);
for (const match of html.matchAll(/href="#([^"]+)"/g)) {
  if (!idSet.has(match[1])) fail(`Broken internal anchor: #${match[1]}`);
}

const localAssetRegex = /(?:src|href)="(\/[^\"#?]+)"/g;
for (const [documentPath, content] of [
  ["public/index.html", html],
  ["public/404.html", four]
]) {
  for (const match of content.matchAll(localAssetRegex)) {
    const asset = normalize(join(publicDir, match[1].slice(1)));
    if (!existsSync(asset)) fail(`${documentPath} references missing asset: ${match[1]}`);
  }
}

if (!headersText.includes("Content-Security-Policy:")) fail("_headers is missing CSP.");
if (!headersText.includes("style-src 'self'")) fail("CSP style-src should remain self-only.");
if (!headersText.includes("script-src 'self'")) fail("CSP script-src should remain self-only.");

const walk = (dir) => readdirSync(dir).flatMap((name) => {
  const path = join(dir, name);
  return statSync(path).isDirectory() ? walk(path) : [path];
});

const suspicious = walk(publicDir).filter(
  (path) => extname(path) === ".html" && readFileSync(path, "utf8").includes("TODO")
);
if (suspicious.length) fail("TODO markers remain in public HTML.");

if (failures.length) {
  console.error("\nWebsite validation failed:\n");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("Website validation passed.");
