import { ApolloProvider } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { initializeApp } from "firebase/app";
import apolloClient from "./apollo";
import App from "./components/App";
import "./styles/styles.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const firebaseConfig = {
  apiKey: "AIzaSyB0z9m4T_dCxXMCG5ALJca7btzEDMqDR9o",
  authDomain: "foodie-a5d44.firebaseapp.com",
  projectId: "foodie-a5d44",
  storageBucket: "foodie-a5d44.appspot.com",
  messagingSenderId: "158012985010",
  appId: "1:158012985010:web:1d411f597a194a55c143ab",
};

initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <App />
        <ToastContainer />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
