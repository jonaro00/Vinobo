import { loadGetInitialProps } from "next/dist/shared/lib/utils";
import styles from "../styles/ControlView.module.css";

export default function ControlView(props) {
  return (
    <div>
      <form onSubmit={(ref) => props.addNote(ref)}>
        <div className={styles.controlView}>
          <div>
            <input
              className={styles.controlTimeStamp}
              onChange={(ref) => props.setTime(ref)}
              name="timestamp"
              type="appt-time"
              defaultValue={props.currentTime}
            />
            <input className={styles.controlAddNote} type="submit" value="Add Note" />
          </div>
          <div>
            <input
              className={styles.controlTitleElement}
              onChange={(ref) => props.setTitle(ref)}
              name="title"
              type="input"
              defaultValue="Title"
            />
          </div>
          <div>
            <textarea
              className={styles.controlNoteElement}
              onChange={(ref) => props.setNote(ref)}
              name="note"
              type="textarea"
              defaultValue="Note"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
