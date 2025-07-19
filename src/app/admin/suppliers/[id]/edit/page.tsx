'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ISupplier } from '@/models/Supplier';

export default function EditSupplierPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [supplier, setSupplier] = useState<ISupplier | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const response = await fetch(`/api/admin/suppliers/${params.id}`);
        const data = await response.json();
        setSupplier(data);
      } catch (error) {
        setError('Failed to fetch supplier details');
        console.error('Error fetching supplier:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSupplier();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supplier) return;

    try {
      const response = await fetch(`/api/admin/suppliers/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(supplier),
      });

      if (response.ok) {
        router.push('/admin/suppliers');
      } else {
        setError('Failed to update supplier');
      }
    } catch (error) {
      console.error('Error updating supplier:', error);
      setError('An error occurred while updating supplier');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSupplier((prev: ISupplier | null) => (prev ? { ...prev, [name]: value } : null));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!supplier) return <div>Supplier not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Edit Supplier</h1>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            name="companyName"
            type="text"
            value={supplier.companyName || ''}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact">
            Contact
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="contact"
            name="contactPerson"
            type="text"
            value={supplier.contactPerson || ''}
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Save Changes
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => router.push('/admin/suppliers')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
