import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Free Invoice Generator for Ethiopian Freelancers | InvoiceGen.et",
  description: "Create professional PDF invoices with automatic VAT calculation for your freelance business in Ethiopia. Fast, mobile-friendly, and free.",
  keywords: "invoice generator, freelancer invoice, Ethiopia, VAT calculator, business tool, free invoice pdf",
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
