import TextForm from "./textForm.js";
import styles from "../styles/SidebarView.module.css";
import { formatTimestamp } from "../js/transcript.js";

export default function SidebarView(props) {
  return (
    <div>
      <TextForm
        onSubmit={(ref) => props.addVideo(ref)}
        placeholder="Type video URL or ID"
        submitValue="Add"
      ></TextForm>
      <div>My videos</div>
      <div>
        {props.loadingVideos
          ? "Loading..."
          : [...props.videos].map((video) => (
              <div key={video.id} className={styles.videoCard}>
                <div className={styles.videoInfo}>
                  <a
                    href=""
                    onClick={(event) => {
                      event.preventDefault();
                      props.videoChoice(video.id);
                    }}
                  >
                    <div>{video.title}</div>
                    <div className={styles.videoDetails}>
                      <div>{video.notes?.length || 0} notes</div>
                      <div>{formatTimestamp(video.length * 1000)}</div>
                    </div>
                  </a>
                </div>
                <div>
                  <button onClick={() => props.removeVideo(video.id)}>x</button>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
