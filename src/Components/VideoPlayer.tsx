import React from "react";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";

interface VideoPlayerProps {
  videoUrl: string;
  onEnded: () => void;
  poster?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  onEnded,
  poster,
}) => {
  const videoSource = {
    type: "video" as const,
    sources: [
      {
        src: videoUrl,
        type: "video/mp4",
      },
    ],
    poster,
  };

  return (
    <div className="max-w-5xl mx-auto bg-gray-900 rounded-lg overflow-hidden shadow-2xl p-4">
      <Plyr
        source={videoSource}
        onEnded={() => {
          console.log("video ended");
          onEnded();
        }}
        options={{
          controls: [
            "play-large",
            "play",
            "progress",
            "current-time",
            "mute",
            "volume",
            "captions",
            "settings",
            "fullscreen",
          ],
          speed: { selected: 1, options: [0.75, 1, 1.25, 1.5, 2] },
        }}
      />
    </div>
  );
};

export default VideoPlayer;
