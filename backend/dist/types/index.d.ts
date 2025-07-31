export interface User {
    id: string;
    email: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface Order {
    id: string;
    userId: string;
    totalAmount: number;
    itemCount: number;
    items: OrderItem[];
    createdAt: Date;
    updatedAt: Date;
}
export interface OrderItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}
export interface MenuItem {
    id: string;
    name: string;
    price: number;
    description?: string;
}
//# sourceMappingURL=index.d.ts.map