const api = require("./patch");
const validate = require("../../../../middleware/validations");
const entity = "user";
exports.pkg = {
  name: "updateUser"
};

exports.register = (server, options) => {
  server.route({
    method: "PATCH",
    path: `/${entity}/updateUser`,
    handler: api.handler,
    vhost: "localhost",
    config: {
      tags: ["api", entity],
      description: "API is use for Update user details",
      validate: {
        headers: validate.validateJwtHeader,
        payload: api.payload
      }
    }
  });
};
