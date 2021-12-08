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
  const [sourceData, error] = usePromise(promise);

  const [data, setProcessedData] = React.useState(null);
  React.useEffect(() => {
    setProcessedData(
      sourceData &&
        sourceData.map((row) => ({ ...row, searchText: makeStringSearchable(row.text) }))
    );
  }, [sourceData]);

  const [query, setQuery] = React.useState("");

  return (
    <TranscriptView
      transcriptError={error}
      transcript={error || transcriptTransform(data, makeStringSearchable(query), videoTime)}
      onText={(text) => setQuery(text)}
      selectTimestamp={(offset) => props.vidCon.seek(offset / 1000)}
    />
  );
}

/**
 * Filters and modifies the data from transcript API to what the View wants.
 * @param {Array} data The data from transcript API.
 * @param {string} query Search query to filter transcript rows by.
 * @param {number} highlightTime The time in seconds where to highlight rows
 * @returns {Array} Transformed version of `data`.
 */
function transcriptTransform(data, query, highlightTime) {
  if (!data) return data;
  const highlightTimeMs = highlightTime * 1000;
  const words = query.trim().split(/\s/);
  console.log(query, words);
  return data
    .filter((row) => !query || words.find((word) => row.searchText.includes(word)))
    .map((row) => ({
      ...row,
      highlighted:
        highlightTimeMs >= row.offset && highlightTimeMs <= row.offset + row.duration * 0.5,
    }));
}

const punctuationRegex = /[\.,:;-_<>|'*^´`+?\\!"#%&\/()=@{}[\]]/g;
const secondRegex = /[\s-]+/g;
/**
 * Removes punctuation and more.
 * @param {String} str The string to clean.
 * @returns New string.
 */
function makeStringSearchable(str) {
  return str
    .trim()
    .replaceAll(punctuationRegex, "")
    .replaceAll(secondRegex, " ")
    .normalize()
    .toLocaleLowerCase();
}
