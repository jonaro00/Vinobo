import React from "react";
import getTranscript from "../js/api";
import { makeStringSearchable, filterList } from "../js/search";
import TranscriptView from "../views/transcriptView";
import useModelProperty from "../js/useModelProperty";
import usePromise from "../js/usePromise";

export default function TranscriptPresenter(props) {
  const id = useModelProperty(props.model, "currentVideo");
  const videoTime = useModelProperty(props.vidCon, "currentTime");
  const currentVideo = useModelProperty(props.model, "currentVideo");

  const [promise, setPromise] = React.useState(null);
  React.useEffect(() => setPromise(id && getTranscript(id)), [id]);
  const [sourceData, error] = usePromise(promise);

  const [processedData, setProcessedData] = React.useState(null);
  React.useEffect(() => {
    if (!sourceData) {
      setProcessedData(sourceData);
      return;
    }
    let data = sourceData.map((row) => ({ ...row, searchText: makeStringSearchable(row.text) }));
    data.reverse();
    let next = null;
    data = data.map((row) => {
      let duration = row.duration;
      if (next) {
        duration = Math.min(row.duration, next.offset - row.offset - 1);
      }
      next = row;
      return { ...row, duration };
    });
    data.reverse();
    setProcessedData(data);
  }, [sourceData]);

  const [query, setQuery] = React.useState("");

  return (
    <TranscriptView
      transcript={
        error || transcriptTransform(processedData, makeStringSearchable(query), videoTime)
      }
      transcriptError={error}
      transcriptPromise={promise}
      onText={(text) => setQuery(text)}
      clearSearchInput={() => setQuery("")}
      selectTimestamp={(offset) => props.vidCon.seek(offset / 1000)}
      videoTime={videoTime}
      currentVideo={currentVideo}
    />
  );
}

/**
 * Filters and modifies the data from transcript API to what the View wants.
 * @param {Array} data The data from transcript API.
 * @param {String} query Search query to filter transcript rows by.
 * @param {Number} highlightTime The time in seconds where to highlight rows
 * @returns {Array} Transformed version of `data`.
 */
function transcriptTransform(data, query, highlightTime) {
  if (!data) return data;
  const highlightTimeMs = highlightTime * 1000;
  const words = query.trim().split(/\s/).filter(Boolean);
  return filterList(data, words, "searchText").map((row) => ({
    ...row,
    highlighted: highlightTimeMs >= row.offset && highlightTimeMs <= row.offset + row.duration,
  }));
}
