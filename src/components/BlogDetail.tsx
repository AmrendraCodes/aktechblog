import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';

interface StrapiImage {
  url: string;
  formats?: {
    medium?: { url: string };
    small?: { url: string };
    thumbnail?: { url: string };
  };
}

interface ArticleData {
  id: number;
  attributes: {
    Title: string;         // ✅ Capital T
    slug: string;
    content?: string;
    description?: string;
    publishedAt: string;
    cover?: {
      data?: {
        attributes: StrapiImage;
      };
    };
  };
}

const getImageUrl = (url?: string): string | null => {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  return `${STRAPI_URL}${url}`;
};

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<ArticleData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        if (!STRAPI_URL) {
          throw new Error('STRAPI_URL not configured');
        }

        const res = await fetch(
          `${STRAPI_URL}/api/articles?filters[slug][$eq]=${slug}&populate=cover`
        );

        if (!res.ok) {
          throw new Error(`Failed to fetch article: ${res.status}`);
        }

        const json = await res.json();
        const articleData = json?.data?.[0];
        
        if (!articleData) {
          throw new Error('Article not found');
        }
        
        setArticle(articleData);
      } catch (err) {
        console.error('Error fetching article:', err);
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchArticle();
    }
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

  // ✅ Access image correctly from Strapi v4 structure
  const coverData = article.attributes.cover?.data?.attributes;
  const imageUrl =
    getImageUrl(coverData?.formats?.medium?.url) ||
    getImageUrl(coverData?.formats?.small?.url) ||
    getImageUrl(coverData?.url) ||
    null;

  /* -------------------- Article -------------------- */
  return (
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
          alt={article.attributes.Title}
          loading="lazy"
          className="w-full h-96 object-cover rounded-xl mb-8"
        />
      ) : (
        <div className="w-full h-96 bg-gray-200 rounded-xl mb-8 flex items-center justify-center">
          <span className="text-gray-400 text-lg">No image available</span>
        </div>
      )}

      <p className="text-sm text-gray-400 mb-2">
        {new Date(article.attributes.publishedAt).toLocaleDateString()}
      </p>

      <h1 className="text-4xl font-bold mb-6 text-gray-900">
        {article.attributes.Title}
      </h1>

      <div className="prose prose-lg max-w-none">
        <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">
          {article.attributes.content || article.attributes.description}
        </p>
      </div>
    </div>
  );
};

export default BlogDetail;