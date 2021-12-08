import Head from "next/head";
import React from "react";
import "../styles/globals.css";
import Model, { Video, Note } from "../js/model";
import { auth } from "../js/firebaseSetup";
import { onAuthStateChanged } from "@firebase/auth";
import persistModel from "../js/persistModel";

const model = new Model(); // user login, users' notes for every video?
persistModel(model);

function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    window.model = model;
    window.Video = Video;
    window.Note = Note;
  }); // for debugging model

  const [loadingUser, setLoadingUser] = React.useState(false);

  React.useEffect(() => {
    setLoadingUser(true);
    onAuthStateChanged(
      auth,
      (user) => {
        // user is `User` object or `null`
        model.setUser(user ? user.email : "");
        setLoadingUser(false);
        if (user) {
          console.log("User signed in:", user.email);
          // TODO persist model
        } else {
          console.log("No user is signed in");
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
      <Component {...pageProps} model={model} auth={auth} loadingUser={loadingUser} />
    </div>
  );
}

export default MyApp;
