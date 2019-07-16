const api = require("./post");
const entity = "user";
exports.pkg = {
  name: "signIn"
};

exports.register = (server, options) => {
  server.route({
    method: "POST",
    path: `/${entity}/signIn`,
    handler: api.handler,
    vhost: "localhost",
    config: {
      auth: false,
      tags: ["api", entity],
      description: "API is use for login user",
      validate: {
        payload: api.payload
      }
    }
  });
};
