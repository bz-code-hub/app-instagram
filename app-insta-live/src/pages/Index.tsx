import { VideoPlayer } from "@/components/VideoPlayer";
import { LiveChat } from "@/components/LiveChat";

const Index = () => {
  return (
    <div className="min-h-screen bg-black">
      {/* Mobile-optimized full-screen container - Instagram Live Layout */}
      <div className="relative w-full h-screen flex items-center justify-center overflow-hidden touch-none">
        {/* Video Player Background */}
        <VideoPlayer />

        {/* Chat on the left side + Input at the bottom */}
        <div className="absolute left-0 bottom-0 z-10 w-full">
          <LiveChat />
        </div>
      </div>
    </div>
  );
};

export default Index;
