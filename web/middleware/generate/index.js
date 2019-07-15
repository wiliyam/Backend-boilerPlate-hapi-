const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcrypt");

const salt = Number(config.get("salt")); //salt for generate hash password
let JwtKey = config.get("jwtPrivateKey"); //jwt key for generate token

//method is use for generate new jwt token

const genToken = (exDate, id, email, admin) => {
  return jwt.sign(
    {
      id: id,
      email: email,
      isAdmin: admin
    },
    JwtKey,
    { expiresIn: exDate }
  );
};

//method is use for generate hash password

const genHash = async password => {
  return await bcrypt.hash(password, salt);
};
module.exports = { genToken, genHash };
