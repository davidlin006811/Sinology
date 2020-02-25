const path = require("path");
const merge = require("webpack-merge");
const MODULE_PATHS = ["./node_modules"];
const baseConfig = require("./webpack.base");
const config = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  resolve: { modules: MODULE_PATHS, extensions: [".js", ".jsx", ".css"] }
};
module.exports = merge(baseConfig, config);
