import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Clock, Calendar, TrendingUp, BookOpen, Users, Zap, Code, Database, Cloud } from "lucide-react";
import { Button } from "../components/ui/button";
import Layout from "../components/Layout";
import { LazyBlogCard } from "../components/LazyBlogCard";
import { DynamicNewsletter } from "../components/DynamicNewsletter";
import { useArticles } from "../hooks/useArticles";
import "./Index.css";

const Index = () => {
    const { articles, isLoading, error } = useArticles(1, 6);



    const items = articles || [];
    const featuredPosts = items.slice(0, 2);
    const recentPosts = items.slice(0, 6);

    return (
        <Layout>
            {/* Hero Section */}
            <section className="hero-section">
                {/* Background Effects */}
                <div className="hero-grid-bg" />
                <div className="hero-circle circle-1" />
                <div className="hero-circle circle-2" />
                <div className="hero-circle circle-3" />

                <div className="hero-container">
                    <div className="hero-content">
                        {/* Badge */}
                        <div className="hero-badge">
                            <Code className="icon-sm pulse" />
                            <span className="text-cyan">Our Developer Community</span>
                            <TrendingUp className="icon-sm" />
                        </div>

                        {/* Main Content */}
                        <div className="hero-title-wrapper">
                            <h1 className="hero-title">
                                <span className="gradient-text-hero">
                                    Welcome in
                                </span>
                                <br />
                                <span className="text-white">Tech World Space</span>
                            </h1>
                            <p className="hero-subtitle">
                                Deep dives into modern web development, cloud architecture, and cutting-edge technologies.
                                Written by developers, for developers.
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="hero-stats">
                            <div className="stat-item group">
                                <div className="stat-value text-cyan">150+</div>
                                <div className="stat-label">Articles</div>
                            </div>
                            <div className="stat-item group">
                                <div className="stat-value text-blue">75K+</div>
                                <div className="stat-label">Developers</div>
                            </div>
                            <div className="stat-item group">
                                <div className="stat-value text-purple">24/7</div>
                                <div className="stat-label">Updates</div>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="hero-actions">
                            <Button asChild size="lg" className="btn-hero-primary group">
                                <Link to="/blog">
                                    <BookOpen className="icon-md group-hover-rotate" />
                                    <span>Explore Articles</span>
                                    <ArrowRight className="icon-md group-hover-translate" />
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="btn-hero-outline group">
                                <Link to="/about">
                                    <Users className="icon-md group-hover-rotate" />
                                    <span>About Us</span>
                                    <ArrowRight className="icon-md group-hover-translate" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">
                            <span className="gradient-text-default">Tech Stack & Topics</span>
                        </h2>
                        <p className="section-subtitle">
                            Cutting-edge technologies and best practices for modern development
                        </p>
                    </div>

                    <div className="features-grid">
                        <div className="feature-card card-cyan group">
                            <div className="feature-icon-wrapper bg-gradient-cyan">
                                <Code className="icon-lg text-white" />
                            </div>
                            <h3 className="feature-title">Frontend Development</h3>
                            <p className="feature-desc">React, JavaScript, Next.js, and modern CSS techniques for building performant user interfaces.</p>
                        </div>

                        <div className="feature-card card-purple group">
                            <div className="feature-icon-wrapper bg-gradient-purple">
                                <Database className="icon-lg text-white" />
                            </div>
                            <h3 className="feature-title">Backend & APIs</h3>
                            <p className="feature-desc">Node.js, PostgreSQL, REST APIs, GraphQL, and scalable backend architecture patterns.</p>
                        </div>

                        <div className="feature-card card-indigo group">
                            <div className="feature-icon-wrapper bg-gradient-indigo">
                                <Cloud className="icon-lg text-white" />
                            </div>
                            <h3 className="feature-title">Cloud & DevOps</h3>
                            <p className="feature-desc">AWS, Docker, Kubernetes, CI/CD pipelines, and modern cloud deployment strategies.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Posts */}
            <section className="featured-posts-section">
                <div className="container">
                    <div className="section-header-row">
                        <div className="header-content">
                            <div className="label-wrapper text-cyan">
                                <div className="label-line bg-cyan" />
                                <span className="label-text">Featured</span>
                            </div>
                            <h2 className="section-title">
                                <span className="gradient-text-default">Featured Posts</span>
                            </h2>
                            <p className="section-subtitle">
                                Our most popular and trending articles from the community
                            </p>
                        </div>
                        <Button asChild variant="ghost" className="hidden-mobile btn-view-all text-cyan">
                            <Link to="/blog">
                                View All Articles
                                <ArrowRight className="icon-sm" />
                            </Link>
                        </Button>
                    </div>

                    {isLoading ? (
                        <div className="posts-grid-2">
                            {Array.from({ length: 2 }).map((_, i) => (
                                <div key={i} className="skeleton-card" />
                            ))}
                        </div>
                    ) : error ? (
                        <div className="error-container">
                            <p className="error-text">Unable to load articles. Please refresh the page.</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="btn-refresh bg-cyan"
                            >
                                Refresh Page
                            </button>
                        </div>
                    ) : featuredPosts.length === 0 ? (
                        <div className="empty-container">
                            <p className="empty-text">No featured posts yet.</p>
                        </div>
                    ) : (
                        <div className="posts-grid-2">
                            {featuredPosts.slice(0, 2).map((post, idx) => (
                                <LazyBlogCard key={post.slug} post={post} featured priority={idx === 0} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Recent Posts */}
            <section className="recent-posts-section">
                <div className="container">
                    <div className="section-header-row">
                        <div className="header-content">
                            <div className="label-wrapper text-purple">
                                <div className="label-line bg-purple" />
                                <span className="label-text">Latest</span>
                            </div>
                            <h2 className="section-title">
                                <span className="gradient-text-purple">Recent Articles</span>
                            </h2>
                            <p className="section-subtitle">
                                Fresh insights and tutorials from our blog
                            </p>
                        </div>
                        <Button asChild variant="ghost" className="hidden-mobile btn-view-all text-purple">
                            <Link to="/blog">
                                Browse All
                                <ArrowRight className="icon-sm" />
                            </Link>
                        </Button>
                    </div>

                    {isLoading ? (
                        <div className="posts-grid-3">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="skeleton-card-sm" />
                            ))}
                        </div>
                    ) : error ? (
                        <div className="error-container">
                            <p className="error-text">Unable to load articles. Please refresh the page.</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="btn-refresh bg-purple"
                            >
                                Refresh Page
                            </button>
                        </div>
                    ) : recentPosts.length === 0 ? (
                        <div className="empty-container">
                            <p className="empty-text">No articles yet. Please check back soon.</p>
                        </div>
                    ) : (
                        <div className="posts-grid-3">
                            {recentPosts.map((post, idx) => (
                                <LazyBlogCard key={post.slug} post={post} priority={idx === 0} />
                            ))}
                        </div>
                    )}

                    <div className="mobile-cta">
                        <Button asChild variant="outline" size="lg" className="btn-mobile-view-all">
                            <Link to="/blog">
                                View All Articles
                                <ArrowRight className="icon-sm" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="newsletter-section">
                <div className="container">
                    <DynamicNewsletter />
                </div>
            </section>
        </Layout>
    );
};

export default Index;
