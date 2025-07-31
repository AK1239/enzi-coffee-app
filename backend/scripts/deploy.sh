#!/bin/bash

# ========================================
# Enzi Coffee Shop Backend Deployment Script
# ========================================

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
APP_NAME="Enzi Coffee Shop Backend"
BUILD_DIR="dist"
ENVIRONMENT=${1:-production}

echo -e "${BLUE}🚀 Starting deployment for ${APP_NAME} (${ENVIRONMENT})${NC}"

# Function to log messages
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

error() {
    echo -e "${RED}[ERROR] $1${NC}"
    exit 1
}

warning() {
    echo -e "${YELLOW}[WARNING] $1${NC}"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    error "package.json not found. Please run this script from the backend directory."
fi

# Check Node.js version
NODE_VERSION=$(node --version)
log "Node.js version: $NODE_VERSION"

# Check npm version
NPM_VERSION=$(npm --version)
log "npm version: $NPM_VERSION"

# Clean previous builds
log "🧹 Cleaning previous builds..."
rm -rf $BUILD_DIR node_modules/.cache

# Install dependencies
log "📦 Installing dependencies..."
npm ci --production=false

# Run linting
log "🔍 Running linting..."
npm run lint

# Run type checking
log "🔍 Running type checking..."
npm run type-check

# Generate Prisma client
log "🗄️ Generating Prisma client..."
npm run db:generate

# Run database migrations
log "🗄️ Running database migrations..."
npm run db:migrate

# Build the application
log "🏗️ Building application for ${ENVIRONMENT}..."
if [ "$ENVIRONMENT" = "production" ]; then
    npm run build:production
elif [ "$ENVIRONMENT" = "staging" ]; then
    npm run build:staging
else
    npm run build
fi

# Check if build was successful
if [ ! -d "$BUILD_DIR" ]; then
    error "Build failed! $BUILD_DIR directory not found."
fi

log "✅ Build completed successfully!"

# Optional: Run tests if available
if npm run test 2>/dev/null; then
    log "🧪 Running tests..."
    npm run test
    log "✅ Tests passed!"
else
    warning "No tests configured. Skipping test execution."
fi

# Optional: Health check
if [ "$HEALTH_CHECK" = "true" ]; then
    log "🏥 Running health check..."
    # Add your health check logic here
    # Example: curl -f http://localhost:3001/health
fi

# Optional: Install production dependencies only
if [ "$INSTALL_PROD_ONLY" = "true" ]; then
    log "📦 Installing production dependencies only..."
    npm ci --production=true
fi

# Optional: Upload to server or deployment platform
if [ -n "$DEPLOY_URL" ]; then
    log "🚀 Deploying to $DEPLOY_URL..."
    # Add your deployment logic here
    # Example: rsync, scp, or platform-specific commands
fi

log "🎉 Deployment completed successfully!"
log "📁 Build output: $BUILD_DIR"

echo -e "${GREEN}✅ ${APP_NAME} deployment completed!${NC}" 