"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Globe, Zap, Heart, User } from 'lucide-react';
import Link from 'next/link';

export default function AboutUs() {
    return (
        <div className="min-h-screen bg-white font-outfit text-gray-900">
            <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                    <div className="flex items-center gap-2">
                        <div className="bg-primary/10 p-1.5 rounded-lg">
                            <User className="text-primary w-4 h-4" />
                        </div>
                        <span className="text-sm font-bold text-gray-900">About Us</span>
                    </div>
                </div>
            </nav>

            <main className="max-w-4xl mx-auto px-4 py-20 space-y-24">
                <header className="text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest">
                        Our Mission
                    </div>
                    <h1 className="text-5xl sm:text-7xl font-black leading-tight tracking-tighter">
                        Empowering the Independent <span className="text-primary">Workforce.</span>
                    </h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-medium">
                        InvoiceGen is a free, professional invoice tool built specifically for freelancers in Ethiopia and worldwide.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-20 border-y border-gray-100">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-black">Why We Exist</h2>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Administrative tasks should never be a barrier to creativity or growth. We saw that many freelancers were struggling with complex, expensive, and bloated invoicing tools.
                        </p>
                        <p className="text-lg text-gray-600 leading-relaxed font-bold italic">
                            "We built the tool we wanted to use: fast, secure, and beautiful."
                        </p>
                    </div>
                    <div className="relative group p-10 bg-gray-50 rounded-[3rem] border border-gray-100 flex items-center justify-center aspect-square shadow-inner">
                        <div className="text-center">
                            <div className="text-7xl font-black text-primary mb-2">2024</div>
                            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Launched for the World</div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                    {[
                        { title: "Global & Local", desc: "Designed for international standards but optimized for local markets like Ethiopia.", icon: <Globe className="w-6 h-6" /> },
                        { title: "Speed First", desc: "Generate a professional PDF in under 60 seconds with our intuitive UI.", icon: <Zap className="w-6 h-6" /> },
                        { title: "User Centric", desc: "No complex onboarding. Just open the tool and start billing.", icon: <Heart className="w-6 h-6" /> }
                    ].map((feature, idx) => (
                        <div key={idx} className="space-y-4 p-8 bg-white border border-gray-100 rounded-3xl hover:shadow-2xl hover:-translate-y-1 transition-all">
                            <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
                                {feature.icon}
                            </div>
                            <h3 className="font-bold text-xl">{feature.title}</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="bg-primary p-12 rounded-[3rem] text-white text-center space-y-8 shadow-2xl shadow-primary/20">
                    <h3 className="text-4xl font-black">Support Our Journey</h3>
                    <p className="text-lg text-primary-foreground/90 max-w-xl mx-auto">
                        InvoiceGen is a 100% free tool. Your feedback and support help us keep the servers running and the features coming.
                    </p>
                    <Link href="/contact" className="inline-block bg-white text-primary font-bold px-8 py-4 rounded-2xl hover:scale-105 transition-transform">
                        Get In Touch
                    </Link>
                </div>
            </main>

            <footer className="bg-gray-900 text-white py-20">
                <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
                    <div className="text-2xl font-black">InvoiceGen</div>
                    <p className="text-gray-400 max-w-md mx-auto">Built by freelancers, for freelancers.</p>
                    <div className="pt-10 border-t border-white/10 text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                        &copy; 2026 InvoiceGen. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}
