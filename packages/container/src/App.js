import React, { lazy, Suspense, useState, useEffect } from "react"; // lazy is a function and Suspense is a React component, they work together to lazily load components in our project
// import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { StylesProvider, createGenerateClassName } from "@material-ui/styles";
import { createBrowserHistory } from "history";
import Header from "./components/Header";
import Progress from "./components/Progress";

// these 2 components will lazy load code related to our marketing and auth apps
const MarketingLazy = lazy(() => import("./components/MarketingApp"));
const AuthLazy = lazy(() => import("./components/AuthApp"));
const DashboardLazy = lazy(() => import("./components/DashboardApp"));

// generate a unique prefix for all css class names in this project to avoid class name collisions with other projects when ever you use a css-in-js library
const generateClassName1 = createGenerateClassName({
  productionPrefix: "co",
  // seed: `my-host-seed`,
  // disableGlobal: true,
});

const history = createBrowserHistory();

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  // run the function inside useEffect whenever the value of isSignedIn changes
  useEffect(() => {
    if (isSignedIn) {
      history.push("/dashboard"); // send the user to dashboard when he signs in
    }
    // can not use else here because when the user first comes to our app they will be signed out by default
    // have to implement the redirect to / when the user signs out in a different fashion
  }, [isSignedIn]);

  return (
    /* StylesProvider is a react comp used to customize all the css-in-js generation stuff. */
    <StylesProvider generateClassName={generateClassName1}>
      {/* BrowserRouter - internally it creates browser history object for us */}
      {/* getting accesss to BrowserRouter history from within this component is challenging, that is why we changed to a generic Router component instead and then tell it what copy of history we want to use */}
      <Router history={history}>
        <div>
          <Header
            isSignedIn={isSignedIn}
            onSignOut={() => setIsSignedIn(false)}
          />
          <Suspense fallback={<Progress />}>
            <Switch>
              {/* the path matches only the first part of the route ie /auth/fsdffs will still match the /auth route */}
              <Route path="/auth">
                {/* using many callbacks in the project to update state, could use redux to simplify state management */}
                <AuthLazy onSignIn={() => setIsSignedIn(true)} />
              </Route>
              <Route path="/dashboard">
                {/* if we ever try to go to dashboard and the user is not signed in then redirect them to the landing page */}
                {!isSignedIn && <Redirect to="/" />}
                <DashboardLazy />
              </Route>
              <Route path="/" component={MarketingLazy} />
            </Switch>
          </Suspense>
        </div>
      </Router>
    </StylesProvider>
  );
};
