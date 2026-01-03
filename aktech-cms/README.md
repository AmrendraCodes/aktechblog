# aktech-cms (Strapi v4)

Production-ready Strapi CMS for AK Tech Blog.

## Scripts
- npm run develop
- npm run build
- npm run start

## Config Highlights
- Database: SQLite (local), PostgreSQL (production) with SSL toggle
- Uploads: Cloudinary provider
- CORS: allows localhost:3000 and aktechblog.vercel.app
- Custom route: GET /api/posts/slug/:slug → single post by slug

## Env
See `.env.example`.

## Deploy
Follow `deployment-guide.md`.
