import NotesView from "../views/notesView";
import React from "react";
import useModelProperty from "../js/useModelProperty";

export default function NotesPresenter(props) {
  const notes = useModelProperty(props.model, "getNotes");

  const [query, setQuery] = React.useState("");

  return (
    <NotesView
      notes={notes}
      removeNote={(noteId) => props.model.removeNote(noteId)}
      onText={setQuery}
      selectTimestamp={(offset) => props.vidCon.seek(offset)}
      parentRef={props.parentRef}
    />
  );
}
