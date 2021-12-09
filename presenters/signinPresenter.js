import React from "react";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import SigninView from "../views/signinView";
import { set } from "firebase/database";

export default function SigninPresenter({ auth, model }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [userData, setUserData] = React.useState("");
  const [userError, setUserError] = React.useState("");
  React.useEffect(() => {
    onAuthStateChanged(
      auth,
      (user) => {
        setUserData(user);
      },
      (error) => {
        setUserError(error);
      }
    );
  }, [auth]);

  return (
    <SigninView
      onEmail={(email) => setEmail(email)}
      onPassword={(pw) => setPassword(pw)}
      signInUser={() => {
        signInWithEmailAndPassword(auth, email, password);
      }}
      signOutUser={() => signOut(auth)}
      currentUser={userData ? userData.email : ""}
    />
  );
}
