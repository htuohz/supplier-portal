'use client';

import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import I18nProvider from '@/components/I18nProvider';
import LanguageSwitcher from '@/components/LanguageSwitcher';

// Mock data for dashboard statistics
const dashboardStats = {
  totalSuppliers: 127,
  newSuppliersThisMonth: 8,
  pendingApprovals: 5,
  recentlyUpdated: 12,
  totalProducts: 1458,
  totalCategories: 24,
};

export default function AdminDashboardPage() {
  return (
    <I18nProvider>
      <AdminDashboard />
    </I18nProvider>
  );
}

function AdminDashboard() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{t('adminDashboard')}</h1>
        <LanguageSwitcher />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Supplier Stats */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">{t('supplierStatistics')}</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">{t('totalSuppliers')}</span>
              <span className="text-2xl font-bold text-blue-600">
                {dashboardStats.totalSuppliers}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">{t('newSuppliersThisMonth')}</span>
              <span className="text-2xl font-bold text-green-600">
                {dashboardStats.newSuppliersThisMonth}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">{t('pendingApprovals')}</span>
              <span className="text-2xl font-bold text-yellow-600">
                {dashboardStats.pendingApprovals}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">{t('recentlyUpdated')}</span>
              <span className="text-2xl font-bold text-purple-600">
                {dashboardStats.recentlyUpdated}
              </span>
            </div>
          </div>
          <div className="mt-6">
            <Link
              href="/admin/suppliers"
              className="block w-full text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {t('manageSuppliers')}
            </Link>
          </div>
        </div>

        {/* Product Stats */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">{t('productStatistics')}</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">{t('totalProducts')}</span>
              <span className="text-2xl font-bold text-blue-600">
                {dashboardStats.totalProducts}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">{t('totalCategories')}</span>
              <span className="text-2xl font-bold text-green-600">
                {dashboardStats.totalCategories}
              </span>
            </div>
          </div>
          <div className="mt-6">
            <Link
              href="/admin/products"
              className="block w-full text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {t('manageProducts')}
            </Link>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">{t('quickActions')}</h2>
          <div className="space-y-3">
            <Link
              href="/admin/suppliers/add"
              className="block w-full text-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              {t('addSupplier')}
            </Link>
            <Link
              href="/admin/products/add"
              className="block w-full text-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              {t('addProduct')}
            </Link>
            <Link
              href="/admin/categories"
              className="block w-full text-center bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
            >
              {t('manageCategories')}
            </Link>
            <Link
              href="/admin/reports"
              className="block w-full text-center bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            >
              {t('viewReports')}
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">{t('recentActivity')}</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {t('date')}
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {t('user')}
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {t('action')}
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {t('details')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-06-15</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Admin User</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {t('addedSupplier')}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">Tech Components Ltd</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-06-14</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Admin User</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {t('updatedProduct')}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">LCD Display 24&quot;</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-06-13</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Admin User</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {t('approvedSupplier')}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">Global Electronics</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-06-12</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Admin User</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {t('addedCategory')}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">Renewable Energy Components</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-06-11</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Admin User</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {t('deletedProduct')}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">Discontinued Sensor Model X</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
