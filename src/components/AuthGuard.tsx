'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    // Check if user is authenticated
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      // Redirect to login page if not authenticated
      router.push('/admin/login');
    }
  }, [router]);

  // In a real app, you might want to show a loading state here
  return <>{children}</>;
}
