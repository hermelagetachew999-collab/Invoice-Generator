"use client";

import React, { useState } from 'react';
import InvoiceForm from '@/components/InvoiceForm';
import InvoicePreview from '@/components/InvoicePreview';
import ContentSections from '@/components/ContentSections';
import { Button } from '@/components/ui/button';
import { Download, FileText, Layout } from 'lucide-react';
import { generatePDF } from '@/lib/generatePDF';

export default function Home() {
  const [invoiceData, setInvoiceData] = useState<any>({
    businessName: '',
    businessAddress: '',
    businessTIN: '',
    clientName: '',
    clientAddress: '',
    items: [{ id: '1', description: '', quantity: 1, unitPrice: 0 }],
    vatRate: 15,
  });

  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-primary p-2 rounded-lg">
              <FileText className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight">InvoiceGen<span className="text-primary">.et</span></span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#how-to-use" className="text-gray-500 hover:text-primary transition-colors">How to Use</a>
            <a href="#faq" className="text-gray-500 hover:text-primary transition-colors">FAQ</a>
          </nav>
          <Button variant="default" className="md:hidden" onClick={() => generatePDF(invoiceData)}>
            <Download className="w-4 h-4 mr-2" /> Download
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white border-b py-12 md:py-20 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Free Invoice Generator for <br />
            <span className="text-primary italic">Ethiopian Freelancers</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Create, manage, and download professional PDF invoices in seconds.
            Optimized for local VAT and business requirements.
          </p>
        </div>
      </section>

      {/* Main Tool */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile Tabs */}
        <div className="flex md:hidden mb-6 bg-white p-1 rounded-lg border">
          <button
            onClick={() => setActiveTab('edit')}
            className={`flex-1 py-2 rounded-md font-medium transition-colors ${activeTab === 'edit' ? 'bg-primary text-white shadow' : 'text-gray-500'}`}
          >
            Edit
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex-1 py-2 rounded-md font-medium transition-colors ${activeTab === 'preview' ? 'bg-primary text-white shadow' : 'text-gray-500'}`}
          >
            Preview
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className={`${activeTab === 'edit' ? 'block' : 'hidden md:block'} space-y-6`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold flex items-center">
                <Layout className="w-6 h-6 mr-2 text-primary" />
                Customize Details
              </h2>
            </div>
            <InvoiceForm onChange={setInvoiceData} />
          </div>

          <div className={`${activeTab === 'preview' ? 'block' : 'hidden md:block'} space-y-6`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Preview</h2>
              <Button size="lg" className="shadow-lg hover:scale-105 transition-transform" onClick={() => generatePDF(invoiceData)}>
                <Download className="w-5 h-5 mr-2" /> Download PDF
              </Button>
            </div>
            <InvoicePreview data={invoiceData} />
          </div>
        </div>

        {/* AdSense Placeholder */}
        <div className="my-20 bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl h-32 flex items-center justify-center text-gray-400">
          Google AdSense Placeholder
        </div>

        {/* Content Sections */}
        <ContentSections />
      </div>

      <footer className="mt-20 border-t bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500">
          <p>© {new Date().getFullYear()} InvoiceGen.et - Built for the Ethiopian Freelance Community</p>
        </div>
      </footer>
    </main>
  );
}
