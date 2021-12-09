import React from "react";
import styles from "../styles/Home.module.css";
import HeaderPresenter from "../presenters/headerPresenter";
import SigninPresenter from "../presenters/signinPresenter";

export default function Home({ model, auth }) {
  return (
    <>
      <HeaderPresenter model={model} auth={auth} />
      <div className={styles.pageContent}>
        <SigninPresenter model={model} auth={auth} />
      </div>
    </>
  );
}
