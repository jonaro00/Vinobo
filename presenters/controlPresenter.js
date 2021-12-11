import React from "react";
import ControlView from "../views/controlView";
import useModelProperty from "../js/useModelProperty";
import { formatTimestamp, parseTimestamp } from "../js/transcript";
import { Note } from "../js/model";

export default function ControlPresenter(props) {
  const videoTime = useModelProperty(props.vidCon, "currentTime");
  const [title, setTitle] = React.useState("");
  const [offset, setOffset] = React.useState("");
  const [content, setContent] = React.useState("");
  return (
    <ControlView
      currentTime={formatTimestamp(videoTime | 0)}
      addNote={(ref) => {
        ref.preventDefault();
        props.model.addNote(new Note(parseTimestamp(offset) || videoTime | 0, title, content));
      }}
      setTitle={(ref) => {
        ref.preventDefault();
        setTitle(ref.target.value);
      }}
      setTimestamp={(ref) => {
        ref.preventDefault();
        setOffset(ref.target.value);
      }}
      setContent={(ref) => {
        ref.preventDefault();
        setContent(ref.target.value);
      }}
    />
  );
}
