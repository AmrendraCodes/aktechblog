const STRAPI_URL = import.meta.env.VITE_STRAPI_URL;

export interface Article {
  id: number;
  attributes: {
    title: string;
    description: string;
    content: string;
    slug: string;
    publishedAt: string;
    cover?: {
      data?: {
        attributes: {
          url: string;
        };
      };
    };
  };
}

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

    const response = await fetch(
      `${STRAPI_URL}/api/articles?populate=cover&sort=publishedAt:desc`,
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
