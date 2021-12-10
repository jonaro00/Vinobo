import React from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import SigninView from "../views/signinView";
import { useRouter } from "next/router";

export default function SigninPresenter({ auth, model, register }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  // const [userData, setUserData] = React.useState("");
  const [userError, setUserError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const submitEmailAndPassword = register
    ? createUserWithEmailAndPassword
    : signInWithEmailAndPassword;

  React.useEffect(() => {
    // At loading stage reset any old errors
    if (loading) setUserError(null);
  }, [loading]);

  React.useEffect(() => {
    onAuthStateChanged(
      auth,
      (user) => {
        // setUserData(user);
        if (user) router.push("/"); // redirect if a logged in user visits this page. Allowing them to log in once again is buggy.
      },
      (error) => {
        setUserError(error);
      }
    );
  }, []);

  return (
    <SigninView
      register={register}
      errorText={userError?.code}
      loading={loading}
      onEmail={(email) => setEmail(email)}
      onPassword={(pw) => setPassword(pw)}
      signInUser={() => {
        console.log("authenticating");
        setLoading(true);
        submitEmailAndPassword(auth, email, password)
          .then((user) => {
            setLoading(false);
          })
          .catch((error) => {
            console.log("failing to authenticate");
            setLoading(false);
            setUserError(error);
          });
      }}
    />
  );
}
