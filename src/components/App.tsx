import { useReactiveVar } from "@apollo/client";
import React from "react";
import { isLoggedInVar } from "../apollo";
import SignedInRouter from "../routers/signed-in.router";
import SignedOutRouter from "../routers/signed-out.router";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return (
    <div className="App">
      {isLoggedIn ? <SignedInRouter /> : <SignedOutRouter />}
    </div>
  );
}

export default App;
