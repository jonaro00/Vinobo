import React from "react";
import NoteCard from "../components/noteCard";
import { formatTimestamp } from "../js/transcript";
import styles from "../styles/NotesView.module.css";

export default function NotesView(props) {
  return (
    <>
      <div className={styles.header}>
        <a onClick={props.onCollapse} className={"btn"}>
          {<i className={"fas " + (props.collapsed ? "fa-chevron-left" : "fa-chevron-right")} />}
        </a>
        {props.collapsed || (
          <>
            <div className={styles.title}>My Notes</div>
            {/* <input
              type="search"
              onInput={(e) => props.onText(e.target.value)}
              placeholder="Filter notes..."
            ></input> */}
          </>
        )}
      </div>
      {props.collapsed || (
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
                    <button onClick={() => props.removeNote(note.id)}>
                      <i className={"fas fa-trash-alt"} /> Delete
                    </button>
                  </>
                }
              />
            ))}
        </div>
      )}
    </>
  );
}
