const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { DefinePlugin } = require("webpack");

module.exports = (env) => {
  return {
    entry: "./index.tsx",
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.s[ac]ss$/i,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: "asset/resource",
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "dist"),
      publicPath: "/",
    },
    devServer: {
      historyApiFallback: {
        index: "/",
        disableDotRule: true,
      }, // TODO: Move any 404 over to
      static: [path.join(__dirname, "dist")],
      compress: true,
      port: 9000,
      hot: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "index.html",
      }),
      new DefinePlugin({
        DEVELOPMENT: JSON.stringify(env.BUILD === "dev"),
        BASE_PATH: JSON.stringify("http://localhost:8000"),
      }),
    ],
  };
};
