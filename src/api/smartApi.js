// Smart API - Works both locally and on Vercel
import axios from 'axios';

// Detect environment
const isDevelopment = import.meta.env.DEV;

// Strapi base URL (direct)
const STRAPI_BASE_URL = 'https://genuine-fun-ae6ecdb902.strapiapp.com/api';

// Axios instance
const api = axios.create({
  baseURL: STRAPI_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const smartApi = {
  // ✅ Fetch articles WITH images
  async getArticles(page = 1, pageSize = 6) {
    try {
      const apiToken = import.meta.env.VITE_STRAPI_API_TOKEN;

      const params = new URLSearchParams({
        populate: 'cover',                 // 🔥 MOST IMPORTANT
        sort: 'publishedAt:desc',
        'pagination[page]': page.toString(),
        'pagination[pageSize]': pageSize.toString(),
        publicationState: 'live',
      });

      const response = await api.get(`/articles?${params.toString()}`, {
        headers: apiToken
          ? { Authorization: `Bearer ${apiToken}` }
          : {},
      });

      // 🔍 DEBUG LOG
      console.log('✅ Strapi articles loaded:', response.data.data.length);
      console.log('🔍 First raw article:', response.data.data[0]);

      // ✅ TRANSFORM DATA (KEEP IMAGE)
      const transformed = response.data.data.map((item) => {
        const cover = item.cover || null;

        const image =
          cover?.formats?.medium?.url ||
          cover?.formats?.small?.url ||
          cover?.url ||
          null;

        return {
          id: item.id,
          title: item.title,
          slug: item.slug,
          description: item.description,
          publishedAt: item.publishedAt,

          // ✅ IMPORTANT FIELDS FOR UI
          cover,
          image,
        };
      });

      return {
        data: transformed,
        meta: response.data.meta,
      };
    } catch (error) {
      console.error('❌ smartApi error, using fallback:', error.message);
      return this.getFallbackData();
    }
  },

  // ✅ Fallback data (also FIXED)
  getFallbackData() {
    return {
      data: [
        {
          id: 1,
          title: 'Fallback Article',
          slug: 'fallback-article',
          description: 'This is fallback content',
          publishedAt: new Date().toISOString(),
          image:
            'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
          cover: {
            url:
              'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
          },
        },
      ],
      meta: {
        pagination: {
          page: 1,
          pageSize: 6,
          pageCount: 1,
          total: 1,
        },
      },
    };
  },
};

export default smartApi;
