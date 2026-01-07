import { Article } from '../types/article';

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL;

interface StrapiResponse {
  data: Article[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export const getArticles = async (): Promise<Article[]> => {
  try {
    if (!STRAPI_URL) {
      throw new Error('VITE_STRAPI_URL is not defined in environment variables');
    }

    const params = new URLSearchParams({
      'fields[0]': 'title',
      'fields[1]': 'slug',
      'fields[2]': 'description',
      'fields[3]': 'publishedAt',
      'fields[4]': 'hasFeaturedImage',

      // ✅ THIS IS THE KEY FIX - Properly populate cover with all formats
      'populate[cover]': 'true',

      'sort[0]': 'publishedAt:desc',
      'pagination[page]': '1',
      'pagination[pageSize]': '6',
      'publicationState': 'live'
    });

    const response = await fetch(
      `${STRAPI_URL}/api/articles?${params.toString()}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: StrapiResponse = await response.json();
    return (data?.data || []).filter(article => article != null);
  } catch (error) {
    console.error('Error fetching articles from Strapi:', error);
    throw error;
  }
};
