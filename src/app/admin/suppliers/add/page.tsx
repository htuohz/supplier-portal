'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import I18nProvider from '@/components/I18nProvider';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function AddSupplierPage() {
  return (
    <I18nProvider>
      <AddSupplierForm />
    </I18nProvider>
  );
}

function AddSupplierForm() {
  const { t } = useTranslation();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    companyName: '',
    mainProducts: '',
    contactPerson: '',
    email: '',
    password: '', // 添加密码字段
    phone: '',
    employeeCount: '',
    certifications: '',
    establishedYear: '',
    address: {
      country: '',
      province: '',
      city: '',
      detail: '',
    },
    website: '',
    description: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // 处理嵌套的地址字段
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    // Prepare data for submission
    const supplierData = {
      companyName: formData.companyName,
      mainProducts: formData.mainProducts.split(',').map(p => p.trim()),
      contactPerson: formData.contactPerson,
      email: formData.email,
      password: formData.password, // 添加密码字段
      phone: formData.phone,
      employeeCount: formData.employeeCount,
      certifications: formData.certifications
        ? formData.certifications.split(',').map(c => c.trim())
        : [],
      establishedYear: formData.establishedYear ? parseInt(formData.establishedYear) : null,
      address: formData.address, // 使用嵌套的地址结构
      website: formData.website,
      description: formData.description,
    };

    try {
      // Make actual API call to create supplier
      console.log('Creating new supplier:', supplierData);

      const response = await fetch('/api/suppliers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(supplierData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create supplier');
      }

      const result = await response.json();
      console.log('Supplier created successfully:', result);

      setSubmitStatus('success');

      // Redirect after a short delay
      setTimeout(() => {
        router.push('/admin/suppliers');
      }, 1500);
    } catch (error) {
      console.error('Error creating supplier:', error);
      setSubmitStatus('error');
      setErrorMessage(t('anErrorOccurred'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{t('addSupplier')}</h1>
        <LanguageSwitcher />
      </div>

      {submitStatus === 'success' ? (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          <p>{t('supplierCreatedSuccessfully')}</p>
        </div>
      ) : submitStatus === 'error' ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <p>
            {t('failedToCreateSupplier')}: {errorMessage}
          </p>
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              {t('password')}
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              minLength={6}
            />
            <p className="text-xs text-gray-500 mt-1">{t('passwordMinLength')}</p>
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
              <option value="1-50">1-50</option>
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
              name="address.country"
              type="text"
              value={formData.address.country}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="province">
              {t('province')} *
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="province"
              name="address.province"
              type="text"
              value={formData.address.province}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
              {t('city')} *
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="city"
              name="address.city"
              type="text"
              value={formData.address.city}
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
              name="address.detail"
              type="text"
              value={formData.address.detail}
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

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              {t('description')} *
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? t('creating') : t('createSupplier')}
            </button>
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => router.push('/admin/suppliers')}
            >
              {t('cancel')}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
