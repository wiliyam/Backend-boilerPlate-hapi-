const api = require("./post");
const validate = require("../../../middleware/validations");
const entity = "user";
exports.pkg = {
  name: "signOut"
};

exports.register = (server, options) => {
  server.route({
    method: "POST",
    path: `/${entity}/signOut`,
    handler: api.handler,
    vhost: "localhost",

    config: {
      tags: ["api", entity],
      description: "API is use for logout user",
      validate: {
        headers: validate.validateJwtHeader
      }
    }
  });
};
