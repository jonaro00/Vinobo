import { formatTimestamp } from "../js/transcript";
import styles from "../styles/TranscriptView.module.css";

export default function TranscriptView(props) {
  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <input
          type="search"
          onInput={(e) => props.onText(e.target.value)}
          placeholder="search in transcript..."
        ></input>
      </div>
      <div className={styles.transcripts}>
        {
          props.transcriptError
            ? "Failed to get transcript"
            : props.transcript
            ? [...props.transcript].map((row) => (
                <div
                  className={row.highlighted ? "bold" : ""}
                  onClick={(e) => {
                    props.selectTimestamp(row.offset);
                  }}
                  key={row.offset}
                >
                  {formatTimestamp(Math.round(row.offset / 1000))} {row.text}
                </div>
              ))
            : props.transcriptPromise
            ? "Loading..."
            : "" /* No transcript due to no video selected */
        }
      </div>
    </div>
  );
}
