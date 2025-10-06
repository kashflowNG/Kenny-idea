# TRON Wallet Mobile Web App

## Overview

This is a mobile-first web application for managing TRON cryptocurrency wallets. The application enables users to create and manage TRX and USDT-TRC20 wallets, send and receive tokens, view transaction history, and monitor balances. Built with security and mobile usability as core priorities, it features PIN-based authentication, demo wallet functionality for testing, and a dark mode interface aligned with TRON's brand identity.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- React with TypeScript for type-safe component development
- Vite as the build tool and development server
- Wouter for lightweight client-side routing
- TanStack Query (React Query) for server state management and API caching

**UI Framework:**
- shadcn/ui component library (Radix UI primitives)
- Tailwind CSS for styling with custom design tokens
- Mobile-first responsive design approach
- Dark mode as the primary theme with optional light mode support

**Design System:**
- Custom color palette centered on TRON brand red (#FF060A)
- Typography using Inter for general text and JetBrains Mono for addresses/hashes
- Component-based architecture with reusable UI elements
- Comprehensive design guidelines documented in `design_guidelines.md`

**Key Frontend Patterns:**
- Path aliases configured for clean imports (`@/`, `@shared/`, `@assets/`)
- Custom hooks for mobile detection and toast notifications
- Session-based authentication state managed in localStorage
- Progressive disclosure pattern for complex wallet operations

### Backend Architecture

**Server Framework:**
- Express.js running on Node.js
- RESTful API design pattern
- Session-based authentication with express-session

**Authentication Flow:**
- Two-tier security: username/password + 6-digit PIN
- Sessions stored server-side with HTTP-only cookies
- bcrypt for password and PIN hashing
- Authentication check middleware protects wallet endpoints

**API Structure:**
- `/api/auth/*` - User registration, login, and PIN verification
- `/api/wallets/*` - Wallet CRUD operations, balance queries, and transactions
- Centralized error handling middleware
- Request logging with duration tracking for API endpoints

**Storage Architecture:**
- Abstracted storage interface (`IStorage`) for flexibility
- In-memory implementation (`MemStorage`) for development/demo
- Designed to swap to database persistence (Drizzle ORM configured for PostgreSQL)
- UUID-based resource identifiers

### Data Storage Solutions

**Database Schema (Drizzle ORM):**
- `users` table: id, username, hashed password, hashed PIN, creation timestamp
- `wallets` table: id, userId (foreign key with cascade delete), address, encrypted privateKey, demo flags, creation timestamp

**Current Implementation:**
- Development mode uses in-memory Map-based storage
- Production-ready schema defined in `shared/schema.ts`
- Drizzle Kit configured for PostgreSQL migrations
- Zod schemas for runtime validation of user and wallet data

**Rationale:**
- In-memory storage allows rapid development and testing without database setup
- Clean interface abstraction enables seamless migration to persistent storage
- Drizzle ORM chosen for type-safe database operations and excellent TypeScript support

### Authentication and Authorization

**Multi-Layer Security:**
- Initial authentication via username/password
- Secondary PIN verification for wallet access
- Session cookies with configurable security settings (HTTP-only, secure flag for production)

**Session Management:**
- Express-session middleware with custom secret key
- 7-day session expiration by default
- User ID stored in session after successful authentication

**Authorization Pattern:**
- Wallet operations implicitly scoped to authenticated user
- Future enhancement: explicit ownership checks on wallet endpoints

### External Dependencies

**TRON Blockchain Integration:**
- TronGrid API (`https://api.trongrid.io`) for blockchain queries
- USDT-TRC20 contract address: `TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t`
- Current implementation uses mock data generators for development
- Functions prepared for real API integration: `getTRXBalance`, `getUSDTBalance`, `sendTRX`, `sendUSDT`, `getTransactionHistory`

**Third-Party Services:**
- None currently integrated (blockchain calls are mocked)
- QR code generation via `qrcode.react` library
- Future integration points ready for TronGrid API and price feeds

**UI Component Libraries:**
- Radix UI primitives for accessible, unstyled components
- Lucide React for consistent iconography
- React Hook Form with Zod resolvers for form validation

**Development Tools:**
- Replit-specific plugins for runtime error overlay and dev experience
- TypeScript for static type checking across the entire stack
- ESBuild for production server bundling

**Rationale for Mock Data:**
- Enables full-stack development without blockchain API keys or rate limits
- Provides consistent testing environment with predictable data
- Demo wallet feature generates realistic user profiles for UX testing
- Easy migration path: replace mock functions with real API calls in `server/tron.ts`