import { useParams, Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, Calendar, Clock, User, Share2, Twitter, Linkedin, BookOpen, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";
import BlogCard from "@/components/BlogCard";
import ReadingProgress from "@/components/ReadingProgress";
import Breadcrumb from "@/components/Breadcrumb";
import { fetchArticleBySlug, mapSingleArticleToUi, mapArticlesToUi, fetchArticles } from "@/lib/strapi";

// Calculate reading time based on content
const calculateReadingTime = (content: string): { minutes: number; words: number } => {
  try {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return { minutes, words };
  } catch (error) {
    console.warn('Error calculating reading time:', error);
    return { minutes: 1, words: 0 };
  }
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<ReturnType<typeof mapSingleArticleToUi>>(null);
  const [related, setRelated] = useState<ReturnType<typeof mapArticlesToUi>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    
    const fetchData = async () => {
      if (!slug) {
        if (mounted) {
          setError("Article slug not provided");
          setLoading(false);
        }
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        // Fetch main article
        const json = await fetchArticleBySlug(slug);
        const mapped = mapSingleArticleToUi(json);
        
        if (!mapped || !mapped.slug) {
          throw new Error("Invalid article data received");
        }
        
        if (mounted) setPost(mapped);

        // Fetch related posts with error handling
        try {
          const allJson = await fetchArticles();
          const allMapped = mapArticlesToUi(allJson);
          const filtered = allMapped
            .filter(p => p.category === mapped?.category && p.slug !== slug)
            .slice(0, 2);
          if (mounted) setRelated(filtered);
        } catch (relatedError) {
          console.warn('Failed to fetch related posts:', relatedError);
          // Don't fail the main article if related posts fail
          if (mounted) setRelated([]);
        }
        
      } catch (e: any) {
        console.error('Error fetching article:', e);
        if (mounted) {
          setError(e?.message || "Failed to load article");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchData();
    
    return () => { 
      mounted = false; 
    };
  }, [slug]);

  // Loading state
  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-gray-200 rounded w-1/3" />
              <div className="h-12 bg-gray-200 rounded" />
              <div className="h-64 bg-gray-200 rounded" />
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded" />
                <div className="h-4 bg-gray-200 rounded w-5/6" />
                <div className="h-4 bg-gray-200 rounded w-4/6" />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Error state - redirect to blog instead of showing blank
  if (error || !post) {
    return <Navigate to="/blog" replace />;
  }

  const { minutes, words } = calculateReadingTime(post.content || '');

  // Safe rich text rendering for Strapi content
  const renderContent = (content: string) => {
    if (!content || typeof content !== 'string') {
      return <p className="mb-4 text-muted-foreground">No content available.</p>;
    }

    // For Strapi rich text, we'll use dangerouslySetInnerHTML since it comes from trusted CMS
    // Convert basic markdown to HTML for better rendering
    const htmlContent = content
      .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-serif font-semibold mt-10 mb-4">$1</h2>')
      .replace(/^# (.+)$/gm, '<h1 class="text-4xl font-serif font-bold mb-6 mt-8">$1</h1>')
      .replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-primary pl-4 italic my-6 text-muted-foreground">$1</blockquote>')
      .replace(/^- (.+)$/gm, '<li class="ml-6 text-muted-foreground mb-2">$1</li>')
      .replace(/^\d+\. (.+)$/gm, '<li class="ml-6 text-muted-foreground mb-2 list-decimal">$1</li>')
      .replace(/`([^`]+)`/g, '<code class="bg-muted px-2 py-1 rounded text-sm font-mono text-foreground">$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      .replace(/\n\n/g, '</p><p class="mb-4 text-muted-foreground leading-relaxed">')
      .replace(/\n/g, '<br />');

    return (
      <div 
        className="prose-blog mb-4 text-muted-foreground leading-relaxed"
        dangerouslySetInnerHTML={{ __html: `<p class="mb-4 text-muted-foreground leading-relaxed">${htmlContent}</p>` }}
      />
    );
  };

  // Safe date formatting
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    } catch (error) {
      console.warn('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  return (
    <Layout>
      <ReadingProgress />
      
      {/* Hero Image */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        <img
          src={post.image || '/placeholder.svg'}
          alt={post.title || 'Article'}
          loading="eager"
          decoding="async"
          sizes="100vw"
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder.svg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      <article className="container mx-auto px-4 -mt-32 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb Navigation */}
          <Breadcrumb currentPage={post.title || 'Untitled Article'} />

          {/* Back button */}
          <Button asChild variant="ghost" className="mb-6 bg-background/80 backdrop-blur">
            <Link to="/blog">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>
          </Button>

          {/* Article Header */}
          <header className="bg-card rounded-2xl p-6 md:p-10 card-shadow mb-8">
            <div className="flex flex-wrap gap-2 mb-6">
              <Badge variant="secondary" className="bg-[#f0f0f0] text-black border-0">
                {post.category || 'Uncategorized'}
              </Badge>
              <Badge variant="outline" className="bg-[#f0f0f0] text-black border-0">
                {minutes} min read
              </Badge>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6">
              {post.title || 'Untitled Article'}
            </h1>

            <p className="text-lg text-muted-foreground mb-6">
              {post.excerpt || 'No excerpt available.'}
            </p>

            {/* Reading Stats */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-medium">
                <Clock className="h-4 w-4" />
                {minutes} min read
              </div>
              <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-3 py-1.5 rounded-full text-sm font-medium">
                <BookOpen className="h-4 w-4" />
                {words.toLocaleString()} words
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-t border-border pt-6">
              <span className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {post.author || 'Anonymous'}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {post.readTime || `${minutes} min read`}
              </span>
            </div>
          </header>

          {/* Article Content */}
          <div className="prose-blog">
            {renderContent(post.content || '')}
          </div>

          {/* Share */}
          <div className="flex items-center gap-4 mt-12 pt-8 border-t border-border">
            <span className="flex items-center gap-2 text-muted-foreground">
              <Share2 className="h-4 w-4" />
              Share:
            </span>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Twitter className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Linkedin className="h-4 w-4" />
            </Button>
          </div>

          {/* Author Card */}
          <div className="mt-12 p-6 bg-muted/50 rounded-2xl">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center text-white text-xl font-bold">
                {(post.author || 'A').charAt(0)}
              </div>
              <div>
                <h3 className="font-semibold mb-1">Written by {post.author || 'Anonymous'}</h3>
                <p className="text-sm text-muted-foreground">
                  Tech writer and developer passionate about creating great user experiences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {related && related.length > 0 && (
        <section className="py-16 md:py-24 mt-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-8 text-center">
              Related Articles
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {related.map((relatedPost) => (
                <BlogCard key={relatedPost.slug} post={relatedPost} />
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default BlogPost;
