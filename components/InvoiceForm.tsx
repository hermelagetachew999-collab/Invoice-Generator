"use client";

import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Plus, Trash2, Download } from 'lucide-react';

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
}

export default function InvoiceForm({ onChange }: { onChange: (data: InvoiceData) => void }) {
    const [data, setData] = useState<InvoiceData>({
        businessName: '',
        businessAddress: '',
        businessTIN: '',
        clientName: '',
        clientAddress: '',
        items: [{ id: '1', description: '', quantity: 1, unitPrice: 0 }],
        vatRate: 15, // Default VAT for Ethiopia
    });

    useEffect(() => {
        onChange(data);
    }, [data, onChange]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const handleItemChange = (id: string, field: keyof LineItem, value: string | number) => {
        setData(prev => ({
            ...prev,
            items: prev.items.map(item =>
                item.id === id ? { ...item, [field]: value } : item
            )
        }));
    };

    const addItem = () => {
        setData(prev => ({
            ...prev,
            items: [...prev.items, { id: Math.random().toString(36).substr(2, 9), description: '', quantity: 1, unitPrice: 0 }]
        }));
    };

    const removeItem = (id: string) => {
        setData(prev => ({
            ...prev,
            items: prev.items.filter(item => item.id !== id)
        }));
    };

    return (
        <div className="space-y-8">
            <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Business Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="businessName">Business Name</Label>
                        <Input id="businessName" name="businessName" value={data.businessName} onChange={handleInputChange} placeholder="Your Company Name" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="businessTIN">TIN (Optional)</Label>
                        <Input id="businessTIN" name="businessTIN" value={data.businessTIN} onChange={handleInputChange} placeholder="123456789" />
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
                        <Label htmlFor="clientName">Client Name</Label>
                        <Input id="clientName" name="clientName" value={data.clientName} onChange={handleInputChange} placeholder="Client / Company Name" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="clientAddress">Address</Label>
                        <Input id="clientAddress" name="clientAddress" value={data.clientAddress} onChange={handleInputChange} placeholder="Client Address" />
                    </div>
                </div>
            </Card>

            <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Line Items</h3>
                    <Button type="button" variant="outline" size="sm" onClick={addItem}>
                        <Plus className="w-4 h-4 mr-2" /> Add Item
                    </Button>
                </div>
                <div className="space-y-4">
                    {data.items.map((item, index) => (
                        <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end border-b pb-4 last:border-0">
                            <div className="md:col-span-6 space-y-2">
                                <Label>Description</Label>
                                <Input value={item.description} onChange={(e) => handleItemChange(item.id, 'description', e.target.value)} placeholder="Service or Product name" />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <Label>Qty</Label>
                                <Input type="number" value={item.quantity} onChange={(e) => handleItemChange(item.id, 'quantity', parseFloat(e.target.value))} />
                            </div>
                            <div className="md:col-span-3 space-y-2">
                                <Label>Unit Price</Label>
                                <Input type="number" value={item.unitPrice} onChange={(e) => handleItemChange(item.id, 'unitPrice', parseFloat(e.target.value))} />
                            </div>
                            <div className="md:col-span-1 flex justify-center pb-1">
                                <Button variant="ghost" size="icon" className="text-destructive" onClick={() => removeItem(item.id)}>
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
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
