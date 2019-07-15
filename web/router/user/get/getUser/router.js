const api = require("./get");
const validate = require("../../../../middleware/validations");
const entity = "user";
exports.pkg = {
  name: "getUser"
};

exports.register = (server, options) => {
  server.route({
    method: "GET",
    path: `/${entity}/getUser`,
    handler: api.handler,
    vhost: "localhost",

    config: {
      tags: ["api", entity],
      description: "API is used for get all user list",
      validate: {
        headers: validate.validateJwtHeader,
        payload: api.payload
      }
    }
  });
};
