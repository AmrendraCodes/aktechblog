import axios from 'axios';

// Strapi API configuration - Using your actual backend URL
const STRAPI_URL = 'https://genuine-fun-a6ecdb902.strapiapp.com';
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
    // Fetch articles with ONLY required fields (no attributes wrapper)
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
      
      return `/articles?${params.toString()}`;
    },
    
    // Get single article by slug with minimal fields
    getArticleBySlug: (slug) => {
      const params = new URLSearchParams({
        'filters[slug][$eq]': slug,
        'fields[0]': 'title',
        'fields[1]': 'slug',
        'fields[2]': 'description',
        'fields[3]': 'publishedAt',
        'fields[4]': 'content'
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
      console.log('Fetching articles from:', `${STRAPI_URL}/api/articles`);
      const response = await strapiApi.get(strapiEndpoints.articles.getArticles(page, pageSize));
      console.log('API Response:', response.data);
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

// Transform API response to UI format (NO attributes wrapper)
export const transformArticle = (article) => {
  console.log('Transforming article:', article);
  
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
      url: null, // No cover image in your API response
      alternativeText: article.title || 'Article image'
    },
    seo: null,
    
    // BlogCard component expects these fields
    image: null, // No image in your API response
    date: article.publishedAt || new Date().toISOString(),
    readTime: '3 min read', // Default reading time
    imageData: null // For debugging
  };
  
  console.log('Transformed article for UI:', transformed);
  return transformed;
};

export const transformArticlesResponse = (response) => {
  console.log('Transforming response:', response);
  const articles = response.data?.map(transformArticle) || [];
  const pagination = response.meta?.pagination || {
    page: 1,
    pageSize: 6,
    pageCount: 1,
    total: articles.length
  };
  
  console.log('Transformed articles:', articles);
  console.log('Pagination:', pagination);
  
  return { articles, pagination };
};

export default strapiApi;
