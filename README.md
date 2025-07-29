# Enzi Coffee Shop - POS System

A full-stack Point-of-Sale (POS) system for a coffee shop where baristas can manage orders, track sales, and handle customer transactions efficiently.

## 🎯 Features

- **User Authentication**: Secure login/register system with JWT
- **Menu Management**: Display coffee items with prices
- **Order Management**: Add items to cart, manage quantities, place orders
- **Order Confirmation**: Modal preview before order submission
- **Receipt Generation**: Printable receipts for completed orders
- **Sales Tracking**: Daily sales summary and order history
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## 🏗️ Tech Stack

### Frontend

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **UI Components**: Headless UI + Custom components
- **HTTP Client**: Axios
- **Deployment**: Vercel

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL (with Prisma ORM)
- **Authentication**: JWT with bcrypt for password hashing
- **Validation**: Zod
- **CORS**: Configured for frontend communication
- **Deployment**: Railway/Render

## 📁 Project Structure

```
enzi-coffee-shop/
├── frontend/                 # Next.js application
│   ├── src/
│   │   ├── app/             # App Router pages
│   │   ├── components/      # Reusable components
│   │   ├── lib/             # Utilities and configurations
│   │   ├── store/           # Zustand state management
│   │   └── types/           # TypeScript type definitions
│   ├── public/              # Static assets
│   └── package.json
├── backend/                  # Express.js API
│   ├── src/
│   │   ├── controllers/     # Route handlers
│   │   ├── middleware/      # Custom middleware
│   │   ├── models/          # Database models
│   │   ├── routes/          # API routes
│   │   ├── utils/           # Utility functions
│   │   └── types/           # TypeScript types
│   ├── prisma/              # Database schema and migrations
│   └── package.json
├── docs/                     # Documentation
└── README.md                 # Project overview
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd enzi-coffee-shop
   ```

2. **Backend Setup**

   ```bash
   cd backend
   npm install
   # Set up environment variables
   cp .env.example .env
   # Configure database and JWT secret
   npm run dev
   ```

3. **Frontend Setup**

   ```bash
   cd frontend
   npm install
   # Set up environment variables
   cp .env.example .env.local
   # Configure API URL
   npm run dev
   ```

4. **Database Setup**
   ```bash
   cd backend
   npx prisma migrate dev
   npx prisma generate
   ```

## 🔐 Environment Variables

### Backend (.env)

```
DATABASE_URL="postgresql://username:password@localhost:5432/enzi_coffee_shop"
JWT_SECRET="your-super-secret-jwt-key"
PORT=3001
```

### Frontend (.env.local)

```
NEXT_PUBLIC_API_URL="http://localhost:3001"
```

## 📚 API Documentation

### Authentication Endpoints

- `POST /auth/register` - User registration
- `POST /auth/login` - User login

### Menu Endpoints

- `GET /menu` - Get all menu items

### Order Endpoints

- `POST /orders` - Create new order (requires auth)
- `GET /orders` - Get user's orders (requires auth)
- `GET /orders/daily` - Get today's orders (requires auth)

## 🎨 UI/UX Features

- **Coffee-themed Design**: Warm browns, creams, and dark accents
- **Responsive Layout**: Works seamlessly across all devices
- **Intuitive Navigation**: Easy-to-use interface for baristas
- **Real-time Updates**: Live cart and order management
- **Print-friendly Receipts**: Professional receipt generation

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 🚀 Deployment

### Frontend (Vercel)

- Connect GitHub repository
- Configure environment variables
- Deploy automatically on push to main

### Backend (Railway/Render)

- Connect GitHub repository
- Set up PostgreSQL database
- Configure environment variables
- Deploy automatically on push to main
