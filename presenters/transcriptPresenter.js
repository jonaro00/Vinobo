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

  return <TranscriptView transcript={data} />;
}
