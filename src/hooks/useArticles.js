// src/hooks/useArticles.js

import { useEffect, useState } from "react";
import { strapiService } from "../services/strapi";

// 📰 Get all articles
export const useArticles = (page = 1, limit = 10) => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      console.log("USEFFECT START");
      console.log("isLoading =", isLoading);

      try {
        const res = await strapiService.getArticles(page, limit);
        console.log("API Success");
        console.log("data from API", res.data);
        setArticles(res.data?.data || []);
        setError(null);
      } catch (err) {
        console.error("API Error:", err);
        setError(err);
      } finally {
        console.log("API End");
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, [page, limit]);
  return { articles, isLoading, error };
};

// 📄 Get single article by slug
export const useArticleBySlug = (slug) => {
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) return;

      try {
        const res = await strapiService.getArticleBySlug(slug);
        setArticle(res.data?.data?.[0] || null);
        setError(null);
      } catch (err) {
        console.error("Error fetching article:", err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  return { article, isLoading, error };
};