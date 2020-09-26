import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import { apolloClient } from "./api/config";
import App from "./App";

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
