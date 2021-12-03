import NotesView from "../views/notesView.js";
import React from "react";

export default function NotesPresenter(props) {
  return <NotesView notes={props.model.notes} currentVideo={props.model.currentVideo} />;
}
