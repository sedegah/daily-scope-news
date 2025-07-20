
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchArticleById, fetchArticles, Article as ArticleType } from "@/lib/api";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";
import ShareButtons from "@/components/articles/ShareButtons";
import ArticleCard from "@/components/articles/ArticleCard";
import { calculateReadingTime } from "@/utils/readingTime";
import { Clock } from "lucide-react";

const Article = () => {
  const { articleId = "" } = useParams<{ articleId: string }>();
  
  const { data: article, isLoading, isError } = useQuery({
    queryKey: ["article", articleId],
    queryFn: () => fetchArticleById(articleId),
    enabled: !!articleId,
  });
  
  // Get related articles from the same section
  const { data: relatedData } = useQuery({
    queryKey: ["related", article?.sectionName],
    queryFn: () => fetchArticles(article?.sectionName, 1, 4),
    enabled: !!article?.sectionName,
  });
  
  const relatedArticles = relatedData?.response?.results?.filter(
    (relatedArticle) => relatedArticle.id !== articleId
  ).slice(0, 3) || [];
  
  const formattedDate = article?.webPublicationDate
    ? new Date(article.webPublicationDate).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";
      
  // Calculate reading time if article body exists
  const readingTime = article?.fields?.body 
    ? calculateReadingTime(article.fields.body) 
    : 0;
  
  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="max-w-3xl mx-auto">
          <Skeleton className="h-8 w-3/4 mb-2" />
          <Skeleton className="h-6 w-1/2 mb-8" />
          <Skeleton className="h-64 w-full mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-5/6" />
            <Skeleton className="h-6 w-4/5" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-3/4" />
          </div>
        </div>
      </div>
    );
  }
  
  if (isError || !article) {
    return (
      <div className="container py-8">
        <Card className="p-8 max-w-3xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Article not found</h1>
          <p className="text-muted-foreground">
            The article you're looking for could not be found or is no longer available.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <article className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 font-display leading-tight">
            {article.fields?.headline || article.webTitle}
          </h1>
          
          <div className="flex flex-wrap items-center text-muted-foreground mb-6 gap-2">
            <span className="font-medium">
              {article.fields?.byline || "Staff Writer"}
            </span>
            <span className="mx-2">•</span>
            <time>{formattedDate}</time>
            {readingTime > 0 && (
              <>
                <span className="mx-2">•</span>
                <div className="flex items-center gap-1 text-news-red">
                  <Clock className="h-4 w-4" />
                  <span>{readingTime} min read</span>
                </div>
              </>
            )}
          </div>
          
          {article.fields?.thumbnail && (
            <div className="relative">
              <div 
                className="w-full h-[400px] bg-muted mb-8 rounded-lg overflow-hidden"
                style={{
                  backgroundImage: `url(${article.fields?.thumbnail})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div className="absolute bottom-10 left-4 bg-news-red text-white px-3 py-1 text-sm font-medium uppercase tracking-wider">
                {article.sectionName}
              </div>
            </div>
          )}
        </header>
        
        <div 
          className="prose prose-lg max-w-none article-body mb-8"
          dangerouslySetInnerHTML={{ __html: article.fields?.body || "" }}
        />
        
        <div className="border-t pt-6 mt-8">
          <ShareButtons 
            title={article.fields?.headline || article.webTitle} 
            url={window.location.href}
          />
        </div>
      </article>
      
      {relatedArticles.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6 font-display">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((relatedArticle) => (
              <ArticleCard key={relatedArticle.id} article={relatedArticle} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Article;
