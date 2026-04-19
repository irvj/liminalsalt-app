# liminalsalt-app

Landing page for [Liminal Salt](https://github.com/irvj/liminal-salt) — live at
**[liminalsalt.app](https://liminalsalt.app)**.

Plain HTML, CSS, and JS. No build step, no dependencies. Deployed via
Cloudflare Pages directly from this repo.

## Local preview

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Layout

```
index.html         landing page
404.html           served by Cloudflare for unmatched routes
favicon.svg        sage "LS" monogram
robots.txt
sitemap.xml

css/style.css      all styles
js/theme-toggle.js dark/light mode
js/modal.js        screenshot lightbox

images/            screenshots
```
