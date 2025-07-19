import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Providers from '@/components/Providers';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Supplier Portal - Find Reliable Chinese Suppliers',
  description:
    'Connect with verified manufacturers and suppliers from China. Find reliable business partners for your sourcing needs.',
  keywords: 'suppliers, manufacturers, China, sourcing, B2B, trade, import, export',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Providers>{children}</Providers>
        </main>
        <Footer />
      </body>
    </html>
  );
}
