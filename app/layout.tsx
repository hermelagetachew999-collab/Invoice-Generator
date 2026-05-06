import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Free Invoice Generator | Professional PDF Invoices for Freelancers",
  description: "Generate professional PDF invoices for free. Features include VAT/Tax calculation, discount application, multiple templates, and secure sharing. Perfect for freelancers and small businesses worldwide.",
  keywords: "free invoice generator, professional freelance invoices, pdf invoice creator, VAT calculator, tax invoice tool, business invoice sharing",
  alternates: {
    canonical: "https://invoicegenhub.com/",
  },
  other: {
    "google-adsense-account": "ca-pub-2774149894101724",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* AdSense Primary Script */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2774149894101724"
          crossOrigin="anonymous"
        ></script>
        
        {/* Google-Certified CMP Placeholder */}
        <meta name="google-adsense-adsbygoogle" content="ca-pub-2774149894101724" />

        {/* Enhanced JSON-LD: Honesty & Identity Proofing */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "InvoiceGen",
                "alternateName": "Hermela Invoicing Tools",
                "url": "https://invoicegenhub.com",
                "logo": "https://invoicegenhub.com/logo.png",
                "contactPoint": {
                  "@type": "ContactPoint",
                  "telephone": "+251-909542151",
                  "contactType": "customer service",
                  "email": "hermelagetachew999@gmail.com",
                  "areaServed": "Global",
                  "availableLanguage": ["en", "am", "ar"]
                },
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Hawassa",
                  "addressLocality": "Hawassa",
                  "postalCode": "1000",
                  "addressCountry": "ET"
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "Person",
                "name": "Hermela Getachew",
                "jobTitle": "Founder & Lead Developer",
                "url": "https://invoicegenhub.com/about",
                "sameAs": [
                  "https://github.com/hermelagetachew999-collab"
                ],
                "worksFor": {
                  "@type": "Organization",
                  "name": "InvoiceGen"
                }
              }
            ])
          }}
        />
      </head>
      <body className={`${outfit.className} antialiased selection:bg-primary/10 selection:text-primary overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
