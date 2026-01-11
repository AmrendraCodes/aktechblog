import axios from 'axios';

const API_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';

interface StrapiResponse<T> {
  data: T;
  meta?: any;
}

export const strapiService = {
  getArticles: async (): Promise<StrapiResponse<any[]>> => {
    const response = await axios.get(`${API_URL}/api/articles?populate=*`);
    return response.data;
  },

  getArticleBySlug: async (slug: string): Promise<StrapiResponse<any[]>> => {
    const response = await axios.get(
      `${API_URL}/api/articles?filters[slug][$eq]=${slug}&populate=*`
    );
    return response.data;
  },
};