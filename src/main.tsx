import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { firebaseConfig } from "./firebaseConfig";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
firebase.initializeApp(firebaseConfig);
const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
