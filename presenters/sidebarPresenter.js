import React from "react";
import useModelProperty from "../js/useModelProperty";
import SidebarView from "../views/sidebarView";
import SidebarActiveView from "../views/sidebarActiveView";
import { extractID } from "../js/transcript";
import { Video } from "../js/model";
import pageStyles from "../styles/Home.module.css";

export default function SidebarPresenter(props) {
  const [error, setError] = React.useState(null);
  const videos = useModelProperty(props.model, "videos");
  const model_id = useModelProperty(props.model, "currentVideo"); // TODO: highlight the active video
  const [loading, setLoading] = React.useState(false);

  const [collapsed, setCollapsed] = React.useState(false);

  return (
    //<>
    <SidebarActiveView
      loadingVideos={loading}
      videos={videos}
      currentVideo={model_id}
      videoChoice={(ref) => {
        const id = extractID(ref);
        if (id) {
          props.model.setCurrentVideo(id);
          setError(null);
        } else {
          setError("No valid YouTube URL or ID found.");
        }
      }}
      addVideo={(ref) => {
        const id = extractID(ref);
        if (id) {
          props.model.setCurrentVideo(id);
          setLoading(true);
          props.vidCon
            .getVideoInfo()
            .then((info) => {
              props.model.addVideo(new Video(id, info.title, info.author, info.length));
              setError(null);
            })
            .catch((error) => setError("Failed to add video"))
            .finally(() => setLoading(false));
        } else {
          setError("No valid YouTube URL or ID found.");
        }
      }}
      removeVideo={(id) => props.model.removeVideo(id)}
      error={error}
      onCollapse={() => {
        const c = !collapsed;
        setCollapsed(c);
        props.parentRef?.current.classList.toggle(pageStyles.collapsed, c);
      }}
      collapsed={collapsed}
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
