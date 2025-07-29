import { PrismaClient } from '@prisma/client';

// Create a global variable to store the Prisma client instance
declare global {
  var __prisma: PrismaClient | undefined;
}

// Initialize Prisma client
const prisma = globalThis.__prisma || new PrismaClient();

// In development, store the client in global scope to prevent multiple instances
if (process.env['NODE_ENV'] === 'development') {
  globalThis.__prisma = prisma;
}

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

export default prisma;
