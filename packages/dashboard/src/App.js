import React from "react";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
import Dashboard from "./components/Dashboard";

// generate a unique prefix for all css class names in this project to avoid class name collisions with other projects when ever you use a css-in-js library
const generateClassName = createGenerateClassName({
  productionPrefix: "da",
  // seed: `my-child-seed`,
  // disableGlobal: true,
});

export default () => {
  return (
    <StylesProvider generateClassName={generateClassName}>
      <Dashboard />
    </StylesProvider>
  );
};
