# Deployment Guide

Deploy the blog app in this order: **MongoDB Atlas → Render (API) → Vercel (frontend)**.

Repository: https://github.com/mahakumar197/blog-app

---

## Step 1: MongoDB Atlas (Database)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) and create a free account.
2. Create a **free M0 cluster** (any cloud provider/region).
3. **Database Access** → Add user:
   - Username: `blogapp`
   - Password: generate a strong password (save it)
4. **Network Access** → Add IP Address → **Allow Access from Anywhere** (`0.0.0.0/0`)
   - Required for Render cloud hosting
5. **Database** → **Connect** → **Drivers** → copy connection string:
   ```
   mongodb+srv://blogapp:<password>@cluster0.xxxxx.mongodb.net/blog-app?retryWrites=true&w=majority
   ```
6. Replace `<password>` with your actual password.

Save this as your `MONGODB_URI`.

---

## Step 2: Render (Backend API)

1. Go to [Render Dashboard](https://dashboard.render.com/) and sign in with GitHub.
2. Click **New +** → **Blueprint**.
3. Connect repository: `mahakumar197/blog-app`
4. Render detects `render.yaml` automatically.
5. Set environment variables when prompted:

   | Key | Value |
   |-----|-------|
   | `MONGODB_URI` | Your Atlas connection string from Step 1 |
   | `CLIENT_URL` | Leave blank for now (set after Vercel deploy) |

6. Click **Apply** and wait for deploy (~3–5 min).
7. Copy your API URL, e.g.:
   ```
   https://blog-app-api.onrender.com/graphql
   ```
8. Test health endpoint:
   ```
   https://blog-app-api.onrender.com/health
   ```
   Should return: `{"status":"ok"}`

---

## Step 3: Vercel (Frontend)

1. Go to [Vercel New Project](https://vercel.com/new).
2. Import `mahakumar197/blog-app` from GitHub.
3. Configure project:

   | Setting | Value |
   |---------|-------|
   | Framework Preset | Vite |
   | Root Directory | `client` |
   | Build Command | `npm run build` |
   | Output Directory | `dist` |

4. Add environment variable:

   | Key | Value |
   |-----|-------|
   | `VITE_GRAPHQL_URL` | `https://blog-app-api.onrender.com/graphql` |

   Use your actual Render URL from Step 2.

5. Click **Deploy** (~1–2 min).
6. Copy your Vercel URL, e.g.:
   ```
   https://blog-app.vercel.app
   ```

---

## Step 4: Finalize CORS

1. Go back to **Render** → your `blog-app-api` service → **Environment**.
2. Set `CLIENT_URL` to your Vercel URL:
   ```
   https://blog-app.vercel.app
   ```
3. Save changes (Render will redeploy automatically).

> Vercel preview URLs (`*.vercel.app`) are already allowed by the API.

---

## Step 5: Verify Live Demo

1. Open your Vercel URL in a browser.
2. Submit a test blog post via the form.
3. Confirm the post appears in the list.
4. Refresh the page — post should persist (MongoDB Atlas).

### Quick API test

```bash
curl -X POST https://blog-app-api.onrender.com/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ posts { title content } }"}'
```

---

## Environment Variables Summary

### Render (`blog-app-api`)

| Variable | Required | Example |
|----------|----------|---------|
| `MONGODB_URI` | Yes | `mongodb+srv://user:pass@cluster.../blog-app` |
| `CLIENT_URL` | Recommended | `https://blog-app.vercel.app` |
| `PORT` | Auto-set by Render | — |

### Vercel (`client`)

| Variable | Required | Example |
|----------|----------|---------|
| `VITE_GRAPHQL_URL` | Yes | `https://blog-app-api.onrender.com/graphql` |

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| API returns CORS error | Set `CLIENT_URL` on Render to your exact Vercel URL |
| `MongoDB connection error` | Check Atlas IP whitelist (`0.0.0.0/0`) and password in URI |
| Frontend shows "Unable to load posts" | Verify `VITE_GRAPHQL_URL` on Vercel, redeploy frontend |
| Render service sleeps (free tier) | First request after idle takes ~30s — normal on free plan |
| GraphQL 404 | Ensure URL ends with `/graphql` |

---

## Update README Live Demo Links

After deployment, update `README.md`:

```markdown
## Live Demo

- Frontend: https://blog-app.vercel.app
- API: https://blog-app-api.onrender.com/graphql
```

Then commit and push to GitHub.
