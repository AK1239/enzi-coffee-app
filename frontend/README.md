# Enzi Coffee Shop Frontend

This is the frontend application for the Enzi Coffee Shop POS System, built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   # Configure NEXT_PUBLIC_API_URL to point to your backend
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── components/         # Reusable React components
├── lib/               # Utility functions and configurations
├── store/             # Zustand state management
└── types/             # TypeScript type definitions
```

## 🎨 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand
- **UI Components**: Headless UI
- **HTTP Client**: Axios
- **Development**: ESLint, Turbopack

## 📦 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🔧 Configuration

### Tailwind CSS

The project uses Tailwind CSS v4 with zero configuration required. The setup includes:

- PostCSS configuration with `@tailwindcss/postcss`
- Global CSS import in `src/app/globals.css`
- Automatic dark mode support

### TypeScript

Full TypeScript support with strict configuration and path aliases:

- `@/*` points to `src/*`
- Strict type checking enabled
- Next.js type definitions included

## 🌐 Environment Variables

Create a `.env.local` file with:

```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 🎯 Features

- **Modern React**: Built with React 19 and Next.js 14
- **Type Safety**: Full TypeScript support
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Fast Development**: Turbopack for rapid development
- **Code Quality**: ESLint configuration for code consistency

## 📱 Responsive Design

The application is built with a mobile-first approach and includes:

- Responsive breakpoints for all screen sizes
- Touch-friendly interactions
- Optimized for both desktop and mobile use

## 🔗 Backend Integration

This frontend is designed to work with the Enzi Coffee Shop backend API. Make sure to:

1. Set the correct `NEXT_PUBLIC_API_URL` in your environment variables
2. Ensure the backend is running and accessible
3. Check API documentation for endpoint details

---
