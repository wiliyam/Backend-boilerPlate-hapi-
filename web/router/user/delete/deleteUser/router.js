const api = require("./delete");
const joi = require("joi");
const entity = "user";
exports.pkg = {
  name: "deleteUser"
};

exports.register = (server, options) => {
  server.route({
    method: "DELETE",
    path: `/${entity}/deleteUser`,
    handler: api.handler,
    vhost: "localhost",
    config: {
      tags: ["api", entity],
      description: "API is used for delete user",
      validate: {
        headers: joi
          .object({
            authorization: joi
              .string()
              .required()
              .description("Put your Auth token here")
          })
          .unknown(),
        payload: api.payload
      }
    }
  });
};
