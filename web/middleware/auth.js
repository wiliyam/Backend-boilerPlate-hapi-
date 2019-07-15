const validate = require("./validations");
const config = require("config");

exports.register = async server => {
  await server.register(require("hapi-auth-jwt2"));
  await server.register(require("@hapi/cookie"));

  let JwtKey = config.get("jwtPrivateKey");

  //define jwt2 auth strategy

  server.auth.strategy("jwt2", "jwt", {
    key: JwtKey,
    validate: validate.validateJwt,
    verifyOptions: { algorithms: ["HS256"] }
  });

  server.auth.default("jwt2"); //default auth for all routes
};

exports.pkg = {
  name: "auth"
};
