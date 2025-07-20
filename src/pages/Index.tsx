
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchArticles, Article, fetchAfricanNews } from "@/lib/api";
import ArticleCard from "@/components/articles/ArticleCard";
import { ArticleListSkeleton } from "@/components/articles/ArticleSkeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const categories = [
  { name: "Top Stories", slug: "" },
  { name: "Politics", slug: "politics" },
  { name: "Technology", slug: "technology" },
  { name: "Sports", slug: "sport" },
  { name: "Business", slug: "business" },
  { name: "World", slug: "world" },
  { name: "African News", slug: "africa" }, // Added African News category
];

const Index = () => {
  const [activeCategory, setActiveCategory] = useState("");
  const [page, setPage] = useState(1);
  const [featuredArticle, setFeaturedArticle] = useState<Article | null>(null);
  
  const { data, isLoading, isError } = useQuery({
    queryKey: ["articles", activeCategory, page],
    queryFn: () => activeCategory === "africa" 
      ? fetchAfricanNews(page)
      : fetchArticles(activeCategory || undefined, page),
  });
  
  useEffect(() => {
    // Reset page when category changes
    setPage(1);
  }, [activeCategory]);
  
  useEffect(() => {
    // Set featured article from first result if available
    if (data?.response?.results?.length > 0 && page === 1) {
      setFeaturedArticle(data.response.results[0]);
    }
  }, [data, page]);
  
  const articles = data?.response?.results || [];
  const displayedArticles = page === 1 && articles.length > 0 ? articles.slice(1) : articles;
  
  const hasMore = data?.response?.pages > page;
  
  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className="container py-12">
      <section className="mb-16">
        <div className="border-b-4 border-news-red pb-2 mb-8">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-2">Daily Scope</h1>
          <p className="font-serif text-lg text-muted-foreground italic">
            Your daily briefing on the most important stories around the world
          </p>
        </div>
        
        {isLoading && page === 1 ? (
          <ArticleListSkeleton featured={true} />
        ) : featuredArticle ? (
          <ArticleCard article={featuredArticle} featured />
        ) : null}
      </section>

      <div className="newspaper-divider"></div>

      <section>
        <Tabs defaultValue="" className="mb-8" value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList className="mb-8 flex flex-wrap h-auto gap-2 bg-transparent border-b pb-2">
            {categories.map((category) => (
              <TabsTrigger 
                key={category.slug} 
                value={category.slug}
                className="font-display data-[state=active]:bg-news-red data-[state=active]:text-white"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {categories.map((category) => (
            <TabsContent key={category.slug} value={category.slug} className="space-y-8">
              {isLoading && page === 1 ? (
                <ArticleListSkeleton />
              ) : isError ? (
                <div className="text-center py-12">
                  <p className="text-lg font-serif text-muted-foreground">
                    Failed to load articles. Please try again later.
                  </p>
                </div>
              ) : displayedArticles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {displayedArticles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-lg font-serif text-muted-foreground">
                    No articles found in this category.
                  </p>
                </div>
              )}
              
              {hasMore && (
                <div className="flex justify-center mt-8">
                  <Button 
                    onClick={loadMore} 
                    disabled={isLoading}
                    className="bg-news-red hover:bg-news-red/90"
                  >
                    {isLoading ? "Loading..." : "Load More Articles"}
                  </Button>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </section>
    </div>
  );
};

export default Index;
