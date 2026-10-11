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

`app/globals.css` holds the design tokens and the page's one animation: the training curves draw themselves as the chart scrolls into view, in pure CSS, guarded by `@supports` and off under `prefers-reduced-motion`.

## Deploy

Pushes to `main` deploy to GitHub Pages through `.github/workflows/pages.yml`.
