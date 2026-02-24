"use client";

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { articles } from '@/lib/articles';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Clock, Share2, Facebook, Linkedin, Twitter, FileText, ChevronRight } from 'lucide-react';
import Link from 'next/link';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function ArticlePage() {
    const { slug } = useParams();
    const router = useRouter();
    const article = articles.find(a => a.slug === slug);

    if (!article) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50 font-outfit">
                <div className="text-center space-y-6 max-w-md">
                    <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto text-primary">
                        <FileText className="w-10 h-10" />
                    </div>
                    <h1 className="text-3xl font-black text-gray-900">Article Not Found</h1>
                    <p className="text-gray-600">The resource you are looking for doesn't exist or has been moved.</p>
                    <Button onClick={() => router.push('/')} className="w-full h-12 rounded-xl font-bold">
                        Return Home
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white font-outfit">
            {/* Article Header Nav */}
            <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                    <div className="hidden sm:flex items-center gap-2">
                        <div className="bg-primary/10 p-1.5 rounded-lg">
                            <FileText className="text-primary w-4 h-4" />
                        </div>
                        <span className="text-sm font-bold text-gray-900">InvoiceGen Blog</span>
                    </div>
                    <Button variant="ghost" size="icon" className="text-gray-400">
                        <Share2 className="w-5 h-5" />
                    </Button>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="bg-gray-50 pt-20 pb-16 border-b border-gray-100">
                <div className="max-w-4xl mx-auto px-4 space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest">
                        {article.category}
                    </div>
                    <h1 className="text-4xl sm:text-6xl font-black text-gray-900 leading-tight">
                        {article.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 font-medium">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {article.date}
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {article.readTime}
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-4 py-20">
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Article Body */}
                    <div className="flex-1">
                        <div className="prose prose-blue prose-lg max-w-none 
              prose-headings:font-black prose-headings:text-gray-900 
              prose-p:text-gray-600 prose-p:leading-relaxed 
              prose-strong:text-gray-900 prose-strong:font-bold
              prose-ul:list-disc prose-li:text-gray-600
              prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:p-6 prose-blockquote:rounded-r-2xl prose-blockquote:italic
              prose-table:text-sm prose-th:text-left prose-th:bg-gray-50 prose-th:p-2 prose-td:p-2 prose-tr:border-b
            ">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {article.content}
                            </ReactMarkdown>
                        </div>

                        {/* Social Share Bottom */}
                        <div className="mt-20 pt-10 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                            <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">Share this article</div>
                            <div className="flex items-center gap-4">
                                <button className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:scale-110 transition-transform">
                                    <Facebook className="w-5 h-5" />
                                </button>
                                <button className="w-10 h-10 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center hover:scale-110 transition-transform">
                                    <Linkedin className="w-5 h-5" />
                                </button>
                                <button className="w-10 h-10 rounded-full bg-sky-50 text-sky-500 flex items-center justify-center hover:scale-110 transition-transform">
                                    <Twitter className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="w-full lg:w-72 space-y-12">
                        <div className="sticky top-32 space-y-10">
                            <div className="space-y-4">
                                <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Up Next</h4>
                                <div className="space-y-6">
                                    {articles.filter(a => a.slug !== slug).slice(0, 3).map(a => (
                                        <Link key={a.slug} href={`/articles/${a.slug}`} className="group block space-y-2">
                                            <h5 className="font-bold text-gray-900 group-hover:text-primary transition-colors leading-snug line-clamp-2">
                                                {a.title}
                                            </h5>
                                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-2">
                                                {a.category} <ChevronRight className="w-3 h-3" />
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-primary p-8 rounded-[2rem] text-white space-y-4 shadow-xl shadow-primary/20">
                                <Crown className="w-8 h-8 text-yellow-300" />
                                <h4 className="text-xl font-bold">Try InvoiceGen Pro</h4>
                                <p className="text-primary-foreground/80 text-sm leading-relaxed">
                                    Unlock advanced templates, remove ads, and get unlimited PDF downloads.
                                </p>
                                <Button className="w-full bg-white text-primary hover:bg-white/90 font-bold h-12 rounded-xl">
                                    Upgrade Now
                                </Button>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-20 mt-20">
                <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
                    <div className="text-2xl font-black">InvoiceGen</div>
                    <p className="text-gray-400 max-w-md mx-auto">Providing freelancers and small businesses with the tools they need to succeed in the modern economy.</p>
                    <div className="pt-10 border-t border-white/10 text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                        &copy; 2026 InvoiceGen. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}

// Icons needed for sidebar
function Crown({ className }: { className?: string }) {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" />
        </svg>
    );
}
