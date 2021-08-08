const copyPlugin = require("copy-webpack-plugin");
module.exports = {
  entry: {
    "js/script.js": "./src/ts/main.ts",
  },
  output: {
    path: __dirname + "/dist",
    filename: "[name]",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: { extensions: [".ts", ".js"] },
  plugins: [
    new copyPlugin({
      patterns: [{ from: "html", context: "src" }],
    }),
  ],
};
