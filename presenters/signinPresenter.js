import React from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import SigninView from "../views/signinView";
import { useRouter } from "next/router";
import useModelProperty from "../js/useModelProperty";

const userErrors = {
  "auth/user-not-found": "No user with that email address was found.",
  "auth/wrong-password": "Incorrect password.",
  "auth/email-already-in-use": "There is already an account with this email in use.",
  "auth/weak-password": "Use a stronger password.",
  "auth/invalid-email": "Invalid email address.",
  "vinobo/already-logged-in": "A user is already logged in",
};

export default function SigninPresenter({ auth, model, register }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [userError, setUserError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const submitEmailAndPassword = register
    ? createUserWithEmailAndPassword
    : signInWithEmailAndPassword;

  React.useEffect(() => {
    // At loading stage reset any old errors
    if (loading) setUserError(null);
  }, [loading]);

  const user = useModelProperty(model, "user");
  React.useEffect(() => {
    // Redirect when logged in
    if (user) router.push(register ? "/registerSuccess" : "/");
  }, [user, router, register]);

  React.useEffect(() => {
    // returns unsubscriber
    return onAuthStateChanged(
      auth,
      (user) => {},
      (error) => {
        // not sure if this is needed anymore, as the catch clause below probably handles all errors
        setUserError(error);
      }
    );
  }, [auth]);

  return (
    <SigninView
      register={register}
      errorText={
        userError
          ? Object.keys(userErrors).includes(userError.code)
            ? userErrors[userError.code]
            : userError.code
          : ""
      }
      loading={loading}
      onEmail={(email) => setEmail(email)}
      onPassword={(pw) => setPassword(pw)}
      submitHandler={() => {
        if (user) {
          setUserError({ code: "vinobo/already-logged-in" });
          return;
        }
        setLoading(true);
        submitEmailAndPassword(auth, email, password)
          .then((user) => {
            setLoading(false);
          })
          .catch((error) => {
            setLoading(false);
            setUserError(error);
          });
      }}
    />
  );
}
