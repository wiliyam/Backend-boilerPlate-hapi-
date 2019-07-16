const joi = require("joi");
joi.objectId = require("joi-objectid")(joi);
const bcrypt = require("bcrypt");
const Boom = require("boom");
const config = require("config");

const user = require("../../../../models/user");
const generate = require("../../../middleware/generate");

const payload = joi.object({
  email: joi
    .string()
    .required()
    .default("user@app.com")
    .description("user Email here"),
  password: joi
    .required()
    .default("test")
    .description("put password here")
});

const handler = async (req, h) => {
  const condition = {
    email: req.payload.email
  };
  const exDate = Number(config.get("jwtExpireTime"));
  try {
    const userData = await user.findOne(condition); //check for  user
    if (!userData) return Boom.unauthorized("Wrong Email id");
    const res = await bcrypt.compare(req.payload.password, userData.password); //compare password
    if (!res) return Boom.unauthorized("Wrong password");
    let accessToken = generate.genToken(
      exDate,
      userData._id,
      userData.email,
      userData.isAdmin
    ); //generate jwtToken

    let refreshToken = generate.genToken(
      exDate + 3600,
      userData._id,
      userData.email,
      userData.isAdmin
    );
    tokens = { accessToken, refreshToken }; //store new token in database
    const result = await user.update(condition, tokens);
    if (!result) return Boom.badRequest("something went wrong..");
    return h.response({
      message: "sucessfully login",
      tokens: tokens
    });
  } catch (error) {
    return Boom.badImplementation(error);
  }
};

module.exports = { payload, handler };
