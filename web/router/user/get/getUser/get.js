const user = require("../../../../../models/user");
const Boom = require("boom");
const ObjectId = require("mongodb").ObjectID;

const handler = async (req, h) => {
  const { isAdmin, id } = h.request.auth.credentials; //get credentials
  let condition;
  const dataOnly = { name: 1, email: 1, dob: 1 }; //for projection
  //if not admin then only show user data
  if (!isAdmin) {
    condition = { _id: ObjectId(id) };
  }
  //if admin then show all user data
  else {
    condition = {};
  }

  try {
    const userData = await user.findAll(condition, dataOnly);

    if (!userData) return Boom.badRequest("some thing went wrong");
    if (userData.length < 1)
      return h.response({ Message: "No user data found" });
    return h.response({ users: userData });
  } catch (error) {
    return Boom.badImplementation(error);
  }
};

module.exports = { handler };
