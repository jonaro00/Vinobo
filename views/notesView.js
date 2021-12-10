import NoteCard from "../components/noteCard";
import { formatTimestamp } from "../js/transcript";
import styles from "../styles/NotesView.module.css";

export default function NotesView(props) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <a className={`${styles.collapseButton} btn`}>></a>
        <div className={styles.title}>My Cards</div>
        <input
          type="search"
          onInput={(e) => props.onText(e.target.value)}
          placeholder="search in notes"
        ></input>
      </div>
      <div className={styles.cards}>
        {props.notes &&
          [...props.notes].map((note) => (
            <NoteCard
              key={note.id}
              extraStyle={{ padding: "8px" }}
              titleElement={<div className={styles.noteTitle}>{note.title}</div>}
              timeElement={<div>{formatTimestamp(note.offset)}</div>}
              content={<p>{note.content}</p>}
              buttonsRight={
                <>
                  <button onClick={() => props.removeNote(note.id)}>Delete</button>
                </>
              }
            />
          ))}
      </div>
    </div>
  );
}
