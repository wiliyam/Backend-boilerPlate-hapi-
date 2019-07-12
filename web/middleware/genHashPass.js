const config = require("config");

const bcrypt = require("bcrypt");

const salt = Number(config.get("salt"));

const getHash = async password => {
  return await bcrypt.hash(password, salt);
};

module.exports = getHash;
