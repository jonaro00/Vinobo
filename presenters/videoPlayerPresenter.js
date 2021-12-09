import React from "react";
import Script from "next/script";
import VideoPlayerView from "../views/videoPlayerView";

export default function VideoPlayerPresenter({ model, vidCon }) {
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

  React.useEffect(() => {
    if (!window.onYouTubeIframeAPIReady)
      window.onYouTubeIframeAPIReady = () => vidCon.loadPlayer(model.currentVideo);
    else vidCon.loadPlayer(model.currentVideo);
    return () => {
      console.log("DESTROYING PLAYER ⚠");
      vidCon.destroy();
    };
  }, [vidCon]);

  return (
    <>
      <Script src="https://www.youtube.com/iframe_api"></Script>
      <VideoPlayerView />
    </>
  );
}
