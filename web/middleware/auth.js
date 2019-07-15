const validate = require("./validations");
const config = require("config");

exports.register = async server => {
  await server.register(require("hapi-auth-jwt2"));
  await server.register(require("@hapi/cookie"));

  let JwtKey = config.get("jwtPrivateKey");

  server.auth.strategy("jwt2", "jwt", {
    key: JwtKey,
    validate: validate.validateJwt,
    verifyOptions: { algorithms: ["HS256"] }
  });

  server.auth.default("jwt2");
};

exports.pkg = {
  name: "auth"
};
