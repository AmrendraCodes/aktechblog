// src/hooks/useArticles.js

import { useEffect, useState } from "react";
import { strapiService } from "../services/strapi";

// 📰 Get all articles
export const useArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    strapiService
      .getArticles()
      .then((res) => setArticles(res.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return { articles, loading };
};

// 📄 Get single article by slug
export const useArticleBySlug = (slug) => {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    strapiService
      .getArticleBySlug(slug)
      .then((res) => setArticle(res.data?.[0] || null))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [slug]);

  return { article, loading };
};