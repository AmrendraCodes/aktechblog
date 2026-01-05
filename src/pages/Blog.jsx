import { useState } from 'react';
import { Search, Calendar, Clock, Home, Users, Mail, Shield } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/Layout';
import { useArticles } from '@/hooks/useArticles';

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  // Fetch articles with optimized hook
  const { data, isLoading, error, refetch } = useArticles(currentPage, pageSize);

  // Extract unique categories from articles
  const categories = data?.articles 
    ? ['All', ...new Set(data.articles.map(article => article.category))]
    : ['All'];

  // Filter articles based on search and category
  const filteredArticles = data?.articles?.filter((article) => {
    const matchesSearch = 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === 'All' || article.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  }) || [];

  // Handle search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  // Handle category filter
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1); // Reset to first page on category change
  };

  // Handle pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Blog
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Explore articles on development, design, and everything in between.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-md mx-auto mb-8">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={handleSearch}
                className="pl-10 h-12"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={activeCategory === category ? "default" : "secondary"}
                  className="cursor-pointer hover:bg-primary/80 transition-colors px-3 py-1"
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          {/* Results Summary */}
          {(searchQuery || activeCategory !== 'All') && (
            <div className="text-center mb-8">
              <p className="text-muted-foreground">
                {searchQuery && `Searching for "${searchQuery}"`}
                {searchQuery && activeCategory !== 'All' && ' • '}
                {activeCategory !== 'All' && `Category: ${activeCategory}`}
                {filteredArticles.length > 0 && ` • ${filteredArticles.length} result${filteredArticles.length !== 1 ? 's' : ''}`}
              </p>
              {(searchQuery || activeCategory !== 'All') && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('All');
                    setCurrentPage(1);
                  }}
                  className="mt-2"
                >
                  Clear filters
                </Button>
              )}
            </div>
          )}

          {/* Articles Grid */}
          {filteredArticles.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold mb-2">No articles found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery || activeCategory !== 'All' 
                  ? 'Try adjusting your filters or search terms.'
                  : 'Check back later for new content.'
                }
              </p>
              {(searchQuery || activeCategory !== 'All') && (
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('All');
                    setCurrentPage(1);
                  }}
                >
                  Clear filters
                </Button>
              )}
            </div>
          )}

          {/* Pagination */}
          {data?.pagination && filteredArticles.length > 0 && (
            <div className="flex items-center justify-center space-x-2 mt-8">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1 || isLoading}
              >
                Previous
              </Button>
              
              <span className="text-sm text-muted-foreground px-4">
                Page {currentPage} of {data.pagination.pageCount}
              </span>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= data.pagination.pageCount || isLoading}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-serif font-bold text-center mb-12">
              Explore More
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              <a href="/" className="group">
                <div className="bg-card rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <Home className="h-8 w-8 mx-auto mb-4 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold mb-2">Home</h3>
                  <p className="text-sm text-muted-foreground">Return to homepage</p>
                </div>
              </a>

              <a href="/about" className="group">
                <div className="bg-card rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <Users className="h-8 w-8 mx-auto mb-4 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold mb-2">About</h3>
                  <p className="text-sm text-muted-foreground">Learn about us</p>
                </div>
              </a>

              <a href="/contact" className="group">
                <div className="bg-card rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <Mail className="h-8 w-8 mx-auto mb-4 text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold mb-2">Contact</h3>
                  <p className="text-sm text-muted-foreground">Get in touch</p>
                </div>
              </a>

              <a href="/privacy-policy" className="group">
                <div className="bg-card rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <Shield className="h-8 w-8 mx-auto mb-4 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold mb-2">Privacy</h3>
                  <p className="text-sm text-muted-foreground">Privacy policy</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

// Article Card Component (moved here for simplicity)
const ArticleCard = ({ article }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateReadingTime = (content) => {
    if (!content) return '3 min read';
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  return (
    <div className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
      {/* Cover Image */}
      <div className="aspect-video overflow-hidden bg-muted">
        {article.cover?.url ? (
          <img
            src={article.cover.url}
            alt={article.cover.alternativeText}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
            <span className="text-2xl font-bold text-muted-foreground">No Image</span>
          </div>
        )}
      </div>

      <div className="p-6">
        {/* Category Badge */}
        <div className="mb-3">
          <Badge variant="secondary" className="text-xs">
            {article.category}
          </Badge>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
          <a href={`/blog/${article.slug}`} className="hover:underline">
            {article.title}
          </a>
        </h3>

        {/* Excerpt */}
        {article.excerpt && (
          <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">
            {article.excerpt}
          </p>
        )}

        {/* Meta Information */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(article.publishedAt)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{calculateReadingTime(article.content)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
