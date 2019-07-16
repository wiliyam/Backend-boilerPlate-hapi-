const joi = require("joi");
joi.objectId = require("joi-objectid")(joi);
const Boom = require("boom");
const ObjectId = require("mongodb").ObjectID;

const user = require("../../../../../models/user");

const payload = joi
  .object({
    userId: joi
      .objectId()
      .required()
      .description("Id of user ") //validate mongo object id
  })
  .required();
const handler = async (req, h) => {
  const condition = {
    _id: ObjectId(req.payload.userId)
  };

  const { isAdmin } = h.request.auth.credentials;
  if (!isAdmin) return Boom.forbidden("You dont have access to Delete data"); //check for administrative privileges

  try {
    const result = await user.remove(condition); //remove user query
    if (result.result.n > 0)
      return h.response({ message: "successfully deleted user" });
    return Boom.notFound("User not found..");
  } catch (error) {
    return Boom.badImplementation(error);
  }
};

module.exports = { handler, payload };
