import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { authenticateToken } from '../middleware/auth';
import prisma from '../lib/prisma';
import { getMenuItemById } from '../data/menu';

const router = Router();

// Validation schemas
const orderItemSchema = z.object({
  id: z.number().positive('Item ID must be positive'),
  quantity: z
    .number()
    .positive('Quantity must be positive')
    .max(10, 'Quantity cannot exceed 10'),
  name: z.string().min(1, 'Item name is required'),
  price: z.number().positive('Price must be positive'),
});

const createOrderSchema = z.object({
  items: z
    .array(orderItemSchema)
    .min(1, 'Order must contain at least one item'),
  totalAmount: z.number().positive('Total amount must be positive'),
  itemCount: z.number().positive('Item count must be positive'),
});

/**
 * POST /orders
 * Create new order (requires authentication)
 */
router.post('/', authenticateToken, async (req: Request, res: Response) => {
  try {
    // Validate order data
    const validation = createOrderSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: 'Invalid order data',
        error: 'INVALID_ORDER_DATA',
      });
    }

    const { items, totalAmount, itemCount } = validation.data;
    const userId = req.user!.id;

    // Verify all menu items exist and calculate actual total
    let calculatedTotal = 0;
    let calculatedItemCount = 0;

    for (const item of items) {
      const menuItem = getMenuItemById(item.id);
      if (!menuItem) {
        return res.status(400).json({
          success: false,
          message: `Menu item with ID ${item.id} not found`,
          error: 'INVALID_MENU_ITEM',
        });
      }

      if (!menuItem.available) {
        return res.status(400).json({
          success: false,
          message: `Menu item ${menuItem.name} is not available`,
          error: 'ITEM_NOT_AVAILABLE',
        });
      }

      calculatedTotal += menuItem.price * item.quantity;
      calculatedItemCount += item.quantity;
    }

    // Verify total amount matches calculated total (with small tolerance for rounding)
    const tolerance = 0.01;
    if (Math.abs(calculatedTotal - totalAmount) > tolerance) {
      return res.status(400).json({
        success: false,
        message: 'Total amount does not match calculated total',
        error: 'TOTAL_MISMATCH',
      });
    }

    if (calculatedItemCount !== itemCount) {
      return res.status(400).json({
        success: false,
        message: 'Item count does not match calculated count',
        error: 'ITEM_COUNT_MISMATCH',
      });
    }

    // Create order in database
    const order = await prisma.order.create({
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
    });

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
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: 'ORDER_CREATION_ERROR',
    });
  }
});

/**
 * GET /orders
 * Get user's orders (requires authentication)
 */
router.get('/', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const page = parseInt(req.query['page'] as string) || 1;
    const limit = parseInt(req.query['limit'] as string) || 10;
    const offset = (page - 1) * limit;

    // Get user's orders with pagination
    const orders = await prisma.order.findMany({
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
    });

    // Get total count for pagination
    const totalOrders = await prisma.order.count({
      where: { userId },
    });

    res.json({
      success: true,
      message: 'User orders retrieved successfully',
      data: {
        orders: orders.map((order: any) => ({
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
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve user orders',
      error: 'ORDERS_FETCH_ERROR',
    });
  }
});

/**
 * GET /orders/daily
 * Get today's orders (requires authentication)
 */
router.get('/daily', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;

    // Get today's date range
    const today = new Date();
    const startOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const endOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      23,
      59,
      59,
      999
    );

    // Get today's orders
    const todayOrders = await prisma.order.findMany({
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
    });

    // Calculate daily totals
    const dailyTotal = todayOrders.reduce(
      (sum: number, order: any) => sum + Number(order.totalAmount),
      0
    );
    const dailyItemCount = todayOrders.reduce(
      (sum: number, order: any) => sum + order.itemCount,
      0
    );

    res.json({
      success: true,
      message: "Today's orders retrieved successfully",
      data: {
        orders: todayOrders.map((order: any) => ({
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
  } catch (error) {
    console.error('Error fetching daily orders:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve daily orders',
      error: 'DAILY_ORDERS_FETCH_ERROR',
    });
  }
});

/**
 * GET /orders/:id
 * Get specific order by ID (requires authentication)
 */
router.get('/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const orderId = req.params['id'];
    const userId = req.user!.id;

    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
        userId, // Ensure user can only access their own orders
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
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
        error: 'ORDER_NOT_FOUND',
      });
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
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve order',
      error: 'ORDER_FETCH_ERROR',
    });
  }
});

export default router;
