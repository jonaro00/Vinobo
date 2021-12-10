import React from "react";
import Script from "next/script";
import VideoPlayerView from "../views/videoPlayerView";

export default function VideoPlayerPresenter({ model, vidCon }) {
  // Binding VideoController to model
  React.useEffect(() => {
    window.vidCon = vidCon; // for debugging video
    const obs = () => {
      vidCon.setVideoID(model.currentVideo);
    };
    model.addObserver(obs);
    return () => {
      model.removeObserver(obs);
    };
  }, [model, vidCon]);

  // Binding YT API to VideoController and loading player
  React.useEffect(() => {
    if (!window.onYouTubeIframeAPIReady)
      window.onYouTubeIframeAPIReady = () => vidCon.loadPlayer(model.currentVideo);
    else vidCon.loadPlayer(model.currentVideo);
    return () => {
      vidCon.destroy();
    };
  }, [model, vidCon]);

  return (
    <>
      <Script src="https://www.youtube.com/iframe_api"></Script>
      <VideoPlayerView />
    </>
  );
}
