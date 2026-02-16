import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
