import React from "react";
import styles from "../styles/Home.module.css";
import TestPresenter from "../presenters/testPresenter";
import HeaderPresenter from "../presenters/headerPresenter";
import VideoPlayerPresenter from "../presenters/videoPlayerPresenter";
import TranscriptPresenter from "../presenters/transcriptPresenter";
import SidebarPresenter from "../presenters/sidebarPresenter";
import NotesPresenter from "../presenters/notesPresenter";
import VideoController from "../js/videoController";
import ControlPresenter from "../presenters/controlPresenter";

const vidCon = new VideoController("player");

export default function Home({ model, auth }) {
  return (
    <>
      <HeaderPresenter model={model} vidCon={vidCon} auth={auth} />
      <div className={styles.pageContent}>
        <div className={styles.sidebar}>
          <SidebarPresenter model={model} vidCon={vidCon} />
        </div>
        <div className={styles.mainContent}>
          <div className={styles.videoAndControlsContainer}>
            <VideoPlayerPresenter model={model} vidCon={vidCon} />
            <div className={styles.transcriptAndControls}>
              <div className={styles.transcriptView}>
                <TranscriptPresenter model={model} vidCon={vidCon} />
              </div>
              <div className={styles.controlView}>
                <ControlPresenter model={model} vidCon={vidCon} />
              </div>
            </div>
          </div>
          <div className={styles.notesContainer}>
            <NotesPresenter model={model} />
          </div>
        </div>
      </div>
      <TestPresenter model={model} vidCon={vidCon} />
    </>
  );
}
