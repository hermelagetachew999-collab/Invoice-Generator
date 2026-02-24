"use client";

import React, { useState } from 'react';
import InvoiceForm from '@/components/InvoiceForm';
import InvoicePreview from '@/components/InvoicePreview';
import ContentSections from '@/components/ContentSections';
import { Button } from '@/components/ui/button';
import { Download, FileText, Layout, User as UserIcon, Table as TableIcon, Image as ImageIcon, Mail, Shield, Crown, X, Share2, Copy, Link as LinkIcon, Facebook, Linkedin, Twitter, ChevronDown, Menu, ArrowLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { articles } from '@/lib/articles';
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
  discountType: 'percentage' | 'fixed';
  discountValue: number;
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
    vatRate: 0,
    discountType: 'percentage',
    discountValue: 0,
    invoiceNumber: '',
    logo: undefined,
    logoPosition: 'left',
    logoSize: 100,
    template: 'modern',
    currency: 'USD',
    language: 'en',
    dueDate: '',
    poNumber: '',
    slogan: '',
    notes: '',
    bankDetails: '',
    terms: '',
  }));

  const [downloadCount, setDownloadCount] = useState(0);

  React.useEffect(() => {
    const count = parseInt(localStorage.getItem('invoice_downloads') || '0');
    setDownloadCount(count);

    // Check for existing session
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if (data.user) setUser(data.user);
      })
      .catch(err => console.error('Session check failed:', err));
  }, []);

  React.useEffect(() => {
    setInvoiceData(prev => ({
      ...prev,
      invoiceNumber: prev.invoiceNumber || `${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`
    }));
  }, []);

  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [user, setUser] = useState<{ email: string; name?: string; tier?: string } | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [showShareTool, setShowShareTool] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const isPremium = user?.tier === 'unlimited' || user?.tier === 'no-ads';
  const showAds = !user || user.tier !== 'no-ads';

  const handleDownload = async () => {
    if (downloadCount >= 15 && !isPremium) {
      setIsAuthModalOpen(true);
      return;
    }
    await generatePDF(invoiceData);
    const newCount = downloadCount + 1;
    setDownloadCount(newCount);
    localStorage.setItem('invoice_downloads', newCount.toString());
    setShowShareTool(true);
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
    const body = `Hello ${invoiceData.clientName || 'Client'},\n\nPlease find the invoice summary below:\n\nTotal: ${invoiceData.items.reduce((sum, i) => sum + (i.quantity * i.unitPrice), 0).toLocaleString()} ${invoiceData.currency}\n\nThank you for using InvoiceGen.`;
    window.location.href = `mailto:${invoiceData.clientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const [openSection, setOpenSection] = useState<'main' | 'faq' | 'how-to' | 'learn'>('main');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);

  // Close desktop menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isDesktopMenuOpen) {
        setIsDesktopMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isDesktopMenuOpen]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
  };

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between font-outfit">
          <div className="flex items-center space-x-2">
            <div className="bg-primary p-2 rounded-lg">
              <FileText className="text-white w-6 h-6" />
            </div>
            <button
              onClick={() => {
                setOpenSection('main');
                setIsMobileMenuOpen(false);
              }}
              className="flex flex-col items-start cursor-pointer"
            >
              <span className="text-xl font-bold tracking-tight">InvoiceGen</span>
              <div className="flex items-center gap-1 -mt-1">
                <Crown className="w-3 h-3 text-yellow-500" />
                <span className="text-[10px] text-yellow-600 font-bold uppercase tracking-wider">
                  {user?.tier === 'unlimited' ? 'Pro Tier' : user?.tier === 'no-ads' ? 'Pro Tier' : 'Free Tier'}
                </span>
              </div>
            </button>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <Button
              className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 flex items-center gap-2 px-6"
              onClick={() => setIsAuthModalOpen(true)}
            >
              <Crown className="w-4 h-4" />
              Upgrade
            </Button>

            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDesktopMenuOpen(!isDesktopMenuOpen);
                }}
                className="flex items-center justify-center w-10 h-10 text-gray-500 hover:text-primary transition-all bg-gray-50 rounded-xl border border-gray-100"
              >
                <Menu className="w-5 h-5" />
              </button>

              {isDesktopMenuOpen && (
                <div className="absolute top-full mt-2 right-0 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                  {user && (
                    <div className="p-4 bg-gray-50/50 border-b border-gray-100 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 text-primary">
                        <UserIcon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <div className="text-sm font-bold text-gray-900 truncate">{user.name || 'User'}</div>
                        <div className="text-[10px] text-gray-500 truncate">{user.email}</div>
                      </div>
                    </div>
                  )}

                  <div className="p-2 space-y-1">
                    {[
                      { href: '/privacy-policy', label: 'Privacy Policy' },
                      { href: '/terms', label: 'Terms of Service' },
                      { id: 'learn', label: 'Knowledge Hub' },
                      { href: '/about', label: 'About Us' },
                      { href: '/contact', label: 'Contact Support' }
                    ].map((item) => (
                      item.href ? (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-primary/5 hover:text-primary rounded-lg transition-colors font-medium block"
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <button
                          key={item.id}
                          onClick={() => {
                            setOpenSection(item.id as any);
                            setIsDesktopMenuOpen(false);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-primary/5 hover:text-primary rounded-lg transition-colors font-medium"
                        >
                          {item.label}
                        </button>
                      )
                    ))}

                    {user && (
                      <div className="pt-1 mt-1 border-t border-gray-100">
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors font-medium"
                        >
                          Log Out
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </nav>

          <div className="flex md:hidden items-center gap-2">
            {!isPremium && (
              <Button variant="outline" size="sm" className="border-yellow-200 text-yellow-700 bg-yellow-50" onClick={() => setIsAuthModalOpen(true)}>
                Upgrade
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600"
            >
              <Layout className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b absolute top-16 left-0 w-full z-40 animate-in slide-in-from-top duration-300">
            <div className="p-4 space-y-4">
              <button
                onClick={() => { setOpenSection('main'); setIsMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="block w-full text-left px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl font-bold"
              >
                Invoice Tool
              </button>
              <button
                onClick={() => { setOpenSection('how-to'); setIsMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="block w-full text-left px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl font-bold"
              >
                How to Use
              </button>
              <button
                onClick={() => { setOpenSection('faq'); setIsMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="block w-full text-left px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl font-bold"
              >
                Help & FAQ
              </button>
              <Link
                href="/about"
                className="block w-full text-left px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl font-bold"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="block w-full text-left px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl font-bold"
              >
                Contact Support
              </Link>
              <Link
                href="/privacy-policy"
                className="block w-full text-left px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl font-bold"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="block w-full text-left px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl font-bold"
              >
                Terms of Service
              </Link>
              <div className="pt-4 border-t border-gray-100 grid grid-cols-2 gap-3">
                <Button onClick={handleDownload} className="w-full">
                  <Download className="w-4 h-4 mr-2" /> PDF
                </Button>
                {user ? (
                  <Button variant="outline" onClick={handleLogout} className="w-full">Logout</Button>
                ) : (
                  <Button variant="outline" onClick={() => { setIsAuthModalOpen(true); setIsMobileMenuOpen(false); }} className="w-full border-primary text-primary font-bold">Sign In</Button>
                )}
              </div>
            </div>
          </div>
        )}
      </header>



      {/* Hero Section */}
      {openSection === 'main' && (
        <section className="bg-white border-b py-12 md:py-20 mb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
              Free Invoice Generator for <br />
              <span className="text-primary italic">Freelancers Worldwide</span>
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              Create, manage, and download professional PDF invoices in seconds.
              Optimized for global business requirements.
            </p>
          </div>
        </section>
      )}

      {/* Main Tool */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {openSection === 'main' ? (
          <>
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
            </div>

            {/* Knowledge Hub Section */}
            <section className="mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-4">
                  <h2 className="text-4xl font-black text-gray-900 tracking-tight">Knowledge Hub</h2>
                  <p className="text-gray-500 max-w-xl text-lg font-medium">
                    Expert advice on invoicing, tax compliance, and scaling your freelance business to the next level.
                  </p>
                </div>
                <Button
                  variant="ghost"
                  className="text-primary font-bold hover:bg-primary/5 group items-center gap-2 hidden md:flex"
                  onClick={() => { setOpenSection('learn'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                >
                  View All Resources <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {articles.slice(0, 3).map((article) => (
                  <Link
                    key={article.slug}
                    href={`/articles/${article.slug}`}
                    className="group bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between"
                  >
                    <div className="space-y-6">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest">
                        {article.category}
                      </div>
                      <h3 className="text-2xl font-black text-gray-900 leading-tight group-hover:text-primary transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-gray-500 line-clamp-3 text-base leading-relaxed font-medium">
                        {article.excerpt}
                      </p>
                    </div>
                    <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
                      <span>{article.readTime} Read</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-primary" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            <AuthModal
              isOpen={isAuthModalOpen}
              onClose={() => setIsAuthModalOpen(false)}
              onLogin={setUser}
            />
          </>

        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-8 min-h-[60vh] relative animate-in slide-in-from-bottom-4 duration-500">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setOpenSection('main')}
              className="absolute right-4 top-4"
            >
              <X className="w-4 h-4 mr-2" /> Close
            </Button>
            <ContentSections activeSection={openSection} />
          </div>
        )}
      </div>

      <footer className="mt-20 border-t bg-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-primary p-1.5 rounded-lg">
                  <FileText className="text-white w-5 h-5" />
                </div>
                <span className="text-xl font-bold tracking-tighter">InvoiceGen</span>
              </div>
              <p className="text-sm text-gray-500 max-w-sm leading-relaxed">
                Empowering freelancers and small businesses worldwide with professional invoicing tools. Simple, secure, and globally compliant.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-6 uppercase tracking-widest text-[10px]">Product</h4>
              <ul className="space-y-4 text-sm">
                <li><button onClick={() => { setOpenSection('main'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-primary transition-colors">Invoice Tool</button></li>
                <li><button onClick={() => { setOpenSection('how-to'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-primary transition-colors">How to Use</button></li>
                <li><button onClick={() => { setOpenSection('faq'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-primary transition-colors">Help & FAQ</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-6 uppercase tracking-widest text-[10px]">Company</h4>
              <ul className="space-y-4 text-sm">
                <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Support</Link></li>
                <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                <li><Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs text-gray-400 font-medium tracking-tight italic">
              © {new Date().getFullYear()} InvoiceGen. Built for the modern workforce. HTTPS Secured.
            </p>
            <div className="flex items-center gap-6 text-gray-400">
              <Shield className="w-5 h-5 opacity-50" />
              <div className="text-[10px] font-bold uppercase tracking-widest">Global Compliance V3.2</div>
            </div>
          </div>

        </div>
      </footer>
    </main >
  );
}
