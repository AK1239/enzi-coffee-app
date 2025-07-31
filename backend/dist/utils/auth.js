"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
exports.hashPassword = hashPassword;
exports.comparePassword = comparePassword;
exports.generateToken = generateToken;
exports.verifyToken = verifyToken;
exports.validateRegistration = validateRegistration;
exports.validateLogin = validateLogin;
exports.isEmailExists = isEmailExists;
exports.authenticateUser = authenticateUser;
exports.createUser = createUser;
exports.getUserById = getUserById;
exports.extractTokenFromHeader = extractTokenFromHeader;
const tslib_1 = require("tslib");
const bcryptjs_1 = tslib_1.__importDefault(require("bcryptjs"));
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const zod_1 = require("zod");
const prisma_1 = tslib_1.__importDefault(require("../lib/prisma"));
const JWT_SECRET = process.env['JWT_SECRET'] || 'fallback-secret-key';
const JWT_EXPIRES_IN = '24h';
const SALT_ROUNDS = 12;
exports.registerSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email address'),
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters'),
    name: zod_1.z
        .string()
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name too long'),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email address'),
    password: zod_1.z.string().min(1, 'Password is required'),
});
async function hashPassword(password) {
    return bcryptjs_1.default.hash(password, SALT_ROUNDS);
}
async function comparePassword(password, hash) {
    return bcryptjs_1.default.compare(password, hash);
}
function generateToken(user) {
    const payload = {
        userId: user.id,
        email: user.email,
        name: user.name,
    };
    return jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}
function verifyToken(token) {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        return decoded;
    }
    catch (error) {
        return null;
    }
}
function validateRegistration(data) {
    try {
        const validatedData = exports.registerSchema.parse(data);
        return { success: true, data: validatedData };
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            return { success: false, errors: ['Validation failed'] };
        }
        return { success: false, errors: ['Invalid input data'] };
    }
}
function validateLogin(data) {
    try {
        const validatedData = exports.loginSchema.parse(data);
        return { success: true, data: validatedData };
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            return { success: false, errors: ['Validation failed'] };
        }
        return { success: false, errors: ['Invalid input data'] };
    }
}
async function isEmailExists(email) {
    const user = await prisma_1.default.user.findUnique({
        where: { email },
    });
    return !!user;
}
async function authenticateUser(email, password) {
    try {
        const user = await prisma_1.default.user.findUnique({
            where: { email },
        });
        if (!user) {
            return null;
        }
        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            return null;
        }
        return user;
    }
    catch (error) {
        console.error('Authentication error:', error);
        return null;
    }
}
async function createUser(userData) {
    const hashedPassword = await hashPassword(userData.password);
    return prisma_1.default.user.create({
        data: {
            email: userData.email,
            password: hashedPassword,
            name: userData.name,
        },
    });
}
async function getUserById(userId) {
    try {
        const user = await prisma_1.default.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                name: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        return user;
    }
    catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
}
function extractTokenFromHeader(authHeader) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return null;
    }
    return authHeader.substring(7);
}
//# sourceMappingURL=auth.js.map