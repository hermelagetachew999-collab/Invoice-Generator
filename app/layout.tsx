import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Free Unlimited Invoice Generator | Professional PDF Invoices for Freelancers",
  description: "Generate unlimited professional PDF invoices for free. Features include VAT/Tax calculation, discount application, multiple templates, and secure sharing. Perfect for freelancers and small businesses worldwide.",
  keywords: "free invoice generator, unlimited invoices, professional freelance invoices, pdf invoice creator, VAT calculator, tax invoice tool, business invoice sharing",
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
