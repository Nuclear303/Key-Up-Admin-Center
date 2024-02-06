import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCaiNt13EXEweqshjf0VGJ4bGADFky-FiA",
  authDomain: "key-up.firebaseapp.com",
  projectId: "key-up",
  storageBucket: "key-up.appspot.com",
  messagingSenderId: "1054810546885",
  appId: "1:1054810546885:web:e05a5950f138b72e8806ac",
  measurementId: "G-30C8F3XDSF"
};

export const app = initializeApp(firebaseConfig);


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
