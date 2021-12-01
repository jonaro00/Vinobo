import styles from "./sidebarView.module.css";

export default function SidebarView(props) {
  return (
    <div>
      <div>Sidebar</div>
      <div>
        <table>
          {...props.videos.map((video) => {
            <tr key={video.id}>
              <td>{video.name}</td>
            </tr>;
          })}
        </table>
      </div>
    </div>
  );
}
