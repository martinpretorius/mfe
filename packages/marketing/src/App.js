import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
import Landing from "./components/Landing.js";
import Pricing from "./components/Pricing.js";

// generate a unique prefix for all css class names in this project to avoid class name collisions with other projects when ever you use a css-in-js library
const generateClassName = createGenerateClassName({
  productionPrefix: "ma",
});

export default () => {
  return (
    /* StylesProvider is a react comp used to customize all the css-in-js generation stuff  */
    <StylesProvider generateClassName={generateClassName}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/pricing" component={Pricing} />
          <Route path="/" component={Landing} />
        </Switch>
      </BrowserRouter>
    </StylesProvider>
  );
};
