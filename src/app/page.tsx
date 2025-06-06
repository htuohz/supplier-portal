"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import SearchFilters from "@/components/SearchFilters";
import SupplierCard from "@/components/SupplierCard";
import { ISupplier } from "@/models/Supplier";

export default function Home() {
  const searchParams = useSearchParams();
  const [suppliers, setSuppliers] = useState<ISupplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams(searchParams.toString());
        const response = await fetch(`/api/suppliers?${params.toString()}`);

        if (!response.ok) {
          throw new Error("Failed to fetch suppliers");
        }

        const data = await response.json();
        setSuppliers(data.suppliers);
        setPagination(data.pagination);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, [searchParams]);

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find Reliable Suppliers
          </h1>
          <p className="text-xl text-gray-600">
            Connect with verified manufacturers and suppliers from China
          </p>
        </div>

        <SearchFilters />

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-600 p-4 bg-red-50 rounded-lg">
            {error}
          </div>
        ) : suppliers.length === 0 ? (
          <div className="text-center text-gray-600 p-4">
            No suppliers found matching your criteria
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {suppliers.map((supplier) => (
                <SupplierCard key={supplier._id} supplier={supplier} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center space-x-2">
              {Array.from(
                { length: pagination.totalPages },
                (_, i) => i + 1
              ).map((page) => (
                <button
                  key={page}
                  onClick={() => {
                    const params = new URLSearchParams(searchParams.toString());
                    params.set("page", page.toString());
                    window.history.pushState(
                      null,
                      "",
                      `/?${params.toString()}`
                    );
                  }}
                  className={`px-4 py-2 rounded-lg ${
                    pagination.page === page
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
