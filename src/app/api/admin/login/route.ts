import { NextResponse } from 'next/server';

// 默认管理员凭据（在实际应用中应该使用环境变量）

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    return NextResponse.json({
      success: true,
      token: 'sample-auth-token', // 在实际应用中应该生成JWT
    });
  }

  return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
}
