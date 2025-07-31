import { Router, Request, Response } from 'express';
import { authenticateToken } from '../middleware/auth';
import {
  validateRegistration,
  validateLogin,
  createUser,
  authenticateUser,
  generateToken,
  isEmailExists,
} from '../utils/auth';

const router = Router();

/**
 * POST /auth/register
 * Register a new user account
 */
router.post('/register', async (req: Request, res: Response): Promise<void> => {
  try {
    // Validate input data
    const validation = validateRegistration(req.body);

    if (!validation.success) {
      res.status(400).json({
        success: false,
        message: 'Invalid input data',
        errors: validation.errors,
      });
      return;
    }

    const { email, password, name } = validation.data;

    // Check if email already exists
    const emailExists = await isEmailExists(email);
    if (emailExists) {
      res.status(409).json({
        success: false,
        message: 'Email already registered',
        error: 'EMAIL_EXISTS',
      });
      return;
    }

    // Create new user
    const user = await createUser({ email, password, name });

    // Generate JWT token
    const token = generateToken(user);

    // Return success response (excluding password)
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
        token,
      },
    });
  } catch {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: 'REGISTRATION_ERROR',
    });
  }
});

/**
 * POST /auth/login
 * Authenticate user and return JWT token
 */
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    // Validate input data
    const validation = validateLogin(req.body);

    if (!validation.success) {
      res.status(400).json({
        success: false,
        message: 'Invalid input data',
        errors: validation.errors,
      });
      return;
    }

    const { email, password } = validation.data;

    // Authenticate user
    const user = await authenticateUser(email, password);

    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password',
        error: 'INVALID_CREDENTIALS',
      });
      return;
    }

    // Generate JWT token
    const token = generateToken(user);

    // Return success response (excluding password)
    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
        token,
      },
    });
  } catch {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: 'LOGIN_ERROR',
    });
  }
});

/**
 * GET /auth/me
 * Get current user information (requires authentication)
 */
router.get(
  '/me',
  authenticateToken,
  async (req: Request, res: Response): Promise<void> => {
    try {
      // This endpoint requires authentication middleware
      // The user data will be available in req.user from the middleware
      if (!req.user) {
        res.status(401).json({
          success: false,
          message: 'Authentication required',
          error: 'AUTH_REQUIRED',
        });
        return;
      }

      res.json({
        success: true,
        message: 'User information retrieved successfully',
        data: {
          user: req.user,
        },
      });
    } catch {
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: 'GET_USER_ERROR',
      });
    }
  }
);

/**
 * POST /auth/logout
 * Logout user (client-side token removal)
 */
router.post('/logout', (_req: Request, res: Response): void => {
  // JWT tokens are stateless, so logout is handled client-side
  // by removing the token from storage
  res.json({
    success: true,
    message: 'Logout successful',
    data: {
      message: 'Token should be removed from client storage',
    },
  });
});

/**
 * POST /auth/refresh
 * Refresh JWT token (for future implementation)
 */
router.post('/refresh', (_req: Request, res: Response): void => {
  // This endpoint can be implemented later for token refresh functionality
  res.status(501).json({
    success: false,
    message: 'Token refresh not implemented yet',
    error: 'NOT_IMPLEMENTED',
  });
});

export default router;
