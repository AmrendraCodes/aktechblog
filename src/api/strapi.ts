import axios from 'axios';
import { smartApi } from './smartApi';

export interface Article {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  publishedAt: string;

  cover?: {
    url?: string;
    formats?: {
      small?: { url: string };
      medium?: { url: string };
      large?: { url: string };
      thumbnail?: { url: string };
    };
  };
}
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
      // Handle new smartApi structure: { success, articles, meta }
      return {
        data: response.articles || [],
        meta: response.meta || { pagination: { page: 1, pageSize: 6, pageCount: 1, total: 0 } }
      };
    } catch (error) {
      throw error;
    }
  },

  // Fetch single article by slug through smart API
  async fetchArticleBySlug(slug) {
    try {
      const response = await smartApi.getArticles(); // For now, get all and filter

      // Filter by slug - handle new structure
      const article = response.articles?.find(article => article.slug === slug);
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
            count: response.meta?.pagination?.total || response.articles?.length || 0
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
  // Handle both fallback data and Strapi data
  let imageUrl = null;
  
  if (article.featuredImage && article.featuredImage.data && article.featuredImage.data.attributes) {
    // Strapi format: featuredImage.data.attributes.url
    imageUrl = article.featuredImage.data.attributes.url;
  } else if (article.image) {
    // Fallback format: article.image
    imageUrl = article.image;
  }
  
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
      url: imageUrl,
      alternativeText: article.title || 'Article image'
    },
    seo: null,
    
    // BlogCard component expects these fields
    image: imageUrl, // Use the extracted image URL
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
