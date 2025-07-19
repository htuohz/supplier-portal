'use client';

import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import LanguageSwitcher from './LanguageSwitcher';

export default function AdminNav() {
  const { t } = useTranslation();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    router.push('/admin/login');
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/admin" className="text-xl font-bold text-gray-900">
                {t('adminPanel')}
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-500">{t('welcomeAdmin')}</div>
            <button
              onClick={handleLogout}
              className="text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              {t('logout')}
            </button>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
}
