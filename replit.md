# Atelierul cu flori - Flower Shop & Event Planning Platform

## Overview

Atelierul cu flori is a full-stack web application for a Romanian floral design studio specializing in custom bouquets, event planning, rentals, and workshops. The platform enables users to browse products, manage wishlists and shopping carts, place orders with Stripe payment integration, and subscribe to newsletters. The application features user authentication, email verification, and a complete e-commerce workflow.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- React with TypeScript for type safety
- Vite as the build tool and development server
- Wouter for client-side routing (lightweight alternative to React Router)
- TanStack Query (React Query) for server state management and caching
- Shadcn/ui components built on Radix UI primitives
- Tailwind CSS for styling with custom theme configuration
- React Hook Form with Zod validation for form handling

**Design Decisions:**
- Component-based architecture with separation between page components (`client/src/pages/`) and reusable UI components (`client/src/components/`)
- Custom theming system using JSON configuration (`theme.json`) processed by a Vite plugin
- Path aliases configured (`@/`, `@shared/`, `@assets/`) for cleaner imports
- Protected routes using a custom `ProtectedRoute` component that checks authentication status
- Centralized API request handling through `apiRequest` utility with credential management
- Toast notifications for user feedback across the application

**Key Features:**
- Multi-page structure (Home, About, Events, Rentals, Workshops, Shop, Contact, Testimonials)
- Authentication pages (login/register) with separate layout
- User profile and order history management
- Shopping cart and wishlist functionality
- Search functionality across products and services
- Responsive design with mobile-first approach

### Backend Architecture

**Technology Stack:**
- Express.js as the web server framework
- Node.js runtime with ES modules
- Passport.js for authentication (Local Strategy)
- Express Session for session management with PostgreSQL store
- Stripe SDK for payment processing
- SendGrid integration prepared for email services

**Design Decisions:**
- RESTful API design with routes organized in `server/routes.ts`
- Session-based authentication (not JWT) for simpler state management
- Password hashing using Node.js crypto `scrypt` function with salt
- Middleware for authentication checks (`isAuthenticated`)
- Request/response logging middleware for API routes
- Error handling middleware with standardized JSON error responses
- Storage abstraction layer (`server/storage.ts`) to separate data access from business logic

**API Structure:**
- `/api/user` - User profile and authentication status
- `/api/login`, `/api/logout`, `/api/register` - Authentication endpoints
- `/api/products` - Product catalog management
- `/api/cart`, `/api/cart/items` - Shopping cart operations
- `/api/wishlist`, `/api/wishlist/items` - Wishlist management
- `/api/orders` - Order placement and history
- `/api/testimonials` - Customer testimonials
- `/api/subscribe` - Newsletter subscription
- `/api/checkout` - Stripe payment intent creation

### Data Storage

**Database:**
- PostgreSQL database accessed via Neon serverless driver
- Drizzle ORM for type-safe database queries and migrations
- Schema defined in `shared/schema.ts` using Drizzle's declarative syntax
- Connection pooling with WebSocket support for serverless environments

**Database Schema:**
- `users` - User accounts with profile information, email verification, and Stripe customer ID
- `subscribers` - Newsletter subscribers with active status
- `testimonials` - Customer reviews with ratings and display order
- `products` - Product catalog with pricing, categories, and images
- `orders` and `order_items` - Order management with items and totals
- `carts` and `cart_items` - Shopping cart persistence per user
- `wishlists` and `wishlist_items` - User wishlists
- `verification_tokens` - Email verification tokens with expiration

**Design Decisions:**
- Shared schema definitions between client and server for type consistency
- Zod schemas generated from Drizzle tables for runtime validation
- Session storage in PostgreSQL using `connect-pg-simple`
- Serial IDs for all entities (auto-incrementing primary keys)
- Timestamps for tracking creation dates
- Soft deletion support via active/inactive flags where applicable

### Authentication & Authorization

**Approach:**
- Session-based authentication using Passport.js
- Password security via scrypt hashing with random salts
- Email verification workflow with time-limited tokens
- Session cookies with secure flags in production
- Trust proxy configuration for proper session handling behind proxies

**User Flow:**
- Registration creates inactive users requiring email verification
- Email verification activates user accounts
- Login creates persistent sessions (7-day expiration)
- Protected routes redirect unauthenticated users to login
- User context provided via React Context API

### External Dependencies

**Payment Processing:**
- Stripe integration for checkout and payment handling
- Stripe Elements for secure payment form rendering
- Payment intents created server-side with metadata
- Customer ID stored in user records for repeat purchases
- Environment variables: `STRIPE_SECRET_KEY`, `VITE_STRIPE_PUBLIC_KEY`

**Email Service:**
- SendGrid SDK configured (implementation pending)
- Email verification system with token generation
- Console logging fallback for development verification links
- Base URL configuration for email links

**Database Service:**
- Neon serverless PostgreSQL hosting
- WebSocket connections for serverless compatibility
- SSL connections in production
- Environment variable: `DATABASE_URL`

**Development Tools:**
- Replit-specific plugins for development environment
- Cartographer plugin for code navigation (development only)
- Runtime error overlay for better DX
- Vite HMR (Hot Module Replacement)

**Session Management:**
- Express session with PostgreSQL storage
- Session secret via environment variable or fallback UUID
- Secure cookies in production environment
- Session store configuration for production reliability

**Asset Management:**
- Local image imports from `client/src/assets/`
- External images via Unsplash CDN
- Font imports from Google Fonts and FontAwesome CDN
- Dynamic asset resolution through Vite aliases