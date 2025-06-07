import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Supplier from '@/models/Supplier';

interface MongooseError extends Error {
    name: string;
    message: string;
    code?: number;
}

interface SearchQuery {
    $text?: { $search: string };
    [key: string]: { $search: string } | undefined;
}

export async function GET(req: NextRequest) {
    try {
        await connectDB();

        const searchParams = req.nextUrl.searchParams;
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const search = searchParams.get('search') || '';

        const query: SearchQuery = {};
        if (search) {
            query.$text = { $search: search };
        }

        const skip = (page - 1) * limit;

        const [suppliers, total] = await Promise.all([
            Supplier.find(query)
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 }),
            Supplier.countDocuments(query)
        ]);

        return NextResponse.json({
            suppliers,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        const mongoError = error as MongooseError;
        return NextResponse.json(
            { error: 'Internal Server Error', details: mongoError.message },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json();

        const supplier = await Supplier.create(body);

        return NextResponse.json(supplier, { status: 201 });
    } catch (error) {
        const mongoError = error as MongooseError;
        if (mongoError.name === 'ValidationError') {
            return NextResponse.json(
                { error: 'Validation Error', details: mongoError.message },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: 'Internal Server Error', details: mongoError.message },
            { status: 500 }
        );
    }
}