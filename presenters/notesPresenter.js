import NotesView from "../views/notesView";
import React from "react";
import useModelProperty from "../js/useModelProperty";
import useModelGetter from "../js/useModelGetter";

export default function NotesPresenter(props) {
  const id = useModelProperty(props.model, "currentVideo");
  const notes = useModelGetter(props.model, "getNotes");
  return <NotesView notes={notes} />;
}
