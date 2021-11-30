import Head from "next/head";
import Script from "next/script";
import styles from "../styles/Home.module.css";
import TestPresenter from "../presenters/testPresenter";
import Model from "../js/model";

const myModel = new Model();

export default function Home() {
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
        <TestPresenter number={myModel.number} />
        <div id="player"></div>
      </div>
    </>
  );
}
