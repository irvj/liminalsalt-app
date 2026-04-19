# Liminal Salt landing page

Marketing/info site for the Liminal Salt app. Single-page static site, deployed
to **liminalsalt.app** via Cloudflare Pages. No build step — Cloudflare serves
the repo root as-is.

The companion app lives at `../liminal-salt` (Django + HTMX + Alpine, self-hosted
LLM chatbot). The standalone color theme lives at `../liminal-salt-theme`. This
repo is just the landing page.

## Stack

Plain HTML, plain CSS, plain JS. No frameworks, no bundler, no package.json.
Separation of concerns is intentional — markup in `.html`, styles in `.css`,
behavior in `.js` — so the site stays portable if it ever moves to a static
site generator down the line.

## Layout

```
index.html         — the landing page (only "real" page)
404.html           — served by Cloudflare for unmatched routes
favicon.svg        — sage "LS" monogram on dark rounded square
robots.txt         — allow all, points at sitemap
sitemap.xml        — single URL, update <lastmod> on notable changes

css/style.css      — all styles. Theme variables at top (dark + light + media query fallback)
js/theme-toggle.js — sun/moon swap, localStorage, prefers-color-scheme. Loaded sync in <head> to avoid flash
js/modal.js        — image lightbox. Auto-wires any <img class="modal-image">. Loaded with defer

images/            — six PNG screenshots copied from ../liminal-salt/docs/images
```

## Conventions

- **Theme colors:** defined as CSS custom properties at the top of `css/style.css`.
  Source of truth is `../liminal-salt/chat/static/themes/liminal-salt.json` and
  the README in `../liminal-salt-theme`. If the theme palette shifts upstream,
  mirror those changes here.
- **Sections:** each top-level page section is a `<section class="section">`
  with a dashed border-top. Use `.container` (64em max) for full-width content
  and `.container-narrow` (44em max) for prose-heavy content.
- **External links** use `target="_blank" rel="noopener"`.
- **Images** must include `width` and `height` attributes (intrinsic pixel
  dimensions are fine — CSS scales them). Without these, lazy-loaded images
  break smooth-scroll anchor targets.
- **Modal images:** add `class="modal-image"` and `data-modal-title="..."` to
  any `<img>` and the modal wires itself up.

## Local preview

```bash
python3 -m http.server -d /Users/jgi/GitHub/irvj/liminalsalt-app 8000
```

Open `http://localhost:8000`. The Python server does not handle custom 404s —
test `404.html` directly at `/404.html`. Cloudflare serves it automatically
on deploy.

## Common edits

- **Add a screenshot:** copy a `<figure class="screenshot">` block in the
  Screenshots section of `index.html`. Include `width`, `height`, `loading="lazy"`,
  `class="modal-image"`, and `data-modal-title`.
- **Add a feature card:** copy a `<div class="feature">` block.
- **Change theme colors:** edit the CSS custom properties at the top of
  `css/style.css` (both `:root`/`[data-theme="dark"]` and `[data-theme="light"]`).
  Also update the swatch hex values in the Theme section of `index.html`.
- **Update sitemap:** bump `<lastmod>` in `sitemap.xml`.

## Intentionally absent

- **No build step.** Don't add npm, bundlers, PostCSS, Tailwind, or anything
  that requires a build. The whole point is that Cloudflare serves the repo as-is.
- **No frameworks.** No React, Vue, Alpine, HTMX, etc. Plain JS only.
- **No analytics or trackers.** If the user later wants Cloudflare Web Analytics,
  it's a single snippet — but don't add it speculatively.
- **No CSS preprocessor.** Use vanilla CSS with custom properties.

## Reference repos

- `../liminal-salt` — the app. README, screenshots, theme JSON, AGREEMENT.md
- `../liminal-salt-theme` — the standalone color theme (the "Like the look?" CTA target)
- `../irvin-dev` — the user's personal site, also Liminal Salt themed. The
  theme-toggle and modal patterns in this repo were ported from it.
