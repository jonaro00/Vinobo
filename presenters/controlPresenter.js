import React from "react";
import ControlView from "../views/controlView";
import useModelProperty from "../js/useModelProperty";
import { formatTimestamp } from "../js/transcript";

export default function ControlPresenter(props) {
  const videoTime = toHHMMSS(useModelProperty(props.vidCon, "currentTime"));
  const newNote = { title: "", offset: "", content: "" };
  return (
    <ControlView
      currentTime={videoTime}
      addNote={(ref) => {
        ref.preventDefault();
        console.log(newNote);
        props.model.addNote(newNote);
        console.log(props.model.notes);
      }}
      setTitle={(ref) => {
        ref.preventDefault();
        newNote.title = ref.target.value;
      }}
      setTime={(ref) => {
        ref.preventDefault();
        newNote.offset = ref.target.value;
      }}
      setNote={(ref) => {
        ref.preventDefault();
        newNote.content = ref.target.value;
      }}
    />
  );
}

function toHHMMSS(sec) {
  var hours = Math.floor(sec / 3600);
  var minutes = Math.floor((sec - hours * 3600) / 60);
  var seconds = sec - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return hours + ":" + minutes + ":" + seconds;
}
