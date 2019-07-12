const api = require("./get");
const joi = require("joi");
const entity = "user";
exports.pkg = {
  name: "getUser"
};

exports.register = (server, options) => {
  server.route({
    method: "GET",
    path: `/${entity}/getUser`,
    handler: api.handler,
    vhost: "localhost",

    config: {
      tags: ["api", entity],
      description: "API is used for get all user list",
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
