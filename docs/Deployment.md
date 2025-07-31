# Enzi Coffee Shop - Deployment Guide

## Overview

This document provides comprehensive deployment instructions for the Enzi Coffee Shop application, including build configurations, environment setup, and deployment strategies.

## Table of Contents

1. [Build Configuration](#build-configuration)
2. [Environment Setup](#environment-setup)
3. [Docker Deployment](#docker-deployment)
4. [Manual Deployment](#manual-deployment)
5. [CI/CD Pipeline](#cicd-pipeline)
6. [Monitoring & Health Checks](#monitoring--health-checks)
7. [Troubleshooting](#troubleshooting)

## Build Configuration

### Frontend Build Optimizations

The frontend has been configured with the following optimizations:

- **SWC Minification**: Enabled for faster builds
- **Image Optimization**: WebP and AVIF formats with responsive sizes
- **Bundle Splitting**: Vendor chunks for better caching
- **Security Headers**: XSS protection, frame options, content type options
- **Performance**: Package import optimization for React components

### Backend Build Optimizations

The backend includes:

- **TypeScript Compilation**: ES2022 target with strict type checking
- **Incremental Builds**: Faster rebuilds during development
- **Source Maps**: For debugging in production
- **Tree Shaking**: Remove unused code

### Environment-Specific Builds

```bash
# Development
npm run dev

# Staging
npm run build:staging

# Production
npm run build:production
```

## Environment Setup

### Frontend Environment Variables

Create environment files based on the examples:

```bash
# Development
cp frontend/env.production.example frontend/.env.local

# Production
cp frontend/env.production.example frontend/.env.production
```

### Backend Environment Variables

```bash
# Development
cp backend/env.production.example backend/.env

# Production
cp backend/env.production.example backend/.env.production
```

### Required Environment Variables

#### Frontend

- `NEXT_PUBLIC_API_URL`: Backend API endpoint
- `NEXT_PUBLIC_APP_NAME`: Application name
- `NEXT_PUBLIC_APP_VERSION`: Application version
- `NEXT_PUBLIC_TOKEN_KEY`: JWT token storage key

#### Backend

- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `PORT`: Server port (default: 3001)
- `CORS_ORIGIN`: Allowed origins for CORS
- `LOG_LEVEL`: Logging level (info, warn, error)
- `BCRYPT_SALT_ROUNDS`: Password hashing rounds

## Docker Deployment

### Prerequisites

- Docker and Docker Compose installed
- PostgreSQL database (or use the provided container)

### Quick Start

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd enzi-coffee-shop
   ```

2. **Set up environment variables**

   ```bash
   cp frontend/env.production.example frontend/.env.local
   cp backend/env.production.example backend/.env
   ```

3. **Start the application**

   ```bash
   docker-compose up -d
   ```

4. **Run database migrations**

   ```bash
   docker-compose exec backend npm run db:migrate
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001
   - Health Check: http://localhost:3001/health

### Production Deployment

For production deployment with SSL and load balancing:

```bash
# Start with production profile
docker-compose --profile production up -d

# Or build and run individual services
docker-compose build
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

### Docker Commands

```bash
# Build images
docker-compose build

# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild and restart
docker-compose up -d --build

# Clean up
docker-compose down -v --remove-orphans
```

## Manual Deployment

### Frontend Deployment

1. **Build the application**

   ```bash
   cd frontend
   npm ci
   npm run build:production
   ```

2. **Start the server**
   ```bash
   npm run start:production
   ```

### Backend Deployment

1. **Build the application**

   ```bash
   cd backend
   npm ci
   npm run build:production
   ```

2. **Set up the database**

   ```bash
   npm run db:generate
   npm run db:migrate
   ```

3. **Start the server**
   ```bash
   npm run start:production
   ```

### Using PM2 (Process Manager)

```bash
# Install PM2
npm install -g pm2

# Start backend
cd backend
pm2 start dist/index.js --name "enzi-backend"

# Start frontend
cd frontend
pm2 start npm --name "enzi-frontend" -- start

# Monitor processes
pm2 monit

# View logs
pm2 logs

# Restart services
pm2 restart all
```

## CI/CD Pipeline

### GitHub Actions

The repository includes a GitHub Actions workflow for automated deployment:

- **Triggers**: Push to main/develop branches, pull requests
- **Jobs**: Frontend build, backend build, staging deployment, production deployment
- **Environments**: Staging (develop branch), Production (main branch)

### Deployment Scripts

Use the provided deployment scripts:

```bash
# Frontend deployment
cd frontend
chmod +x scripts/deploy.sh
./scripts/deploy.sh production

# Backend deployment
cd backend
chmod +x scripts/deploy.sh
./scripts/deploy.sh production
```

## Monitoring & Health Checks

### Health Check Endpoints

- **Backend**: `GET /health`
- **Frontend**: `GET /` (returns 200 if healthy)

### Monitoring Setup

1. **Application Metrics**

   - Response times
   - Error rates
   - Request volume

2. **Database Monitoring**

   - Connection pool status
   - Query performance
   - Migration status

3. **Infrastructure Monitoring**
   - CPU/Memory usage
   - Disk space
   - Network connectivity

### Logging

The application uses structured logging:

```bash
# View backend logs
docker-compose logs backend

# View frontend logs
docker-compose logs frontend

# Follow logs in real-time
docker-compose logs -f
```

## Troubleshooting

### Common Issues

1. **Database Connection Issues**

   ```bash
   # Check database status
   docker-compose exec postgres pg_isready -U postgres

   # Run migrations
   docker-compose exec backend npm run db:migrate
   ```

2. **Build Failures**

   ```bash
   # Clean and rebuild
   npm run clean
   npm ci
   npm run build
   ```

3. **Port Conflicts**

   ```bash
   # Check port usage
   lsof -i :3000
   lsof -i :3001

   # Change ports in docker-compose.yml
   ```

4. **Environment Variables**
   ```bash
   # Verify environment setup
   docker-compose exec backend env | grep DATABASE_URL
   docker-compose exec frontend env | grep NEXT_PUBLIC
   ```

### Performance Optimization

1. **Enable Caching**

   - Redis for session storage
   - CDN for static assets
   - Database query caching

2. **Load Balancing**

   - Multiple backend instances
   - Nginx load balancer
   - Health checks and failover

3. **Database Optimization**
   - Connection pooling
   - Query optimization
   - Index management

### Security Considerations

1. **Environment Variables**

   - Never commit secrets to version control
   - Use secure secret management
   - Rotate keys regularly

2. **Network Security**

   - HTTPS in production
   - Firewall configuration
   - VPN access for admin

3. **Application Security**
   - Input validation
   - SQL injection prevention
   - XSS protection
   - Rate limiting

## Support

For deployment issues or questions:

1. Check the troubleshooting section
2. Review application logs
3. Verify environment configuration
4. Contact the development team

---

**Last Updated**: $(date)
**Version**: 1.0.0
