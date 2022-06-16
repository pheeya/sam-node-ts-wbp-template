const path = require("path");
const nodemonPlugin = require("nodemon-webpack-plugin");
const cssExtractplugin = require("mini-css-extract-plugin");
const copyPlugin = require("copy-webpack-plugin");
const app = require("./app-info");

const html_plugins = app.htmlPlugins();

module.exports = {
  mode: "production",
  entry: app.entries(),

  target: ["web", "es5"],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: path.resolve(__dirname, "src"),
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
    new cssExtractplugin({
      filename: "css/[name].css"
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
  optimization: {
    emitOnErrors: false,
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        styles: {
          test: /\.(css|scss|less)$/,
          enforce: true // force css in new chunks (ignores all other options)
        }
      }
    },
  },
  performance:{
    hints:false
  }
};
