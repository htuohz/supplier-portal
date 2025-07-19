'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
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
    supplierId: '3',
    price: 149.99,
    costPrice: 110.0,
    stock: 45,
    sku: 'LCD-24-TC',
    description:
      'High-quality 24-inch LCD display with full HD resolution and wide viewing angles. Perfect for office use and casual gaming.',
    specifications: {
      dimensions: '55.8 x 33.2 x 5.4 cm',
      weight: '3.2 kg',
      resolution: '1920 x 1080',
      refreshRate: '60 Hz',
      panelType: 'IPS',
      ports: 'HDMI, DisplayPort, VGA',
      color: 'Black',
    },
    warranty: '2 years',
    reorderLevel: 10,
    images: ['/images/products/lcd-display.jpg'],
    dateAdded: '2023-05-15',
    lastUpdated: '2023-09-22',
  },
  {
    id: '2',
    name: 'Wireless Keyboard',
    category: 'Computer Accessories',
    supplier: 'Global Electronics',
    supplierId: '1',
    price: 59.99,
    costPrice: 35.5,
    stock: 120,
    sku: 'KB-WL-GE',
    description:
      'Ergonomic wireless keyboard with long battery life and responsive keys. Compatible with Windows, macOS, and Linux.',
    specifications: {
      dimensions: '44.0 x 13.5 x 2.5 cm',
      weight: '0.8 kg',
      connectivity: 'Bluetooth 5.0',
      batteryLife: 'Up to 24 months',
      layout: 'QWERTY (US)',
      color: 'Silver',
    },
    warranty: '1 year',
    reorderLevel: 25,
    images: ['/images/products/wireless-keyboard.jpg'],
    dateAdded: '2023-06-10',
    lastUpdated: '2023-10-05',
  },
  {
    id: '3',
    name: 'USB-C Cable 2m',
    category: 'Cables & Adapters',
    supplier: 'Cable Solutions Inc',
    supplierId: '2',
    price: 12.99,
    costPrice: 5.25,
    stock: 350,
    sku: 'USB-C-2M-CS',
    description:
      'Premium USB-C cable with braided nylon exterior for durability. Supports fast charging and data transfer up to 10Gbps.',
    specifications: {
      length: '2 meters',
      connectors: 'USB-C to USB-C',
      dataTransfer: 'Up to 10 Gbps',
      charging: 'Up to 100W',
      color: 'Black',
    },
    warranty: '1 year',
    reorderLevel: 50,
    images: ['/images/products/usb-c-cable.jpg'],
    dateAdded: '2023-04-20',
    lastUpdated: '2023-08-15',
  },
];

export default function ProductDetailPage() {
  return (
    <I18nProvider>
      <ProductDetail />
    </I18nProvider>
  );
}

function ProductDetail() {
  const { t } = useTranslation();
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // In a real application, this would be an API call
    const fetchProduct = () => {
      setLoading(true);
      try {
        const foundProduct = mockProducts.find(p => p.id === params.id);
        if (foundProduct) {
          setProduct(foundProduct);
          setError(null);
        } else {
          setError(t('productNotFound'));
        }
      } catch (err) {
        setError(t('errorLoadingProduct'));
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id, t]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">{t('productDetails')}</h1>
          <LanguageSwitcher />
        </div>
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-2">{t('loading')}</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">{t('productDetails')}</h1>
          <LanguageSwitcher />
        </div>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <p>{error}</p>
        </div>
        <div className="mt-4">
          <Link href="/admin/products" className="text-blue-500 hover:text-blue-700">
            &larr; {t('backToProducts')}
          </Link>
        </div>
      </div>
    );
  }

  const profitMargin = (((product.price - product.costPrice) / product.price) * 100).toFixed(2);
  const stockStatus =
    product.stock <= 0
      ? 'outOfStock'
      : product.stock <= product.reorderLevel
        ? 'lowStock'
        : 'inStock';
  const stockStatusClasses = {
    inStock: 'bg-green-100 text-green-800',
    lowStock: 'bg-yellow-100 text-yellow-800',
    outOfStock: 'bg-red-100 text-red-800',
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{t('productDetails')}</h1>
        <div className="flex items-center space-x-4">
          <LanguageSwitcher />
          <Link
            href={`/admin/products/${product.id}/edit`}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {t('editProduct')}
          </Link>
        </div>
      </div>

      <div className="mb-6">
        <Link href="/admin/products" className="text-blue-500 hover:text-blue-700">
          &larr; {t('backToProducts')}
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Product Image */}
        <div className="md:col-span-1">
          <div className="bg-white shadow-md rounded-lg p-4">
            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 mb-4">
              <div className="h-64 bg-gray-300 flex items-center justify-center text-gray-500">
                {product.images && product.images.length > 0 ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="object-cover w-full h-full"
                    onError={e => {
                      (e.target as HTMLImageElement).src =
                        'https://via.placeholder.com/300x300?text=No+Image';
                    }}
                  />
                ) : (
                  <span>No Image</span>
                )}
              </div>
            </div>
            <div className="mt-4">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${stockStatusClasses[stockStatus as keyof typeof stockStatusClasses]}`}
              >
                {t(stockStatus)}
              </span>
              <p className="text-sm text-gray-500 mt-2">SKU: {product.sku}</p>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="md:col-span-2">
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">{product.name}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">{t('productInformation')}</h3>
                <div className="space-y-2">
                  <p>
                    <span className="font-medium">{t('category')}:</span> {product.category}
                  </p>
                  <p>
                    <span className="font-medium">{t('supplier')}:</span>{' '}
                    <Link
                      href={`/admin/suppliers/${product.supplierId}`}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      {product.supplier}
                    </Link>
                  </p>
                  <p>
                    <span className="font-medium">{t('dateAdded')}:</span> {product.dateAdded}
                  </p>
                  <p>
                    <span className="font-medium">{t('lastUpdated')}:</span> {product.lastUpdated}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">{t('inventoryInformation')}</h3>
                <div className="space-y-2">
                  <p>
                    <span className="font-medium">{t('stock')}:</span> {product.stock} {t('units')}
                  </p>
                  <p>
                    <span className="font-medium">{t('reorderLevel')}:</span> {product.reorderLevel}{' '}
                    {t('units')}
                  </p>
                </div>

                <h3 className="text-lg font-semibold mt-4 mb-2">{t('pricingInformation')}</h3>
                <div className="space-y-2">
                  <p>
                    <span className="font-medium">{t('retailPrice')}:</span> $
                    {product.price.toFixed(2)}
                  </p>
                  <p>
                    <span className="font-medium">{t('costPrice')}:</span> $
                    {product.costPrice.toFixed(2)}
                  </p>
                  <p>
                    <span className="font-medium">{t('profitMargin')}:</span> {profitMargin}%
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">{t('productDescription')}</h3>
              <p className="text-gray-700">{product.description}</p>
            </div>

            {product.specifications && (
              <div>
                <h3 className="text-lg font-semibold mb-2">{t('specifications')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="border-b border-gray-200 pb-2">
                      <span className="font-medium capitalize">{key}:</span> {value as string}
                    </div>
                  ))}
                  {product.warranty && (
                    <div className="border-b border-gray-200 pb-2">
                      <span className="font-medium">{t('warranty')}:</span> {product.warranty}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
