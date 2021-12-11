import styles from "../styles/AboutView.module.css";

export default function NotesView(props) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>About Vinobo - Video Notebook</div>
      <div className={styles.body}>
        <p>
          Vinobo is an app that makes it easy to manage personal notes for youtube videos, as well
          as to search for video content. Our app is intended to help students taking online-based
          courses, and Vinobo lets you save all your notes and videos until next time you study.
          Please sign up by clicking the banner, and explore the possibilities of Vinobo!
        </p>
      </div>
    </div>
  );
}
