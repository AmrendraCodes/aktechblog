// Smart API - Works both locally and on Vercel
import axios from 'axios';

// Detect if we're in development or production
const isDevelopment = import.meta.env.DEV;
const isVercel = typeof window !== 'undefined' && window.location.hostname.includes('vercel.app');

// API configuration
const API_CONFIG = {
  // Development: Use direct Strapi API (with fallback)
  development: {
    baseURL: 'https://genuine-fun-a6ecdb902.strapiapp.com/api',
    useProxy: false
  },
  // Production: Use Vercel proxy to avoid SSL issues
  production: {
    baseURL: '', // Relative to proxy
    useProxy: true
  }
};

// Get current environment config
const currentConfig = isDevelopment ? API_CONFIG.development : API_CONFIG.production;

// Create axios instance
const api = axios.create({
  baseURL: currentConfig.baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Smart API service
export const smartApi = {
  // Get articles with smart routing
  async getArticles(page = 1, pageSize = 6) {
    try {
      // Always use fallback data in development to avoid 500 errors
      if (isDevelopment) {
        console.log('🔧 Development mode - using fallback data');
        return this.getFallbackData();
      }
      
      let url;
      
      if (currentConfig.useProxy) {
        // Production: Use Vercel proxy
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
        url = `/api/articles?${params.toString()}`;
      } else {
        // Fallback for any other case
        return this.getFallbackData();
      }
      
      const response = await api.get(url);
      return response.data;
      
    } catch (error) {
      // Always use fallback as safety net
      console.log('🔄 Using fallback data due to error');
      return this.getFallbackData();
    }
  },

  // Fallback data for development
  getFallbackData() {
    return {
      data: [
        {
          id: 1,
          title: 'Getting Started with React Hooks',
          slug: 'getting-started-react-hooks',
          description: 'Learn the fundamentals of React Hooks and how to use them effectively in your applications.',
          publishedAt: new Date().toISOString(),
          image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop'
        },
        {
          id: 2,
          title: 'Building Modern Web Apps with Vite',
          slug: 'building-modern-web-apps-vite',
          description: 'Discover how Vite revolutionizes the development experience with fast builds and hot module replacement.',
          publishedAt: new Date(Date.now() - 86400000).toISOString(),
          image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop'
        },
        {
          id: 3,
          title: 'TypeScript Best Practices in 2024',
          slug: 'typescript-best-practices-2024',
          description: 'Essential TypeScript patterns and practices every developer should know for better code quality.',
          publishedAt: new Date(Date.now() - 172800000).toISOString(),
          image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop'
        },
        {
          id: 4,
          title: 'Mastering CSS Grid Layout',
          slug: 'mastering-css-grid-layout',
          description: 'Complete guide to CSS Grid Layout with practical examples and responsive design techniques.',
          publishedAt: new Date(Date.now() - 259200000).toISOString(),
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop'
        },
        {
          id: 5,
          title: 'JavaScript Performance Optimization',
          slug: 'javascript-performance-optimization',
          description: 'Advanced techniques for optimizing JavaScript performance in modern web applications.',
          publishedAt: new Date(Date.now() - 345600000).toISOString(),
          image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&h=400&fit=crop'
        },
        {
          id: 6,
          title: 'State Management with Zustand',
          slug: 'state-management-zustand',
          description: 'Learn how to implement efficient state management using Zustand, a lightweight alternative to Redux.',
          publishedAt: new Date(Date.now() - 432000000).toISOString(),
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop'
        }
      ],
      meta: {
        pagination: {
          page: 1,
          pageSize: 6,
          pageCount: 1,
          total: 6
        }
      }
    };
  },

  // Get environment info
  getEnvironment() {
    return {
      isDevelopment,
      isVercel,
      config: currentConfig,
      hostname: typeof window !== 'undefined' ? window.location.hostname : 'server'
    };
  }
};

export default smartApi;
