import "../styles/globals.css";
import Model from "../js/model";
import React from "react";

const model = new Model(); // user login, users' notes for every video?

function MyApp({ Component, pageProps }) {
  React.useEffect(() => (window.model = model));
  return <Component {...pageProps} model={model} />;
}

export default MyApp;
