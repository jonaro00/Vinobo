import { loadGetInitialProps } from "next/dist/shared/lib/utils";
import styles from "../styles/ControlView.module.css";

export default function ControlView(props) {
  return (
    <div>
      <form>
        <table>
          <tr>
            <td>
              <input type="text" value={props.currentTime} />
            </td>
            <td>
              <input type="submit" value="Add Note" />
            </td>
          </tr>
          <tr>
            <td>
              <textarea size="20" type="textarea" value="Note" />
            </td>
          </tr>
        </table>
      </form>
    </div>
  );
}
