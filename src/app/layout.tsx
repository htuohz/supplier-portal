import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Supplier Portal - Find Reliable Chinese Suppliers",
  description:
    "Connect with verified manufacturers and suppliers from China. Find reliable business partners for your sourcing needs.",
  keywords:
    "suppliers, manufacturers, China, sourcing, B2B, trade, import, export",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
