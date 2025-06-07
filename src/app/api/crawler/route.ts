import { NextRequest, NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';
import connectDB from '@/lib/mongodb';
import Supplier from '@/models/Supplier';

// 这是一个简化的爬虫示例，实际生产环境中需要更复杂的实现
export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json();
        const { url } = body;

        if (!url) {
            return NextResponse.json(
                { error: 'URL is required' },
                { status: 400 }
            );
        }

        // 简单的爬虫逻辑 - 这只是一个示例
        // 实际生产环境中，你需要更复杂的爬虫逻辑，包括：
        // - 处理不同网站的结构
        // - 处理分页
        // - 处理反爬虫机制
        // - 使用无头浏览器处理JavaScript渲染的内容
        // - 等等

        try {
            // 获取网页内容
            const response = await axios.get(url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                }
            });

            const html = response.data;

            // 这里应该有更复杂的解析逻辑
            // 这只是一个非常简化的示例
            const companyNameMatch = html.match(/<h1[^>]*>(.*?)<\/h1>/i);
            const descriptionMatch = html.match(/<meta\s+name="description"\s+content="([^"]+)"/i);

            if (!companyNameMatch) {
                return NextResponse.json(
                    { error: 'Could not extract company information from the provided URL' },
                    { status: 400 }
                );
            }

            // 创建一个示例供应商数据
            // 在实际应用中，你需要从网页中提取更多信息
            const supplierData = {
                companyName: companyNameMatch[1].trim(),
                mainProducts: ['Sample Product 1', 'Sample Product 2'],
                contactPerson: 'Contact Person',
                email: 'contact@example.com',
                phone: '+1234567890',
                address: {
                    country: 'China',
                    province: 'Sample Province',
                    city: 'Sample City',
                    detail: 'Sample Address',
                },
                description: descriptionMatch ? descriptionMatch[1].trim() : 'No description available',
            };

            // 保存到数据库
            const supplier = await Supplier.create(supplierData);

            return NextResponse.json({
                message: 'Supplier information crawled and saved successfully',
                supplier
            }, { status: 201 });
        } catch (error) {
            const axiosError = error as AxiosError;
            return NextResponse.json(
                { error: 'Failed to crawl the website', details: axiosError.message },
                { status: 500 }
            );
        }
    } catch (error) {
        const serverError = error as Error;
        return NextResponse.json(
            { error: 'Internal Server Error', details: serverError.message },
            { status: 500 }
        );
    }
}