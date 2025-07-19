'use client';

import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import I18nProvider from '@/components/I18nProvider';

function AdminDashboardContent() {
  const { t } = useTranslation();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t('adminPanel')}</h1>
        <LanguageSwitcher />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">{t('manageUsers')}</h2>
          <p>
            {t('view')} {t('and')} {t('manage')} {t('users')}
          </p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">{t('manageSuppliers')}</h2>
          <p>
            {t('view')} {t('and')} {t('manage')} {t('suppliers')}
          </p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">{t('manageProducts')}</h2>
          <p>
            {t('view')} {t('and')} {t('manage')} {t('products')}
          </p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">{t('manageOrders')}</h2>
          <p>
            {t('view')} {t('and')} {t('manage')} {t('orders')}
          </p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">{t('analytics')}</h2>
          <p>
            {t('view')} {t('system')} {t('analytics')} {t('and')} {t('reports')}
          </p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">{t('systemSettings')}</h2>
          <p>
            {t('configure')} {t('system')} {t('settings')}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <I18nProvider>
      <AdminDashboardContent />
    </I18nProvider>
  );
}
