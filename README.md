# HomeStudioEquipment.com

Static Astro site that reviews home studio gear. See `CLAUDE.md` for the full brief and content rules.

## Commands

| Command           | What it does                                 |
| ----------------- | -------------------------------------------- |
| `npm install`     | Install dependencies                         |
| `npm run dev`     | Start the dev server (drafts are shown)      |
| `npm run build`   | Type-check and build to `dist/` (no drafts)  |
| `npm run preview` | Preview the production build                 |

## Before going live

1. Set your Amazon Associates tag in `src/config.ts` (`AMAZON_TAG`).
2. Confirm the contact email in `src/config.ts` (`SITE.email`).
3. Fill in your story on `src/pages/about.astro`.
4. In the GitHub repo settings, go to **Pages** and set **Source** to **GitHub Actions**. Pushing to `main` deploys.

## Writing a post

Add `src/content/posts/your-slug.mdx`. It's published at `/your-slug/`. Frontmatter:

```yaml
title: "..."
description: "Under 170 characters"
pubDate: 2026-11-01
updatedDate: 2026-11-15   # optional
category: audio-interfaces # audio-interfaces | midi-keyboards | pad-controllers | microphones | studio-monitors
heroImage: ./images/hero.jpg # optional, gets optimized
heroAlt: "..."
draft: true                # hidden from production builds
faq:                       # optional; rendered at the end and output as FAQPage JSON-LD
  - q: "Question?"
    a: "Short answer."
```

Components for MDX: `ProductBox`, `ComparisonTable`, and `AmazonButton`. See the sample post for usage. The affiliate notice, byline, breadcrumbs, and JSON-LD are added automatically.

Amazon rules: never hardcode prices, never copy customer reviews, and always keep the disclosure.
