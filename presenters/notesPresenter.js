import NotesView from "../views/notesView.js";
import React from "react";
import useModelProperty from "../js/useModelProperty.js";

export default function NotesPresenter(props) {
  const id = useModelProperty(props.model, "currentVideo");
  const notes = useModelProperty(props.model, "notes");
  return <NotesView notes={notes} currentVideo={id} />;
}
