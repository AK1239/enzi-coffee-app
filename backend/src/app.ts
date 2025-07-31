import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { logger } from './utils/logger';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';

// Import routes
import authRoutes from './routes/auth';
import menuRoutes from './routes/menu';
import orderRoutes from './routes/orders';

export function createServer(): Express {
  const app = express();

  // Security middleware
  app.use(helmet());

  // CORS configuration
  app.use(
    cors({
      origin: true, // Allow all origins
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  );

  // Body parsing middleware
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Request logging middleware
  app.use((_req: Request, _res: Response, next: NextFunction) => {
    logger.info(`${_req.method} ${_req.path}`, {
      ip: _req.ip,
      userAgent: _req.get('User-Agent'),
    });
    next();
  });

  // Health check endpoint
  app.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env['NODE_ENV'] || 'development',
    });
  });

  // API routes
  app.use('/api/auth', authRoutes);
  app.use('/api/menu', menuRoutes);
  app.use('/api/orders', orderRoutes);

  // Root endpoint
  app.get('/', (_req: Request, res: Response) => {
    res.json({
      message: 'Welcome to Enzi Coffee Shop API',
      version: '1.0.0',
      documentation: '/health',
      endpoints: {
        auth: '/api/auth',
        menu: '/api/menu',
        orders: '/api/orders',
      },
    });
  });

  // 404 handler - must be before error handler
  app.use(notFoundHandler);

  // Global error handling middleware
  app.use(errorHandler);

  return app;
}
