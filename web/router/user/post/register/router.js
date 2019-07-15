const api = require("./post");

const entity = "user";
exports.pkg = {
  name: "register"
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
      description: "API is used for register new user",
      validate: {
        payload: api.payload
      }
    }
  });
};
