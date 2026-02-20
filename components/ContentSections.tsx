"use client";

import React from 'react';
import { Card } from './ui/card';

export default function ContentSections() {
    return (
        <div className="space-y-16 mt-20 max-w-4xl mx-auto">
            <section id="about" className="space-y-4">
                <h2 className="text-3xl font-bold">Why Freelancers Need Professional Invoices</h2>
                <p className="text-lg text-gray-600">
                    For freelancers and small business owners in Ethiopia, a professional invoice is more than just a request for payment&mdash;it&apos;s a critical legal document. It helps track your income, provides clarity to your clients, and simplifies your tax obligations. Whether you&apos;re a developer in Addis Ababa or a designer in Mekelle, our tool helps you create professional ETB invoices in seconds.
                </p>
            </section>

            <section id="how-to-use" className="space-y-6">
                <h2 className="text-3xl font-bold">How to Use the Invoice Generator</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-2">
                        <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">1</div>
                        <h3 className="font-bold text-xl">Enter Details</h3>
                        <p className="text-gray-600">Fill in your business name, address, and TIN. Add your client&apos;s information clearly.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">2</div>
                        <h3 className="font-bold text-xl">Add Services</h3>
                        <p className="text-gray-600">List your line items. Our tool automatically calculates Subtotals and VAT (15%).</p>
                    </div>
                    <div className="space-y-2">
                        <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">3</div>
                        <h3 className="font-bold text-xl">Download PDF</h3>
                        <p className="text-gray-600">Preview your invoice in real-time and download a professional PDF file for your client.</p>
                    </div>
                </div>
            </section>

            <section id="faq" className="space-y-8">
                <h2 className="text-3xl font-bold text-center">Frequently Asked Questions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card className="p-6 space-y-2">
                        <h3 className="font-bold">What is the standard VAT rate in Ethiopia?</h3>
                        <p className="text-gray-600">The standard Value Added Tax (VAT) rate in Ethiopia is 15%. Our tool uses this as the default calculation.</p>
                    </Card>
                    <Card className="p-6 space-y-2">
                        <h3 className="font-bold">Is a TIN (Taxpayer Identification Number) required?</h3>
                        <p className="text-gray-600">While optional for small freelance gigs, a TIN is mandatory for registered businesses and professionals to issue legal VAT invoices.</p>
                    </Card>
                    <Card className="p-6 space-y-2">
                        <h3 className="font-bold">Can I use this for international clients?</h3>
                        <p className="text-gray-600">Yes! You can change the currency symbols or rates manually if needed, though it&apos;s optimized for Ethiopian Birr (ETB).</p>
                    </Card>
                    <Card className="p-6 space-y-2">
                        <h3 className="font-bold">Is my data secure?</h3>
                        <p className="text-gray-600">We do not store your invoice data. Everything is processed in your browser, ensuring maximum privacy for your financial details.</p>
                    </Card>
                </div>
            </section>
        </div>
    );
}
