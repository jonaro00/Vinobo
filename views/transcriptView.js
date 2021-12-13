import React from "react";
import { formatTimestamp } from "../js/transcript";
import styles from "../styles/TranscriptView.module.css";

export default function TranscriptView(props) {
  const scrollBox = React.useRef(null);
  const activeRow = React.useRef(null);
  React.useEffect(() => {
    if (activeRow.current) scrollBox.current.scroll(0, activeRow.current.offsetTop - 5);
  }, [props.videoTime]);

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <input
          type="search"
          onInput={(e) => props.onText(e.target.value)}
          placeholder="Search transcript..."
          disabled={!!props.transcriptError}
        ></input>
      </div>
      <div ref={scrollBox} className={styles.transcripts}>
        {props.transcriptError ? (
          <div>Failed to get transcript</div>
        ) : props.transcript ? (
          [...props.transcript].map((row) => (
            <div
              ref={row.highlighted ? activeRow : null}
              className={row.highlighted ? "bold" : ""}
              onClick={(e) => {
                props.selectTimestamp(row.offset);
              }}
              key={row.offset}
            >
              {formatTimestamp(Math.round(row.offset / 1000))} {row.text}
            </div>
          ))
        ) : props.transcriptPromise ? (
          "Loading..."
        ) : (
          false /* No transcript due to no video selected */
        )}
      </div>
    </div>
  );
}
