import React from "react";
import styles from "../styles/Signin.module.css";
import HeaderPresenter from "../presenters/headerPresenter";
import SigninPresenter from "../presenters/signinPresenter";

export default function Register({ model, auth }) {
  return (
    <>
      <HeaderPresenter model={model} auth={auth} />
      <div className={styles.pageContent}>
        <div className={styles.signin}>
          <SigninPresenter model={model} auth={auth} register={true} href={"/registerSuccess"} />
        </div>
      </div>
    </>
  );
}
