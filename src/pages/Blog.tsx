import { useState, useMemo, useEffect } from "react";
import { Search, Home, Users, Mail, Shield, FileText } from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { LazyBlogCard } from "../components/LazyBlogCard";
import { fetchArticles, mapArticlesToUi } from "../lib/strapi";
import ArticlesList from '../components/ArticleList';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const Blog = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        <ArticlesList />
      </main>
      <Footer />
    </div>
  );
};

export default Blog;