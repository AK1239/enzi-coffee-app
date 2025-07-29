import { Router, Request, Response } from 'express';
import { z } from 'zod';
import {
  getAllMenuItems,
  getMenuItemsByCategory,
  getMenuItemById,
  getMenuCategories,
  searchMenuItems,
} from '../data/menu';

const router = Router();

// Validation schemas
const categorySchema = z.object({
  category: z.enum(['hot', 'cold', 'espresso']).optional(),
});

const searchSchema = z.object({
  query: z
    .string()
    .min(1, 'Search query is required')
    .max(50, 'Search query too long'),
});

const itemIdSchema = z.object({
  id: z
    .string()
    .transform(val => parseInt(val, 10))
    .refine(val => !isNaN(val) && val > 0, {
      message: 'Invalid item ID',
    }),
});

/**
 * GET /menu
 * Get all menu items
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const menuItems = getAllMenuItems();

    res.json({
      success: true,
      message: 'Menu items retrieved successfully',
      data: {
        items: menuItems,
        total: menuItems.length,
      },
    });
  } catch (error) {
    console.error('Error fetching menu items:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve menu items',
      error: 'MENU_FETCH_ERROR',
    });
  }
});

/**
 * GET /menu/categories
 * Get all menu categories
 */
router.get('/categories', async (req: Request, res: Response) => {
  try {
    const categories = getMenuCategories();

    res.json({
      success: true,
      message: 'Menu categories retrieved successfully',
      data: {
        categories,
      },
    });
  } catch (error) {
    console.error('Error fetching menu categories:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve menu categories',
      error: 'CATEGORIES_FETCH_ERROR',
    });
  }
});

/**
 * GET /menu/category/:category
 * Get menu items by category
 */
router.get('/category/:category', async (req: Request, res: Response) => {
  try {
    // Validate category parameter
    const validation = categorySchema.safeParse({
      category: req.params['category'],
    });

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: 'Invalid category parameter',
        error: 'INVALID_CATEGORY',
      });
    }

    const { category } = validation.data;

    if (!category) {
      return res.status(400).json({
        success: false,
        message: 'Category parameter is required',
        error: 'MISSING_CATEGORY',
      });
    }

    const menuItems = getMenuItemsByCategory(category);

    res.json({
      success: true,
      message: `Menu items for category '${category}' retrieved successfully`,
      data: {
        category,
        items: menuItems,
        total: menuItems.length,
      },
    });
  } catch (error) {
    console.error('Error fetching menu items by category:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve menu items by category',
      error: 'CATEGORY_FETCH_ERROR',
    });
  }
});

/**
 * GET /menu/item/:id
 * Get specific menu item by ID
 */
router.get('/item/:id', async (req: Request, res: Response) => {
  try {
    // Validate ID parameter
    const validation = itemIdSchema.safeParse({ id: req.params['id'] });

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: 'Invalid item ID',
        error: 'INVALID_ITEM_ID',
      });
    }

    const { id } = validation.data;
    const menuItem = getMenuItemById(id);

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found',
        error: 'ITEM_NOT_FOUND',
      });
    }

    res.json({
      success: true,
      message: 'Menu item retrieved successfully',
      data: {
        item: menuItem,
      },
    });
  } catch (error) {
    console.error('Error fetching menu item:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve menu item',
      error: 'ITEM_FETCH_ERROR',
    });
  }
});

/**
 * GET /menu/search
 * Search menu items by name
 */
router.get('/search', async (req: Request, res: Response) => {
  try {
    // Validate search query
    const validation = searchSchema.safeParse({
      query: req.query['q'] as string,
    });

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: 'Invalid search query',
        error: 'INVALID_SEARCH_QUERY',
      });
    }

    const { query } = validation.data;
    const searchResults = searchMenuItems(query);

    res.json({
      success: true,
      message: `Search results for '${query}'`,
      data: {
        query,
        items: searchResults,
        total: searchResults.length,
      },
    });
  } catch (error) {
    console.error('Error searching menu items:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to search menu items',
      error: 'SEARCH_ERROR',
    });
  }
});

/**
 * GET /menu/available
 * Get only available menu items
 */
router.get('/available', async (req: Request, res: Response) => {
  try {
    const availableItems = getAllMenuItems(); // This already filters by available: true

    res.json({
      success: true,
      message: 'Available menu items retrieved successfully',
      data: {
        items: availableItems,
        total: availableItems.length,
      },
    });
  } catch (error) {
    console.error('Error fetching available menu items:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve available menu items',
      error: 'AVAILABLE_ITEMS_FETCH_ERROR',
    });
  }
});

export default router;
