import { Router, Request, Response } from 'express';
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
router.post('/register', async (req: Request, res: Response) => {
  try {
    // Validate input data
    const validation = validateRegistration(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: 'Invalid input data',
        errors: validation.errors,
      });
    }

    const { email, password, name } = validation.data;

    // Check if email already exists
    const emailExists = await isEmailExists(email);
    if (emailExists) {
      return res.status(409).json({
        success: false,
        message: 'Email already registered',
        error: 'EMAIL_EXISTS',
      });
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
  } catch (error) {
    console.error('Registration error:', error);
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
router.post('/login', async (req: Request, res: Response) => {
  try {
    // Validate input data
    const validation = validateLogin(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: 'Invalid input data',
        errors: validation.errors,
      });
    }

    const { email, password } = validation.data;

    // Authenticate user
    const user = await authenticateUser(email, password);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
        error: 'INVALID_CREDENTIALS',
      });
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
  } catch (error) {
    console.error('Login error:', error);
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
router.get('/me', async (req: Request, res: Response) => {
  try {
    // This endpoint requires authentication middleware
    // The user data will be available in req.user from the middleware
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required',
        error: 'AUTH_REQUIRED',
      });
    }

    res.json({
      success: true,
      message: 'User information retrieved successfully',
      data: {
        user: req.user,
      },
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: 'GET_USER_ERROR',
    });
  }
});

/**
 * POST /auth/logout
 * Logout user (client-side token removal)
 */
router.post('/logout', (req: Request, res: Response) => {
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
router.post('/refresh', (req: Request, res: Response) => {
  // This endpoint can be implemented later for token refresh functionality
  res.status(501).json({
    success: false,
    message: 'Token refresh not implemented yet',
    error: 'NOT_IMPLEMENTED',
  });
});

export default router;
