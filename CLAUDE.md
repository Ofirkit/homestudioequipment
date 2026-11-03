# HomeStudioEquipment.com

Amazon affiliate site reviewing and comparing home studio gear (audio interfaces, MIDI keyboards, pad controllers, mics, studio monitors). Audience: beginner-to-intermediate home producers, podcasters, creators. Author: Ophir, a music producer (psytrance, Ableton) and designer.

## Stack
- Astro, static output. No CMS. Posts are Markdown/MDX in an Astro content collection (`src/content/posts`).
- Deploy: GitHub Pages via GitHub Actions. Custom domain `homestudioequipment.com` (`public/CNAME`).
- Fast and light: no heavy JS, optimized images, Lighthouse 95+.

## Pages
- Home (latest posts + category links), category pages, post template
- About (author bio and music background, for E-E-A-T), Affiliate Disclosure, Privacy, Contact

## Components
- `ProductBox`: name, image, short verdict, pros/cons, Amazon button
- `ComparisonTable`: side-by-side specs, mobile-friendly
- `AmazonButton`: builds the link from ASIN plus tag in one config file (`AMAZON_TAG`); `rel="sponsored nofollow noopener"`, opens in new tab

## Amazon rules (must follow)
- Never hardcode prices. Use "Check price on Amazon."
- Never copy Amazon customer review text. Write insights in our own words.
- Show an affiliate disclosure near the top of every post plus a full disclosure page.

## SEO / AEO
- One H1 per page; question-style H2s; short direct answer under each.
- Each post: title, meta description, canonical, OG tags, updated date, author.
- JSON-LD: Organization, Article, BreadcrumbList; FAQPage when the post has an FAQ.
- Sitemap and robots.txt.

## Post format
Quick verdict at top, comparison table, who each product is for, pros/cons, FAQ. Clear, friendly, no fluff.

## Frontmatter conventions
- `category` is a slug from `CATEGORIES` in `src/config.ts` (e.g. `audio-interfaces`), not the display name.
- Add `subtitle`, `kind`, and `heroImage`/`heroAlt`/`heroCredit: "Amazon"`. Pass the same Amazon image to the `ProductBox` `image` prop. Amazon images stay hotlinked, never downloaded.
- Put the FAQ in frontmatter (`faq:`), not as body headings, so it renders and emits FAQPage JSON-LD.
- Don't add an inline disclosure; the layout shows it. Internal links end with a trailing slash.
- Keep the owner-sample note short: "Based on N owner reviews of the X we read on Amazon."
- Refer to unnamed reviewers as "they", not "he" or "she".

## Workflow
- Claude may merge its own pull requests once `npm run build` passes, then report what changed.
