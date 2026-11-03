import { SITE } from '../config';

const abs = (path: string) => new URL(path, SITE.url).toString();

export const organization = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': abs('/#organization'),
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  logo: abs(SITE.logo),
  founder: { '@type': 'Person', name: SITE.author, url: abs('/about/') },
});

export const website = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': abs('/#website'),
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  inLanguage: 'en',
  publisher: { '@id': abs('/#organization') },
});

export const breadcrumbs = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: abs(item.path),
  })),
});

export const article = (a: {
  title: string;
  description: string;
  path: string;
  published: Date;
  modified: Date;
  author: string;
  image?: string;
  section?: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: a.title,
  description: a.description,
  mainEntityOfPage: abs(a.path),
  datePublished: a.published.toISOString(),
  dateModified: a.modified.toISOString(),
  author: { '@type': 'Person', name: a.author, url: abs('/about/') },
  publisher: { '@id': abs('/#organization') },
  isPartOf: { '@id': abs('/#website') },
  inLanguage: 'en',
  ...(a.section ? { articleSection: a.section } : {}),
  ...(a.image ? { image: abs(a.image) } : {}),
});

export const faqPage = (faq: { q: string; a: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
});
