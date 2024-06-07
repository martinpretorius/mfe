import React from "react";
import { BrowserRouter } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
import MarketingApp from "./components/MarketingApp";
import Header from "./components/Header";

// generate a unique prefix for all css class names in this project to avoid class name collisions with other projects when ever you use a css-in-js library
const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});

export default () => {
  return (
    // StylesProvider is a react comp used to customize all the css-in-js generation stuff.
    <StylesProvider generateClassName={generateClassName}>
      <BrowserRouter>
        <div>
          <Header />
          <MarketingApp />
        </div>
      </BrowserRouter>
    </StylesProvider>
  );
};
