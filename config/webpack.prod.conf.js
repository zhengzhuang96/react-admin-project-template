/*
 * @Author: {zhengzhuang}
 * @Date: 2022-07-21 14:18:20
 * @LastEditors: {zhengzhuang}
 * @LastEditTime: 2022-08-24 09:42:51
 * @Description: In User Settings Edit
 */
const path = require("path");
const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.conf.js");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = merge(baseWebpackConfig, {
  mode: "production",
  devtool: "source-map",
  output: {
    path: path.join(__dirname, "../dist"),
    filename: "js/[name].[contenthash:6].js",
    chunkFilename: "js/[name].[contenthash:6].js",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "static"),
        to: "static",
      },
    ]),
  ],
  optimization: {
    runtimeChunk: {
      name: "manifest",
    },
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendor: {
          name: "vendor",
          test: /[\\/]node_modules[\\/]/,
          chunks: "initial",
          enforce: true,
          priority: 10,
        },
        common: {
          minChunks: 2,
          name: "common",
          chunks: "async",
          priority: 10,
          reuseExistingChunk: true,
          enforce: true,
        },
        styles: {
          name: "styles",
          test: /\.(le|c)ss$/,
          chunks: "all",
          enforce: true,
        },
      },
    },
  },
});
