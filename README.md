# experimentalintelligence.org

Site for Experimental Intelligence: new and experimental AI models, datasets and training methodology. Sibling site: experimentalmachines.org.

Next.js (App Router, TypeScript) + Tailwind CSS v4. Static content, no API routes.

## Develop

```bash
npm run dev
```

## Edit content

Copy and links live in `lib/content.ts`. Measured results live in `lib/opengrad.ts` (OpenGrad Study 001) and `lib/run.ts` (the first full-scale training run's `metrics.jsonl`, downsampled). The dataset section reads `lib/datasets.ts`, which is separate because it has to carry licence terms and per-source row accounting rather than just copy.

`app/globals.css` holds the design tokens, the dark stage surface, and every animation on the page. All motion is pure CSS via `animation-timeline`, guarded by `@supports` so an unsupported browser paints the finished state, and disabled under `prefers-reduced-motion`. There is no animation dependency and no client-side JavaScript on the page.

## Deploy

Pushes to `main` deploy to production via the Vercel Git integration. Attach the `experimentalintelligence.org` domain in the Vercel project settings.
