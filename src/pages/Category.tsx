
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchArticles, fetchAfricanNews } from "@/lib/api";
import ArticleCard from "@/components/articles/ArticleCard";
import { ArticleListSkeleton } from "@/components/articles/ArticleSkeleton";
import { Button } from "@/components/ui/button";

const categoryNames: Record<string, string> = {
  politics: "Politics",
  technology: "Technology",
  sport: "Sports",
  business: "Business",
  world: "World News",
  culture: "Culture",
  environment: "Environment",
  science: "Science",
  africa: "African News", // Add Africa category
};

const Category = () => {
  const { categoryId = "" } = useParams<{ categoryId: string }>();
  const [page, setPage] = useState(1);
  
  // Reset page when category changes
  useEffect(() => {
    setPage(1);
  }, [categoryId]);
  
  // Use fetchAfricanNews for the "africa" category, otherwise use fetchArticles
  const { data, isLoading, isError } = useQuery({
    queryKey: ["category", categoryId, page],
    queryFn: () => categoryId === "africa" 
      ? fetchAfricanNews(page)
      : fetchArticles(categoryId, page),
    enabled: !!categoryId,
  });
  
  const articles = data?.response?.results || [];
  const hasMore = data?.response?.pages > page;
  
  const loadMore = () => {
    setPage((prev) => prev + 1);
  };
  
  const displayName = categoryNames[categoryId] || categoryId;

  return (
    <div className="container py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold capitalize">{displayName}</h1>
        <p className="text-muted-foreground mt-2">
          {categoryId === "africa" 
            ? "The latest news and updates from across the African continent" 
            : `The latest news and updates from the ${displayName.toLowerCase()} section`}
        </p>
      </header>

      {isLoading && page === 1 ? (
        <ArticleListSkeleton />
      ) : isError ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">
            Failed to load articles. Please try again later.
          </p>
        </div>
      ) : articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">
            No articles found in this category.
          </p>
        </div>
      )}
      
      {hasMore && (
        <div className="flex justify-center mt-8">
          <Button onClick={loadMore} disabled={isLoading}>
            {isLoading ? "Loading..." : "Load More Articles"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Category;
