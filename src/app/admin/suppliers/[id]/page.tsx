'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import I18nProvider from '@/components/I18nProvider';
import LanguageSwitcher from '@/components/LanguageSwitcher';

// Define types for supplier data
interface CustomerReference {
  companyName: string;
  contactPerson: string;
  email: string;
  relationship: string;
}

interface SupplierData {
  id: string;
  companyName: string;
  mainProducts: string[];
  contactPerson: string;
  email: string;
  phone: string;
  employeeCount: string;
  certifications: string[];
  establishedYear: number;
  address: {
    country: string;
    province?: string;
    city: string;
    detailedAddress: string;
  };
  website: string;
  description: string;
  financialInfo: {
    annualRevenue: string;
    paymentTerms: string;
    currency: string;
  };
  supplyCapacity: {
    monthlyCapacity: string;
    minimumOrderQuantity: string;
    leadTime: string;
  };
  qualityControl: {
    testingEquipment: string;
    inspectionProcess: string;
    defectRate: string;
  };
  customerReferences: CustomerReference[];
}

// Mock supplier data
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
  description:
    'Tech Components Ltd is a leading supplier of electronic components and semiconductor solutions. With over 15 years of experience in the industry, we provide high-quality products to manufacturers worldwide. Our focus on innovation and quality control ensures that our customers receive the best components for their products.',
  financialInfo: {
    annualRevenue: '$50M - $100M',
    paymentTerms: 'Net 30',
    currency: 'USD',
  },
  supplyCapacity: {
    monthlyCapacity: '500,000 units',
    minimumOrderQuantity: '1,000 units',
    leadTime: '2-3 weeks',
  },
  qualityControl: {
    testingEquipment: 'Advanced automated testing systems',
    inspectionProcess: 'Multi-stage quality inspection',
    defectRate: '<0.5%',
  },
  customerReferences: [
    {
      companyName: 'ElectroTech Industries',
      contactPerson: 'Sarah Johnson',
      email: 'sarah@electrotech.com',
      relationship: 'Ongoing supplier since 2010',
    },
    {
      companyName: 'Smart Devices Inc',
      contactPerson: 'Michael Chen',
      email: 'mchen@smartdevices.com',
      relationship: 'Regular customer since 2015',
    },
  ],
};

export default function SupplierDetailPage() {
  return (
    <I18nProvider>
      <SupplierDetail />
    </I18nProvider>
  );
}

