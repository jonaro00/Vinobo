import React from "react";
import { getTranscript } from "../js/transcript";
import TranscriptView from "../views/transcriptView";
import useModelProperty from "../js/useModelProperty";
import usePromise from "../js/usePromise";

export default function TranscriptPresenter(props) {
  const id = useModelProperty(props.model, "currentVideo");

  const [promise, setPromise] = React.useState(null);
  React.useEffect(() => setPromise(getTranscript(id)), [id]);
  const [data, error] = usePromise(promise);

  const [query, setQuery] = React.useState("");

  return (
    <TranscriptView transcript={filterTranscript(data, query)} onText={(text) => setQuery(text)} />
  );
}

function filterTranscript(data, query) {
  if (!data) return data;
  return data.filter((row) => row.text.includes(query));
}
