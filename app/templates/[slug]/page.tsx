import { invoiceTemplates } from '@/lib/templates';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle2, FileText, Sparkles, HelpCircle, Download, ArrowRight, Shield, Zap, Globe } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return invoiceTemplates.map((template) => ({
        slug: template.slug,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const template = invoiceTemplates.find((t) => t.slug === slug);

    if (!template) {
        return {
            title: 'Template Not Found',
        };
    }

    const url = `https://invoicegenhub.com/templates/${template.slug}`;

    return {
        title: template.metaTitle,
        description: template.metaDescription,
        keywords: template.targetKeywords,
        alternates: {
            canonical: url,
        },
        openGraph: {
            type: 'website',
            url,
            title: template.metaTitle,
            description: template.metaDescription,
            siteName: 'InvoiceGen',
            images: [
                {
                    url: 'https://invoicegenhub.com/og-image.png',
                    width: 1200,
                    height: 630,
                    alt: template.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: template.metaTitle,
            description: template.metaDescription,
            images: ['https://invoicegenhub.com/og-image.png'],
        },
    };
}

export default async function TemplateDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const template = invoiceTemplates.find((t) => t.slug === slug);

    if (!template) {
        notFound();
    }

    const url = `https://invoicegenhub.com/templates/${template.slug}`;

    const schemas: any[] = [
        {
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: `${template.title} — InvoiceGen`,
            url,
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'All',
            browserRequirements: 'Requires JavaScript',
            offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
            },
            description: template.metaDescription,
            featureList: template.keyFeatures,
        },
    ];

    if (template.faqs && template.faqs.length > 0) {
        schemas.push({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: template.faqs.map((faq) => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: faq.answer,
                },
            })),
        });
    }

    return (
        <div className="min-h-screen bg-white font-outfit">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
            />

            {/* Navigation Header */}
            <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Invoice Generator
                    </Link>
                    <div className="flex items-center gap-3">
                        <Link href="/templates" className="text-sm font-bold text-gray-600 hover:text-primary transition-colors hidden sm:block">
                            All Templates
                        </Link>
                        <Link href="/">
                            <Button size="sm" className="font-bold bg-primary text-white hover:bg-primary/90 shadow-sm">
                                Create Invoice Free
                            </Button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="bg-gradient-to-b from-blue-50/60 via-indigo-50/20 to-white pt-16 pb-14 border-b border-gray-100">
                <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                        <Sparkles className="w-3.5 h-3.5" /> {template.industry}
                    </div>
                    <h1 className="text-4xl sm:text-6xl font-black text-gray-900 leading-tight tracking-tight">
                        {template.title}
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        {template.summary}
                    </p>
                    <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/" className="w-full sm:w-auto">
                            <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-bold px-8 shadow-lg shadow-primary/20 text-base">
                                Use This Template Free <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                        <Link href="/templates" className="w-full sm:w-auto">
                            <Button variant="outline" size="lg" className="w-full sm:w-auto font-bold border-gray-300 hover:bg-gray-50">
                                Browse Other Templates
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-4 py-16 space-y-16">
                {/* Key Features Grid */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Why Use This Template?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {template.keyFeatures.map((feature, idx) => (
                            <div key={idx} className="p-5 rounded-2xl bg-gray-50 border border-gray-100 flex items-start gap-3.5">
                                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                                <span className="text-sm font-medium text-gray-800 leading-snug">{feature}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* What to Include Section */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Essential Elements for this Invoice</h2>
                    <div className="p-6 rounded-3xl bg-blue-50/50 border border-blue-100 space-y-3">
                        {template.whatToInclude.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                                <span className="font-bold text-primary">{idx + 1}.</span>
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Guide Markdown Content */}
                <section className="prose prose-blue prose-lg max-w-none prose-headings:font-black prose-headings:text-gray-900 prose-p:text-gray-700">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {template.content}
                    </ReactMarkdown>
                </section>

                {/* FAQs */}
                {template.faqs && template.faqs.length > 0 && (
                    <section className="pt-8 border-t border-gray-100 space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-xl bg-primary/10 text-primary">
                                <HelpCircle className="w-5 h-5" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
                        </div>
                        <div className="space-y-4">
                            {template.faqs.map((faq, idx) => (
                                <div key={idx} className="p-5 rounded-2xl bg-gray-50 border border-gray-100 space-y-2">
                                    <h3 className="text-base font-bold text-gray-900">
                                        {faq.question}
                                    </h3>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Call to Action Banner */}
                <div className="p-10 rounded-3xl bg-gradient-to-r from-gray-900 via-indigo-950 to-gray-900 text-white text-center space-y-6 shadow-xl">
                    <h3 className="text-2xl sm:text-3xl font-black">Generate Your Free PDF Invoice Instantly</h3>
                    <p className="text-gray-300 text-sm max-w-md mx-auto">
                        Add your logo, set payment terms, and download high-resolution PDF invoices ready for your clients.
                    </p>
                    <Link href="/" className="inline-block">
                        <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold px-10 shadow-lg">
                            Open Free Invoice Generator &rarr;
                        </Button>
                    </Link>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-16 mt-20">
                <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
                    <Link href="/" className="text-2xl font-black text-white hover:text-primary transition-colors">
                        InvoiceGen
                    </Link>
                    <p className="text-gray-400 text-sm max-w-md mx-auto">
                        Free online invoice generator for freelancers and businesses worldwide.
                    </p>
                    <div className="flex flex-wrap justify-center gap-6 text-xs text-gray-400 font-medium">
                        <Link href="/" className="hover:text-white transition-colors">Generator</Link>
                        <Link href="/templates" className="hover:text-white transition-colors">Templates</Link>
                        <Link href="/about" className="hover:text-white transition-colors">About</Link>
                        <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
                        <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
                    </div>
                    <div className="pt-8 border-t border-white/10 text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                        &copy; 2026 InvoiceGen. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}
