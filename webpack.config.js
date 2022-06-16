const path = require("path");
const nodemonPlugin = require("nodemon-webpack-plugin");
const cssExtractplugin = require("mini-css-extract-plugin");
const copyPlugin = require("copy-webpack-plugin");
const app = require("./app-info");


const html_plugins = app.htmlPlugins();

module.exports = {
  mode: "development",
  entry: app.entries(),

  target: ["web","es5"],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include:path.resolve(__dirname,"src"),
        enforce:"pre",
        use: "source-map-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        include:path.resolve(__dirname,"src"),
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          cssExtractplugin.loader,
          // Translates CSS into CommonJS
          {
            loader:"css-loader",
            options:{
              url:false
            }
          },
          // Compiles Sass to CSS
          "sass-loader",
        ],
     
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/i,
        type: 'asset/resource'
      }
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "scripts/[name].bundle.js",
    path: path.resolve(__dirname, "dist/static"),
    publicPath: "./",
  },
  plugins: [
    ...html_plugins,
    new nodemonPlugin({
      script: "./dist/server.js",
      watch: path.resolve(`./dist/server.js`),
      ignore: ["*.js.map"],
    }),
    new cssExtractplugin({
      filename: "css/[name].css",
    }),
    new copyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "./src/static/media"),
          to: path.resolve(__dirname, "./dist/static/media"),
        },
        {
          from: path.resolve(__dirname, "./src/views/partials"),
          to: path.resolve(__dirname, "./dist/views/partials"),
        },
      ],
    }),
  ],
  stats: {
    colors: true,
    modules: false,
    entrypoints: false,
  },

  devServer: {
    open: ["http://localhost:3000"],
    hot: false,
    // Live reload for all other files (html, assets, express app)
    liveReload: true,
    watchFiles: {
      paths: ["src/**/*"],
      options: {
        ignored: [path.resolve(__dirname, "./src/static")],
        awaitWriteFinish: true, // for express
      },
    },
    static: {
      directory: path.join(__dirname, "src/static/**/*"),
    },
    proxy: {
      "/index": "http://localhost:3000", // content base
    },
    port: 8080,
    devMiddleware: {
      writeToDisk: true, // for express
    },
  },
};
