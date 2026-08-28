"use client";

import React from 'react';
import { Article } from '@/lib/articles';
import { articles } from '@/lib/articles';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Clock, Share2, Facebook, Linkedin, Twitter, FileText, ChevronRight, CheckCircle2, Sparkles, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import AdsterraNativeBanner from '@/components/AdsterraNativeBanner';

interface ArticleClientProps {
    article: Article;
    slug: string;
}

export default function ArticleClient({ article, slug }: ArticleClientProps) {
    return (
        <div className="min-h-screen bg-white font-outfit">
            {/* Article Header Nav */}
            <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Invoice Generator
                    </Link>
                    <div className="hidden sm:flex items-center gap-2">
                        <div className="bg-primary/10 p-1.5 rounded-lg">
                            <FileText className="text-primary w-4 h-4" />
                        </div>
                        <span className="text-sm font-bold text-gray-900">InvoiceGen Blog</span>
                    </div>
                    <Link href="/">
                        <Button size="sm" className="font-bold bg-primary text-white hover:bg-primary/90 shadow-sm">
                            Create Invoice
                        </Button>
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="bg-gradient-to-b from-blue-50/50 to-white pt-16 pb-12 border-b border-gray-100">
                <div className="max-w-4xl mx-auto px-4 space-y-5">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-widest">
                        {article.category}
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-black text-gray-900 leading-tight tracking-tight">
                        {article.title}
                    </h1>
                    <p className="text-lg text-gray-600 leading-relaxed font-normal">
                        {article.excerpt}
                    </p>
                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 font-medium pt-2">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-primary" />
                            {article.date}
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-primary" />
                            {article.readTime}
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-4 py-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Article Body */}
                    <div className="flex-1 min-w-0">
                        {/* Interactive In-Article CTA */}
                        <div className="mb-10 p-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 font-bold text-sm text-blue-100">
                                    <Sparkles className="w-4 h-4 text-yellow-300" />
                                    Instant Free Tool
                                </div>
                                <div className="text-lg font-bold">Need to create a professional invoice now?</div>
                                <div className="text-xs text-blue-100">Free PDF generator, custom logo, tax calculation, no registration.</div>
                            </div>
                            <Link href="/" className="whitespace-nowrap">
                                <Button className="bg-white text-blue-700 hover:bg-blue-50 font-bold shadow-md">
                                    Launch Generator &rarr;
                                </Button>
                            </Link>
                        </div>

                        <div className="prose prose-blue prose-lg max-w-none 
              prose-headings:font-black prose-headings:text-gray-900 
              prose-p:text-gray-700 prose-p:leading-relaxed 
              prose-strong:text-gray-900 prose-strong:font-bold
              prose-ul:list-disc prose-li:text-gray-700
              prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:p-6 prose-blockquote:rounded-r-2xl prose-blockquote:italic
              prose-table:text-sm prose-th:text-left prose-th:bg-gray-50 prose-th:p-3 prose-td:p-3 prose-tr:border-b
            ">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {article.content}
                            </ReactMarkdown>
                        </div>

                        {/* Frequently Asked Questions Section */}
                        {article.faqs && article.faqs.length > 0 && (
                            <section className="mt-16 pt-10 border-t border-gray-200">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 rounded-xl bg-primary/10 text-primary">
                                        <HelpCircle className="w-6 h-6" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
                                </div>
                                <div className="space-y-4">
                                    {article.faqs.map((faq, idx) => (
                                        <div key={idx} className="p-5 rounded-2xl bg-gray-50 border border-gray-100 space-y-2">
                                            <h3 className="text-base font-bold text-gray-900 flex items-start gap-2">
                                                <span className="text-primary font-bold">Q:</span> {faq.question}
                                            </h3>
                                            <p className="text-sm text-gray-600 leading-relaxed pl-6">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Bottom CTA Card */}
                        <div className="mt-12 p-8 rounded-3xl bg-gray-900 text-white text-center space-y-4">
                            <h3 className="text-2xl font-bold">Ready to send your next professional invoice?</h3>
                            <p className="text-gray-400 text-sm max-w-lg mx-auto">
                                Generate and download clean, customized PDF invoices in under 60 seconds with InvoiceGen.
                            </p>
                            <Link href="/" className="inline-block pt-2">
                                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold px-8">
                                    Create Free Invoice Now
                                </Button>
                            </Link>
                        </div>

                        {/* Social Share Bottom */}
                        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Share this article</div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`, '_blank')}
                                    className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:scale-110 transition-transform"
                                    aria-label="Share on Facebook"
                                >
                                    <Facebook className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`, '_blank')}
                                    className="w-9 h-9 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center hover:scale-110 transition-transform"
                                    aria-label="Share on LinkedIn"
                                >
                                    <Linkedin className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&text=${encodeURIComponent(article.title)}`, '_blank')}
                                    className="w-9 h-9 rounded-full bg-sky-50 text-sky-500 flex items-center justify-center hover:scale-110 transition-transform"
                                    aria-label="Share on Twitter"
                                >
                                    <Twitter className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="w-full lg:w-72 shrink-0 space-y-8">
                        <div className="sticky top-24 space-y-8">
                            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 space-y-4">
                                <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Related Articles</h4>
                                <div className="space-y-4">
                                    {articles.filter(a => a.slug !== slug).slice(0, 4).map(a => (
                                        <Link key={a.slug} href={`/articles/${a.slug}`} className="group block space-y-1">
                                            <h5 className="font-bold text-sm text-gray-900 group-hover:text-primary transition-colors leading-snug line-clamp-2">
                                                {a.title}
                                            </h5>
                                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1">
                                                {a.category} <ChevronRight className="w-3 h-3 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>

                {/* Native Banner Ad */}
                <AdsterraNativeBanner />
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-16 mt-20">
                <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
                    <Link href="/" className="text-2xl font-black text-white hover:text-primary transition-colors">
                        InvoiceGen
                    </Link>
                    <p className="text-gray-400 text-sm max-w-md mx-auto">
                        Free PDF invoice generator built for freelancers, contractors, and small businesses worldwide.
                    </p>
                    <div className="flex justify-center gap-6 text-xs text-gray-400 font-medium">
                        <Link href="/" className="hover:text-white transition-colors">Invoice Maker</Link>
                        <Link href="/about" className="hover:text-white transition-colors">About</Link>
                        <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
                        <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                    <div className="pt-8 border-t border-white/10 text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                        &copy; 2026 InvoiceGen. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}
