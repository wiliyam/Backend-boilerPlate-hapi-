const validator = require("./validators");
const headerValidation = require("../../../middleware/validations");
const handler = require("./post");

const entity = "customer";
exports.pkg = {
  name: `${entity}signUp`
};

exports.register = (server, options) => {
  server.route({
    method: "POST",
    path: `/${entity}/signUp`,
    handler: handler,
    vhost: "localhost",
    config: {
      auth: "guestJWT",
      tags: ["api", entity],
      description: "API is use for register new user",

      validate: {
        headers: headerValidation.validateLanguageHeader,
        payload: validator.payload,
        failAction: headerValidation.faildAction
      },
      response: validator.response
    }
  });
};
