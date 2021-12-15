import TextForm from "./textForm.js";
import styles from "../styles/SidebarView.module.css";
import { formatTimestamp } from "../js/functions.js";
import Loader from "react-loader-spinner";

export default function SidebarActiveView(props) {
  return (
    <>
      <div className={styles.header}>
        {props.collapsed || <div className={styles.title}>My Videos</div>}
        <a onClick={props.onCollapse} className={"btn"}>
          {<i className={"fas " + (!props.collapsed ? "fa-chevron-left" : "fa-chevron-right")} />}
        </a>
      </div>
      {props.collapsed || (
        <>
          <TextForm
            onSubmit={(ref) => props.addVideo(ref)}
            placeholder="Paste YouTube URL..."
            submitValue="Add"
          ></TextForm>
          {props.error && <div className={styles.addError}>{props.error}</div>}
          <div className={styles.videos}>
            {props.loadingVideos ? (
              <Loader type="Rings" color="#9fc5e8" height={60} width={60} />
            ) : (
              [...props.videos].map((video) => (
                <div
                  key={video.id}
                  className={`${styles.videoCard} ${
                    props.currentVideo === video.id ? styles.highlighted : ""
                  }`}
                >
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
                    <button onClick={() => props.removeVideo(video.id)}>
                      <i className={"fas fa-trash-alt"} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </>
  );
}
