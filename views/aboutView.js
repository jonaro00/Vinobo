import styles from "../styles/AboutView.module.css";

export default function AboutView(props) {
  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>
        <div>Vinobo</div>
        <div className={styles.h1s}>Video Notebook</div>
      </h1>
      <hr />
      <main className={styles.body}>
        <h2>About Vinobo</h2>
        <p>
          Vinobo is a web app that allows users to take personal notes during YouTube videos, as
          well as to search for content in a video using the video{"'"}s transcript. Our app is
          intended to help students taking online-based courses, and Vinobo lets you save all your
          notes and videos until the next time you study. Please sign up by clicking the banner, and
          explore the possibilities of Vinobo!
        </p>
        <hr />
        <h2>Creators</h2>
        <p>
          This app was created as a group project during the course DH2642 Interaction Programming
          at KTH Royal Institute of Science. These are the team members:
        </p>
        <div className={styles.creators}>
          <div>Johan Berg</div>
          <div>Elias Beshir</div>
          <div>Bram Albertus Peters</div>
          <div>Simon Falk</div>
        </div>
      </main>
    </div>
  );
}
