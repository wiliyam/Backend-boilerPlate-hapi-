const BaseJoi = require("@hapi/joi");
const Extension = require("@hapi/joi-date");
const joi = BaseJoi.extend(Extension);
joi.objectId = require("joi-objectid")(joi);
const Boom = require("boom");

const user = require("../../../../models/user");
const getHash = require("../../../middleware/genHashPass");

const payload = joi
  .object({
    userName: joi
      .string()
      .required()
      .default("admin")
      .description("enter admin name"),
    password: joi
      .string()
      .min(3)
      .max(15)
      .required()
      .default("test")
      .description("password for user"),
    conformPassword: joi
      .string()
      .min(3)
      .max(15)
      .required()
      .default("test")
      .description("conform password for user"),
    email: joi
      .required()
      .default("admin@app.com")
      .description("admin email id"),
    dob: joi
      .date()
      .utc()
      .format(["YYYY/MM/DD", "DD-MM-YYYY"])
      .default("01-01-2000")
      .description("Enter Birth date here")
  })
  .required();

const handler = async (req, h) => {
  const adminData = {
    name: req.payload.userName,
    email: req.payload.email,
    dob: req.payload.dob,
    isAdmin: true
  };
  const checkCondition = {
    email: req.payload.email
  };
  if (req.payload.password != req.payload.conformPassword)
    return Boom.notAcceptable("Password must be match");
  try {
    const data = await user.findOne(checkCondition);
    if (data) return Boom.conflict("user already exist");
    const hashPass = await getHash(req.payload.password);
    console.log(hashPass);
    adminData["password"] = hashPass;
    const result = await user.addUser(adminData);
    if ((result.result.n = 1))
      return h.response({ message: "Account succesfully created.." });
    return Boom.badImplementation("Some thing went wrong");
  } catch (error) {
    return Boom.badImplementation(error);
  }
};

module.exports = { payload, handler };
