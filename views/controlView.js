import NoteCard from "../components/noteCard";
import styles from "../styles/ControlView.module.css";

export default function ControlView(props) {
  return (
    <form
      name="addNoteForm"
      onSubmit={(ref) => {
        props.addNote(ref);
        addNoteForm.reset();
      }}
      onKeyDown={(e) => {
        if (e.ctrlKey && e.keyCode == 13) {
          if (!addNoteForm["note"].value) {
            addNoteForm["note"].select();
          } else {
            props.addNote(e);
            addNoteForm.reset();
          }
        }
      }}
    >
      <NoteCard
        extraStyle={{ padding: "10px" }}
        titleElement={
          <input
            className={styles.controlTitle}
            onChange={(ref) => props.setTitle(ref)}
            name="title"
            type="input"
            placeholder="Title"
            required
          />
        }
        timeElement={
          <input
            className={styles.controlTime}
            onChange={(ref) => props.setTimestamp(ref)}
            name="timestamp"
            type="appt-time"
            placeholder={props.currentTime}
          />
        }
        content={
          <textarea
            className={styles.controlContent}
            onChange={(ref) => props.setContent(ref)}
            name="note"
            type="textarea"
            placeholder="Note"
            required
          />
        }
        buttonsLeft={<input type="reset" value="Clear" />}
        buttonsRight={<input type="submit" value="Add Note" />}
      />
    </form>
  );
}
