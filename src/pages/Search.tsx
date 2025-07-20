
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { searchArticles } from "@/lib/api";
import ArticleCard from "@/components/articles/ArticleCard";
import { ArticleListSkeleton } from "@/components/articles/ArticleSkeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get("q") || "";
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [currentQuery, setCurrentQuery] = useState(initialQuery);
  const [page, setPage] = useState(1);
  
  // Reset page when query changes
  useEffect(() => {
    setPage(1);
  }, [currentQuery]);
  
  const { data, isLoading, isError } = useQuery({
    queryKey: ["search", currentQuery, page],
    queryFn: () => searchArticles(currentQuery, page),
    enabled: currentQuery.length > 0,
  });
  
  const articles = data?.response?.results || [];
  const hasMore = data?.response?.pages > page;
  const totalResults = data?.response?.total || 0;
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchQuery.trim()) {
      setCurrentQuery(searchQuery.trim());
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };
  
  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className="container py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Search Results</h1>
        
        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex gap-2">
            <Input
              type="search"
              placeholder="Search for news articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-md"
            />
            <Button type="submit">Search</Button>
          </div>
        </form>
        
        {currentQuery && (
          <p className="text-muted-foreground">
            {isLoading ? (
              "Searching..."
            ) : (
              <>
                Found {totalResults} results for <span className="font-medium">"{currentQuery}"</span>
              </>
            )}
          </p>
        )}
      </header>

      {isLoading && page === 1 ? (
        <ArticleListSkeleton />
      ) : isError ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">
            Failed to load search results. Please try again later.
          </p>
        </div>
      ) : articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : currentQuery ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">
            No articles found for "{currentQuery}". Please try a different search term.
          </p>
        </div>
      ) : null}
      
      {hasMore && (
        <div className="flex justify-center mt-8">
          <Button onClick={loadMore} disabled={isLoading}>
            {isLoading ? "Loading..." : "Load More Results"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Search;
