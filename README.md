# Dilashma — Portfolio

A personal portfolio built as a fast, dependency-free static site. Dark, minimal, and focused on real projects: full-stack web, Android, and data work.

## What's inside

- Single-page layout: hero, about, skills, projects, CV, contact
- A separate one-page CV at `cv.html`, readable in an in-page viewer or downloadable as a print-ready A4 PDF
- CV viewer opens without downloading: an in-page modal with focus trap, `Escape` to close, and links to download or open in a new tab
- Real project content linked to [github.com/Dilashma27](https://github.com/Dilashma27)
- A CSS-built DigitalMenu dashboard mock (no screenshots required)
- Technology ticker with local brand logos (no external icon CDN)
- Project covers backed by optimised local photography
- Responsive mobile navigation with keyboard support
- Scroll progress, active navigation, reveal-on-scroll animation
- Copy-email button and reduced-motion support
- No build step, no dependencies, no framework

## Files

```
.
├── index.html              # All page content
├── cv.html                 # One-page CV (screen + print)
├── assets/
│   ├── css/styles.css      # Design system, layout, responsive styles
│   ├── css/cv.css          # CV layout and A4 print styles
│   ├── js/main.js          # Navigation, reveal, copy-email, spotlight, CV viewer
│   ├── img/tech/           # Technology logos used in the ticker
│   ├── img/projects/       # Cover photography for the project cards
│   ├── Dilashma-CV.pdf     # Generated A4 PDF, linked from the site
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

1. **Name, email, and phone** — search for `Dilashma`, `dilashmajha@gmail.com`, and `9765457855` in `index.html`.
2. **GitHub links** — currently point to `github.com/Dilashma27`. Update any repo links if the
   repository names change.
3. **Project descriptions** — the DigitalMenu, DigitalMenu Mobile, Portfolio Website, and
   Python/Flutter Labs cards are based on the public repos. Adjust the wording if you want to
   highlight different details.
4. **Quick facts** — edit the "Studying", "Focus", "Currently learning", and "Status" rows in
   the About section.
5. **Skills** — the six cards in the Skills section are easy to reorder or trim.
6. **CV** — update the content in `cv.html`, then regenerate the PDF (see below).
7. **Project covers** — replace the WebP files in `assets/img/projects/` to use your own photos.
8. **Meta tags** — update the `<title>`, description, and Open Graph tags in `<head>`.
9. **Favicon** — replace `assets/favicon.svg` if you want a different mark.

### Regenerating the CV PDF

Open `cv.html` in Chrome and choose **Print → Save as PDF** (A4, margins: none, background
graphics on), or use headless Chrome:

```bash
chrome --headless --print-to-pdf=assets/Dilashma-CV.pdf --no-pdf-header-footer cv.html
```

The CV is laid out to fit a single A4 page; the print styles in `assets/css/cv.css` handle the
page size and hide the on-screen toolbar.

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
- Project cover photos are local WebP files with dark scrims, so text stays readable
- The CV has its own A4 print stylesheet and a selectable, text-based PDF
- The CV viewer loads `cv.html?embed=1`, which hides the standalone toolbar; `Escape` closes it and
  focus returns to the **Open CV** button
- Everything is static HTML, CSS, and a single small JS file

## Next ideas

- Add real screenshots of DigitalMenu (drop them into `assets/img/` and use `<img>` inside the
  project cards)
- Add a short case-study page for DigitalMenu if you want to go deeper than a card
- Add a `sitemap.xml` and Open Graph image once the final domain is known
