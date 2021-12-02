import React from "react";
import { getTranscript } from "../js/transcript";
import TranscriptView from "../views/transcriptView";
import useModelProperty from "../js/useModelProperty";
import usePromise from "../js/usePromise";

export default function TranscriptPresenter(props) {
  const id = useModelProperty(props.model, "currentVideo");
  const videoTime = useModelProperty(props.vidCon, "currentTime");

  const [promise, setPromise] = React.useState(null);
  React.useEffect(() => setPromise(getTranscript(id)), [id]);
  const [data, error] = usePromise(promise);

  const [query, setQuery] = React.useState("");

  return (
    <TranscriptView
      transcriptError={error}
      transcript={error || transcriptTransform(data, query, videoTime)}
      onText={(text) => setQuery(text)}
      selectTimestamp={(offset) => props.vidCon.seek(offset / 1000)}
    />
  );
}

function transcriptTransform(data, query, highlightTime) {
  if (!data) return data;
  var highlightTimeMs = highlightTime * 1000;
  return data
    .filter((row) => row.text.includes(query))
    .map((row) => ({
      ...row,
      highlighted: highlightTimeMs >= row.offset && highlightTimeMs <= row.offset + row.duration,
    }));
}
