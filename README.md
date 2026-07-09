# Blog App

A full-stack blog application built with **React**, **Node.js**, **GraphQL**, and **MongoDB**.

## Repository

**GitHub:** https://github.com/KiruthikaSelvam27/fullstack-blog-app

---

## Application Links (Local)

| Service | URL | Description |
|---------|-----|-------------|
| **Frontend (React)** | http://localhost:5173 | Blog homepage — view & add posts |
| **GraphQL API** | http://localhost:4000/graphql | Apollo Server GraphQL endpoint (POST) |
| **Apollo Sandbox** | https://studio.apollographql.com/sandbox/explorer | Test queries in browser (point to local URL) |
| **Health Check** | http://localhost:4000/health | API status check |
| **MongoDB (local)** | `mongodb://127.0.0.1:27017/blog-app` | Local database connection |
| **MongoDB (Docker)** | `mongodb://127.0.0.1:27017/blog-app` | Same URI when using docker-compose |
| **MongoDB (in-memory)** | `memory` | No install needed — for quick local testing |

---

## Features

- View all blog posts with title, content, and publish date
- Add new posts via a validated form
- GraphQL API for fetching and creating posts
- MongoDB persistence with Mongoose
- Responsive layout for mobile, tablet, and desktop

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React, Vite, Apollo Client |
| Backend | Node.js, Express, Apollo Server |
| API | GraphQL |
| Database | MongoDB, Mongoose |
| Styling | CSS (custom responsive layout) |

---

## Project Structure

```
blog-app/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Header, PostList, AddPostForm, PostCard
│   │   ├── graphql/        # GraphQL queries & mutations
│   │   └── styles/         # Responsive CSS
│   └── vite.config.js
├── server/                 # GraphQL API + MongoDB
│   ├── config/             # Database & CORS config
│   ├── graphql/            # typeDefs & resolvers
│   ├── models/             # Post Mongoose model
│   └── index.js
├── scripts/                # Test & helper scripts
├── docker-compose.yml      # Local MongoDB via Docker
└── package.json            # Root helper scripts
```

---

## Approach

The app uses a monorepo with separate `client` and `server` folders. The backend exposes a GraphQL API with two operations:

- `posts` — query to fetch all blog posts
- `createPost` — mutation to add a new post

The React frontend uses Apollo Client to communicate with the GraphQL API. During development, Vite proxies `/graphql` requests to the backend automatically.

---

## Prerequisites

- **Node.js** 18 or higher
- **npm**
- **MongoDB** — optional (can use in-memory mode without installing MongoDB)

---

## Installation & Setup

### Step 1: Clone the repository

```bash
git clone https://github.com/KiruthikaSelvam27/fullstack-blog-app
cd fullstack-blog-app
```

### Step 2: Install dependencies

```bash
npm run install:all
```

Or install separately:

```bash
cd server && npm install
cd ../client && npm install
```

### Step 3: Configure environment variables

#### Server — create `server/.env`

```bash
cd server
cp .env.example .env
```

**Option A — Quick start (no MongoDB install):**

```env
MONGODB_URI=memory
PORT=4000
```

**Option B — Local MongoDB:**

```env
MONGODB_URI=mongodb://127.0.0.1:27017/blog-app
PORT=4000
```

**Option C — Docker MongoDB:**

```bash
# From project root
docker compose up -d
```

```env
MONGODB_URI=mongodb://127.0.0.1:27017/blog-app
PORT=4000
```

**Option D — MongoDB Atlas (cloud):**

1. Create free account: https://www.mongodb.com/cloud/atlas/register
2. Create a cluster → Database Access → add user
3. Network Access → Allow from anywhere (`0.0.0.0/0`)
4. Copy connection string and update `.env`:

```env
MONGODB_URI=mongodb+srv://blogapp:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/blog-app?retryWrites=true&w=majority
PORT=4000
```

> Replace `YOUR_PASSWORD` and `cluster0.xxxxx` with your actual Atlas credentials.

#### Client — `client/.env` (optional for local dev)

Local development works without a client `.env` file (Vite proxies to the backend).

For custom GraphQL URL:

```env
VITE_GRAPHQL_URL=http://localhost:4000/graphql
```

---

## Running the Application

Open **two terminals**:

### Terminal 1 — Start the GraphQL API server

```bash
cd blog-app/server
npm run dev
```

For in-memory MongoDB (no MongoDB install):

```bash
npm run dev:memory
```

Or from project root:

```bash
npm run dev:server
```

**Expected output:**

```
MongoDB connected
Server ready at http://localhost:4000/graphql
```

### Terminal 2 — Start the React frontend

```bash
cd blog-app/client
npm run dev
```

Or from project root:

```bash
npm run dev:client
```

**Expected output:**

```
VITE ready
Local: http://localhost:5173/
```

