"use client";

import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Plus, Trash2, Image as ImageIcon, AlignLeft, AlignCenter, AlignRight, Globe, Palette, FileText, Info, Upload, GripVertical, Undo2, AlertCircle, Shield, Lock, FileJson } from 'lucide-react';
import Papa from 'papaparse';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

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
    clientEmail?: string;
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
    bankName?: string;
    accountNumber?: string;
    showQRCode?: boolean;
    pdfPassword?: string;
    showPrivacyConsent?: boolean;
    bankDetails?: string;
    terms?: string;
}

export default function InvoiceForm({ onChange }: { onChange: (data: InvoiceData) => void }) {
    const [data, setData] = useState<InvoiceData>({
        businessName: '',
        businessAddress: '',
        businessTIN: '',
        clientName: '',
        clientAddress: '',
        clientEmail: '',
        items: [{ id: '1', description: '', quantity: 1, unitPrice: 0 }],
        vatRate: 15, // Default VAT for Ethiopia
        invoiceNumber: '',
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
        bankName: '',
        accountNumber: '',
        showQRCode: false,
        bankDetails: '',
        terms: '',
    });

    const [history, setHistory] = useState<InvoiceData[]>([]);

    useEffect(() => {
        onChange(data);
    }, [data, onChange]);

    // Save history for Undo
    const saveToHistory = () => {
        setHistory(prev => [data, ...prev].slice(0, 10)); // Keep last 10 steps
    };

    const undo = () => {
        if (history.length > 0) {
            const previous = history[0];
            setHistory(prev => prev.slice(1));
            setData(previous);
        }
    };

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            saveToHistory();
            setData((prev) => {
                const oldIndex = prev.items.findIndex((i) => i.id === active.id);
                const newIndex = prev.items.findIndex((i) => i.id === over.id);
                return {
                    ...prev,
                    items: arrayMove(prev.items, oldIndex, newIndex),
                };
            });
        }
    };

    const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            saveToHistory();
            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    const importedItems: LineItem[] = results.data.map((row: any) => ({
                        id: Math.random().toString(36).substr(2, 9),
                        description: row.description || row.Description || 'Imported Item',
                        quantity: parseFloat(row.quantity || row.Qty || row.Quantity) || 1,
                        unitPrice: parseFloat(row.price || row.UnitPrice || row.Price || row.Amount) || 0,
                    }));
                    if (importedItems.length > 0) {
                        setData(prev => ({
                            ...prev,
                            items: [...prev.items.filter(i => i.description !== ''), ...importedItems]
                        }));
                    }
                }
            });
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setData(prev => ({ ...prev, logo: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const removeLogo = () => {
        setData(prev => ({ ...prev, logo: undefined }));
    };

    const removeItem = (id: string) => {
        saveToHistory();
        setData(prev => ({
            ...prev,
            items: prev.items.filter(item => item.id !== id)
        }));
    };

    const handleItemChange = (id: string, field: keyof LineItem, value: string | number) => {
        // Only save to history on focus/blur or specific events to avoid bloating but for now simple:
        // saveToHistory(); // This might be too frequent, let's skip for simple input changes
        setData(prev => ({
            ...prev,
            items: prev.items.map(item =>
                item.id === id ? { ...item, [field]: value } : item
            )
        }));
    };

    const addItem = () => {
        saveToHistory();
        setData(prev => ({
            ...prev,
            items: [...prev.items, { id: Math.random().toString(36).substr(2, 9), description: '', quantity: 1, unitPrice: 0 }]
        }));
    };

    return (
        <div className="space-y-8">
            <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Business Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="businessName" className="flex items-center gap-1">
                            Business Name <span className="text-red-500">*</span>
                        </Label>
                        <Input id="businessName" name="businessName" value={data.businessName} onChange={handleInputChange} placeholder="Your Company Name" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="businessTIN" className="flex items-center gap-2">
                            TIN (Optional)
                            {data.businessTIN && !/^\d{10}$/.test(data.businessTIN.replace(/\s/g, '')) && (
                                <span className="text-[10px] text-orange-500 flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3" /> Usually 10 digits
                                </span>
                            )}
                        </Label>
                        <Input
                            id="businessTIN"
                            name="businessTIN"
                            value={data.businessTIN}
                            onChange={handleInputChange}
                            placeholder="1234567890"
                            className={data.businessTIN && !/^\d{10}$/.test(data.businessTIN.replace(/\s/g, '')) ? 'border-orange-300' : ''}
                        />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="businessAddress">Address</Label>
                        <Input id="businessAddress" name="businessAddress" value={data.businessAddress} onChange={handleInputChange} placeholder="City, Sub-city, Woreda, Ethiopia" />
                    </div>
                </div>
            </Card>

            <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Client Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="clientName">Client Name <span className="text-red-500">*</span></Label>
                        <Input id="clientName" name="clientName" value={data.clientName} onChange={handleInputChange} placeholder="Client / Company Name" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="clientEmail" className="flex items-center gap-2">
                            Client Email
                            {data.clientEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.clientEmail) && (
                                <span className="text-[10px] text-orange-500 flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3" /> Invalid format
                                </span>
                            )}
                        </Label>
                        <Input
                            id="clientEmail"
                            name="clientEmail"
                            type="email"
                            value={data.clientEmail}
                            onChange={handleInputChange}
                            placeholder="client@example.com"
                            className={data.clientEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.clientEmail) ? 'border-orange-300' : ''}
                        />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="clientAddress">Address</Label>
                        <Input id="clientAddress" name="clientAddress" value={data.clientAddress} onChange={handleInputChange} placeholder="Client Address" />
                    </div>
                </div>
            </Card>

            <Card className="p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div>
                        <h3 className="text-lg font-semibold">Line Items</h3>
                        <p className="text-sm text-gray-500">Add, reorder, or import items</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {history.length > 0 && (
                            <Button type="button" variant="outline" size="sm" onClick={undo} className="text-orange-600 border-orange-200 bg-orange-50">
                                <Undo2 className="w-4 h-4 mr-2" /> Undo
                            </Button>
                        )}
                        <Label htmlFor="csv-import" className="cursor-pointer">
                            <div className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3">
                                <Upload className="w-4 h-4 mr-2" /> Bulk Import
                            </div>
                            <input id="csv-import" type="file" accept=".csv" className="hidden" onChange={handleCSVUpload} />
                        </Label>
                        <Button type="button" variant="default" size="sm" onClick={addItem}>
                            <Plus className="w-4 h-4 mr-2" /> Add Item
                        </Button>
                    </div>
                </div>

                <div className="space-y-2">
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                        modifiers={[restrictToVerticalAxis]}
                    >
                        <SortableContext
                            items={data.items.map(i => i.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            {data.items.map((item) => (
                                <SortableItem
                                    key={item.id}
                                    item={item}
                                    onRemove={() => removeItem(item.id)}
                                    onChange={(field, val) => handleItemChange(item.id, field, val)}
                                />
                            ))}
                        </SortableContext>
                    </DndContext>
                </div>
            </Card>

            <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Branding & Logo</h3>
                <div className="space-y-6">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                        <div className="w-full md:w-1/2 space-y-2">
                            <Label htmlFor="logo-upload">Upload Logo</Label>
                            <div className="flex items-center gap-2">
                                <Input
                                    id="logo-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleLogoUpload}
                                    className="cursor-pointer"
                                />
                                {data.logo && (
                                    <Button variant="ghost" size="icon" className="text-destructive shrink-0" onClick={removeLogo}>
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                )}
                            </div>
                            <p className="text-xs text-gray-500 italic">Recommended: PNG or SVG with transparent background</p>
                        </div>

                        {data.logo && (
                            <div className="w-full md:w-1/2 bg-gray-50 rounded-lg p-4 border border-dashed flex items-center justify-center min-h-[100px]">
                                <img src={data.logo} alt="Logo Preview" style={{ maxWidth: '100%', maxHeight: '80px', objectFit: 'contain' }} />
                            </div>
                        )}
                    </div>

                    {data.logo && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
                            <div className="space-y-4">
                                <Label className="text-sm font-medium">Logo Position</Label>
                                <div className="grid grid-cols-3 gap-2">
                                    {[
                                        { id: 'left', icon: AlignLeft, label: 'Left' },
                                        { id: 'center', icon: AlignCenter, label: 'Center' },
                                        { id: 'right', icon: AlignRight, label: 'Right' },
                                    ].map((pos) => (
                                        <Button
                                            key={pos.id}
                                            type="button"
                                            variant={data.logoPosition === pos.id ? 'default' : 'outline'}
                                            size="sm"
                                            className="h-10"
                                            onClick={() => setData(prev => ({ ...prev, logoPosition: pos.id as any }))}
                                        >
                                            <pos.icon className="w-4 h-4 mr-2 hidden sm:inline" /> {pos.label}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-4">
                                <Label htmlFor="logoWidth" className="text-sm font-medium">Logo Size ({data.logoSize}px)</Label>
                                <div className="pt-2">
                                    <input
                                        id="logoWidth"
                                        type="range"
                                        min="50"
                                        max="300"
                                        step="10"
                                        value={data.logoSize}
                                        onChange={(e) => setData(prev => ({ ...prev, logoSize: parseInt(e.target.value) }))}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </Card>

            <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                    <Palette className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold">Template & Style</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                        <Label className="text-sm font-medium">Select Template</Label>
                        <div className="grid grid-cols-3 gap-2">
                            {['modern', 'classic', 'minimalist'].map((t) => (
                                <Button
                                    key={t}
                                    type="button"
                                    variant={data.template === t ? 'default' : 'outline'}
                                    size="sm"
                                    className="capitalize h-10"
                                    onClick={() => setData(prev => ({ ...prev, template: t as any }))}
                                >
                                    {t}
                                </Button>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-4">
                        <Label className="text-sm font-medium">Currency</Label>
                        <div className="grid grid-cols-3 gap-2">
                            {['ETB', 'USD', 'EUR'].map((c) => (
                                <Button
                                    key={c}
                                    type="button"
                                    variant={data.currency === c ? 'default' : 'outline'}
                                    size="sm"
                                    className="h-10"
                                    onClick={() => setData(prev => ({ ...prev, currency: c }))}
                                >
                                    {c}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
            </Card>

            <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                    <Globe className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold">Localization</h3>
                </div>
                <div className="space-y-3">
                    <Label>Language</Label>
                    <div className="flex gap-2 w-full md:w-3/4">
                        <Button
                            type="button"
                            variant={data.language === 'en' ? 'default' : 'outline'}
                            className="flex-1"
                            onClick={() => setData(prev => ({ ...prev, language: 'en' }))}
                        >
                            English
                        </Button>
                        <Button
                            type="button"
                            variant={data.language === 'am' ? 'default' : 'outline'}
                            className="flex-1"
                            onClick={() => setData(prev => ({ ...prev, language: 'am' }))}
                        >
                            አማርኛ
                        </Button>
                        <Button
                            type="button"
                            variant={data.language === 'ar' ? 'default' : 'outline'}
                            className="flex-1"
                            onClick={() => setData(prev => ({ ...prev, language: 'ar' }))}
                        >
                            العربية
                        </Button>
                    </div>
                </div>
            </Card>

            <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                    <Info className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold">Additional Information</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="invoiceNumber">Invoice Number</Label>
                        <Input id="invoiceNumber" name="invoiceNumber" value={data.invoiceNumber} onChange={handleInputChange} placeholder="INV-2024-001" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="dueDate">Due Date</Label>
                        <Input id="dueDate" name="dueDate" type="date" value={data.dueDate} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="poNumber">PO Number (Optional)</Label>
                        <Input id="poNumber" name="poNumber" value={data.poNumber} onChange={handleInputChange} placeholder="PO-123456" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="slogan">Company Slogan (Optional)</Label>
                        <Input id="slogan" name="slogan" value={data.slogan} onChange={handleInputChange} placeholder="Fast. Easy. Reliable." />
                    </div>
                </div>
            </Card>

            <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                    <FileText className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold">Payment Details (QR Code)</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="bankName">Bank Name</Label>
                        <Input
                            id="bankName"
                            name="bankName"
                            value={data.bankName}
                            onChange={handleInputChange}
                            placeholder="e.g. CBE, Telebirr, Abyssinia"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="accountNumber">Account Number / Phone</Label>
                        <Input
                            id="accountNumber"
                            name="accountNumber"
                            value={data.accountNumber}
                            onChange={handleInputChange}
                            placeholder="1000..."
                        />
                    </div>
                    <div className="flex items-center space-x-2 md:col-span-2 pt-2">
                        <input
                            type="checkbox"
                            id="showQRCode"
                            checked={data.showQRCode}
                            onChange={(e) => setData(prev => ({ ...prev, showQRCode: e.target.checked }))}
                            className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
                        />
                        <Label htmlFor="showQRCode" className="text-sm font-medium cursor-pointer">
                            Generate QR Code for payments on PDF
                        </Label>
                    </div>
                </div>
            </Card>

            <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                    <FileText className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold">Notes & Terms</h3>
                </div>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="bankDetails">Bank Details</Label>
                        <textarea
                            id="bankDetails"
                            className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            placeholder="CBE / Bank of Abyssinia, Account Number..."
                            value={data.bankDetails}
                            onChange={(e) => setData(prev => ({ ...prev, bankDetails: e.target.value }))}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="notes">Notes</Label>
                        <textarea
                            id="notes"
                            className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            placeholder="Additional notes for the client..."
                            value={data.notes}
                            onChange={(e) => setData(prev => ({ ...prev, notes: e.target.value }))}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="terms">Terms & Conditions</Label>
                        <textarea
                            id="terms"
                            className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            placeholder="Payment should be made within 15 days..."
                            value={data.terms}
                            onChange={(e) => setData(prev => ({ ...prev, terms: e.target.value }))}
                        />
                    </div>
                </div>
            </Card>

            <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                    <Shield className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold">Security & Compliance</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="pdfPassword">Password Protect PDF (Optional)</Label>
                        <div className="relative">
                            <Input
                                id="pdfPassword"
                                name="pdfPassword"
                                type="password"
                                value={data.pdfPassword}
                                onChange={handleInputChange}
                                placeholder="Enter password to encrypt PDF"
                            />
                            <Lock className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
                        </div>
                        <p className="text-[10px] text-gray-500 italic">Recipient will need this password to open the file.</p>
                    </div>
                    <div className="flex items-center space-x-2 pt-6">
                        <input
                            type="checkbox"
                            id="showPrivacyConsent"
                            checked={data.showPrivacyConsent}
                            onChange={(e) => setData(prev => ({ ...prev, showPrivacyConsent: e.target.checked }))}
                            className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
                        />
                        <Label htmlFor="showPrivacyConsent" className="text-sm font-medium cursor-pointer">
                            Enable Data Privacy Opt-out (GDPR/Ethiopian Law)
                        </Label>
                    </div>
                </div>
            </Card>

            <Card className="p-6">
                <div className="flex items-center space-x-4">
                    <div className="flex-1 space-y-2">
                        <Label htmlFor="vatRate">VAT Rate (%)</Label>
                        <Input id="vatRate" type="number" value={data.vatRate} onChange={(e) => setData(prev => ({ ...prev, vatRate: parseFloat(e.target.value) }))} />
                    </div>
                </div>
            </Card>
        </div>
    );
}

function SortableItem({ item, onRemove, onChange }: {
    item: LineItem,
    onRemove: () => void,
    onChange: (field: keyof LineItem, val: any) => void
}) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: item.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 20 : 1,
        position: 'relative' as const,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`grid grid-cols-1 md:grid-cols-12 gap-4 items-end bg-white p-4 rounded-lg border transition-shadow ${isDragging ? 'shadow-xl border-primary ring-1 ring-primary' : 'hover:border-gray-300'}`}
        >
            <div className="md:col-span-1 flex items-center justify-center pb-2 cursor-grab active:cursor-grabbing" {...attributes} {...listeners}>
                <GripVertical className="w-5 h-5 text-gray-400 hover:text-gray-600" />
            </div>
            <div className="md:col-span-5 space-y-2">
                <Label className="text-[10px] uppercase font-bold text-gray-400">Description</Label>
                <Input
                    value={item.description}
                    onChange={(e) => onChange('description', e.target.value)}
                    placeholder="Describe service/item"
                    className={!item.description ? 'border-orange-200' : ''}
                />
            </div>
            <div className="md:col-span-2 space-y-2">
                <Label className="text-[10px] uppercase font-bold text-gray-400">Qty</Label>
                <Input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => onChange('quantity', parseFloat(e.target.value) || 0)}
                    className={item.quantity <= 0 ? 'border-red-200' : ''}
                />
            </div>
            <div className="md:col-span-3 space-y-2">
                <Label className="text-[10px] uppercase font-bold text-gray-400">Unit Price</Label>
                <Input
                    type="number"
                    value={item.unitPrice}
                    onChange={(e) => onChange('unitPrice', parseFloat(e.target.value) || 0)}
                />
            </div>
            <div className="md:col-span-1 flex justify-center pb-1">
                <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10 rounded-full" onClick={onRemove}>
                    <Trash2 className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
}
