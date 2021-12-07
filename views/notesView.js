import { formatTimestamp } from "../js/transcript";
import styles from "../styles/NotesView.module.css";

export default function NotesView(props) {
  return (
    <div className={styles.container}>
      <h3>Video: {props.currentVideo}</h3>
      <h4>My notes</h4>
      {[...props.notes].map((note) => (
        <div className={styles.noteCard}>
          <div key={note.title}>
            <div className={styles.noteInfo}>
              <div>{note.title}</div>
              <div>{formatTimestamp(note.offset * 1000)}</div>
            </div>
            <div className={styles.notes}>
              <p>{note.content}</p>
            </div>
            <div className={styles.noteControl}>
              <button>Edit</button>
              <button>Delete</button>
            </div>
          </div>
        </div>
      ))}
      <p></p>
    </div>
  );
}
