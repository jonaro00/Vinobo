import React from "react";
import SidebarView from "../views/sidebarView";
import extractID from "../js/transcript.js";

export default function SidebarPresenter(props) {
  const [videoArr, setVideos] = React.useState([
    {
      id: 13579,
      name: "Star Wars",
    },
    {
      id: 24680,
      name: "Casablanca",
    },
  ]);
  return (
    <SidebarView
      videos={videoArr}
      addVideo={(ref) => console.log("User wants to add video with URL/ID", ref)}
      removeVideo={(id) => setVideos(videoArr.filter((v) => v.id != id))}
    ></SidebarView>
  );
}
