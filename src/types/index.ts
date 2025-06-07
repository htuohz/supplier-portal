export interface Supplier {
    id: string;
    name: string;
    description: string;
    location: string;
    categories: string[];
    rating: number;
    verificationStatus: 'verified' | 'pending' | 'unverified';
    joinDate: string;
    imageUrl?: string;
}

export interface Category {
    id: string;
    name: string;
    description: string;
    slug: string;
    imageUrl?: string;
    supplierCount: number;
}

export interface User {
    id: string;
    name: string;
    email: string;
    company?: string;
    role: 'buyer' | 'supplier' | 'admin';
    createdAt: string;
    avatarUrl?: string;
}

export interface SearchFilters {
    category?: string;
    location?: string;
    verificationStatus?: string;
    minRating?: number;
    sortBy?: 'rating' | 'joinDate' | 'name';
    sortOrder?: 'asc' | 'desc';
}

export interface PaginationParams {
    page: number;
    limit: number;
    total: number;
}