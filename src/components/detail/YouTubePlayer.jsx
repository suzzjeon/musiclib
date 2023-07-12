import React from "react";
import YouTube from "react-youtube";

const YouTubePlayer = ({ youtubeUrl }) => {
  let id = "";

  if (youtubeUrl.includes("youtube.com")) {
    id = youtubeUrl.split("v=")[1];
  } else if (youtubeUrl.includes("youtu.be")) {
    id = youtubeUrl.split("/").pop();
  }

  const opts = {
    width: "560",
    height: "315",
    playerVars: {
      // autoplay: 1,
      rel: 0,
      modestbranding: 1,
    },
  };

  return (
    <YouTube
      videoId={id}
      opts={opts}
      onEnd={(e) => {
        e.target.stopVideo(0);
      }}
    />
  );
};

export default YouTubePlayer;
