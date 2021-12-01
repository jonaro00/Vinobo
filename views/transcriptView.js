import { formatTimestamp } from "../js/transcript";

export default function TranscriptView(props) {
  return (
    <div>
      <input
        type="search"
        onInput={(e) => props.onText(e.target.value)}
        placeholder="search..."
      ></input>
      <div id="transcript-box">
        {props.transcript
          ? [...props.transcript].map((row) => (
              <div
                className={"transcript-line" + (row.highlighted ? " bold" : "")}
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
