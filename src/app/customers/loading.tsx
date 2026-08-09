import { Skeleton } from "@/components/ui/skeleton";

export default function CustomersLoading() {
  return (
    <main className="p-4 sm:p-8 max-w-7xl mx-auto space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-4 w-36" />
      </div>

      <div className="space-y-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </div>
    </main>
  );
}