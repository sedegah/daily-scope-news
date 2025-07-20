
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export const ArticleSkeleton = ({ featured = false }: { featured?: boolean }) => {
  if (featured) {
    return (
      <Card className="overflow-hidden border-0 shadow-lg">
        <div className="grid md:grid-cols-2">
          <Skeleton className="h-64 md:h-full" />
          <div className="p-6">
            <Skeleton className="h-6 w-24 mb-3" />
            <Skeleton className="h-8 mb-2 w-full" />
            <Skeleton className="h-8 mb-2 w-5/6" />
            <Skeleton className="h-8 mb-4 w-4/6" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-4/5 mb-4" />
            <div className="flex items-center justify-between mt-4">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden h-full">
      <Skeleton className="h-48 w-full" />
      <CardContent className="p-4">
        <Skeleton className="h-5 w-24 mb-2" />
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-5/6 mb-2" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-5/6 mb-1" />
        <Skeleton className="h-4 w-4/6" />
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="flex items-center justify-between w-full">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
        </div>
      </CardFooter>
    </Card>
  );
};

export const ArticleListSkeleton = ({ count = 6, featured = false }: { count?: number, featured?: boolean }) => {
  if (featured) {
    return <ArticleSkeleton featured={true} />;
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array(count)
        .fill(0)
        .map((_, i) => (
          <ArticleSkeleton key={i} />
        ))}
    </div>
  );
};
