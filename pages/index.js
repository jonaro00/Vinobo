import Head from "next/head";
import Script from "next/script";
import styles from "../styles/Home.module.css";
import TestPresenter from "../presenters/testPresenter";
import VideoPlayerPresenter from "../presenters/videoPlayerPresenter";
import TranscriptPresenter from "../presenters/transcriptPresenter";

export default function Home(props) {
  props.model.setCurrentVideo("-rmlJzh_K6o");
  return (
    <>
      <Script src="https://www.youtube.com/iframe_api"></Script>
      <Script src="/ytPlayer.js"></Script>
      <div className="app">
        <header className="app-header">
          <h1>Vinobo</h1>
          <p>Test bla bla bla</p>
        </header>
        <div>Content</div>
        <TestPresenter id={props.model.currentVideo} />
        <VideoPlayerPresenter model={props.model} />
        <TranscriptPresenter model={props.model} />
      </div>
    </>
  );
}
