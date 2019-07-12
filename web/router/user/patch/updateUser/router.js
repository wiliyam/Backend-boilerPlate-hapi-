const api = require("./update");
const joi = require("joi");
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
      description: "API is used for Update user details",
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