### Step 4: Open the app

Go to **http://localhost:5173** in your browser.

---

## Credentials & Connection Details

### MongoDB

| Setting | Value |
|---------|-------|
| Database name | `blog-app` |
| Collection | `posts` |
| Local URI | `mongodb://127.0.0.1:27017/blog-app` |
| Docker URI | `mongodb://127.0.0.1:27017/blog-app` |
| In-memory mode | Set `MONGODB_URI=memory` (no username/password) |
| Atlas URI format | `mongodb+srv://<username>:<password>@<cluster>.mongodb.net/blog-app` |

### Post Schema (MongoDB)

```javascript
{
  title: String,      // required, max 200 characters
  content: String,    // required
  createdAt: Date     // auto-generated timestamp
}
```

### GraphQL API

| Setting | Value |
|---------|-------|
| Endpoint | `http://localhost:4000/graphql` |
| Method | POST |
| Content-Type | `application/json` |
| Testing | Use [Apollo Sandbox](https://studio.apollographql.com/sandbox/explorer) with `http://localhost:4000/graphql` |

### Server Ports

| Service | Port |
|---------|------|
| GraphQL API | `4000` |
| React Frontend | `5173` |
| MongoDB (local) | `27017` |

---

## GraphQL API Reference

### Query — Get posts (paginated)

```graphql
query GetPosts {
  posts(limit: 20, offset: 0) {
    items {
      id
      title
      content
      createdAt
    }
    totalCount
    hasMore
  }
}
```

### Mutation — Create a post

```graphql
mutation CreatePost {
  createPost(
    title: "My First Post"
    content: "This is the content of my first blog post."
  ) {
    id
    title
    content
    createdAt
  }
}
```

### Test with cURL

**Fetch all posts:**

```bash
curl -X POST http://localhost:4000/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ posts(limit: 20, offset: 0) { items { id title content createdAt } totalCount hasMore } }"}'
```

**Create a post:**

```bash
curl -X POST http://localhost:4000/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"mutation { createPost(title: \"Hello World\", content: \"This is my first blog post for testing.\") { id title content createdAt } }"}'
```

**Health check:**

```bash
curl http://localhost:4000/health
```

Expected response: `{"status":"ok"}`

### Run automated API tests

```bash
./scripts/test-api.sh
```

---

## Environment Variables Reference

### Server (`server/.env`)

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `MONGODB_URI` | Yes | MongoDB connection string or `memory` | `mongodb://127.0.0.1:27017/blog-app` |
| `PORT` | No | API server port (default: 4000) | `4000` |
| `CLIENT_URL` | No | Frontend URL for CORS (production only) | `http://localhost:5173` |

### Client (`client/.env`)

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `VITE_GRAPHQL_URL` | No (local) | GraphQL endpoint URL | `http://localhost:4000/graphql` |

---

## Available Scripts

### Root (`blog-app/`)

| Command | Description |
|---------|-------------|
| `npm run install:all` | Install all dependencies (server + client) |
| `npm run dev:server` | Start API with in-memory MongoDB |
| `npm run dev:client` | Start React dev server |
| `npm run build` | Build frontend for production |

### Server (`server/`)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start server with nodemon |
| `npm run dev:memory` | Start with in-memory MongoDB |
| `npm start` | Start production server |

### Client (`client/`)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |

---

## Testing the App Locally

1. Start the server (Terminal 1) and client (Terminal 2)
2. Open http://localhost:5173
3. You should see the blog homepage with a form and post list
4. Fill in **Title** and **Content**, click **Publish Post**
5. The new post should appear in the list immediately
6. Refresh the page — the post should still be there (persisted in MongoDB)
7. Test the API with [Apollo Sandbox](https://studio.apollographql.com/sandbox/explorer) pointing to `http://localhost:4000/graphql`

### Validation Rules

- **Title:** minimum 3 characters, maximum 200 characters
- **Content:** minimum 10 characters

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| `MongoDB connection error` | Start MongoDB locally, use Docker (`docker compose up -d`), or set `MONGODB_URI=memory` |
| Frontend can't load posts | Ensure server is running on port 4000 |
| Port 4000 already in use | Change `PORT` in `server/.env` |
| Port 5173 already in use | Vite will auto-select next available port |
| CORS error | Ensure both server and client are running on default ports |
| Empty post list | Normal on first run — add a post via the form |

---

## GitHub Repository

```bash
git clone https://github.com/KiruthikaSelvam27/fullstack-blog-app.git
cd blog-app
```

**Remote:** `https://github.com/KiruthikaSelvam27/fullstack-blog-app.git`

---

## Deployment (Optional)

See [DEPLOYMENT.md](./DEPLOYMENT.md) for cloud deployment with MongoDB Atlas, Render, and Vercel.

---

## License

MIT
