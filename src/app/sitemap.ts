import type { MetadataRoute } from 'next';
import { countries } from '@/content/countries';
import { SITE_URL } from '@/lib/seo';

/** Static routes with their relative priority. */
const routes: { path: string; priority: number; changeFrequency: 'weekly' | 'monthly' | 'yearly' }[] = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/mbbs-abroad', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/countries', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/services', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/medical-pg-germany', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/education-loan', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/value-added-services', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/certification-training', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/internship', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/placements', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/about', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/privacy-policy', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/terms', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/cookie-policy', priority: 0.3, changeFrequency: 'yearly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    ...routes.map((r) => ({
      url: `${SITE_URL}${r.path}`,
      lastModified,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })),
    ...countries.map((c) => ({
      url: `${SITE_URL}/countries/${c.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
