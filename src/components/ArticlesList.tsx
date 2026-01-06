import { useEffect, useState } from 'react';

interface Article {
  id: number;
  attributes: {
    title: string;
    description: string;
    content: string;
    slug: string;
    publishedAt: string;
    cover?: {
      data?: {
        attributes: {
          url: string;
        };
      };
    };
  };
}

const ArticlesList = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          'https://genuine-fun-ae6ecdb902.strapiapp.com/api/articles?populate=*',
          {
            headers: {
              Authorization: 'Bearer 316900cd39619c7872c5b89b784e82483128f0a1040486180a7e6b3de25b5110e8b826ccda1bd5e4f77123738ac48ebbafc534286007eb1f778b13d5f28c792df59cdccfabf95686b34ede8b1c0be99a5c9e2958309ff31a18a669897be15d9a03f898756afad1f8a16e32a939ed865c1a98396057d1eba0f1ca52f51e9ae9fe',
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('✅ Articles fetched:', data.data);
        setArticles(data.data || []);
      } catch (err) {
        console.error('❌ Error:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading articles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto my-12 p-8 bg-red-50 border-2 border-red-200 rounded-lg">
        <h2 className="text-2xl font-bold text-red-600 mb-4">⚠️ Error Loading Articles</h2>
        <p className="text-red-800">{error}</p>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold text-gray-700 mb-4">No Articles Found</h2>
        <p className="text-gray-600">Check back later for new content!</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-bold mb-4">Latest Articles</h2>
        <p className="text-xl text-gray-600">Found {articles.length} articles</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {articles.map((article) => (
          <div
            key={article.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
          >
            {article.attributes.cover?.data && (
              <div className="h-48 overflow-hidden">
                <img
                  src={`https://genuine-fun-ae6ecdb902.strapiapp.com${article.attributes.cover.data.attributes.url}`}
                  alt={article.attributes.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            )}
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-3 text-gray-800 line-clamp-2">
                {article.attributes.title}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {article.attributes.description}
              </p>
              <a
                href={`/blog/${article.attributes.slug}`}
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors"
              >
                Read More
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticlesList;