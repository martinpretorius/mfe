import React from "react";
import { Switch, Route, Router } from "react-router-dom"; // Router allows us to choose the type of history object ie memory history, unlike BrowserRouter
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
import Landing from "./components/Landing.js";
import Pricing from "./components/Pricing.js";

// generate a unique prefix for all css class names in this project to avoid class name collisions with other projects when ever you use a css-in-js library
const generateClassName = createGenerateClassName({
  productionPrefix: "ma",
  // seed: `my-child-seed`,
  // disableGlobal: true,
});

export default ({ history }) => {
  return (
    // StylesProvider is a react comp used to customize all the css-in-js generation stuff
    <StylesProvider generateClassName={generateClassName}>
      {/* we have to provide history to use for Router component, could create the history object inside this file but we create it in bootstrap.js instead because we will cutomize it */}
      <Router history={history}>
        <Switch>
          <Route exact path="/pricing" component={Pricing} />
          <Route path="/" component={Landing} />
        </Switch>
      </Router>
    </StylesProvider>
  );
};
