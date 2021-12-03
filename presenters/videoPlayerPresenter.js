import React from "react";
import VideoPlayerView from "../views/videoPlayerView";
import useModelProperty from "../js/useModelProperty";

export default function VideoPlayerPresenter(props) {
  // const id = useModelProperty(props.model, "currentVideo");

  React.useEffect(() => {
    let player;

    // This function creates an <iframe> (and YouTube player) after the API code downloads.
    window.onYouTubeIframeAPIReady = function () {
      player = new window.YT.Player("player", {
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
      window.player = player;
    };
    return () => {
      // console.log("DESTROYING PLAYER ⚠");
      // props.vidCon.destroy(); // 2021-12-02 Why is this being called when `id` updates? (ask coach) /J
    };
  }, []);

  // React.useEffect(() => {
  //   props.vidCon.setVideoID(id);
  // }, [id]);

  return <VideoPlayerView />;
}
