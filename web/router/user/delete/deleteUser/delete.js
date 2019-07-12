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
      .description("Id of user ")
  })
  .required();
const handler = async (req, h) => {
  const condition = {
    _id: ObjectId(req.payload.userId)
  };

  const { isAdmin } = h.request.auth.credentials;
  if (!isAdmin) return Boom.unauthorized("You dont have access to view data");

  try {
    const result = await user.remove(condition);
    if (result.result.n > 0)
      return h.response({ message: "successfully deleted user" });
    return Boom.badRequest("some went wrong..");
  } catch (error) {
    return Boom.badImplementation(error);
  }
};

module.exports = { handler, payload };
