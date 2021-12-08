import Head from "next/head";
import React from "react";
import "../styles/globals.css";
import Model, { Video, Note } from "../js/model";
import usePromise from "../js/usePromise";
import { auth } from "../js/firebaseSetup";
import { onAuthStateChanged } from "@firebase/auth";

const model = new Model();

function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    window.model = model;
    window.Video = Video;
    window.Note = Note;
  }); // for debugging model

  // const [loginPromise, setLoginPromise] = React.useState(null);
  // const [loginData, loginError] = usePromise(loginPromise);
  // const [user, setUser] = React.useState(null);
  const [loadingUser, setLoadingUser] = React.useState(false);

  React.useEffect(() => {
    setLoadingUser(true);
    onAuthStateChanged(
      auth,
      (user) => {
        // user is `User` object or `null`
        // setUser(user);
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
