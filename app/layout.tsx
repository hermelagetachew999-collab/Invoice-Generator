import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Free Invoice Generator | Professional PDF Invoices for Freelancers",
  description: "Generate professional PDF invoices for free. Features include VAT/Tax calculation, discount application, multiple templates, and secure sharing. Perfect for freelancers and small businesses worldwide.",
  keywords: "free invoice generator, professional freelance invoices, pdf invoice creator, VAT calculator, tax invoice tool, business invoice sharing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} antialiased selection:bg-primary/10 selection:text-primary overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
