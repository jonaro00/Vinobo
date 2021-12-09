import styles from "../styles/NoteCard.module.css";

export default function NoteCard({ titleElement, timeElement, content, buttons, padding }) {
  return (
    <div className={styles.noteCard} style={{ padding: padding }}>
      <div className={styles.noteInfo}>
        {titleElement}
        {timeElement}
      </div>
      <div className={styles.content}>{content}</div>
      <div className={styles.buttons}>{buttons}</div>
    </div>
  );
}
