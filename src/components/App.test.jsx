import React from "react";
import { render, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { isLoggedInVar } from "../apollo";
import App from "./App";

jest.mock("../routers/signed-out.router", () => {
  return {
    __esModule: true,
    A: true,
    default: () => {
      return <p>signed out</p>;
    },
  };
});

jest.mock("../routers/signed-in.router", () => {
  return {
    __esModule: true,
    A: true,
    default: () => {
      return <p>signed in</p>;
    },
  };
});

describe("<App />", () => {
  it("renders LoggedOutRouter", () => {
    const { getByText } = render(
      <MockedProvider>
        <App />
      </MockedProvider>
    );
    getByText("signed out");
  });
  it("renders LoggedInRouter", async () => {
    const { getByText } = render(
      <MockedProvider>
        <App />
      </MockedProvider>
    );
    await waitFor(() => {
      isLoggedInVar(true);
    });
    getByText("signed in");
  });
});
