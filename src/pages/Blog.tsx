import { useState, useEffect } from 'react'
import { fetchArticles } from '../utils/smartApi'
import { Link } from 'react-router-dom'

const Blog = () => {
  const [articles, setArticles] = useState([])
  const [meta, setMeta] = useState({ total: 0 })
  const [loading, setLoading] = useState(false) // Start with false to avoid flash
  const [error, setError] = useState(null)
  const [apiResult, setApiResult] = useState(null)
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setLoading(true)
        setError(null)
        
        console.log('🔄 Starting to load articles...')
        
        const result = await fetchArticles({
          page: 1,
          pageSize: 6
        })
        
        console.log('📊 API Result received:', result)
        
        if (result && result.success) {
          console.log('✅ Setting articles:', result.articles)
          setArticles(result.articles || [])
          setMeta(result.meta || { total: 0 })
          setApiResult(result)
          
          if (result.fromFallback) {
            console.log('🔄 Using fallback data - API connection failed')
          } else {
            console.log('✅ Real API data loaded successfully!')
            console.log('📈 Articles count:', result.articles?.length || 0)
          }
        } else {
          console.log('❌ API result failed:', result)
          throw new Error('Failed to load articles - invalid response')
        }
        
      } catch (err) {
        console.error('❌ Error in component:', err)
        setError(err.message || 'Failed to load articles')
        
        // Set fallback data on error
        const fallbackArticles = [
          {
            id: 1,
            title: "Sample Article 1",
            description: "This is a sample article for testing purposes.",
            slug: "sample-article-1",
            publishedAt: new Date().toISOString(),
            image: "https://images.unsplash.com/photo-16333563156487-e27c5e28486?w=800&h=400&fit=crop",
            author: {
              name: "Test Author",
              email: "test@example.com",
              bio: "Test author bio"
            },
            category: {
              name: "Test Category",
              slug: "test-category"
            }
          }
        ]
        
        console.log('🔄 Setting fallback articles:', fallbackArticles)
        setArticles(fallbackArticles)
        setMeta({ total: 1 })
        setApiResult({ success: true, fromFallback: true })
        
      } finally {
        setLoading(false)
        setInitialized(true)
        console.log('✅ Loading completed')
      }
    }

    loadArticles()
  }, [])

  // Format date properly
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    } catch {
      return 'Recently'
    }
  }

  // Loading skeletons - Only show during initial load or refresh
  if (loading || !initialized) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Blog</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Explore articles on development, design, and everything in between.
            </p>
          </div>
        </div>

        {/* Loading Skeletons */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((skeleton) => (
              <div key={skeleton} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="w-full h-48 bg-gray-200 animate-pulse"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded animate-pulse mb-3"></div>
                  <div className="h-16 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-red-600 mb-4">
                Unable to Load Articles
              </h2>
              <p className="text-red-700 mb-6">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Blog</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Explore articles on development, design, and everything in between.
          </p>
          {meta.total && (
            <p className="mt-4 text-blue-100">
              Showing {articles.length} of {meta.total} articles
            </p>
          )}
        </div>
      </div>

      {/* Articles Section */}
      <div className="container mx-auto px-4 py-12">
        {/* Show empty state only when initialized and no articles */}
        {initialized && !loading && articles.length === 0 ? (
          <div className="text-center py-24">
            <h2 className="text-3xl font-bold text-gray-700 mb-4">
              No articles found
            </h2>
            <p className="text-gray-500">
              Please check back later.
            </p>
          </div>
        ) : initialized && !loading && articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                {/* Article Image */}
                {article.image ? (
                  <img
                    src={article.image}
                    alt={article.title}
                    loading="lazy"
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "https://images.unsplash.com/photo-1486312338419-130261d146b?w=800&h=400&fit=crop"
                    }}
                  />
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <div className="text-gray-400 text-center">
                      <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0l4.586 4.586a2 2 0 01-2.828 0L4 16z" />
                      </svg>
                      <p className="text-sm">No image</p>
                    </div>
                  </div>
                )}

                {/* Article Content */}
                <div className="p-6">
                  <p className="text-sm text-gray-500 mb-2">
                    {formatDate(article.publishedAt)}
                  </p>

                  <h3 className="text-xl font-bold mb-3 text-gray-800 line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.description}
                  </p>

                  {/* Author and Category - OPTIONAL */}
                  <div className="flex items-center justify-between mb-4 text-sm">
                    {article.author && (
                      <span className="text-gray-500">
                        By {article.author.name}
                      </span>
                    )}
                    {article.category && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">
                        {article.category.name}
                      </span>
                    )}
                  </div>

                  <Link
                    to={`/blog/${article.slug}`}
                    className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors group-hover:translate-x-1"
                  >
                    Read More
                    <svg
                      className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : null}
        
        {/* Debug Info - Only show when initialized and not loading */}
        {initialized && !loading && (
          <div className="mt-8 p-4 bg-gray-100 rounded-lg text-sm">
            <h3 className="font-bold mb-2">Debug Information:</h3>
            <p>📊 Total Articles: {articles.length}</p>
            <p>📄 Meta Total: {meta.total}</p>
            <p>🔄 From Fallback: {apiResult?.fromFallback ? 'Yes' : 'No'}</p>
            <p>✅ Success: {apiResult?.success ? 'Yes' : 'No'}</p>
            <p>🔄 Initialized: {initialized ? 'Yes' : 'No'}</p>
            <p>⏳ Loading: {loading ? 'Yes' : 'No'}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Blog
