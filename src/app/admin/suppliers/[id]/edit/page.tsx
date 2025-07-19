'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import I18nProvider from '@/components/I18nProvider';
import LanguageSwitcher from '@/components/LanguageSwitcher';

// Mock supplier data (same as in detail page)
const mockSupplierDetails = {
  id: '1',
  companyName: 'Tech Components Ltd',
  mainProducts: ['Semiconductors', 'Circuit Boards', 'Sensors'],
  contactPerson: 'John Smith',
  email: 'john@techcomponents.com',
  phone: '+1 (555) 123-4567',
  employeeCount: '51-200',
  certifications: ['ISO 9001', 'ISO 14001', 'RoHS Compliant'],
  establishedYear: 2005,
  address: {
    country: 'United States',
    province: 'California',
    city: 'San Jose',
    detailedAddress: '123 Tech Park Avenue, Suite 500',
  },
  website: 'https://www.techcomponents.com',
  description: 'Tech Components Ltd is a leading supplier of electronic components and semiconductor solutions. With over 15 years of experience in the industry, we provide high-quality products to manufacturers worldwide. Our focus on innovation and quality control ensures that our customers receive the best components for their products.',
};

export default function EditSupplierPage() {
  return (
    <I18nProvider>
      <EditSupplierForm />
    </I18nProvider>
  );
}

function EditSupplierForm() {
  const { t } = useTranslation();
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [supplier, setSupplier] = useState<any>(null);

  // Form state
  const [formData, setFormData] = useState({
    companyName: '',
    mainProducts: '',
    contactPerson: '',
    email: '',
    phone: '',
    employeeCount: '',
    certifications: '',
    establishedYear: '',
    country: '',
    province: '',
    city: '',
    detailedAddress: '',
    website: '',
    description: '',
  });

  useEffect(() => {
    // In a real application, this would be an API call
    const fetchSupplier = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // For demo purposes, always return the mock data
        // In a real app, you would fetch based on params.id
        setSupplier(mockSupplierDetails);
        
        // Populate form data
        setFormData({
          companyName: mockSupplierDetails.companyName,
          mainProducts: mockSupplierDetails.mainProducts.join(', '),
          contactPerson: mockSupplierDetails.contactPerson,
          email: mockSupplierDetails.email,
          phone: mockSupplierDetails.phone,
          employeeCount: mockSupplierDetails.employeeCount,
          certifications: mockSupplierDetails.certifications.join(', '),
          establishedYear: mockSupplierDetails.establishedYear.toString(),
          country: mockSupplierDetails.address.country,
          province: mockSupplierDetails.address.province,
          city: mockSupplierDetails.address.city,
          detailedAddress: mockSupplierDetails.address.detailedAddress,
          website: mockSupplierDetails.website,
          description: mockSupplierDetails.description,
        });
        
        setIsLoading(false);
      } catch (err) {
        setErrorMessage(t('errorLoadingSupplier'));
        setIsLoading(false);
      }
    };

    fetchSupplier();
  }, [params.id, t]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    // Prepare data for submission
    const supplierData = {
      id: supplier.id,
      companyName: formData.companyName,
      mainProducts: formData.mainProducts.split(',').map(p => p.trim()),
      contactPerson: formData.contactPerson,
      email: formData.email,
      phone: formData.phone,
      employeeCount: formData.employeeCount,
      certifications: formData.certifications.split(',').map(c => c.trim()),
      establishedYear: parseInt(formData.establishedYear),
      address: {
        country: formData.country,
        province: formData.province,
        city: formData.city,
        detailedAddress: formData.detailedAddress,
      },
      website: formData.website,
      description: formData.description,
    };

    try {
      // This would be replaced with an actual API call in a real application
      console.log('Updating supplier data:', supplierData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate success
      setSubmitStatus('success');
      
      // Redirect after a short delay
      setTimeout(() => {
        router.push(`/admin/suppliers/${supplier.id}`);
      }, 1500);
    } catch (error) {
      console.error('Error updating supplier:', error);
      setSubmitStatus('error');
      setErrorMessage(t('anErrorOccurred'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">{t('editSupplier')}</h1>
          <LanguageSwitcher />
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!supplier) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">{t('editSupplier')}</h1>
          <LanguageSwitcher />
        </div>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <p>{errorMessage || t('supplierNotFound')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{t('editSupplier')}</h1>
        <LanguageSwitcher />
      </div>

      {submitStatus === 'success' ? (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          <p>{t('supplierUpdatedSuccessfully')}</p>
        </div>
      ) : submitStatus === 'error' ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <p>{t('failedToUpdateSupplier')}: {errorMessage}</p>
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Company Information */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="companyName">
              {t('companyName')} *
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="companyName"
              name="companyName"
              type="text"
              value={formData.companyName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mainProducts">
              {t('mainProducts')} * ({t('commaSeparated')})
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="mainProducts"
              name="mainProducts"
              type="text"
              value={formData.mainProducts}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contactPerson">
              {t('contactPerson')} *
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="contactPerson"
              name="contactPerson"
              type="text"
              value={formData.contactPerson}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              {t('email')} *
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
              {t('phone')} *
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="employeeCount">
              {t('employeeCount')}
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="employeeCount"
              name="employeeCount"
              value={formData.employeeCount}
              onChange={handleChange}
            >
              <option value="">{t('selectEmployeeCount')}</option>
              <option value="1-10">1-10</option>
              <option value="11-50">11-50</option>
              <option value="51-200">51-200</option>
              <option value="201-500">201-500</option>
              <option value="501-1000">501-1000</option>
              <option value="1000+">1000+</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="certifications">
              {t('certifications')} ({t('commaSeparated')})
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="certifications"
              name="certifications"
              type="text"
              value={formData.certifications}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="establishedYear">
              {t('establishedYear')}
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="establishedYear"
              name="establishedYear"
              type="number"
              min="1900"
              max={new Date().getFullYear()}
              value={formData.establishedYear}
              onChange={handleChange}
            />
          </div>

          {/* Address Information */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="country">
              {t('country')} *
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="country"
              name="country"
              type="text"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="province">
              {t('province')}
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="province"
              name="province"
              type="text"
              value={formData.province}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
              {t('city')} *
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="city"
              name="city"
              type="text"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="detailedAddress">
              {t('detailedAddress')} *
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="detailedAddress"
              name="detailedAddress"
              type="text"
              value={formData.detailedAddress}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="website">
              {t('website')}
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="website"
              name="website"
              type="url"
              value={formData.website}
              onChange={handleChange}
              placeholder="https://"
            />
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            {t('description')}
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? t('updating') : t('updateSupplier')}
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => router.push(`/admin/suppliers/${supplier.id}`)}
          >
            {t('cancel')}
          </button>
        </div>