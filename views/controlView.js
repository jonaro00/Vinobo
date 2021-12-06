import styles from "../styles/ControlView.module.css";

export default function ControlView(props) {
  return (
    <div>
      <form
        onSubmit={(ref) => {
          props.addNote(ref);
          ref.target.reset();
        }}
      >
        <div className={styles.controlView}>
          <div>
            <input
              className={styles.controlTimeStamp}
              onChange={(ref) => props.setTimestamp(ref)}
              name="timestamp"
              type="appt-time"
              placeholder={props.currentTime}
            />
            <input className={styles.controlAddNote} type="submit" value="Add Note" />
          </div>
          <div>
            <input
              className={styles.controlTitleElement}
              onChange={(ref) => props.setTitle(ref)}
              name="title"
              type="input"
              placeholder="Title"
              required
            />
          </div>
          <div>
            <textarea
              className={styles.controlNoteElement}
              onChange={(ref) => props.setContent(ref)}
              name="note"
              type="textarea"
              placeholder="Note"
              required
            />
          </div>
        </div>
      </form>
    </div>
  );
}
