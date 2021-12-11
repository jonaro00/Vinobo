import React from "react";
import NoteCard from "../components/noteCard";
import { formatTimestamp } from "../js/transcript";
import styles from "../styles/NotesView.module.css";
import pageStyles from "../styles/Home.module.css";

export default function NotesView(props) {
  const [collapsed, setCollapsed] = React.useState(false);
  return (
    <>
      <div className={styles.header}>
        <a
          onClick={() => {
            const c = !collapsed;
            setCollapsed(c);
            props.parentRef?.current.classList.toggle(pageStyles.collapsed, c);
          }}
          className={`${styles.collapseButton} btn`}
        >
          {collapsed ? "<" : ">"}
        </a>
        {collapsed || (
          <>
            <div className={styles.title}>My Notes</div>
            <input
              type="search"
              onInput={(e) => props.onText(e.target.value)}
              placeholder="Filter notes..."
            ></input>
          </>
        )}
      </div>
      {collapsed || (
        <div className={styles.cards}>
          {props.notes &&
            [...props.notes].map((note) => (
              <NoteCard
                key={note.id}
                extraStyle={{ padding: "8px" }}
                titleElement={<div className={styles.noteTitle}>{note.title}</div>}
                timeElement={
                  <div
                    className={styles.cardTime}
                    onClick={() => props.selectTimestamp(note.offset)}
                  >
                    {formatTimestamp(note.offset)}
                  </div>
                }
                content={<div>{note.content}</div>}
                buttonsRight={
                  <>
                    <button onClick={() => props.removeNote(note.id)}>Delete</button>
                  </>
                }
              />
            ))}
        </div>
      )}
    </>
  );
}
