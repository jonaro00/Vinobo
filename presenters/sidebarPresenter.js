import React from "react";
import useModelProperty from "../js/useModelProperty.js";
import usePromise from "../js/usePromise";
import SidebarView from "../views/sidebarView.js";
import SidebarActiveView from "../views/sidebarActiveView.js";
import { extractID } from "../js/transcript.js";

export default function SidebarPresenter(props) {
  const [error, setError] = React.useState(null);
  const videos = useModelProperty(props.model, "videos");
  const id = useModelProperty(props.model, "currentVideo"); // TODO: highlight the active video

  const activeView = true;

  if (activeView) {
    return (
      <SidebarActiveView
        videos={videos}
        videoChoice={(ref) => {
          const id = extractID(ref);
          if (id) {
            console.log("User wants to set video to ID ", extractID(ref));
            props.model.setCurrentVideo(id);
          } else {
            setError("Not referring to a valid ID/URL");
          }
        }}
        addVideo={(ref) => {
          const id = extractID(ref);
          if (id) {
            console.log("User wants to set video to ID ", id);
            props.model.setCurrentVideo(id);
            props.vidCon.getTitle().then((title) =>
              props.model.addVideo({
                id: id,
                title: title,
              })
            );
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
          const id = extractID(ref);
          if (id) {
            console.log("User wants to set video to ID ", id);
            props.model.setCurrentVideo(id);
          } else {
            setError("Not referring to a valid ID/URL");
          }
        }}
        addCurrentVideo={() => {
          props.vidCon.getTitle().then((title) =>
            props.model.addVideo({
              id: extractID(ref),
              title: title,
            })
          );
        }}
        removeVideo={(id) => props.model.removeVideo(id)}
        error={error}
      />
    );
  }
}
