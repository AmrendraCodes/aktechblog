import axios from "axios";

// 🔥 Local Strapi URL
const STRAPI_BASE_URL = "http://localhost:1337/api";

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
      const params = new URLSearchParams({
        "populate": "*",
        "sort[0]": "publishedAt:desc",
        "pagination[page]": page.toString(),
        "pagination[pageSize]": pageSize.toString(),
      });

      const response = await api.get(`/articles?${params.toString()}`);

      const transformed = response.data.data.map((item) => {
        const cover = item.cover?.data?.attributes || null;

        const image =
          cover?.formats?.medium?.url ||
          cover?.formats?.small?.url ||
          cover?.url ||
          null;

        return {
          id: item.id,
          title: item.Title,       // ✅ Capital T (Strapi field)
          slug: item.slug,
          content: item.content,
          cover,
          image: image ? `http://localhost:1337${image}` : null,
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
      const params = new URLSearchParams({
        "filters[slug][$eq]": slug,
        "populate": "*",
      });

      const response = await api.get(`/articles?${params.toString()}`);

      if (!response.data.data.length) {
        return { success: false, article: null };
      }

      const item = response.data.data[0];
      const cover = item.cover?.data?.attributes || null;

      const image =
        cover?.formats?.large?.url ||
        cover?.formats?.medium?.url ||
        cover?.url ||
        null;

      return {
        success: true,
        article: {
          id: item.id,
          title: item.Title,
          slug: item.slug,
          content: item.content,
          cover,
          image: image ? `http://localhost:1337${image}` : null,
        },
      };
    } catch (error) {
      console.error("❌ getArticleBySlug failed:", error.message);
      return { success: false, article: null };
    }
  },
};

export default smartApi;
