import React from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import LoginView from "../views/loginView";
import useModelProperty from "../js/useModelProperty";

export default function LoginPresenter({ model, auth }) {
  const [loginEmail, setLoginEmail] = React.useState("");
  const [loginPassword, setLoginPassword] = React.useState("");
  const user = useModelProperty(model, "user");

  return (
    <LoginView
      onEmail={(email) => setLoginEmail(email)}
      onPassword={(pw) => setLoginPassword(pw)}
      login={() => signInWithEmailAndPassword(auth, loginEmail, loginPassword)}
      logout={() => signOut(auth)}
      // error={loginError}
      currentUser={user || ""}
    />
  );
}
