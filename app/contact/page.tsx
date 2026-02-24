"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Mail, MessageSquare, Linkedin, Twitter, Github, Globe } from 'lucide-react';
import Link from 'next/link';

export default function Contact() {
    return (
        <div className="min-h-screen bg-white font-outfit">
            <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                    <div className="flex items-center gap-2">
                        <div className="bg-primary/10 p-1.5 rounded-lg">
                            <MessageSquare className="text-primary w-4 h-4" />
                        </div>
                        <span className="text-sm font-bold text-gray-900">Support Center</span>
                    </div>
                </div>
            </nav>

            <main className="max-w-4xl mx-auto px-4 py-20 space-y-20">
                <header className="text-center space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest">
                        Get In Touch
                    </div>
                    <h1 className="text-5xl sm:text-7xl font-black text-gray-900 leading-tight">We're Here to <span className="text-primary">Help.</span></h1>
                    <p className="text-xl text-gray-500 max-w-xl mx-auto font-medium">
                        Have a question about our tools? Found a bug? Or just want to say hi? Reach out through any of the channels below.
                    </p>
                </header>

                <div className="max-w-2xl mx-auto">
                    <div className="bg-gray-50 p-10 rounded-[3rem] border border-gray-100 flex flex-col justify-between space-y-12 shadow-sm">
                        <div className="space-y-4">
                            <div className="w-16 h-16 bg-white rounded-3xl shadow-sm flex items-center justify-center text-primary">
                                <Mail className="w-8 h-8" />
                            </div>
                            <h2 className="text-3xl font-black">Email Support</h2>
                            <p className="text-gray-500 font-medium">Our team typically responds within 24 hours on business days.</p>
                        </div>
                        <a
                            href="mailto:hermelagetachew999@gmail.com"
                            className="w-full h-16 bg-primary text-white font-bold rounded-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all text-lg shadow-xl shadow-primary/20"
                        >
                            hermelagetachew999@gmail.com
                        </a>
                    </div>
                </div>

                <div className="bg-white border text-center border-gray-100 p-12 rounded-[3rem] space-y-6">
                    <h3 className="text-2xl font-black">Troubleshooting?</h3>
                    <p className="text-gray-500 max-w-md mx-auto">
                        Before reaching out, you might find the answer in our Help & FAQ section on the home page.
                    </p>
                    <Link href="/#faq" className="inline-block text-primary font-bold underline underline-offset-8 decoration-2 hover:text-primary/80 transition-colors">
                        Go to FAQ
                    </Link>
                </div>
            </main>

            <footer className="bg-gray-900 text-white py-20">
                <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
                    <div className="text-2xl font-black">InvoiceGen</div>
                    <p className="text-gray-400 max-w-md mx-auto">Connecting with our community since 2024.</p>
                    <div className="pt-10 border-t border-white/10 text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                        &copy; 2026 InvoiceGen. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}
