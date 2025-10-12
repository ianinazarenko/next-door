# NextDoor — Help is Next Door

NextDoor is a **Next.js** web app designed to bring neighbors closer together inside residential complexes (RCs). It combines a classifieds board for residents and useful information about each complex.  
The goal is to make it easier for people to offer help, find help, and stay informed about what’s happening nearby.

This is a **demo MVP** version — fully functional but intentionally minimalistic, focused on showcasing clean architecture, modern Next.js patterns, and thoughtful UX.

## Features
- Public pages for residential complexes (descriptions + contacts)
- Posts feed with categories (buy / sell / give away / help / events)
- Filter posts by complex or category
- Post details with comments (read-only in MVP)
- Create a post without registration (author name + phone / WhatsApp)

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

### Database Design (MVP)  
  •	Author info (name, phone, whatsApp) stored directly in `Post` model. Later will be moved into a `User` model with relations.

### Styling Approach
- Tailwind CSS + Headless UI for flexibility and accessibility.
- CSS Modules for unique layouts and custom effects.

## Notes

- Some demo images are fetched from [Picsum.photos](https://picsum.photos/) and are **random placeholders**. This keeps the layout dynamic without hardcoding assets.

## Roadmap / Future Plans

- Add authentication and user profiles (replace author info with User relation)
- Enable interactive comments and responses
- Add post deletion & favorites
- Support image uploads for posts
- Advanced filtering and search (category + keyword + complex)
- Expand residential complex pages (features, news, community board)

## Demo

The current MVP version is available on Vercel:  
👉 **https://next-door-six.vercel.app**  
