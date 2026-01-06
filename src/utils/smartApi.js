// Strapi API Integration Service
// Handles fetching articles from Strapi CMS with safe populate strategy

const STRAPI_URL = import.meta.env.VITE_API_URL || 'https://genuine-fun-ae6ecdb902.strapiapp.com'
const API_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN

/**
 * Fetch articles from Strapi API with safe populate strategy
 * @param {Object} params - Query parameters
 * @returns {Promise<Object>} - Articles data and pagination
 */
export const fetchArticles = async (params = {}) => {
  try {
    console.log('🚀 Starting API fetch from:', STRAPI_URL)
    
    // SAFE STRATEGY: Use populate=* to get all relations
    const query = new URLSearchParams()
    
    // Add basic fields
    query.append('fields', 'title,description,slug,publishedAt')
    
    // SAFE: Use populate=* to get ALL relations
    query.append('populate', '*')
    
    // Add sorting and pagination
    query.append('sort', 'publishedAt:desc')
    query.append('pagination[page]', params.page || 1)
    query.append('pagination[pageSize]', params.pageSize || 6)
    query.append('publicationState', 'live')
    
    const url = `${STRAPI_URL}/api/articles?${query.toString()}`
    console.log('📡 API Request URL:', url)

    // Make API request
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(API_TOKEN && { 'Authorization': `Bearer ${API_TOKEN}` })
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()
    console.log('✅ API Success!', data)

    // Transform response data with safe field access
    const transformedArticles = transformArticlesData(data.data)
    const transformedMeta = transformPaginationData(data.meta)

    return {
      articles: transformedArticles,
      meta: transformedMeta,
      success: true
    }

  } catch (error) {
    console.error('❌ API Error:', error)
    
    // Return fallback mock data
    console.log('🔄 Using fallback mock data...')
    return getMockArticles()
  }
}

/**
 * Transform Strapi articles data to frontend format with safe field access
 */
const transformArticlesData = (articles) => {
  if (!Array.isArray(articles)) return []
  
  return articles.map(article => {
    const { id, attributes } = article || {}
    const attrs = attributes || {}
    
    // SAFE: Extract cover image URL with multiple fallback paths
    let imageUrl = null
    
    // Try different possible field names for image
    if (attrs.cover?.data?.attributes?.url) {
      imageUrl = `${STRAPI_URL}${attrs.cover.data.attributes.url}`
    } else if (attrs.image?.data?.attributes?.url) {
      imageUrl = `${STRAPI_URL}${attrs.image.data.attributes.url}`
    } else if (attrs.featuredImage?.data?.attributes?.url) {
      imageUrl = `${STRAPI_URL}${attrs.featuredImage.data.attributes.url}`
    }
    
    // SAFE: Extract author with fallbacks
    let author = null
    if (attrs.author?.data?.attributes) {
      author = {
        name: attrs.author.data.attributes.name || 'Unknown Author',
        email: attrs.author.data.attributes.email || '',
        bio: attrs.author.data.attributes.bio || ''
      }
    }
    
    // SAFE: Extract category with fallbacks
    let category = null
    if (attrs.category?.data?.attributes) {
      category = {
        name: attrs.category.data.attributes.name || 'Uncategorized',
        slug: attrs.category.data.attributes.slug || 'uncategorized'
      }
    }
    
    return {
      id: id || Math.random(),
      title: attrs.title || 'Untitled Article',
      description: attrs.description || 'No description available',
      slug: attrs.slug || 'no-slug',
      publishedAt: attrs.publishedAt || new Date().toISOString(),
      image: imageUrl,
      author: author,
      category: category
    }
  })
}

/**
 * Transform pagination metadata with safe access
 */
const transformPaginationData = (meta) => {
  return {
    page: meta?.pagination?.page || 1,
    pageSize: meta?.pagination?.pageSize || 6,
    pageCount: meta?.pagination?.pageCount || 1,
    total: meta?.pagination?.total || 0
  }
}

/**
 * Get mock articles for fallback with guaranteed data
 */
