import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms of Service — InvoiceGen',
    description: 'Read the InvoiceGen terms of service. This free invoice generator is provided for informal use. No professional accounting or legal advice is given.',
    alternates: {
        canonical: 'https://invoicegenhub.com/terms',
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
