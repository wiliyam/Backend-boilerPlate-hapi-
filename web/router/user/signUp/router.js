const api = require("./post");

const entity = "user";
exports.pkg = {
  name: "signUp"
};

exports.register = (server, options) => {
  server.route({
    method: "POST",
    path: `/${entity}/signUp`,
    handler: api.handler,
    vhost: "localhost",
    config: {
      auth: false,
      tags: ["api", entity],
      description: "API is use for register new user",
      validate: {
        payload: api.payload
      }
    }
  });
};
