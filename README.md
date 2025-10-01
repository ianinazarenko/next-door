# NextDoor — Help is Next Door

NextDoor is a **Next.js** web app designed to bring neighbors closer together inside residential complexes (RCs). It combines a classifieds board for residents and useful information about each complex.  
The goal is to make it easier for people to offer help, find help, and stay informed about what’s happening nearby.

This is a **demo MVP** version of the project — already functional, but planned to grow with more features and a richer UI.

## Features
- Public pages for complexes (description + useful contacts)
- Posts feed with categories (buy / sell / give away / help / event) and a simple filter by complexes
- Post details with comments (read-only in MVP)
- Create post without registration (author name + phone / WhatsApp)

## Technology Stack

### **Frontend**
- **Next.js (App Router)** – server-side rendering and routing
- **React** – main UI library
- **Tailwind CSS** – utility-based styling
- **Headless UI** – accessible UI primitives (unstyled)
- **Redux Toolkit** – global state management (selected complex, user placeholders)
- **React Context** – UI state like theme (light / dark / system)
- **CSS Modules** – isolated component styles
- **React Hook Form + Zod** – form handling and schema-based validation

### **Backend**
- **Prisma ORM** – type-safe database access
- **Vercel Postgres** – cloud hosted SQL database
- **Direct DB access in Server Components** – used for GET requests (SSR/ISR), most modern pattern
- **Server Actions** – used for POST/PUT data mutations (e.g. creating posts)

## Key Architectural Decisions

- **Rendering Strategy**
**Server Components with direct database access** are used for data fetching.  
    This is the most modern and idiomatic pattern in Next.js 15, giving better performance, SSR out of the box, and simpler code compared to API Routes.
**Server Actions** are used for data mutations (POST/PUT/DELETE).
**ISR** is used for static pages that rarely change (e.g., residential complex descriptions).

- **State Management**  
  **Redux Toolkit** is used for global state management (selected complex, user placeholders). 
  **React Context** is used for theme management (light/dark/system) as it is simple, rarely changing global state.
  These two kinds of state (UI / bussiness logic) are separated from each other to make the code more modular and readable.
  **Redux Toolkit** — installed but intentionally not used in the MVP.  
  In Next.js 15, **Server Components** and **Server Actions** already cover most responsibilities Redux would normally handle.  
  Redux is kept as a foundation for future features (e.g., user profiles) and can be expanded at any point.

- **Data Fetching**  
  All **GET requests** are handled via **direct database access inside Server Components**.  
  This approach:
    - provides full SSR support without extra network calls
    - improves performance
    - follows the idiomatic App Router pattern (no need to create REST endpoints just for internal use)
    - **is considered the most modern recommended pattern in Next.js 15**  
      **POST/PUT** requests are implemented via **Server Actions** and used in forms (e.g. create post).

- **Database Design (MVP)**  
  Contact information (author name / phone / WhatsApp) is stored directly in the `Post` model in the MVP.  
  Later this will be moved into a separate `User` model and connected via relations.

- **Styling Approach**  
  **Tailwind CSS** + **Headless UI** are used together to quickly build accessible and customizable UI components.  
  **CSS Modules** are used for styling other components that require full control over layout and custom styles.

## Notes

- Some images in this project are loaded from [Picsum.photos](https://picsum.photos/) as placeholders.
- They are random and used for demonstration purposes only.

## Roadmap / Future Plans

- Add user authentication and personal profiles (replace authorName/phone fields with `User` relation)
- Enable users to comment and respond to posts directly from the UI
- Add post deletion and “Add to favorites” functionality
- Add image upload support for posts
- Improve search and filtering (by category + keyword + complex)
- Modularize residential complex pages (features, infrastructure, admin news)

## Demo

The current MVP version is available on Vercel:  
👉 **https://next-door-six.vercel.app**  
