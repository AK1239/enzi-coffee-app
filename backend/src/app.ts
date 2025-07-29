import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { logger } from './utils/logger';

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
      origin: process.env['FRONTEND_URL'] || 'http://localhost:3000',
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  );

  // Body parsing middleware
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Request logging middleware
  app.use((req: Request, res: Response, next: NextFunction) => {
    logger.info(`${req.method} ${req.path}`, {
      ip: req.ip,
      userAgent: req.get('User-Agent'),
    });
    next();
  });

  // Health check endpoint
  app.get('/health', (req: Request, res: Response) => {
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
  app.get('/', (req: Request, res: Response) => {
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

  // Global error handling middleware
  app.use((error: Error, req: Request, res: Response, _next: NextFunction) => {
    logger.error('Unhandled error:', error);

    // Don't leak error details in production
    const isDevelopment = process.env['NODE_ENV'] === 'development';

    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: isDevelopment ? error.message : 'Something went wrong',
      ...(isDevelopment && { stack: error.stack }),
    });
  });

  return app;
}
