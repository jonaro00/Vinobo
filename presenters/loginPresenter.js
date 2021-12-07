import React from "react";
import usePromise from "../js/usePromise";
import { auth } from "../js/firebase-config";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import LoginView from "../views/loginView";

export default function LoginPresenter(props) {
  const [loginEmail, setLoginEmail] = React.useState("");
  const [loginPassword, setLoginPassword] = React.useState("");
  const [user, setUser] = React.useState("");
  const [loginPromise, setLoginPromise] = React.useState(null);
  const [loginData, loginError] = usePromise(loginPromise);
  const [loginStatus, setLoginStatus] = React.useState(false);

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  return (
    <LoginView
      onEmail={(email) => setLoginEmail(email)}
      onPassword={(pw) => setLoginPassword(pw)}
      login={() => setLoginPromise(signInWithEmailAndPassword(auth, loginEmail, loginPassword))}
      error={loginError}
      currentUser={user.email}
    />
  );
}
