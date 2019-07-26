const user = require("../../../models/user");
const { ObjectId } = require("mongodb");
const joi = require("joi");

//for validate refresh token

const validAccessToken = async (condition, token) => {
  const userData = await user.findOne(condition);

  if (userData.accessToken != token) return false;
  return true;
};

//method is used for verify refresh token

const validRefreshToken = async (condition, token) => {
  const userData = await user.findOne(condition);

  if (userData.refreshToken != token) return false;
  return true;
};

//for validate jwt2 strategy

const validateJwt = async function(decoded, req, h) {
  const { id, isAdmin } = decoded;

  const condition = { _id: ObjectId(id) };

  const valid = await validAccessToken(condition, req.auth.token); //validate refresh token

  if (!valid) return { isValid: false };

  try {
    userData = await user.findOne(condition);
    if (userData) {
      return {
        isValid: true,
        credentials: { id, isAdmin }
      };
    } else {
      return { isValid: false };
    }
  } catch (error) {
    return { isValid: false };
  }
};

//for validate header if token is pass or not

const validateJwtHeader = joi
  .object({
    authorization: joi
      .string()
      .required()
      .description("Put your Auth token here"),
      language: joi.string().required().default('en').description('en - English').error(new Error('Language is incorrect')).required(),
  })
  .unknown()

  const validateLanguageHeader=joi.object({
    language: joi.string().required().default('en').description('en - English').error(new Error('Language is incorrect')).required(),
  }).unknown()

  const faildAction = function faildAction(req, reply, source, error) {
    return reply({ message: error.output.payload.message }).code(error.output.statusCode);
}
module.exports = {
  validateJwt,
  validateJwtHeader,
  validAccessToken,
  validRefreshToken,
  validateLanguageHeader,
  faildAction
};
