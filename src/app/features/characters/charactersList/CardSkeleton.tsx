import Skeleton from "@shared/ui/Skeleton";

export default function CardSkeleton() {
  return (
    <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-4 shadow-sm border border-gray-700">
      <Skeleton className="w-full h-40 mb-3 rounded-lg" />
      <Skeleton className="w-3/4 h-5 mb-2" />
      <Skeleton className="w-1/3 h-4" />
    </div>
  );
}
