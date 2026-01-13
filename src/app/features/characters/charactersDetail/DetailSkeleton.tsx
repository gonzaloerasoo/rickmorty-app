import Skeleton from "@shared/ui/Skeleton";

export default function DetailSkeleton() {
  return (
    <div className="max-w-xl mx-auto mt-10 text-center">
      <Skeleton className="w-64 h-64 mx-auto mb-6 rounded-2xl" />
      <Skeleton className="w-1/2 h-8 mx-auto mb-4" />
      <Skeleton className="w-1/3 h-5 mx-auto mb-2" />
      <Skeleton className="w-1/3 h-5 mx-auto mb-2" />
      <Skeleton className="w-1/3 h-5 mx-auto mb-2" />
      <Skeleton className="w-1/3 h-5 mx-auto mb-2" />
      <Skeleton className="w-24 h-10 mx-auto mt-6 rounded-full" />
    </div>
  );
}
