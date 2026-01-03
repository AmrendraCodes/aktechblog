# Strapi me Blog Post kaise add/update karein (Hindi)

- Strapi Admin panel open karein (Railway URL par): `https://<aapka-railway-domain>/admin`
- Pehli baar account banaiye (email + password). Baad me isi se login hoga.

## Naya Post banana
1. Left sidebar me Content Manager → Post par click.
2. Create new entry.
3. Title likhiye. Slug khud ban jayega.
4. Excerpt (short summary) likhiye.
5. Content me full blog likhiye (rich text editor).
6. Cover image upload karein (Cloudinary me store hoga automatically).
7. Category select karein, Tags optional.
8. Top-right se Publish kar dijiye.

## Post update karna
- Post list me se koi bhi entry open kijiye, changes karein, Save/Publish kijiye.

## Frontend par dikhna
- Vercel par aapka Next.js site automatically Strapi se data fetch karta hai. Publish karte hi list me aayega.

Agar koi dikkat ho:
- CORS error: humne `middlewares.ts` me `https://aktechblog.vercel.app` allow kiya hai. Agar domain badle to yahan update karna hoga.
- Image nahi aa rahi: Cloudinary credentials check karein.
- Slug ke through page open nahi ho raha: Public role me permissions enable karein.
