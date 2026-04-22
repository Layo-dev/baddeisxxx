import Header from "@/components/Header";
import FeaturedVideos from "@/components/FeaturedVideos";
import PromotedModels from "@/components/PromotedModels";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <h1 className="sr-only">Baddies — Featured Videos and Promoted Models</h1>
        <FeaturedVideos />
        <PromotedModels />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
