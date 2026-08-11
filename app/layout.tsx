import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"] });

const SCHEMA_JSON = JSON.stringify([
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "InvoiceGen",
    "url": "https://invoicegenhub.com/",
    "logo": "https://invoicegenhub.com/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+251-909542151",
      "contactType": "customer service",
      "email": "hermelagetachew999@gmail.com",
      "areaServed": "Global",
      "availableLanguage": ["en", "am", "ar"]
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Hermela Getachew",
    "jobTitle": "Founder & Lead Developer",
    "url": "https://invoicegenhub.com/about",
    "sameAs": ["https://github.com/hermelagetachew999-collab"],
    "worksFor": { "@type": "Organization", "name": "InvoiceGen" }
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "InvoiceGen",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  }
]);

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-adsense-adsbygoogle" content="ca-pub-2774149894101724" />
      </head>
      <body className={`${outfit.className} antialiased selection:bg-primary/10 selection:text-primary overflow-x-hidden`}>
        <script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: SCHEMA_JSON }}
        />
        
        {children}

        {/* AdSense — loads after hydration */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2774149894101724"
          strategy="lazyOnload"
          crossOrigin="anonymous"
        />

        {/* Adsterra popunder — loads after hydration so it can't break it */}
        <Script
          id="adsterra-popunder"
          strategy="lazyOnload"
          data-cfasync="false"
          src="https://smelthrsfranz.com/2aaf1a428ad18c4307bf71f64f8ea2a3/invoke.js"
        />
      </body>
    </html>
  );
}