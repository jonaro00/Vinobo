import React from "react";
import useModelProperty from "../js/useModelProperty.js";
import SidebarView from "../views/sidebarView.js";
import extractID from "../js/transcript.js";

export default function SidebarPresenter(props) {
  const videos = useModelProperty(props.model, "videos");
  return (
    <SidebarView
      videos={videos}
      videoChoice={(id) => props.model.setCurrentVideo(id)}
      addVideo={(ref) => {
        props.model.addVideo(ref);
      }}
      removeVideo={(id) => props.model.removeVideo(id)}
    ></SidebarView>
  );
}
