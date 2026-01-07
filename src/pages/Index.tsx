import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Clock, Calendar, TrendingUp, BookOpen, Users, Zap, Code, Database, Cloud } from "lucide-react";
import { Button } from "../components/ui/button";
import Layout from "../components/Layout";
import { LazyBlogCard } from "../components/LazyBlogCard";
import { DynamicNewsletter } from "../components/DynamicNewsletter";
import { useArticles } from "../hooks/useArticles";

const Index = () => {
  // Use optimized React Query hook
  const { data, isLoading, error } = useArticles(1, 6);
  
  const items = data?.articles || [];
  const featuredPosts = items.slice(0, 2);
  const recentPosts = items.slice(0, 6);

  return (
    <Layout>
      {/* Hero Section - Professional Tech Blog */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(to_bottom,white,transparent,white)]" />
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500 rounded-full blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '2s' }} />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-cyan-400 px-6 py-3 rounded-full text-sm font-medium border border-cyan-400/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <Code className="h-4 w-4 animate-pulse" />
              <span className="text-cyan-300">Our Devloper Community</span>
              <TrendingUp className="h-4 w-4" />
            </div>
            
            {/* Main Content */}
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Welcome in
                </span>
                <br />
                <span className="text-white">Tech World Space</span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-4">
                Deep dives into modern web development, cloud architecture, and cutting-edge technologies. 
                Written by developers, for developers.
              </p>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto px-4">
              <div className="text-center group">
                <div className="text-2xl sm:text-3xl font-bold text-cyan-400 group-hover:scale-110 transition-transform duration-300">150+</div>
                <div className="text-sm sm:text-base text-gray-400">Articles</div>
              </div>
              <div className="text-center group">
                <div className="text-2xl sm:text-3xl font-bold text-blue-400 group-hover:scale-110 transition-transform duration-300">75K+</div>
                <div className="text-sm sm:text-base text-gray-400">Developers</div>
              </div>
              <div className="text-center group">
                <div className="text-2xl sm:text-3xl font-bold text-purple-400 group-hover:scale-110 transition-transform duration-300">24/7</div>
                <div className="text-sm sm:text-base text-gray-400">Updates</div>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
              <Button asChild size="lg" className="px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                <Link to="/blog" className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                  <span>Explore Articles</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg border-2 border-gray-600 text-white hover:bg-white/10 hover:border-gray-500 transition-all duration-300 hover:scale-105 group">
                <Link to="/about" className="flex items-center gap-2">
                  <Users className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                  <span>About Us</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Professional Tech Stack */}
      <section className="py-16 sm:py-20 lg:py-24 bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Tech Stack & Topics</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto px-4">
              Cutting-edge technologies and best practices for modern development
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
            <div className="text-center p-6 sm:p-8 lg:p-10 rounded-2xl lg:rounded-3xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                <Code className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">Frontend Development</h3>
              <p className="text-gray-400 leading-relaxed">React, TypeScript, Next.js, and modern CSS techniques for building performant user interfaces.</p>
            </div>
            
            <div className="text-center p-6 sm:p-8 lg:p-10 rounded-2xl lg:rounded-3xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                <Database className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">Backend & APIs</h3>
              <p className="text-gray-400 leading-relaxed">Node.js, PostgreSQL, REST APIs, GraphQL, and scalable backend architecture patterns.</p>
            </div>
            
            <div className="text-center p-6 sm:p-8 lg:p-10 rounded-2xl lg:rounded-3xl bg-gradient-to-br from-indigo-500/10 to-blue-500/10 border border-indigo-500/20 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                <Cloud className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">Cloud & DevOps</h3>
              <p className="text-gray-400 leading-relaxed">AWS, Docker, Kubernetes, CI/CD pipelines, and modern cloud deployment strategies.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-cyan-400">
                <div className="w-8 h-0.5 bg-cyan-400" />
                <span className="text-sm font-medium uppercase tracking-wider">Featured</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Featured Posts</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-400 max-w-2xl">
                Our most popular and trending articles from the community
              </p>
            </div>
            <Button asChild variant="ghost" className="hidden lg:flex px-6 py-3 text-lg text-cyan-400 hover:bg-cyan-400/10 transition-colors">
              <Link to="/blog" className="flex items-center gap-2">
                View All Articles
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
          
          {isLoading ? (
            <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="h-80 sm:h-96 bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-400">Unable to load articles. Please refresh the page.</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-4 px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
              >
                Refresh Page
              </button>
            </div>
          ) : featuredPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-400">No featured posts yet.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
              {featuredPosts.slice(0, 2).map((post, idx) => (
                <LazyBlogCard key={post.slug} post={post} featured priority={idx === 0} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-16 sm:py-20 lg:py-24 bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-purple-400">
                <div className="w-8 h-0.5 bg-purple-400" />
                <span className="text-sm font-medium uppercase tracking-wider">Latest</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Recent Articles</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-400 max-w-2xl">
                Fresh insights and tutorials from our blog
              </p>
            </div>
            <Button asChild variant="ghost" className="hidden lg:flex px-6 py-3 text-lg text-purple-400 hover:bg-purple-400/10 transition-colors">
              <Link to="/blog" className="flex items-center gap-2">
                Browse All
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
          
          {isLoading ? (
            <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-72 sm:h-80 bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-400">Unable to load articles. Please refresh the page.</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-4 px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                Refresh Page
              </button>
            </div>
          ) : recentPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-400">No articles yet. Please check back soon.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {recentPosts.map((post, idx) => (
                <LazyBlogCard key={post.slug} post={post} priority={idx === 0} />
              ))}
            </div>
          )}

          <div className="mt-12 sm:mt-16 text-center lg:hidden">
            <Button asChild variant="outline" size="lg" className="px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg border-2 border-gray-600 text-white hover:bg-gray-800 transition-colors">
              <Link to="/blog" className="flex items-center gap-2">
                View All Articles
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <DynamicNewsletter />
        </div>
      </section>
    </Layout>
  );
};

export default Index;
