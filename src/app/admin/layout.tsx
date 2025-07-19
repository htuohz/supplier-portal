'use client';

import { ReactNode } from 'react';
import AdminNav from '@/components/AdminNav';
import I18nProvider from '@/components/I18nProvider';
import AuthGuard from '@/components/AuthGuard';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <I18nProvider>
      <AuthGuard>
        <div className="min-h-screen bg-gray-100">
          <AdminNav />
          <div className="py-10">
            <main className="container mx-auto px-4 sm:px-6 lg:px-8">{children}</main>
          </div>
        </div>
      </AuthGuard>
    </I18nProvider>
  );
}
