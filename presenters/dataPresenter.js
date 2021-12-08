import { auth, database } from "../js/firebaseSetup";
import { onAuthStateChanged } from "firebase/auth";
import React from "react";
import { set, ref, get, child } from "firebase/database";

export default function DataPresenter(props) {
  const [data, setData] = React.useState("");

  const storeData = () => {
    const uid = auth.currentUser ? auth.currentUser.uid : 0;
    set(ref(database, "users/" + uid), {
      videos: data,
    });
  };

  const getData = function () {
    const uid = auth.currentUser ? auth.currentUser.uid : 0;
    get(ref(database, "users/" + "56"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      Write input data here:
      <input type="text" onChange={(event) => setData(event.target.value)}></input>
      <button onClick={storeData}>Store!</button>
      <button onClick={getData}>Read!</button>
      {
        //Current user: {auth.currentUser?.uid}
      }
    </div>
  );
}
