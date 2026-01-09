# NextDoor — Help is Next Door

NextDoor is a **Next.js** web app designed to bring neighbors closer together inside residential complexes (RCs). It combines a classifieds board for residents and useful information about each complex.  
The goal is to make it easier for people to offer help, find help, and stay informed about what’s happening nearby.

This is a **demo MVP** version — fully functional but intentionally minimalistic, focused on showcasing clean architecture, modern Next.js patterns, and thoughtful UX.

## Features
- Public pages for residential complexes (descriptions + contacts)
- Posts feed with categories (buy / sell / give away / help / events)
- Filter posts by complex or category
- Post details with comments (read-only in MVP)
- Secure authentication via GitHub (OAuth)
- User-specific post creation (posts are linked to authors)

## Technology Stack

### **Frontend**
- **Next.js (App Router)** – server-side rendering and routing
- **React 19** – main UI library
- **Tailwind CSS** – utility-based styling
- **Headless UI** – accessible, unstyled primitives
- **Redux Toolkit** – global state management (prepared for future use)
- **React Context** – UI state like theme (light / dark / system)
- **CSS Modules** – isolated component styles
- **React Hook Form + Zod** – form handling and schema-based validation
- **Auth.js** – session-based auth
 
### **Backend**
- **Prisma ORM** – type-safe database access
- **Vercel Postgres** – cloud hosted SQL database
- **Direct DB access in Server Components** – or all GET requests (no REST endpoints — fully SSR/ISR)
- **Server Actions** – used for POST/PUT/DELETE data mutations (e.g. creating posts and other future features)

## Key Architectural Decisions

### Rendering Strategy
- **Server Components** handle data fetching directly from the database — the idiomatic Next.js 15 approach.
  This provides instant SSR, fewer network hops, and simpler logic.
- **Server Actions** are used for data mutations.
- **ISR** is used for static pages that rarely change (e.g., residential complexes).

### State Management  
- **Redux Toolkit** is installed but intentionally unused in the MVP.
  In Next.js 15, Server Components and Server Actions already handle most global state responsibilities.
  Redux remains as groundwork for future features (e.g., user profiles). 
- **React Context** manages light/dark/system theme — simple and efficient.
  
### Data Fetching  
- All **GET** requests use direct database access from **Server Components**.
- This:
  - Enables full SSR without extra network layers
  - Improves performance and maintainability
  - Follows Next.js best practices
  - POST/PUT handled by Server Actions (e.g., post creation form).

### Database Design  
  •	Author information (name, phone, WhatsApp) is now stored in a dedicated `User` model with proper relations to `Post` and `Comment` models. This allows for user authentication and better data normalization.

### Styling Approach
- Tailwind CSS + Headless UI for flexibility and accessibility.
- CSS Modules for unique layouts and custom effects.

## Notes

- Some demo images are fetched from [Picsum.photos](https://picsum.photos/) and are **random placeholders**. This keeps the layout dynamic without hardcoding assets.

## Roadmap / Future Plans

- User profiles (beyond basic auth info)
- Enable interactive comments and responses (now linked to users)
- Add post deletion & favorites
- Support image uploads for posts
- Advanced filtering and search (category + keyword + complex)
- Expand residential complex pages (features, news, community board)

## Demo

The current MVP version is available on Vercel:  
👉 **https://next-door-six.vercel.app**  

## Installation & Local Setup

This project uses **Vercel Postgres** as its primary database.  
The `.env` file is **not included** for security reasons, so the app will not connect to the database out of the box.

### If you’d like to run it locally, follow these steps:

1. Clone the repository
```bash
git clone https://github.com/ianina-dev/next-door.git
cd next-door
```

2. Install dependencies
```bash
npm install
```

3. Create your own database
Set up a PostgreSQL database (locally or via a cloud provider like Vercel Postgres or Supabase).


4. Add environment variables
Create a `.env` file in the project root and include at least:
```
DATABASE_URL="your_postgres_connection_string"

AUTH_SECRET="your_generated_secret_key"
AUTH_GITHUB_ID="your_github_oauth_client_id"
AUTH_GITHUB_SECRET="your_github_oauth_client_secret"
```

To use Prisma commands such as migrations or seeding, you can also add:
```
SHADOW_DATABASE_URL="your_shadow_db_connection_string"
```

5. Run database migrations and seed
```bash
npx prisma migrate deploy
npx prisma db seed
```

6. Start the development server
```bash
npm run dev
```

Your app will be available at http://localhost:3000
> **Note:** Without a valid database connection, the app cannot fetch or display data (e.g. posts, complexes).
> This repository is meant primarily as a demo portfolio project, so the deployed version on Vercel provides the best experience.
