import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchArticles } from "../utils/smartApi";

const ArticlesList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [initialFetchComplete, setInitialFetchComplete] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const loadArticles = async () => {
      try {
        const result = await fetchArticles({ page: 1, pageSize: 6 });
        console.log('Articles fetched:', result);

        if (isMounted) {
          if (result.success && result.articles) {
            setArticles(result.articles);
          } else if (Array.isArray(result.articles)) {
            setArticles(result.articles);
          } else {
            setArticles([]);
          }
          setLoading(false);
          setInitialFetchComplete(true);
        }
      } catch (err) {
        console.error('Error fetching articles:', err);
        if (isMounted) {
          setError(err.message || "Failed to load articles");
          setLoading(false);
          setInitialFetchComplete(true);
        }
      }
    };

    loadArticles();

    return () => {
      isMounted = false;
    };
  }, []);

  // Loading State
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">Latest Articles</h1>
          <p className="text-gray-600">Loading articles...</p>
        </div>
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
    );
  }

  // Error State
  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto my-12 p-6 bg-red-50 border border-red-200 rounded-lg text-center">
          <h2 className="text-xl font-bold text-red-600 mb-2">
            Error loading articles
          </h2>
          <p className="text-red-700">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Empty State
  if (!loading && !error && articles.length === 0 && initialFetchComplete) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center py-24">
          <h2 className="text-3xl font-bold text-gray-700">
            No articles found
          </h2>
          <p className="text-gray-500 mt-2">
            Please check back later.
          </p>
        </div>
      </div>
    );
  }

  // Articles Grid
  if (!loading && articles.length > 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">Latest Articles</h1>
          <p className="text-gray-600">
            Showing {Array.isArray(articles) ? articles.length : 0} articles
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.isArray(articles) && articles.map((article) => {
            const imageUrl = article.image || null;

            return (
              <div
                key={article.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden"
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={article.title}
                    loading="lazy"
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400">
                    No image
                  </div>
                )}

                <div className="p-6">
                  <p className="text-sm text-gray-400 mb-2">
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </p>

                  <h3 className="text-xl font-bold mb-3 text-gray-800 line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.description}
                  </p>

                  <Link
                    to={`/blog/${article.slug}`}
                    className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return null;
};

export default ArticlesList;