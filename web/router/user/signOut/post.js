const ObjectId = require("mongodb").ObjectID;
const Boom = require("boom");
const validate = require("../../../middleware/validations");
const user = require("../../../../models/user");

const handler = async (req, h) => {
  const { id } = h.request.auth.credentials; //get credentials

  const condition = { _id: ObjectId(id) };

  const result = await user.update(condition, {
    accessToken: "",
    refreshToken: ""
  });
  if (!result) return Boom.badImplementation("Internal server error..");
  return h.response({ message: "logout successfully" });
};

module.exports = { handler };
