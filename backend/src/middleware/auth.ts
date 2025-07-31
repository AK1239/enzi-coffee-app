import { Request, Response, NextFunction } from 'express';
import {
  verifyToken,
  extractTokenFromHeader,
  getUserById,
} from '../utils/auth';
import { AuthenticationError } from './errorHandler';

// Extend the Express Request interface to include user data
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        name: string;
      };
    }
  }
}

/**
 * JWT Authentication Middleware
 * Verifies JWT tokens from request headers and adds user data to request object
 */
export async function authenticateToken(
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> {
  try {
    // Extract token from Authorization header
    const authHeader = req.headers.authorization;
    const token = extractTokenFromHeader(authHeader);

    if (!token) {
      throw new AuthenticationError('Access token required');
    }

    // Verify the token
    const payload = verifyToken(token);
    if (!payload) {
      throw new AuthenticationError('Invalid or expired token');
    }

    // Get user data from database to ensure user still exists
    const user = await getUserById(payload.userId);
    if (!user) {
      throw new AuthenticationError('User not found');
    }

    // Add user data to request object
    req.user = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    next();
  } catch (error) {
    next(error);
  }
}

/**
 * Optional Authentication Middleware
 * Similar to authenticateToken but doesn't require authentication
 * Adds user data to request if token is valid, otherwise continues without user data
 */
export async function optionalAuth(
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;
    const token = extractTokenFromHeader(authHeader);

    if (token) {
      const payload = verifyToken(token);
      if (payload) {
        const user = await getUserById(payload.userId);
        if (user) {
          req.user = {
            id: user.id,
            email: user.email,
            name: user.name,
          };
        }
      }
    }

    next();
  } catch (error) {
    console.error('Optional auth middleware error:', error);
    // Continue without authentication for optional auth
    next();
  }
}

/**
 * Role-based Authentication Middleware (for future use)
 * Checks if user has required role/permissions
 */
export function requireRole(_requiredRole: string) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Authentication required',
        error: 'AUTH_REQUIRED',
      });
      return;
    }

    // For now, all authenticated users have access
    // This can be extended later with role-based permissions
    next();
  };
}

/**
 * Admin-only Authentication Middleware (for future use)
 * Checks if user is an admin
 */
export function requireAdmin(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: 'Authentication required',
      error: 'AUTH_REQUIRED',
    });
    return;
  }

  // For now, all authenticated users have access
  // This can be extended later with admin role checking
  next();
}
