import VideoCard from "./VideoCard";
import { useQuery } from "@tanstack/react-query";
import { listVideos } from "@/lib/videos";

const categories = [
  "All", "Amateur Baddies", "Black Baddies", "Sextapes", "Teen Baddies", "Big Tits",
  "Latina vs BBC", "Black on Black", "Blowjob", "Big Ass", "Latina Baddies",
  "BBW Baddies", "Strippers", "PAWG vs BBC", "Interracial", "PAWG Baddies",
  "White on White", "White on Black", "POV", "Threesome", "Boy-Boy-Girl",
  "Boy-Girl-Girl",
];

const showOptions = [30, 60, 90, 120];
const pages = [1, 2, 3, 4, 5];

const FeaturedVideos = () => {
  const { data: videos = [], isLoading, isError, error } = useQuery({
    queryKey: ["videos", "ready"],
    queryFn: () => listVideos("ready"),
  });

  return (
    <section className="container py-10 sm:py-16">
      <h2 className="text-center text-4xl sm:text-6xl font-bold text-white text-glow tracking-tight">
        FEATURED VIDEOS
      </h2>

      {/* Category chips */}
      <div className="mt-8 flex flex-wrap justify-center gap-2 max-w-5xl mx-auto">
        {categories.map((c) => (
          <span key={c} className="chip">{c}</span>
        ))}
        <span className="chip border-primary text-primary">Show All Categories</span>
      </div>

      {/* Grid */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {isLoading && <p className="text-muted-foreground">Loading videos...</p>}
        {isError && (
          <p className="text-destructive">Could not load videos: {(error as Error).message}</p>
        )}
        {!isLoading && !isError && videos.length === 0 && (
          <p className="text-muted-foreground">No videos are ready yet.</p>
        )}
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            slug={video.slug}
            title={video.title}
            durationSeconds={video.duration_seconds}
            views={video.views}
            rating={video.rating}
            thumbnailUrl={video.thumbnail_url}
          />
        ))}
      </div>

      {/* Pagination row */}
      <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-3">
          <span>Show:</span>
          {showOptions.map((n, i) => (
            <button
              key={n}
              className={`font-bold transition-colors ${
                i === 0 ? "text-primary" : "hover:text-primary"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {pages.map((p) => (
            <button
              key={p}
              className={`h-9 w-9 rounded-full grid place-items-center font-bold transition ${
                p === 1
                  ? "bg-gradient-purple text-white btn-glow"
                  : "text-white hover:text-primary"
              }`}
            >
              {p}
            </button>
          ))}
          <span className="text-white">…</span>
          <button className="text-white hover:text-primary font-bold">695</button>
          <button
            aria-label="Next page"
            className="h-9 w-9 rounded-full grid place-items-center text-white hover:text-primary"
          >
            ›
          </button>
        </div>
        <div className="text-white font-bold">{videos.length} videos</div>
      </div>
    </section>
  );
};

export default FeaturedVideos;