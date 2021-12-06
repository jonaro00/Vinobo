import React from "react";
import useModelProperty from "../js/useModelProperty.js";
import SidebarView from "../views/sidebarView.js";
import SidebarActiveView from "../views/sidebarActiveView.js";
import { extractID } from "../js/transcript.js";

export default function SidebarPresenter(props) {
  const [error, setError] = React.useState(null);
  const videos = useModelProperty(props.model, "videos");
  const model_id = useModelProperty(props.model, "currentVideo"); // TODO: highlight the active video
  const [loading, setLoading] = React.useState(false);

  return (
    //<>
    <SidebarActiveView
      loadingVideos={loading}
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
          setLoading(true);
          props.vidCon
            .getVideoInfo()
            .then((info) =>
              props.model.addVideo({
                id: id,
                title: info.title,
                author: info.author,
                length: info.length,
              })
            )
            .finally(() => setLoading(false));
        } else {
          setError("Not referring to a valid ID/URL");
        }
      }}
      removeVideo={(id) => props.model.removeVideo(id)}
      error={error}
    />
    /*
      <div style={{ padding: "50px 0" }}>
        SidebarActiveView &uarr;
        <br />
        SidebarView &darr;
      </div>{" "}
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
          props.vidCon.getVideoInfo().then((info) =>
            props.model.addVideo({
              id: model_id,
              title: info.title,
              author: info.author,
              length: info.length,
            })
          );
        }}
        removeVideo={(id) => props.model.removeVideo(id)}
        error={error}
      />
      */
    //</>
  );
}
