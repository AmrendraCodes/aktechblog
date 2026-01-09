import { Link } from 'react-router-dom'

export const ArticlesList = () => {
  const articles = [
    { 
      id: 1, 
      title: 'Getting Started with React', 
      description: 'Learn the basics of React and start building modern web applications.',
      date: '2024-01-15',
      category: 'React'
    },
    { 
      id: 2, 
      title: 'TypeScript Best Practices', 
      description: 'Discover the best practices for writing clean and maintainable TypeScript code.',
      date: '2024-01-10',
      category: 'TypeScript'
    },
    { 
      id: 3, 
      title: 'Building REST APIs', 
      description: 'A comprehensive guide to building scalable REST APIs with Node.js.',
      date: '2024-01-05',
      category: 'Backend'
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link 
                to="/" 
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                </svg>
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                </svg>
                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">Blog</span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Blog Articles
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Explore our collection of articles on web development, programming, and technology.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {articles.map(article => (
            <article 
              key={article.id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col h-full"
            >
              {/* Category Badge */}
              <div className="px-6 pt-6">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                  {article.category}
                </span>
              </div>

              {/* Content */}
              <div className="px-6 py-4 flex-grow">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.description}
                </p>
              </div>

              {/* Footer */}
              <div className="px-6 pb-6 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <time className="text-sm text-gray-500">
                    {new Date(article.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </time>
                  <Link 
                    to={`/blog/${article.id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center"
                  >
                    Read More
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Empty State (if no articles) */}
        {articles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No articles found.</p>
          </div>
        )}
      </div>
    </div>
  )
}
