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
        height: "390",
        width: "640",
        videoId: "",
        playerVars: {
          playsinline: 1,
          modestbranding: 1,
          rel: 0,
        },
        events: {
          onReady: (event) => props.vidCon.onPlayerReady(event),
          onStateChange: props.vidCon.onPlayerStateChange,
        },
      });
      window.player = player;
      // props.vidCon.addInitializer(() => {
      //   console.log("got called");
      //   props.vidCon.setPlayer(player);
      // });
    };
  }, []);

  // React.useEffect(() => {
  //   props.vidCon.setVideoID(id);
  // }, [id]);

  return <VideoPlayerView />;
}
