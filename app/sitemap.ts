// app/sitemap.ts
import { MetadataRoute } from 'next';
import { articles } from '@/lib/articles';
import { invoiceTemplates } from '@/lib/templates';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://invoicegenhub.com';
    const currentDate = new Date('2026-08-28');

    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: currentDate,
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/templates`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/privacy-policy`,
            lastModified: currentDate,
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${baseUrl}/terms`,
            lastModified: currentDate,
            changeFrequency: 'yearly',
            priority: 0.3,
        },
    ];

    const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
        url: `${baseUrl}/articles/${article.slug}`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.9,
    }));

    const templateRoutes: MetadataRoute.Sitemap = invoiceTemplates.map((template) => ({
        url: `${baseUrl}/templates/${template.slug}`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.8,
    }));

    return [...staticRoutes, ...templateRoutes, ...articleRoutes];
}
