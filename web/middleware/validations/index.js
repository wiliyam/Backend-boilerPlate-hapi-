const user = require("../../../models/user");
const { ObjectId } = require("mongodb");
const joi = require("joi");

//for validate refresh token

const validRefreshToken = async (condition, token) => {
  const userData = await user.findOne(condition);

  if (userData.refreshToken != token) return false;
  return true;
};

//for validate jwt2 strategy

const validateJwt = async function(decoded, req, h) {
  const { id, isAdmin } = decoded;

  const condition = { _id: ObjectId(id) };

  const valid = await validRefreshToken(condition, req.auth.token); //validate refresh token

  if (!valid) return { isValid: false, errorMessage: "Token has been expired" };

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
      .description("Put your Auth token here")
  })
  .unknown();

module.exports = { validateJwt, validateJwtHeader, validRefreshToken };
