"use client";

import React from 'react';
import { Card } from './ui/card';

interface LineItem {
    id: string;
    description: string;
    quantity: number;
    unitPrice: number;
}

interface InvoiceData {
    businessName: string;
    businessAddress: string;
    businessTIN: string;
    clientName: string;
    clientAddress: string;
    items: LineItem[];
    vatRate: number;
    invoiceNumber: string;
    logo?: string;
    logoPosition?: 'left' | 'center' | 'right';
    logoSize?: number;
    template: 'modern' | 'classic' | 'minimalist';
    currency: string;
    language: 'en' | 'am' | 'ar';
    dueDate?: string;
    poNumber?: string;
    slogan?: string;
    notes?: string;
    clientEmail?: string;
    bankName?: string;
    accountNumber?: string;
    showQRCode?: boolean;
    pdfPassword?: string;
    showPrivacyConsent?: boolean;
    bankDetails?: string;
    terms?: string;
}

const translations = {
    en: {
        invoice: "Invoice", billTo: "Bill To", description: "Description", qty: "Qty",
        unitPrice: "Unit Price", amount: "Amount", subtotal: "Subtotal", vat: "VAT",
        total: "Total", thankYou: "Thank you for your business!", tin: "TIN",
        dueDate: "Due Date", poNumber: "PO Number", notes: "Notes",
        bankDetails: "Bank Details", terms: "Terms & Conditions"
    },
    am: {
        invoice: "ደረሰኝ", billTo: "ለማን፡", description: "ገለፃ", qty: "ብዛት",
        unitPrice: "የአንዱ ዋጋ", amount: "አጠቃላይ ዋጋ", subtotal: "ንዑስ ድምር", vat: "ተጨማሪ እሴት ታክስ",
        total: "ጠቅላላ ድምር", thankYou: "ስለመረጡን እናመሰግናለን!", tin: "የግብር ከፋይ መለያ ቁጥር",
        dueDate: "መክፈያ ቀን", poNumber: "የግዢ ትዕዛዝ ቁጥር", notes: "ማስታወሻ",
        bankDetails: "የባንክ ሂሳብ", terms: "ውሎች እና ሁኔታዎች"
    },
    ar: {
        invoice: "فاتورة", billTo: "فلترة إلى", description: "الوصف", qty: "الكمية",
        unitPrice: "سعر الوحدة", amount: "المبلغ", subtotal: "المجموع الفرعي", vat: "ضريبة القيمة المضافة",
        total: "الإجمالي", thankYou: "شكراً لتعاملكم معنا!", tin: "الرقم الضريبي",
        dueDate: "تاريخ الاستحقاق", poNumber: "رقم طلب الشراء", notes: "ملاحظات",
        bankDetails: "تفاصيل البنك", terms: "الشروط والأحكام"
    }
};

