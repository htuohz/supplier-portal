import { NextResponse } from 'next/server';

// 这个API路由处理联系表单提交
export async function POST(request: Request) {
    try {
        // 解析请求体
        const body = await request.json();

        // 验证必填字段
        if (!body.name || !body.email || !body.message || !body.supplierId) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // 在实际应用中，这里可以:
        // 1. 将消息保存到数据库
        // 2. 发送电子邮件通知给供应商
        // 3. 记录联系历史

        // 模拟处理延迟
        await new Promise(resolve => setTimeout(resolve, 500));

        // 返回成功响应
        return NextResponse.json({
            success: true,
            message: 'Contact message sent successfully'
        });
    } catch (error) {
        console.error('Error processing contact form:', error);
        return NextResponse.json(
            { error: 'Failed to process contact form' },
            { status: 500 }
        );
    }
}