import React from "react";
import styles from "../styles/Home.module.css";
import { auth, database } from "../js/firebase-config";
import TestPresenter from "../presenters/testPresenter";
import HeaderPresenter from "../presenters/headerPresenter";
import VideoPlayerPresenter from "../presenters/videoPlayerPresenter";
import TranscriptPresenter from "../presenters/transcriptPresenter";
import SidebarPresenter from "../presenters/sidebarPresenter";
import NotesPresenter from "../presenters/notesPresenter";
import LoginPresenter from "../presenters/loginPresenter";
import VideoController from "../js/videoController";
import { Note } from "../js/model";
import ControlPresenter from "../presenters/controlPresenter";
import DataPresenter from "../presenters/dataPresenter";

const vidCon = new VideoController();

export default function Home(props) {
  React.useEffect(() => {
    window.vidCon = vidCon; // for debugging video
    const obs = () => {
      vidCon.setVideoID(props.model.currentVideo);
    };
    props.model.addObserver(obs);
    // TEST VIDEO LOAD
    props.model.setCurrentVideo("-rmlJzh_K6o");
    // TEST NOTE
    props.model.addNote(
      new Note(
        3663,
        "JSX",
        "Scripts with the attribute text/jsx will not be executed by the browser. The attribute is a signal for Babel to take over and translate the JSX snippets to JavaScript. Babel will then add a SCRIPT to the DOM, which is in JavaScript and will be executed by the browser."
      )
    );
  });

  return (
    <>
      <HeaderPresenter />
      <div className={styles.pageContent}>
        <div className={styles.sidebar}>
          <SidebarPresenter model={props.model} vidCon={vidCon} />
          <LoginPresenter vidCon={vidCon} />
          <DataPresenter />
        </div>
        <div className={styles.mainContent}>
          <div className={styles.videoAndControlsContainer}>
            <VideoPlayerPresenter model={props.model} vidCon={vidCon} />
            <div className={styles.transcriptAndControls}>
              <div className={styles.transcriptView}>
                <TranscriptPresenter model={props.model} vidCon={vidCon} />
              </div>
              <div className={styles.controlView}>
                <ControlPresenter model={props.model} vidCon={vidCon} />
              </div>
            </div>
          </div>
          <div className={styles.notesContainer}>
            <NotesPresenter model={props.model} />
          </div>
        </div>
      </div>
      <TestPresenter model={props.model} vidCon={vidCon} />
    </>
  );
}
