"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const zod_1 = require("zod");
const auth_1 = require("../middleware/auth");
const prisma_1 = tslib_1.__importDefault(require("../lib/prisma"));
const menu_1 = require("../data/menu");
const router = (0, express_1.Router)();
const orderItemSchema = zod_1.z.object({
    id: zod_1.z.number().positive('Item ID must be positive'),
    quantity: zod_1.z
        .number()
        .positive('Quantity must be positive')
        .max(10, 'Quantity cannot exceed 10'),
    name: zod_1.z.string().min(1, 'Item name is required'),
    price: zod_1.z.number().positive('Price must be positive'),
});
const createOrderSchema = zod_1.z.object({
    items: zod_1.z
        .array(orderItemSchema)
        .min(1, 'Order must contain at least one item'),
    totalAmount: zod_1.z.number().positive('Total amount must be positive'),
    itemCount: zod_1.z.number().positive('Item count must be positive'),
});
router.post('/', auth_1.authenticateToken, async (req, res) => {
    try {
        const validation = createOrderSchema.safeParse(req.body);
        if (!validation.success) {
            res.status(400).json({
                success: false,
                message: 'Invalid order data',
                error: 'INVALID_ORDER_DATA',
            });
            return;
        }
        const { items, totalAmount, itemCount } = validation.data;
        const userId = req.user.id;
        let calculatedTotal = 0;
        let calculatedItemCount = 0;
        for (const item of items) {
            const menuItem = (0, menu_1.getMenuItemById)(item.id);
            if (!menuItem) {
                res.status(400).json({
                    success: false,
                    message: `Menu item with ID ${item.id} not found`,
                    error: 'INVALID_MENU_ITEM',
                });
                return;
            }
            if (!menuItem.available) {
                res.status(400).json({
                    success: false,
                    message: `Menu item ${menuItem.name} is not available`,
                    error: 'ITEM_NOT_AVAILABLE',
                });
                return;
            }
            calculatedTotal += menuItem.price * item.quantity;
            calculatedItemCount += item.quantity;
        }
        const tolerance = 0.01;
        if (Math.abs(calculatedTotal - totalAmount) > tolerance) {
            res.status(400).json({
                success: false,
                message: 'Total amount does not match calculated total',
                error: 'TOTAL_MISMATCH',
            });
            return;
        }
        if (calculatedItemCount !== itemCount) {
            res.status(400).json({
                success: false,
                message: 'Item count does not match calculated count',
                error: 'ITEM_COUNT_MISMATCH',
            });
            return;
        }
        const order = (await prisma_1.default.order.create({
            data: {
                userId,
                totalAmount: calculatedTotal,
                itemCount: calculatedItemCount,
                items: items,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        }));
        res.status(201).json({
            success: true,
            message: 'Order created successfully',
            data: {
                order: {
                    id: order.id,
                    totalAmount: order.totalAmount,
                    itemCount: order.itemCount,
                    items: order.items,
                    createdAt: order.createdAt,
                    user: order.user,
                },
            },
        });
    }
    catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create order',
            error: 'ORDER_CREATION_ERROR',
        });
    }
});
router.get('/', auth_1.authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const page = parseInt(req.query['page']) || 1;
        const limit = parseInt(req.query['limit']) || 10;
        const offset = (page - 1) * limit;
        const orders = (await prisma_1.default.order.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            skip: offset,
            take: limit,
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        }));
        const totalOrders = await prisma_1.default.order.count({
            where: { userId },
        });
        res.json({
            success: true,
            message: 'User orders retrieved successfully',
            data: {
                orders: orders.map((order) => ({
                    id: order.id,
                    totalAmount: order.totalAmount,
                    itemCount: order.itemCount,
                    items: order.items,
                    createdAt: order.createdAt,
                    user: order.user,
                })),
                pagination: {
                    page,
                    limit,
                    total: totalOrders,
                    totalPages: Math.ceil(totalOrders / limit),
                },
            },
        });
    }
    catch (error) {
        console.error('Error fetching user orders:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve user orders',
            error: 'ORDERS_FETCH_ERROR',
        });
    }
});
router.get('/daily', auth_1.authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const today = new Date();
        const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999);
        const todayOrders = (await prisma_1.default.order.findMany({
            where: {
                userId,
                createdAt: {
                    gte: startOfDay,
                    lte: endOfDay,
                },
            },
            orderBy: { createdAt: 'desc' },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        }));
        const dailyTotal = todayOrders.reduce((sum, order) => sum + Number(order.totalAmount), 0);
        const dailyItemCount = todayOrders.reduce((sum, order) => sum + order.itemCount, 0);
        res.json({
            success: true,
            message: "Today's orders retrieved successfully",
            data: {
                orders: todayOrders.map((order) => ({
                    id: order.id,
                    totalAmount: order.totalAmount,
                    itemCount: order.itemCount,
                    items: order.items,
                    createdAt: order.createdAt,
                    user: order.user,
                })),
                summary: {
                    totalOrders: todayOrders.length,
                    totalAmount: dailyTotal,
                    totalItems: dailyItemCount,
                    date: today.toISOString().split('T')[0],
                },
            },
        });
    }
    catch (error) {
        console.error('Error fetching daily orders:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve daily orders',
            error: 'DAILY_ORDERS_FETCH_ERROR',
        });
    }
});
router.get('/:id', auth_1.authenticateToken, async (req, res) => {
    try {
        const orderId = req.params['id'];
        const userId = req.user.id;
        if (!orderId) {
            res.status(400).json({
                success: false,
                message: 'Order ID is required',
                error: 'MISSING_ORDER_ID',
            });
            return;
        }
        const order = (await prisma_1.default.order.findFirst({
            where: {
                id: orderId,
                userId,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        }));
        if (!order) {
            res.status(404).json({
                success: false,
                message: 'Order not found',
                error: 'ORDER_NOT_FOUND',
            });
            return;
        }
        res.json({
            success: true,
            message: 'Order retrieved successfully',
            data: {
                order: {
                    id: order.id,
                    totalAmount: order.totalAmount,
                    itemCount: order.itemCount,
                    items: order.items,
                    createdAt: order.createdAt,
                    user: order.user,
                },
            },
        });
    }
    catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve order',
            error: 'ORDER_FETCH_ERROR',
        });
    }
});
exports.default = router;
//# sourceMappingURL=orders.js.map