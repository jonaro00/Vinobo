import React from "react";
import useModelProperty from "../js/useModelProperty.js";
import SidebarView from "../views/sidebarView.js";
import SidebarActiveView from "../views/sidebarActiveView.js";
import { extractID } from "../js/transcript.js";

export default function SidebarPresenter(props) {
  const [error, setError] = React.useState(null);
  const videos = useModelProperty(props.model, "videos");

  return (
    <SidebarView
      videos={videos}
      // In the end only one of videoChoice or addVideo is going to be used.
      videoChoice={(ref) => {
        if (extractID(ref)) {
          console.log("User wants to set video to ID ", extractID(ref));
          props.model.setCurrentVideo(extractID(ref));
        }
        setError("Not referring to a valid ID/URL");
      }}
      addVideo={(ref) => {
        if (extractID(ref)) {
          console.log("User wants to set video to ID ", extractID(ref));
          props.model.setCurrentVideo(extractID(ref));
          props.model.addVideo(extractID(ref));
        }
        setError("Not referring to a valid ID/URL");
      }}
      addCurrentVideo={() => props.model.addVideo(props.model.currentVideo)}
      removeVideo={(id) => props.model.removeVideo(id)}
      error={error}
    ></SidebarView>
  );
}
