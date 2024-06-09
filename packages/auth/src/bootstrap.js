import React from "react";
import ReactDOM from "react-dom";
import { createMemoryHistory, createBrowserHistory } from "history"; // react-router-dom internally makes use of this history library
import App from "./App.js";

// mount function to start up the app
const mount = (el, { onNavigate, defaultHistory, initialPath, onSignIn }) => {
  // if we are in dev and given a defaultHistory then use that otherwise use memory history when this mount function is called from the container
  // pass initialPath to memory history to specify the initial path otherwise it will be "/" and we will need to click on login twice to see the auth app
  const history =
    defaultHistory ||
    createMemoryHistory({
      initialEntries: [initialPath],
    });

  if (onNavigate) {
    history.listen(onNavigate); // history object has event listener built in and every time navigation occurs it will call the onNavigate function
  }

  ReactDOM.render(<App history={history} onSignIn={onSignIn} />, el);

  return {
    onParentNavigate({ pathname: nextPathName }) {
      // console.log("Container just navigated");

      const { pathname } = history.location;
      if (pathname !== nextPathName) {
        history.push(nextPathName); // navigate to new path
      }
    },
  };
};

// if we are in development and in isolation, call mount immediately
if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#auth-dev-root");

  if (devRoot) {
    mount(devRoot, { defaultHistory: createBrowserHistory() });
  }
}

// we are running through the container and should export the mount function
export { mount };
