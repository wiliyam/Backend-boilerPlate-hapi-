const config = require("config");

//this plugin use for generate documentations

const options = {
  grouping: "tags",
  payloadType: "form",
  host: config.get("appUrl"),
  info: {
    contact: {
      name: "Wiliyam Bhadani",
      email: "wiliyambhadani@gmail.com"
    }
  }
};

module.exports = {
  plugin: require("hapi-swagger"),
  options
};
