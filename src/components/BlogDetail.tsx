import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL;

interface Article {
  id: number;
  attributes: {
    title: string;
    description: string;
    slug: string;
    publishedAt: string;
    cover?: {
      data?: {
        attributes?: {
          url: string;
        };
      };
    };
  };
}

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(
          `${STRAPI_URL}/api/articles?filters[slug][$eq]=${slug}&populate=cover` 
        );

        if (!res.ok) {
          throw new Error("Failed to fetch article");
        }

        const json = await res.json();
        const articleData = json?.data?.[0];
        setArticle(articleData || null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  /* -------------------- Loading -------------------- */
  if (loading) {
    return (
      <div className="flex justify-center items-center py-24">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  /* -------------------- Error -------------------- */
  if (error) {
    return (
      <div className="max-w-2xl mx-auto my-12 p-6 bg-red-50 border border-red-200 rounded-lg text-center">
        <h2 className="text-xl font-bold text-red-600 mb-2">
          Error loading article
        </h2>
        <p className="text-red-700">{error}</p>
        <Link to="/" className="text-blue-600 underline mt-4 inline-block">
          Go back
        </Link>
      </div>
    );
  }

  /* -------------------- Not Found -------------------- */
  if (!article) {
    return (
      <div className="text-center py-24">
        <h2 className="text-3xl font-bold text-gray-700">
          Article not found
        </h2>
        <Link
          to="/"
          className="inline-block mt-4 text-blue-600 font-semibold"
        >
          ← Back to home
        </Link>
      </div>
    );
  }

  const { attributes } = article;
  const imageUrl =
    attributes.cover?.data?.attributes?.url;

  /* -------------------- Article -------------------- */
  return (
    <>
      <Helmet>
        <title>{attributes.title} | AK Tech Blog</title>
        <meta name="description" content={attributes.description} />
        <meta property="og:title" content={attributes.title} />
        <meta property="og:description" content={attributes.description} />
        {imageUrl && <meta property="og:image" content={imageUrl} />}
        <meta property="og:type" content="article" />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link
          to="/"
          className="text-blue-600 font-semibold mb-6 inline-block"
        >
          ← Back to Articles
        </Link>

        {imageUrl ? (
          <img
            src={imageUrl}
            alt={attributes.title}
            loading="lazy"
            className="w-full h-96 object-cover rounded-xl mb-8"
          />
        ) : (
          <div className="w-full h-96 bg-gray-200 rounded-xl mb-8 flex items-center justify-center">
            <img src="/placeholder.svg" alt="Placeholder" className="w-24 h-24 opacity-50" />
          </div>
        )}

        <p className="text-sm text-gray-400 mb-2">
          {new Date(attributes.publishedAt).toLocaleDateString()}
        </p>

        <h1 className="text-4xl font-bold mb-6 text-gray-900">
          {attributes.title}
        </h1>

        <p className="text-lg text-gray-700 leading-relaxed">
          {attributes.description}
        </p>
      </div>
    </>
  );
};

export default BlogDetail;
