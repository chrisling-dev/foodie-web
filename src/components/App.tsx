import { useReactiveVar } from "@apollo/client";
import React from "react";
import { isLoggedInVar } from "../apollo";
import { HeaderProvider } from "../context/header.context";
import SignedInRouter from "../routers/signed-in.router";
import SignedOutRouter from "../routers/signed-out.router";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return (
    <div className="App">
      <HeaderProvider>
        {isLoggedIn ? <SignedInRouter /> : <SignedOutRouter />}
      </HeaderProvider>
    </div>
  );
}

export default App;
