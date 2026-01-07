// Smart API - Works both locally and on Vercel
import axios from "axios";

// Strapi base URL
const STRAPI_BASE_URL = "https://genuine-fun-ae6ecdb902.strapiapp.com/api";

// Axios instance
const api = axios.create({
  baseURL: STRAPI_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const smartApi = {
  /* -------------------------------------------------- */
  /* 🔥 GET ALL ARTICLES (LIST PAGE) */
  /* -------------------------------------------------- */
  async getArticles(page = 1, pageSize = 6) {
    try {
      const apiToken = import.meta.env.VITE_STRAPI_API_TOKEN;

      const params = new URLSearchParams({
        populate: "cover",
        sort: "publishedAt:desc",
        "pagination[page]": page.toString(),
        "pagination[pageSize]": pageSize.toString(),
        publicationState: "live",
      });

      const response = await api.get(`/articles?${params.toString()}`, {
        headers: apiToken
          ? { Authorization: `Bearer ${apiToken}` }
          : {},
      });

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
          cover,
          image,
        };
      });

      return {
        success: true,
        articles: transformed,
        meta: response.data.meta,
      };
    } catch (error) {
      console.error("❌ getArticles failed:", error.message);
      return {
        success: false,
        articles: [],
        meta: null,
      };
    }
  },

  /* -------------------------------------------------- */
  /* 🔥 GET SINGLE ARTICLE BY SLUG (DETAIL PAGE) */
  /* -------------------------------------------------- */
  async getArticleBySlug(slug) {
    try {
      const apiToken = import.meta.env.VITE_STRAPI_API_TOKEN;

      const params = new URLSearchParams({
        "filters[slug][$eq]": slug,
        populate: "cover",
        publicationState: "live",
      });

      const response = await api.get(`/articles?${params.toString()}`, {
        headers: apiToken
          ? { Authorization: `Bearer ${apiToken}` }
          : {},
      });

      if (!response.data.data.length) {
        return { success: false, article: null };
      }

      const item = response.data.data[0];
      const cover = item.cover || null;

      const image =
        cover?.formats?.large?.url ||
        cover?.formats?.medium?.url ||
        cover?.url ||
        null;

      return {
        success: true,
        article: {
          id: item.id,
          title: item.title,
          slug: item.slug,
          description: item.description,
          publishedAt: item.publishedAt,
          cover,
          image,
        },
      };
    } catch (error) {
      console.error("❌ getArticleBySlug failed:", error.message);
      return { success: false, article: null };
    }
  },
};

export default smartApi;
