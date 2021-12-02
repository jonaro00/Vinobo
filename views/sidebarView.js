import styles from "./sidebarView.module.css";
import TextForm from "./textForm.js";

export default function SidebarView(props) {
  return (
    <div>
      <div>Sidebar</div>
      <div>
        <table>
          {[...props.videos].map((video) => {
            return (
              <tr key={video.id}>
                <td>
                  <a
                    href=""
                    onClick={(event) => {
                      event.preventDefault();
                      props.videoChoice(video.id);
                    }}
                  >
                    {video.title}
                  </a>
                </td>
                <td>
                  <button onClick={() => props.removeVideo(video.id)}>x</button>
                </td>
              </tr>
            );
          })}
          <tr>
            <td colSpan={2}>
              <TextForm
                onSubmit={(ref) => props.addVideo(ref)}
                placeholder="Add video by URL or video ID"
              ></TextForm>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
}
