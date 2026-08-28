import { invoiceTemplates } from '@/lib/templates';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, FileText, Sparkles, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Free Invoice Templates — PDF & Word Formats for Freelancers & Businesses',
    description: 'Browse our collection of free, customizable invoice templates for freelancers, contractors, consultants, photographers, and small businesses. Download PDF invoices instantly.',
    alternates: {
        canonical: 'https://invoicegenhub.com/templates',
    },
    openGraph: {
        title: 'Free Invoice Templates — InvoiceGen',
        description: 'Browse free professional invoice templates. Export PDF invoices in seconds.',
        url: 'https://invoicegenhub.com/templates',
        siteName: 'InvoiceGen',
        images: ['https://invoicegenhub.com/og-image.png'],
    },
};

export default function TemplatesIndexPage() {
    return (
        <div className="min-h-screen bg-white font-outfit">
            {/* Header Nav */}
            <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Invoice Generator
                    </Link>
                    <Link href="/">
                        <Button size="sm" className="font-bold bg-primary text-white hover:bg-primary/90 shadow-sm">
                            Create Free Invoice
                        </Button>
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="bg-gradient-to-b from-blue-50/60 via-indigo-50/20 to-white pt-16 pb-14 border-b border-gray-100">
                <div className="max-w-4xl mx-auto px-4 text-center space-y-5">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                        <Sparkles className="w-3.5 h-3.5" /> Free Invoicing Templates
                    </div>
                    <h1 className="text-4xl sm:text-6xl font-black text-gray-900 leading-tight tracking-tight">
                        Professional Invoice Templates
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Select a template customized for your industry. Add your branding, calculate taxes, and download high-resolution PDF invoices instantly.
                    </p>
                </div>
            </header>

            {/* Templates Grid */}
            <main className="max-w-5xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {invoiceTemplates.map((template) => (
                        <div
                            key={template.slug}
                            className="p-6 rounded-3xl bg-gray-50/80 border border-gray-200/80 hover:border-primary/50 hover:shadow-xl transition-all flex flex-col justify-between group"
                        >
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="p-3 rounded-2xl bg-white shadow-sm border border-gray-100 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                        <FileText className="w-6 h-6" />
                                    </div>
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                                        {template.industry}
                                    </span>
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                                    {template.shortTitle}
                                </h2>
                                <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                                    {template.summary}
                                </p>
                            </div>

                            <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between">
                                <Link
                                    href={`/templates/${template.slug}`}
                                    className="text-xs font-bold text-primary flex items-center gap-1 group-hover:underline"
                                >
                                    Template Guide & Preview <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                                <Link href="/">
                                    <Button size="sm" variant="outline" className="text-xs font-bold border-gray-200 hover:bg-primary hover:text-white hover:border-primary">
                                        Use Now
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-20 p-10 rounded-3xl bg-gray-900 text-white text-center space-y-6">
                    <h3 className="text-2xl sm:text-3xl font-black">Need a custom layout?</h3>
                    <p className="text-gray-400 text-sm max-w-md mx-auto">
                        InvoiceGen lets you customize colors, logos, VAT calculations, and line items completely free in real-time.
                    </p>
                    <Link href="/" className="inline-block">
                        <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold px-10">
                            Launch Invoice Generator
                        </Button>
                    </Link>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-16 border-t border-white/10">
                <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
                    <Link href="/" className="text-2xl font-black text-white hover:text-primary transition-colors">
                        InvoiceGen
                    </Link>
                    <p className="text-gray-400 text-sm max-w-md mx-auto">
                        Free online invoice generator for freelancers and businesses worldwide.
                    </p>
                    <div className="flex flex-wrap justify-center gap-6 text-xs text-gray-400 font-medium">
                        <Link href="/" className="hover:text-white transition-colors">Invoice Maker</Link>
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
