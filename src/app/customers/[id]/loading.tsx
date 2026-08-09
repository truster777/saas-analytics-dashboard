import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function CustomerLoading() {
  return (
    <main className="p-4 sm:p-8 max-w-5xl mx-auto space-y-6">
      <Skeleton className="h-4 w-32" />

      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-56" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="pb-2 min-h-11 flex items-start">
              <Skeleton className="h-4 w-16" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-6 w-20" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-3">
        <Skeleton className="h-5 w-36" />
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-full" />
        ))}
      </div>
    </main>
  );
}