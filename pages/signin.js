import React from "react";
import styles from "../styles/Signin.module.css";
import HeaderPresenter from "../presenters/headerPresenter";
import SigninPresenter from "../presenters/signinPresenter";
import RegisterPresenter from "../presenters/registerPresenter";

export default function Signin({ model, auth }) {
  return (
    <>
      <HeaderPresenter model={model} auth={auth} />
      <div className={styles.pageContent}>
        <div className={styles.signin}>
          <SigninPresenter model={model} auth={auth} />
        </div>
        <div className={styles.signin}>
          <RegisterPresenter model={model} auth={auth} />
        </div>
      </div>
    </>
  );
}
