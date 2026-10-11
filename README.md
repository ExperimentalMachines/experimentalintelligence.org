# experimentalintelligence.org

Site for Experimental Intelligence, a research lab that trains and post-trains small open models and measures what each step changes, including what gets worse. Sister organisation: experimentalmachines.org, which shares its team and its homepage design.

Next.js (App Router, TypeScript) + Tailwind CSS v4. Static export, no API routes.

## Develop

```bash
npm run dev
```

## The page

One page, told in order: a violet hero with two results drawn as slope charts, a strip of the four projects, then one section each for OpenGrad, Tool-choice contrast, the 151M from-scratch run and Taglish sentiment, then the team and contact.

## Edit content

- `lib/content.ts`: site details, the project strip, Tool-choice contrast, the 151M run's headline figures, Taglish sentiment and the team.
- `lib/opengrad.ts`: OpenGrad Study 001 and its quantized builds, transcribed from the OpenGrad repository's audited artifacts.
- `lib/datasets.ts`: the Canonical v2 training corpus, with each source's licence and row counts.
- `lib/run.ts`: the 151M run's `metrics.jsonl`, downsampled, and its benchmarks after each stage.

`app/globals.css` holds the design tokens. The page has no animation: every chart is drawn in full on load.

## Brand

The eye mark is traced to vector from the original logo: `public/brand/ei-mark.svg` (violet) and `ei-mark-white.svg` (for the violet header). Everything else is rendered from those: the icons as the white eye, level and zoomed onto the iris so the tips run off the edges, on a violet (`#7b3fe4`) tile, the link previews on white.

- `app/favicon.ico` (16, 32, 48) and `app/icon.svg`: browser tabs. The SVG and the 16px layer sit a little closer (1.75× the tile width, against 1.6× elsewhere) so the swirl stays thick at tab size.
- `app/apple-icon.png` (180) and `public/brand/icon-{192,512,maskable-512}.png`: home screens, listed in `app/manifest.webmanifest`.
- `app/opengraph-image.png` and `app/twitter-image.png` (1200×630), with `.alt.txt` beside each: link previews.
- `public/brand/ei-mark.png` (1200 wide): the logo in the page's Organization structured data.

## Deploy

Pushes to `main` deploy to GitHub Pages through `.github/workflows/pages.yml`.
