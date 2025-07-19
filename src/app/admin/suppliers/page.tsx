'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import I18nProvider from '@/components/I18nProvider';
import LanguageSwitcher from '@/components/LanguageSwitcher';

interface Supplier {
  id: string;
  companyName: string;
  mainProducts: string[];
  country: string;
  city: string;
  contactPerson: string;
  email: string;
}

export default function SuppliersPage() {
  return (
    <I18nProvider>
      <SuppliersList />
    </I18nProvider>
  );
}

function SuppliersList() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await fetch('/api/suppliers');
        if (!response.ok) {
          throw new Error('Failed to fetch suppliers');
        }
        const data = await response.json();
        setSuppliers(data.suppliers);
      } catch (error) {
        setError(error instanceof Error ? error.message : String(error));
        console.error('Error fetching suppliers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, []);

  // Filter suppliers based on search term
  const filteredSuppliers = suppliers.filter(
    supplier =>
      supplier.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.mainProducts.some(product =>
        product.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      supplier.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{t('suppliers')}</h1>
        <div className="flex items-center space-x-4">
          <LanguageSwitcher />
          <Link
            href="/admin/suppliers/add"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {t('addSupplier')}
          </Link>
        </div>
      </div>

      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            className="w-full p-3 pl-10 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder={t('searchSuppliers')}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-gray-600">{t('loading')}...</p>
        </div>
      )}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                {t('errorLoadingSuppliers')}: {error}
              </p>
            </div>
          </div>
        </div>
      )}
      {!loading && !error && (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {t('companyName')}
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {t('mainProducts')}
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {t('location')}
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {t('contact')}
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {t('actions')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSuppliers.length > 0 ? (
                filteredSuppliers.map(supplier => (
                  <tr key={supplier.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {supplier.companyName}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">
                        {supplier.mainProducts.join(', ')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {supplier.city}, {supplier.country}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{supplier.contactPerson}</div>
                      <div className="text-sm text-gray-500">{supplier.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link
                        href={`/admin/suppliers/${supplier.id}`}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        {t('view')}
                      </Link>
                      <Link
                        href={`/admin/suppliers/${supplier.id}/edit`}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        {t('edit')}
                      </Link>
                      <button
                        className="text-red-600 hover:text-red-900"
                        onClick={async () => {
                          if (window.confirm(t('confirmDeleteSupplier'))) {
                            try {
                              const response = await fetch(`/api/suppliers/${supplier.id}`, {
                                method: 'DELETE',
                              });
                              if (!response.ok) {
                                throw new Error('Failed to delete supplier');
                              }
                              setSuppliers(suppliers.filter(s => s.id !== supplier.id));
                            } catch (error) {
                              alert(
                                t('deleteFailed') +
                                  ': ' +
                                  (error instanceof Error ? error.message : String(error))
                              );
                            }
                          }
                        }}
                      >
                        {t('delete')}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                    {t('noSuppliersFound')}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
