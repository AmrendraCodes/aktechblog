import axios from 'axios';
import { smartApi } from './smartApi';

// Strapi API configuration - Smart routing
const STRAPI_URL = ''; // Empty since we're using smart API
const API_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN;

// Create axios instance with optimized configuration
const strapiApi = axios.create({
  baseURL: '', // Base URL will be relative to proxy
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json',
    ...(API_TOKEN && { 'Authorization': `Bearer ${API_TOKEN}` })
  }
});

// Optimized API endpoints - Using smart routing
export const strapiEndpoints = {
  articles: {
    // Fetch articles through smart API (auto-detects environment)
    getArticles: (page = 1, pageSize = 6) => {
      const params = new URLSearchParams({
        'fields[0]': 'title',
        'fields[1]': 'slug', 
        'fields[2]': 'description',
        'fields[3]': 'publishedAt',
        'sort[0]': 'publishedAt:desc',
        'pagination[page]': page.toString(),
        'pagination[pageSize]': pageSize.toString(),
        'publicationState': 'live'
      });
      
      return `/api/articles?${params.toString()}`;
    },
    
    // Get single article by slug through smart API
    getArticleBySlug: (slug) => {
      const params = new URLSearchParams({
        'filters[slug][$eq]': slug,
        'fields[0]': 'title',
        'fields[1]': 'slug',
        'fields[2]': 'description',
        'fields[3]': 'publishedAt',
        'fields[4]': 'content'
      });
      
      return `/api/articles?${params.toString()}`;
    }
  }
};

// API service functions
export const strapiService = {
  // Fetch articles with pagination through smart API
  async fetchArticles(page = 1, pageSize = 6) {
    try {
      const response = await smartApi.getArticles(page, pageSize);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Fetch single article by slug through smart API
  async fetchArticleBySlug(slug) {
    try {
      const response = await smartApi.getArticles(); // For now, get all and filter
      
      // Filter by slug
      const article = response.data?.find(article => article.slug === slug);
      if (article) {
        return {
          data: [article],
          meta: response.meta
        };
      }
      
      throw new Error('Article not found');
    } catch (error) {
      throw error;
    }
  },

  // Get total articles count through smart API
  async getArticlesCount() {
    try {
      const response = await smartApi.getArticles();
      return {
        data: {
          attributes: {
            count: response.meta?.pagination?.total || 0
          }
        }
      };
    } catch (error) {
      throw error;
    }
  }
};

// Transform API response to UI format (NO attributes wrapper)
export const transformArticle = (article) => {
  // Transform to match BlogCard interface
  const transformed = {
    id: article.id,
    title: article.title || 'Untitled',
    slug: article.slug || '',
    excerpt: article.description || '',
    content: article.content || article.description || '',
    category: 'Technology', // Default category since API doesn't provide it
    publishedAt: article.publishedAt || new Date().toISOString(),
    cover: {
      url: article.image || null, // Use image from API
      alternativeText: article.title || 'Article image'
    },
    seo: null,
    
    // BlogCard component expects these fields
    image: article.image || null, // Use image from API
    date: article.publishedAt || new Date().toISOString(),
    readTime: '3 min read', // Default reading time
    imageData: null // For debugging
  };
  
  return transformed;
};

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
