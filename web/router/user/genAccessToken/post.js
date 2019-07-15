const ObjectId = require("mongodb").ObjectID;
const joi = require("joi");
const config = require("config");
const jwt = require("jsonwebtoken");
const Boom = require("boom");
const generate = require("../../../middleware/generate");
const validate = require("../../../middleware/validations");
const user = require("../../../../models/user");

const payload = joi.object({
  refreshToken: joi
    .string()
    .required()
    .default("adsaddsdsddsd")
    .description("put your refresh token here")
});

const handler = async (req, h) => {
  const exDate = Number(config.get("jwtExpireTime"));
  let JwtKey = config.get("jwtPrivateKey");
  let token = req.payload.refreshToken;

  try {
    var decoded = await jwt.verify(token, JwtKey); //decode jwt token

    const { id, email, isAdmin } = decoded;
    const condition = { _id: ObjectId(id) };
    const valid = await validate.validRefreshToken(condition, token); //check for valid refresh token
    if (!valid) return Boom.unauthorized("Unvalid refresh token");

    let accessToken = generate.genToken(exDate, id, email, isAdmin); //generate jwtToken
    let refreshToken = generate.genToken(exDate + 3600, id, email, isAdmin);

    let tokens = { accessToken, refreshToken }; //store new token in database
    const result = await user.update(condition, tokens);
    if (!result) return Boom.badRequest("something went wrong..");
    return h.response({
      message: "sucessfully generated new access-token",
      tokens: tokens
    });
  } catch (error) {
    return Boom.badImplementation(error);
  }
};

module.exports = { handler, payload };
