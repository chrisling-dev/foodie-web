import { useReactiveVar } from "@apollo/client";
import React from "react";
import { isLoggedInVar } from "../apollo";
import CartProvider from "../context/cart.context";
import { HeaderProvider } from "../context/header.context";
import SignedInRouter from "../routers/signed-in.router";
import SignedOutRouter from "../routers/signed-out.router";

export function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return (
    <div className="App">
      <HeaderProvider>
        <CartProvider>
          {isLoggedIn ? <SignedInRouter /> : <SignedOutRouter />}
        </CartProvider>
      </HeaderProvider>
    </div>
  );
}

export default App;
