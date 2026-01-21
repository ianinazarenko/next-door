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
Authentication supports **OAuth 2.0** via **Google** and **GitHub**, implemented using Auth.js.

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
Next.js Server Actions provide built-in CSRF protection by comparing the `Origin` and `Host` headers provided by the browser. This ensures that actions can only be invoked from the application's own domain, making manual CSRF token handling (like `X-CSRF-Token`) redundant for application logic.

Auth.js internally manages CSRF tokens (using the Double Submit Cookie pattern) for its specific authentication routes (`/api/auth/*`) to secure the sign-in and sign-out flows.

**Middleware Protection**
Next.js middleware (`middleware.ts`) protects private routes using matcher pattern and redirects unauthenticated users to `/api/auth/signin` with `callbackUrl` for post-login redirect.

**Callback URL Safety**
All auth redirects use `getSafeCallbackUrl()` utility to prevent open redirect vulnerabilities:
- Validates that redirect URLs belong to the same origin
- Blocks protocol-relative URLs (`//evil.com`)
- Falls back to safe default if validation fails

**RBAC Foundation**
The `User` model includes a `role` field (default: `"user"`) and session includes role data. This infrastructure is prepared for future features.

**Account Linking Trade-offs & Security**
- **Selective Auto-linking**: Enabled for Google (`allowDangerousEmailAccountLinking: true`) as a trusted Tier-1 Identity Provider, but explicitly disabled for GitHub.
- **Defense in Depth**: Strict email verification is enforced for GitHub, while auto-linking is intentionally disabled to minimize the attack surface in case of implementation errors or API changes.
- **Verification Gate**: The `signIn` callback enforces a "Default Deny" policy and strictly validates `email_verified` (via API check for GitHub) before allowing access.
- **Pragmatic UX**: Priority is given to seamless Google login while accepting the calculated risk of account linking for a better user experience in the MVP.


### 2.5 Hybrid Session Management

NextDoor uses a **hybrid approach** to session access, balancing performance, SSG/ISR preservation, and security.
Public routes avoid server-side session access to preserve SSG/ISR, while auth-aware UI is handled on the client.

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

### 3.1 Prisma Models

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

## 5. Forms Architecture & Input Sanitization

**React Hook Form + Zod**

**Chosen because:**
- Declarative validation
- Schema-based type inference
- Minimal re-renders
- Seamless integration with Server Actions

The project uses **React Hook Form + Zod** with mandatory server-side validation and sanitization.  
Form handling follows a **defense-in-depth** approach with clear responsibility boundaries: the client focuses on UX, while the server is the sole authority for security and data integrity.

### Client-Side Validation (UX Layer)

Client-side Zod schemas provide structural validation and immediate feedback.  
A lightweight HTML tag detection helper (`hasHtmlTags`) catches common cases (e.g. `<b>`, `<script>`) to prevent accidental submission and improve UX.

This check is **not a security mechanism**. It is intentionally lightweight to avoid increasing the client bundle size. Client-side validation is advisory and may be bypassed without security impact.

### Server Actions as the Mutation Boundary

All form submissions are handled exclusively via **Server Actions**, which serve as the single mutation boundary.  
No data reaches persistence layers without passing through server-side controls.

### Server-Side Sanitization & Re-validation

On the server, all text inputs are sanitized using `sanitize-html` **before validation**, with a strict configuration:

- `allowedTags: []` — text-only input, all HTML stripped

After sanitization, data is **re-validated with Zod** to enforce business rules, accounting for possible content changes introduced by sanitization.  
Only sanitized and validated data is written to the database via Prisma.

This step represents the authoritative security boundary against XSS and malformed input.

### Schema Separation

Validation schemas are deliberately split:

- `utils/validation/schemas.ts` — client-side schemas (UX-oriented)
- `lib/validation/server-schemas.ts` — server-side schemas extending client schemas with sanitization and authoritative validation

This separation makes explicit that **security does not rely on the client**, while preserving a responsive user experience.

### Guest Access for Post Creation

The `/posts/new` page is publicly accessible to allow users to view the post creation form.  
Submission is disabled on the client, and the corresponding Server Action (`createPostAction`) enforces a mandatory server-side session check.

Post creation is therefore impossible without authentication, even if client-side restrictions are bypassed.

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
│ ├── auth/                    # NextAuth config + session utilities
│ └── validation/              # Server-side schemas + sanitization
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

Exception: NextAuth requires a route handler for OAuth callbacks under `app/api/auth/[...nextauth]/`.

This reflects the recommended pattern for modern Next.js applications.

## 11. Testing Architecture

### Tests

- Jest + React Testing Library
- Pure utilities (phone/data helpers, validation, data mappers) are tested
- Includes happy path, boundary and negative scenarios
- Unit and module tests are colocated under `**/__tests__/**` (actions, queries, validation, utils)
- Shared fixtures live under `tests/__fixtures__/`
- Integration tests are planned under `tests/integration/`
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
