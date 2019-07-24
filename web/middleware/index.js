const good = require("./good");
const swagger = require("./swagger");
const localizatiom=require('./localization')

const auth = require("./auth");

module.exports = [].concat(good, swagger, auth,localizatiom);
