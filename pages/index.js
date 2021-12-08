import React from "react";
import styles from "../styles/Home.module.css";
import TestPresenter from "../presenters/testPresenter";
import HeaderPresenter from "../presenters/headerPresenter";
import VideoPlayerPresenter from "../presenters/videoPlayerPresenter";
import TranscriptPresenter from "../presenters/transcriptPresenter";
import SidebarPresenter from "../presenters/sidebarPresenter";
import NotesPresenter from "../presenters/notesPresenter";
import LoginPresenter from "../presenters/loginPresenter";
import VideoController from "../js/videoController";
import ControlPresenter from "../presenters/controlPresenter";
import DataPresenter from "../presenters/dataPresenter";

const vidCon = new VideoController();

export default function Home({ model, auth }) {
  React.useEffect(() => {
    window.vidCon = vidCon; // for debugging video
    const obs = () => {
      vidCon.setVideoID(model.currentVideo);
    };
    model.addObserver(obs);
  });

  return (
    <>
      <HeaderPresenter model={model} auth={auth} />
      <div className={styles.pageContent}>
        <div className={styles.sidebar}>
          <SidebarPresenter model={model} vidCon={vidCon} />
          <LoginPresenter model={model} auth={auth} />
          <DataPresenter />
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
