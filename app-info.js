const path = require("path");
const htmlPlugin = require("html-webpack-plugin");


// add all view entries here, important

module.exports.views = [
  {
    name: "Home",
    title: "Home",
    template: "Home",
    scripts: ["Home"],
    entry: ["./src/static/scripts/Home.ts"],
  },
  {
    name: "About",
    title: "About",
    template: "About",
    scripts: ["About"],
    entry: ["./src/static/scripts/About.ts"],
  },
];



// no need to do anything below this point

module.exports.htmlPlugins = function () {
  var plugins = [];
  var views = this.views;
  for (let i = 0; i < views.length; i++) {
    var newhtml = new htmlPlugin({
      base: "./",
      title: views[i].name,
      filename: path.resolve(__dirname, `./dist/views/${views[i].title}.hbs`),
      template: path.resolve(`./src/views/${views[i].template}.hbs`),
      chunks: [...views[i].scripts],
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
// base: "./",
// title: "Home",
// filename: path.resolve(__dirname, "./dist/views/Home.hbs"),
// template: path.resolve("./src/views/Home.hbs"),
