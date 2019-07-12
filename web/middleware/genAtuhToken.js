const jwt = require("jsonwebtoken");
const config = require("config");

const getToken = (id, email, admin) => {
  let JwtKey = config.get("jwtPrivateKey");

  //console.log({ expiresIn: config.get("jwtExpireTime") });

  return jwt.sign(
    {
      id: id,
      email: email,
      isAdmin: admin
    },
    JwtKey,
    { expiresIn: config.get("jwtExpireTime") }
  );
};

module.exports = getToken;
