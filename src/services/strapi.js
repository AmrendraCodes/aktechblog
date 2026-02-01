// src/services/strapi.js

import axios from 'axios';

const API_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';

export const strapiService = {
  // Get all articles
  getArticles: async (page = 1, limit = 10) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/articles?populate=*&pagination[page]=${page}&pagination[pageSize]=${limit}&sort=publishedAt:desc`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching articles:', error);
      throw error;
    }
  },

  // Get article by slug
  getArticleBySlug: async (slug) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/articles?filters[slug][$eq]=${slug}&populate=*`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching article by slug:', error);
      throw error;
    }
  },
};