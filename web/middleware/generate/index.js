const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcrypt");

const salt = Number(config.get("salt"));

const genToken = (id, email, admin) => {
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

const genHash = async password => {
  return await bcrypt.hash(password, salt);
};
module.exports = { genToken, genHash };
