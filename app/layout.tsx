import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Free Invoice Generator — Create & Download PDF Invoices Instantly",
    template: "%s | InvoiceGen",
  },
  description: "Create professional PDF invoices for free — no sign-up required. Add your logo, set VAT/tax rates, apply discounts, and download unlimited invoices in seconds. Built for freelancers and small businesses worldwide.",
  keywords: [
    "free invoice generator",
    "invoice generator",
    "free invoice maker",
    "pdf invoice generator",
    "create invoice online free",
    "professional invoice template",
    "freelance invoice generator",
    "small business invoice",
    "online invoice creator",
    "invoice download pdf",
    "VAT invoice generator",
    "free billing software",
  ],
  authors: [{ name: "InvoiceGen", url: "https://invoicegenhub.com" }],
  creator: "InvoiceGen",
  publisher: "InvoiceGen",
  metadataBase: new URL("https://invoicegenhub.com"),
  alternates: {
    canonical: "https://invoicegenhub.com/",
  },
  openGraph: {
    type: "website",
    url: "https://invoicegenhub.com/",
    siteName: "InvoiceGen",
    title: "Free Invoice Generator — Create & Download PDF Invoices Instantly",
    description: "Create professional PDF invoices for free — no sign-up required. Add your logo, set VAT/tax, apply discounts, and download unlimited invoices in seconds.",
    locale: "en_US",
    images: [
      {
        url: "https://invoicegenhub.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "InvoiceGen — Free Invoice Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Invoice Generator — Create & Download PDF Invoices Instantly",
    description: "Create professional PDF invoices for free — no sign-up required. Download unlimited invoices in seconds.",
    images: ["https://invoicegenhub.com/og-image.png"],
    creator: "@invoicegenhub",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "google-adsense-account": "ca-pub-2774149894101724",
  },
};

const SCHEMA_JSON = JSON.stringify([
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "InvoiceGen — Free Invoice Generator",
    "url": "https://invoicegenhub.com",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Create professional PDF invoices for free — no sign-up required. Add logo, set VAT/tax, apply discounts, and download unlimited invoices in seconds.",
    "featureList": [
      "Unlimited free PDF invoice downloads",
      "VAT and tax calculation",
      "Discount support",
      "Custom logo upload",
      "Multiple invoice templates",
      "Multi-currency support",
      "Excel and image export"
    ],
    "screenshot": "https://invoicegenhub.com/og-image.png",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "120"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "InvoiceGen",
    "url": "https://invoicegenhub.com",
    "logo": "https://invoicegenhub.com/logo.png",
    "sameAs": [
      "https://github.com/hermelagetachew999-collab"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+251-909542151",
      "contactType": "customer service",
      "email": "hermelagetachew999@gmail.com",
      "areaServed": "Worldwide",
      "availableLanguage": ["en", "am", "ar"]
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://invoicegenhub.com"
      }
    ]
  }
]);

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
      </body>
    </html>
  );
}
