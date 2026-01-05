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
    const startTime = performance.now();
    console.log('🚀 Starting optimized API call at:', new Date().toISOString());
    
    try {
      // Simplified API call - minimal parameters
      console.log('🌍 Attempting simplified Strapi API call...');
      
      const strapiUrl = 'https://genuine-fun-ae6ecdb902.strapiapp.com/api/articles';
      
      // Simple query string - no complex array notation
      const queryParams = new URLSearchParams({
        'populate': 'featuredImage',
        'fields': 'title,description,slug,publishedAt',
        'sort': 'publishedAt:desc',
        'pagination[page]': page.toString(),
        'pagination[pageSize]': pageSize.toString(),
        'publicationState': 'live'
      });
      
      const fullUrl = `${strapiUrl}?${queryParams.toString()}`;
      console.log('📡 Full API URL:', fullUrl);
      
      // Check if API token is available
      const apiToken = import.meta.env.VITE_STRAPI_API_TOKEN;
      console.log('🔑 API Token Available:', !!apiToken);
      
      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': 'BlogApp/1.0'
      };
      
      // Add authorization if token exists
      if (apiToken) {
        headers['Authorization'] = `Bearer ${apiToken}`;
        console.log('🔑 Using API Token for authentication');
      }
      
      const response = await fetch(fullUrl, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'omit',
        headers: headers
      });
      
      const endTime = performance.now();
      const loadTime = endTime - startTime;
      
      console.log('📊 API Response Status:', response.status, response.statusText);
      console.log('📊 Request Headers:', headers);
      console.log('⏱️ Load Time:', Math.round(loadTime), 'ms');
      
      if (response.ok) {
        const data = await response.json();
        console.log('📦 Response Size:', JSON.stringify(data).length, 'characters');
        console.log('✅ Simplified Strapi API success:', data.data?.length || 0, 'articles loaded');
        console.log('📋 First Article:', data.data?.[0]?.title || 'No articles');
        
        // Log first article structure for debugging
        if (data.data && data.data[0]) {
          console.log('🔍 First Article Structure:', {
            id: data.data[0].id,
            title: data.data[0].title,
            hasFeaturedImage: !!data.data[0].featuredImage,
            slug: data.data[0].slug,
            publishedAt: data.data[0].publishedAt
          });
        }
        
        return data;
      } else {
        console.log('⚠️ Strapi API responded with:', response.status, response.statusText);
        console.log('❌ Response Headers:', Object.fromEntries(response.headers.entries()));
        const errorText = await response.text();
        console.log('❌ Response Body:', errorText);
        throw new Error(`Strapi API returned ${response.status}: ${response.statusText}`);
      }
      
    } catch (error) {
      const endTime = performance.now();
      const loadTime = endTime - startTime;
      console.log('💥 Error after:', Math.round(loadTime), 'ms');
      console.log('💥 Error Type:', error.constructor.name);
      console.log('💥 Error Message:', error.message);
      
      // Check if it's a CORS error
      if (error.message.includes('CORS') || error.message.includes('Cross-Origin')) {
        console.log('🌐 CORS Error Detected - This is a Strapi configuration issue');
        console.log('🔧 Fix Needed: Add localhost:8080 to Strapi CORS settings');
      }
      
      console.log('🔄 Simplified API failed, using fallback data');
      console.log('📦 Fallback Data Size:', JSON.stringify(this.getFallbackData()).length, 'characters');
      
      // Always use fallback as safety net
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
          featuredImage: {
            data: {
              attributes: {
                url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
                alternativeText: 'React Hooks tutorial'
              }
            }
          }
        },
        {
          id: 2,
          title: 'Building Modern Web Apps with Vite',
          slug: 'building-modern-web-apps-vite',
          description: 'Discover how Vite revolutionizes the development experience with fast builds and hot module replacement.',
          publishedAt: new Date(Date.now() - 86400000).toISOString(),
          featuredImage: {
            data: {
              attributes: {
                url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop',
                alternativeText: 'Vite development tool'
              }
            }
          }
        },
        {
          id: 3,
          title: 'TypeScript Best Practices in 2024',
          slug: 'typescript-best-practices-2024',
          description: 'Essential TypeScript patterns and practices every developer should know for better code quality.',
          publishedAt: new Date(Date.now() - 172800000).toISOString(),
          featuredImage: {
            data: {
              attributes: {
                url: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop',
                alternativeText: 'TypeScript code'
              }
            }
          }
        },
        {
          id: 4,
          title: 'Mastering CSS Grid Layout',
          slug: 'mastering-css-grid-layout',
          description: 'Complete guide to CSS Grid Layout with practical examples and responsive design techniques.',
          publishedAt: new Date(Date.now() - 259200000).toISOString(),
          featuredImage: {
            data: {
              attributes: {
                url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
                alternativeText: 'CSS Grid layout'
              }
            }
          }
        },
        {
          id: 5,
          title: 'JavaScript Performance Optimization',
          slug: 'javascript-performance-optimization',
          description: 'Advanced techniques for optimizing JavaScript performance in modern web applications.',
          publishedAt: new Date(Date.now() - 345600000).toISOString(),
          featuredImage: {
            data: {
              attributes: {
                url: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&h=400&fit=crop',
                alternativeText: 'JavaScript performance'
              }
            }
          }
        },
        {
          id: 6,
          title: 'State Management with Zustand',
          slug: 'state-management-zustand',
          description: 'Learn how to implement efficient state management using Zustand, a lightweight alternative to Redux.',
          publishedAt: new Date(Date.now() - 432000000).toISOString(),
          featuredImage: {
            data: {
              attributes: {
                url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
                alternativeText: 'State management'
              }
            }
          }
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
