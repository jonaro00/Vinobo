import React from "react";
import styles from "../styles/Home.module.css";
import AboutView from "../views/aboutView.js";
import HeaderPresenter from "../presenters/headerPresenter";

export default function About({ model, auth }) {
  return (
    <>
      <HeaderPresenter model={model} auth={auth} />
      <div className={styles.pageContent}>
        <div className={styles.aboutView}>
          <AboutView />
        </div>
      </div>
    </>
  );
}