const getMockArticles = () => {
  const mockArticles = [
    {
      id: 1,
      title: "Getting Started with React in 2024",
      description: "A comprehensive guide to building modern web applications with React, covering hooks, state management, and best practices.",
      slug: "getting-started-react-2024",
      publishedAt: new Date().toISOString(),
      image: "https://images.unsplash.com/photo-16333563156487-e27c5e28486?w=800&h=400&fit=crop",
      author: {
        name: "John Doe",
        email: "john@example.com",
        bio: "React developer and educator"
      },
      category: {
        name: "React",
        slug: "react"
      }
    },
    {
      id: 2,
      title: "Building Modern Web Apps with Vite",
      description: "Discover how Vite revolutionizes development experience with fast builds and hot module replacement.",
      slug: "building-modern-web-apps-vite",
      publishedAt: new Date(Date.now() - 86400000).toISOString(),
      image: "https://images.unsplash.com/photo-1627398242454-77a464c7b6d?w=800&h=400&fit=crop",
      author: {
        name: "Jane Smith",
        email: "jane@example.com",
        bio: "Frontend developer and Vite contributor"
      },
      category: {
        name: "Tools",
        slug: "tools"
      }
    },
    {
      id: 3,
      title: "TypeScript Best Practices",
      description: "Essential TypeScript patterns and practices for building scalable applications.",
      slug: "typescript-best-practices",
      publishedAt: new Date(Date.now() - 172800000).toISOString(),
      image: "https://images.unsplash.com/photo-1516116216684-a954a40d5be?w=800&h=400&fit=crop",
      author: {
        name: "Mike Johnson",
        email: "mike@example.com",
        bio: "TypeScript enthusiast and senior developer"
      },
      category: {
        name: "TypeScript",
        slug: "typescript"
      }
    },
    {
      id: 4,
      title: "CSS Grid vs Flexbox",
      description: "When to use CSS Grid and when to use Flexbox for modern layouts.",
      slug: "css-grid-vs-flexbox",
      publishedAt: new Date(Date.now() - 259200000).toISOString(),
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
      author: {
        name: "Sarah Wilson",
        email: "sarah@example.com",
        bio: "CSS expert and design system architect"
      },
      category: {
        name: "CSS",
        slug: "css"
      }
    },
    {
      id: 5,
      title: "Next.js 14 Features",
      description: "Explore the latest features in Next.js 14 including app router and server components.",
      slug: "nextjs-14-features",
      publishedAt: new Date(Date.now() - 345600000).toISOString(),
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop",
      author: {
        name: "Alex Chen",
        email: "alex@example.com",
        bio: "Next.js specialist and full-stack developer"
      },
      category: {
        name: "Next.js",
        slug: "nextjs"
      }
    },
    {
      id: 6,
      title: "State Management with Zustand",
      description: "Learn how to use Zustand for simple and effective state management in React applications.",
      slug: "state-management-zustand",
      publishedAt: new Date(Date.now() - 432000000).toISOString(),
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
      author: {
        name: "David Brown",
        email: "david@example.com",
        bio: "State management expert and React consultant"
      },
      category: {
        name: "State Management",
        slug: "state-management"
      }
    }
  ]

  return {
    articles: mockArticles,
    meta: {
      page: 1,
      pageSize: 6,
      pageCount: 1,
      total: 6
    },
    success: true,
    fromFallback: true
  }
}

/**
 * Get single article by slug with safe populate
 */
export const fetchArticleBySlug = async (slug) => {
  try {
    const query = new URLSearchParams()
    
    // SAFE: Use populate=* to get ALL relations
    query.append('populate', '*')
    query.append('filters[slug][$eq]', slug)
    query.append('publicationState', 'live')
    
    const url = `${STRAPI_URL}/api/articles?${query.toString()}`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(API_TOKEN && { 'Authorization': `Bearer ${API_TOKEN}` })
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()
    const articles = transformArticlesData(data.data)
    
    return articles[0] || null

  } catch (error) {
    console.error('❌ Error fetching article:', error)
    return null
  }
}

export default {
  fetchArticles,
  fetchArticleBySlug
}
