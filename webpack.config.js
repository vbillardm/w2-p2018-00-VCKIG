module.exports = {
  entry: "./app/js/app.js",
  output: {
    path: "./dist/js",
    publicPath: "/js",
    filename: "bundle.js"
  },
  devServer: {
    contentBase: "./dist"
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: "style!css!sass"
      }
    ]
  }
};
