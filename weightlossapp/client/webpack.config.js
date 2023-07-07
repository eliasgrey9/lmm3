const path = require("path");

module.exports = {
  mode: "development",
  entry: ["./src/index.js"],
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js",
  },
  context: __dirname,
  devtool: "source-map",
  devServer: {
    static: {
      directory: path.resolve(__dirname, "public"),
    },
  },
  module: {
    rules: [
      {
        test: /jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "my-custom-babel-preset",
            ],
            // Add any other options you need
            ignore: ["./node_modules/mapbox-gl/dist/mapbox-gl.js"],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ["css-loader"],
      },
    ],
  },
};
