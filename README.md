# Blog App

A full-stack blog application built with **React**, **Node.js**, **GraphQL**, and **MongoDB**. Users can view all blog posts on the homepage and publish new posts through a responsive form.

## Live Demo

> Deploy using [DEPLOYMENT.md](./DEPLOYMENT.md), then update these links:
> - Frontend: `https://your-app.vercel.app`
> - API: `https://blog-app-api.onrender.com/graphql`

## Features

- View all blog posts with title, content, and publish date
- Add new posts via a validated form
- GraphQL API for fetching and creating posts
- MongoDB persistence with Mongoose
- Responsive layout for mobile, tablet, and desktop

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React, Vite, Apollo Client |
| Backend | Node.js, Express, Apollo Server |
| API | GraphQL |
| Database | MongoDB, Mongoose |
| Styling | CSS (custom responsive layout) |

## Project Structure

```
blog-app/
├── client/              # React frontend
├── server/              # GraphQL API + MongoDB
├── docker-compose.yml   # Local MongoDB via Docker
├── render.yaml          # Backend deployment (Render)
└── package.json         # Root helper scripts
```

## Approach

The app uses a monorepo with separate `client` and `server` folders. The backend exposes a GraphQL API with `posts` (query) and `createPost` (mutation). The React frontend uses Apollo Client to fetch and submit posts. Vite proxies `/graphql` to the backend during development.

For local development without installing MongoDB, use `npm run dev:memory` in the server folder, which runs an embedded in-memory MongoDB instance.

## Prerequisites

- Node.js 18+
- npm
- MongoDB (local, Docker, Atlas, or in-memory dev mode)

## Quick Start (No MongoDB Install)

```bash
cd blog-app
npm run install:all

# Terminal 1 - API with in-memory MongoDB
npm run dev:server

# Terminal 2 - React app
npm run dev:client
```

Open `http://localhost:5173`

## Full Local Setup

### Option A: Docker MongoDB

```bash
docker compose up -d
cd server && cp .env.example .env && npm install && npm run dev
cd ../client && npm install && npm run dev
```

### Option B: MongoDB Atlas

1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Copy your connection string into `server/.env` as `MONGODB_URI`
3. Start server and client as above

## Environment Variables

### Server (`server/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string or `memory` | `mongodb://127.0.0.1:27017/blog-app` |
| `PORT` | Server port | `4000` |
| `CLIENT_URL` | Frontend URL for CORS (production) | `https://your-app.vercel.app` |

### Client (`client/.env` — production only)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_GRAPHQL_URL` | GraphQL endpoint URL | `https://your-api.onrender.com/graphql` |

## GraphQL API

### Query all posts

```graphql
query {
  posts {
    id
    title
    content
    createdAt
  }
}
```

### Create a post

```graphql
mutation {
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

## Scripts

| Command | Description |
|---------|-------------|
| `npm run install:all` | Install server + client dependencies |
| `npm run dev:server` | Start API with in-memory MongoDB |
| `npm run dev:client` | Start React dev server |
| `npm run build` | Build frontend for production |

## Deployment

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for the full step-by-step guide (Atlas → Render → Vercel).

Quick links:
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
- [Render Blueprint](https://dashboard.render.com/) — import `mahakumar197/blog-app`
- [Vercel Import](https://vercel.com/new) — root directory: `client`

## GitHub Setup

```bash
cd blog-app
git init
git add .
git commit -m "feat: full-stack blog app with React, GraphQL, and MongoDB"
git branch -M main
git remote add origin https://github.com/mahakumar197/blog-app.git
git push -u origin main
```

## License

MIT
