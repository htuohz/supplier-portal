# 供应商黄页网站 (Supplier Portal)

这是一个用于展示中国供应商信息的黄页网站，使用 Next.js 和 MongoDB 构建。

## 功能特点

- 供应商列表展示
- 详细的供应商信息页面
- 搜索和筛选功能
- 管理后台用于添加和管理供应商
- 爬虫功能用于自动获取供应商信息

## 技术栈

- **前端**: Next.js, React, Tailwind CSS
- **后端**: Next.js API Routes
- **数据库**: MongoDB (使用 Mongoose ODM)
- **认证**: NextAuth.js

## 快速开始

### 前提条件

- Node.js (v16+)
- MongoDB (本地安装或 MongoDB Atlas)

### 安装步骤

1. 克隆仓库或解压项目文件

2. 安装依赖

   ```bash
   npm install
   ```

3. 配置环境变量
   项目根目录已包含`.env.local`文件，默认配置为:

   ```
   MONGODB_URI=mongodb://localhost:27017/supplier_portal
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret_key_here
   ```

   如果你使用的是 MongoDB Atlas 或其他远程 MongoDB 服务，请更新`MONGODB_URI`。

4. 填充模拟数据

   ```bash
   node src/scripts/seed-data.js
   ```

5. 启动开发服务器

   ```bash
   npm run dev
   ```

6. 打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## 项目结构

```
supplier_portal/
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── api/              # API路由
│   │   ├── admin/            # 管理页面
│   │   ├── suppliers/        # 供应商详情页面
│   │   ├── page.tsx          # 主页
│   │   └── layout.tsx        # 根布局
│   ├── components/           # React组件
│   ├── lib/                  # 工具函数和库
│   ├── models/               # Mongoose模型
│   └── scripts/              # 脚本文件
├── public/                   # 静态资源
├── .env.local                # 环境变量
└── package.json              # 项目依赖
```

## 主要页面

- **首页**: 展示供应商列表，提供搜索和筛选功能
- **供应商详情页**: 展示单个供应商的详细信息
- **管理页面**: 用于添加新供应商

## 后续开发计划

- 用户认证系统
- 高级搜索功能
- 图片上传功能
- 数据可视化
- 国际化支持
- 响应式设计优化
- SEO 优化
