import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Supplier from '@/models/Supplier';
import mongoose from 'mongoose';

interface MongooseError extends Error {
    name: string;
    message: string;
    code?: number;
}

// 获取单个供应商
export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();

        const { id } = params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { error: 'Invalid supplier ID' },
                { status: 400 }
            );
        }

        const supplier = await Supplier.findById(id);

        if (!supplier) {
            return NextResponse.json(
                { error: 'Supplier not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(supplier);
    } catch (error) {
        const mongoError = error as MongooseError;
        return NextResponse.json(
            { error: 'Internal Server Error', details: mongoError.message },
            { status: 500 }
        );
    }
}

// 更新供应商
export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();

        const { id } = params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { error: 'Invalid supplier ID' },
                { status: 400 }
            );
        }

        const body = await req.json();

        const supplier = await Supplier.findByIdAndUpdate(
            id,
            body,
            { new: true, runValidators: true }
        );

        if (!supplier) {
            return NextResponse.json(
                { error: 'Supplier not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(supplier);
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

// 删除供应商
export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();

        const { id } = params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { error: 'Invalid supplier ID' },
                { status: 400 }
            );
        }

        const supplier = await Supplier.findByIdAndDelete(id);

        if (!supplier) {
            return NextResponse.json(
                { error: 'Supplier not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: 'Supplier deleted successfully' });
    } catch (error) {
        const mongoError = error as MongooseError;
        return NextResponse.json(
            { error: 'Internal Server Error', details: mongoError.message },
            { status: 500 }
        );
    }
}