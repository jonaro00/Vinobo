import React from "react";
import styles from "../styles/RegisterSuccess.module.css";
import HeaderPresenter from "../presenters/headerPresenter";
import RegisterSuccessView from "../views/registerSuccessView";

export default function RegisterSuccess({ model, auth }) {
  return (
    <>
      <HeaderPresenter model={model} auth={auth} />
      <div className={styles.pageContent}>
        <div className={styles.registerSuccess}>
          <RegisterSuccessView />
        </div>
      </div>
    </>
  );
}
