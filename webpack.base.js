const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-env"]
        }
      },
      {
        test: /\.css$/,
        use: [{ loader: MiniCssExtractPlugin.loader }, { loader: "css-loader" }]
      },
      {
        test: /\.(gif|png|jp(e*)g|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "assets/images"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "template.html"
    }),
    new MiniCssExtractPlugin({
      filename: "style.css"
    })
  ]
};
