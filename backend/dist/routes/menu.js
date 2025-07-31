"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("zod");
const menu_1 = require("../data/menu");
const router = (0, express_1.Router)();
const categorySchema = zod_1.z.object({
    category: zod_1.z.enum(['hot', 'cold', 'espresso']).optional(),
});
const searchSchema = zod_1.z.object({
    query: zod_1.z
        .string()
        .min(1, 'Search query is required')
        .max(50, 'Search query too long'),
});
const itemIdSchema = zod_1.z.object({
    id: zod_1.z
        .string()
        .transform(val => parseInt(val, 10))
        .refine(val => !isNaN(val) && val > 0, {
        message: 'Invalid item ID',
    }),
});
router.get('/', async (_req, res) => {
    try {
        const menuItems = (0, menu_1.getAllMenuItems)();
        res.json({
            success: true,
            message: 'Menu items retrieved successfully',
            data: {
                items: menuItems,
                total: menuItems.length,
            },
        });
    }
    catch (error) {
        console.error('Error fetching menu items:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve menu items',
            error: 'MENU_FETCH_ERROR',
        });
    }
});
router.get('/categories', async (_req, res) => {
    try {
        const categories = (0, menu_1.getMenuCategories)();
        res.json({
            success: true,
            message: 'Menu categories retrieved successfully',
            data: {
                categories,
            },
        });
    }
    catch (error) {
        console.error('Error fetching menu categories:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve menu categories',
            error: 'CATEGORIES_FETCH_ERROR',
        });
    }
});
router.get('/category/:category', async (req, res) => {
    try {
        const validation = categorySchema.safeParse({
            category: req.params['category'],
        });
        if (!validation.success) {
            res.status(400).json({
                success: false,
                message: 'Invalid category parameter',
                error: 'INVALID_CATEGORY',
            });
            return;
        }
        const { category } = validation.data;
        if (!category) {
            res.status(400).json({
                success: false,
                message: 'Category parameter is required',
                error: 'MISSING_CATEGORY',
            });
            return;
        }
        const menuItems = (0, menu_1.getMenuItemsByCategory)(category);
        res.json({
            success: true,
            message: `Menu items for category '${category}' retrieved successfully`,
            data: {
                category,
                items: menuItems,
                total: menuItems.length,
            },
        });
    }
    catch (error) {
        console.error('Error fetching menu items by category:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve menu items by category',
            error: 'CATEGORY_FETCH_ERROR',
        });
    }
});
router.get('/item/:id', async (req, res) => {
    try {
        const validation = itemIdSchema.safeParse({ id: req.params['id'] });
        if (!validation.success) {
            res.status(400).json({
                success: false,
                message: 'Invalid item ID',
                error: 'INVALID_ITEM_ID',
            });
            return;
        }
        const { id } = validation.data;
        const menuItem = (0, menu_1.getMenuItemById)(id);
        if (!menuItem) {
            res.status(404).json({
                success: false,
                message: 'Menu item not found',
                error: 'ITEM_NOT_FOUND',
            });
            return;
        }
        res.json({
            success: true,
            message: 'Menu item retrieved successfully',
            data: {
                item: menuItem,
            },
        });
    }
    catch (error) {
        console.error('Error fetching menu item:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve menu item',
            error: 'ITEM_FETCH_ERROR',
        });
    }
});
router.get('/search', async (req, res) => {
    try {
        const validation = searchSchema.safeParse({
            query: req.query['q'],
        });
        if (!validation.success) {
            res.status(400).json({
                success: false,
                message: 'Invalid search query',
                error: 'INVALID_SEARCH_QUERY',
            });
            return;
        }
        const { query } = validation.data;
        const searchResults = (0, menu_1.searchMenuItems)(query);
        res.json({
            success: true,
            message: `Search results for '${query}'`,
            data: {
                query,
                items: searchResults,
                total: searchResults.length,
            },
        });
    }
    catch (error) {
        console.error('Error searching menu items:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to search menu items',
            error: 'SEARCH_ERROR',
        });
    }
});
router.get('/available', async (_req, res) => {
    try {
        const availableItems = (0, menu_1.getAllMenuItems)();
        res.json({
            success: true,
            message: 'Available menu items retrieved successfully',
            data: {
                items: availableItems,
                total: availableItems.length,
            },
        });
    }
    catch (error) {
        console.error('Error fetching available menu items:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve available menu items',
            error: 'AVAILABLE_ITEMS_FETCH_ERROR',
        });
    }
});
exports.default = router;
//# sourceMappingURL=menu.js.map