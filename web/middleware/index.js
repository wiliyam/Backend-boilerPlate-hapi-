const good = require("./good");
const swagger = require("./swagger");

const auth = require("./auth");

module.exports = [].concat(good, swagger, auth);
