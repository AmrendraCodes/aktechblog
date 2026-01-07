import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchArticleBySlug } from "../utils/smartApi";

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticle = async () => {
      setLoading(true);

      try {
        if (!slug) {
          setArticle(null);
          return;
        }

        // ✅ Use correct smartApi method
        const result = await fetchArticleBySlug(slug);

        if (result) {
          setArticle(result);
        } else {
          setArticle(null);
        }
      } catch (error) {
        console.error("❌ BlogDetail error:", error);
        setArticle(null);
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [slug]);

  if (loading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  if (!article) {
    return (
      <div className="p-10 text-center text-red-600 font-semibold">
        Article not found
      </div>
    );
  }

  // ✅ CLEAN DATA (NO ATTRIBUTES CONFUSION)
  const title = article.title;
  const description = article.description || "No description available";
  const publishedAt = article.publishedAt;
  const image = article.image;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full rounded-xl mb-6"
        />
      )}

      <h1 className="text-4xl font-bold mb-4">{title}</h1>

      <p className="text-gray-500 mb-6">
        {publishedAt
          ? new Date(publishedAt).toDateString()
          : ""}
      </p>

      <p className="text-lg text-gray-700">{description}</p>
    </div>
  );
};

export default BlogDetail;
