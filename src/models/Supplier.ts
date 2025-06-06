import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

export interface ISupplier {
    companyName: string;
    mainProducts: string[];
    contactPerson: string;
    email: string;
    password: string;
    phone: string;
    address: {
        country: string;
        province: string;
        city: string;
        detail: string;
    };
    description: string;
    website?: string;
    establishedYear?: number;
    employeeCount?: string;
    certifications?: string[];
    images?: string[];
    createdAt: Date;
    updatedAt: Date;
}

export interface ISupplierMethods {
    comparePassword(candidatePassword: string): Promise<boolean>;
}

type SupplierModel = mongoose.Model<ISupplier, {}, ISupplierMethods>;

const supplierSchema = new mongoose.Schema<ISupplier, SupplierModel, ISupplierMethods>(
    {
        companyName: {
            type: String,
            required: [true, 'Company name is required'],
            trim: true,
        },
        mainProducts: {
            type: [String],
            required: [true, 'At least one main product is required'],
        },
        contactPerson: {
            type: String,
            required: [true, 'Contact person name is required'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            trim: true,
            lowercase: true,
            match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [6, 'Password must be at least 6 characters long'],
        },
        phone: {
            type: String,
            required: [true, 'Phone number is required'],
            trim: true,
        },
        address: {
            country: {
                type: String,
                required: [true, 'Country is required'],
                trim: true,
            },
            province: {
                type: String,
                required: [true, 'Province is required'],
                trim: true,
            },
            city: {
                type: String,
                required: [true, 'City is required'],
                trim: true,
            },
            detail: {
                type: String,
                required: [true, 'Detailed address is required'],
                trim: true,
            },
        },
        description: {
            type: String,
            required: [true, 'Company description is required'],
            trim: true,
        },
        website: {
            type: String,
            trim: true,
        },
        establishedYear: {
            type: Number,
            min: 1800,
            max: new Date().getFullYear(),
        },
        employeeCount: {
            type: String,
            enum: ['1-50', '51-200', '201-500', '501-1000', '1000+'],
        },
        certifications: {
            type: [String],
        },
        images: {
            type: [String],
        },
    },
    {
        timestamps: true,
    }
);

// 添加文本索引以支持搜索功能
supplierSchema.index({
    companyName: 'text',
    mainProducts: 'text',
    description: 'text',
    'address.country': 'text',
    'address.province': 'text',
    'address.city': 'text',
});

// 密码加密中间件
supplierSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error: any) {
        next(error);
    }
});

// 密码比较方法
supplierSchema.methods.comparePassword = async function (candidatePassword: string) {
    return bcrypt.compare(candidatePassword, this.password);
};

// 防止重复定义模型
const Supplier = mongoose.models.Supplier || mongoose.model<ISupplier, SupplierModel>('Supplier', supplierSchema);

export default Supplier;