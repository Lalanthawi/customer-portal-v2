# CLAUDE.md - Customer Portal Project Guide

This file provides comprehensive guidance to Claude Code (claude.ai/code) when working with this customer portal codebase.

## 🎯 Project Overview

**Customer Portal v2** - A modern vehicle auction and management platform for customers to browse, bid on, and manage vehicle purchases from Japanese auctions.

### Key Business Features
- Vehicle browsing and advanced search
- Real-time bidding system
- Vehicle inspections and translations management
- Shipment tracking with detailed timelines
- Document management
- User dashboard with statistics
- Payment and deposit management

## 🛠 Technology Stack

### Core Framework
- **Next.js 15.4.6** with App Router (Turbopack enabled)
- **React 19.1.0** - Latest concurrent features
- **TypeScript 5.x** - Strict mode enabled

### Styling & UI
- **Tailwind CSS v4** - New PostCSS architecture
- **Radix UI** - Headless component primitives
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **class-variance-authority** - Component variants

### State Management & Data
- **Zustand 5.x** - Global state management with persist
- **TanStack Query (React Query) 5.x** - Server state management
- **Zod** - Runtime validation and type safety
- **React Hook Form** - Form management

### Authentication & Security
- **jose** - JWT token handling
- **bcryptjs** - Password hashing (mock implementation)
- **nanoid** - Secure ID generation
- Simple mock auth (accepts any credentials for development)

### Real-time & API
- **Axios** - HTTP client
- **WebSocket** - Real-time updates (prepared but not active)
- Custom API client with interceptors

## 📁 Project Structure

```
customer-portal-v2/
├── app/                      # Next.js App Router (stays at root per Next.js convention)
│   ├── layout.tsx           # Root layout with providers
│   ├── page.tsx             # Landing page
│   ├── globals.css          # Global styles & Tailwind
│   ├── dashboard/           # Dashboard pages only (no components)
│   │   ├── layout.tsx       # Dashboard layout with sidebar
│   │   ├── page.tsx         # Dashboard home
│   │   ├── vehicles/        # Vehicle listing & details pages
│   │   ├── bids/           # Bidding management pages
│   │   ├── inspections/    # Inspection reports pages
│   │   ├── translations/   # Translation services pages
│   │   ├── shipment/       # Shipment tracking pages
│   │   ├── auction-calendar/# Auction calendar page
│   │   ├── auctions/       # Auction views pages
│   │   ├── group-bidding/  # Group bid management pages
│   │   ├── search/         # Advanced search pages
│   │   ├── profile/        # User profile page
│   │   └── settings/       # App settings page
│   └── api/                # API routes (minimal, mostly mock)
│
├── src/                     # All application source code
│   ├── components/          # All React components
│   │   ├── ui/             # Base UI components (Button, Card, etc.)
│   │   ├── dashboard/      # Dashboard-specific components
│   │   ├── providers/      # Context providers & wrappers
│   │   └── layouts/        # Layout components
│   │
│   ├── lib/                # Utility libraries & helpers
│   │   ├── api-client.ts   # Centralized API client
│   │   ├── utils.ts        # Helper functions
│   │   ├── websocket.ts    # WebSocket manager
│   │   ├── constants/      # Application constants
│   │   ├── mappers/        # Data transformation utilities
│   │   └── validations/    # Zod schemas
│   │
│   ├── stores/             # Zustand state management
│   │   ├── useAuthStore.ts # Authentication state
│   │   └── useVehicleStore.ts # Vehicle management state
│   │
│   ├── hooks/              # Custom React hooks
│   │   ├── api/           # API-related hooks
│   │   ├── use-auth.ts    # Authentication hook
│   │   └── use-vehicles.ts # Vehicle data hooks
│   │
│   ├── services/           # API service layers
│   │   └── api/           # API endpoints & mock data
│   │       └── mock-data.ts # Centralized mock data
│   │
│   ├── types/              # TypeScript type definitions
│   │   ├── api.types.ts   # API response types
│   │   └── index.ts       # Exported types
│   │
│   ├── data/               # Static data & constants
│   │   ├── auctionHouses.ts # Auction house data
│   │   └── auctionCalendar.ts # Auction calendar data
│   │
│   └── config/             # Configuration files
│       └── api.config.ts   # API configuration
│
├── public/                 # Static assets
│   └── images/            # Image assets
│       ├── singlecar/     # Vehicle images
│       ├── logos/         # Brand logos
│       └── popular/       # Popular vehicle images
│
└── (config files)          # Root configuration
    ├── package.json        # Dependencies
    ├── tsconfig.json       # TypeScript config
    ├── next.config.mjs     # Next.js config
    ├── tailwind.config.ts  # Tailwind CSS config
    └── CLAUDE.md          # This file
```

## 🔑 Key Features & Implementation

### Authentication
- **Current**: Mock authentication accepting any credentials
- **Prepared**: Full JWT with httpOnly cookies, CSRF protection
- **Middleware**: Disabled but available in `middleware.ts.bak`

### Vehicle Management
- Browse vehicles with advanced filtering
- Real-time price updates (WebSocket ready)
- Detailed vehicle pages with images and documents
- Inspection and translation services (¥3,000 and FREE respectively)

