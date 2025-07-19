'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import { ISupplier } from '@/models/Supplier';

// 默认图片
const DEFAULT_IMAGE = 'https://via.placeholder.com/800x400?text=Company+Image';

export default function SupplierDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [supplier, setSupplier] = useState<ISupplier | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState<{
    submitted: boolean;
    success: boolean;
    message: string;
  }>({
    submitted: false,
    success: false,
    message: '',
  });
  const [relatedSuppliers, setRelatedSuppliers] = useState<ISupplier[]>([]);
  const contactFormRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/suppliers/${id}`);

        if (!response.ok) {
          throw new Error('Failed to fetch supplier details');
        }

        const data = await response.json();
        setSupplier(data);

        // 获取相关供应商
        fetchRelatedSuppliers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchSupplier();
    }
  }, [id]);

  const fetchRelatedSuppliers = async (currentSupplier: ISupplier) => {
    try {
      // 这里可以根据当前供应商的国家或主要产品来获取相关供应商
      const response = await fetch(
        `/api/suppliers?country=${currentSupplier.address?.country || ''}&limit=4`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch related suppliers');
      }

      const data = await response.json();
      // 过滤掉当前供应商
      const filtered = data.filter((s: ISupplier) => s._id !== id && s.id !== id);
      setRelatedSuppliers(filtered.slice(0, 3)); // 最多显示3个相关供应商
    } catch (error) {
      console.error('Error fetching related suppliers:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        submitted: true,
        success: false,
        message: 'Please fill in all required fields',
      });
      return;
    }

    try {
      // 调用联系API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          supplierId: id,
          supplierName: supplier?.companyName,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setFormStatus({
        submitted: true,
        success: true,
        message: 'Your message has been sent successfully! The supplier will contact you soon.',
      });

      // 重置表单
      setFormData({ name: '', email: '', message: '' });

      // 3秒后关闭表单
      setTimeout(() => {
        setShowContactForm(false);
        setFormStatus({ submitted: false, success: false, message: '' });
      }, 3000);
    } catch (error) {
      setFormStatus({
        submitted: true,
        success: false,
        message:
          error instanceof Error
            ? error.message
            : 'Failed to send message. Please try again later.',
      });
    }
  };

  const scrollToContactForm = () => {
    setShowContactForm(true);
    setTimeout(() => {
      contactFormRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !supplier) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-red-600 p-4 bg-red-50 rounded-lg">
            {error || 'Supplier not found'}
          </div>
          <div className="mt-4 text-center">
            <Link href="/suppliers" className="text-blue-600 hover:text-blue-800">
              ← Back to suppliers
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 确保有图片可显示
  const displayImages =
    supplier.images && supplier.images.length > 0 ? supplier.images : [DEFAULT_IMAGE];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* 页面头部 - 公司横幅 */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{supplier.companyName}</h1>
              <p className="text-blue-100 mb-4">
                {supplier.address?.city}, {supplier.address?.country} • Est.{' '}
                {supplier.establishedYear || 'N/A'}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {supplier.mainProducts.slice(0, 3).map(product => (
                  <span
                    key={product}
                    className="px-3 py-1 bg-blue-500 bg-opacity-30 rounded-full text-sm"
                  >
                    {product}
                  </span>
                ))}
                {supplier.mainProducts.length > 3 && (
                  <span className="px-3 py-1 bg-blue-500 bg-opacity-30 rounded-full text-sm">
                    +{supplier.mainProducts.length - 3} more
                  </span>
                )}
              </div>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <button
                onClick={scrollToContactForm}
                className="px-5 py-2 bg-white text-blue-700 font-medium rounded-lg hover:bg-blue-50 transition-colors"
              >
                Contact Supplier
              </button>
              {supplier.website && (
                <a
                  href={supplier.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 border border-white text-white font-medium rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors"
                >
                  Visit Website
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link href="/suppliers" className="text-blue-600 hover:text-blue-800">
            ← Back to suppliers
          </Link>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {/* 图片轮播 */}
          <div className="relative h-80 bg-gray-100">
            <Image
              src={displayImages[activeImageIndex]}
              alt={`${supplier.companyName} - Featured Image`}
              className="object-cover"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
            {displayImages.length > 1 && (
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                {displayImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`w-3 h-3 rounded-full ${
                      index === activeImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                    }`}
                    aria-label={`View image ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="p-6">
            {/* 公司信息部分 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="col-span-2">
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">Company Overview</h2>
                  <div className="prose max-w-none text-gray-600">
                    <p>{supplier.description}</p>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">Main Products</h2>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {supplier.mainProducts.map(product => (
                      <span
                        key={product}
                        className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                      >
                        {product}
                      </span>
                    ))}
                  </div>

                  {/* 产品描述 - 如果有的话 */}
                  {supplier.productDescription && (
                    <div className="mt-4 text-gray-600">
                      <p>{supplier.productDescription}</p>
                    </div>
                  )}
                </div>

                {supplier.certifications && supplier.certifications.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Certifications</h2>
                    <div className="flex flex-wrap gap-2">
                      {supplier.certifications.map(cert => (
                        <span
                          key={cert}
                          className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div>
                {/* 联系信息卡片 */}
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h2>
                  <div className="space-y-3">
                    <p className="flex items-start">
                      <svg
                        className="w-5 h-5 text-gray-500 mr-3 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        ></path>
                      </svg>
                      <span>{supplier.contactPerson}</span>
                    </p>
                    <p className="flex items-start">
                      <svg
                        className="w-5 h-5 text-gray-500 mr-3 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        ></path>
                      </svg>
                      <a
                        href={`mailto:${supplier.email}`}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        {supplier.email}
                      </a>
                    </p>
                    <p className="flex items-start">
                      <svg
                        className="w-5 h-5 text-gray-500 mr-3 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        ></path>
                      </svg>
                      <span>{supplier.phone}</span>
                    </p>
                    <p className="flex items-start">
                      <svg
                        className="w-5 h-5 text-gray-500 mr-3 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        ></path>
                      </svg>
                      <span>
                        {supplier.address?.detail}, {supplier.address?.city},{' '}
                        {supplier.address?.province}, {supplier.address?.country}
                      </span>
                    </p>
                    {supplier.establishedYear && (
                      <p className="flex items-start">
                        <svg
                          className="w-5 h-5 text-gray-500 mr-3 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          ></path>
                        </svg>
                        <span>Established: {supplier.establishedYear}</span>
                      </p>
                    )}
                    {supplier.employeeCount && (
                      <p className="flex items-start">
                        <svg
                          className="w-5 h-5 text-gray-500 mr-3 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          ></path>
                        </svg>
                        <span>Employees: {supplier.employeeCount}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* 联系按钮 */}
                <button
                  onClick={scrollToContactForm}
                  className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors mb-6"
                >
                  Contact This Supplier
                </button>
              </div>
            </div>

            {/* 公司图片展示 */}
            {supplier.images && supplier.images.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Company Images</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {supplier.images.map((image, index) => (
                    <div
                      key={index}
                      className="aspect-square bg-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => setActiveImageIndex(index)}
                    >
                      <Image
                        src={image}
                        alt={`${supplier.companyName} - Image ${index + 1}`}
                        className="object-cover"
                        width={300}
                        height={300}
                        style={{ width: '100%', height: '100%' }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 联系表单 */}
            <div ref={contactFormRef}>
              {showContactForm && (
                <div className="mb-12 bg-gray-50 p-6 rounded-lg shadow-sm">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Contact {supplier.companyName}
                  </h2>

                  {formStatus.submitted ? (
                    <div
                      className={`p-4 rounded-lg ${formStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                    >
                      {formStatus.message}
                    </div>
                  ) : (
                    <form onSubmit={handleSubmitForm} className="space-y-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Your Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Your Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Message *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={4}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                          required
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Send Message
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>

            {/* 相关供应商 */}
            {relatedSuppliers.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Related Suppliers</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedSuppliers.map(relatedSupplier => (
                    <div
                      key={relatedSupplier._id || relatedSupplier.id}
                      className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    >
                      <Link href={`/suppliers/${relatedSupplier._id || relatedSupplier.id}`}>
                        <div className="h-40 bg-gray-100 relative">
                          {relatedSupplier.images && relatedSupplier.images.length > 0 ? (
                            <Image
                              src={relatedSupplier.images[0]}
                              alt={relatedSupplier.companyName}
                              className="object-cover"
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full text-gray-400">
                              No image available
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-lg text-gray-900 mb-2">
                            {relatedSupplier.companyName}
                          </h3>
                          <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                            {relatedSupplier.description}
                          </p>
                          <div className="flex items-center text-sm text-gray-500">
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              ></path>
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                              ></path>
                            </svg>
                            {relatedSupplier.address?.country}
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
