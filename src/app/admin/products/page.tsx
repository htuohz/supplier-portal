'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import I18nProvider from '@/components/I18nProvider';
import LanguageSwitcher from '@/components/LanguageSwitcher';

// Mock product data
const mockProducts = [
  {
    id: '1',
    name: 'LCD Display 24"',
    category: 'Electronics',
    supplier: 'Tech Components Ltd',
    price: 149.99,
    stock: 45,
    sku: 'LCD-24-TC',
  },
  {
    id: '2',
    name: 'Wireless Keyboard',
    category: 'Computer Accessories',
    supplier: 'Global Electronics',
    price: 59.99,
    stock: 120,
    sku: 'KB-WL-GE',
  },
  {
    id: '3',
    name: 'USB-C Cable 2m',
    category: 'Cables & Adapters',
    supplier: 'Cable Solutions Inc',
    price: 12.99,
    stock: 350,
    sku: 'USB-C-2M-CS',
  },
  {
    id: '4',
    name: 'Bluetooth Speaker',
    category: 'Audio',
    supplier: 'Sound Masters',
    price: 79.99,
    stock: 65,
    sku: 'BT-SPK-SM',
  },
  {
    id: '5',
    name: 'Wireless Mouse',
    category: 'Computer Accessories',
    supplier: 'Global Electronics',
    price: 29.99,
    stock: 95,
    sku: 'MS-WL-GE',
  },
  {
    id: '6',
    name: 'External SSD 1TB',
    category: 'Storage',
    supplier: 'Data Storage Pro',
    price: 129.99,
    stock: 30,
    sku: 'SSD-1TB-DSP',
  },
  {
    id: '7',
    name: 'HDMI Cable 3m',
    category: 'Cables & Adapters',
    supplier: 'Cable Solutions Inc',
    price: 15.99,
    stock: 200,
    sku: 'HDMI-3M-CS',
  },
  {
    id: '8',
    name: 'Webcam HD 1080p',
    category: 'Computer Accessories',
    supplier: 'Vision Tech',
    price: 69.99,
    stock: 40,
    sku: 'WC-HD-VT',
  },
];

export default function ProductsPage() {
  return (
    <I18nProvider>
      <ProductsList />
    </I18nProvider>
  );
}

function ProductsList() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  // Extract unique categories for filter dropdown
  const categories = Array.from(new Set(mockProducts.map(product => product.category)));

  // Filter products based on search term and selected category
  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch =
      searchTerm === '' ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.supplier.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === '' || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleDelete = (productId: string) => {
    console.log(`Delete product with ID: ${productId}`);
    // In a real application, this would make an API call to delete the product
    // After successful deletion, you would update the product list
    setShowDeleteConfirm(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{t('products')}</h1>
        <div className="flex items-center space-x-4">
          <LanguageSwitcher />
          <Link
            href="/admin/products/add"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            {t('addProduct')}
          </Link>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
        <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="relative w-full md:w-1/3">
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={t('searchProducts')}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <div className="absolute right-3 top-2.5 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div className="w-full md:w-1/4">
            <select
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
            >
              <option value="">{t('allCategories')}</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {t('productName')}
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {t('category')}
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {t('supplier')}
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {t('price')}
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {t('stock')}
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {t('sku')}
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {t('actions')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{product.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{product.supplier}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">${product.price.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div
                        className={`text-sm ${product.stock < 10 ? 'text-red-500 font-bold' : 'text-gray-500'}`}
                      >
                        {product.stock}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{product.sku}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Link
                          href={`/admin/products/${product.id}`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          {t('view')}
                        </Link>
                        <Link
                          href={`/admin/products/${product.id}/edit`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          {t('edit')}
                        </Link>
                        <button
                          onClick={() => setShowDeleteConfirm(product.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          {t('delete')}
                        </button>
                      </div>
                      {showDeleteConfirm === product.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                          <div className="p-2 text-sm text-gray-700">
                            {t('confirmDeleteProduct')}
                          </div>
                          <div className="flex justify-end p-2 border-t border-gray-100">
                            <button
                              onClick={() => setShowDeleteConfirm(null)}
                              className="px-3 py-1 text-xs text-gray-600 hover:text-gray-800 mr-2"
                            >
                              {t('cancel')}
                            </button>
                            <button
                              onClick={() => handleDelete(product.id)}
                              className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                            >
                              {t('delete')}
                            </button>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                    {t('noProductsFound')}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
