const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const domain = process.env.PRODUCTION_DOMAIN; // environment variable that gets defined when we build our application with webpack through our CI/CD pipeline, it contains a string that says where our production app is hosted

const prodConfig = {
  mode: "production", // this instructs webpack to optimize and minify the js files during build(webpack takes a little longer to load)
  output: {
    filename: "[name].[contenthash].js", // when we build files for prod use this as a template for naming, first the name of the file that was created and then a hash of the content of the file - this is done for caching issues
    publicPath: '/container/latest/', // html-webpack-plugin will prepend all js files with this path before attaching to html document
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container", // not required to add the name for container but recommended by docs
      remotes: {
        // where we should go to get some source code
        marketingApp: `marketing@${domain}/marketing/latest/remoteEntry.js`, // this key matches up to some import somewhere inside our container project, domain gets set when we create our infrastructure on amazon s3; whenever we want to find marketing then go to the cloudfront-domain/marketing/latest/remoteEntry.js and that will tell us how to load the code for our marketing app
      },
      shared: packageJson.dependencies, // this will create multiple seperate js files so that we load only a single copy of each dependency across the different apps
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
