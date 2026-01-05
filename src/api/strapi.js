import axios from 'axios';

// Strapi API configuration
const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';
const API_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN;

// Create axios instance with optimized configuration
const strapiApi = axios.create({
  baseURL: `${STRAPI_URL}/api`,
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json',
    ...(API_TOKEN && { 'Authorization': `Bearer ${API_TOKEN}` })
  }
});

// Optimized API endpoints
export const strapiEndpoints = {
  articles: {
    // Fetch articles with ONLY required fields
    getArticles: (page = 1, pageSize = 6) => {
      const params = new URLSearchParams({
        'fields[0]': 'title',
        'fields[1]': 'slug', 
        'fields[2]': 'publishedAt',
        'populate[cover][fields][0]': 'url',
        'populate[cover][fields][1]': 'alternativeText',
        'sort[0]': 'publishedAt:desc',
        'pagination[page]': page.toString(),
        'pagination[pageSize]': pageSize.toString(),
        'publicationState': 'live'
      });
      
      return `/articles?${params.toString()}`;
    },
    
    // Get single article by slug with minimal fields
    getArticleBySlug: (slug) => {
      const params = new URLSearchParams({
        'filters[slug][$eq]': slug,
        'fields[0]': 'title',
        'fields[1]': 'slug',
        'fields[2]': 'content',
        'fields[3]': 'publishedAt',
        'fields[4]': 'excerpt',
        'fields[5]': 'category',
        'populate[cover][fields][0]': 'url',
        'populate[cover][fields][1]': 'alternativeText',
        'populate[seo][fields][0]': 'metaTitle',
        'populate[seo][fields][1]': 'metaDescription',
        'populate[seo][fields][2]': 'metaImage',
        'populate[seo][populate][metaImage][fields][0]': 'url'
      });
      
      return `/articles?${params.toString()}`;
    }
  }
};

// API service functions
export const strapiService = {
  // Fetch articles with pagination
  async fetchArticles(page = 1, pageSize = 6) {
    try {
      const response = await strapiApi.get(strapiEndpoints.articles.getArticles(page, pageSize));
      return response.data;
    } catch (error) {
      console.error('Error fetching articles:', error);
      throw error;
    }
  },

  // Fetch single article by slug
  async fetchArticleBySlug(slug) {
    try {
      const response = await strapiApi.get(strapiEndpoints.articles.getArticleBySlug(slug));
      return response.data;
    } catch (error) {
      console.error('Error fetching article:', error);
      throw error;
    }
  },

  // Get total articles count for pagination
  async getArticlesCount() {
    try {
      const response = await strapiApi.get('/articles/count');
      return response.data;
    } catch (error) {
      console.error('Error fetching articles count:', error);
      throw error;
    }
  }
};

// Transform API response to UI format
export const transformArticle = (article) => ({
  id: article.id,
  title: article.attributes.title,
  slug: article.attributes.slug,
  excerpt: article.attributes.excerpt || '',
  content: article.attributes.content || '',
  category: article.attributes.category || 'Uncategorized',
  publishedAt: article.attributes.publishedAt,
  cover: {
    url: article.attributes.cover?.data?.attributes?.url,
    alternativeText: article.attributes.cover?.data?.attributes?.alternativeText || article.attributes.title
  },
  seo: article.attributes.seo || null
});

export const transformArticlesResponse = (response) => {
  const articles = response.data?.map(transformArticle) || [];
  const pagination = response.meta?.pagination || {
    page: 1,
    pageSize: 6,
    pageCount: 1,
    total: articles.length
  };
  
  return { articles, pagination };
};

export default strapiApi;
