import React from "react";
import ReactDOM from "react-dom";
// import { createMemoryHistory, createBrowserHistory } from "history"; // react-router-dom internally makes use of this history library
import App from "./App.js";

// mount function to start up the app
const mount = (el) => {
  ReactDOM.render(<App />, el);
};

// if we are in development and in isolation, call mount immediately
if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#dashboard-dev-root");

  if (devRoot) {
    mount(devRoot);
  }
}

// we are running through the container and should export the mount function
export { mount };
