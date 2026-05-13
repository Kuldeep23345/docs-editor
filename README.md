<div align="center">
  <h1>📝 Collaborative Document Editor</h1>
  <p><em>A powerful, real-time collaborative document editor built with modern web technologies.</em></p>

  [![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![Tiptap](https://img.shields.io/badge/Tiptap-Editor-black?style=for-the-badge)](https://tiptap.dev/)
  [![Liveblocks](https://img.shields.io/badge/Liveblocks-Collaboration-blue?style=for-the-badge)](https://liveblocks.io/)
  [![Convex](https://img.shields.io/badge/Convex-Database-orange?style=for-the-badge)](https://www.convex.dev/)
  [![Clerk](https://img.shields.io/badge/Clerk-Auth-6C47FF?style=for-the-badge)](https://clerk.com/)
</div>

<br />

This application allows multiple users to edit rich text documents simultaneously, see each other's cursors, and manage document metadata. It is powered by a robust backend and authentication system, ensuring secure and seamless collaboration.

---

## 🚀 Features

- **Real-Time Collaboration**: Edit documents with multiple users simultaneously, with live cursor tracking, presence indicators, and comment threads.
- **Rich Text Editing**: Advanced formatting options including bold, italic, underline, text color, highlight color, text alignment, lists, line height, font family, headings, and image insertion (with resizing capabilities).
- **Authentication & Authorization**: Secure user login and organization management via Clerk. Documents are scoped securely to individual users or organizations.
- **Document Management**: Create, rename, delete, and search through documents from a modern dashboard interface.
- **Responsive UI**: A beautiful, accessible, and modern interface built with Tailwind CSS and Radix UI primitives.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (v16, App Router, React 19)
- **Rich Text Editor**: [Tiptap](https://tiptap.dev/)
- **Real-Time Engine**: [Liveblocks](https://liveblocks.io/)
- **Database**: [Convex](https://www.convex.dev/)
- **Authentication**: [Clerk](https://clerk.com/)
- **Styling & UI Components**: Tailwind CSS, [shadcn/ui](https://ui.shadcn.com/), Radix UI, Lucide React
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)

---

## 🏛️ Architecture

The application uses a hybrid architecture, splitting responsibilities between persistent structured data and ephemeral real-time state to maximize performance and scalability.

```mermaid
graph TD;
    Client[Client Browser] <-->|Real-time Yjs Sync (WebSockets)| Liveblocks[Liveblocks Edge];
    Client <-->|Queries & Mutations (HTTP/WS)| Convex[(Convex Database)];
    Client <-->|Authentication| ClerkAuth[Clerk Auth];
    
    Liveblocks -.->|Webhook/Auth Verify| NextAPI[Next.js API Routes];
    NextAPI <--> ClerkAuth;
```

### 1. Database Schema (Convex)
Convex is used as the primary serverless database to store document metadata. The schema is defined in `convex/schema.ts` and includes a `documents` table:
- **`title`**: String representing the document name.
- **`initialContent`**: Optional string for the document's starting text.
- **`ownerId`**: String identifying the user who created the document.
- **`organizationId`**: Optional string for scoping the document to a Clerk organization.
- **Indices & Search**: Fast retrieval is optimized using exact match indices (`by_owner_id`, `by_organization_id`) and a `search_title` index that enables high-performance full-text search across document titles.

### 2. API & Data Access Layer
The Convex backend exposes strongly-typed Serverless Functions (Queries and Mutations) in `convex/document.ts`:
- **Mutations**: `create`, `updateById`, `removeById` handle data modifications securely by verifying the user's Clerk identity before executing.
- **Queries**: `getDocuments`, `getById`, `getByIds` fetch data and handle cursor-based pagination and search filtering.

### 3. Real-Time Syncing (Liveblocks)
While Convex handles the document metadata, **Liveblocks** is responsible for the actual document content and collaboration features:
- **Yjs CRDT**: Under the hood, Liveblocks powers the Tiptap collaboration extension using Yjs, ensuring conflict-free resolution of simultaneous edits.
- **Presence & Threads**: Liveblocks tracks user presence (rendering active avatars and cursors) and manages inline comment threads within the editor.
- **Authentication Bridge**: The Next.js API route (`/api/liveblocks-auth`) acts as the bridge, verifying a user's session with Clerk and issuing secure access tokens for Liveblocks rooms based on the Convex document ID.

---

## 📂 Project Structure

```text
├── convex/                # Backend database schema and serverless functions
├── src/
│   ├── app/               # Next.js App Router pages and API routes
│   │   ├── (home)/        # Dashboard and document listing
│   │   ├── documents/     # The core collaborative editor
│   │   └── api/           # Webhooks and auth endpoints
│   ├── components/        # Reusable UI components (shadcn/ui)
│   ├── store/             # Zustand state management
│   ├── lib/               # Utility functions and configurations
│   └── constants/         # Magic numbers, default margins, etc.
```

---

## 📦 Getting Started

### Prerequisites
- Node.js (v20+)
- Bun (or npm/yarn/pnpm)
- Active accounts/projects for **Clerk**, **Convex**, and **Liveblocks**

### Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd docs_edit
   ```

2. **Install dependencies:**
   ```bash
   bun install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory. You must add the necessary API keys and URLs for Next.js, Clerk, Convex, and Liveblocks.
   
   Here is a list of the required variables (you can also refer to `.env.example`):
   ```env
   # Convex Deployment & Endpoints
   CONVEX_DEPLOYMENT=
   NEXT_PUBLIC_CONVEX_URL=
   NEXT_PUBLIC_CONVEX_SITE_URL=

   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=
   
   # Liveblocks Collaboration
   NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY=
   LIVEBLOCKS_SECRET_KEY=
   ```

4. **Run the development servers:**
   You will need to start both the Next.js frontend and the Convex backend concurrently:
   ```bash
   # In terminal 1 (Frontend):
   bun run dev

   # In terminal 2 (Backend):
   bun convex dev
   ```

5. **Open the App:**
   Visit [http://localhost:3000](http://localhost:3000) in your browser to begin collaborating.

---


