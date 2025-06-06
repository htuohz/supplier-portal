"use client";

import { useCallback, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const queryString = createQueryString("search", searchTerm);
    router.push(`/?${queryString}`);
  };

  return (
    <div className="w-full bg-white shadow-sm rounded-lg p-4 mb-6">
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search suppliers, products, or locations..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Search
          </button>
        </div>

        <div className="flex flex-wrap gap-4">
          <select
            onChange={(e) => {
              const queryString = createQueryString("country", e.target.value);
              router.push(`/?${queryString}`);
            }}
            value={searchParams.get("country") || ""}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Countries</option>
            <option value="China">China</option>
            <option value="India">India</option>
            <option value="Vietnam">Vietnam</option>
            <option value="Thailand">Thailand</option>
          </select>

          <select
            onChange={(e) => {
              const queryString = createQueryString(
                "employeeCount",
                e.target.value
              );
              router.push(`/?${queryString}`);
            }}
            value={searchParams.get("employeeCount") || ""}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Company Sizes</option>
            <option value="1-50">1-50 Employees</option>
            <option value="51-200">51-200 Employees</option>
            <option value="201-500">201-500 Employees</option>
            <option value="501-1000">501-1000 Employees</option>
            <option value="1000+">1000+ Employees</option>
          </select>

          <select
            onChange={(e) => {
              const queryString = createQueryString("sort", e.target.value);
              router.push(`/?${queryString}`);
            }}
            value={searchParams.get("sort") || ""}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Sort By</option>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="name_asc">Company Name (A-Z)</option>
            <option value="name_desc">Company Name (Z-A)</option>
          </select>
        </div>
      </form>
    </div>
  );
}
