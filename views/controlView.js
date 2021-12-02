import { loadGetInitialProps } from "next/dist/shared/lib/utils";
import styles from "../styles/ControlView.module.css";

export default function ControlView(props) {
  return (
    <div>
      <form>
        <div className={styles.controlView}>
          <div>
            <input className={styles.controlTimeStamp} type="text" value={props.currentTime} />
            <input className={styles.controlAddNote} type="submit" value="Add Note" />
          </div>
          <div>
            <textarea className={styles.controlBodyElement} type="textarea" value="Note" />
          </div>
        </div>
      </form>
    </div>
  );
}
