const api = require("./post");
const entity = "user";
exports.pkg = {
  name: "genAccessToken"
};

exports.register = (server, options) => {
  server.route({
    method: "POST",
    path: `/${entity}/genNewAccessToken`,
    handler: api.handler,
    vhost: "localhost",

    config: {
      auth: false,
      tags: ["api", entity],
      description: "API is use for logout user",
      validate: {
        payload: api.payload
      }
    }
  });
};
