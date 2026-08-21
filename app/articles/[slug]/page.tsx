import { articles } from '@/lib/articles';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ArticleClient from './ArticleClient';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return articles.map((article) => ({
        slug: article.slug,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const article = articles.find((a) => a.slug === slug);

    if (!article) {
        return {
            title: 'Article Not Found',
        };
    }

    const url = `https://invoicegenhub.com/articles/${article.slug}`;

    return {
        title: article.title,
        description: article.excerpt,
        alternates: {
            canonical: url,
        },
        openGraph: {
            type: 'article',
            url,
            title: article.title,
            description: article.excerpt,
            siteName: 'InvoiceGen',
            publishedTime: new Date(article.date).toISOString(),
            authors: ['https://invoicegenhub.com/about'],
            tags: [article.category, 'invoicing', 'freelance', 'business'],
            images: [
                {
                    url: 'https://invoicegenhub.com/og-image.png',
                    width: 1200,
                    height: 630,
                    alt: article.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: article.title,
            description: article.excerpt,
            images: ['https://invoicegenhub.com/og-image.png'],
        },
    };
}

export default async function ArticlePage({ params }: PageProps) {
    const { slug } = await params;
    const article = articles.find((a) => a.slug === slug);

    if (!article) {
        notFound();
    }

    const url = `https://invoicegenhub.com/articles/${article.slug}`;

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.title,
        description: article.excerpt,
        url,
        datePublished: new Date(article.date).toISOString(),
        dateModified: new Date(article.date).toISOString(),
        author: {
            '@type': 'Organization',
            name: 'InvoiceGen',
            url: 'https://invoicegenhub.com',
        },
        publisher: {
            '@type': 'Organization',
            name: 'InvoiceGen',
            url: 'https://invoicegenhub.com',
            logo: {
                '@type': 'ImageObject',
                url: 'https://invoicegenhub.com/logo.png',
            },
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': url,
        },
        image: 'https://invoicegenhub.com/og-image.png',
        articleSection: article.category,
        keywords: [article.category, 'invoicing', 'freelance', 'small business', 'PDF invoice'].join(', '),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ArticleClient article={article} slug={slug} />
        </>
    );
}
