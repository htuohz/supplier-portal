'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ISupplier } from '@/models/Supplier';

// 默认图片
const DEFAULT_IMAGE = 'https://via.placeholder.com/300x200?text=No+Image';

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<ISupplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'established' | 'employees'>('name');
  const [filterCountry, setFilterCountry] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await fetch('/api/suppliers');
        if (!response.ok) {
          throw new Error('Failed to fetch suppliers');
        }
        const data = await response.json();
        setSuppliers(data.suppliers || []);
      } catch (err) {
        console.error('Error fetching suppliers:', err);
        setError('Failed to load suppliers. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, []);

  // 获取所有国家列表（用于筛选）
  const countries = useMemo(() => {
    const countrySet = new Set<string>();
    suppliers.forEach(supplier => {
      if (supplier.address?.country) {
        countrySet.add(supplier.address.country);
      }
    });
    return Array.from(countrySet).sort();
  }, [suppliers]);

  // 处理筛选、排序和搜索
  const filteredSuppliers = useMemo(() => {
    return suppliers
      .filter(supplier => {
        // 搜索过滤
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch =
          searchTerm === '' ||
          supplier.companyName.toLowerCase().includes(searchLower) ||
          (supplier.description && supplier.description.toLowerCase().includes(searchLower)) ||
          (supplier.mainProducts &&
            supplier.mainProducts.some(product => product.toLowerCase().includes(searchLower)));

        // 国家过滤
        const matchesCountry =
          filterCountry === '' || (supplier.address && supplier.address.country === filterCountry);

        return matchesSearch && matchesCountry;
      })
      .sort((a, b) => {
        // 排序
        if (sortBy === 'name') {
          return a.companyName.localeCompare(b.companyName);
        } else if (sortBy === 'established') {
          const yearA = a.establishedYear || 0;
          const yearB = b.establishedYear || 0;
          return yearB - yearA; // 降序，最新的在前
        } else if (sortBy === 'employees') {
          const employeeRanks: { [key: string]: number } = {
            '1-50': 1,
            '51-200': 2,
            '201-500': 3,
            '501-1000': 4,
            '1000+': 5,
          };
          const rankA = a.employeeCount ? employeeRanks[a.employeeCount] : 0;
          const rankB = b.employeeCount ? employeeRanks[b.employeeCount] : 0;
          return rankB - rankA; // 降序，员工多的在前
        }
        return 0;
      });
  }, [suppliers, searchTerm, filterCountry, sortBy]);

  // 分页
  const totalPages = Math.ceil(filteredSuppliers.length / itemsPerPage);
  const currentSuppliers = filteredSuppliers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 重置分页
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterCountry]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Suppliers Directory</h1>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Suppliers Directory</h1>
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-900">Suppliers Directory</h1>
          {/* <Link
            href="/suppliers/login"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Supplier Login / Register
          </Link> */}
        </div>

        {/* 搜索和筛选控件 */}
        <div className="bg-white p-4 rounded-lg shadow mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 搜索框 */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search suppliers..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
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

            {/* 国家筛选 */}
            <select
              value={filterCountry}
              onChange={e => setFilterCountry(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Countries</option>
              {countries.map(country => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>

            {/* 排序选项 */}
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as 'name' | 'established' | 'employees')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="name">Sort by Name</option>
              <option value="established">Sort by Year</option>
              <option value="employees">Sort by Size</option>
            </select>
          </div>
        </div>

        {/* 结果统计 */}
        <div className="mb-6 text-gray-600">
          Showing {filteredSuppliers.length} suppliers
          {filterCountry && ` in ${filterCountry}`}
          {searchTerm && ` matching "${searchTerm}"`}
        </div>

        {/* 供应商卡片网格 */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {currentSuppliers.map(supplier => (
            <Link
              href={`/suppliers/${supplier._id || supplier.id}`}
              key={supplier._id || supplier.id}
              className="block"
            >
              <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                {/* 图片区域 */}
                <div className="h-48 relative bg-gray-100">
                  <Image
                    src={
                      supplier.images && supplier.images.length > 0
                        ? supplier.images[0]
                        : DEFAULT_IMAGE
                    }
                    alt={supplier.companyName}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                  {supplier.establishedYear && (
                    <div className="absolute top-0 right-0 bg-blue-600 text-white px-2 py-1 text-xs font-medium">
                      Est. {supplier.establishedYear}
                    </div>
                  )}
                </div>

                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {supplier.companyName}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">
                    {supplier.description || 'No description available'}
                  </p>

                  {/* 主要产品标签 */}
                  {supplier.mainProducts && supplier.mainProducts.length > 0 && (
                    <div className="mb-3 flex flex-wrap gap-1">
                      {supplier.mainProducts.slice(0, 3).map((product, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {product}
                        </span>
                      ))}
                      {supplier.mainProducts.length > 3 && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                          +{supplier.mainProducts.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* 位置和员工数量 */}
                  <div className="flex flex-wrap text-sm text-gray-500 gap-x-4 gap-y-1">
                    {supplier.address && (
                      <div className="flex items-center">
                        <svg
                          className="h-4 w-4 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span>
                          {supplier.address.city}, {supplier.address.country}
                        </span>
                      </div>
                    )}

                    {supplier.employeeCount && (
                      <div className="flex items-center">
                        <svg
                          className="h-4 w-4 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        <span>{supplier.employeeCount}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 text-right">
                    <span className="text-indigo-600 hover:text-indigo-500 text-sm font-medium">
                      View Details →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 分页控件 */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <nav className="inline-flex rounded-md shadow">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center px-4 py-2 rounded-l-md border ${
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                } text-sm font-medium`}
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`relative inline-flex items-center px-4 py-2 border ${
                    currentPage === page
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  } text-sm font-medium`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`relative inline-flex items-center px-4 py-2 rounded-r-md border ${
                  currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                } text-sm font-medium`}
              >
                Next
              </button>
            </nav>
          </div>
        )}

        {filteredSuppliers.length === 0 && (
          <div className="text-center text-gray-500 mt-8 p-8 bg-white rounded-lg shadow">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No suppliers found</h3>
            <p className="mt-1 text-gray-500">
              {searchTerm || filterCountry
                ? 'Try adjusting your search or filter criteria.'
                : 'Check back later for new suppliers!'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