function SupplierDetail() {
  const { t } = useTranslation();
  const params = useParams();
  const [supplier, setSupplier] = useState<SupplierData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // In a real application, this would be an API call
    // For now, we'll simulate loading the data
    const fetchSupplier = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // For demo purposes, always return the mock data
        // In a real app, you would fetch based on params.id
        setSupplier(mockSupplierDetails);
        setLoading(false);
      } catch (error) {
        setError(t('errorLoadingSupplier'));
        setLoading(false);
        console.error('Error fetching supplier:', error);
      }
    };

    fetchSupplier();
  }, [params.id, t]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">{t('supplierDetails')}</h1>
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

  if (error || !supplier) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">{t('supplierDetails')}</h1>
          <LanguageSwitcher />
        </div>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <p>{error || t('supplierNotFound')}</p>
        </div>
        <Link
          href="/admin/suppliers"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {t('backToSuppliers')}
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{t('supplierDetails')}</h1>
        <div className="flex items-center space-x-4">
          <LanguageSwitcher />
          <Link
            href={`/admin/suppliers/${supplier.id}/edit`}
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
          >
            {t('editSupplier')}
          </Link>
          <Link
            href="/admin/suppliers"
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            {t('backToSuppliers')}
          </Link>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{supplier.companyName}</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {supplier.mainProducts.map((product: string, index: number) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full"
              >
                {product}
              </span>
            ))}
          </div>
          <p className="text-gray-600">{supplier.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('contactInformation')}</h3>
            <div className="space-y-3">
              <div>
                <span className="text-gray-600 font-medium">{t('contactPerson')}:</span>
                <span className="ml-2">{supplier.contactPerson}</span>
              </div>
              <div>
                <span className="text-gray-600 font-medium">{t('email')}:</span>
                <span className="ml-2">{supplier.email}</span>
              </div>
              <div>
                <span className="text-gray-600 font-medium">{t('phone')}:</span>
                <span className="ml-2">{supplier.phone}</span>
              </div>
              <div>
                <span className="text-gray-600 font-medium">{t('website')}:</span>
                <a
                  href={supplier.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 text-blue-600 hover:underline"
                >
                  {supplier.website}
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('companyInformation')}</h3>
            <div className="space-y-3">
              <div>
                <span className="text-gray-600 font-medium">{t('employeeCount')}:</span>
                <span className="ml-2">{supplier.employeeCount}</span>
              </div>
              <div>
                <span className="text-gray-600 font-medium">{t('establishedYear')}:</span>
                <span className="ml-2">{supplier.establishedYear}</span>
              </div>
              <div>
                <span className="text-gray-600 font-medium">{t('certifications')}:</span>
                <span className="ml-2">{supplier.certifications.join(', ')}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('address')}</h3>
            <div className="space-y-3">
              <div>
                <span className="text-gray-600 font-medium">{t('country')}:</span>
                <span className="ml-2">{supplier.address.country}</span>
              </div>
              {supplier.address.province && (
                <div>
                  <span className="text-gray-600 font-medium">{t('province')}:</span>
                  <span className="ml-2">{supplier.address.province}</span>
                </div>
              )}
              <div>
                <span className="text-gray-600 font-medium">{t('city')}:</span>
                <span className="ml-2">{supplier.address.city}</span>
              </div>
              <div>
                <span className="text-gray-600 font-medium">{t('detailedAddress')}:</span>
                <span className="ml-2">{supplier.address.detailedAddress}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {t('financialInformation')}
            </h3>
            <div className="space-y-3">
              <div>
                <span className="text-gray-600 font-medium">{t('annualRevenue')}:</span>
                <span className="ml-2">{supplier.financialInfo.annualRevenue}</span>
              </div>
              <div>
                <span className="text-gray-600 font-medium">{t('paymentTerms')}:</span>
                <span className="ml-2">{supplier.financialInfo.paymentTerms}</span>
              </div>
              <div>
                <span className="text-gray-600 font-medium">{t('currency')}:</span>
                <span className="ml-2">{supplier.financialInfo.currency}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('supplyCapacity')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <span className="text-gray-600 font-medium">{t('monthlyCapacity')}:</span>
              <span className="ml-2">{supplier.supplyCapacity.monthlyCapacity}</span>
            </div>
            <div>
              <span className="text-gray-600 font-medium">{t('minimumOrderQuantity')}:</span>
              <span className="ml-2">{supplier.supplyCapacity.minimumOrderQuantity}</span>
            </div>
            <div>
              <span className="text-gray-600 font-medium">{t('leadTime')}:</span>
              <span className="ml-2">{supplier.supplyCapacity.leadTime}</span>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('qualityControl')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <span className="text-gray-600 font-medium">{t('testingEquipment')}:</span>
              <span className="ml-2">{supplier.qualityControl.testingEquipment}</span>
            </div>
            <div>
              <span className="text-gray-600 font-medium">{t('inspectionProcess')}:</span>
              <span className="ml-2">{supplier.qualityControl.inspectionProcess}</span>
            </div>
            <div>
              <span className="text-gray-600 font-medium">{t('defectRate')}:</span>
              <span className="ml-2">{supplier.qualityControl.defectRate}</span>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('customerReferences')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {supplier.customerReferences.map((reference: CustomerReference, index: number) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <div className="font-medium text-gray-800">{reference.companyName}</div>
                <div className="text-sm text-gray-600 mt-1">{reference.contactPerson}</div>
                <div className="text-sm text-gray-600">{reference.email}</div>
                <div className="text-sm text-gray-600 mt-2">{reference.relationship}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
