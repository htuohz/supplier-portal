'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();

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
