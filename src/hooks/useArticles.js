import { useQuery, useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { strapiService, transformArticlesResponse, transformArticle } from '../api/strapi';

// Custom hook for fetching articles with pagination
export const useArticles = (page = 1, pageSize = 6) => {
  console.log('useArticles hook called with:', { page, pageSize });
  
  return useQuery({
    queryKey: ['articles', page, pageSize],
    queryFn: () => {
      console.log('Query function executing...');
      return strapiService.fetchArticles(page, pageSize);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    select: (data) => {
      console.log('Select function called with data:', data);
      const result = transformArticlesResponse(data);
      console.log('Select function result:', result);
      return result;
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    onSuccess: (data) => {
      console.log('Query onSuccess:', data);
    },
    onError: (error) => {
      console.error('Query onError:', error);
    }
  });
};

// Custom hook for infinite scroll pagination
export const useInfiniteArticles = (pageSize = 6) => {
  return useInfiniteQuery({
    queryKey: ['articles', 'infinite'],
    queryFn: ({ pageParam = 1 }) => strapiService.fetchArticles(pageParam, pageSize),
    getNextPageParam: (lastPage, allPages) => {
      const pagination = lastPage.meta?.pagination;
      if (!pagination) return undefined;
      
      const currentPage = pagination.page;
      const totalPages = pagination.pageCount;
      
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    select: (data) => ({
      pages: data.pages.map(transformArticlesResponse),
      pageParams: data.pageParams,
    }),
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });
};

// Custom hook for fetching single article by slug
export const useArticleBySlug = (slug) => {
  return useQuery({
    queryKey: ['article', slug],
    queryFn: () => strapiService.fetchArticleBySlug(slug),
    enabled: !!slug, // Only run query if slug exists
    staleTime: 10 * 60 * 1000, // 10 minutes for single article
    cacheTime: 30 * 60 * 1000, // 30 minutes cache
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    select: (response) => {
      const articles = response.data?.map(transformArticle) || [];
      return articles[0] || null;
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });
};

// Custom hook for prefetching articles
export const usePrefetchArticles = () => {
  const queryClient = useQueryClient();
  
  const prefetchNextPage = (currentPage, pageSize = 6) => {
    queryClient.prefetchQuery({
      queryKey: ['articles', currentPage + 1, pageSize],
      queryFn: () => strapiService.fetchArticles(currentPage + 1, pageSize),
      staleTime: 5 * 60 * 1000,
    });
  };
  
  const prefetchArticle = (slug) => {
    queryClient.prefetchQuery({
      queryKey: ['article', slug],
      queryFn: () => strapiService.fetchArticleBySlug(slug),
      staleTime: 10 * 60 * 1000,
    });
  };
  
  return { prefetchNextPage, prefetchArticle };
};

// Error handling utilities
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    const status = error.response.status;
    const message = error.response.data?.error?.message || error.response.data?.message || 'Server error occurred';
    
    switch (status) {
      case 404:
        return 'Content not found. Please try again later.';
      case 500:
        return 'Server error. Please try again in a few moments.';
      case 429:
        return 'Too many requests. Please try again later.';
      default:
        return message || 'An error occurred while fetching data.';
    }
  } else if (error.request) {
    // Network error
    return 'Network error. Please check your connection and try again.';
  } else {
    // Other error
    return 'An unexpected error occurred. Please try again.';
  }
};

export default useArticles;
