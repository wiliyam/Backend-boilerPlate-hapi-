const inert = require("@hapi/inert");
const vision = require("@hapi/vision");
const router = require("./router");
const middleware = require("./middleware");

const config = require("config");

//define all plugin here

module.exports = {
  server: {
    port: config.get("port")
  },
  register: {
    plugins: [inert, vision].concat(middleware, router)
  }
};
