import { MetadataRoute } from 'next';
import { products, locations } from '@/lib/seoData';

/**
 * Automate sitemap generation for 660+ dynamic SEO pages 
 * plus all static core pages.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://medical365.in';

  // 1. Core Static Pages
  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/book-demo',
    '/privacy-policy',
    '/terms-of-service',
    '/revenue-cycle-management',
    '/doctor-mobile-app',
    '/vaccine-management',
    '/diabetes-care-management'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // 2. Dynamic SEO Landing Pages (660 total)
  const dynamicRoutes = products.flatMap((product) =>
    locations.map((location) => ({
      url: `${baseUrl}/${product.slug}/${location.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  );

  return [...staticRoutes, ...dynamicRoutes];
}
