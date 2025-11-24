# NextDoor — Architecture Overview

This document provides a high-level overview of the architecture, key decisions, and internal structure of the NextDoor MVP project.

## 1. Technology Stack

### Frontend & Fullstack Framework
- Next.js 15 (App Router)
- React 19 (Server + Client Components)
- TypeScript

### Styling
- Headless UI
- Tailwind CSS
- CSS Modules (component-scoped styling)

### Forms & Validation
- React Hook Form
- Zod (schema-based validation)

### State Management
- React Context — UI state (theme)
- Redux Toolkit (installed as foundation for future features, not used in MVP)

### Database
- Vercel Postgres
- Prisma ORM

### Deployment
- Vercel
- GitHub Actions (CI: lint → test → build)

## 2. Key Architectural Principles

### 2.1 Server Components First

**The project follows a Server-First React architecture, meaning:**
- All data fetching is executed on the server (except paginated complexes and posts with infinite scroll)
- Server Components load data directly from Prisma → Postgres
- No REST API or API routes are needed for internal queries
- Minimal client-side JS footprint
- Only interactive pieces (forms, infinite scroll, theme toggle) are client components.
- Better performance, caching, and security

This approach is aligned with the recommended modern pattern for Next.js 15.

### 2.2 Server Actions for Mutations

**All mutations (creating posts, etc.) use Server Actions:**
- No client-side fetches
- No CSRF exposure
- No manual API endpoints
- Full type-safety between client ↔ server

Example responsibilities:
- Create new post
- Validate incoming input with Zod
- Write safely to DB via Prisma

### 2.3 Rendering Strategy: SSR + ISR

**The project uses a hybrid rendering model:**

| Page / Feature                                            | Strategy                | Why                                                                                                                                    |
|-----------------------------------------------------------|-------------------------|----------------------------------------------------------------------------------------------------------------------------------------|
| **Posts feed and Complexes list** (/posts and /complexes) | SSR                     | Frequently updated content with filters and search                                                                                     |
| **Infinite Scroll**                                       | Client + Server Actions | Interactive loading without reloading the whole page                                                                                   |
| **Complex Pages** (/complex/[slug])                       | ISR (1 day)             | Static info that rarely changes → perfect for regeneration                                                                             |
| **Filter Data** (categories, complexes list)              | `unstable_cache`        | Rarely updated data → cached on server level                                                                                           |
| **Metadata Generation**                                   | SSR / `cache`            | Needs dynamic complex/post title/description. Uses cache() from React to avoid duplicate DB hits when metadata and page content need the same entity |

This gives both:
- Fast initial load
- Controlled revalidation
- Low DB load

## 3. Database Architecture

## 3.1 Prisma Models

Post
Category
Complex
Comment
ManagementCompany
UsefulPhone
User (future)

For MVP, author info is stored directly in Post.
Later versions will introduce:
- User model
- Relations
- Authentication flows

## 4. Client/Server Separation

### Server Components

**Used for:**
- Fetching posts
- Rendering the feed
- Rendering complex pages
- Fetching filters/categories
- Rendering post details

**Advantages:**
- Zero client bundles
- Auto-SSR
- No waterfalls
- Type-safe DB calls

### Client Components

**Used for:**
- Theme toggle
- Infinite scroll
- Form components
- Some interaction-based UI

Strict separation keeps bundles small and client JS minimal.

## 5. Forms Architecture

**React Hook Form + Zod**

**Chosen because:**
- Declarative validation
- Type inference from schema
- Minimal re-renders
- Easy integration with Server Actions

**Flow:**
1. User fills form
2. RHF collects data
3. Zod validates on client
4. Server Action re-validates on server
5. Prisma writes data

*Double validation = secure pipeline.*

## 6. Error Handling
- Server Actions use try/catch + typed error responses
- Prisma errors are normalized
- Validation errors from Zod are mapped to RHF fields
- Unknown server errors fall back to safe messages
- 404 pages are handled via Next.js conventions

## 7. Performance Considerations
- Server-first architecture reduces JS bundle sizes
- ISR regenerates complex pages only once per day
- unstable_cache reduces repetitive DB calls
- Images are optimized via Next.js Image component
- Database queries use Prisma’s optimized SQL layer
- Infinite scroll loads small slices of data via Server Actions

## 8. Caching Strategy Summary

- **React cache()** — prevents duplicate DB calls within the same request/render
- **Next.js unstable_cache()** — long-lived server cache for rarely changing data
- **ISR (1d)** — regenerates static complex pages once per day
- **SSR** — used for frequently changing data (posts feed)
- **Browser caching** — Next/Image handles automatic caching headers for static images

## 9. Folder Structure
The project follows a Feature-Based Hybrid file organization approach.

**This means:**
- Code is grouped by business domain (posts, complexes)
- Feature-specific components live close to their routes
- Shared UI components are stored in `/ui`
- Infrastructure and data access live in `/lib`

**This structure improves:**
- Locality
- Maintainability
- Scalability
- Developer experience

```md
/
├── app/
│   ├── (home)/           # / 
│   ├── (providers)/      # All providers App/Redux/Theme
│   ├── complexes/        # /complex/[slug]
│   ├── posts/            # /posts, /posts/[id]
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── styles/               # shared UI styles
│
├── ui/
│   ├── atoms/            # base UI components
│   ├── common/           # more complex UI components
│   └── layout/           # layout UI components
│
├── lib/
│   ├── data-access/      # Access to DB
│   │   ├── queries/      # Queries to DB
│   │   └── db.ts         # Prisma client
│   └── actions/          # Server Actions
│
├── utils/
│   ├── constants/        # Constants
│   ├── hooks/            # Custom hooks
│   ├── validation/       # Zod validation schemas
│   └── helpers/          # Pure functions (tested)
│
├── prisma/
│   ├── migrations/       # Migration files    
│   ├── seed.ts           # Seed script
│   └── schema.prisma     # Prisma schema
│
├── store/                # Redux store
│
├── data/                 # Constant data-objects
│
├── types/                # Types
│
├── public/               # Static assets
└── ...
```  

## 10. Why No API Routes

The project intentionally avoids API routes because:

- Server Components can access the database directly
- Server Actions provide a safer and more ergonomic mutation layer
- No need for manual request validation, CSRF protection, or serialization
- Zero duplication between backend and frontend types
- Less boilerplate, fewer layers, smaller codebase

This reflects the recommended pattern for modern Next.js applications.

## 11. Testing Architecture

### Unit tests
- Jest + React Testing Library
- Pure utilities (phone/data helpers) are tested
- Includes happy path, boundary, failure, corner cases

## CI

### GitHub Actions:
- install → lint → test → build
- Vercel deploy happens only if CI passes
- Prisma client is auto-generated during CI

## 12. Future Architectural Plans

### Planned features:
- Authentication (NextAuth or custom)
- User profiles
- Favorites & deleting posts
- Comment system
- Image upload
- Moving author data to User model
- And other

### Technical improvements:
- More test coverage
- Error boundary components
