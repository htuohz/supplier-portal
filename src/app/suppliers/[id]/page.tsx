"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { ISupplier } from "@/models/Supplier";

export default function SupplierDetail() {
  const { id } = useParams();
  const [supplier, setSupplier] = useState<ISupplier | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/suppliers/${id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch supplier details");
        }

        const data = await response.json();
        setSupplier(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchSupplier();
    }
  }, [id]);

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
            {error || "Supplier not found"}
          </div>
          <div className="mt-4 text-center">
            <Link href="/" className="text-blue-600 hover:text-blue-800">
              ← Back to suppliers
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            ← Back to suppliers
          </Link>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {supplier.companyName}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="col-span-2">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  Company Overview
                </h2>
                <p className="text-gray-600 mb-6">{supplier.description}</p>

                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  Main Products
                </h2>
                <div className="flex flex-wrap gap-2 mb-6">
                  {supplier.mainProducts.map((product) => (
                    <span
                      key={product}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {product}
                    </span>
                  ))}
                </div>

                {supplier.certifications &&
                  supplier.certifications.length > 0 && (
                    <>
                      <h2 className="text-xl font-semibold text-gray-800 mb-3">
                        Certifications
                      </h2>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {supplier.certifications.map((cert) => (
                          <span
                            key={cert}
                            className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                          >
                            {cert}
                          </span>
                        ))}
                      </div>
                    </>
                  )}
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Contact Information
                </h2>
                <div className="space-y-3">
                  <p className="flex items-start">
                    <span className="font-medium w-32">Contact Person:</span>
                    <span>{supplier.contactPerson}</span>
                  </p>
                  <p className="flex items-start">
                    <span className="font-medium w-32">Email:</span>
                    <a
                      href={`mailto:${supplier.email}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {supplier.email}
                    </a>
                  </p>
                  <p className="flex items-start">
                    <span className="font-medium w-32">Phone:</span>
                    <span>{supplier.phone}</span>
                  </p>
                  <p className="flex items-start">
                    <span className="font-medium w-32">Address:</span>
                    <span>
                      {supplier.address.detail}, {supplier.address.city},{" "}
                      {supplier.address.province}, {supplier.address.country}
                    </span>
                  </p>
                  {supplier.website && (
                    <p className="flex items-start">
                      <span className="font-medium w-32">Website:</span>
                      <a
                        href={supplier.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        {supplier.website}
                      </a>
                    </p>
                  )}
                  {supplier.establishedYear && (
                    <p className="flex items-start">
                      <span className="font-medium w-32">Established:</span>
                      <span>{supplier.establishedYear}</span>
                    </p>
                  )}
                  {supplier.employeeCount && (
                    <p className="flex items-start">
                      <span className="font-medium w-32">Employees:</span>
                      <span>{supplier.employeeCount}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>

            {supplier.images && supplier.images.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Company Images
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {supplier.images.map((image, index) => (
                    <div
                      key={index}
                      className="aspect-square bg-gray-100 rounded-lg overflow-hidden"
                    >
                      <img
                        src={image}
                        alt={`${supplier.companyName} - Image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
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
