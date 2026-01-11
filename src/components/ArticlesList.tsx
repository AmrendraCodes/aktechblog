import { useEffect, useState } from "react";
import { strapiService } from "../services/strapi"; // 
import { Link } from "react-router-dom";

const ArticlesList = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    strapiService
      .getArticles() // ✅ Use strapiService
      .then((res) => {
        setArticles(res.data || []); // ✅ Access res.data
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading articles:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p>Loading articles...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Latest Articles</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((article) => {
          const image =
            article.cover?.data?.attributes?.url
              ? `http://localhost:1337${article.cover.data.attributes.url}`
              : null;

          return (
            <div key={article.id} className="bg-white shadow rounded overflow-hidden">
              {image && (
                <img
                  src={image}
                  alt={article.Title}
                  className="w-full h-48 object-cover"
                />
              )}

              <div className="p-4">
                <h3 className="font-bold text-lg">
                  {article.Title}
                </h3>

                <Link
                  to={`/blog/${article.slug}`}
                  className="text-blue-600 font-semibold"
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
};

export default ArticlesList;