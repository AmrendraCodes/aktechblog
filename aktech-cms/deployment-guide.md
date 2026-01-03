# Strapi CMS (aktech-cms) Deployment Guide – Railway

- Hindi hints are included inline to keep things easy. Copy-paste steps and you’re done.

## 1) Prerequisites
- GitHub repo with this folder `aktech-cms/` committed.
- Cloudinary account (free) – for images.

## 2) Cloudinary Setup (once)
- Create an account at https://cloudinary.com/
- Get these values from Dashboard:
  - CLOUDINARY_CLOUD_NAME
  - CLOUDINARY_API_KEY
  - CLOUDINARY_API_SECRET

## 3) Railway: Create Postgres + Strapi Service
- Go to https://railway.app/ and create a new project.
- Add a PostgreSQL database plugin.
- Add a New Service → Deploy from GitHub → pick your repo.
- Set service root to `aktech-cms` if Railway asks.

### Environment Variables (Service → Variables)
Paste and fill from `.env.example`:
- APP_KEYS
- API_TOKEN_SALT
- ADMIN_JWT_SECRET
- JWT_SECRET
- PUBLIC_URL = https://<your-railway-domain>
- NODE_ENV = production
- PORT = 1337
- CLOUDINARY_CLOUD_NAME / CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET
- DATABASE_HOST, DATABASE_PORT=5432, DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_SSL=true

Tips:
- From the Railway Postgres plugin page, copy host, db name, user, password. Paste them in your Strapi service variables.

## 4) Build & Deploy
- Railway auto-builds using Dockerfile in `aktech-cms/`.
- On first deploy, open Strapi URL → Complete admin setup.

## 5) Strapi Permissions
- In Strapi Admin → Settings → Users & Permissions Plugin → Roles → Public
- Enable permissions to read `post` (find, findOne and custom `GET /posts/slug/:slug`). Save.

## 6) Connect Frontend (Next.js on Vercel)
- In the frontend `.env`, set:
  - NEXT_PUBLIC_CMS_URL=https://<your-railway-domain>
- Re-deploy Vercel.

## 7) Weekly Updates – Simple Flow
- Login to Strapi admin.
- Content Manager → Post → Create New → Fill Title (slug auto), Excerpt, Cover image (Cloudinary), Content, etc. Save → Publish.
- Frontend will show the new post automatically.

## Troubleshooting
- 502 or 504 on Railway: check logs; ensure DB variables are correct and `DATABASE_SSL=true`.
- Images not loading: ensure Cloudinary credentials are correct.
- CORS error on frontend: make sure `PUBLIC_URL` is set and `middlewares.ts` allows your Vercel domain.
