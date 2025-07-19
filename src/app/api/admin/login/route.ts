import { NextResponse } from 'next/server';

// 默认管理员凭据（在实际应用中应该使用环境变量）
const ADMIN_CREDENTIALS = {
    email: 'admin@example.com',
    password: 'admin123'
};

export async function POST(request: Request) {
    const { email, password } = await request.json();

    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
        return NextResponse.json({
            success: true,
            token: 'sample-auth-token' // 在实际应用中应该生成JWT
        });
    }

    return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
    );
}