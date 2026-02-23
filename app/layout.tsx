import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Free Invoice Generator for Freelancers Worldwide | InvoiceGen",
  description: "Create professional PDF invoices with automatic VAT/Tax calculation for your freelance business. Fast, mobile-friendly, and free.",
  keywords: "invoice generator, freelancer invoice, VAT calculator, tax tools, global business tools, free invoice pdf",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
