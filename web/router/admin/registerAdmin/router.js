const api = require("./register");

const entity = "admin";
exports.pkg = {
  name: "registerAdmin"
};

exports.register = (server, options) => {
  server.route({
    method: "POST",
    path: `/${entity}/register`,
    handler: api.handler,
    vhost: "localhost",
    config: {
      auth: false,
      tags: ["api", entity],
      description: "API is used for register admin",
      validate: {
        payload: api.payload
      }
    }
  });
};
