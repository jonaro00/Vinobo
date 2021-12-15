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
          disabled={!!(props.transcriptError || !props.transcript)}
        ></input>
      </div>
      <div ref={scrollBox} className={styles.transcripts}>
        {props.transcriptError ? (
          <div style={{ textAlign: "center", padding: "6px" }}>
            Failed to get transcript.
            <br />
            Either the video has no transcript, or it has been disabled, or something went wrong on
            our end.
          </div>
        ) : props.transcript ? (
          [...props.transcript].map((row) => (
            <div key={row.offset} className={styles.transcriptRow + (row.highlighted ? " " : "")}>
              <div
                ref={row.highlighted ? activeRow : null}
                className={styles.transcriptTime}
                onClick={(e) => {
                  props.selectTimestamp(row.offset);
                }}
              >
                <div>{formatTimestamp(Math.round(row.offset / 1000))}</div>
              </div>
              <div>{row.text}</div>
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
