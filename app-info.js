const path = require("path");
const htmlPlugin = require("html-webpack-plugin");
const fs = require("fs");

module.exports.views = JSON.parse(fs.readFileSync("./src/views.json"));

module.exports.htmlPlugins = function () {
  var plugins = [];
  var views = this.views;
  for (let i = 0; i < views.length; i++) {
    var newhtml = new htmlPlugin({
      base: "./",
      title: views[i].name,
      filename: path.resolve(
        __dirname,
        `./dist/views/${views[i].template}.hbs`
      ),
      template: path.resolve(`./src/views/${views[i].template}.hbs`),
      chunks: [...views[i].scripts],
      publicPath: "/",
    });
    plugins.push(newhtml);
  }
  return plugins;
};

module.exports.entries = function () {
  var views = this.views;
  var entries = {};
  for (let i = 0; i < views.length; i++) {
    entries[views[i].name] = views[i].entry;
  }
  return entries;
};
