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
      data: {
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
          `${import.meta.env.VITE_STRAPI_URL}/api/articles?populate=*`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_STRAPI_API_TOKEN}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('✅ Data fetched successfully:', data);
        setArticles(data.data);
      } catch (err) {
        console.error('❌ Error fetching articles:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        <h2 className="text-xl font-bold">Error loading articles</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Latest Articles</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <div key={article.id} className="border rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
            {article.attributes.cover?.data && (
              <img
                src={`${import.meta.env.VITE_STRAPI_URL}${article.attributes.cover.data.attributes.url}`}
                alt={article.attributes.title}
                className="w-full h-48 object-cover rounded mb-4"
              />
            )}
            <h2 className="text-2xl font-semibold mb-2">{article.attributes.title}</h2>
            <p className="text-gray-600 mb-4">{article.attributes.description}</p>
            <a 
              href={`/blog/${article.attributes.slug}`}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Read More →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticlesList;