const api = require("./post");
const Joi=require('joi')

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
        headers:Joi.object({
          'language': Joi.string().required().description('en - English').error(new Error('Language is incorrect')).required(),
      }).unknown(),
        payload: api.payload
      }
    }
  });
};
