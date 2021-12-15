import React from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import SigninView from "../views/signinView";
import { useRouter } from "next/router";

export default function SigninPresenter({ auth, model, register, href }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  // const [userData, setUserData] = React.useState("");
  const [userError, setUserError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const submitEmailAndPassword = register
    ? createUserWithEmailAndPassword
    : signInWithEmailAndPassword;

  const userErrors = {
    "auth/user-not-found": "No user with that e-mail address was found.",
    "auth/wrong-password": "Incorrect password.",
    "auth/email-already-in-use": "There is already an account with this email in use.",
    "auth/weak-password": "Use a stronger password.",
  };

  React.useEffect(() => {
    // At loading stage reset any old errors
    if (loading) setUserError(null);
  }, [loading]);

  React.useEffect(() => {
    onAuthStateChanged(
      auth,
      (user) => {
        // setUserData(user);
        // redirect if a logged in user visits the signin page. Allowing them to log in once again is buggy.
        if (register && user) router.push("/");
      },
      (error) => {
        setUserError(error);
      }
    );
  }, []);

  return (
    <SigninView
      register={register}
      href={href}
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
        setLoading(true);
        submitEmailAndPassword(auth, email, password)
          .then((user) => {
            setLoading(false);
            router.push(register ? "/registerSuccess" : "/");
          })
          .catch((error) => {
            setLoading(false);
            setUserError(error);
          });
      }}
    />
  );
}
