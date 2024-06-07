const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const packageJson = require("../package.json");
const commonConfig = require("./webpack.common");
const { Module } = require("webpack");

const prodConfig = {
  mode: "production",
  output: {
    filename: "[name].[contentshash].js",
    publicPath: "/marketing/latest/", // so that the remoteEntry file's urls will point to the correct folder inside the s3 bucket
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "marketing",
      filename: "remoteEntry1.js", // remoteEntry.js instructs some other program(container) how to load the code for this project, it contains a list of urls to files
      exposes: {
        "./Marketing": "./src/bootstrap", // Marketing = name alias that easier to read and make sense of
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
