# experimentalintelligence.org

Site for Experimental Intelligence: new and experimental AI models, datasets and training methodology. Sibling site: experimentalmachines.org.

Next.js (App Router, TypeScript) + Tailwind CSS v4. Static content, no API routes.

## Develop

```bash
npm run dev
```

## Edit content

Copy and links live in `lib/content.ts`. The hero chart and evaluation table read `lib/run.ts`, which is downsampled verbatim from the first full-scale training run's `metrics.jsonl` files.

## Deploy

Pushes to `main` deploy to production via the Vercel Git integration. Attach the `experimentalintelligence.org` domain in the Vercel project settings.
