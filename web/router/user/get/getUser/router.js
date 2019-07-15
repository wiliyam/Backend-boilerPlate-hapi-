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
      description: "API is use for get user details",
      validate: {
        headers: validate.validateJwtHeader,
        payload: api.payload
      }
    }
  });
};
