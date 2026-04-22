import VideoCard from "./VideoCard";

const categories = [
  "Amateur Baddies", "Black Baddies", "Sextapes", "Teen Baddies", "Big Tits",
  "Latina vs BBC", "Black on Black", "Blowjob", "Big Ass", "Latina Baddies",
  "BBW Baddies", "Strippers", "PAWG vs BBC", "Interracial", "PAWG Baddies",
  "White on White", "White on Black", "POV", "Threesome", "Boy-Boy-Girl",
  "Boy-Girl-Girl",
];

const videos = [
  { title: "Shots", duration: "5:14", views: "6", rating: "5" },
  { title: "RC Tape", duration: "2:24", views: "14", rating: "5" },
  { title: "3643", duration: "7:11", views: "0", rating: "5" },
  { title: "Fridge Challenge", duration: "5:55", views: "624", rating: "5" },
  { title: "Deep", duration: "1:33", views: "513", rating: "5" },
  { title: "Love", duration: "12:30", views: "358", rating: "5" },
  { title: "Brandi Tape", duration: "6:05", views: "1.0K", rating: "5" },
  { title: "Arch", duration: "2:25", views: "439", rating: "5" },
  { title: "Bussin", duration: "2:13", views: "407", rating: "5" },
  { title: "Mx", duration: "5:33", views: "804", rating: "5" },
  { title: "Heaven", duration: "2:53", views: "859", rating: "5" },
  { title: "Lord Knows", duration: "22:44", views: "516", rating: "5" },
];

const showOptions = [30, 60, 90, 120];
const pages = [1, 2, 3, 4, 5];

const FeaturedVideos = () => {
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
        {videos.map((v, i) => (
          <VideoCard key={i} {...v} />
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
        <div className="text-white font-bold">20841 videos</div>
      </div>
    </section>
  );
};

export default FeaturedVideos;