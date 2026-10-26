# Dilashma — Portfolio

A personal portfolio built as a fast, dependency-free static site. Dark, minimal, and focused on real projects: full-stack web, Android, and data work.

## What's inside

- Single-page layout: hero, about, skills, projects, "right now", contact
- Real project content linked to [github.com/Dilashma27](https://github.com/Dilashma27)
- A CSS-built DigitalMenu dashboard mock (no screenshots required)
- Responsive mobile navigation with keyboard support
- Scroll progress, active navigation, reveal-on-scroll animation
- Copy-email button and reduced-motion support
- No build step, no dependencies, no framework

## Files

```
.
├── index.html              # All page content
├── assets/
│   ├── css/styles.css      # Design system, layout, responsive styles
│   ├── js/main.js          # Navigation, reveal, copy-email, spotlight
│   └── favicon.svg         # "D" monogram favicon
├── README.md
└── .gitignore
```

## Run locally

You can open `index.html` directly, but a local server gives you cleaner URLs and better
testing:

```bash
# Python 3
python -m http.server 8000

# or with Node
npx serve .
```

Then visit `http://localhost:8000`.

## Before you publish — quick customisation checklist

1. **Name and email** — search for `Dilashma` and `dilashmajha@gmail.com` in `index.html`.
2. **GitHub links** — currently point to `github.com/Dilashma27`. Update any repo links if the
   repository names change.
3. **Project descriptions** — the DigitalMenu, UK District Insights, DigitalMenu Mobile, and
   Python/Flutter Labs cards are based on the public repos. Adjust the wording if you want to
   highlight different details.
4. **Quick facts** — edit the "Studying", "Focus", "Currently learning", and "Status" rows in
   the About section.
5. **Skills** — the six cards in the Skills section are easy to reorder or trim.
6. **"Right now"** — update this section each semester so the portfolio stays current.
7. **Meta tags** — update the `<title>`, description, and Open Graph tags in `<head>`.
8. **Favicon** — replace `assets/favicon.svg` if you want a different mark.

### Changing the accent colour

The whole site uses one accent token. Edit it near the top of `assets/css/styles.css`:

```css
--accent: #7ef0b4;
--accent-bright: #b9fbd6;
```

Keep `--accent-dim` and `--accent-line` in the same hue family so the subtle borders and
glows still match.

## Deploy

### Vercel (recommended)

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Framework preset: **Other**. Build command: none. Output directory: `.` (root).
4. Deploy. Every push to `main` updates the site.

Or from the terminal:

```bash
npx vercel
```

### GitHub Pages

1. Push to GitHub.
2. Repository → **Settings** → **Pages**.
3. Source: **Deploy from a branch** → `main` → `/ (root)`.
4. The site will be available at `https://dilashma27.github.io/Portfolio/`.

All asset paths are relative, so the site works from a subpath without changes.

### Netlify

Drag the folder into [app.netlify.com/drop](https://app.netlify.com/drop), or connect the repo
with build command empty and publish directory `.`.

## Accessibility & performance notes

- Semantic landmarks, a skip link, visible focus styles, and labelled icon links
- Mobile menu supports `Escape`, focus return, and a simple focus trap
- All animation is disabled when the visitor prefers reduced motion
- No web fonts are blocked on rendering; the page uses `display=swap`
- Everything is static HTML, CSS, and a single small JS file

## Next ideas

- Add real screenshots of DigitalMenu (drop them into `assets/img/` and use `<img>` inside the
  project cards)
- Add a downloadable CV (`assets/dilashma-cv.pdf`) and a "Résumé" link in the nav
- Add a short case-study page for DigitalMenu if you want to go deeper than a card
- Add a `sitemap.xml` and Open Graph image once the final domain is known
