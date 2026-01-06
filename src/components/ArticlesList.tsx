import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getArticles, Article } from "../services/strapi";

const ArticlesList = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await getArticles();
        setArticles(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load articles");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  /* -------------------- Loading State -------------------- */
  if (loading) {
    return (
      <div className="flex justify-center items-center py-24">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  /* -------------------- Error State -------------------- */
  if (error) {
    return (
      <div className="max-w-2xl mx-auto my-12 p-6 bg-red-50 border border-red-200 rounded-lg text-center">
        <h2 className="text-xl font-bold text-red-600 mb-2">
          Error loading articles
        </h2>
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  /* -------------------- Empty State -------------------- */
  if (articles.length === 0) {
    return (
      <div className="text-center py-24">
        <h2 className="text-3xl font-bold text-gray-700">
          No articles found
        </h2>
        <p className="text-gray-500 mt-2">
          Please check back later.
        </p>
      </div>
    );
  }

  /* -------------------- Articles Grid -------------------- */
  return (
    <>
      <Helmet>
        <title>Latest Articles | AK Tech Blog</title>
        <meta name="description" content="Read the latest articles on web development, technology, and programming tutorials at AK Tech Blog." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">Latest Articles</h1>
          <p className="text-gray-600">
            Showing {articles.length} articles
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => {
            const { id, attributes } = article;
            const imageUrl =
              attributes.cover?.data?.attributes?.url;

            return (
              <div
                key={id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden"
              >
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt={attributes.title}
                    loading="lazy"
                    className="w-full h-48 object-cover"
                  />
                )}

                <div className="p-6">
                  <p className="text-sm text-gray-400 mb-2">
                    {new Date(attributes.publishedAt).toLocaleDateString()}
                  </p>

                  <h3 className="text-xl font-bold mb-3 text-gray-800 line-clamp-2">
                    {attributes.title}
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {attributes.description}
                  </p>

                  <Link
                    to={`/blog/${attributes.slug}`}
                    className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors"
                  >
                    Read More
                    <svg
                      className="w-4 h-4 ml-2"
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
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ArticlesList;