"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Shield, Lock, Eye, FileText } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPolicy() {
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
                            <Shield className="text-primary w-4 h-4" />
                        </div>
                        <span className="text-sm font-bold text-gray-900">Privacy Center</span>
                    </div>
                </div>
            </nav>

            <main className="max-w-4xl mx-auto px-4 py-20">
                <div className="space-y-12">
                    <header className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-600 text-[10px] font-bold uppercase tracking-widest">
                            Updated February 2026
                        </div>
                        <h1 className="text-4xl sm:text-6xl font-black text-gray-900 leading-tight">Privacy Policy</h1>
                        <p className="text-xl text-gray-500 leading-relaxed font-medium">
                            Your data privacy is our absolute priority. Here is how we handle your information.
                        </p>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10 border-y border-gray-100">
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                                <Lock className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-gray-900 text-lg">No Server Storage</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">Most invoice processing happens in your browser. We don't store your clients' financial data.</p>
                        </div>
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center">
                                <Eye className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-gray-900 text-lg">Transparency</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">No hidden tracking. We only use essential cookies to keep you logged in and improve UX.</p>
                        </div>
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center">
                                <Shield className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-gray-900 text-lg">Your Control</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">You can delete your account and all associated profile data at any time.</p>
                        </div>
                    </div>

                    <article className="prose prose-blue prose-lg max-w-none 
                        prose-headings:font-black prose-headings:text-gray-900 
                        prose-p:text-gray-600 prose-p:leading-relaxed 
                        prose-strong:text-gray-900 prose-strong:font-bold
                    ">
                        <h2>1. Introduction</h2>
                        <p>Welcome to InvoiceGen. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us.</p>

                        <h2>2. Information We Collect</h2>
                        <p>We only collect information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services or otherwise when you contact us.</p>
                        <p><strong>Personal Information:</strong> We collect names, email addresses, and passwords for authentication purposes.</p>
                        <p><strong>Invoice Data:</strong> To maximize privacy, the majority of invoice generation happens "Client-Side" (in your web browser). We do not store sensitive invoice details or client lists on our servers unless you explicitly save them to your profile (pro features).</p>

                        <h2>3. How We Use Your Information</h2>
                        <p>We use personal information collected via our Services for a variety of business purposes described below:</p>
                        <ul>
                            <li>To facilitate account creation and logon process.</li>
                            <li>To send administrative information to you.</li>
                            <li>To protect our Services from fraud and abuse.</li>
                            <li>To manage user accounts.</li>
                        </ul>

                        <h2>4. Cookies and Tracking</h2>
                        <p>We may use cookies and similar tracking technologies to access or store information. Most Web browsers are set to accept cookies by default. You can choose to set your browser to remove cookies and to reject cookies if you prefer.</p>

                        <h2>5. Storage and Security</h2>
                        <p>We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure.</p>

                        <h2>6. Your Privacy Rights</h2>
                        <p>In some regions, such as the European Economic Area (EEA) and United Kingdom (UK), you have rights that allow you greater access to and control over your personal information. You may review, change, or terminate your account at any time.</p>

                        <h2>7. Contact Us</h2>
                        <p>If you have questions or comments about this policy, you may email us at: <strong>hermelagetachew999@gmail.com</strong></p>
                    </article>
                </div>
            </main>

            <footer className="bg-gray-900 text-white py-20">
                <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
                    <div className="text-2xl font-black">InvoiceGen</div>
                    <p className="text-gray-400 max-w-md mx-auto">Committed to transparency and user privacy since 2024.</p>
                    <div className="pt-10 border-t border-white/10 text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                        &copy; 2026 InvoiceGen. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}
