import React from "react";
import VideoPlayerView from "../views/videoPlayerView";
import useModelProperty from "../js/useModelProperty";

export default function VideoPlayerPresenter(props) {
  const id = useModelProperty(props.model, "currentVideo");

  React.useEffect(() => {
    window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

    let player;

    // This function creates an <iframe> (and YouTube player) after the API code downloads.
    function onYouTubeIframeAPIReady() {
      player = new window.YT.Player("player", {
        height: "390",
        width: "640",
        videoId: "",
        playerVars: {
          playsinline: 1,
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        },
      });
      window.player = player;
    }

    // The API will call this function when the video player is ready.
    function onPlayerReady(event) {
      player.cueVideoById(id);
      //

      console.log(player.getCurrentTime);
    }

    // The API calls this function when the player's state changes.
    function onPlayerStateChange(event) {
      //
    }
    function stopVideo() {
      player.stopVideo();
    }
    function playVideo() {
      player.playVideo();
    }

    function seekVideo(time) {
      player.seekTo(time);
      player.playVideo();
    }
  }, [id]);

  return <VideoPlayerView />;
}
