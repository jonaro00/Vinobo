import Head from "next/head";
import Script from "next/script";
import React from "react";
import styles from "../styles/Home.module.css";
import TestPresenter from "../presenters/testPresenter";
import VideoPlayerPresenter from "../presenters/videoPlayerPresenter";
import TranscriptPresenter from "../presenters/transcriptPresenter";
import SidebarPresenter from "../presenters/sidebarPresenter";

export default function Home(props) {
  props.model.setCurrentVideo("-rmlJzh_K6o");
  return (
    <>
      <div className="app">
        <SidebarPresenter model={props.model} />
      </div>
    </>
  );
}
