import SidebarView from "../views/sidebarView";

export default function SidebarPresenter(props) {
  const [videoArr, setVideos] = React.useState([]);
  React.useEffect(function () {
    setVideos([
      {
        id: 13579,
        title: "Star Wars",
      },
      {
        id: 24680,
        title: "Casablanca",
      },
    ]);
  }, []);
  return <SidebarView videos={videoArr}></SidebarView>;
}
