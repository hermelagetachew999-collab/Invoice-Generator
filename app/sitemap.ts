// app/sitemap.ts
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://invoicegenhub.com';

    return [
        {
            url: baseUrl,
            lastModified: new Date('2026-08-21'),
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/articles/how-to-create-professional-invoice`,
            lastModified: new Date('2026-02-24'),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/articles/invoice-vs-receipt`,
            lastModified: new Date('2026-02-24'),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/articles/best-invoice-format-for-freelancers`,
            lastModified: new Date('2026-02-24'),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/articles/how-to-invoice-international-clients`,
            lastModified: new Date('2026-02-24'),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/articles/tax-tips-for-freelancers-ethiopia`,
            lastModified: new Date('2026-02-24'),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date('2026-02-24'),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date('2026-02-24'),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/privacy-policy`,
            lastModified: new Date('2026-02-24'),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${baseUrl}/terms`,
            lastModified: new Date('2026-02-24'),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
    ];
}
