import { ISupplier } from "@/models/Supplier";
import Link from "next/link";

interface SupplierCardProps {
  supplier: ISupplier;
}

export default function SupplierCard({ supplier }: SupplierCardProps) {
  return (
    <Link href={`/suppliers/${supplier._id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {supplier.companyName}
          </h3>
          <div className="text-sm text-gray-600 mb-4">
            <p className="mb-1">
              <span className="font-medium">Main Products:</span>{" "}
              {supplier.mainProducts.join(", ")}
            </p>
            <p className="mb-1">
              <span className="font-medium">Location:</span>{" "}
              {`${supplier.address.city}, ${supplier.address.province}, ${supplier.address.country}`}
            </p>
            {supplier.establishedYear && (
              <p className="mb-1">
                <span className="font-medium">Established:</span>{" "}
                {supplier.establishedYear}
              </p>
            )}
          </div>
          <div className="text-sm text-gray-500 line-clamp-2 mb-4">
            {supplier.description}
          </div>
          <div className="flex justify-between items-center">
            <Link
              href={`/suppliers/${supplier._id}`}
              className="text-blue-600 hover:text-blue-800 font-medium text-sm"
            >
              View Details →
            </Link>
            {supplier.certifications && supplier.certifications.length > 0 && (
              <div className="flex gap-1">
                {supplier.certifications.map((cert) => (
                  <span
                    key={cert}
                    className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