export default function InvoicePreview({ data }: { data: InvoiceData }) {
    const t = translations[data.language || 'en'];
    const subtotal = data.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
    const vatAmount = (subtotal * data.vatRate) / 100;
    const total = subtotal + vatAmount;

    const renderHeader = () => {
        if (data.template === 'classic') {
            return (
                <div className="text-center mb-12 border-b-2 border-black pb-8">
                    {data.logo && (
                        <div className="mb-4 flex justify-center">
                            <img src={data.logo} alt="Logo" style={{ width: `${data.logoSize}px`, height: 'auto' }} />
                        </div>
                    )}
                    <h2 className="text-2xl font-bold">{data.businessName || 'Your Company'}</h2>
                    {data.slogan && <p className="text-sm italic text-gray-500">{data.slogan}</p>}
                    <p className="text-gray-600">{data.businessAddress}</p>
                    {data.businessTIN && <p className="text-sm">{t.tin}: {data.businessTIN}</p>}
                </div>
            );
        }

        if (data.template === 'minimalist') {
            return (
                <div className="mb-12">
                    <div className="flex justify-between items-start">
                        {data.logo && (
                            <img src={data.logo} alt="Logo" style={{ width: `${data.logoSize}px`, height: 'auto' }} />
                        )}
                        <div className="text-right">
                            <h1 className="text-4xl font-light uppercase tracking-tighter uppercase">{t.invoice}</h1>
                            <p className="text-gray-400">#{data.invoiceNumber}</p>
                        </div>
                    </div>
                    <div className="mt-8">
                        <h2 className="text-lg font-semibold">{data.businessName}</h2>
                        <p className="text-sm text-gray-500">{data.businessAddress}</p>
                    </div>
                </div>
            );
        }

        // Modern (Default)
        return (
            <>
                {data.logo && (
                    <div className={`mb-8 flex ${data.logoPosition === 'center' ? 'justify-center' :
                        data.logoPosition === 'right' ? 'justify-end' : 'justify-start'
                        }`}>
                        <img src={data.logo} alt="Logo" style={{ width: `${data.logoSize}px`, height: 'auto' }} />
                    </div>
                )}
                <div className="flex justify-between items-start mb-12">
                    <div>
                        <h1 className="text-4xl font-black uppercase tracking-tight text-primary mb-2">{t.invoice}</h1>
                        <p className="text-gray-500 font-mono">#{data.invoiceNumber}</p>
                        {data.slogan && <p className="text-sm italic text-primary/70 mt-1">{data.slogan}</p>}
                    </div>
                    <div className="text-right">
                        <h2 className="text-xl font-bold">{data.businessName || 'Your Company'}</h2>
                        <p className="text-gray-600 max-w-xs">{data.businessAddress}</p>
                        {data.businessTIN && <p className="text-gray-600">{t.tin}: {data.businessTIN}</p>}
                    </div>
                </div>
            </>
        );
    };

    return (
        <Card className={`p-8 bg-white text-black min-h-[800px] flex flex-col shadow-lg transition-all duration-300 ${data.template === 'classic' ? 'font-serif border-4 border-double border-gray-200' :
            data.template === 'minimalist' ? 'shadow-none border border-gray-100' : 'font-sans'
            }`}>
            {renderHeader()}

            <div className="grid grid-cols-2 gap-8 mb-12">
                <div>
                    <h3 className="text-xs font-bold uppercase text-gray-400 mb-2">{t.billTo}:</h3>
                    <p className="text-lg font-bold">{data.clientName || 'Client Name'}</p>
                    <p className="text-gray-600 max-w-xs">{data.clientAddress}</p>
                </div>
                <div className="text-right space-y-1">
                    {data.dueDate && (
                        <p className="text-sm text-gray-500"><span className="font-bold">{t.dueDate}:</span> {data.dueDate}</p>
                    )}
                    {data.poNumber && (
                        <p className="text-sm text-gray-500"><span className="font-bold">{t.poNumber}:</span> {data.poNumber}</p>
                    )}
                </div>
            </div>

            <div className="flex-grow">
                <table className="w-full text-left">
                    <thead>
                        <tr className={`${data.template === 'minimalist' ? 'border-b border-gray-100' : 'border-b-2 border-black'
                            }`}>
                            <th className="py-2 font-bold uppercase text-sm">{t.description}</th>
                            <th className="py-2 text-right font-bold uppercase text-sm">{t.qty}</th>
                            <th className="py-2 text-right font-bold uppercase text-sm">{t.unitPrice}</th>
                            <th className="py-2 text-right font-bold uppercase text-sm">{t.amount}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {data.items.map((item) => (
                            <tr key={item.id}>
                                <td className="py-4">{item.description || 'Item description'}</td>
                                <td className="py-4 text-right">{item.quantity}</td>
                                <td className="py-4 text-right">{item.unitPrice.toLocaleString()} {data.currency}</td>
                                <td className="py-4 text-right font-semibold">{(item.quantity * item.unitPrice).toLocaleString()} {data.currency}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-12 flex flex-col md:flex-row justify-between gap-12">
                <div className="flex-1 space-y-6">
                    {data.bankDetails && (
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="text-xs font-bold uppercase text-gray-400 mb-2">{t.bankDetails}</h4>
                            <p className="text-sm whitespace-pre-wrap">{data.bankDetails}</p>
                        </div>
                    )}
                    {data.notes && (
                        <div>
                            <h4 className="text-xs font-bold uppercase text-gray-400 mb-2">{t.notes}</h4>
                            <p className="text-sm whitespace-pre-wrap">{data.notes}</p>
                        </div>
                    )}
                </div>
                <div className="w-64 space-y-2">
                    <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">{t.subtotal}</span>
                        <span>{subtotal.toLocaleString()} {data.currency}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">{t.vat} ({data.vatRate}%)</span>
                        <span>{vatAmount.toLocaleString()} {data.currency}</span>
                    </div>
                    <div className="flex justify-between py-2 text-xl font-bold">
                        <span>{t.total}</span>
                        <span className="text-primary">{total.toLocaleString()} {data.currency}</span>
                    </div>
                </div>
            </div>

            {data.terms && (
                <div className="mt-12 pt-8 border-t border-dashed">
                    <h4 className="text-xs font-bold uppercase text-gray-400 mb-2">{t.terms}</h4>
                    <p className="text-[10px] text-gray-500 whitespace-pre-wrap italic">{data.terms}</p>
                </div>
            )}

            <div className="mt-20 pt-8 border-t text-center text-gray-400 text-sm">
                <p>{t.thankYou}</p>
            </div>
        </Card>
    );
}
