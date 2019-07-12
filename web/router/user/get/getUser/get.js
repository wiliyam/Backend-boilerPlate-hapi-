const user = require("../../../../../models/user");
const Boom = require("boom");

const handler = async (req, h) => {
  const dataOnly = { name: 1, email: 1, dob: 1 };
  const condition = { isAdmin: false };

  const { isAdmin } = h.request.auth.credentials;
  if (!isAdmin) return Boom.unauthorized("You dont have access to view data");

  try {
    const userData = await user.findAll(condition, dataOnly);

    if (!userData) return Boom.badRequest("some thing went wrong");
    if (userData.length < 1)
      return h.response({ Message: "No user data found" });
    return h.response({ user: userData });
  } catch (error) {
    return Boom.badImplementation(error);
  }
};

module.exports = { handler };
