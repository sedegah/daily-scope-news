
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { Article } from "@/lib/api";
import { Clock } from "lucide-react";
import { calculateReadingTime } from "@/utils/readingTime";

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, featured = false }) => {
  const formattedDate = article.webPublicationDate
    ? formatDistanceToNow(new Date(article.webPublicationDate), { addSuffix: true })
    : "";

  // Check if the article has a thumbnail
  const hasImage = article.fields?.thumbnail;
  
  // Calculate reading time if article body exists
  const readingTime = article.fields?.body 
    ? calculateReadingTime(article.fields.body) 
    : article.fields?.trailText 
      ? calculateReadingTime(article.fields.trailText) * 3 // Estimate based on trail text
      : 3; // Default reading time

  if (featured) {
    return (
      <Card className="overflow-hidden border-0 shadow-lg h-full hover:shadow-xl transition-shadow duration-300">
        <Link to={`/article/${encodeURIComponent(article.id)}`}>
          <div className="grid md:grid-cols-2 h-full">
            <div 
              className={`relative h-64 md:h-full bg-muted ${hasImage ? "" : "flex items-center justify-center"}`}
              style={hasImage ? {
                backgroundImage: `url(${article.fields?.thumbnail})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              } : {}}
            >
              {!hasImage && (
                <div className="text-3xl font-display italic text-news-red">Daily Scope</div>
              )}
              <div className="absolute bottom-0 left-0 bg-news-red text-white px-3 py-1 text-sm font-medium uppercase tracking-wider">
                {article.sectionName}
              </div>
            </div>
            <div className="p-6 flex flex-col">
              <div>
                <h2 className="article-headline mb-3 line-clamp-3 font-display">
                  {article.fields?.headline || article.webTitle}
                </h2>
                <p className="font-serif text-muted-foreground line-clamp-4 mb-4">
                  {article.fields?.trailText || "Read the full article for more details."}
                </p>
              </div>
              <div className="mt-auto">
                <div className="flex items-center justify-between text-sm text-muted-foreground mt-4 border-t pt-4">
                  <span className="font-medium">{article.fields?.byline || "Staff Writer"}</span>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center text-news-red">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{readingTime} min</span>
                    </div>
                    <span>•</span>
                    <span>{formattedDate}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden h-full flex flex-col hover:shadow-md transition-shadow border-t-4 border-t-news-red">
      <Link 
        to={`/article/${encodeURIComponent(article.id)}`}
        className="flex flex-col h-full"
      >
        {hasImage && (
          <div 
            className="relative h-48 w-full bg-muted"
            style={{
              backgroundImage: `url(${article.fields?.thumbnail})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute bottom-0 left-0 bg-news-red text-white px-2 py-1 text-xs font-medium uppercase tracking-wider">
              {article.sectionName}
            </div>
          </div>
        )}
        <CardContent className={`flex-1 flex flex-col p-4 ${!hasImage ? "h-full" : ""}`}>
          {!hasImage && (
            <span className="news-category-badge bg-news-red/10 text-news-red mb-2">
              {article.sectionName}
            </span>
          )}
          <h3 className="font-display font-bold text-lg mb-2 line-clamp-3">
            {article.fields?.headline || article.webTitle}
          </h3>
          <p className="font-serif text-muted-foreground line-clamp-3 text-sm">
            {article.fields?.trailText || "Read the full article for more details."}
          </p>
        </CardContent>
        <CardFooter className="p-4 pt-0 mt-auto border-t">
          <div className="flex items-center justify-between w-full text-sm text-muted-foreground">
            <span className="font-medium">{article.fields?.byline || "Staff Writer"}</span>
            <div className="flex items-center gap-2">
              <div className="flex items-center text-news-red">
                <Clock className="h-3 w-3 mr-1" />
                <span>{readingTime} min</span>
              </div>
              <span className="hidden md:inline">•</span>
              <span className="hidden md:inline">{formattedDate}</span>
            </div>
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default ArticleCard;
