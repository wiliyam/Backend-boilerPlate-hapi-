const BaseJoi = require("@hapi/joi");
const Extension = require("@hapi/joi-date");
const joi = BaseJoi.extend(Extension);
joi.objectId = require("joi-objectid")(joi);
const user = require("../../../../../models/user");
const Boom = require("boom");
const ObjectId = require("mongodb").ObjectID;

const payload = joi
  .object({
    name: joi
      .string()
      .default("abc")
      .required()
      .description("put new name here"),
    dob: joi
      .date()
      .utc()
      .format(["YYYY/MM/DD", "DD-MM-YYYY"])
      .default("01-01-2000")
      .description("Enter Birth date here")
  })
  .required();

const handler = async (req, h) => {
  //data for update
  const newdata = {
    name: req.payload.name,
    dob: req.payload.dob
  };
  const { id } = h.request.auth.credentials; //get credentials
  const condition = { _id: ObjectId(id) };
  try {
    const result = await user.update(condition, newdata); //update user query

    if (result.result.n > 0)
      return h.response({ message: "successfully updated" });
    return Boom.badRequest("some went wrong..");
  } catch (error) {
    return Boom.badImplementation(error);
  }
};

module.exports = { payload, handler };
