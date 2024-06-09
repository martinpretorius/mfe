// import { merge } from "webpack-merge"; // merge is a function to merge together 2 webpack config objects
// import HtmlWebpackPlugin from "html-webpack-plugin"; // inject script tags inside a html file
// import commonConfig from "./webpack.common.js";

const { merge } = require("webpack-merge"); // merge is a function to merge together 2 webpack config objects
const HtmlWebpackPlugin = require("html-webpack-plugin"); // inject script tags inside a html file
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin.js");
const commonConfig = require("./webpack.common.js");
const packageJson = require("../package.json");

const devConfig = {
  mode: "development",
  output: {
    publicPath: "http://localhost:8083/", // dont forget the forward-slash at the end
  },
  devServer: {
    port: 8083,
    historyApiFallback: {
      index: "/index.html",
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "dashboard",
      filename: "remoteEntry.js",
      exposes: {
        "./Dashboard": "./src/bootstrap",
      },
      shared: packageJson.dependencies,
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};

module.exports = merge(commonConfig, devConfig); // by listing devConfig 2nd it will override similar options inside commonConfig
