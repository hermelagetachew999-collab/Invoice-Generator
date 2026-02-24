"use client";

import React from 'react';
import { Card } from './ui/card';
import { CheckCircle2, Shield, Globe, Zap, Mail, HelpCircle, Layout } from 'lucide-react';

interface ContentSectionsProps {
    activeSection?: 'faq' | 'how-to' | 'terms' | 'about' | 'contact' | 'main';
}

export default function ContentSections({ activeSection = 'main' }: ContentSectionsProps) {
    if (activeSection === 'how-to') {
        return (
            <div className="space-y-12 max-w-4xl mx-auto py-8">
                <div className="text-center space-y-4">
                    <h2 className="text-3xl font-bold tracking-tight">How to Use InvoiceGen</h2>
                    <p className="text-gray-600 text-lg">Your complete guide to professional invoicing in minutes.</p>
                </div>

                <div className="space-y-16">
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center font-bold shadow-lg text-xl">1</div>
                            <h3 className="text-2xl font-bold">Configure Your Business Profile</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Start by entering your company name, address, and contact details. Don't forget to upload your logo and adjust its size and position. Professional branding increases trust and helps you get paid faster.
                            </p>
                            <ul className="space-y-2 text-sm text-gray-500">
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-green-500" /> Support for PNG, SVG, and JPG
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-green-500" /> Custom logo positioning (Left, Center, Right)
                                </li>
                            </ul>
                        </div>
                        <div className="bg-blue-50/50 rounded-2xl p-8 border border-blue-100 flex items-center justify-center min-h-[200px]">
                            <Layout className="w-16 h-16 text-blue-200" />
                        </div>
                    </section>

                    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center md:flex-row-reverse">
                        <div className="md:order-2 space-y-4">
                            <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center font-bold shadow-lg text-xl">2</div>
                            <h3 className="text-2xl font-bold">Manage Line Items & Billing</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Add your services or products as line items. Specify quantity and unit price—our engine calculates the totals in real-time. You can use the drag-and-drop feature to reorder items as they should appear on the invoice.
                            </p>
                            <div className="flex gap-4 pt-2">
                                <div className="text-center">
                                    <div className="font-bold text-primary">Drag & Drop</div>
                                    <div className="text-[10px] text-gray-400 uppercase">Reordering</div>
                                </div>
                                <div className="text-center">
                                    <div className="font-bold text-primary">VAT & Discounts</div>
                                    <div className="text-[10px] text-gray-400 uppercase">Automated</div>
                                </div>
                            </div>
                        </div>
                        <div className="md:order-1 bg-indigo-50/50 rounded-2xl p-8 border border-indigo-100 flex items-center justify-center min-h-[200px]">
                            <Zap className="w-16 h-16 text-indigo-200" />
                        </div>
                    </section>

                    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-purple-600 text-white rounded-2xl flex items-center justify-center font-bold shadow-lg text-xl">3</div>
                            <h3 className="text-2xl font-bold">Choose a Template & Export</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Select from our professional templates (Modern, Classic, Minimalist). Once satisfied with the preview, export your invoice as a high-quality PDF, Excel sheet for your records, or a PNG image.
                            </p>
                            <div className="grid grid-cols-3 gap-2 pt-2">
                                {['PDF', 'Excel', 'Image'].map(fmt => (
                                    <div key={fmt} className="bg-white border text-center py-2 rounded-lg text-xs font-bold text-gray-500">{fmt}</div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-purple-50/50 rounded-2xl p-8 border border-purple-100 flex items-center justify-center min-h-[200px]">
                            <Globe className="w-16 h-16 text-purple-200" />
                        </div>
                    </section>
                </div>

                <div className="bg-black text-white p-10 rounded-3xl shadow-xl space-y-6">
                    <h3 className="text-2xl font-bold flex items-center gap-3 italic">
                        <CheckCircle2 className="w-8 h-8 text-primary" /> Why Professionals Choose Us
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <h4 className="font-bold text-primary uppercase tracking-widest text-xs">Security First</h4>
                            <p className="text-gray-400 text-sm">We don't store your sensitive data. Everything is generated locally in your browser for maximum privacy.</p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-bold text-primary uppercase tracking-widest text-xs">Global Ready</h4>
                            <p className="text-gray-400 text-sm">Support for RTL languages, custom currencies, and global tax compliance standards built-in.</p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-bold text-primary uppercase tracking-widest text-xs">Mobile Optimized</h4>
                            <p className="text-gray-400 text-sm">Create and send invoices from your phone or tablet just as easily as from your desktop.</p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-bold text-primary uppercase tracking-widest text-xs">Speed</h4>
                            <p className="text-gray-400 text-sm">Zero learning curve. Our interface is designed for speed so you can get back to your work.</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (activeSection === 'faq') {
        return (
            <div className="space-y-12 max-w-4xl mx-auto py-8">
                <div className="text-center space-y-4">
                    <h2 className="text-3xl font-bold tracking-tight">Frequently Asked Questions</h2>
                    <p className="text-gray-600 text-lg">Everything you need to know about our platform.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                        {
                            q: "Is this tool really free?",
                            a: "Yes! Our core invoice generator is completely free. We offer premium tiers for heavy users or those who need to remove ads and unlock advanced features."
                        },
                        {
                            q: "What currencies are supported?",
                            a: "We support USD, EUR, and ETB natively, but you can manually enter any currency symbol to match your local requirements."
                        },
                        {
                            q: "Can I save my invoices for later?",
                            a: "Yes, by creating a free account, you can securely save and manage your invoice history across devices."
                        },
                        {
                            q: "Is my private data secure?",
                            a: "Absolutely. We use industry-standard encryption (AES-256) and don't share your financial details with third parties."
                        }
                    ].map((faq, i) => (
                        <Card key={i} className="p-6 border-none bg-gray-50 shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="font-bold text-lg mb-2 text-primary flex items-center gap-2">
                                <HelpCircle className="w-5 h-5" /> {faq.q}
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }

    if (activeSection === 'terms') {
        return (
            <div className="space-y-8 max-w-3xl mx-auto py-8">
                <div className="text-center space-y-4 mb-12">
                    <h2 className="text-3xl font-bold tracking-tight">Terms of Service</h2>
                    <p className="text-gray-500 italic text-sm">Last updated: February 24, 2026</p>
                </div>
                <div className="prose prose-blue max-w-none space-y-6 text-gray-600">
                    <section className="space-y-3">
                        <h3 className="text-xl font-bold text-gray-900 border-l-4 border-primary pl-4">1. Acceptance of Terms</h3>
                        <p>By accessing or using InvoiceGen, you agree to be bound by these Terms of Service. If you do not agree to all terms, you may not use the service.</p>
                    </section>
                    <section className="space-y-3">
                        <h3 className="text-xl font-bold text-gray-900 border-l-4 border-primary pl-4">2. Description of Service</h3>
                        <p>InvoiceGen provides a web-based platform for creating, managing, and exporting professional invoices. We offer both free and paid subscription tiers.</p>
                    </section>
                    <section className="space-y-3">
                        <h3 className="text-xl font-bold text-gray-900 border-l-4 border-primary pl-4">3. User Responsibilities</h3>
                        <p>You are solely responsible for the accuracy of the information provided in your invoices. InvoiceGen is not an accounting firm and does not provide legal or tax advice.</p>
                    </section>
                    <section className="space-y-3">
                        <h3 className="text-xl font-bold text-gray-900 border-l-4 border-primary pl-4">4. Payment and Subscriptions</h3>
                        <p>Premium features are available via monthly subscriptions. Payments are non-refundable. You can cancel your subscription at any time through your account settings.</p>
                    </section>
                    <section className="space-y-3">
                        <h3 className="text-xl font-bold text-gray-900 border-l-4 border-primary pl-4">5. Limitation of Liability</h3>
                        <p>InvoiceGen shall not be liable for any direct, indirect, or incidental damages resulting from the use or inability to use the service, including tax errors or financial disputes.</p>
                    </section>
                </div>
                <div className="mt-12 p-6 bg-gray-50 rounded-2xl text-center">
                    <p className="text-sm text-gray-500">Questions about our terms? Contact us at legal@invoicegen.com</p>
                </div>
            </div>
        );
    }

    if (activeSection === 'about') {
        return (
            <div className="space-y-12 max-w-4xl mx-auto py-8 text-center sm:text-left">
                <div className="text-center space-y-4 mb-16">
                    <h2 className="text-4xl font-bold tracking-tight">About Us</h2>
                    <p className="text-gray-600 text-lg">Empowering the world's independent workforce.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h3 className="text-3xl font-bold text-gray-900">Who We Are</h3>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            We are a passionate team of developers and designers who believe that professional tools should be accessible to everyone. Founded in 2024, our mission is to simplify the administrative burden for freelancers and small businesses worldwide.
                        </p>
                    </div>
                    <div className="bg-primary/5 rounded-3xl p-8 aspect-square flex items-center justify-center border border-primary/10">
                        <div className="text-center space-y-2">
                            <div className="text-5xl font-bold text-primary">50k+</div>
                            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Invoices Generated</div>
                        </div>
                    </div>
                </div>

                <div className="mt-20 space-y-8">
                    <h3 className="text-3xl font-bold text-gray-900 text-center">Our Purpose</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {[
                            { title: "Simplicity", desc: "Removing technical barriers from business administration.", icon: <Zap className="w-6 h-6" /> },
                            { title: "Privacy", desc: "Your data is yours. We prioritize local first architectures.", icon: <Shield className="w-6 h-6" /> },
                            { title: "Accessibility", desc: "Fair pricing and global compatibility for all regions.", icon: <Globe className="w-6 h-6" /> }
                        ].map((item, idx) => (
                            <div key={idx} className="p-8 bg-white border border-gray-100 rounded-3xl hover:shadow-xl transition-all group">
                                <div className="p-3 bg-primary/10 rounded-2xl w-fit mb-4 group-hover:bg-primary group-hover:text-white transition-colors text-primary italic">
                                    {item.icon}
                                </div>
                                <h4 className="font-black text-xl mb-2">{item.title}</h4>
                                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (activeSection === 'contact') {
        return (
            <div className="space-y-12 max-w-4xl mx-auto py-8">
                <div className="text-center space-y-4 mb-16">
                    <h2 className="text-4xl font-bold tracking-tight">Contact Us</h2>
                    <p className="text-gray-600 text-lg">We're here to help you grow your business.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                    <div className="md:col-span-4 space-y-8">
                        <div className="space-y-4">
                            <h3 className="font-bold text-lg">Direct Reach</h3>
                            <div className="flex items-center gap-3 text-gray-600">
                                <Mail className="w-5 h-5 text-primary" />
                                <span>support@invoicegen.com</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-600">
                                <Globe className="w-5 h-5 text-primary" />
                                <span>Global Support Center</span>
                            </div>
                        </div>
                        <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10">
                            <h4 className="font-bold text-sm mb-2 text-primary">Inquiry Types</h4>
                            <p className="text-xs text-gray-500 leading-relaxed">
                                Feel free to reach out for feature requests, partnership opportunities, or technical assistance with your premium account.
                            </p>
                        </div>
                    </div>

                    <div className="md:col-span-8 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 ml-1">Your Name</label>
                                    <input className="w-full h-12 bg-gray-50 border-none rounded-xl px-4 text-sm focus:ring-2 ring-primary/20 transition-all font-medium" placeholder="Jane Doe" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 ml-1">Email Address</label>
                                    <input className="w-full h-12 bg-gray-50 border-none rounded-xl px-4 text-sm focus:ring-2 ring-primary/20 transition-all font-medium" placeholder="jane@example.com" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 ml-1">Message</label>
                                <textarea className="w-full min-h-[120px] bg-gray-50 border-none rounded-xl p-4 text-sm focus:ring-2 ring-primary/20 transition-all font-medium" placeholder="How can we help you?" />
                            </div>
                            <button className="w-full h-12 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.01] active:scale-[0.99] transition-all">
                                Send Inquiry
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    // Main section shown on homepage (optional, if you want something there too)
    return (
        <div className="mt-20 max-w-5xl mx-auto space-y-20 pb-20 border-t pt-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider">
                        <Globe className="w-3 h-3" /> Global Standard
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 leading-tight">Professional Invoicing for Every Market</h2>
                    <p className="text-lg text-gray-600">
                        Whether you're a designer in London, a developer in New York, or a writer in Tokyo, our tool adapts to your needs. Create professional invoices that get you paid faster.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                            <span className="text-sm font-medium">Automatic Calculations</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                            <span className="text-sm font-medium">Multiple Templates</span>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-100 rounded-3xl p-8 border border-dashed border-gray-300 h-64 flex items-center justify-center text-gray-400 font-medium">
                    Feature Illustration
                </div>
            </div>
        </div>
    );
}
