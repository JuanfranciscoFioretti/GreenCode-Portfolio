export default function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-4 bg-[var(--secondary-color)] rounded w-3/4"></div>
      <div className="h-4 bg-[var(--secondary-color)] rounded w-1/2"></div>
      <div className="h-4 bg-[var(--secondary-color)] rounded w-2/3"></div>
    </div>
  );
}