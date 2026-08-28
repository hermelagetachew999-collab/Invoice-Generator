export interface TemplateFAQ {
    question: string;
    answer: string;
}

export interface InvoiceTemplateData {
    slug: string;
    title: string;
    shortTitle: string;
    metaTitle: string;
    metaDescription: string;
    targetKeywords: string[];
    industry: string;
    summary: string;
    keyFeatures: string[];
    whatToInclude: string[];
    faqs: TemplateFAQ[];
    content: string;
}

export const invoiceTemplates: InvoiceTemplateData[] = [
    {
        slug: 'freelance-invoice-template',
        title: 'Free Freelance Invoice Template',
        shortTitle: 'Freelance Invoice',
        metaTitle: 'Free Freelance Invoice Template — Customize & Download PDF Instantly',
        metaDescription: 'Create professional freelance invoices in seconds. Free customizable PDF template for designers, developers, writers, and digital freelancers.',
        targetKeywords: [
            'freelance invoice template',
            'free freelance invoice',
            'invoice template for freelancers',
            'freelancer billing format',
            'download freelance invoice pdf',
        ],
        industry: 'Freelancers & Solopreneurs',
        summary: 'Designed specifically for independent creative and technical contractors. Includes flexible line item rates, project milestone breakdowns, and international payment instructions.',
        keyFeatures: [
            'Hourly or flat-fee line item pricing',
            'Multi-currency support (USD, EUR, GBP, ETB, and more)',
            'Automatic VAT / Sales tax calculations',
            'Direct PayPal, Wise, or bank transfer details field',
            'Instant PDF export with no registration required',
        ],
        whatToInclude: [
            'Your full professional name or trade name and contact info',
            'Client business name and accounts payable contact email',
            'Detailed scope of work / milestone descriptions',
            'Agreed payment terms (e.g. Net 14 or Net 30)',
            'Tax registration number (if applicable)',
        ],
        faqs: [
            {
                question: 'What should a freelance invoice include?',
                answer: 'A freelance invoice must include your business name, client details, unique invoice number, date of issue, payment due date, itemized list of tasks/milestones with rates, total due, and payment details.'
            },
            {
                question: 'Can I download this freelance invoice as a PDF?',
                answer: 'Yes! InvoiceGen exports high-resolution, print-ready PDF invoices instantly with one click.'
            },
            {
                question: 'Is this freelance invoice template 100% free?',
                answer: 'Yes, InvoiceGen is completely free with no subscription, credit card, or sign-up required.'
            }
        ],
        content: `
A well-structured freelance invoice protects your cash flow and establishes professional boundaries. As an independent professional, you need a billing layout that clearly conveys the scope of work completed, whether you charge by the hour, per project milestone, or on a monthly retainer.

### Why Freelancers Need a Dedicated Invoicing Format
1. **Prevents Scope Creep Disputes**: Itemizing each deliverable eliminates confusion over what was included in the agreed rate.
2. **Speeds Up Corporate Approval**: Adding explicit client project codes and accounts payable contacts helps your bill move through corporate approval pipelines.
3. **Audit-Ready Records**: Sequential invoice numbering keeps your bookkeeping clean for tax season.
        `
    },
    {
        slug: 'contractor-invoice-template',
        title: 'Independent Contractor Invoice Template',
        shortTitle: 'Contractor Invoice',
        metaTitle: 'Independent Contractor Invoice Template — Free PDF Generator',
        metaDescription: 'Free contractor invoice template for construction, IT subcontractors, and tradespeople. Itemize labor, materials, and taxes with instant PDF download.',
        targetKeywords: [
            'contractor invoice template',
            'subcontractor invoice template',
            'independent contractor billing',
            'construction contractor invoice pdf',
            'free contractor invoice maker',
        ],
        industry: 'Contractors & Subcontractors',
        summary: 'Tailored for independent contractors, trade professionals, and IT subcontractors who need to bill for labor hours, materials, equipment, and milestones.',
        keyFeatures: [
            'Separate labor and material cost itemization',
            'Project reference & Purchase Order (PO) number support',
            'Customizable tax and discount rates',
            'Clear milestone progress billing',
            'Instant PDF & Excel spreadsheet export',
        ],
        whatToInclude: [
            'Contractor business license or registered entity name',
            'Job site address or project reference number',
            'Itemized labor hours and materials used',
            'Clear payment schedule and late fee policies',
            'Tax identification number (EIN / TIN)',
        ],
        faqs: [
            {
                question: 'How do independent contractors invoice clients?',
                answer: 'Contractors itemize labor and materials separately, include the project name/PO number, add applicable tax, specify the payment due date, and send the invoice in PDF format.'
            },
            {
                question: 'Can I add a PO number to the invoice?',
                answer: 'Yes, you can include PO numbers, project codes, and custom notes in InvoiceGen.'
            }
        ],
        content: `
Contractors often balance both labor and material expenses. This template is designed to give clients complete transparency over job costs, milestone progress, and agreed contract rates.

### Best Practices for Contractor Invoicing
- **Include PO Numbers**: Always cross-reference the client's Purchase Order number to avoid processing holds.
- **Separate Labor from Materials**: Listing supplies separately makes it easier for clients to verify charges.
- **Clarify Payment Milestones**: If billing in stages (e.g., 50% deposit, 50% on completion), clearly state the phase being billed.
        `
    },
    {
        slug: 'consulting-invoice-template',
        title: 'Professional Consulting Invoice Template',
        shortTitle: 'Consulting Invoice',
        metaTitle: 'Professional Consulting Invoice Template — Free PDF Maker',
        metaDescription: 'Free invoice template for management consultants, IT advisors, and corporate strategists. Professional layout, hourly and retainer billing support.',
        targetKeywords: [
            'consulting invoice template',
            'consultant invoice pdf',
            'professional services invoice format',
            'business consultant billing template',
            'advisory invoice template free',
        ],
        industry: 'Consulting & Advisory',
        summary: 'An elegant, high-trust template for management consultants, business strategists, and corporate advisors billing for advisory sessions or project deliverables.',
        keyFeatures: [
            'Sophisticated Classic and Minimalist layout options',
            'Session-by-session or retainer breakdown',
            'Corporate tax compliance fields',
            'Wire transfer & SWIFT/IBAN international banking section',
        ],
        whatToInclude: [
            'Consulting firm or practitioner brand and logo',
            'Client executive or departmental contact',
            'Dates of advisory sessions and deliverables provided',
            'Agreed daily or hourly rate calculations',
        ],
        faqs: [
            {
                question: 'How do consultants bill for hourly vs retainer work?',
                answer: 'Hourly consulting is billed with detailed session dates and hour counts, while retainers are billed as a fixed monthly or quarterly advisory fee with specified deliverable caps.'
            }
        ],
        content: `
Corporate clients expect high design standards and administrative precision. A consulting invoice should mirror the executive caliber of your advisory work.
        `
    },
    {
        slug: 'photography-invoice-template',
        title: 'Photography Invoice Template',
        shortTitle: 'Photography Invoice',
        metaTitle: 'Photography Invoice Template — Free PDF Download & Generator',
        metaDescription: 'Free photography invoice template for wedding photographers, commercial shoots, and event videographers. Bill shoot fees, licensing, and editing.',
        targetKeywords: [
            'photography invoice template',
            'wedding photographer invoice pdf',
            'commercial photography invoice',
            'freelance photographer billing',
            'photo shoot invoice maker',
        ],
        industry: 'Creative & Photography',
        summary: 'Crafted for photographers and videographers to easily invoice for session fees, travel expenses, post-production editing, and commercial image licensing.',
        keyFeatures: [
            'Separate shoot fees, equipment rental, and licensing lines',
            'Deposit and remaining balance tracking',
            'Modern visual layout that complements creative work',
        ],
        whatToInclude: [
            'Studio branding and portfolio link',
            'Shoot date and event location',
            'Usage license rights (commercial vs personal)',
            'Deliverable timeline and payment schedule',
        ],
        faqs: [
            {
                question: 'How do I invoice for commercial photo licensing?',
                answer: 'Include a distinct line item for licensing terms (duration, territory, media type) separate from the day-rate or shooting fees.'
            }
        ],
        content: `
Photography invoices often require clear differentiation between the physical or creative labor (shooting time, travel) and intellectual property rights (commercial usage licenses).
        `
    },
    {
        slug: 'proforma-invoice-template',
        title: 'Proforma Invoice Template',
        shortTitle: 'Proforma Invoice',
        metaTitle: 'Proforma Invoice Template — Free PDF Generator & Format',
        metaDescription: 'Generate free proforma invoices for quotes, customs declaration, and pre-payment agreements. Professional PDF generator with custom terms.',
        targetKeywords: [
            'proforma invoice template',
            'free proforma invoice maker',
            'proforma vs commercial invoice',
            'proforma invoice pdf download',
            'estimated invoice format',
        ],
        industry: 'Commerce & Pre-Orders',
        summary: 'A preliminary invoice sent to buyers in advance of goods shipment or service delivery to outline estimated costs, quantities, and terms.',
        keyFeatures: [
            'Clearly marked "PROFORMA INVOICE" header',
            'Expiration date and validity period',
            'Customizable payment terms and shipping estimates',
        ],
        whatToInclude: [
            'Seller and buyer complete legal information',
            'Itemized list of expected goods or services',
            'Estimated shipping, customs, and applicable taxes',
            'Validity period of the quote',
        ],
        faqs: [
            {
                question: 'What is a proforma invoice used for?',
                answer: 'A proforma invoice is a preliminary bill of sale sent before goods are delivered or work begins to confirm pricing, terms, and import/export details.'
            }
        ],
        content: `
Proforma invoices provide a formal quote that commits the seller to deliver specified goods or services at agreed prices once the client approves.
        `
    }
];
