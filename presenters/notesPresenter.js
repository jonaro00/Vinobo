import NotesView from "../views/notesView";
import React from "react";
import useModelProperty from "../js/useModelProperty";
import pageStyles from "../styles/Home.module.css";

export default function NotesPresenter(props) {
  const notes = useModelProperty(props.model, "getNotes");

  const [query, setQuery] = React.useState("");

  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <NotesView
      notes={notes}
      removeNote={(noteId) => props.model.removeNote(noteId)}
      onText={setQuery}
      selectTimestamp={(offset) => props.vidCon.seek(offset)}
      onCollapse={() => {
        const c = !collapsed;
        setCollapsed(c);
        props.parentRef?.current.classList.toggle(pageStyles.collapsed, c);
      }}
      collapsed={collapsed}
    />
  );
}
