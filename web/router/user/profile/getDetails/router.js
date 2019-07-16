const api = require("./get");
const validate = require("../../../../middleware/validations");
const entity = "user";
exports.pkg = {
  name: "getDtails"
};

exports.register = (server, options) => {
  server.route({
    method: "GET",
    path: `/${entity}/getDtails`,
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
