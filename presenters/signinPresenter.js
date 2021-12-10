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
  const [userData, setUserData] = React.useState("");
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
        setUserData(user);
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
        setLoading(true);
        submitEmailAndPassword(auth, email, password)
          .then((user) => {
            console.log("authenticating");
            setLoading(false);
            router.push("/");
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
