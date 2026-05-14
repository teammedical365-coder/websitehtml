import { MetadataRoute } from 'next';

/**
 * Technical SEO robots.txt automation
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/admin/', '/api/'], // Standard security hygiene
    },
    sitemap: 'https://medical365.in/sitemap.xml',
    host: 'https://medical365.in',
  };
}
