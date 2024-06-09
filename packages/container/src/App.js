import React, { lazy, Suspense, useState } from "react"; // lazy is a function and Suspense is a React component, they work together to lazily load components in our project
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { StylesProvider, createGenerateClassName } from "@material-ui/styles";
import Header from "./components/Header";
import Progress from "./components/Progress";

// these 2 components will lazy load code related to our marketing and auth apps
const MarketingLazy = lazy(() => import("./components/MarketingApp"));
const AuthLazy = lazy(() => import("./components/AuthApp"));

// generate a unique prefix for all css class names in this project to avoid class name collisions with other projects when ever you use a css-in-js library
const generateClassName1 = createGenerateClassName({
  productionPrefix: "co",
  // seed: `my-host-seed`,
  // disableGlobal: true,
});

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    /* StylesProvider is a react comp used to customize all the css-in-js generation stuff. */
    <StylesProvider generateClassName={generateClassName1}>
      {/* BrowserRouter - internally it creates browser history object for us */}
      <BrowserRouter>
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
              <Route path="/" component={MarketingLazy} />
            </Switch>
          </Suspense>
        </div>
      </BrowserRouter>
    </StylesProvider>
  );
};
