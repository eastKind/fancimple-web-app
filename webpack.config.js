/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const getCSSModuleLocalIdent = require("react-dev-utils/getCSSModuleLocalIdent");

module.exports = (env) => {
  return {
    entry: "./src/index.tsx",
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "[name].[hash].js",
      publicPath: "/",
      clean: true,
    },
    devtool: "inline-source-map",
    module: {
      rules: [
        {
          test: /\.scss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                modules: {
                  mode: "local",
                  getLocalIdent: getCSSModuleLocalIdent,
                },
              },
            },
            "postcss-loader",
            {
              loader: "sass-loader",
              options: {
                additionalData: `@import "./variables.scss";`,
              },
            },
          ],
        },
        {
          test: /\.jsx?$/i,
          exclude: /node_modules/,
          use: ["babel-loader"],
        },
        {
          test: /\.tsx?$/i,
          exclude: /node_modules/,
          use: ["ts-loader"],
        },
        {
          test: /\.(png|jpg|gif)$/i,
          use: ["file-loader"],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "public/index.html",
        favicon: "public/favicon.ico",
      }),
      new MiniCssExtractPlugin({
        filename: "[name].[hash].css",
        chunkFilename: "[id]-[hash].css",
      }),
      new webpack.EnvironmentPlugin({
        BASE_URL:
          env.NODE_ENV === "dev"
            ? "http://localhost:5000"
            : "http://api.fancimple.eastkindness.com",
      }),
    ],
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    devServer: {
      historyApiFallback: true,
      port: 3000,
      open: true,
    },
  };
};
