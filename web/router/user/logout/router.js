const api = require("./logout");
const validate = require("../../../middleware/validations");
const entity = "user";
exports.pkg = {
  name: "logoutUser"
};

exports.register = (server, options) => {
  server.route({
    method: "GET",
    path: `/${entity}/logout`,
    handler: api.handler,
    vhost: "localhost",

    config: {
      tags: ["api", entity],
      description: "API is used for logout user",
      validate: {
        headers: validate.validateJwtHeader
      }
    }
  });
};
