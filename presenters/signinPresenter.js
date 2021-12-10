import React from "react";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import SigninView from "../views/signinView";
import { useRouter } from "next/router";

export default function SigninPresenter({ auth, model }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [userData, setUserData] = React.useState("");
  const [userError, setUserError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  return (
    <SigninView
      headerText={"Sign in with your Vinobo account here:"}
      errorText={userError?.code}
      loadingText={loading}
      submitText={"Sign in"}
      onEmail={(email) => setEmail(email)}
      onPassword={(pw) => setPassword(pw)}
      signInUser={() => {
        setLoading(true);
        signInWithEmailAndPassword(auth, email, password)
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
