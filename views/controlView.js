import { loadGetInitialProps } from "next/dist/shared/lib/utils";
import styles from "../styles/ControlView.module.css";

export default function ControlView(props) {
  return (
    <div>
      <form onSubmit={console.log("test")}>
        <div className={styles.controlView}>
          <div>
            <input
              className={styles.controlTimeStamp}
              type="appt-time"
              defaultValue={props.currentTime}
            />
            <input className={styles.controlAddNote} type="submit" value="Add Note" />
          </div>
          <div>
            <textarea className={styles.controlBodyElement} type="textarea" defaultValue="Note" />
          </div>
        </div>
      </form>
    </div>
  );
}
