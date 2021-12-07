import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDP8zuSYJaL5YfjeZ76S0dL8YeISMjNcz0",
  // TODO: Replace with environment variables
  authDomain: "vinobo.firebaseapp.com",

  projectId: "vinobo",

  storageBucket: "vinobo.appspot.com",

  messagingSenderId: "93061273356",

  appId: "1:93061273356:web:e34ff1cec022e00e1b5b29",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
