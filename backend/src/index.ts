import dotenv from 'dotenv';
import { createServer } from './app';
import { logger } from './utils/logger';

// Load environment variables
dotenv.config();

const PORT = process.env['PORT'] || 3001;

async function startServer() {
  try {
    const app = createServer();

    app.listen(PORT, () => {
      logger.info(`🚀 Enzi Coffee Shop Backend running on port ${PORT}`);
      logger.info(
        `📊 Health check available at http://localhost:${PORT}/health`
      );
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    throw error;
  }
}

// Handle graceful shutdown
const gracefulShutdown = (signal: string) => {
  logger.info(`${signal} received, shutting down gracefully`);
  // In a real application, you would close database connections here
  // eslint-disable-next-line no-process-exit
  process.exit(0);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

startServer();
