import TextForm from "./textForm.js";
import styles from "../styles/SidebarView.module.css";
import { formatTimestamp } from "../js/transcript.js";

export default function SidebarView(props) {
  return (
    <>
      <TextForm
        onSubmit={(ref) => props.addVideo(ref)}
        placeholder="Insert YouTube URL or ID"
        submitValue="Add"
      ></TextForm>
      {props.error && <p className="red">{props.error}</p>}
      <div>Saved Videos</div>
      <div className={styles.videos}>
        {props.loadingVideos
          ? "Loading..."
          : [...props.videos].map((video) => (
              <div key={video.id} className={styles.videoCard}>
                <a
                  className={"btn " + styles.videoInfo}
                  onClick={(event) => {
                    event.preventDefault();
                    props.videoChoice(video.id);
                  }}
                >
                  <div>{video.title.length ? video.title : <i>[unknown]</i>}</div>
                  <div className={styles.videoDetails}>
                    <div>{video.notes?.length || 0} notes</div>
                    <div>{formatTimestamp(video.length)}</div>
                  </div>
                </a>
                <div>
                  <button onClick={() => props.removeVideo(video.id)}>x</button>
                </div>
              </div>
            ))}
      </div>
    </>
  );
}
