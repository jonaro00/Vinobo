import NotesView from "../views/notesView.js";
import React from "react";
import useModelProperty from "../js/useModelProperty.js";

export default function NotesPresenter(props) {
  const id = useModelProperty(props.model, "currentVideo");
  const videos = useModelProperty(props.model, "videos");
  return <NotesView notes={props.model.notes} currentVideo={id} />;
}
