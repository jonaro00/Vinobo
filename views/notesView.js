import NoteCard from "../components/noteCard";
import { formatTimestamp } from "../js/transcript";
import styles from "../styles/NotesView.module.css";

export default function NotesView(props) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <a href="" className={styles.collapseButton}>
          Collapse/Open
        </a>
        <div className={styles.title}>My Cards</div>
      </div>
      <div className={styles.cards}>
        {props.notes &&
          [...props.notes].map((note) => (
            <NoteCard
              key={note.id}
              padding={"8px"}
              titleElement={<div>{note.title}</div>}
              timeElement={<div>{formatTimestamp(note.offset * 1000)}</div>}
              content={<p>{note.content}</p>}
              buttons={
                <>
                  <button>Edit</button>
                  <button onClick={() => props.removeNote(note.id)}>Delete</button>
                </>
              }
            />
          ))}
      </div>
    </div>
  );
}
