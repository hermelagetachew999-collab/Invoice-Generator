"use client";

import React, { useState } from 'react';
import InvoiceForm from '@/components/InvoiceForm';
import InvoicePreview from '@/components/InvoicePreview';
import ContentSections from '@/components/ContentSections';
import { Button } from '@/components/ui/button';
import { Download, FileText, Layout, User as UserIcon, Table as TableIcon, Image as ImageIcon, Mail, Shield, Crown, X } from 'lucide-react';
import { generatePDF } from '@/lib/generatePDF';
import AuthModal from '@/components/AuthModal';
import * as XLSX from 'xlsx';
import { toPng } from 'html-to-image';
import { useRef } from 'react';

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

export default function Home() {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>(() => ({
    businessName: '',
    businessAddress: '',
    businessTIN: '',
    clientName: '',
    clientAddress: '',
    items: [{ id: '1', description: '', quantity: 1, unitPrice: 0 }],
    vatRate: 15,
    invoiceNumber: `${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    logo: undefined,
    logoPosition: 'left',
    logoSize: 100,
    template: 'modern',
    currency: 'ETB',
    language: 'en',
    dueDate: '',
    poNumber: '',
    slogan: '',
    notes: '',
    bankDetails: '',
    terms: '',
  }));

  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    await generatePDF(invoiceData);
  };

  const handleExcelExport = () => {
    const worksheetData = invoiceData.items.map(item => ({
      Description: item.description,
      Quantity: item.quantity,
      'Unit Price': item.unitPrice,
      Total: item.quantity * item.unitPrice,
      Currency: invoiceData.currency
    }));

    const ws = XLSX.utils.json_to_sheet(worksheetData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Invoice Items");
    XLSX.writeFile(wb, `Invoice_${invoiceData.invoiceNumber || 'Record'}.xlsx`);
  };

  const handleImageExport = async () => {
    if (previewRef.current === null) return;
    try {
      const dataUrl = await toPng(previewRef.current, { cacheBust: true, backgroundColor: '#fff' });
      const link = document.createElement('a');
      link.download = `Invoice_${invoiceData.invoiceNumber || 'Preview'}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('oops, something went wrong!', err);
    }
  };

  const handleEmailShare = () => {
    if (!invoiceData.clientEmail) {
      alert('Please add a client email in the form first.');
      return;
    }
    const subject = `Invoice ${invoiceData.invoiceNumber || ''} from ${invoiceData.businessName || 'Us'}`;
    const body = `Hello ${invoiceData.clientName || 'Client'},\n\nPlease find the invoice summary below:\n\nTotal: ${invoiceData.items.reduce((sum, i) => sum + (i.quantity * i.unitPrice), 0).toLocaleString()} ${invoiceData.currency}\n\n[Note: In a production environment, the PDF would be attached here.]`;
    window.location.href = `mailto:${invoiceData.clientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-primary p-2 rounded-lg">
              <FileText className="text-white w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight">InvoiceGen<span className="text-primary">.et</span></span>
              <div className="flex items-center gap-1 -mt-1">
                <Crown className="w-3 h-3 text-yellow-500" />
                <span className="text-[10px] text-yellow-600 font-bold uppercase tracking-wider">Free Tier</span>
              </div>
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#how-to-use" className="text-gray-500 hover:text-primary transition-colors">How to Use</a>
            <a href="#faq" className="text-gray-500 hover:text-primary transition-colors">FAQ</a>
            {user ? (
              <div className="flex items-center space-x-2 text-primary font-medium">
                <UserIcon className="w-5 h-5" />
                <span>{user.email.split('@')[0]}</span>
              </div>
            ) : (
              <Button variant="outline" size="sm" onClick={() => setIsAuthModalOpen(true)}>Sign In</Button>
            )}
          </nav>
          <div className="flex md:hidden items-center gap-2">
            <Button variant="outline" size="sm" className="border-yellow-200 text-yellow-700 bg-yellow-50">
              Upgrade
            </Button>
            <Button variant="default" onClick={handleDownload}>
              <Download className="w-4 h-4 mr-2" /> Download
            </Button>
          </div>
        </div>
      </header>

      {/* Privacy Policy Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-8 shadow-2xl relative">
            <button
              onClick={() => setShowPrivacyModal(false)}
              className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-bold">Privacy & Legal</h2>
            </div>
            <div className="space-y-4 text-sm text-gray-600 overflow-y-auto max-h-[60vh] pr-2">
              <p className="font-bold">1. Data Storage</p>
              <p>Your invoice data is temporarily stored in your browser's local storage for your convenience. If you are signed in, data is securely stored in our encrypted database.</p>
              <p className="font-bold">2. Compliance (Ethiopian Law & GDPR)</p>
              <p>We comply with Proclamation No. 1205/2020 on Data Protection in Ethiopia. You have the right to export or delete your data at any time.</p>
              <p className="font-bold">3. PDF Security</p>
              <p>Encrypted PDFs use standard AES-256 bit encryption (available in Premium). Local generation ensures your sensitive financial data never leaves your device unless you choose to save it.</p>
            </div>
            <Button
              className="w-full mt-8"
              onClick={() => setShowPrivacyModal(false)}
            >
              I Understand
            </Button>
          </div>
        </div>
      )}

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
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
              <h2 className="text-2xl font-bold">Preview</h2>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={handleExcelExport} title="Export to Excel">
                  <TableIcon className="w-4 h-4 mr-2" /> .xlsx
                </Button>
                <Button variant="outline" size="sm" onClick={handleImageExport} title="Save as Image">
                  <ImageIcon className="w-4 h-4 mr-2" /> .png
                </Button>
                <Button variant="outline" size="sm" onClick={handleEmailShare} title="Share via Email">
                  <Mail className="w-4 h-4 mr-2" /> Email
                </Button>
                <Button size="lg" className="shadow-lg hover:scale-105 transition-transform" onClick={handleDownload}>
                  <Download className="w-5 h-5 mr-2" /> Download PDF
                </Button>
              </div>
            </div>
            <div ref={previewRef} className="bg-white rounded-xl shadow-inner p-2 md:p-4 overflow-hidden">
              <InvoicePreview data={invoiceData} />
            </div>
          </div>

          <AuthModal
            isOpen={isAuthModalOpen}
            onClose={() => setIsAuthModalOpen(false)}
            onLogin={setUser}
          />
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
          <div className="flex justify-center gap-6 mt-4 text-xs">
            <button onClick={() => setShowPrivacyModal(true)} className="hover:text-primary transition-colors">Privacy Policy</button>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">GDPR/Ethiopian Law Compliance</a>
          </div>
        </div>
      </footer>
    </main >
  );
}
