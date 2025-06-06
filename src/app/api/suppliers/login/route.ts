import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Supplier from '@/models/Supplier';

export async function PUT(req: NextRequest) {
    try {
        await connectDB();

        const { email, password } = await req.json();

        // 验证请求数据
        if (!email || !password) {
            return NextResponse.json(
                { message: 'Email and password are required' },
                { status: 400 }
            );
        }

        // 查找供应商
        const supplier = await Supplier.findOne({ email });

        if (!supplier) {
            return NextResponse.json(
                { message: 'Invalid email or password' },
                { status: 401 }
            );
        }

        // 验证密码
        const isValidPassword = await supplier.comparePassword(password);

        if (!isValidPassword) {
            return NextResponse.json(
                { message: 'Invalid email or password' },
                { status: 401 }
            );
        }

        // 登录成功，返回供应商信息（不包含密码）
        const supplierData = supplier.toObject();
        delete supplierData.password;

        return NextResponse.json({
            message: 'Login successful',
            id: supplier._id,
            ...supplierData
        });

    } catch (error: any) {
        console.error('Login error:', error);
        return NextResponse.json(
            { message: 'Internal Server Error', details: error.message },
            { status: 500 }
        );
    }
}