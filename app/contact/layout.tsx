import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Support — InvoiceGen',
    description: 'Get in touch with the InvoiceGen team. We respond to all support inquiries within 24 hours. Reach us by email or phone.',
    alternates: {
        canonical: 'https://invoicegenhub.com/contact',
    },
    openGraph: {
        type: 'website',
        url: 'https://invoicegenhub.com/contact',
        title: 'Contact Support — InvoiceGen',
        description: 'Get in touch with the InvoiceGen team. We respond to all support inquiries within 24 hours.',
        siteName: 'InvoiceGen',
        images: [{ url: 'https://invoicegenhub.com/og-image.png', width: 1200, height: 630, alt: 'InvoiceGen Contact' }],
    },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
