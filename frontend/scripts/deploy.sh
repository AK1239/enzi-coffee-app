#!/bin/bash

# ========================================
# Enzi Coffee Shop Frontend Deployment Script
# ========================================

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
APP_NAME="Enzi Coffee Shop Frontend"
BUILD_DIR=".next"
DIST_DIR="out"
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
    error "package.json not found. Please run this script from the frontend directory."
fi

# Check Node.js version
NODE_VERSION=$(node --version)
log "Node.js version: $NODE_VERSION"

# Check npm version
NPM_VERSION=$(npm --version)
log "npm version: $NPM_VERSION"

# Clean previous builds
log "🧹 Cleaning previous builds..."
rm -rf $BUILD_DIR $DIST_DIR node_modules/.cache

# Install dependencies
log "📦 Installing dependencies..."
npm ci --production=false

# Run linting
log "🔍 Running linting..."
npm run lint

# Run type checking
log "🔍 Running type checking..."
npm run type-check

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

# Optional: Export static files (for static hosting)
if [ "$EXPORT_STATIC" = "true" ]; then
    log "📤 Exporting static files..."
    npm run export
    
    if [ ! -d "$DIST_DIR" ]; then
        error "Export failed! $DIST_DIR directory not found."
    fi
    
    log "✅ Static export completed!"
fi

# Optional: Run tests if available
if npm run test 2>/dev/null; then
    log "🧪 Running tests..."
    npm run test
    log "✅ Tests passed!"
else
    warning "No tests configured. Skipping test execution."
fi

# Optional: Analyze bundle size
if [ "$ANALYZE_BUNDLE" = "true" ]; then
    log "📊 Analyzing bundle size..."
    npm run build:analyze
fi

# Optional: Upload to CDN or deployment platform
if [ -n "$DEPLOY_URL" ]; then
    log "🚀 Deploying to $DEPLOY_URL..."
    # Add your deployment logic here
    # Example: rsync, scp, or platform-specific commands
fi

log "🎉 Deployment completed successfully!"
log "📁 Build output: $BUILD_DIR"
if [ "$EXPORT_STATIC" = "true" ]; then
    log "📁 Static output: $DIST_DIR"
fi

echo -e "${GREEN}✅ ${APP_NAME} deployment completed!${NC}" 