import React from "react";
import Script from "next/script";
import VideoPlayerView from "../views/videoPlayerView";

export default function VideoPlayerPresenter(props) {
  React.useEffect(() => {
    // This function creates an <iframe> (and YouTube player) after the API code downloads.
    window.onYouTubeIframeAPIReady = function () {
      const player = new window.YT.Player("player", {
        playerVars: {
          playsinline: 1,
          modestbranding: 1, // hide YT logo in bottom right
          rel: 0, // show less random suggested videos
        },
        events: {
          onReady: (event) => props.vidCon.onPlayerReady(event),
          onStateChange: (event) => props.vidCon.onPlayerStateChange(event),
        },
      });
      window.player = player; // for debugging video
    };
    return () => {
      console.log("DESTROYING PLAYER ⚠");
      props.vidCon.destroy(); // 2021-12-02 Why is this being called when `id` updates? (ask coach) /J
    };
  }, []);
  return (
    <>
      <Script src="https://www.youtube.com/iframe_api"></Script>
      <VideoPlayerView />
    </>
  );
}
