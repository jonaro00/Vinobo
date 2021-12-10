import React from "react";
import { createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import SigninView from "../views/signinView";
import { useRouter } from "next/router";

export default function SigninPresenter({ auth, model }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [userData, setUserData] = React.useState("");
  const [userError, setUserError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    setLoading(true);
    onAuthStateChanged(
      auth,
      (user) => {
        setLoading(false);
        setUserData(user);
      },
      (error) => {
        setLoading(false);
        setUserError(error);
      }
    );
  }, []);

  return (
    <SigninView
      headerText={"Don't already have an account? Register here:"}
      errorText={userError?.code}
      loadingText={loading}
      submitText={"Register"}
      onEmail={(email) => setEmail(email)}
      onPassword={(pw) => setPassword(pw)}
      signInUser={() => {
        setLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
          .then((user) => {
            setLoading(false);
            router.push("/");
          })
          .catch((error) => {
            setLoading(false);
            setUserError(error);
          });
      }}
    />
  );
}