### Bidding System
- Individual and group bidding
- Real-time bid updates
- Bid history tracking
- Auction countdown timers

### Data Management
- **3-month data window** for inspections/translations
- Automatic data filtering
- Mock data for development
- API service layer prepared for backend integration

## 🚀 Development Guidelines

### Commands
```bash
npm run dev        # Start dev server with Turbopack
npm run build      # Production build
npm run start      # Start production server
npm run lint       # Run ESLint
```

### Environment Variables
Create `.env.local` from `.env.example`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_USE_MOCK_DATA=true
JWT_SECRET=your-secret-key
```

### Code Style & Patterns

#### Component Structure
```tsx
// Use 'use client' only when needed
'use client'

// Prefer server components by default
export default function Component() {
  // Server component logic
}
```

#### State Management
```tsx
// Use Zustand for global state
const { user, isAuthenticated } = useAuthStore()

// Use React Query for server state
const { data, isLoading } = useQuery({
  queryKey: ['vehicles'],
  queryFn: fetchVehicles
})
```

#### Type Safety
```tsx
// Always use Zod schemas for validation
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

// Infer types from schemas
type FormData = z.infer<typeof schema>
```

### Folder Organization Best Practices

1. **All application code goes in `src/`** - Keeps root directory clean
2. **Pages stay in `app/`** - Next.js App Router convention
3. **No components in `app/dashboard/`** - All components in `src/components/`
4. **Group related files** - Keep related components, hooks, and utilities together
5. **Centralize shared code** - Common utilities, types, and constants in their respective directories
6. **Use barrel exports** - Create index.ts files for cleaner imports
7. **Mock data centralized** - All mock data in `src/services/api/mock-data.ts`

## ⚠️ Important Notes

### Current Limitations
1. **Authentication**: Simplified for development (any credentials work)
2. **API**: Using mock data, real backend not connected
3. **WebSocket**: Prepared but not active
4. **Payments**: UI only, no payment processing

### Data Display Rules
- Inspections/Translations: Shows last 3 months only
- Documents: Admin-managed, read-only for customers
- Shipment timeline: Admin-controlled stages

### Performance Considerations
- Turbopack enabled for faster development
- Images should use Next.js Image component
- Implement virtual scrolling for long lists
- Use React.memo for expensive components

## 🔄 Recent Updates

### Latest Changes (January 2025)
- **Reorganized folder structure**: All application code now lives in `src/` directory
- **Consolidated duplicates**: Merged duplicate folders (components, lib, types)
- **Centralized mock data**: All mock data in `src/services/api/mock-data.ts`
- **Auction calendar data**: Moved to `src/data/auctionCalendar.ts`
- **Dashboard components**: Moved from `app/dashboard/components` to `src/components/dashboard`
- **Updated import paths**: All imports now use `@/src/` prefix for consistency
- Removed authentication requirement
- Added 3-month data notices for inspections/translations
- Implemented Zustand state management
- Prepared WebSocket infrastructure
- Added comprehensive error boundaries
- Set up React Query for data fetching

### Import Path Convention
All imports should use the `@/src/` prefix:
- `@/src/components/` - React components
- `@/src/lib/` - Utilities and helpers
- `@/src/hooks/` - Custom React hooks
- `@/src/stores/` - Zustand stores
- `@/src/services/` - API services
- `@/src/types/` - TypeScript types
- `@/src/data/` - Static data and constants
- `@/src/config/` - Configuration files

### Pending Improvements
- Sentry monitoring integration
- Full backend API integration
- WebSocket activation for real-time updates
- Payment gateway integration
- Advanced caching strategies

## 🎨 UI/UX Guidelines

### Design System
- **Primary Color**: #FA7921 (Orange)
- **Font**: Inter (system font)
- **Spacing**: 4px base unit
- **Border Radius**: Rounded corners (rounded-xl for cards)
- **Shadows**: Subtle shadows for depth

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Sidebar collapses on mobile
- Touch-friendly interfaces

## 🔐 Security Considerations

### Implemented
- Input validation with Zod
- XSS protection via React
- CSRF token preparation
- Secure headers setup

### Recommended
- Enable authentication middleware
- Implement rate limiting
- Add request signing
- Enable CSP headers

## 📝 Admin Integration

This customer portal is designed to work with a separate admin dashboard that controls:
- Vehicle inventory management
- Document uploads and management
- Shipment status updates
- Inspection/translation processing
- User management
- Auction data updates

The architecture supports real-time updates from the admin panel via WebSocket connections.

## 🧪 Testing Strategy

### Current
- Manual testing during development
- Build-time type checking
- ESLint for code quality

### Recommended
- Unit tests with Jest
- Integration tests for API
- E2E tests with Playwright
- Performance monitoring

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Zustand](https://github.com/pmndrs/zustand)
- [TanStack Query](https://tanstack.com/query)
- [Radix UI](https://www.radix-ui.com)

---

**Note**: This guide is maintained to help Claude Code understand the codebase structure and make appropriate decisions when implementing features or fixes.