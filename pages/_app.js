import Head from "next/head";
import Script from "next/script";
import React from "react";
import "../styles/globals.css";
import Model, { Video, Note } from "../js/model";
import { auth } from "../js/firebaseSetup";
import { onAuthStateChanged } from "@firebase/auth";
import persistModel from "../js/persistModel";

const model = new Model();

function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    window.model = model;
    window.Video = Video;
    window.Note = Note;
    window.auth = auth;
  }); // for debugging model

  const [loadingUser, setLoadingUser] = React.useState(false);

  React.useEffect(() => {
    setLoadingUser(true);
    let unsubscribePersistor = null;
    onAuthStateChanged(
      auth,
      (user) => {
        // user is `User` object or `null`
        model.setUser(user ? user.email : null);
        setLoadingUser(false);
        if (user) {
          console.log("User signed in:", user.email);
          unsubscribePersistor = persistModel(model);
        } else {
          console.log("No user is signed in");
          if (unsubscribePersistor) {
            unsubscribePersistor();
            unsubscribePersistor = null;
          }
          model.clear();
        }
      },
      (error) => {
        setLoadingUser(false);
        console.log(error);
      },
      (completed) => {}
    );
  }, []);

  return (
    <div className="app">
      <Head>
        <title>Vinobo</title>
      </Head>
      <Script src="https://kit.fontawesome.com/067013981a.js" crossorigin="anonymous" />
      <Component {...pageProps} model={model} auth={auth} loadingUser={loadingUser} />
    </div>
  );
}

export default MyApp;
