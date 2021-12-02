import { formatTimestamp } from "../js/transcript";
import styles from "../styles/TranscriptView.module.css";

export default function TranscriptView(props) {
  return (
    <div className={styles.container}>
      <input
        type="search"
        onInput={(e) => props.onText(e.target.value)}
        placeholder="search..."
      ></input>
      <div className={styles.transcripts}>
        {props.transcriptError
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
                {formatTimestamp(row.offset)} {row.text}
              </div>
            ))
          : "loading"}
      </div>
    </div>
  );
}
