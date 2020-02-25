const path = require("path");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.base");
const MODULE_PATHS = ["./node_modules"];
const config = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname),
    compress: true,
    port: 5000,
    historyApiFallback: true
  },
  resolve: { modules: MODULE_PATHS, extensions: [".js", ".jsx", ".css"] }
};
module.exports = merge(baseConfig, config);
