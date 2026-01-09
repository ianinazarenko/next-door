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

| Page / Feature                                            | Strategy                | Why                                                                                                                                                  |
| --------------------------------------------------------- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Posts feed and Complexes list** (/posts and /complexes) | SSR                     | Frequently updated content with filters and search                                                                                                   |
| **Infinite Scroll**                                       | Client + Server Actions | Interactive loading without reloading the whole page                                                                                                 |
| **Complex Pages** (/complex/[slug])                       | ISR (1 day)             | Static info that rarely changes → perfect for regeneration                                                                                           |
| **Sign-In Page** (/sign-in)                               | SSR                     | Server-side session check + client-side auth for interactive elements                                                                                |
| **Profile Page** (/profile)                               | SSR                     | Protected route with middleware + server session validation                                                                                          |
| **Filter Data** (categories, complexes list)              | `unstable_cache`        | Rarely updated data → cached on server level                                                                                                         |
| **Metadata Generation**                                   | SSR / `cache`           | Needs dynamic complex/post title/description. Uses cache() from React to avoid duplicate DB hits when metadata and page content need the same entity |

This gives both:

- Fast initial load
- Controlled revalidation
- Low DB load

### 2.4 Authentication Strategy (Session-Based)

NextDoor uses **session-based authentication** implemented via **NextAuth.js (Auth.js) with Prisma Adapter**.

**Key properties:**

- Sessions are stored in **Vercel Postgres**, alongside users and content.
- Authentication relies on **httpOnly secure cookies** rather than JWT tokens.
- Prisma provides type-safe session handling and unified data access.

**Why session-based instead of JWT:**

- **Immediate session revocation:** Moderation actions such as banning a user take effect instantly by deleting session records from the database.
- **Fresh user context:** Business logic (e.g., complex membership, permissions, future roles) always requires database queries. JWT does not remove this need.
- **Best fit for Server Components:** Since Next.js App Router performs data fetching on the server, and all serverless functions share Postgres, the "stateless advantage" of JWT is unnecessary.
- **Smaller cookies & better bandwidth:** JWTs include payload and are significantly larger than a short session ID.

This strategy aligns with the project’s Server-First architecture and relies on the database as a single, authoritative source of truth.

**API Endpoint:** While the project avoids traditional API routes for data queries, it utilizes a single API Route Handler at `/api/auth/[...nextauth]` as required by Auth.js. This handler manages all OAuth redirects, callbacks, and other internal authentication mechanisms.

**CSRF Protection**
NextDoor uses a standard double-submit cookie strategy: NextAuth sets an httpOnly anti-CSRF cookie, and the client includes the matching token in the `X-CSRF-Token` header for mutations. The server compares both values, blocking cross‑origin form submissions. This keeps the mechanism secure while fitting naturally into the session-based model.

**Middleware Protection**
Next.js middleware (`middleware.ts`) protects private routes using matcher pattern and redirects unauthenticated users to `/api/auth/signin` with `callbackUrl` for post-login redirect.

**Callback URL Safety**
All auth redirects use `getSafeCallbackUrl()` utility to prevent open redirect vulnerabilities:
- Validates that redirect URLs belong to the same origin
- Blocks protocol-relative URLs (`//evil.com`)
- Falls back to safe default if validation fails

**RBAC Foundation**
The `User` model includes a `role` field (default: `"user"`) and session includes role data. This infrastructure is prepared for future features.

### 2.5 Hybrid Session Management

NextDoor uses a **hybrid approach** to session access, balancing performance, SSG/ISR preservation, and security.

**Public Routes** (`app/(public)/`)
- Use **Client Thin Wrapper** for TheHeader & TheMenuMob with `useSession()` hook from `next-auth/react`
- `SessionProvider` wraps the layout, enabling reactive auth state
- Enables real-time UI updates (e.g., header showing/hiding sign-in button)
- **Critical advantage:** Preserves SSG/ISR for pages like `/complex/[slug]`
  - Calling `auth()` or `getServerSession()` in Server Components forces dynamic rendering (`auth()` uses `headers()` dynamic API)
  - Client-side session checks keep pages statically pre-renderable

**Protected Routes** (`app/(authed)/`)
- Use **Server Components** with `getServerSession()` for SSR-based auth
- Session fetched once on the server during initial render
- `SessionProvider` wraps layout and receives server session via props

