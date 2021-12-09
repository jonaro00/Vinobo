import styles from "../styles/ControlView.module.css";

export default function ControlView(props) {
  return (
    <div>
      <form
        name="addNoteForm"
        onSubmit={(ref) => {
          props.addNote(ref);
          addNoteForm.reset();
        }}
        onKeyDown={(e) => {
          if (e.ctrlKey && e.keyCode == 13 && addNoteForm["note"].value) {
            props.addNote(e);
            addNoteForm.reset();
          }
        }}
      >
        <div className={styles.controlView}>
          <input
            className={styles.controlTimeStamp}
            onChange={(ref) => props.setTimestamp(ref)}
            name="timestamp"
            type="appt-time"
            placeholder={props.currentTime}
          />
          <input type="reset" className={styles.controlClear} value="Clear" />
          <input
            className={styles.controlTitleElement}
            onChange={(ref) => props.setTitle(ref)}
            name="title"
            type="input"
            placeholder="Title"
          />
          <input className={styles.controlAddNote} type="submit" value="Add Note" />
          <textarea
            className={styles.controlNoteElement}
            onChange={(ref) => props.setContent(ref)}
            name="note"
            type="textarea"
            placeholder="Note"
            required
          />
        </div>
      </form>
    </div>
  );
}
