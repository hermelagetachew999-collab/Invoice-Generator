import { jsPDF } from "jspdf";
import QRCode from "qrcode";

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

export const generatePDF = async (data: InvoiceData) => {
    const doc = new jsPDF({
        compress: true,
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });

    const isRTL = data.language === 'ar';
    const t = translations[data.language || 'en'];

    // Metadata Optimization
    doc.setProperties({
        title: `Invoice ${data.invoiceNumber || ''}`,
        subject: 'Generated Invoice by InvoiceGen.et',
        author: data.businessName || 'InvoiceGen.et',
        keywords: 'invoice, ethiopia, bill, freelancer',
        creator: 'InvoiceGen.et'
    });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    let currentY = 30;

    // Logo
    if (data.logo) {
        try {
            const imgProps = doc.getImageProperties(data.logo);
            const logoWidth = data.logoSize ? data.logoSize / 4 : 30; // Scale down for PDF mm
            const logoHeight = (imgProps.height * logoWidth) / imgProps.width;

            let logoX = margin;
            if (data.logoPosition === 'center') {
                logoX = (pageWidth - logoWidth) / 2;
            } else if (data.logoPosition === 'right') {
                logoX = pageWidth - margin - logoWidth;
            }

            doc.addImage(data.logo, 'PNG', logoX, currentY - 10, logoWidth, logoHeight);
            currentY += logoHeight + 10;
        } catch (error) {
            console.error("Error adding logo to PDF:", error);
        }
    }

    // Layout and Header Selection
    if (data.template === 'classic') {
        currentY = 40;
        if (data.logo) {
            try {
                const imgProps = doc.getImageProperties(data.logo);
                const logoWidth = data.logoSize ? data.logoSize / 4 : 30;
                const logoHeight = (imgProps.height * logoWidth) / imgProps.width;
                doc.addImage(data.logo, 'PNG', (pageWidth - logoWidth) / 2, 20, logoWidth, logoHeight);
                currentY = 25 + logoHeight + 10;
            } catch (e) {
                console.error(e);
            }
        }
        doc.setFontSize(22);
        doc.setFont("helvetica", "bold");
        doc.text(data.businessName || "Your Company", pageWidth / 2, currentY, { align: "center" });
        currentY += 8;
        if (data.slogan) {
            doc.setFontSize(10);
            doc.setFont("helvetica", "italic");
            doc.setTextColor(100);
            doc.text(data.slogan, pageWidth / 2, currentY, { align: "center" });
            currentY += 6;
        }
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(80);
        doc.text(data.businessAddress || "", pageWidth / 2, currentY, { align: "center" });
        currentY += 5;
        if (data.businessTIN) {
            doc.text(`${t.tin}: ${data.businessTIN}`, pageWidth / 2, currentY, { align: "center" });
            currentY += 10;
        }
    } else if (data.template === 'minimalist') {
        if (data.logo) {
            try {
                const imgProps = doc.getImageProperties(data.logo);
                const logoWidth = data.logoSize ? data.logoSize / 5 : 20;
                const logoHeight = (imgProps.height * logoWidth) / imgProps.width;
                doc.addImage(data.logo, 'PNG', margin, currentY - 10, logoWidth, logoHeight);
                currentY += logoHeight + 5;
            } catch (e) {
                console.error(e);
            }
        }
        doc.setFontSize(28);
        doc.setFont("helvetica", "light");
        doc.setTextColor(150);
        doc.text(t.invoice.toUpperCase(), pageWidth - margin, 30, { align: "right" });
        doc.setFontSize(10);
        doc.text(`#${data.invoiceNumber}`, pageWidth - margin, 38, { align: "right" });

        doc.setFontSize(12);
        doc.setTextColor(0);
        doc.setFont("helvetica", "bold");
        doc.text(data.businessName || "", margin, currentY);
        currentY += 6;
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(100);
        doc.text(data.businessAddress || "", margin, currentY);
        currentY += 15;
    } else {
        // Modern (Default)
        doc.setFontSize(24);
        doc.setTextColor(59, 130, 246); // Primary Color
        doc.text(t.invoice, isRTL ? pageWidth - margin : margin, currentY, { align: isRTL ? "right" : "left" });

        doc.setFontSize(10);
        doc.setTextColor(100, 116, 139);
        doc.text(`#${data.invoiceNumber}`, isRTL ? pageWidth - margin : margin, currentY + 8, { align: isRTL ? "right" : "left" });

        // Business Info
        doc.setFontSize(12);
        doc.setTextColor(0);
        doc.setFont("helvetica", "bold");
        doc.text(data.businessName || "Your Company", pageWidth - margin, currentY, { align: "right" });

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(100);
        if (data.slogan) {
            doc.setFontSize(9);
            doc.setFont("helvetica", "italic");
            doc.setTextColor(59, 130, 246);
            doc.text(data.slogan, pageWidth - margin, currentY + 6, { align: "right" });
            currentY += 5;
        }
        const businessAddressLines = doc.splitTextToSize(data.businessAddress || "Your Address", 60);
        doc.text(businessAddressLines, isRTL ? margin : pageWidth - margin, currentY + 6, { align: isRTL ? "left" : "right" });

        if (data.businessTIN) {
            doc.text(`${t.tin}: ${data.businessTIN}`, isRTL ? margin : pageWidth - margin, currentY + 6 + (businessAddressLines.length * 5), { align: isRTL ? "left" : "right" });
        }
    }

    const contentStartY = Math.max(currentY + 40, 70);

    // Client Info
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.setFont("helvetica", "bold");
    doc.text(data.clientName || "Client Name", isRTL ? pageWidth - margin : margin, contentStartY + 6, { align: isRTL ? "right" : "left" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(100);
    const clientAddressLines = doc.splitTextToSize(data.clientAddress || "Client Address", 60);
    doc.text(clientAddressLines, isRTL ? pageWidth - margin : margin, contentStartY + 12, { align: isRTL ? "right" : "left" });

    if (data.clientEmail) {
        doc.setFontSize(9);
        doc.setTextColor(59, 130, 246); // Primary blue for email
        doc.text(data.clientEmail, isRTL ? pageWidth - margin : margin, contentStartY + 12 + (clientAddressLines.length * 5), { align: isRTL ? "right" : "left" });
    }

    // Extra Fields (Due Date, PO)
    if (data.dueDate || data.poNumber) {
        doc.setTextColor(100);
        let extraY = contentStartY + 7;
        if (data.dueDate) {
            doc.text(`${t.dueDate}: ${data.dueDate}`, pageWidth - margin, extraY, { align: "right" });
            extraY += 6;
        }
        if (data.poNumber) {
            doc.text(`${t.poNumber}: ${data.poNumber}`, pageWidth - margin, extraY, { align: "right" });
        }
    }

    // Table Header
    const tableTop = contentStartY + 35;
    doc.setDrawColor(0);
    doc.setLineWidth(data.template === 'minimalist' ? 0.1 : 0.5);
    doc.line(margin, tableTop, pageWidth - margin, tableTop);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(0);
    if (isRTL) {
        doc.text(t.description, pageWidth - margin, tableTop + 7, { align: "right" });
        doc.text(t.qty, margin + 80, tableTop + 7, { align: "left" });
        doc.text(t.unitPrice, margin + 45, tableTop + 7, { align: "left" });
        doc.text(t.amount, margin, tableTop + 7, { align: "left" });
    } else {
        doc.text(t.description, margin, tableTop + 7);
        doc.text(t.qty, pageWidth - 80, tableTop + 7, { align: "right" });
        doc.text(t.unitPrice, pageWidth - 45, tableTop + 7, { align: "right" });
        doc.text(t.amount, pageWidth - margin, tableTop + 7, { align: "right" });
    }

    doc.line(margin, tableTop + 12, pageWidth - margin, tableTop + 12);

    // Table Items
    doc.setFont("helvetica", "normal");
    currentY = tableTop + 20;
    let subtotal = 0;

    data.items.forEach((item) => {
        const amount = item.quantity * item.unitPrice;
        subtotal += amount;

        const descLines = doc.splitTextToSize(item.description || "Service/Item", 80);
        if (isRTL) {
            doc.text(descLines, pageWidth - margin, currentY, { align: "right" });
            doc.text(item.quantity.toString(), margin + 80, currentY, { align: "left" });
            doc.text(`${item.unitPrice.toLocaleString()} ${data.currency}`, margin + 45, currentY, { align: "left" });
            doc.text(`${amount.toLocaleString()} ${data.currency}`, margin, currentY, { align: "left" });
        } else {
            doc.text(descLines, margin, currentY);
            doc.text(item.quantity.toString(), pageWidth - 80, currentY, { align: "right" });
            doc.text(`${item.unitPrice.toLocaleString()} ${data.currency}`, pageWidth - 45, currentY, { align: "right" });
            doc.text(`${amount.toLocaleString()} ${data.currency}`, pageWidth - margin, currentY, { align: "right" });
        }

        currentY += Math.max(descLines.length * 5, 10);
    });

    // Totals
    const vatAmount = (subtotal * data.vatRate) / 100;
    const total = subtotal + vatAmount;

    currentY += 10;
    doc.line(pageWidth - 90, currentY, pageWidth - margin, currentY);

    currentY += 10;
    const labelX = isRTL ? pageWidth - margin : pageWidth - 90;
    const valueX = isRTL ? margin : pageWidth - margin;
    const alignLabel = isRTL ? "right" : "left";
    const alignValue = isRTL ? "left" : "right";

    doc.text(`${t.subtotal}:`, labelX, currentY, { align: alignLabel });
    doc.text(`${subtotal.toLocaleString()} ${data.currency}`, valueX, currentY, { align: alignValue });

    currentY += 7;
    doc.text(`${t.vat} (${data.vatRate}%):`, labelX, currentY, { align: alignLabel });
    doc.text(`${vatAmount.toLocaleString()} ${data.currency}`, valueX, currentY, { align: alignValue });

    currentY += 10;
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    if (data.template === 'modern') doc.setTextColor(59, 130, 246);
    doc.text(`${t.total}:`, labelX, currentY, { align: alignLabel });
    doc.text(`${total.toLocaleString()} ${data.currency}`, valueX, currentY, { align: alignValue });

    // Bank Details, Notes, Terms
    currentY += 20;
    const footerWidth = (pageWidth - margin * 2) * 0.6;
    if (data.bankDetails) {
        doc.setFontSize(9);
        doc.setTextColor(150);
        doc.text(t.bankDetails.toUpperCase(), isRTL ? pageWidth - margin : margin, currentY, { align: isRTL ? "right" : "left" });
        doc.setTextColor(50);
        const bankLines = doc.splitTextToSize(data.bankDetails, footerWidth);
        doc.text(bankLines, isRTL ? pageWidth - margin : margin, currentY + 5, { align: isRTL ? "right" : "left" });
        currentY += (bankLines.length * 4) + 10;
    }
    if (data.notes) {
        doc.setFontSize(9);
        doc.setTextColor(150);
        doc.text(t.notes.toUpperCase(), isRTL ? pageWidth - margin : margin, currentY, { align: isRTL ? "right" : "left" });
        doc.setTextColor(50);
        const notesLines = doc.splitTextToSize(data.notes, footerWidth);
        doc.text(notesLines, isRTL ? pageWidth - margin : margin, currentY + 5, { align: isRTL ? "right" : "left" });
        currentY += (notesLines.length * 4) + 10;
    }
    if (data.terms) {
        doc.setFontSize(8);
        doc.setTextColor(150);
        const termsLabel = t.terms.toUpperCase();
        const termsLines = doc.splitTextToSize(data.terms, pageWidth - margin * 2);
        const sectionHeight = (termsLines.length * 4) + 15;

        // Page break check
        if (currentY + sectionHeight > pageHeight - 30) {
            doc.addPage();
            currentY = margin;
        }

        doc.text(termsLabel, isRTL ? pageWidth - margin : margin, currentY, { align: isRTL ? "right" : "left" });
        doc.setFont("helvetica", "italic");
        doc.setTextColor(100);
        doc.text(termsLines, isRTL ? pageWidth - margin : margin, currentY + 5, { align: isRTL ? "right" : "left" });
        currentY += sectionHeight;
    }

    // QR Code and Payment Info
    if (data.showQRCode && data.accountNumber) {
        try {
            const qrText = `Payment to: ${data.bankName || ''} - Account: ${data.accountNumber} - Amount: ${total.toLocaleString()} ${data.currency}`;
            const qrDataUrl = await QRCode.toDataURL(qrText);

            // Check if we need a new page for QR code
            if (currentY + 40 > pageHeight - 20) {
                doc.addPage();
                currentY = margin;
            }

            const qrX = isRTL ? pageWidth - margin - 30 : margin;
            const textX = isRTL ? pageWidth - margin - 35 : margin + 35;
            const textAlign = isRTL ? "right" : "left";

            doc.addImage(qrDataUrl, 'PNG', qrX, currentY, 30, 30);
            doc.setFontSize(8);
            doc.setTextColor(100);
            doc.text(`SCAN TO PAY (${data.bankName || 'TRANSFER'})`, textX, currentY + 10, { align: textAlign });
            doc.setFont("helvetica", "bold");
            doc.text(`${data.accountNumber}`, textX, currentY + 15, { align: textAlign });
            doc.setFont("helvetica", "normal");
            doc.text(`Total Due: ${total.toLocaleString()} ${data.currency}`, textX, currentY + 20, { align: textAlign });

            currentY += 35;
        } catch (err) {
            console.error("QR Code Error:", err);
        }
    }

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.setFont("helvetica", "normal");
    doc.text(t.thankYou, pageWidth / 2, pageHeight - 15, { align: "center" });

    doc.save(`Invoice_${data.clientName || 'Client'}.pdf`);
};
