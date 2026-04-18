import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';
import { BLOG_POSTS } from '@/lib/blogPosts';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url.replace(/\/$/, '');
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`,       lastModified: now, changeFrequency: 'weekly',  priority: 1 },
    { url: `${base}/quiz`,   lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/blog`,   lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${base}/about`,  lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${base}/privacy`,lastModified: now, changeFrequency: 'yearly',  priority: 0.2 },
    { url: `${base}/terms`,  lastModified: now, changeFrequency: 'yearly',  priority: 0.2 },
  ];
  const posts: MetadataRoute.Sitemap = BLOG_POSTS.map(p => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));
  return [...staticRoutes, ...posts];
}
