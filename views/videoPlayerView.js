import styles from "../styles/VideoPlayerView.module.css";

export default function VideoPlayerView(props) {
  return (
    <div className={styles.playerContainer}>
      <div id="player" className={styles.player}></div>
    </div>
  );
}
