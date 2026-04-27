import { Skeleton } from "@/components/ui/skeleton";

const VideoCardSkeleton = () => (
  <div className="flex flex-col gap-3">
    <Skeleton className="aspect-video w-full rounded-lg" />
    <div className="flex flex-col items-center gap-2">
      <Skeleton className="h-4 w-3/4" />
      <div className="flex items-center gap-4">
        <Skeleton className="h-3 w-12" />
        <Skeleton className="h-3 w-10" />
      </div>
    </div>
  </div>
);

export default VideoCardSkeleton;