**Session Optimization:**
- `getServerSession` is wrapped in `React.cache()` to prevent duplicate `auth()` calls within a single request
- Critical when multiple Server Components need session data in the same render cycle
- `useSession` hook doesn't trigger duplicate requests as it subscribes to SessionProvider's cached data

**Why this hybrid:**
1. **SSG/ISR preservation** — public pages with ISR (like `/complex/[slug]`) remain statically generated
2. **Performance** — public pages minimize JS bundle by avoiding unnecessary server session calls
3. **Security** — protected routes use server-side session validation
4. **UX** — interactive elements (header, menu) react to auth state changes

## 3. Database Architecture

## 3.1 Prisma Models

The project utilizes Prisma ORM with the following main models:
- `Post`
- `Category`
- `Complex`
- `Comment`
- `ManagementCompany`
- `UsefulPhone`
- `User`
- `Session`
- `Account`
- `VerificationToken`

Author information is now fully integrated into the `User` model with proper relations to `Post` and `Comment` models, enhancing data normalization and enabling user authentication features.

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

_Double validation = secure pipeline._

**Guest Access for Post Creation:** To improve the user experience, the `/posts/new` page is publicly accessible, allowing non-authenticated users to view the post creation form. However, the form submission is disabled on the client-side, and the corresponding Server Action (`createPostAction`) is protected by a mandatory session check, ensuring that only authenticated users can create posts.

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
│ ├── (authed)/                # Protected routes (Server Components auth)
│ │   ├── layout.tsx           # getServerSession() + SessionProvider
│ │   └── profile/             # /profile (middleware-protected)
│ │
│ ├── (public)/                # Public routes (Client Components auth)
│ │   ├── layout.tsx           # useSession() + SessionProvider
│ │   ├── (home)/              # /
│ │   ├── complexes/           # /complexes, /complex/[slug]
│ │   ├── posts/               # /posts, /posts/[id], /posts/new
│ │   └── sign-in/             # /sign-in (custom sign-in page)
│ │
│ ├── (providers)/             # App-wide providers (Redux, Theme)
│ │
│ ├── api/auth/[...nextauth]/  # NextAuth API handler (OAuth callbacks)
│ │
│ ├── layout.tsx               # Root layout (AppProviders + Footer)
│ ├── page.tsx                 # Redirects to /(home)
│ └── globals.css
│
├── styles/                    # Shared UI styles
│
├── ui/
│ ├── atoms/                   # Base UI components
│ ├── common/                  # Complex UI components
│ └── layout/                  # Layout UI components
│
├── lib/
│ ├── data-access/             # Database access layer
│ │   ├── queries/             # Read queries
│ │   └── db.ts                # Prisma client
│ ├── actions/                 # Server Actions (mutations)
│ └── auth.ts                  # NextAuth config + getServerSession
│
├── utils/
│ ├── constants/               # Constants
│ ├── hooks/                   # Custom React hooks
│ ├── validation/              # Zod validation schemas
│ └── helpers/                 # Pure utility functions (tested)
│
├── prisma/
│ ├── migrations/              # Migration files
│ ├── seed.ts                  # Seed script
│ └── schema.prisma            # Prisma schema
│
├── store/                     # Redux store
├── data/                      # Constant data objects
├── types/                     # TypeScript types
├── public/                    # Static assets
├── middleware.ts              # Route protection middleware
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

### Tests

- Jest + React Testing Library
- Pure utilities (phone/data helpers, validation, data mappers) are tested
- Includes happy path, boundary and negative scenarios
- Integration tests live under `tests/integration/` and cover realistic flows across routes and providers
- E2E tests are planned under `tests/e2e/` and will use a dedicated runner (e.g. Playwright), separate from Jest
- A more detailed rationale and coverage philosophy for tests is described in `TESTING.md`.

## CI

### GitHub Actions:

- install → lint → test → build
- Vercel deploy happens only if CI passes
- Prisma client is auto-generated during CI

## 12. Future Architectural Plans

### Planned features:

- User profiles (extending beyond basic authentication info)
- Favorites & deleting posts
- Comment system (interactive and linked to users)
- Image upload
- User Profile page
- New Post form improvements (including deadline input)
- And other

### Technical improvements:

- More test coverage
