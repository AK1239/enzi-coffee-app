export interface User {
    id: string;
    email: string;
    password: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface Order {
    id: string;
    userId: string;
    totalAmount: number;
    itemCount: number;
    items: any;
    createdAt: Date;
    updatedAt: Date;
}
export interface UserResponse {
    id: string;
    email: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface OrderResponse {
    id: string;
    userId: string;
    totalAmount: number;
    itemCount: number;
    items: OrderItem[];
    createdAt: Date;
    updatedAt: Date;
    user?: UserResponse;
}
export interface OrderItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    total: number;
}
export interface CreateUserInput {
    email: string;
    password: string;
    name: string;
}
export interface LoginInput {
    email: string;
    password: string;
}
export interface CreateOrderInput {
    items: OrderItem[];
    totalAmount: number;
    itemCount: number;
}
//# sourceMappingURL=database.d.ts.map