import React from "react";
import useModelProperty from "../js/useModelProperty.js";
import usePromise from "../js/usePromise";
import SidebarView from "../views/sidebarView.js";
import SidebarActiveView from "../views/sidebarActiveView.js";
import { extractID } from "../js/transcript.js";

export default function SidebarPresenter(props) {
  const [error, setError] = React.useState(null);
  const videos = useModelProperty(props.model, "videos");
  const id = useModelProperty(props.model, "currentVideo");

  const [promise, setPromise] = React.useState(null);
  React.useEffect(() => setPromise(props.vidCon.getTitle()), [id]);
  const [titleData, titleError] = usePromise(promise);

  const activeView = true;

  if (activeView) {
    return (
      <SidebarActiveView
        videos={videos}
        videoChoice={(ref) => {
          if (extractID(ref)) {
            console.log("User wants to set video to ID ", extractID(ref));
            props.model.setCurrentVideo(extractID(ref));
          } else {
            setError("Not referring to a valid ID/URL");
          }
        }}
        addVideo={(ref) => {
          if (extractID(ref)) {
            console.log("User wants to set video to ID ", extractID(ref));
            props.model.setCurrentVideo(extractID(ref));
            props.model.addVideo({
              id: extractID(ref),
              title: titleData,
            });
          } else {
            setError("Not referring to a valid ID/URL");
          }
        }}
        removeVideo={(id) => props.model.removeVideo(id)}
        error={error}
      />
    );
  } else {
    return (
      <SidebarView
        videos={videos}
        videoChoice={(ref) => {
          if (extractID(ref)) {
            console.log("User wants to set video to ID ", extractID(ref));
            props.model.setCurrentVideo(extractID(ref));
          } else {
            setError("Not referring to a valid ID/URL");
          }
        }}
        addCurrentVideo={() => {
          props.model.addVideo({
            id: props.model.currentVideo,
            title: titleData,
          });
        }}
        removeVideo={(id) => props.model.removeVideo(id)}
        error={error}
      />
    );
  }
}
