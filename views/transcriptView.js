export default function TranscriptView(props) {
  return (
    <div>
      <input type="search"></input>
      <div id="transcript-box">
        {props.transcript
          ? [...props.transcript].map((row) => (
              <div key={row.offset}>
                {row.offset} {row.text}
              </div>
            ))
          : "loading"}
      </div>
    </div>
  );
}
