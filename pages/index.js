import Head from "next/head";
import React from "react";
import Script from "next/script";
import styles from "../styles/Home.module.css";
import TestPresenter from "../presenters/testPresenter";
import HeaderPresenter from "../presenters/headerPresenter";
import VideoPlayerPresenter from "../presenters/videoPlayerPresenter";
import TranscriptPresenter from "../presenters/transcriptPresenter";
import SidebarPresenter from "../presenters/sidebarPresenter";
import VideoController from "../js/videoController";
import ControlPresenter from "../presenters/controlPresenter";
import useModelProperty from "../js/useModelProperty";

const vidCon = new VideoController();

export default function Home(props) {
  React.useEffect(() => (window.vidCon = vidCon));

  const obs = () => {
    vidCon.setVideoID(props.model.currentVideo);
  };
  props.model.addObserver(obs);
  // return () => props.model.removeObserver(obs);
  // }, []);

  // TEST VIDEO LOAD
  props.model.setCurrentVideo("-rmlJzh_K6o");

  return (
    <>
      <Script src="https://www.youtube.com/iframe_api"></Script>
      <div className="app">
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
              <div>Note1</div>
              <div>Note2</div>
              <div>Note3</div>
              <TestPresenter model={props.model} vidCon={vidCon} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
