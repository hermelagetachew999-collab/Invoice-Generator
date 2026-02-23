"use client";

import React from 'react';
import { Card } from './ui/card';
import { CheckCircle2, Shield, Globe, Zap, Mail, HelpCircle } from 'lucide-react';

interface ContentSectionsProps {
    activeSection?: 'faq' | 'how-to' | 'main';
}

export default function ContentSections({ activeSection = 'main' }: ContentSectionsProps) {
    if (activeSection === 'how-to') {
        return (
            <div className="space-y-12 max-w-4xl mx-auto py-8">
                <div className="text-center space-y-4">
                    <h2 className="text-4xl font-black tracking-tight">How to Create an Invoice</h2>
                    <p className="text-gray-500 text-lg">Master professional billing with our step-by-step guide.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-4 p-6 bg-blue-50 rounded-2xl border border-blue-100">
                        <div className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center font-bold shadow-lg">1</div>
                        <h3 className="font-bold text-xl">Sender Details</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">Enter your business name, address, and Tax ID. Upload your logo to build trust and brand recognition.</p>
                    </div>
                    <div className="space-y-4 p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
                        <div className="w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center font-bold shadow-lg">2</div>
                        <h3 className="font-bold text-xl">Line Items</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">Add your services or products. Set quantities and unit prices. Our tool handles all calculations automatically.</p>
                    </div>
                    <div className="space-y-4 p-6 bg-purple-50 rounded-2xl border border-purple-100">
                        <div className="w-12 h-12 bg-purple-600 text-white rounded-xl flex items-center justify-center font-bold shadow-lg">3</div>
                        <h3 className="font-bold text-xl">Export & Send</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">Preview your professional PDF, Excel, or Image invoice. Download it or share it directly with your client via email.</p>
                    </div>
                </div>

                <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 mt-12">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <Zap className="w-6 h-6 text-yellow-500" /> Pro Tips for Faster Payments
                    </h3>
                    <ul className="space-y-4">
                        {[
                            "Be Specific: Detail your services clearly to avoid client questions.",
                            "Set Due Dates: Always specify when you expect to be paid.",
                            "Offer Multiple Payment Methods: Use our QR code feature for bank transfers.",
                            "Professional Branding: Consistent logos and colors build client confidence."
                        ].map((tip, i) => (
                            <li key={i} className="flex gap-3 items-start">
                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <span className="text-gray-600">{tip}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }

    if (activeSection === 'faq') {
        return (
            <div className="space-y-12 max-w-4xl mx-auto py-8">
                <div className="text-center space-y-4">
                    <h2 className="text-4xl font-black tracking-tight">Frequently Asked Questions</h2>
                    <p className="text-gray-500 text-lg">Clear answers to your billing and platform questions.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                        {
                            q: "Is this tool really free?",
                            a: "Yes! Our core invoice generator is completely free for all freelancers globally. No hidden fees or subscriptions required."
                        },
                        {
                            q: "What currencies are supported?",
                            a: "We support all major global currencies including USD, EUR, GBP, and many others. You can manually enter any currency symbol in the settings."
                        },
                        {
                            q: "How secure is my financial data?",
                            a: "Maximum security is our priority. No invoice data is stored on our servers unless you are signed in. Everything is processed locally in your browser."
                        },
                        {
                            q: "Can I use my own logo?",
                            a: "Absolutely. You can upload high-quality PNG, JPG, or SVG logos and customize their size and position on the invoice."
                        },
                        {
                            q: "Are the invoices legally compliant?",
                            a: "Our templates follow global standard accounting practices. You can include Tax IDs (TIN, VAT, GST) as required by your local tax authority."
                        },
                        {
                            q: "What export formats are available?",
                            a: "Currently, you can export as professional PDF, Excel (.xlsx) for bookkeeping, or PNG image for quick sharing."
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

                <div className="mt-16 p-8 bg-black text-white rounded-3xl relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold mb-4">Terms of Service</h2>
                        <div className="space-y-4 text-gray-400 text-sm">
                            <p>By using InvoiceGen, you agree to the following terms:</p>
                            <p>1. <strong>Service Use:</strong> This tool is provided "as is" for invoice generation. You are responsible for the accuracy of all financial data entered.</p>
                            <p>2. <strong>Data Privacy:</strong> We do not sell or share your data. Signed-in users' data is encrypted and stored securely.</p>
                            <p>3. <strong>Compliance:</strong> It is your responsibility to ensure generated invoices comply with your local tax laws and regulations.</p>
                            <p>4. <strong>Liability:</strong> InvoiceGen is not liable for any financial disputes, tax errors, or data loss resulting from the use of this free tool.</p>
                        </div>
                    </div>
                    <Shield className="absolute -bottom-10 -right-10 w-64 h-64 text-white/5" />
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
