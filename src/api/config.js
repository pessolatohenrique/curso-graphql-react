import axios from "axios";
import { ApolloClient, InMemoryCache } from "@apollo/client";

export const api = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 10000,
  headers: {
    "content-type": "application/json",
  },
});

export const opcoesFetch = (query) => ({
  method: "post",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    query,
  }),
});

export const apolloClient = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URL,
  cache: new InMemoryCache(),
});
