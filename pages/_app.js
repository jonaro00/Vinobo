import Head from "next/head";
import React from "react";
import "../styles/globals.css";
import Model, { Video, Note } from "../js/model";

const model = new Model(); // user login, users' notes for every video?

function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    window.model = model;
    window.Video = Video;
    window.Note = Note;
  }); // for debugging model
  return (
    <div className="app">
      <Head>
        <title>Vinobo</title>
      </Head>
      <Component {...pageProps} model={model} />
    </div>
  );
}

export default MyApp;
