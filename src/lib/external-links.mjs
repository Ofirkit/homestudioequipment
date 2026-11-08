// Sätteri hast plugin: open external links from Markdown/MDX in a new tab.
// Internal links (same site, relative paths, anchors) keep the same tab.
const SITE_HOST = 'homestudioequipment.com';

/** @param {string} href */
const isExternal = (href) => {
  if (!/^https?:\/\//i.test(href)) return false;
  try {
    const host = new URL(href).hostname.replace(/^www\./, '');
    return host !== SITE_HOST;
  } catch {
    return false;
  }
};

/** @type {import('satteri').HastPluginDefinition} */
export const externalLinks = {
  name: 'external-links',
  element: {
    filter: ['a'],
    visit(node) {
      const href = node.properties?.href;
      if (typeof href !== 'string' || !isExternal(href)) return;
      const rel = new Set(String(node.properties.rel ?? '').split(/\s+/).filter(Boolean));
      rel.add('noopener');
      return { ...node, properties: { ...node.properties, target: '_blank', rel: [...rel].join(' ') } };
    },
  },
};
