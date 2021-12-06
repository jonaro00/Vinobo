import React from "react";
import Script from "next/script";
import styles from "../styles/Home.module.css";
import TestPresenter from "../presenters/testPresenter";
import HeaderPresenter from "../presenters/headerPresenter";
import VideoPlayerPresenter from "../presenters/videoPlayerPresenter";
import TranscriptPresenter from "../presenters/transcriptPresenter";
import SidebarPresenter from "../presenters/sidebarPresenter";
import NotesPresenter from "../presenters/notesPresenter";
import VideoController from "../js/videoController";
import ControlPresenter from "../presenters/controlPresenter";

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
    props.model.addNote({
      offset: 3663,
      title: "JSX",
      content:
        "Scripts with the attribute text/jsx will not be executed by the browser. The attribute is a signal for Babel to take over and translate the JSX snippets to JavaScript. Babel will then add a SCRIPT to the DOM, which is in JavaScript and will be executed by the browser.",
    });
  });

  return (
    <>
      <Script src="https://www.youtube.com/iframe_api"></Script>

      <HeaderPresenter />
      <div className={styles.pageContent}>
        <div className={styles.sidebar}>
          <SidebarPresenter model={props.model} vidCon={vidCon} />
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
            <TestPresenter model={props.model} vidCon={vidCon} />
            <NotesPresenter model={props.model} />
          </div>
        </div>
      </div>
    </>
  );
}
