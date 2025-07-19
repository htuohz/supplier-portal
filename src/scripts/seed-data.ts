// 这个脚本用于生成模拟的供应商数据
import { Schema, model, connect, connection } from 'mongoose';

// 直接使用MongoDB连接字符串，不依赖dotenv
const MONGODB_URI = 'mongodb://localhost:27017/supplier_portal';

// 供应商模型定义
const supplierSchema = new Schema(
  {
    companyName: String,
    mainProducts: [String],
    contactPerson: String,
    email: String,
    phone: String,
    address: {
      country: String,
      province: String,
      city: String,
      detail: String,
    },
    description: String,
    website: String,
    establishedYear: Number,
    employeeCount: String,
    certifications: [String],
    images: [String],
  },
  {
    timestamps: true,
  }
);

// 创建模型
let Supplier;
try {
  Supplier = model('Supplier');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
} catch (_) {
  Supplier = model('Supplier', supplierSchema);
}

// 模拟数据
const mockSuppliers = [
  {
    companyName: 'Shenzhen Electronics Co., Ltd.',
    mainProducts: ['Smartphones', 'Tablets', 'Smart Watches'],
    contactPerson: 'Zhang Wei',
    email: 'contact@shenzhentronics.com',
    phone: '+86 755 1234 5678',
    address: {
      country: 'China',
      province: 'Guangdong',
      city: 'Shenzhen',
      detail: 'Building A, Technology Park, Nanshan District',
    },
    description: 'Leading manufacturer of consumer electronics with over 15 years of experience.',
    website: 'https://example.com/shenzhentronics',
    establishedYear: 2005,
    employeeCount: '501-1000',
    certifications: ['ISO9001', 'CE', 'RoHS'],
    images: [
      'https://images.unsplash.com/photo-1563770660941-20978e870e26',
      'https://images.unsplash.com/photo-1555664424-778a1e5e1b48',
    ],
  },
  {
    companyName: 'Hangzhou Textile Group',
    mainProducts: ['Cotton Fabrics', 'Synthetic Fabrics', 'Garments'],
    contactPerson: 'Li Mei',
    email: 'info@hangzhoutextile.com',
    phone: '+86 571 8765 4321',
    address: {
      country: 'China',
      province: 'Zhejiang',
      city: 'Hangzhou',
      detail: '789 Industrial Avenue, Xiaoshan District',
    },
    description: 'Premium textile manufacturer with state-of-the-art facilities.',
    website: 'https://example.com/hangzhoutextile',
    establishedYear: 1998,
    employeeCount: '1000+',
    certifications: ['ISO9001', 'OEKO-TEX', 'BSCI'],
    images: [
      'https://images.unsplash.com/photo-1573167507387-6b4b98cb7c13',
      'https://images.unsplash.com/photo-1620208344361-0d473a142f68',
    ],
  },
  // 添加更多供应商数据...
  {
    companyName: 'Guangzhou Auto Parts Manufacturing',
    mainProducts: ['Brake Systems', 'Engine Components', 'Transmission Parts'],
    contactPerson: 'Chen Jie',
    email: 'sales@gzautoparts.com',
    phone: '+86 20 9876 5432',
    address: {
      country: 'China',
      province: 'Guangdong',
      city: 'Guangzhou',
      detail: '456 Automotive Road, Huangpu District',
    },
    description: 'Specialized in automotive components with advanced production lines.',
    website: 'https://example.com/gzautoparts',
    establishedYear: 2003,
    employeeCount: '201-500',
    certifications: ['ISO/TS 16949', 'ISO14001'],
    images: [
      'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3',
      'https://images.unsplash.com/photo-1537041373723-5e0d45c1c3fc',
    ],
  },
  {
    companyName: 'Yiwu Gift & Craft Co.',
    mainProducts: ['Holiday Decorations', 'Home Decor', 'Promotional Gifts'],
    contactPerson: 'Wang Xiu',
    email: 'contact@yiwugifts.com',
    phone: '+86 579 8123 4567',
    address: {
      country: 'China',
      province: 'Zhejiang',
      city: 'Yiwu',
      detail: 'Yiwu International Trade City, District 2',
    },
    description: 'One of the largest gift and craft suppliers in Yiwu.',
    website: 'https://example.com/yiwugifts',
    establishedYear: 2010,
    employeeCount: '51-200',
    certifications: ['ISO9001', 'BSCI'],
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38',
      'https://images.unsplash.com/photo-1512909006721-3d6018887383',
    ],
  },
  // 可以继续添加更多供应商数据...
];

// 插入数据函数
async function seedDatabase() {
  try {
    // 连接数据库
    await connect(MONGODB_URI);
    // 有意保留的脚本执行日志
    console.log('Connected to MongoDB');

    // 清空现有数据
    await Supplier.deleteMany({});
    // 有意保留的脚本执行日志
    console.log('Cleared existing suppliers');

    // 插入新数据
    const result = await Supplier.insertMany(mockSuppliers);
    // 有意保留的脚本执行日志
    console.log(`Successfully inserted ${result.length} suppliers`);

    // 关闭连接
    await connection.close();
    // 有意保留的脚本执行日志
    console.log('Database connection closed');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// 执行数据填充
seedDatabase();
