const Joi = require("joi");
const i18n = require("../../../../locales/locales");

const payload = {
  deviceId: Joi.string()
    .required()
    .description("Device id"),
  appVersion: Joi.string().description("App version"),
  deviceMake: Joi.string().description("Device Make"),
  deviceModel: Joi.string().description("Device model"),
  deviceOsVersion: Joi.string().description("Device Os Version"),
  deviceType: Joi.number()
    .integer()
    .min(1)
    .max(3)
    .required()
    .description("1- IOS , 2- Android, 3- Web")
    .error(new Error("Please enter valid device type")),
  deviceTime: Joi.string().description("Format : YYYY-MM-DD HH:MM:SS"),
  latitude: Joi.number()
    .description(" Latitude")
    .error(new Error("Latitude must be number")),
  longitude: Joi.number()
    .description("Longitude ")
    .error(new Error("Longitude must be number"))
};

const response = {
  status: {
    200: {
      message: Joi.any().default(i18n.__("guestRegisterUser")["200"]),
      data: Joi.any()
    },
    400: { message: Joi.any().default(i18n.__("guestRegisterUser")["400"]) },
    500: { message: Joi.any().default(i18n.__("genericErrMsg")["500"]) }
  }
};

module.exports = { payload, response };
