import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User, ArrowRight, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { useArticles, handleApiError } from '@/hooks/useArticles';
import { useQueryClient } from '@tanstack/react-query';
import { strapiService } from '@/api/strapi';

// Article Card Component
const ArticleCard = ({ article, prefetchArticle }) => {
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
    <Card 
      className="group overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
      onMouseEnter={() => prefetchArticle?.(article.slug)}
    >
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

      <CardContent className="p-6">
        {/* Category Badge */}
        <div className="mb-3">
          <Badge variant="secondary" className="text-xs">
            {article.category}
          </Badge>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
          <Link to={`/blog/${article.slug}`} className="hover:underline">
            {article.title}
          </Link>
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
          
          <Link 
            to={`/blog/${article.slug}`}
            className="flex items-center space-x-1 text-primary hover:underline group-hover:translate-x-1 transition-transform"
          >
            <span>Read</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

// Loading Skeleton Component
const ArticlesSkeleton = () => (
  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: 6 }).map((_, index) => (
      <Card key={index} className="overflow-hidden">
        <Skeleton className="aspect-video" />
        <CardContent className="p-6">
          <Skeleton className="h-4 w-20 mb-3" />
          <Skeleton className="h-6 w-full mb-2" />
          <Skeleton className="h-6 w-3/4 mb-4" />
          <div className="flex items-center justify-between">
            <div className="flex space-x-4">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
            </div>
            <Skeleton className="h-4 w-12" />
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

// Error Component
const ArticlesError = ({ error, onRetry }) => {
  const errorMessage = handleApiError(error);

  return (
    <Alert variant="destructive" className="max-w-2xl mx-auto">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription className="flex items-center justify-between">
        <span>{errorMessage}</span>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onRetry}
          className="ml-4"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Retry
        </Button>
      </AlertDescription>
    </Alert>
  );
};

// Pagination Component
const Pagination = ({ pagination, onPageChange, isLoading }) => {
  const { page, pageCount, total } = pagination;
  
  if (pageCount <= 1) return null;

  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);
  const visiblePages = pages.filter(p => 
    p === 1 || p === pageCount || (p >= page - 1 && p <= page + 1)
  );

  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1 || isLoading}
      >
        Previous
      </Button>
      
      {visiblePages.map((pageNum, index) => {
        const prevPage = visiblePages[index - 1];
        const showDots = prevPage && pageNum - prevPage > 1;
        
        return (
          <React.Fragment key={pageNum}>
            {showDots && <span className="px-2">...</span>}
            <Button
              variant={page === pageNum ? "default" : "outline"}
              size="sm"
              onClick={() => onPageChange(pageNum)}
              disabled={isLoading}
            >
              {pageNum}
            </Button>
          </React.Fragment>
        );
      })}
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(page + 1)}
        disabled={page === pageCount || isLoading}
      >
        Next
      </Button>
    </div>
  );
};

// Main Articles Component
const Articles = ({ pageSize = 6, showPagination = true }) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const queryClient = useQueryClient();
  
  const {
    data,
    isLoading,
    error,
    refetch,
    isFetching
  } = useArticles(currentPage, pageSize);

  const prefetchArticle = (slug) => {
    queryClient.prefetchQuery({
      queryKey: ['article', slug],
      queryFn: () => strapiService.fetchArticleBySlug(slug),
      staleTime: 10 * 60 * 1000,
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading && !data) {
    return <ArticlesSkeleton />;
  }

  if (error && !data) {
    return <ArticlesError error={error} onRetry={() => refetch()} />;
  }

  if (!data?.articles?.length) {
    return (
      <div className="text-center py-16">
        <h3 className="text-xl font-semibold mb-2">No articles found</h3>
        <p className="text-muted-foreground">Check back later for new content.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Articles Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.articles.map((article) => (
          <ArticleCard 
            key={article.id} 
            article={article} 
            prefetchArticle={prefetchArticle}
          />
        ))}
      </div>

      {/* Loading indicator for pagination */}
      {isFetching && (
        <div className="flex justify-center mt-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}

      {/* Pagination */}
      {showPagination && data.pagination && (
        <Pagination
          pagination={data.pagination}
          onPageChange={handlePageChange}
          isLoading={isFetching}
        />
      )}

      {/* Results Summary */}
      {data.pagination && (
        <div className="text-center text-sm text-muted-foreground mt-6">
          Showing {data.articles.length} of {data.pagination.total} articles
        </div>
      )}
    </div>
  );
};

export default Articles;
