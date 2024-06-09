module.exports = {
  module: {
    rules: [
      {
        test: /\.m?js$/, // whenever we import a file that ends with .mjs or .js we want it to be processed by the babel loader
        exclude: /node_modules/, // do not run babel loader on this directory
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env"], // process all jsx tags in the application, convert all 2015, 2016.. code syntax into es5
            plugins: ["@babel/plugin-transform-runtime"], // add in additional code to enable different features inside the browser like async await syntax etc
          },
        },
      },
    ],
  },
};
