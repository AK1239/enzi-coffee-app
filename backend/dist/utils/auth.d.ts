import { z } from 'zod';
import type { User } from '../types/database';
export declare const registerSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    name: z.ZodString;
}, z.core.$strip>;
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export interface JWTPayload {
    userId: string;
    email: string;
    name: string;
}
export declare function hashPassword(password: string): Promise<string>;
export declare function comparePassword(password: string, hash: string): Promise<boolean>;
export declare function generateToken(user: User): string;
export declare function verifyToken(token: string): JWTPayload | null;
export declare function validateRegistration(data: unknown): {
    success: true;
    data: RegisterInput;
} | {
    success: false;
    errors: string[];
};
export declare function validateLogin(data: unknown): {
    success: true;
    data: LoginInput;
} | {
    success: false;
    errors: string[];
};
export declare function isEmailExists(email: string): Promise<boolean>;
export declare function authenticateUser(email: string, password: string): Promise<User | null>;
export declare function createUser(userData: RegisterInput): Promise<User>;
export declare function getUserById(userId: string): Promise<Omit<User, 'password'> | null>;
export declare function extractTokenFromHeader(authHeader: string | undefined): string | null;
//# sourceMappingURL=auth.d.ts.map